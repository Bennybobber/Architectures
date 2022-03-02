const jwt = require("jsonwebtoken");
const User = require('../models/User');
const config = process.env;

/**
 * verifyToken | A middleware function that checks to see if the 
 * user is properly authenticated, by retrieving their profile from
 * the database and checking their status.
 * If the check passes, it will continue to the next functon, otherwise 
 * it will reject the request with a 401.
 */
const verifyToken = async (req, res, next) => {
  let token =
  req.body.token || req.query.token || req.headers["x-access-token"] || req.headers["authorization"];
  
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  if (token.includes('Bearer ')) token = req.headers["authorization"].replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    const user = await User.findOne({ _id: decoded.user_id })
    req.user = user;
  } catch (err) {
    console.log(err);
    
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;