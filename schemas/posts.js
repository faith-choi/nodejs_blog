const mongoose = require('mongoose');

const postsSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  title: {
    type: String,
  },
  content: {
    type: String,
  },
  date: {
    type: String,
  },
  pwd: {
    type: String,
  },
})

module.exports = mongoose.model("Posts", postsSchema);