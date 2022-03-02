
Video URL: https://www.youtube.com/watch?v=V8cV0KriIuE

To download the Node packages for the Frontend: 

Go into the terminal at the front/src path then run npm install

To download the Node packages for the Server:

Go into the terminal at the server/src path then run npm install 


An ENV file must be created for the backend that uses the following SCHEMA:

API_PORT (this is where the server will run)

MONGO_URI (This is the connection to the mongoDB you want to use)

TOKEN_KEY (This is the salt string used for the JWT signing process)

TESTS:

Import the Postman Tests (collections) JSON files into postman to run the API tests

GUI tests:

Place geckodriver.exe into your PATH file.
Run the test suit by running Mocha server/src/UI tests/test_suite.js