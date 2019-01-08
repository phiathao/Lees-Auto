import React from 'react';
import './Footer.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <footer className="footer">
    <div className="footer-content">
      <div className="footer-left">
        <p>Address: 124123141241241241241241</p>
        <p>Phone: 555-555-5555
    Monday-Friday 8AM-5PM</p>
        <p>&copy; Prime Digital Academy</p>
      </div>
      <div className="footer-right">
        Direction
      </div>
    </div>
  </footer>
);

export default Footer;
