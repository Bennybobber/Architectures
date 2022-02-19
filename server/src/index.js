// ./src/index.js
require('dotenv').config();
// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require("mongoose");
const routes = require("./routes");
// defining the Express app
const app = express();
// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
	methods: ['GET', 'POST']
  }
});

// start the in-memory MongoDB instance
io.on('connection', (socket) => {
	socket.on("message", (msg) => {
		console.log(msg);
		io.emit('message', msg)
	})
})
mongoose
	.connect("mongodb+srv://beb:bennybobber22@cluster0.sny8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
		{ 
			useNewUrlParser: true,
		})
	.then(() => {
    	app.use(express.json())
		app.use(cors());
		app.use(morgan('combined'));
    	app.use("/api", routes);
		server.listen(3001, () => {
			console.log("Server has started on port: " + "3001")
		})
	})
	.catch((error) => {
		console.log("database connection failed. exiting now...");
		console.error(error);
		process.exit(1);
	  });