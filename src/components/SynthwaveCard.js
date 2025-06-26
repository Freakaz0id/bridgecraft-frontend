import React from 'react';

const SynthwaveCard = ({ 
  children, 
  borderColor = "pink", // "pink" or "blue"
  className = "",
  width = "max-w-md" 
}) => {
  const getBorderClass = () => {
    return borderColor === "blue" ? "neon-border-blue" : "neon-border-pink";
  };

  const getGlowClass = () => {
    return borderColor === "blue" 
      ? "from-cyan-500/10 to-blue-500/10" 
      : "from-pink-500/10 to-purple-500/10";
  };

  return (
    <div className={`w-full ${width} mx-auto ${className}`}>
      <div className={`${getBorderClass()} rounded-xl p-8 bg-black/50 backdrop-blur-sm relative`}>
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-to-b ${getGlowClass()} pointer-events-none`}></div>
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SynthwaveCard; 