import React from 'react';
import './Sidebar.css';

const Sidebar = ({ subcategories, activeSubcategory, onSelectCategory }) => {
  return (
    <aside className="catalog-sidebar">
      <ul className="subcategory-list">
        {subcategories.map((sub, index) => (
          <li
            key={sub.name || index}
            className={`subcategory-item ${activeSubcategory === sub.name ? 'active' : ''}`}
            onClick={() => onSelectCategory(sub.name)}
          >
            {sub.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
