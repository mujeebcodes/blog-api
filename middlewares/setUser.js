const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");
require("dotenv").config();

const setUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        return next();
      } else {
        // req.userId = decodedToken._id;
        let user = await UserModel.findById(decodedToken._id);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { setUser };
