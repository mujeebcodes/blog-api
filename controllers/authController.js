const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getLogin = (req, res) => {
  res.render("login");
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

    return res.status(201).json({
      status: "success",
      data: { user: newUser },
    });
  } catch (error) {
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
      res.redirect("/blog");
    } else {
      req.flash("error", "Invalid username or password.");
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "Login failed. Please try again.");
    res.redirect("login");
  }
};

const logoutUser = (req, res) => {
  res.clearCookie("jwt");
  res.redirect("/blog");
};

module.exports = { getLogin, getSignup, createUser, loginUser, logoutUser };
