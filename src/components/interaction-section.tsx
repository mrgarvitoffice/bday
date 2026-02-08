"use client";

import { useState, useRef } from 'react';
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
  const noButtonWrapperRef = useRef<HTMLDivElement>(null);

  const sadGif = PlaceHolderImages.find(img => img.id === 'gif_sad_character');

  const handleNoHover = () => {
    const wrapper = noButtonWrapperRef.current;
    if (!wrapper) return;
    
    const container = wrapper.parentElement;
    if (!container) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const currentX = noPosition.x;
    const currentY = noPosition.y;

    const naturalLeft = wrapperRect.left - currentX - containerRect.left;
    const naturalTop = wrapperRect.top - currentY - containerRect.top;

    const moveRange = 250; 

    let newX = (Math.random() - 0.5) * moveRange;
    let newY = (Math.random() - 0.5) * moveRange;

    // Constrain X
    if (naturalLeft + newX < 0) {
      newX = -naturalLeft;
    } else if (naturalLeft + newX + wrapperRect.width > containerRect.width) {
      newX = containerRect.width - wrapperRect.width - naturalLeft;
    }

    // Constrain Y
    if (naturalTop + newY < 0) {
      newY = -naturalTop;
    } else if (naturalTop + newY + wrapperRect.height > containerRect.height) {
      newY = containerRect.height - wrapperRect.height - naturalTop;
    }
    
    setNoPosition({ x: newX, y: newY });
    
    setYesScale(scale => Math.min(scale + 0.35, 5));
    setNoTries(tries => tries + 1);
  };
  
  const yesButtonScale = isYesHovered ? yesScale * 1.1 : yesScale;

  return (
    <section className="w-full overflow-hidden">
      <div className="container mx-auto flex h-80 flex-col items-center justify-center gap-8 sm:h-64 sm:flex-row relative px-4">
        <Button
          onClick={onYesClick}
          onMouseEnter={() => setIsYesHovered(true)}
          onMouseLeave={() => setIsYesHovered(false)}
          style={{ transform: `scale(${yesButtonScale})` }}
          className="z-10 px-10 py-6 text-2xl font-bold text-white origin-center transition-all duration-300 ease-in-out border-2 rounded-full shadow-lg bg-primary/80 border-primary animate-subtle-pulse hover:bg-primary neon-glow"
        >
          YES 💜
        </Button>
        
        <div
          ref={noButtonWrapperRef}
          className="relative"
          onMouseEnter={handleNoHover}
          onTouchStart={(e) => { e.preventDefault(); handleNoHover(); }}
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
