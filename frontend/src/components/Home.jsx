import { Link } from "react-router-dom";
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faFolderOpen, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="home-container">
      <Link to='/login' className="logout-link">
        <FontAwesomeIcon icon={faSignOutAlt} /> Logout
      </Link>
      
      <div className="glass-panel">
        <h1>Welcome to Your Dashboard</h1>
        
        <div className="action-grid">
          <Link to='/upload' className="action-btn">
            <FontAwesomeIcon icon={faUpload} />
            Upload PDF
          </Link>
          
          <Link to='/pdfs' className="action-btn">
            <FontAwesomeIcon icon={faFolderOpen} />
            Browse Files
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home;