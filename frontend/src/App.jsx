import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';
import { initData } from './data/categories';
import './App.css';

// Dynamic Imports for Lazy Loading
const Home = lazy(() => import('./pages/Home'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

function App() {
  useEffect(() => {
    initData();
  }, []);

  return (
    <div className="app-wrapper">
      <Suspense fallback={<Loader />}>
        <ScrollToTop />
        {/* Premium Navbar Component */}
        <Navbar />

        {/* Main Content Routed */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:name" element={<CategoryPage />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>

        {/* LUXURY DARK FOOTER */}
        <footer className="footer-luxury">
          <div className="container">
            <div className="footer-luxury-grid">
              <div className="f-col main-brand">
                <div className="footer-logo">Swachh<span>Mart</span></div>
                <p className="f-bio">Your neighborhood's premium supermarket, committed to quality, cleanliness, and convenience: every single day.</p>
                <div className="footer-capsule-badge">
                  <i className="bi bi-patch-check-fill"></i>
                  Hygienic • Fresh • Reliable
                </div>
              </div>

              <div className="f-col">
                <h5>Quick Links</h5>
                <ul className="footer-nav-list">
                  <li><a href="/">Home</a></li>
                  <li><a href="/#about">About Us</a></li>
                  <li><a href="/#aisles">Aisles</a></li>
                </ul>
              </div>

              <div className="f-col">
                <h5>Contact Info</h5>
                <ul className="footer-contact-v3">
                  <li>
                    <i className="bi bi-geo-alt-fill"></i>
                    3/ Part Associates, Plot no 2, Citizens Colony, Indresham, Hyderabad, Telangana 502319
                  </li>
                  <li>
                    <i className="bi bi-telephone-fill"></i>
                    093813 88171
                  </li>
                </ul>
              </div>

              <div className="f-col">
                <h5>Follow Us</h5>
                <div className="social-circles-v3">
                  <a href="#" aria-label="Instagram"><i className="bi bi-instagram"></i></a>
                  <a href="#" aria-label="Facebook"><i className="bi bi-facebook"></i></a>
                  <a href="#" aria-label="Message Us"><i className="bi bi-chat-dots-fill"></i></a>
                </div>
              </div>
            </div>

            <div className="footer-bottom-v3">
              <p>&copy; {new Date().getFullYear()} Swachh Mart. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </Suspense>
    </div>
  );
}

export default App;
