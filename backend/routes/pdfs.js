const express = require('express');
const router = express.Router();
const multer = require('multer');
const Pdf = require('../models/Pdf');

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

module.exports = router;