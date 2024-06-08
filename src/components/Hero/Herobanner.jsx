import React from 'react';
import heroimg from './Laptop-computer-with-apps-icons-interface-on-transparent-background-PNG.png';
import './hero.css';
import { Link } from 'react-router-dom';

export default function Herobanner() {
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" id="hero-container">
      <div className="image-container col-5">
        <img src={heroimg} alt="heroimage" className="hero-img" />
       
      </div> 
      <div className="hero-text col-5">
          <h1>We offer fair prices!</h1>
          <Link to="/" className="custom-link">Check our products</Link>
        </div>
    </div>
  );
}
