const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: [true, "Please write title"],
    },
    body: {
      type: String,
      required: [true, "Please write body"],
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("BlogModel", blogSchema);
