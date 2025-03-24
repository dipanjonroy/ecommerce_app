const ExpressError = require("../utility/expressError");
const jwt = require("jsonwebtoken");

module.exports.isLoggedIn = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (!accessToken) {
    throw new ExpressError(401, "Session expired! Please login.");
  }

  const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_KEY);

  const userId = decoded?.userId;

  req.userId = userId;

  next();
};

module.exports.isLoggedOut = (req, res, next) => {
  const { accessToken } = req.cookies;

  if (accessToken) {
    throw new ExpressError(401, "You are already logged in.");
  }

  next();
};
