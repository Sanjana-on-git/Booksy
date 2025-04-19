import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-primary-500 animate-spin"></div>
        <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-accent-400 animate-spin" style={{ animationDirection: 'reverse', opacity: 0.7 }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;