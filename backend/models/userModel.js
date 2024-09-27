const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter username"],
    },
    email: {
      type: String,
      required: [true, "Please enter email address"],
      unique: [true, "Email address already registered"],
    },
    password: {
      type: String,
      required: [true, "Please enter user password"],
      min: 6,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
