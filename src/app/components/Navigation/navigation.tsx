'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './navigation.module.css';

const NAV_BTN_WIDTH = 128;
const NAV_BTN_HEIGHT = 48;
const SCALE_BOOST = 1.6; // multiplier on top of computed displacement



export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const filterId = 'nav-liquid-glass';

  return (
    <>
      {/* Desktop Navigation - Top Right */}
      <nav className="hidden md:flex fixed top-6 right-6 z-50 gap-2">
        <Link
          href="/"
          className={styles.desktopLink}
        >
          Home
        </Link>
        <Link
          href="/projects"
          className={styles.desktopLink}
        >
          Projects
        </Link>
        <Link
          href="/about"
          className={styles.desktopLink}
        >
          About
        </Link>
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-6 left-6 z-50 p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors backdrop-blur-sm"
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block h-0.5 w-full bg-white transition-all duration-300 ${
              isOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </div>
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <button
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 cursor-default"
          onClick={closeMenu}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeMenu();
          }}
          aria-label="Close menu"
        />
      )}

      {/* Mobile Slide-out Menu */}
      <nav
        className={`md:hidden fixed top-0 left-0 h-full w-full bg-black/90 backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-24 px-8 space-y-6">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-white text-xl hover:text-gray-300 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/projects"
            onClick={closeMenu}
            className="text-white text-xl hover:text-gray-300 transition-colors"
          >
            Projects
          </Link>
          <Link
            href="/about"
            onClick={closeMenu}
            className="text-white text-xl hover:text-gray-300 transition-colors"
          >
            About
          </Link>
        </div>
      </nav>
    </>
  );
}
