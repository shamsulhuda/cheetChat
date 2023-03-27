// External imports
const express = require("express");

const router = express.Router();

// Internal imports
const { getInbox } = require("../controller/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// login page
router.get('/', decorateHtmlResponse("Inbox"), getInbox);

module.exports = router;