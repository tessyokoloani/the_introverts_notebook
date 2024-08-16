require("dotenv").config(); // for environment variables
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

const userController = require("./controllers/introvertUsers");
const contentController = require("./controllers/introvertContent");

// Connect to database

connectDB();

// Middlewares

app.use(cors());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static("views"));
app.use(cookieParser(process.env.COOKIESIGNATURE));

//route
app.use("/api/content", contentController);
app.use("/api/user", userController);
app.get("/test", (req, res) => {
  const date = new Date("September, 19, 83");
  console.log(date.getFullYear());
  console.log(req.cookies.email);
  res.send(`The time is ${date.getMonth()}`);
});

//connect server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
