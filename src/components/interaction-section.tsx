"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';

type InteractionSectionProps = {
  onYesClick: () => void;
};

export function InteractionSection({ onYesClick }: InteractionSectionProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [isYesHovered, setIsYesHovered] = useState(false);

  const handleNoHover = () => {
    // Make "No" button harder to catch
    const newX = (Math.random() - 0.5) * 600;
    const newY = (Math.random() - 0.5) * 400;
    setNoPosition({ x: newX, y: newY });

    // Make "Yes" button bigger
    setYesScale(scale => scale + 0.15);
  };
  
  const yesButtonScale = isYesHovered ? yesScale * 1.1 : yesScale;

  return (
    <section className="w-full">
      <div className="container mx-auto flex h-48 flex-col sm:flex-row items-center justify-center gap-8">
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
              transition: 'transform 0.15s ease-out',
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
