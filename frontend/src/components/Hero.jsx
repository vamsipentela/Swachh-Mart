import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-premium">
      {/* Decorative background elements */}
      <div className="hero-bg-accent-1"></div>
      <div className="hero-bg-accent-2"></div>
      
      <div className="hero-container">
        <div className="hero-content-wrapper">
          <div className="hero-text-side">
            <div className="hero-badge-container fade-in-up">
              <div className="hero-badge">
                <span className="badge-dot"></span>
                Freshly Stocked Today
              </div>
              <div className="hero-badge">
                <span className="badge-dot" style={{ backgroundColor: '#F59E0B' }}></span>
                Best Price Guarantee
              </div>
            </div>
            
            <h1 className="hero-title fade-in-up">
              The <span className="text-highlight">Finest</span> Selection Of Fresh Produce.
            </h1>
            
            <p className="hero-description fade-in-up">
              Discover a curated collection of farm-fresh essentials, gourmet delights, 
              and daily needs. Quality you can trust, right in your neighborhood.
            </p>
            
            <div className="hero-cta-group fade-in-up">
              <a href="https://www.google.com/maps/dir//SwacHh+Mart+%E0%B0%B8%E0%B1%8D%E0%B0%B5%E0%B0%9A%E0%B1%8D%E0%B0%9A%E0%B1%8D+%E0%B0%AE%E0%B0%BE%E0%B0%B0%E0%B1%8D%E0%B0%9F%E0%B1%8D,+3%2F+Part+Associates,+Plot+no+2,+Citizens+colony,+Indresham,+Hyderabad,+Telangana+502319/@17.5576242,78.2626676,15z" target="_blank" rel="noreferrer" className="hero-btn-primary">
                Explore Store Location
                <i className="bi bi-arrow-right"></i>
              </a>
              <a href="#aisles" className="hero-btn-secondary">
                View Digital Catalog
              </a>
            </div>

            <div className="hero-stats fade-in-up">
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Organic Certified</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">Daily</span>
                <span className="stat-label">Fresh Arrivals</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-side">
            <div className="visual-container">
              {/* Main premium image */}
              <div className="main-image-card fade-in-left">
                <img 
                  src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80" 
                  alt="Fresh Vegetables" 
                  loading="lazy"
                />
              </div>
              
              {/* Floating secondary cards for depth */}
              <div className="floating-card floating-card-1 fade-in-up">
                <div className="card-glass">
                  <i className="bi bi-patch-check-fill"></i>
                  <span>Premium Quality</span>
                </div>
              </div>
              
              <div className="floating-card floating-card-2 fade-in-up">
                 <div className="card-glass">
                  <i className="bi bi-truck"></i>
                  <span>Same Day Fresh</span>
                </div>
              </div>

              {/* Decorative blob */}
              <div className="visual-blob"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
