const bookRequest = require('../models/Request');
const jwt_decode = require('jwt-decode');
const getAllRequests = (async (req, res) => {
    try{
		const requests = await bookRequest.find();
		res.send(requests);
	} catch {
		res.status(500);
		res.send({error: "An unknown server error has occured"});
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
            isApproved: false,
            assignedTo: "",
            needsMoreDetail: false,
            needsAuthorizer: false,
        })
        await request.save();
        res.status(201).send(request);
    } catch (error) {
        res.status(500);
        console.log(error);
        res.send({ error: "Unable to create request"});
    }
});

const getRequest = (async (req, res) => {
    try {
		const request = await bookRequest.findOne({ _id: req.params.id });
		res.status(200).send(request);
	} catch {
		res.status(404);
		res.send({ error: "Request doesn't exist!" });
	}
});

const getUsersRequests = (async (req, res) => {
    try {
		const request = await bookRequest.find({ userId: req.params.id });
		res.send(request);
	} catch {
		res.status(404);
		res.send({ error: "Request doesn't exist!" });
	}
});

const updateRequest = (async (req, res) => {
    try{
		await bookRequest.findOneAndUpdate({ _id: req.params.id }, req.body)
		res.status(204).send( { message: "Successfully amended book request"});
	} catch (e) {
		console.log(e);
		res.status(500);
		res.send({error: e});
	}
});

const deleteRequest = (async (req, res) => {
    try {
		await bookRequest.deleteOne({ _id: req.params.id })
		res.status(204).send( { message: "Successfully Deleted Book Request"});
	} catch {
		res.status(404);
		res.send({ error: "Book request doesn't exist!" });
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