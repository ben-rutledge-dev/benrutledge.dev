import React from 'react';
import { Navigation } from '@/app/components/Navigation';
import styles from './header.module.css';
import { HeaderHeightObserver } from '../HeaderHeightObserver';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header
      id="site-header"
      className={`${styles.header} py-4 sticky top-0 z-10 w-full bg-black flex justify-between items-center`}
    >
      <HeaderHeightObserver />
      <div className="relative z-10 flex items-center justify-center h-full animate-slide-in-right">
        <div className="text-left px-6 max-w-2xl flex flex-col gap-2">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl md:text-5xl font-bold text-white">
              Ben Rutledge
            </h1>
          </Link>
          <p className="text-lg md:text-xl text-gray-300">
            Front-End Developer
          </p>
        </div>
      </div>
      <Navigation />
    </header>
  );
}