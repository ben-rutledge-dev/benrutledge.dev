import React from 'react';

interface TechBadgeProps {
  children: React.ReactNode;
}

export const TechBadge: React.FC<TechBadgeProps> = ({ children }) => {
  return (
    <span className="squircle px-4 py-2 bg-white/10">
      {children}
    </span>
  );
};
