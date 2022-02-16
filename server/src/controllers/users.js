const User = require('../models/User');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUsers = ( async (req, res) =>  {
    try{
		const users = await User.find().select("-password");
		res.send(users);
	} catch (error){
		res.status(500);
		res.send({ error: 'Server Error Occured'});
	}
})

const createUser = ( async (req, res) => {
    try{
		// Validate user input
		if (!(req.body.username && req.body.password && req.body.firstName && req.body.lastName)) {
			res.status(400).send("Missing fields from request");
		  }
		const oldUser = await User.findOne({ username: req.body.username });
    	if (oldUser) {
			// username already exists, so return error
      		return res.status(409).send("User Already Exists. Please Login");
    	}
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(req.body.password, 10);
		const user = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			password: encryptedPassword,
			username: req.body.username.toLowerCase(),
			isEmployee: req.body.isEmployee,
			isAuthorizer: req.body.isAuthorizer,
		})
		await user.save();
		res.status(201);
		res.send({message:"User Successfully Created"});
	} catch (error) {
		res.status(500);
		res.send({error: error});
	}
})

const getSpecificUser = ( async (req, res) => {
    try {
		const user = await User.findOne({ _id: req.params.username }).select("-password");
		res.send(user)
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
})

const deleteUser = ( async (req, res) => {
    try {
		await User.deleteOne({ _id: req.params.id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
})

const modifyUser = ( async (req, res) => {
    try {
		const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
		res.status(204).send(user)
	} catch {
		res.status(404)
		res.send({ error: "User doesn't exist!" })
	}
})

const registerUser = (async (req, res) => {
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
})

const loginUser = (async (req, res) => {
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
})
module.exports = {
    getUsers,
    createUser,
    getSpecificUser,
    deleteUser,
    modifyUser,
	registerUser,
	loginUser,
}