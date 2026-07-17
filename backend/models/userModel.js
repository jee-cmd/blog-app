const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/blogApp")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.error("MongoDB Connection Error:", err));


const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  isAdmin: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;