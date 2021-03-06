const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categorie: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  authorName: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Course", CourseSchema);
