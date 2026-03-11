'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './navigation.module.css';

const navLinks = [
  { label: 'Home', href: '/', external: false },
  { label: 'About', href: '/about', external: false },
  { label: 'Projects', href: '/projects', external: false },
  { label: 'CV', href: '/cv.pdf', external: true },
  { label: 'Contact', href: '/contact', external: false },
];

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Desktop Navigation - Top Right */}
      <nav className="hidden md:flex top-6 right-6 z-50 gap-2">
        {navLinks.map((link) => (
          link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.desktopLink}
            >
              {link.label}
            </a>
          ) : (
            <Link
              key={link.label}
              href={link.href}
              className={styles.desktopLink}
            >
              {link.label}
            </Link>
          )
        ))}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden fixed top-6 right-6 z-50 p-2 rounded-md hover:bg-white/20 transition-colors backdrop-blur-sm"
        aria-label="Toggle menu"
      >
        <div className="relative w-6 h-5" style={{ minHeight: '20px' }}>
          <span
            className={`absolute left-0 block h-0.5 w-full bg-white transition-all duration-300 origin-center ${isOpen ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
              }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-full bg-white transition-all duration-300 origin-center ${isOpen ? 'opacity-0 scale-x-0' : 'top-1/2 -translate-y-1/2'
              }`}
          />
          <span
            className={`absolute left-0 block h-0.5 w-full bg-white transition-all duration-300 origin-center ${isOpen ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
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
            if(e.key === 'Escape') closeMenu();
          }}
          aria-label="Close menu"
        />
      )}

      {/* Mobile Slide-out Menu */}
      <nav
        className={`md:hidden fixed top-0 left-0 h-full w-full bg-black/90 backdrop-blur-md z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col pt-24 px-8 space-y-6">
          {navLinks.map((link) => (
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="text-white text-xl hover:text-gray-300 transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="text-white text-xl hover:text-gray-300 transition-colors"
              >
                {link.label}
              </Link>
            )
          ))}
        </div>
      </nav>
    </>
  );
}
