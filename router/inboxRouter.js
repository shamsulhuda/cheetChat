// External imports
const express = require("express");

const router = express.Router();

// Internal imports
const { getInbox } = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const { checkLogin } = require("../middlewares/common/checkLogin");

// login page
router.get("/", decorateHtmlResponse("Inbox"), checkLogin, getInbox);

module.exports = router;
