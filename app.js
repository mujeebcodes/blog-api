const express = require("express");
const app = express();
require("dotenv").config();
const session = require("express-session");
const flash = require("connect-flash");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/auth");
const blogRouter = require("./routes/blog");
const db = require("./db");

db.connect();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(flash());

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.get("/", (req, res) => {
  res.redirect("/blog");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
