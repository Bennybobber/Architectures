const mongoose = require("mongoose")

const schema = mongoose.Schema({
	bookName: {
        type: String,
        required: [true, "The book request requires a name!"],
        minlength: 3,
        maxlength: 64
    },
	bookDesc: {
        type: String,
        required: false,
        default: "",
        maxlength: 256,
    },
    bookGenre: {
        type: String,
        required: false,
        default: "",
        maxlength: 128,
    },
    bookPrice: {
        type: String,
        required: false,
        default: "",
        maxlength: 32,
    },
    bookAuthor: {
        type: String,
        required: false,
        default: "",
        maxlength: 64,
        },
    date: {
        type: Date,
        required: [true, "The book request requires a date!"]
    },
    userId: {
        type: String,
        required: [true, "The book request requires a valid useId attached to it!"]
    },
    approvalStatus: {
        type: String,
        required: true,
        enum: ['In Progress', 'Denied', 'Approved'],
        default: 'In Progress'
    },
    assignedTo: {
        type: String,
        required: false,
        default: ""
    },
    needsMoreDetail: {
        type: Boolean,
        required: false,
        default: false
    },
    needsAuthorizer: {
        type: Boolean,
        required: false,
        default: false
    },
    isProcessed: {
        type: Boolean,
        required: false,
        default: false
    },
})

module.exports = mongoose.model("bookRequest", schema)