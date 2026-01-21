import React from 'react';
import './DataUsage.css';

const DataUsage = () => {
  return (
    <div className="policy-container">
      <div className="policy-content">
        <h1>How Data Works in PortShop</h1>
        <p className="last-updated">Student Project - Transparent About How We Handle Data</p>

        <section>
          <h2>Data Flow Overview</h2>
          <p>
            PortShop is built with MERN stack (MongoDB, Express, React, Node.js). 
            Here's simply how your data moves through the system:
          </p>
        </section>

        <section>
          <h2>What Data We Collect</h2>
          <ul>
            <li><strong>Registration:</strong> Username, email, password</li>
            <li><strong>Shopping:</strong> Cart items, orders, wishlist</li>
            <li><strong>Profile:</strong> Address, phone (if provided)</li>
            <li><strong>Technical:</strong> IP address, browser type (for debugging)</li>
          </ul>
        </section>

        <section>
          <h2>How It Flows</h2>
          
          <h3>1. Frontend (Your Browser)</h3>
          <p>
            When you register or browse, React collects your input and stores a login token. 
            This happens locally in your browser.
          </p>

          <h3>2. To Our Server (Express.js)</h3>
          <pre><code>
When you submit a form:
  → Data sent via HTTPS (encrypted)
  → Express validates the input
  → Checks if you're authorized (JWT token)
  → Processes the request
          </code></pre>

          <h3>3. Stored in Database (MongoDB)</h3>
          <p>
            Valid data is stored in MongoDB. Your password is hashed with bcrypt - 
            we can't read it even if we tried. Other sensitive data is encrypted.
          </p>
        </section>

        <section>
          <h2>Key Security Points</h2>
          <ul>
            <li>✅ HTTPS encryption when data travels</li>
            <li>✅ Passwords hashed with bcrypt</li>
            <li>✅ JWT tokens for authentication</li>
            <li>✅ Each user can only see their own data</li>
            <li>✅ No data shared with advertisers or third parties</li>
          </ul>
        </section>

        <section>
          <h2>The Tech Stack Explained</h2>
          
          <h3>React (Frontend)</h3>
          <ul>
            <li>UI rendering and form handling</li>
            <li>Stores cart and auth tokens locally</li>
          </ul>

          <h3>Express & Node.js (Backend)</h3>
          <ul>
            <li>Receives and validates requests</li>
            <li>Handles authentication and authorization</li>
            <li>Processes business logic (orders, products)</li>
          </ul>

          <h3>MongoDB (Database)</h3>
          <ul>
            <li>Stores users, products, orders, categories</li>
            <li>Passwords are hashed and salted</li>
            <li>Only accessible from backend</li>
          </ul>
        </section>

        <section>
          <h2>How Long We Keep Data</h2>
          <ul>
            <li><strong>While you're logged in:</strong> Active use</li>
            <li><strong>Order history:</strong> As long as your account exists</li>
            <li><strong>After you delete your account:</strong> Deleted within 7 days</li>
          </ul>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <ul>
            <li><strong>Vercel:</strong> Hosts the frontend (frontend code only)</li>
            <li><strong>MongoDB Atlas:</strong> Cloud database hosting (encrypts data at rest)</li>
            <li>Your data doesn't go anywhere else</li>
          </ul>
        </section>

        <section>
          <h2>What We Share / Don't Share</h2>
          <p><strong>❌ We DO NOT share:</strong></p>
          <ul>
            <li>Your email with marketers</li>
            <li>Your data with ads companies</li>
            <li>Your passwords (we don't even have them unencrypted)</li>
          </ul>

          <p><strong>✅ We might share with:</strong></p>
          <ul>
            <li>Payment processors (if real payments were used)</li>
            <li>Shipping services (if real orders)</li>
            <li>No one else, really</li>
          </ul>
        </section>

        <section>
          <h2>For Recruiters & Testers</h2>
          <p>
            This is a student project showcasing full-stack development skills. 
            When testing:
          </p>
          <ul>
            <li>Your test data is stored securely just like real data</li>
            <li>You can delete your test account anytime</li>
            <li>The code is available on GitHub - inspect it yourself!</li>
            <li>Security follows industry best practices for a student project</li>
          </ul>

          <h3>Test Account (For Quick Demo)</h3>
          <p>Want to try it out right away?</p>
          <ul>
            <li><strong>Email:</strong> user@example.com</li>
            <li><strong>Password:</strong> Users123</li>
          </ul>
        </section>

        <section>
          <h2>Questions?</h2>
          <p>
            Email: <a href="mailto:softakoppi@gmail.com">softakoppi@gmail.com</a>
          </p>
        </section>

        <div className="policy-footer">
          <p>Honest data practices - that's the goal 🎯</p>
        </div>
      </div>
    </div>
  );
};

export default DataUsage;
