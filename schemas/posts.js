const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
  postId: {
    type: Number,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  userName: {
    type: String,
  },
  date: {
    format:Date,
    type: String,
    required: true,
  },
  pwd: {
    type: String,
  },
})

module.exports = mongoose.model("Posts", postsSchema);