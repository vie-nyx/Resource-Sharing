import { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = ({ onUploadSuccess }) => {
  const [subject, setSubject] = useState('');
  const [file, setFile] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('subject', subject);
    formData.append('email', sessionStorage.getItem("studentEmail"));

    try {
      const res = await axios.post('http://127.0.0.1:3001/api/pdfs/upload', formData);
      onUploadSuccess(res.data);
      setSubject('');
      setFile(null);
      setSuccessMessage('PDF uploaded successfully!');
      setErrorMessage('');
      
      // Optionally clear the message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3001);
    } catch (err) {
      console.error('Upload failed:', err);
      setErrorMessage('Upload failed. Please try again.');
      setSuccessMessage('');
      
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div className="upload-section">
      <h2>Upload PDF</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </div>
        
        <div className="form-group">
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          >
            <option value="">Select Subject</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="History">History</option>
          </select>
        </div>

        <button type="submit" className="upload-button">
          Upload PDF
        </button>
      </form>

    </div>
  );
};

export default FileUpload;
