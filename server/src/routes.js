const express = require("express");
const router = express.Router();
const auth = require("./authentication/auth");
const empCheck = require('./authentication/employeeCheck');


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
router.get("/users", auth, empCheck, getUsers);

// Add a new user only employees or Authorizers can access
router.post("/users", auth, empCheck, createUser);

// Get individual user only employees or Authorizers can access
router.get("/users/:id", auth, empCheck, getSpecificUser);

// Update a user only employees or Authorizers can access
router.patch("/users/:id", auth, empCheck, modifyUser);

// Delete a user
router.delete("/users/:id", auth, empCheck, deleteUser);

// Get all requests
router.get("/requests", auth, empCheck, getAllRequests);

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