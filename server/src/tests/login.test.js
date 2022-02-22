const request = require('supertest')
const User = require('../models/User')
const app = require('../index')

// File: __tests__/user.model.test.js
const mongoose = require( 'mongoose' )
mongoose.Promise = global.Promise
mongoose.connect ( 'mongodb+srv://beb:bennybobber22@cluster0.sny8t.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
mongoose.connection.on( 'error', () => {
  throw new Error(`unable to connect to database: `)
})


afterAll( async () => {
  try {
    await mongoose.connection.close();
  } catch (err) {
    console.log(err);
  }
})


describe ("User Password Authentication", () => {

});