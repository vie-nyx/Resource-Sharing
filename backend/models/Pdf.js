const mongoose = require('mongoose');

const PdfSchema = new mongoose.Schema({
  filename: String,
  originalName: String,
  path: String,
  subject: String,
  uploadedBy: String,
  uploadDate: {
    type: Date,
    default: Date.now
  },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Pdf', PdfSchema);