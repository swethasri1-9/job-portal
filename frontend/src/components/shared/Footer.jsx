import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-10 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-700">
        
        {/* Customer Support */}
        <div>
          <h3 className="font-bold mb-2 text-base">Customer Support</h3>
          <p className="mb-1">Toll Free: <strong>1800 123 4567</strong></p>
          <p>(10:00 AM to 6:00 PM, Mon - Sat)</p>
          <p className="mt-2">support@jobhunt.com</p>
        </div>

        {/* Recruiter Services */}
        <div>
          <h3 className="font-bold mb-2 text-base">Recruiter Services</h3>
          <ul className="space-y-1">
            <li>Job Posting</li>
            <li>Resume Database (Resdex)</li>
            <li>Assisted Hiring</li>
            <li>Employer Branding</li>
            <li>Talent Pulse</li>
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="font-bold mb-2 text-base">Information</h3>
          <ul className="space-y-1">
            <li>About Us</li>
            <li>Clients</li>
            <li>Careers</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-bold mb-2 text-base">Legal</h3>
          <ul className="space-y-1">
            <li>Grievances</li>
            <li>Summons and Notice</li>
            <li>Trust and Safety</li>
            <li>Whitehat</li>
          </ul>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 mt-10">
        © 2025 Job Hunt. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
