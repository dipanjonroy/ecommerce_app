const Joi = require("joi");

module.exports.userRegisterSchema = Joi.object({
  firstname: Joi.string().trim().min(3).max(50).required().messages({
    "any.required": "Firstname is required.",
    "string.min": "Firstname must be at least 3 characters long.",
    "string.max": "Firstname will be maximum 50 characters long.",
  }),

  lastname: Joi.string().trim().min(3).max(50).required().messages({
    "any.required": "Lastname is required.",
    "string.min": "Lastname must be at least 3 characters long.",
    "string.max": "Lastname will be maximum 50 characters long.",
  }),

  email: Joi.string().trim().email().required().messages({
    "any.required": "Email is required.",
    "string.email": "Email is not valid.",
  }),

  password: Joi.string()
    .min(6)
    .required()
    .pattern(
      new RegExp(
        "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{3,30}$"
      )
    )
    .messages({
      "any.required": "Password is required.",
      "string.pattern.base":
        "Password must contain at least one letter, one number, and one special character.",
    }),

  gender: Joi.string(),
  phone: Joi.string(),
  address: Joi.string(),
  isAdmin: Joi.boolean(),
  isBanned: Joi.boolean(),
});

module.exports.userLoginSchema = Joi.object({
  email: Joi.string().email().required().trim().messages({
    "any.required": "Email is required.",
    "string.email": "Email is not valid."
  }),

  password: Joi.string().min(6).required().messages({
    "any.string": "Password is required.",
    "string.min":"Password must be at least 6 characters long."
  })
})
