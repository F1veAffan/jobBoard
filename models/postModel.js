const mongoose = require("mongoose");

const PostModel = mongoose.model(
  "jobPosts",
  mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: new Date(),
    },
  })
);

module.exports = PostModel;
