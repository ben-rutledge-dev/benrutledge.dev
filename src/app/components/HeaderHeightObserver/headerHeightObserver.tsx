'use client';

import { useEffect } from 'react';

export const HeaderHeightObserver: React.FC = () => {
  useEffect(() => {
    const header = document.getElementById('site-header');
    if(!header) return;
    const observer = new ResizeObserver(() => {
      const height = header.getBoundingClientRect().height;
      document.documentElement.style.setProperty(
        '--header-height',
        `${header.getBoundingClientRect().height}px`
      );
    });
    observer.observe(header);
    return () => observer.disconnect();
  }, []);
  return null;
};