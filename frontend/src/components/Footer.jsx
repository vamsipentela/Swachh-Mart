import React from 'react';
// Fixed icons using pre-loaded Bootstrap classes
import './Footer.css';

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="container footer-grid-v4">
        <div className="footer-brand">
          <div className="logo-footer">SwacHh<span>Mart</span>.</div>
          <p className="brand-pitch">Redefining fresh. We source the best, so you can eat the best. Your neighborhood's favorite supermarket is now just a click away.</p>
          <div className="social-links-footer">
            <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
            <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
            <a href="#" className="social-icon"><i className="bi bi-telephone-fill"></i></a>
          </div>
        </div>

        <div className="footer-nav-col">
          <h6>Shop</h6>
          <ul>
            <li><a href="#aisles">Vegetables</a></li>
            <li><a href="#aisles">Fruits</a></li>
            <li><a href="#aisles">Dairy & Bakery</a></li>
            <li><a href="#aisles">Pantry Items</a></li>
          </ul>
        </div>

        <div className="footer-nav-col">
          <h6>Support</h6>
          <ul>
            <li><a href="#visit">Contact Us</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        <div className="footer-contact-col">
          <h6>Get in Touch</h6>
          <div className="contact-item">
            <i className="bi bi-geo-alt-fill"></i>
            <p>Indresham, Hyderabad, Telangana 502319</p>
          </div>
          <div className="contact-item">
            <i className="bi bi-telephone-fill"></i>
            <p>093813 88171</p>
          </div>
        </div>
      </div>
      
      <div className="container footer-bottom-v4">
        <div className="divider"></div>
        <div className="bottom-flex">
          <p>&copy; {new Date().getFullYear()} SwacHh Mart. All rights reserved.</p>
          <div className="legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
