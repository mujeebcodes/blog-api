const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({
      message: "User does not exist. Please sign up",
    });
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({
      message: "Incorrect email/password",
    });
  }

  const token = await jwt.sign(
    { _id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    message: "Successfully logged in",
    data: { user, token },
  });
};

module.exports = { createUser, loginUser };
