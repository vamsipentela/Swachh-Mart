import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <nav className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="nav-container-v2">
          {/* Logo (Left) */}
          <div className="nav-left">
            <Link to="/" className="logo-v2" onClick={closeMenu}>
              Swachh<span>Mart</span>.
            </Link>
          </div>

          {/* Nav Links + Button (Desktop - Right) */}
          <div className="nav-right desktop-only">
            <div className="nav-links-wrapper">
              <Link to="/" className="nav-link-item">Home</Link>
              <a href="/#about" className="nav-link-item">Our Story</a>
              <a href="/#aisles" className="nav-link-item">Aisles</a>
            </div>
            
            <a href="https://www.google.com/maps/dir//SwacHh+Mart+%E0%B0%B8%E0%B1%8D%E0%B0%B5%E0%B0%9A%E0%B1%8D%E0%B0%9A%E0%B1%8D+%E0%B0%AE%E0%B0%BE%E0%B0%B0%E0%B1%8D%E0%B0%9F%E0%B1%8D,+3%2F+Part+Associates,+Plot+no+2,+Citizens+colony,+Indresham,+Hyderabad,+Telangana+502319/@17.5576242,78.2626676,15z" target="_blank" rel="noreferrer" className="find-store-button">
              Find Store
            </a>
          </div>

          {/* Hamburger Icon (Mobile - Right) */}
          <div className="mobile-nav-toggle mobile-only">
            <button className="hamburger-icon" onClick={toggleMobileMenu} aria-label="Toggle menu">
              <i className={`bi ${isMobileMenuOpen ? 'bi-x' : 'bi-list'}`}></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}></div>

      {/* Mobile Right Sidebar Menu */}
      <div className={`mobile-menu-drawer ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <Link to="/" className="logo-v2" onClick={closeMenu}>
            Swachh<span>Mart</span>.
          </Link>
          <button className="close-menu-icon" onClick={toggleMobileMenu}>
            <i className="bi bi-x"></i>
          </button>
        </div>
        
        <div className="mobile-menu-body">
          <ul className="mobile-nav-list">
            <li><Link to="/" onClick={closeMenu}>Home</Link></li>
            <li><a href="/#about" onClick={closeMenu}>Our Story</a></li>
            <li><a href="/#aisles" onClick={closeMenu}>Aisles</a></li>
          </ul>
          
          <div className="mobile-menu-footer">
            <a href="https://www.google.com/maps/dir//SwacHh+Mart+%E0%B0%B8%E0%B1%8D%E0%B0%B5%E0%B0%9A%E0%B1%8D%E0%B0%9A%E0%B1%8D+%E0%B0%AE%E0%B0%BE%E0%B0%B0%E0%B1%8D%E0%B0%9F%E0%B1%8D,+3%2F+Part+Associates,+Plot+no+2,+Citizens+colony,+Indresham,+Hyderabad,+Telangana+502319/@17.5576242,78.2626676,15z" target="_blank" rel="noreferrer" className="find-store-button mobile-full-width">
              <i className="bi bi-geo-alt-fill"></i> Find Store
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
