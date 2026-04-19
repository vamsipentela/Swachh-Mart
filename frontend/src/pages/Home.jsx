import React from 'react';
import Hero from '../components/Hero';
import CategorySection from '../components/CategorySection';

const Home = () => {
  return (
    <>
      <Hero />

      <section id="about" className="premium-story">
        <div className="container">
          <div className="story-editorial-grid">
            <div className="story-visual-side">
              <div className="story-image-main-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80"
                  alt="Inside Swachh Mart"
                  className="story-image-main"
                  loading="lazy"
                />
                <div className="story-experience-floating">
                  <span className="floating-year">Est. 2024</span>
                  <span className="floating-text">Excellence in every aisle</span>
                </div>
              </div>
            </div>

            <div className="story-content-side">
              <div className="story-badge-kicker">
                <i className="bi bi-stars"></i> Our Ethos
              </div>
              <h2 className="story-title-main">A commitment to pure, everyday excellence.</h2>
              <p className="story-lead-text">
                Swachh Mart was founded on a simple principle: grocery shopping shouldn't be a chore—it should be an experience. We meticulously source our produce from transparent local farms and world-class global artisans.
              </p>
              
              <div className="story-feature-grid">
                <div className="story-stat-box">
                  <div className="stat-v-header">
                     <i className="bi bi-people-fill"></i>
                     <span className="stat-v-number">10k+</span>
                  </div>
                  <span className="stat-v-label">Happy Families Linked</span>
                </div>
                
                <div className="story-stat-box">
                  <div className="stat-v-header">
                     <i className="bi bi-patch-check-fill"></i>
                     <span className="stat-v-number">100%</span>
                  </div>
                  <span className="stat-v-label">Quality Hand-Picked</span>
                </div>

                <div className="story-stat-box">
                  <div className="stat-v-header">
                     <i className="bi bi-clock-history"></i>
                     <span className="stat-v-number">2min</span>
                  </div>
                  <span className="stat-v-label">Quick Checkout Time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Catalog Section */}
      <CategorySection />

      {/* HIGH-END VISIT SECTION */}
      <section id="visit" className="visit-section-editorial">
        <div className="container">
          <div className="visit-grid-premium">
            <div className="visit-content-left">
              <div className="badge-modern">
                <i className="bi bi-geo-alt-fill"></i>
                Store Location
              </div>
              <h2 className="visit-title-editorial">Find Us in<br />Indresham, Hyderabad</h2>
              <p className="visit-lead">We're conveniently located in the heart of Indresham, with easy access and ample parking for a hassle-free shopping experience.</p>

              <div className="contact-card-v3">
                <div className="c-row">
                  <div className="c-icon-v3">
                    <i className="bi bi-geo-alt-fill"></i>
                  </div>
                  <div className="c-text">
                    <strong>Address</strong>
                    <p>3/ Part Associates, Plot no 2, Citizens colony, Indresham, Hyderabad, Telangana 502319</p>
                  </div>
                </div>
                <div className="c-row">
                  <div className="c-icon-v3">
                    <i className="bi bi-telephone-fill"></i>
                  </div>
                  <div className="c-text">
                    <strong>Phone</strong>
                    <p>093813 88171</p>
                  </div>
                </div>
                <div className="c-row">
                  <div className="c-icon-v3">
                    <i className="bi bi-clock-fill"></i>
                  </div>
                  <div className="c-text">
                    <strong>Hours</strong>
                    <p>Open Daily: 7:00 AM – 10:00 PM</p>
                  </div>
                </div>

                <a href="https://www.google.com/maps/dir//SwacHh+Mart+%E0%B0%B8%E0%B1%8D%E0%B0%B5%E0%B0%9A%E0%B1%8D%E0%B0%9A%E0%B1%8D+%E0%B0%AE%E0%B0%BE%E0%B0%B0%E0%B1%8D%E0%B0%9F%E0%B1%8D,+3%2F+Part+Associates,+Plot+no+2,+Citizens+colony,+Indresham,+Hyderabad,+Telangana+502319/@17.5576242,78.2626676,15z" target="_blank" rel="noreferrer" className="btn btn-directions-v3">
                  <i className="bi bi-arrow-up-right"></i>
                  Get Directions on Google Maps
                </a>
              </div>
            </div>

            <div className="visit-map-editorial">
              <iframe
                src="https://www.google.com/maps?q=Swachh+Mart,Indresham,Hyderabad&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Swachh Mart Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
