import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ href, children, external = false }) => {
  const className = "squircle inline-block px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors";
  
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};
