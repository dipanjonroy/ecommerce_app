const express = require("express");
const { userRegisterValidator } = require("../middlewares/validators");
const wrapAsync = require("../../../../VideoApp/backend/src/utilities/wrapAsync");
const { userRegisterController } = require("../controllers/userController");

const router = express.Router();

router
  .route("/register")
  .post(userRegisterValidator, wrapAsync(userRegisterController));

module.exports = router;
