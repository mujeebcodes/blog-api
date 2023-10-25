const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
require("dotenv").config();

const tokenAuth = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        res.redirect("/users/login");
      } else {
        req.userId = decodedToken._id;
        let user = await UserModel.findById(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    res.redirect("login");
  }
};

module.exports = { tokenAuth };
