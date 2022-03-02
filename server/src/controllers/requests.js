const bookRequest = require('../models/Request');
const jwt_decode = require('jwt-decode');

/**
 * getAllRequests | Retrieves all the requests on the database.
 * @return {Object} request | A list of bookRequest Objects from the database.
 */
const getAllRequests = (async (req, res) => {
    try{
		const requests = await bookRequest.find();
		return res.status(200).send(requests);
	} catch (error) {
		return res.status(500).send({error: "An unknown server error has occured", message: error.message});
	}
});

/**
 * makeRequest creates a new bookRequest which is then saved in the database
 * @param  {Object} req	| An Object sent via the HTTP request
 * @return {Object} request | The created bookRequest object is returned to user after successful creation
 */
const makeRequest = (async (req, res) => {
    try{
        const request = new bookRequest({
            bookName: req.body.bookName,
            bookAuthor: req.body.bookAuthor,
            bookDesc: req.body.bookDesc,
            bookGenre: req.body.bookGenre,
            bookPrice: req.body.bookPrice,
            date: new Date(),
            userId: req.user._id,
        })
        await request.save();
        return res.status(201).send(request);
    } catch (error) {
        return res.status(500).send({ error: "Unable to create request", message: error.message});
    }
});

/**
 * getRequest retrieves a specific book request
 * @param  {Object} req | An Object sent via the HTTP request
 * @return {Object} request | bookRequest Object returned from the database
 */
const getRequest = (async (req, res) => {
    try {
		const request = await bookRequest.findOne({ _id: req.params.id });
		console.log(request);
		if (request === null) return res.status(404).send({message: 'This Request Does Not Exist'});
		return res.status(200).send(request);
	} catch (error){
		if (error.message.includes('Cast to ObjectId failed for value')) return res.status(404).send('Book Request not found');
		return res.status(404).send({ error: "Unable to retrieve book request" , message: error.message });
	}
});

/**
 * getUsersRequests | Retrieves all the bookRequests for one specific user
 * @param  {Object} req	| An Object sent via the HTTP request
 * @return {Object} requests | A list of book requests belonging to a specific user
 */
const getUsersRequests = (async (req, res) => {
    try {
		const requests = await bookRequest.find({ userId: req.params.id });
		return res.send(requests);
	} catch (error) {
		if (error.message.includes('Cast to ObjectId failed for value')) return res.status(404).send('Book Request not found');
		return res.status(404).send({ error: "Unable to retrieve users book requests", message: error.message });
	}
});

/**
 * updateRequest | Updates a specific request
 * @param  {Object} req	| An Object sent via the HTTP request
 * @return {Object} message | A message informing the result of the request
 */
const updateRequest = (async (req, res) => {
    try{
		if (req.user.isAuthorizer || req.user.isEmployee){
			await bookRequest.findOneAndUpdate({ _id: req.params.id }, req.body)
			return res.status(200).send( { message: "Successfully amended book request"});
		} else {
			const book = await bookRequest.findOne({ _id: req.params.id});
			if (book.userId == req.user._id){
				delete req.body['assignedTo']
				delete req.body['date']
				delete req.body['approvalStatus']
				if (req.body['needsMoreDetail'] == true) delete req.body['needsMoreDetail'];
				delete req.body['needsAuthorizer']
				delete req.body['isProcessed']

				
				await bookRequest.findOneAndUpdate({ _id: req.params.id }, req.body);
				const updatedBook = await bookRequest.findOne({ _id: req.params.id});
				res.status(200).send( { message: "Successfully amended book request", book: updatedBook});
			}

		}
		
	} catch (error) {
		if (error.message.includes('Cast to ObjectId failed for value')) return res.status(404).send('Book Request not found');
		return res.status(500).send({error: "Error occured when trying to update book request", message: error.message});
	}
});

/**
 * deleteRequest | Deletes a specific request
 * @param  {Object} req	| An Object sent via the HTTP request
 * @return {Object} message |  A message informing the result of the request
 */
const deleteRequest = (async (req, res) => {
    try {
		if (req.user.isAuthorizer || req.user.isEmployee){
			await bookRequest.deleteOne({ _id: req.params.id })
			return res.status(204).send( { message: "Successfully Deleted Book Request"});
		} else {
			const book = await bookRequest.findOne({ _id: req.params.id});
			if (book.userId == req.user._id) {
				await bookRequest.deleteOne({ _id: req.params.id })
				return res.status(204).send( { message: "Successfully Deleted Book Request"});
			}
			
		}
	} catch (error) {
		if (error.message.includes('Cast to ObjectId failed for value')) return res.status(404).send('Book Request not found');
		return res.status(500).send({ error: "Unable to delete book request", message: error.message });
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