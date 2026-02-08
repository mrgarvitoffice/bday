"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type InteractionSectionProps = {
  onYesClick: () => void;
};

export function InteractionSection({ onYesClick }: InteractionSectionProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [isYesHovered, setIsYesHovered] = useState(false);
  const [noTries, setNoTries] = useState(0);

  const sadGif = PlaceHolderImages.find(img => img.id === 'gif_sad_character');

  const handleNoHover = () => {
    // Make "No" button harder to catch, but keep it on screen.
    // Reduced moveScale to be less extreme, especially on mobile.
    const moveScale = typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 150;
    const newX = (Math.random() - 0.5) * moveScale * 2;
    const newY = (Math.random() - 0.5) * moveScale;
    setNoPosition({ x: newX, y: newY });

    // Make "Yes" button bigger, capped at 5x size
    setYesScale(scale => Math.min(scale + 0.25, 5));
    setNoTries(tries => tries + 1);
  };
  
  const yesButtonScale = isYesHovered ? yesScale * 1.1 : yesScale;

  return (
    <section className="w-full">
      {/* Increased height to give the "No" button more room to move vertically */}
      <div className="container mx-auto flex h-80 flex-col items-center justify-center gap-8 sm:h-64 sm:flex-row">
        <Button
          onClick={onYesClick}
          onMouseEnter={() => setIsYesHovered(true)}
          onMouseLeave={() => setIsYesHovered(false)}
          style={{ transform: `scale(${yesButtonScale})` }}
          className="px-10 py-6 text-2xl font-bold text-white origin-center transition-all duration-300 ease-in-out border-2 rounded-full shadow-lg bg-primary/80 border-primary animate-subtle-pulse hover:bg-primary neon-glow"
        >
          YES 💜
        </Button>
        
        {/* This div wraps the "No" button and its pop-up message. It is part of the flex layout. */}
        <div
          className="relative" // Relative positioning for the "hehe" message
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
          style={{
            transform: `translate(${noPosition.x}px, ${noPosition.y}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        >
           {noTries > 0 && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center pointer-events-none transition-opacity duration-300">
                {noTries > 1 && sadGif && <Image src={sadGif.imageUrl} width={50} height={50} alt="sad gif" unoptimized />}
                <p className="text-sm text-rose-200 whitespace-nowrap animate-bounce-in">hehe not allowed 😝</p>
            </div>
          )}
          <Button
            className="px-10 py-6 text-2xl font-bold text-white bg-transparent border-2 rounded-full border-gray-400 hover:border-white"
          >
            NO 💔
          </Button>
        </div>
      </div>
    </section>
  );
}
