const express = require("express");
const User = require('./models/User');
const bookRequest = require('./models/Request');
const router = express.Router();
const jwt = require('jsonwebtoken');
const  bcrypt = require('bcryptjs');
const auth = require("./authentication/auth");
const empCheck = require('./authentication/employeeCheck');
const jwt_decode = require('jwt-decode');

const {
	getUsers,
} = require('./controllers/users');
router.get("/salad/:id", async (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

router.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { firstName, lastName, username, password } = req.body;

	
    // Validate user input
    if (!(username && password && firstName && lastName)) {
      res.status(400).send("Missing fields from request");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ username });
	console.log(username);
    if (oldUser) {
	  
      return res.status(409).send("User Already Exists. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);
    // Create user in our database
    const user = await User.create({
		firstName,
    	lastName,
    	username: username.toLowerCase(), // sanitize: convert email to lowercase
    	password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, username },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;
	user.password = undefined;
    // return new user
	console.log(user);
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
	res.status(500).send("An Interal Error Has Occured");
  }
  // Our register logic ends here
});

router.post('/login', async (req, res) => {
	try {
		// Get user input
		const { username, password } = req.body;
	
		// Validate user input
		if (!(username && password)) {
		  res.status(400).send("Additional input is required");
		}
		// check to see if user exists in the database
		const user = await User.findOne({ username });
	
		if (user && (await bcrypt.compare(password, user.password))) {
		  // Create token
		  const token = jwt.sign(
			{ user_id: user._id, username },
			process.env.TOKEN_KEY,
			{
			  expiresIn: "2h",
			}
		  );
	
		  // save user token
		  user.token = token;
		  // remove the password since it's not needed at the frontend
		  user.password = undefined;
		  // user
		  res.status(200).json(user);
		}
		res.status(404).send("Invalid Credentials");
	  } catch (err) {
		console.log(err);
		res.status(500).send("Internal Server Error");
	  }
	  
});

// Get all users only employees or Authorizers can access
router.get("/users", auth, empCheck, getUsers);

// Add a new user only employees or Authorizers can access
router.post("/users", auth, empCheck, async (req, res) => {
	try{
		const oldUser = await User.findOne({ username: req.body.username });
    	if (oldUser) {
			// username already exists, so return error
      		return res.status(409).send("User Already Exists. Please Login");
    	}
		const user = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: req.body.password,
			username: req.body.username,
			isEmployee: req.body.isEmployee,
			isAuthorizer: req.body.isAuthorizer,
		})
		await user.save();
		res.status(201);
		res.send({message:"User Successfully Created"});
	} catch (error) {
		res.status(500);
		console.log(error);
		res.send({error: error});
	}
});

// Get individual user only employees or Authorizers can access
router.get("/users/:id", auth, empCheck, async (req, res) => {
    try {
		const user = await User.findOne({ _id: req.params.id }).select("-password");
		res.send(user)
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
});

// Update a user only employees or Authorizers can access
router.patch("/users/:id", auth, empCheck, async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id })

		if (req.body.name) {
			user.name = req.body.name
		}

		if (req.body.ownedBooks) {
			user.ownedBooks = req.body.ownedBooks
		}

        if (req.body.requests) {
			user.requests = req.body.requests
		}

        if (req.body.isEmployee) {
			user.isEmployee = req.body.isEmployee
		}
		if (req.body.isAuthorizer) {
			user.isAuthorizer = req.body.isAuthorizer
		}

		await user.save()
		res.send(user)
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
})

// Delete a user
router.delete("/users/:id", auth, empCheck, async (req, res) => {
	try {
		await User.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
})

// Get all requests
router.get("/requests", auth, empCheck, async (req, res) => {
	try{
		const requests = await bookRequest.find();
		res.send(requests);
	} catch {
		res.status(500);
		res.send({error: "An unknown server error has occured"});
	}
	
});

router.post("/requests", auth, async (req, res) => {
	const request = new bookRequest({
		bookName: req.body.bookName,
		bookAuthor: req.body.bookAuthor,
		bookDesc: req.body.bookDesc,
		bookGenre: req.body.bookGenre,
		bookPrice: req.body.bookPrice,
        date: req.body.date,
        userId: jwt_decode(req.body.token).user_id,
		isApproved: false,
		assignedTo: "",
		needsMoreDetail: false,
		needsAuthorizer: false,
	})
	await request.save()
	console.log(request);
	res.send(request)
});

router.get("/requests/:id", auth, async (req, res) => {
    try {
		const request = await bookRequest.findOne({ _id: req.params.id })
		res.send(request)
	} catch {
		res.status(404)
		res.send({ error: "Request doesn't exist!" })
	}
});

router.get("/user/requests/:id", auth, async (req, res) => {
    try {
		const request = await bookRequest.find({ userId: req.params.id })
		res.send(request)
	} catch {
		res.status(404)
		res.send({ error: "Request doesn't exist!" })
	}
});

// Update a request
router.patch("/requests/:id", auth, async (req, res) => {
	// const user = await User.findOne({ _id: req.user_id })
	try{
		await bookRequest.findOneAndUpdate({ _id: req.params.id }, req.body)
		res.status(204).send( { message: "Successfully amended book request"})
	} catch (e) {
		console.log(e);
		res.status(500)
		res.send({error: e})
	}
})

// Delete a book request
router.delete("/requests/:id", auth, async (req, res) => {
	try {
		await bookRequest.deleteOne({ _id: req.params.id })
		res.status(204).send( { message: "Successfully Deleted Book Request"})
	} catch {
		res.status(404)
		res.send({ error: "Book request doesn't exist!" })
	}
})

module.exports = router