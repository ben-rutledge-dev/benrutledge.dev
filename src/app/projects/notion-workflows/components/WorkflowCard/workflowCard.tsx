import React from 'react';

interface WorkflowCardProps {
  title: string;
  description: string;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({ title, description }) => {
  return (
    <div className="squircle p-4 bg-white/5">
      <h3 className="font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm">{description}</p>
    </div>
  );
};
