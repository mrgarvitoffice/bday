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
    // Make "No" button harder to catch, with smaller movement on mobile
    const moveScale = typeof window !== 'undefined' && window.innerWidth < 768 ? 100 : 250;
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
      <div className="container mx-auto flex h-64 flex-col sm:h-48 sm:flex-row items-center justify-center gap-8 relative">
        <Button
          onClick={onYesClick}
          onMouseEnter={() => setIsYesHovered(true)}
          onMouseLeave={() => setIsYesHovered(false)}
          style={{ transform: `scale(${yesButtonScale})` }}
          className="px-10 py-6 text-2xl font-bold text-white origin-center transition-all duration-300 ease-in-out border-2 rounded-full shadow-lg bg-primary/80 border-primary animate-subtle-pulse hover:bg-primary neon-glow"
        >
          YES 💜
        </Button>
        <div
          className="relative h-24 w-48"
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
        >
           {noTries > 0 && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center pointer-events-none transition-opacity duration-300">
                {noTries > 1 && sadGif && <Image src={sadGif.imageUrl} width={50} height={50} alt="sad gif" unoptimized />}
                <p className="text-sm text-rose-200 whitespace-nowrap animate-bounce-in">hehe not allowed 😝</p>
            </div>
          )}
          <Button
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) translate(${noPosition.x}px, ${noPosition.y}px)`,
              transition: 'transform 0.2s ease-out',
            }}
            className="px-10 py-6 text-2xl font-bold text-white bg-transparent border-2 rounded-full border-gray-400 hover:border-white"
          >
            NO 💔
          </Button>
        </div>
      </div>
    </section>
  );
}
