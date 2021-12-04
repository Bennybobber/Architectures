const mongoose = require("mongoose")

const schema = mongoose.Schema({
	title: {type: String, required: true},
	book: {type: Object, required: true},
    date: {type: Date, required: true},
    userId: {type: String, required: true},
    isApproved: {type: Boolean, required: true},
})

module.exports = mongoose.model("bookRequest", schema)