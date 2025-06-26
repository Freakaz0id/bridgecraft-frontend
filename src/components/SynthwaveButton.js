import React from 'react';

const SynthwaveButton = ({ 
  children,
  type = "button",
  onClick,
  disabled = false,
  isLoading = false,
  variant = "pink", // "pink" or "blue"
  size = "lg", // "sm", "md", "lg"
  className = "",
  ...props
}) => {
  const getBorderClass = () => {
    return variant === "blue" ? "neon-border-blue" : "neon-border-pink";
  };

  const getGradientClass = () => {
    return variant === "blue"
      ? "from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500"
      : "from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500";
  };

  const getShadowClass = () => {
    return variant === "blue" ? "hover:shadow-cyan-500/50" : "hover:shadow-pink-500/50";
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "h-10 px-4 text-sm";
      case "md":
        return "h-11 px-6 text-base";
      case "lg":
      default:
        return "h-12 px-8 text-lg";
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${getBorderClass()} 
        bg-gradient-to-r ${getGradientClass()}
        text-white font-bold rounded-lg 
        transition-all duration-300 
        hover:scale-105 hover:shadow-lg ${getShadowClass()}
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${getSizeClass()}
        ${className}
      `}
      {...props}
    >
      {isLoading ? "LOADING..." : children}
    </button>
  );
};

export default SynthwaveButton; 