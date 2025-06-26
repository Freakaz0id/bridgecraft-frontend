import React from 'react';

const SynthwaveInput = ({ 
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = true,
  className = "",
  ...props
}) => {
  // Set appropriate autocomplete values
  const getAutoComplete = () => {
    if (type === "email") return "email";
    if (type === "password") {
      if (name === "password" && placeholder?.includes("••••")) return "current-password";
      return "new-password";
    }
    if (name === "name" || name === "full_name") return "name";
    return "off";
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={name} className="text-pink-300 text-base block">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={getAutoComplete()}
        className="neon-border-blue bg-black/70 text-cyan-300 placeholder:text-cyan-600 border-0 rounded-lg h-12 w-full px-3 py-2 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition-all duration-300"
        required={required}
        {...props}
      />
    </div>
  );
};

export default SynthwaveInput; 