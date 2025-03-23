const express = require("express");
const {
  userRegisterValidator,
  userLoginValidator,
} = require("../middlewares/validators");
const wrapAsync = require("../../../../VideoApp/backend/src/utilities/wrapAsync");
const {
  userRegisterController,
  userLoginController,
  userLogOutController,
  userProfileController,
} = require("../controllers/userController");
const { isLoggedIn, isLoggedOut } = require("../middlewares/checkAuth");

const router = express.Router();

router
  .route("/register")
  .post(isLoggedOut,userRegisterValidator, wrapAsync(userRegisterController));

router.route("/login").post(isLoggedOut,userLoginValidator, wrapAsync(userLoginController));

router.route("/logout").get(isLoggedIn, wrapAsync(userLogOutController));

router.route("/profile").get(isLoggedIn, wrapAsync(userProfileController));

module.exports = router;
