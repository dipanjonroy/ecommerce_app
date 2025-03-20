const ExpressError = require("../utility/expressError");
const { userRegisterSchema } = require("../validations/userSchema");

module.exports.userRegisterValidator = (req, res, next) => {
  let { error } = userRegisterSchema.validate(req.body);

  if (error) {
    throw new ExpressError(401, error.details[0].message);
  } else {
    next();
  }
};
