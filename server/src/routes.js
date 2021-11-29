const express = require("express");
const Book = require("./models/Book");
const User = require('./models/User');
const bookRequest = require('./models/Request');
const router = express.Router();
const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const { application } = require("express");

application.post("/register", (req, res) => {
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

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
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

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

application.post('/login', (req, res) => {

});

// Get all books
router.get("/books", async (req, res) => {
	const books = await Book.find();
	res.send(books);
});

router.post("/books", async (req, res) => {
	const book = new Book({
		title: req.body.title,
		desc: req.body.content,
        releaseYear: req.body.releaseYear,
        price: req.body.price,
	})
	await book.save()
	res.send(book)
});

router.get("/books/:id", async (req, res) => {
    try {
		const book = await Book.findOne({ _id: req.params.id })
		res.send(book)
	} catch {
		res.status(404)
		res.send({ error: "Book doesn't exist!" })
	}
});

// Update a book
router.patch("/books/:id", async (req, res) => {
	try {
		const book = await Book.findOne({ _id: req.params.id })

		if (req.body.title) {
			book.title = req.body.title
		}

		if (req.body.desc) {
			book.desc = req.body.desc
		}

        if (req.body.releaseYear) {
			book.releaseYear = req.body.releaseYear
		}

        if (req.body.price) {
			book.price = req.body.price
		}

		await book.save()
		res.send(book)
	} catch {
		res.status(404)
		res.send({ error: "Book doesn't exist!" })
	}
})

// Delete a book
router.delete("/books/:id", async (req, res) => {
	try {
		await Book.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Book doesn't exist!" })
	}
})

// Get all users
router.get("/users", async (req, res) => {
	const users = await User.find();
	res.send(users);
});

router.post("/users", async (req, res) => {
	const user = new User({
		name: req.body.name,
		ownedBooks: req.body.ownedBooks,
        requests: req.body.requests,
        isEmployee: req.body.isEmployee,
		isAuthorizer: req.body.isAuthorizer,
	})
	await user.save()
	res.send(user)
});

router.get("/users/:id", async (req, res) => {
    try {
		const user = await User.findOne({ _id: req.params.id })
		res.send(user)
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
});

// Update a user
router.patch("/users/:id", async (req, res) => {
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
router.delete("/users/:id", async (req, res) => {
	try {
		await User.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
})

// Get all requests
router.get("/requests", async (req, res) => {
	const requests = await bookRequest.find();
	res.send(requests);
});

router.post("/requests", async (req, res) => {
	const request = new bookRequest({
		title: req.body.title,
		book: req.body.book,
        date: req.body.date,
        userId: req.body.userId,
		isApproved: req.body.isApproved,
	})
	await request.save()
	res.send(request)
});

router.get("/requests/:id", async (req, res) => {
    try {
		const request = await bookRequest.findOne({ _id: req.params.id })
		res.send(request)
	} catch {
		res.status(404)
		res.send({ error: "Request doesn't exist!" })
	}
});

// Update a user
router.patch("/requests/:id", async (req, res) => {
	try {
		const request = await bookRequest.findOne({ _id: req.params.id })

		if (req.body.title) {
			request.title = req.body.title
		}

		if (req.body.book) {
			request.book = req.body.book
		}

        if (req.body.date) {
			request.date = req.body.date
		}

        if (req.body.userId) {
			request.userId = req.body.userId
		}
		if (req.body.isApproved) {
			request.isApproved = req.body.isApproved
		}

		await request.save()
		res.send(request)
	} catch {
		res.status(404)
		res.send({ error: "Request doesn't exist!" })
	}
})

// Delete a user
router.delete("/users/:id", async (req, res) => {
	try {
		await bookRequest.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Request doesn't exist!" })
	}
})


module.exports = router