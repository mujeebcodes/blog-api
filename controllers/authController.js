const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getLogin = (req, res) => {
  const error = req.flash("error");
  const success = req.flash("success");
  res.render("login", { error, success });
};

const getSignup = (req, res) => {
  res.render("signup");
};
const createUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const isExistingUser = await UserModel.findOne({
      email,
    });
    if (isExistingUser) {
      return res.status(409).json({
        message: "User already exists, please login",
      });
    }
    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      password,
    });
    req.flash("success", "Account created successfully. Please login");
    res.redirect("/user/login");
  } catch (error) {
    await req.flash("error");
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = await jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.cookie("jwt", token, { httpOnly: true, maxAge: 3600000 });
      req.flash("success", "Logged in successfully");
      res.redirect("/blog");
    } else {
      req.flash("error", "Invalid username or password.");
      res.redirect("/user/login");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Login failed. Please try again.");
    res.redirect("/user/login");
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  req.flash("success", "Logged out successfully");
  res.redirect("/blog");
};

module.exports = { getLogin, getSignup, createUser, loginUser, logoutUser };
