const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const tokenAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    console.log(header);
    if (!header) {
      return res.status(401).json({
        message: "You are not authorized. Please provide a token",
      });
    }
    const token = header.split(" ")[1];
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById({ _id: decoded._id });

    if (!user) {
      return res.status(401).json({
        message: "You are not authorized",
      });
    }
    req.userId = decoded._id;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { tokenAuth };
