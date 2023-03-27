// External imports
const express = require("express");

const router = express.Router();

// Internal imports
const {getLogin} = require("../controller/loginController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// login page
router.get('/', decorateHtmlResponse("Login"), getLogin);

module.exports = router;