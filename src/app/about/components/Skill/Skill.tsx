import React from 'react';

interface SkillProps {
  children: React.ReactNode;
}

export const Skill: React.FC<SkillProps> = ({ children }) => {
  return (
    <span className="px-3 py-1 bg-white/10 text-sm text-gray-300 hover:bg-white/20 transition-colors squircle">
      {children}
    </span>
  );
};
