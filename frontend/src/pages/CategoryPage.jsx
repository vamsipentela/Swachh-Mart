import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import { getCategories } from '../data/categories';
import Skeleton from '../components/Skeleton';
import './CategoryPage.css';

const CategoryPage = () => {
  const { name } = useParams();
  const [category, setCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState('All');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      const allCategories = await getCategories();
      const decodedName = decodeURIComponent(name);
      const foundCategory = allCategories.find(c => c.name === decodedName) || allCategories[0];
      
      setCategory(foundCategory);
      if (foundCategory) {
        if (foundCategory.subcategories && foundCategory.subcategories.length > 0) {
          setActiveSubcategory('All');
          // Gather all items from all subcategories
          const allItems = foundCategory.subcategories.reduce((acc, sub) => acc.concat(sub.items || []), []);
          setItems(allItems);
        } else {
          setItems([]);
        }
      }
      setLoading(false);
      window.scrollTo(0, 0);
    };
    fetchCategoryData();
  }, [name]);

  const handleSelectSubcategory = (subName) => {
    setActiveSubcategory(subName);
    if (subName === 'All') {
       const allItems = category?.subcategories?.reduce((acc, sub) => acc.concat(sub.items || []), []) || [];
       setItems(allItems);
    } else {
       const sub = category?.subcategories?.find(s => s.name === subName);
       setItems(sub?.items || []);
    }
  };

  const subcategoryList = category ? [{ name: 'All' }, ...(category.subcategories || [])] : [{ name: 'All' }];

  return (
    <div className="category-page">
      <div className="category-header bg-surface border-bottom">
         <div className="container" style={{ padding: '24px var(--sp-6)' }}>
            {loading ? (
              <Skeleton width="300px" height="32px" />
            ) : (
              <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>{category?.name}</h1>
            )}
         </div>
      </div>
      <div className="container category-layout">
        <Sidebar 
          subcategories={subcategoryList} 
          activeSubcategory={activeSubcategory} 
          onSelectCategory={handleSelectSubcategory} 
        />
        
        <div className="category-main">
          {loading ? (
            <div className="product-grid">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="product-card skeleton-card">
                  <Skeleton width="100%" height="150px" borderRadius="12px" />
                  <Skeleton width="80%" height="16px" style={{ marginTop: '12px' }} />
                  <Skeleton width="40%" height="14px" style={{ marginTop: '8px' }} />
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="empty-state">
              <h3>No items found</h3>
              <p>Try selecting a different subcategory or check back later.</p>
            </div>
          ) : (
            <div className="product-grid">
              {items.map((item) => (
                <ProductCard key={item.id} product={{...item, category: activeSubcategory === 'All' ? category?.name : activeSubcategory}} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
