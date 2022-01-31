const bookRequest = require('../models/Request');
const jwt_decode = require('jwt-decode');
const getAllRequests = (async (req, res) => {
    try{
		const requests = await bookRequest.find();
		res.send(requests);
	} catch (error) {
		res.status(500);
		res.send({error: "An unknown server error has occured", message: error.message});
	}
});

const makeRequest = (async (req, res) => {
    try{
        const request = new bookRequest({
            bookName: req.body.bookName,
            bookAuthor: req.body.bookAuthor,
            bookDesc: req.body.bookDesc,
            bookGenre: req.body.bookGenre,
            bookPrice: req.body.bookPrice,
            date: req.body.date,
            userId: jwt_decode(req.body.token).user_id,
        })
        await request.save();
        res.status(201).send(request);
    } catch (error) {
        res.status(500);
        console.log(error.message);
        res.send({ error: "Unable to create request", message: error.message});
    }
});

const getRequest = (async (req, res) => {
    try {
		const request = await bookRequest.findOne({ _id: req.params.id });
		res.status(200).send(request);
	} catch (error){
		res.status(404);
		res.send({ error: "Unable to retrieve book request" , message: error.message });
	}
});

const getUsersRequests = (async (req, res) => {
    try {
		const request = await bookRequest.find({ userId: req.params.id });
		res.send(request);
	} catch (error) {
		res.status(404);
		res.send({ error: "Unable to retrieve users book requests", message: error.message });
	}
});

const updateRequest = (async (req, res) => {
    try{
		await bookRequest.findOneAndUpdate({ _id: req.params.id }, req.body)
		res.status(204).send( { message: "Successfully amended book request"});
	} catch (error) {
		console.log(e);
		res.status(500);
		res.send({error: "Error occured when trying to update book request", message: error.message});
	}
});

const deleteRequest = (async (req, res) => {
    try {
		await bookRequest.deleteOne({ _id: req.params.id })
		res.status(204).send( { message: "Successfully Deleted Book Request"});
	} catch (error) {
		res.status(500);
		res.send({ error: "Unable to delete book request", message: error.message });
	}
});
module.exports = {
    getAllRequests,
    makeRequest,
    getRequest,
    getUsersRequests,
    updateRequest,
    deleteRequest,
}