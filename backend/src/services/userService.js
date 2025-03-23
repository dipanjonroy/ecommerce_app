const User = require("../models/UserModel");
const ExpressError = require("../utility/expressError");
const bcrypt = require("bcrypt");

module.exports.userRegisterService = async (data) => {
  const { firstname, lastname, email, password } = data;
  const isExist = await User.exists({ email });

  if (isExist) {
    throw new ExpressError(401, "User is already exist.");
  }

  const hashPassword = await bcrypt.hashSync(password, 10);

  const newUser = await User.create({
    firstname,
    lastname,
    email,
    password: hashPassword,
  });

  return newUser;
};

module.exports.userLoginService = async (data) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");

  const matchPassword = await bcrypt.compare(password, user.password);

  if (!user || !matchPassword) {
    throw new ExpressError(401, "Invalid user email or password.");
  }

  if(user.isBanned){
    throw new ExpressError(401, "User is banned.")
  }

  const userId = user._id;

  
  return userId;
};

module.exports.userProfileService = async(id)=>{
  const user = await User.findById(id);

  if(!user){
    throw new ExpressError(401, "User is not exist.")
  }

  return user;
}
