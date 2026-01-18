import React from 'react';
import heroimg from './Laptop-computer-with-apps-icons-interface-on-transparent-background-PNG.png';
import './hero.css';
import { Link } from 'react-router-dom';

export default function Herobanner() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Premium Laptops</h1>
          <p>Quality devices at unbeatable prices</p>
          <Link to="/" className="hero-button">Shop Now</Link>
        </div>
        <div className="hero-image">
          <img src={heroimg} alt="laptop" className="hero-img" />
        </div>
      </div>
    </div>
  );
}
