import React from 'react';
import './TermsOfService.css';

const TermsOfService = () => {
  return (
    <div className="policy-container">
      <div className="policy-content">
        <h1>Terms of Service</h1>
        <p className="last-updated">PortShop Student Project - January 2026</p>

        <section>
          <h2>What You're Agreeing To</h2>
          <p>
            By using PortShop, you agree that:
          </p>
          <ul>
            <li>You'll use this for legitimate purposes (testing/demo, not hacking)</li>
            <li>You won't try to break the app or steal data</li>
            <li>You'll give accurate information when registering</li>
            <li>You're responsible for keeping your password safe</li>
          </ul>
        </section>

        <section>
          <h2>What We Promise</h2>
          <ul>
            <li>We'll keep your data safe and encrypted</li>
            <li>We'll try to keep the app running smoothly</li>
            <li>We won't sell your information</li>
            <li>We'll fix bugs when we find them</li>
          </ul>
        </section>

        <section>
          <h2>What We're NOT Responsible For</h2>
          <ul>
            <li>If the app crashes (we'll fix it though!)</li>
            <li>Lost or corrupted data (keep backups yourself)</li>
            <li>Any external links or third-party services</li>
            <li>If you forget your password</li>
          </ul>
        </section>

        <section>
          <h2>About Products & Orders</h2>
          <ul>
            <li>This is a demo - prices and products are fictional</li>
            <li>Orders are simulated for testing purposes</li>
            <li>No real money is charged (this is not a real shop)</li>
          </ul>
        </section>

        <section>
          <h2>Prohibited Activities</h2>
          <p>Don't:</p>
          <ul>
            <li>Try to hack or break the system</li>
            <li>Spam or abuse other users</li>
            <li>Pretend to be someone else</li>
            <li>Post inappropriate content</li>
            <li>Use automated tools or bots to spam</li>
          </ul>
        </section>

        <section>
          <h2>We Can Change These Rules</h2>
          <p>
            We might update these terms as we improve the app. We'll try to let you know, 
            but continued use means you accept the changes.
          </p>
        </section>

        <section>
          <h2>Questions or Problems?</h2>
          <p>
            Email us at <a href="mailto:softakoppi@gmail.com">softakoppi@gmail.com</a> or use the contact form.
          </p>
        </section>

        <div className="policy-footer">
          <p>Keep it simple, keep it honest</p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
