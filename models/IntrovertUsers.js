const mongoose = require("mongoose");

const introvertUser = new mongoose.Schema({
  name: String,
  displayName: String,
  dateOfBirth: Date,
  age: Number,
  email: { type: String, unique: true },
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("IntrovertUsers", introvertUser);
