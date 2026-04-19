import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCategories } from '../data/categories';
import './ItemDetails.css';

const ItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchItemData = async () => {
      const allCategories = await getCategories();
      let foundItem = null;
      
      // Search for the item across all categories and subcategories
      for (const cat of allCategories) {
        if (cat.subcategories) {
          for (const sub of cat.subcategories) {
            if (sub.items) {
              const match = sub.items.find(i => i.id === id);
              if (match) {
                foundItem = match;
                break;
              }
            }
          }
        }
        if (foundItem) break;
      }
      
      setItem(foundItem);
    };
    fetchItemData();
  }, [id]);

  const handleAddClick = (e) => {
    e.preventDefault();
    console.log(`Added ${item?.name} to cart`);
  };

  if (!item) {
    return (
      <div className="container mt-4" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Item not found</h2>
      </div>
    );
  }

  return (
    <div className="item-details-page">
      <div className="container item-details-container">
        
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left"></i> Back
        </button>

        <div className="item-details-card">
          <div className="item-image-section">
            <div className="item-image-wrapper">
              <img src={item.image} alt={item.name} className="item-main-image" />
              {item.discount && (
                <span className="item-discount-badge">-{item.discount}% OFF</span>
              )}
            </div>
          </div>

          <div className="item-info-section">
            <h1 className="item-title">{item.name}</h1>
            

            <div className="item-price-box">
              <span className="item-price-current">₹{item.price}</span>
              {item.originalPrice && (
                <>
                  <span className="item-price-original">₹{item.originalPrice}</span>
                  <span className="item-price-savings">Inclusive of all taxes</span>
                </>
              )}
            </div>

            <div className="item-quantity-options">
              <h3 className="options-title">Select Quantity</h3>
              <div className="options-grid">
                <div className="option-card active">
                  <span className="option-weight">{item.quantity || "1 Pack"}</span>
                  <span className="option-price">₹{item.price}</span>
                </div>
                {/* Mock UI option */}
                <div className="option-card">
                  <span className="option-weight">Double Pack</span>
                  <span className="option-price">₹{(item.price * 1.9).toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="item-action-box">
              <button className="btn-add-large" onClick={handleAddClick}>
                Add to Cart
              </button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
