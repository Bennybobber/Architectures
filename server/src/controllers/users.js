const User = require('../models/User');
const  bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * getUsers | Retrieves a list of user objects without their passwords attached.
 * @param  {Object} req	| An Object sent via the HTTP request
 * @return {Object} users | A list of all the user objects returned from the database.
 */
const getUsers = ( async (req, res) =>  {
    try{
		const users = await User.find().select("-password");
		return res.send(users);
	} catch (error){
		return res.status(500).send({ error: 'Server Error Occured'});
	}
})

/**
 * createUser | Creates a new user object and stores it in the database.
 * @param  {Object} req	| An Object sent via the HTTP request.
 * @return {Object} message | A message informing how the request finished.
 */
const createUser = ( async (req, res) => {
    try{
		// Validate user input
		if (!(req.body.username && req.body.password && req.body.firstName && req.body.lastName)) {
			return res.status(400).send("Missing fields from request");
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
			username: req.body.username,
			isEmployee: req.body.isEmployee,
			isAuthorizer: req.body.isAuthorizer,
		})
		await user.save();
		return res.status(201).send("User successfully created")
	} catch (error) {
		return res.status(500).send({error: error});
	}
})

/**
 * getSpecificUser | Returns a specific user from the database based on a given user ID
 * @param  {Object} req	| An Object sent via the HTTP request.
 * @return {Object} user | A User Object retrived from the database, without their password.
 */
const getSpecificUser = ( async (req, res) => {
    try {
		const user = await User.findOne({ _id: req.params.username }).select("-password");
		return res.status(200).send(user);
	} catch {
		return res.status(404).send({ error: "User doesn't exist!" });
	}
})

/**
 * deleteUser | Deletes a specific user from the database based on a given user ID.
 * @param  {Object} req	| An Object sent via the HTTP request.
 * @return {Object} message | A message informing the outcome of the request.
 */
const deleteUser = ( async (req, res) => {
    try {
		await User.deleteOne({ _id: req.params.id })
		return res.status(204).send("Successfully deleted user");
	} catch {
		return res.status(404).send({ error: "User doesn't exist!" })
	}
})

/**
 * modifyUser | Modifies an existing user object and saves it to the database based on a given user ID.
 * @param  {Object} req	| An Object sent via the HTTP request.
 * @return {Object} user | An updated User object.
 */
const modifyUser = ( async (req, res) => {
    try {
		const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body);
		return res.status(204).send(user);
	} catch {
		return res.status(404).send({ error: "User doesn't exist!" });
	}
})

/**
 * registerUser | Registers a new user object and saves it into the database.
 * @param  {Object} req	| An Object sent via the HTTP request.
 * @return {Object} user | The new user object created, that contains an access token.
 */
const registerUser = (async (req, res) => {
	// Our register logic starts here
	try {
		// Get user input
		const { firstName, lastName, username, password } = req.body;

		// Validate user input
		if (!(username && password && firstName && lastName)) {
		  return res.status(400).send("Missing fields from request");
		}
	
		// check if user already exist
		// Validate if user exist in our database
		const oldUser = await User.findOne({ username });
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
		return res.status(201).send(user);
	  } catch (err) {
		console.log(err);
		return res.status(500).send("An Interal Error Has Occured");
		
	  }
})

/**
 * loginUser | Issues a token to the user, which can be used for authentication.
 * @param  {Object} req	| An Object sent via the HTTP request.
 * @return {Object} user | The modified user object with a fresh token.
 */
const loginUser = (async (req, res) => {
	try {
		const { username, password } = req.body;
		// Validate user input
		if (!(username && password)) {
		  return res.status(400).send("Additional input is required");
		}
		// Get user input
		
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
		  return res.status(200).json(user);
		}else{
			return res.status(404).send("Invalid Credentials");
		}
	}catch (err) {
		console.log(err);
		return res.status(500).send("Internal Server Error");
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