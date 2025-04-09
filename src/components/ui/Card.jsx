import React from 'react';

const Card = ({ 
  children, 
  className = '', 
  color,
  hover = false,
  onClick,
  ...props 
}) => {
  const baseClasses = 'bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg';
  const hoverClasses = hover ? 'transition-transform duration-300 hover:scale-[1.02] cursor-pointer' : '';
  const colorBorderClass = color ? `border-l-4 border-l-[${color}]` : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${colorBorderClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
