// External imports
const express = require("express");

const router = express.Router();

// Internal imports
const { getLogin, login, logout } = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");

// set page title
const page_title = "Login";
// login page
router.get("/", decorateHtmlResponse(page_title), getLogin);

// process login
router.post(
  "/",
  decorateHtmlResponse(page_title),
  doLoginValidators,
  doLoginValidationHandler,
  login
);
// logout
router.delete("/", logout);
module.exports = router;
