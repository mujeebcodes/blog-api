const express = require("express");
const app = express();
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
const db = require("./db");

db.connect();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", (req, res) => {
  res.redirect("/blog");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
