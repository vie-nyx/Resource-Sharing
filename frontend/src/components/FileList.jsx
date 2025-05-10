import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileList.css';
import SubjectList from './SubjectList';


const FileList = () => {
  const [pdfs, setPdfs] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch PDFs from backend
  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/api/pdfs');
        setPdfs(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchPdfs();
  }, []);

  // Filter PDFs based on selected subject
  const filteredPdfs = pdfs.filter(pdf => 
    !selectedSubject || pdf.subject === selectedSubject
  );

  // Subject cards data
  const subjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Mathematics'
  ];

  return (
    <div className="file-list-container">
      {/* Navbar */}
      <nav className="navbar ">
        <div className="nav-left">
          <button className="nav-button">Upload New PDF</button>
        </div>
        <div className="nav-right">
          <input
            type="text"
            className="search-input"
            placeholder="Search PDFs..."
          />
        </div>
      </nav>
      {/* Subject Filter Cards */}
      <SubjectList onSelect={setSelectedSubject} selectedSubject={selectedSubject} />


      {/* Loading State */}
      {loading && (
        <div className="pdf-grid">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="pdf-card skeleton" />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && <div className="error-message">Error: {error}</div>}

      {/* PDF List */}
      {!loading && !error && (
        <>
          {filteredPdfs.length === 0 ? (
            <div className="empty-state">
              <h3>No PDFs found{selectedSubject ? ` for ${selectedSubject}` : ''}</h3>
            </div>
          ) : (
            <div className="subject-category">
              <h2 className="subject-title">
                {selectedSubject || 'All Subjects'}
              </h2>
              <div className="pdf-grid">
                {filteredPdfs.map((pdf) => (
                  <div key={pdf._id} className="pdf-card">
                    <div className="pdf-content">
                      <div className="subject-chip">{pdf.subject}</div>
                      <a
                        href={`http://127.0.0.1:3001/api/pdfs/${pdf.filename}`}
                        download={pdf.originalName}
                        className="pdf-link"
                      >
                        {pdf.originalName}
                      </a>
                      <div className="pdf-actions">
                        <div className="action-buttons">
                          <a
                            href={`http://127.0.0.1:3001/uploads/${pdf.filename}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="view-button"
                          >
                            View
                          </a>
                          <a
                            href={`http://127.0.0.1:3001/api/pdfs/${pdf.filename}`}
                            download={pdf.originalName}
                            className="view-button"
                          >
                            Download
                          </a>
                        </div>
                        <span className="upload-date">
                          Uploaded: {new Date(pdf.uploadDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FileList;