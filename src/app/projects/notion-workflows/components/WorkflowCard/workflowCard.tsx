import React from 'react';
import { H } from '@/app/components/H';
import { Section } from '@/app/components/Section';

interface WorkflowCardProps {
  title: string;
  description: string;
}

export const WorkflowCard: React.FC<WorkflowCardProps> = ({ title, description }) => {
  return (
    <div className="squircle p-4 bg-white/5">
      <Section>
        <H className="font-semibold text-white mb-2">{title}</H>
        <p className="text-sm">{description}</p>
      </Section>
    </div>
  );
};
