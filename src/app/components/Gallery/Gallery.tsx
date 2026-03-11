'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';

export interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

interface GalleryProps {
  images: GalleryImage[];
}

export const Gallery: React.FC<GalleryProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateCards = () => {
      const cards = container.querySelectorAll('.gallery-card');
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.left + containerRect.width / 2;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const distanceToCenter = Math.abs(containerCenterX - cardCenterX);
        const maxDistance = containerRect.width / 2;
        const ratio = Math.min(distanceToCenter / maxDistance, 1);

        const scaleFactor = Math.max(0.75, 1 - 0.25 * ratio);
        const opacityFactor = Math.max(0.6, 1 - 0.4 * ratio);

        (card as HTMLElement).style.transform = `scale(${scaleFactor})`;
        (card as HTMLElement).style.opacity = opacityFactor.toString();
      });
    };

    container.addEventListener('scroll', updateCards, { passive: true });
    updateCards();

    return () => {
      container.removeEventListener('scroll', updateCards);
    };
  }, [images]);

  return (
    <div
      ref={containerRef}
      className="flex justify-start overflow-x-auto gap-6 mb-12 scroll-smooth"
      style={{
        scrollPadding: '0 50vw',
        scrollbarWidth: 'thin',
      }}
    >
      {images.map((image, index) => (
        <div
          key={`${image.src}-${index}`}
          className={`squircle gallery-card overflow-hidden border border-gray-700 shrink-0
            ${index === 0 ? 'ml-8 md:ml-16' : ''} ${index === images.length - 1 ? 'mr-8 md:mr-16' : ''}`}
          style={{
            width: '400px',
            height: '300px',
          }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};