const jwt = require("jsonwebtoken");
const User = require('../models/User');
const config = process.env;

const  verifyRole = async (req, res, next) => {
    const user_id = req.user.user_id;
    console.log(user_id);
    try{ 
        const user = await User.findOne({ _id: user_id })
		if (user.isEmployee == true || user.isAuthorizer == true){
			return next();
		} else {
			res.status(401);
			return res.status(401).send("Not Authorised For This Request");
		}
    } catch {
        return res.status(401).send("Invalid Token");
    }
};

module.exports = verifyRole;