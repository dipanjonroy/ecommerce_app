const ExpressError = require("../utility/expressError");
const {
  userRegisterSchema,
  userLoginSchema,
} = require("../validations/userSchema");

module.exports.userRegisterValidator = (req, res, next) => {
  const { error } = userRegisterSchema.validate(req.body);

  if (error) {
    throw new ExpressError(401, error.details[0].message);
  } else {
    next();
  }
};

module.exports.userLoginValidator = (req, res, next) => {
  const { error } = userLoginSchema.validate(req.body);

  if (error) {
    throw new ExpressError(401, error.details[0].message);
  } else {
    next();
  }
};
