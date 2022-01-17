const mongoose = require("mongoose")

const schema = mongoose.Schema({
	bookName: {type: String, required: true},
	bookDesc: {type: String, required: false},
    bookGenre: {type: String, required: false},
    bookPrice: {type: String, required: false},
    bookAuthor: {type: String, required: false},
    date: {type: Date, required: true},
    userId: {type: String, required: true},
    isApproved: {type: Boolean, required: true},
    assignedTo: {type: String, required: false},
})

module.exports = mongoose.model("bookRequest", schema)