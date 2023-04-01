// external imports
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");
const User = require("../../models/People");
const { path } = require("path");
const { unlink } = require("fs");

// add user
const addUserValidators = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name only contain alphabel space and hyphen(-)!")
    .trim(),
  check("email")
    .isEmail()
    .withMessage("Invalid Email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createHttpError("Email already is used!");
        }
      } catch (error) {
        throw createHttpError(error.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Must be valid Bangladeshi mobile number")
    .custom(async (value) => {
      try {
        const user = User.findOne({ mobile: value });
        if (user) {
          throw createHttpError("Mobile number already used!");
        }
      } catch (error) {
        throw createHttpError(error.message);
      }
    }),
  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters log & contains at least 1 lowercase, uppercase, number & symbol"
    ),
];

const addUserValidationHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log(err);
        }
      );
    }
    res.status(500).json({
      errors: mappedErrors,
    });
  }
};

module.exports = {
  addUserValidators,
  addUserValidationHandler,
};
