const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const User = require("./User");

const tweetSchema = new Schema(
  {
    content: { type: String, minlength: 1, maxlength: 140, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    // createdAt: { timestamps: "created_at" },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true },
);

tweetSchema.set("toJSON", { virtuals: true });

const Tweet = mongoose.model("Tweet", tweetSchema);

module.exports = Tweet;
