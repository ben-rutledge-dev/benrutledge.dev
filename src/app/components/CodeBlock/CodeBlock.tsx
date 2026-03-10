import React from 'react';

interface CodeBlockProps {
  children: React.ReactNode;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ children }) => {
  return (
    <div className="bg-black/40 p-4 squircle font-mono text-sm max-w-full overflow-x-auto">
      <pre>{children}</pre>
    </div>
  );
};
