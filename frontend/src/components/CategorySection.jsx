import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '../data/categories';
import Skeleton from './Skeleton';
import './CategorySection.css';

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getCategories();
      setCategories(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Group categories by section
  const groupedCategories = categories.reduce((acc, cat) => {
    const sectionName = cat.section || 'Our Assortment';
    if (!acc[sectionName]) {
      acc[sectionName] = [];
    }
    acc[sectionName].push(cat);
    return acc;
  }, {});

  const sections = Object.keys(groupedCategories);

  return (
    <section id="aisles" className="category-section">
      <div className="container">
        
        <div className="section-header-center" style={{ marginBottom: '40px' }}>
          <span className="section-kicker">Digital Catalog</span>
          <h2 className="section-title">Explore Our Aisles</h2>
        </div>

        {loading ? (
          <div className="catalog-block">
            <Skeleton width="200px" height="24px" className="catalog-block-title" style={{ marginBottom: '20px' }} />
            <div className="catalog-items-row">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="catalog-item-card">
                  <Skeleton width="100%" height="80px" borderRadius="12px" />
                  <Skeleton width="60%" height="14px" style={{ marginTop: '10px' }} />
                </div>
              ))}
            </div>
          </div>
        ) : sections.length === 0 ? (
          <div className="empty-catalog-msg" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
             <i className="bi bi-folder2-open" style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}></i>
             <h3>No categories found</h3>
             <p>The catalog is currently empty. Use the Admin Panel to add your sections and items.</p>
          </div>
        ) : (
          sections.map((sectionName, index) => (
            <div className="catalog-block" key={index} style={{ marginTop: index > 0 ? '40px' : '0' }}>
              <h3 className="catalog-block-title">{sectionName}</h3>
              <div className="catalog-items-row">
                {groupedCategories[sectionName].map((category, idx) => (
                  <div 
                    key={category.id || idx} 
                    className="catalog-item-card"
                    onClick={() => navigate(`/category/${category.name}`)}
                  >
                    <div className="catalog-image-box">
                      <img src={category.image} alt={category.name} loading="lazy" />
                    </div>
                    <div className="catalog-item-name">{category.name}</div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}

      </div>
    </section>
  );
};

export default CategorySection;
