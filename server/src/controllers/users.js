const User = require('../models/User');
const  bcrypt = require('bcryptjs');
const jwt_decode = require('jwt-decode');
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
		const user = await User.findOne({ _id: req.params.id }).select("-password");
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
module.exports = {
    getUsers,
    createUser,
    getSpecificUser,
    deleteUser,
    modifyUser,
}