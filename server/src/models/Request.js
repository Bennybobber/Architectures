const mongoose = require("mongoose")

const schema = mongoose.Schema({
	bookName: {type: String, required: true},
	bookDesc: {type: String, required: false, default: ""},
    bookGenre: {type: String, required: false, default: ""},
    bookPrice: {type: String, required: false, default: ""},
    bookAuthor: {type: String, required: false, default: ""},
    date: {type: Date, required: true},
    userId: {type: String, required: true},
    isApproved: {type: Boolean, required: true, default: false},
    assignedTo: {type: String, required: false, default: ""},
    needsMoreDtail: {type: Boolean, required: false, default: false},
    needsAuthorizer: {type: Boolean, required: false, default: false},
    isProcessed: {type: Boolean, required: false, default: false},
})

module.exports = mongoose.model("bookRequest", schema)