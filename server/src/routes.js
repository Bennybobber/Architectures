const express = require("express");
const router = express.Router();
const auth = require("./authentication/auth");
const authCheck = require('./authentication/authorizerCheck');
const workerCheck = require('./authentication/workerCheck')


const {
	getUsers,
	createUser,
	getSpecificUser,
	deleteUser,
	modifyUser,
	registerUser,
	loginUser,
} = require('./controllers/users');

const {
	getAllRequests, 
	makeRequest,
	getRequest,
	getUsersRequests,
	updateRequest,
	deleteRequest,
} = require('./controllers/requests');

// Registers a new client account that a client can make themselves
router.post("/register", registerUser);

// Logs in a user after checking credentials
router.post('/login', loginUser);

// Get all users only employees or Authorizers can access
router.get("/users", auth, workerCheck, getUsers);

// Add a new user only Authorizers can access this route
router.post("/users", auth, authCheck, createUser);

// Get individual user only employees or Authorizers can access
router.get("/users/:id", auth, getSpecificUser);

// Update a user only employees or Authorizers can access
router.patch("/users/:id", auth, authCheck, modifyUser);

// Delete a user
router.delete("/users/:id", auth, authCheck, deleteUser);

// Get all requests
router.get("/requests", auth, workerCheck, getAllRequests);

// Makes a request based on incoming data
router.post("/requests", auth, makeRequest);

// Get a specific request based on ID given in param
router.get("/requests/:id", auth, getRequest);

// Get all the requests for a specific user
router.get("/user/requests/:id", auth, getUsersRequests);

// Update a request
router.patch("/requests/:id", auth, updateRequest);

// Delete a book request
router.delete("/requests/:id", auth, deleteRequest);

module.exports = router