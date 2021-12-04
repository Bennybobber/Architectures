const mongoose = require("mongoose")

const schema = mongoose.Schema({
	firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    password: {type: String, required: true},
    username: {type: String,required: true , unique: true},
    ownedBooks: {type: Array, default: []},
    requests: {type: Array, default: []},
    isEmployee: {type: Boolean, default: false},
    isAuthorizer: {type: Boolean, default: false},
    token: { type: String },
})

module.exports = mongoose.model("User", schema)