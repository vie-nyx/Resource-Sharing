const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  text: String,
  user: String, // Add a proper user schema if needed
  pdf: { type: mongoose.Schema.Types.ObjectId, ref: 'Pdf' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Comment', CommentSchema);
