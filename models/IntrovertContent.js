const mongoose = require("mongoose");

const IntrovertContent = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: String, ref: "IntrovertUsers" },
  public: { type: Boolean, default: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("IntrovertContents", IntrovertContent);
