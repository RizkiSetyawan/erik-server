const jwt = require("jsonwebtoken");
const config = require("../configs");

module.exports = function(req, res, next) {
  // Get token from header
  let token = req.header("Authentication");

  // Check if not token
  if (!token) {
    return res.status(401).json({
      msg: "No token, authorization denied"
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({
      msg: "Token is not valid"
    });
  }
};
