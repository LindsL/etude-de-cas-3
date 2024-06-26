const UnauthorizedError = require("../errors/unauthorized");
const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      throw "no token";
    }
    const decoded = jwt.verify(token, config.secretJwtToken);
    req.user = { id: decoded.id };  
    next();
  } catch (message) {
    next(new UnauthorizedError(message));
  }
};