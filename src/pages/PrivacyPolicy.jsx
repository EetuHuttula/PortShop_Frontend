import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="policy-container">
      <div className="policy-content">
        <h1>Privacy Policy</h1>
        <p className="last-updated">PortShop Student Project - January 2026</p>

        <section>
          <h2>What Data We Collect</h2>
          <p>
            When you use PortShop, we store:
          </p>
          <ul>
            <li>Your username, email, and password (hashed for security)</li>
            <li>Your shopping cart and order history</li>
            <li>Your profile information</li>
            <li>Basic browser data (IP address, device type)</li>
          </ul>
        </section>

        <section>
          <h2>How We Use Your Data</h2>
          <ul>
            <li>To create and manage your account</li>
            <li>To process orders and show your purchase history</li>
            <li>To improve the app and fix bugs</li>
            <li>That's it - we don't sell your data</li>
          </ul>
        </section>

        <section>
          <h2>How We Store Your Data</h2>
          <p>
            Your data is stored in a MongoDB database. Passwords are hashed with bcrypt so we can't read them even if we wanted to. 
            Communication between your browser and our server is encrypted (HTTPS).
          </p>
        </section>

        <section>
          <h2>Your Rights</h2>
          <p>
            You can delete your account anytime through your profile page. 
            If you have questions, email us at <a href="mailto:softakoppi@gmail.com">softakoppi@gmail.com</a>
          </p>
        </section>

        <section>
          <h2>The Real Talk</h2>
          <p>
            This is a student project built for learning. The security is solid, but if something breaks, we'll fix it. 
            We'll never intentionally share your data with anyone else.
          </p>
        </section>

        <div className="policy-footer">
          <p>Simple and honest - that's our policy</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
