// External imports
const express = require("express");

const router = express.Router();

// Internal imports
const { getUsers } = require("../controller/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUpload = require("../middlewares/users/avatarUpload");

// login page
router.get("/", decorateHtmlResponse("Users"), getUsers);

router.post("/", avatarUpload);

module.exports = router;
