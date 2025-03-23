const {
  userRegisterService,
  userLoginService,
  userProfileService,
} = require("../services/userService");
const { createToken } = require("../utility/createToken");

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

  const user = await userLoginService(data);

  const accessToken = createToken(
    { user },
    process.env.JWT_ACCESS_TOKEN_KEY,
    "1h"
  );

  res.cookie("accessToken", accessToken, {
    withCredentials: true,
    httpOnly: false,
  });

  const refreshToken = createToken(
    { user },
    process.env.JWT_REFRESH_TOKEN_KEY,
    "7d"
  );
  res.cookie("refreshToken", refreshToken, {
    withCredentials: true,
    httpOnly: false,
  });

  res.status(201).json({
    success: true,
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
