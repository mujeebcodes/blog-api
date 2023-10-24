const express = require("express");
const router = express.Router();

const {
  validateSignUp,
  validateLogin,
} = require("../middlewares/requestValidator");
const {
  createUser,
  loginUser,
  getSignup,
  getLogin,
  logoutUser,
} = require("../controllers/authController");

router.get("/signup", getSignup);
router.get("/login", getLogin);
router.get("/logout", logoutUser);
router.post("/signup", validateSignUp, createUser);
router.post("/login", validateLogin, loginUser);

module.exports = router;
