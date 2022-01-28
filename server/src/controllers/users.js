const User = require('../models/User');

const getUsers = ( async (req, res) =>  {
    console.log("ahahah");
    try{
		const users = await User.find().select("-password");
		res.send(users);
	} catch (error){
		res.status(500);
		res.send({ error: 'Server Error Occured'});
	}
})

const createUser = ( async (req, res) => {

})
module.exports = {
    getUsers,
    createUser,
}