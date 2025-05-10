import './Footer.css';
import { FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4 className="footer-heading">StudyShare</h4>
          <p className="footer-description">
            Empowering collaborative learning through shared knowledge and resources.
          </p>
        </div>

        <div className="footer-section">
          <h5 className="footer-subheading">Quick Links</h5>
          <ul className="footer-link-list">
            <li><a href="/about" className="footer-link">About Us</a></li>
            <li><a href="/blog" className="footer-link">Blog</a></li>
            <li><a href="/contact" className="footer-link">Contact</a></li>
            <li><a href="/faq" className="footer-link">FAQ</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5 className="footer-subheading">Legal</h5>
          <ul className="footer-link-list">
            <li><a href="/privacy" className="footer-link">Privacy Policy</a></li>
            <li><a href="/terms" className="footer-link">Terms of Service</a></li>
            <li><a href="/cookies" className="footer-link">Cookie Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h5 className="footer-subheading">Connect With Us</h5>
          <div className="social-icons">
            <a href="https://linkedin.com" aria-label="LinkedIn" className="social-icon">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" aria-label="Twitter" className="social-icon">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" aria-label="Instagram" className="social-icon">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="copyright">
          © {new Date().getFullYear()} StudyShare. All rights reserved.
        </p>
        <p className="footer-disclaimer">
          Part of the Education Technology Group
        </p>
      </div>
    </footer>
  );
}