const { createToken } = require("../utility/createToken");
const ExpressError = require("../utility/expressError");
const jwt = require("jsonwebtoken");

const generateToken = (res,token) => {
  const decoded = jwt.verify(token, process.env.JWT_REFRESH_TOKEN_KEY);

  const userId = decoded.userId;

  const newAccessToken = createToken(
    { userId },
    process.env.JWT_ACCESS_TOKEN_KEY,
    "5m"
  );

  res.cookie("accessToken", newAccessToken, {
    maxAge: 1000 * 60 * 5,
    httpOnly: true,
    secure: false,
  });
};

module.exports.isLoggedIn = (req, res, next) => {
  const { accessToken, refreshToken } = req.cookies;

  if (!accessToken) {
    generateToken(res, refreshToken);
  }

  const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_TOKEN_KEY);

  const userId = decoded?.userId;

  req.userId = userId;

  next();
};

module.exports.isLoggedOut = (req, res, next) => {
  const { refreshToken } = req.cookies;

  if (refreshToken) {
    throw new ExpressError(401, "You are already logged in.");
  }

  next();
};
