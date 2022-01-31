const mongoose = require("mongoose")

const schema = mongoose.Schema({
	firstName: {
        type: String,
        required: [true, 'A firstname is required'],
        minlength: 3,
        maxlength: 24,
    },
    lastName: {
        type: String,
        required: [true, 'A lastname is required'],
        minlength: 3,
        maxlength: 24,
    },
    password: {
        type: String,
        required: [true, 'A password is required']
    },
    username: {
        type: String,
        required: [true, 'A username is required'],
        unique: true,
        minlength: 3,
        maxlength: 32,
    },
    isEmployee: {
        type: Boolean,
        default: false
    },
    isAuthorizer: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    },
})

module.exports = mongoose.model("User", schema)