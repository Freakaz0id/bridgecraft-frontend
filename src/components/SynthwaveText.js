import React from 'react';

const SynthwaveText = ({ 
  children,
  variant = "pink", // "pink" or "blue"
  size = "base", // "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"
  className = "",
  as = "p", // HTML tag to render
  orbitron = false // Use Orbitron font for headings
}) => {
  const getTextClass = () => {
    return variant === "blue" ? "neon-text-blue" : "neon-text-pink";
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "base":
        return "text-base";
      case "lg":
        return "text-lg";
      case "xl":
        return "text-xl";
      case "2xl":
        return "text-2xl";
      case "3xl":
        return "text-3xl";
      case "4xl":
        return "text-4xl font-bold tracking-wider";
      case "5xl":
        return "text-5xl font-bold tracking-wider";
      default:
        return "text-base";
    }
  };

  const getFontClass = () => {
    return orbitron ? "orbitron-heading" : "";
  };

  const Component = as;

  return (
    <Component className={`${getTextClass()} ${getSizeClass()} ${getFontClass()} ${className}`}>
      {children}
    </Component>
  );
};

export default SynthwaveText; 