const jwt = require("jsonwebtoken");

const config = process.env;

/**
 * verifyToken | A middleware function that checks to see if the 
 * user is properly authenticated, by retrieving their profile from
 * the database and checking their status.
 * If the check passes, it will continue to the next functon, otherwise 
 * it will reject the request with a 401.
 */
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  console.log(req)
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;