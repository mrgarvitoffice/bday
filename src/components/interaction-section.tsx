"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type InteractionSectionProps = {
  onYesClick: () => void;
};

export function InteractionSection({ onYesClick }: InteractionSectionProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const handleNoHover = () => {
    const newX = (Math.random() - 0.5) * 300;
    const newY = (Math.random() - 0.5) * 150;
    setNoPosition({ x: newX, y: newY });
  };

  return (
    <section className="w-full">
      <div className="container mx-auto flex h-48 flex-col sm:flex-row items-center justify-center gap-8">
        <Button
          onClick={onYesClick}
          className="px-10 py-6 text-2xl font-bold text-white transition-all duration-300 ease-in-out border-2 rounded-full shadow-lg bg-primary/80 border-primary animate-subtle-pulse hover:bg-primary hover:scale-110 neon-glow"
        >
          YES 💜
        </Button>
        <div
          className="relative h-16 w-36"
          onMouseEnter={handleNoHover}
          onTouchStart={handleNoHover}
        >
          <Button
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: `translate(-50%, -50%) translate(${noPosition.x}px, ${noPosition.y}px)`,
              transition: 'transform 0.3s ease-out',
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
