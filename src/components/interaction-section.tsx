"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

type InteractionSectionProps = {
  onYesClick: () => void;
};

export function InteractionSection({ onYesClick }: InteractionSectionProps) {
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [yesScale, setYesScale] = useState(1);
  const [noTries, setNoTries] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sadGif = PlaceHolderImages.find(img => img.id === 'gif_sad_character');

  const handleNoInteraction = () => {
    if (!noButtonRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = noButtonRef.current.getBoundingClientRect();

    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;
    
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    setNoPosition({ x: newX, y: newY });
    setYesScale(scale => Math.min(scale + 0.3, 5));
    setNoTries(tries => tries + 1);
  };
  
  return (
    <section ref={containerRef} className="w-full h-96 relative flex items-center justify-center p-4 overflow-hidden">
        <div className="flex items-center justify-center gap-8 flex-col sm:flex-row">
            <motion.button
              onClick={onYesClick}
              animate={{ scale: yesScale }}
              whileHover={{ scale: yesScale * 1.1 }}
              whileTap={{ scale: yesScale * 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              className="z-20 px-10 py-6 text-2xl font-bold text-white origin-center rounded-full shadow-lg"
              style={{
                background: 'linear-gradient(to right, hsl(var(--secondary)), hsl(var(--primary)))',
                boxShadow: '0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--accent) / 0.5)'
              }}
            >
              YES 💜
            </motion.button>
            
            <motion.div
              className="absolute sm:relative"
              animate={{ x: noPosition.x, y: noPosition.y }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <AnimatePresence>
                {noTries > 0 && (
                  <motion.div 
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center pointer-events-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                      {noTries > 1 && sadGif && <Image src={sadGif.imageUrl} width={50} height={50} alt="sad gif" unoptimized />}
                      <p className="text-sm text-rose-200 whitespace-nowrap">hehe not allowed 😝</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                ref={noButtonRef}
                onHoverStart={handleNoInteraction}
                onClick={handleNoInteraction}
                className={cn(
                  "px-10 py-6 text-2xl font-bold rounded-full border-2 bg-transparent",
                  noTries > 0 ? "border-muted-foreground/50 text-muted-foreground/70" : "border-foreground/50 text-foreground"
                )}
              >
                NO 💔
              </motion.button>
            </motion.div>
        </div>
    </section>
  );
}
