import React from 'react';

const LoadingSkeleton = ({ 
  width = 'full', 
  height = '16', 
  rounded = 'md',
  className = ''
}) => {
  const widthClasses = {
    full: 'w-full',
    auto: 'w-auto',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '2/3': 'w-2/3',
    '1/4': 'w-1/4',
    '3/4': 'w-3/4',
  };

  const heightClasses = {
    '4': 'h-4',
    '8': 'h-8',
    '12': 'h-12',
    '16': 'h-16',
    '20': 'h-20',
    '24': 'h-24',
    '32': 'h-32',
    '40': 'h-40',
    '48': 'h-48',
    '56': 'h-56',
    '64': 'h-64',
  };

  const roundedClasses = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    '3xl': 'rounded-3xl',
    full: 'rounded-full',
  };

  const widthClass = widthClasses[width] || 'w-full';
  const heightClass = heightClasses[height] || 'h-16';
  const roundedClass = roundedClasses[rounded] || 'rounded-md';

  return (
    <div 
      className={`bg-gray-700 animate-pulse ${widthClass} ${heightClass} ${roundedClass} ${className}`}
      role="status"
      aria-label="Loading..."
    />
  );
};

export default LoadingSkeleton;
