const mongoose = require("mongoose")

const schema = mongoose.Schema({
	title: {type: String, required: true},
	desc: String,
    releaseYear: {type: String, required: true},
    price: {type: String, required: true},
})

module.exports = mongoose.model("Book", schema)