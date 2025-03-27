const {
  userRegisterService,
  userLoginService,
  userProfileService,
  refreshTokenService,
} = require("../services/authService");
const { createToken } = require("../utility/createToken");
const ExpressError = require("../utility/expressError");

module.exports.userRegisterController = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const newUser = await userRegisterService({
    firstname,
    lastname,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "Registration is successfull.",
  });
};

module.exports.userLoginController = async (req, res) => {
  const data = req.body;

  const {userId, isAdmin} = await userLoginService(data);

  const accessToken = createToken(
    { userId },
    process.env.JWT_ACCESS_TOKEN_KEY,
    "5m"
  );

  res.cookie("accessToken", accessToken, {
    maxAge: 1000*60*5,
    httpOnly: true,
    secure: false,
  });

  const refreshToken = createToken(
    { userId },
    process.env.JWT_REFRESH_TOKEN_KEY,
    "7d"
  );
  res.cookie("refreshToken", refreshToken, {
    maxAge: 1000*60*60*24*7,
    httpOnly: true,
    secure: false,
  });

  res.status(201).json({
    success: true,
    isAdmin,
    message: "Logged in successfully.",
  });
};

module.exports.userLogOutController = async (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  res.status(201).json({
    success: true,
    message: "Logged out successfully.",
  });
};

module.exports.userProfileController = async (req, res) => {
  const userId = req.userId;

  const profile = await userProfileService(userId);

  res.status(201).json({
    success: true,
    profile,
  });
};

