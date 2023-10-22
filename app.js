const express = require("express");
const app = express();
require("dotenv").config();
const userRouter = require("./routes/auth");
const db = require("./db");

db.connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
