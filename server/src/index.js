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

// enabling CORS for all requests


// adding morgan to log HTTP requests


// start the in-memory MongoDB instance
console.log(process.env.API_PORT);
mongoose
	.connect(process.env.MONGO_URI,
		{ 
			useNewUrlParser: true,
		})
	.then(() => {
		const app = express()
    	app.use(express.json())
		app.use(cors());
		app.use(morgan('combined'));
    	app.use("/api", routes);

		app.listen(process.env.API_PORT, () => {
			console.log("Server has started!")
		})
	})
	.catch((error) => {
		console.log("database connection failed. exiting now...");
		console.error(error);
		process.exit(1);
	  });