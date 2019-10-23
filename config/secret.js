const config = require("config");

/* const JWT_SECRET = process.env.JWT_SECRET || "jwtSecretKey";

module.exports = JWT_SECRET; */

module.exports = config.get("JWT_SECRET");
