const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
const { tokenAuthLogger } = require("../logger");
require("dotenv").config();

const tokenAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        tokenAuthLogger.error(err.message);
        res.locals.user = null;
        res.redirect("/users/login");
      } else {
        tokenAuthLogger.info("token validated successfully");
        req.userId = decodedToken._id;
        let user = await UserModel.findById(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    tokenAuthLogger.error("You're not authorized to access this route");
    res.redirect("/user/login");
  }
};

module.exports = { tokenAuth };
