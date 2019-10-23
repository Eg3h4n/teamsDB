const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config/secret");

function checkAuth(req, res, next) {
  const token = req.header("x-jwt-token");

  if (!token) return res.status(401).send("You are not authorized!");

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (exception) {
    res.status(400).send("Invalid token!");
  }
}

module.exports = checkAuth;
