// External imports
const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
// Internal imports
const User = require("../models/People");
// Get login page

function getLogin(req, res, next) {
  res.render("index");
}

// login
async function login(req, res, next) {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        // prepare the user object
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };
        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });
        // set cookie
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.COOKIE_EXPIRY,
          httpOnly: true,
          signed: true,
        });
        // set loged in user local identifier
        res.locals.loggedInUser = userObject;
        // render the redirect page
        res.render("inbox");
      } else {
        throw createHttpError("Login failed! Please try again!");
      }
    } else {
      throw createHttpError("Login failed! Please try again!");
    }
  } catch (error) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
}

// logout
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("loged out");
}

module.exports = {
  getLogin,
  login,
  logout,
};
