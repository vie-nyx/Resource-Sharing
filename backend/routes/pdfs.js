const express = require('express');
const router = express.Router();
const multer = require('multer');
const Pdf = require('../models/Pdf');
const fs = require('fs');

// File storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// Upload PDF
router.post('/upload', upload.single('pdf'), async (req, res) => {
  try {
    console.log("Hi");
    const { subject } = req.body;
    const newPdf = new Pdf({
      filename: req.file.filename,
      originalName: req.file.originalname,
      uploadedBy: req.body.email,
      path: req.file.path,
      subject
    });
    await newPdf.save();
    res.status(200).json({message: 'PDF uploaded successfully!'});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
const path = require('path');

router.get('/:filename', (req, res) => {
  console.log('hi');
  const filePath = path.join(__dirname,'..', 'uploads', req.params.filename);
  console.log('File path:', filePath); // Log the file path to check
  res.download(filePath, (err) => {
    if (err) {
      console.log("Error in downloading file:", err);
    }
  });
});

// Get all PDFs
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search) {
      query = {
        $or: [
          { originalName: { $regex: search, $options: 'i' } },
          { subject: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const pdfs = await Pdf.find(query);
    res.json(pdfs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get('/user/:email', async (req, res) => {
  try {
      console.log("hi");
      const { email } = req.params;
      const pdfs = await Pdf.find({ uploadedBy: email });
      res.json(pdfs);
  } catch (err) {
      res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const pdf = await Pdf.findById(req.params.id);
    if (!pdf) return res.status(404).json({ error: 'PDF not found' });

    const filePath = path.join(__dirname, '..', 'uploads', pdf.filename);
    console.log('File to delete:', filePath);

    // Check if the file exists before attempting to delete it
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);  // Delete file
      console.log('File deleted successfully');
    } else {
      return res.status(404).json({ error: 'File not found' });
    }

    const deleteResult = await Pdf.findByIdAndDelete(req.params.id); // Delete from DB
    console.log('Deleted PDF from DB:', deleteResult);

    res.json({ message: 'PDF deleted successfully' });
  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ error: 'Delete failed' });
  }
});

module.exports = router;