import React from 'react';

const SynthwaveMessage = ({ 
  children,
  type = "info", // "success", "error", "info", "warning"
  className = ""
}) => {
  const getMessageStyles = () => {
    switch (type) {
      case "success":
        return {
          container: "bg-green-500/20 border-2 border-green-400",
          text: "text-green-400"
        };
      case "error":
        return {
          container: "bg-red-500/20 border-2 border-red-400",
          text: "text-red-400"
        };
      case "warning":
        return {
          container: "bg-yellow-500/20 border-2 border-yellow-400",
          text: "text-yellow-400"
        };
      case "info":
      default:
        return {
          container: "bg-blue-500/20 border-2 border-blue-400",
          text: "text-blue-400"
        };
    }
  };

  const styles = getMessageStyles();

  return (
    <div className={`p-4 ${styles.container} rounded-lg ${className}`}>
      <p className={`${styles.text} text-sm`}>
        {children}
      </p>
    </div>
  );
};

export default SynthwaveMessage; 