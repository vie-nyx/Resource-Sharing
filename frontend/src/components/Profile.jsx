// Profile.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'; // Create this for styling

const Profile = () => {
  const email = sessionStorage.getItem('studentEmail');
  console.log('email',email);
  const [pdfs, setPdfs] = useState([]);
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    if (email) {
      // Fetch uploaded PDFs
      axios.get(`http://127.0.0.1:3001/api/pdfs/user/${email}`)
        .then(res => setPdfs(res.data))
        .catch(err => console.error(err));
      
      // Optionally: Fetch user info from DB if you have a route
      axios.get(`http://127.0.0.1:3001/user/${email}`)
        .then(res => setUserInfo(res.data))
        .catch(err => console.error(err));
    }
  }, [email]);
  const handleLogout = () => {
    sessionStorage.removeItem('studentEmail');
    // Use your routing method here - this example uses window.location
    window.location.href = '/login';
  };
  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:3001/api/pdfs/${id}`)
      .then(() => setPdfs(pdfs.filter(pdf => pdf._id !== id)))
      .catch(err => console.error(err));
  };

  return (
    <div className="profile-container">
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
      <div className="profile-header">
        <h2>Welcome back, {userInfo.name || email}</h2>
        {userInfo.name && <p>{email}</p>}
      </div>

      <div className="pdf-section">
        <h4>Your Uploaded Documents</h4>
        {pdfs.length === 0 ? (
          <p className="no-files">No documents uploaded yet</p>
        ) : (
          <ul className="pdf-list">
            {pdfs.map((pdf) => (
              <li className="pdf-item" key={pdf._id}>
                <a
                  href={`http://127.0.0.1:3001/api/pdfs/${pdf.filename}`}
                  download={pdf.originalName}
                  className="pdf-link"
                >
                  {pdf.originalName}
                </a>
                <button onClick={() => handleDelete(pdf._id)} className="delete-btn">
                  Delete File
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Profile;
