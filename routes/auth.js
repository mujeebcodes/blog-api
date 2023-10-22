const express = require("express");
const router = express.Router();

const {
  validateSignUp,
  validateLogin,
} = require("../middlewares/requestValidator");
const { createUser, loginUser } = require("../controllers/authController");

router.post("/signup", validateSignUp, createUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
