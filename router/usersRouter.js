// External imports
const express = require("express");

// Internal imports
const {
  getUsers,
  addUser,
  removeUser,
} = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");
const { checkLogin } = require("../middlewares/common/checkLogin");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

const router = express.Router();
// login page
router.get("/", decorateHtmlResponse("Users"), checkLogin, getUsers);

router.post(
  "/",
  checkLogin,
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", removeUser);
module.exports = router;
