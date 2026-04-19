import React from 'react';
import './Skeleton.css';

const Skeleton = ({ width, height, borderRadius = '4px', className = '' }) => {
  return (
    <div 
      className={`skeleton-loader ${className}`} 
      style={{ width, height, borderRadius }}
    />
  );
};

export default Skeleton;
