import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">PortShop</h3>
          <p className="footer-description">
            A modern MERN stack e-commerce platform offering quality products with seamless shopping experience.
          </p>
          <div className="social-links">
            <button className="social-icon" title="GitHub" aria-label="GitHub">
              <span>🔗</span>
            </button>
            <button className="social-icon" title="Twitter" aria-label="Twitter">
              <span>🐦</span>
            </button>
            <button className="social-icon" title="LinkedIn" aria-label="LinkedIn">
              <span>💼</span>
            </button>
          </div>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/profile">Account</Link></li>
            <li><Link to="/orders">Order History</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Company</h4>
          <ul className="footer-links">
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Legal</h4>
          <ul className="footer-links">
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
            <li><Link to="/refund-policy">Refund Policy</Link></li>
            <li><Link to="/shipping-policy">Shipping Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Technical Info</h4>
          <ul className="footer-links">
            <li><Link to="/tech-stack">Tech Stack</Link></li>
            <li><Link to="/data-usage">Data Usage</Link></li>
            <li><a href="https://portshop-red.vercel.app/" target="_blank" rel="noopener noreferrer">Live Demo</a></li>
            <li><a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copyright">
          <p>&copy; {currentYear} PortShop. All rights reserved.</p>
        </div>
        <div className="footer-credits">
          <p>Built with React | Powered by MERN Stack</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
