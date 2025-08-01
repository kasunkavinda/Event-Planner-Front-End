import React, { useState, ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  htmlContent: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ children, htmlContent }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      <div
        className={`absolute -top-10 left-0 z-10 bg-cream border border-primary rounded p-2 shadow-md w-64 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {htmlContent}
      </div>
    </div>
  );
};

export default Tooltip;
