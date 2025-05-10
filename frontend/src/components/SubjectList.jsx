import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SubjectList.css';
const SubjectList = ({ onSelect, selectedSubject }) => {
  const [subjects, setSubjects] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:3001/api/pdfs');
        const pdfs = response.data;

        // Extract unique subjects
        const uniqueSubjects = [...new Set(pdfs.map(pdf => pdf.subject))];
        setSubjects(uniqueSubjects);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchSubjects();
  }, []);

  if (error) return <div className="error-message">Error loading subjects: {error}</div>;

  return (
    <div className="subject-filter">
      <div className="subject-grid">
        {subjects.map((subject) => (
          <div
            key={subject}
            className={`subject-card ${selectedSubject === subject ? 'active' : ''}`}
            onClick={() => onSelect(selectedSubject === subject ? null : subject)}
          >
            <h3>{subject}</h3>
            <p>{selectedSubject === subject ? 'Showing' : 'View'} {subject} PDFs</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
