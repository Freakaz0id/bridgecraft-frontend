import React from 'react';

const SynthwaveLayout = ({ children, className = "" }) => {
  return (
    <div className={`min-h-screen relative overflow-hidden synthwave-bg ${className}`}>
      {/* Stars background */}
      <div className="absolute inset-0 stars"></div>
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );
};

export default SynthwaveLayout; 