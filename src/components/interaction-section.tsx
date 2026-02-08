"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  
    // Ensure the button stays within the container's bounds
    const maxX = containerRect.width - buttonRect.width;
    const maxY = containerRect.height - buttonRect.height;
    
    // Add some padding from the edges
    const padding = 20;

    let newX = Math.random() * (maxX - padding * 2) + padding;
    let newY = Math.random() * (maxY - padding * 2) + padding;

    // Ensure the new position is not too close to the current position to avoid getting stuck
    const currentX = noPosition.x + buttonRect.width / 2;
    const currentY = noPosition.y + buttonRect.height / 2;

    while (Math.abs(newX - currentX) < buttonRect.width * 2 && Math.abs(newY - currentY) < buttonRect.height * 2) {
      newX = Math.random() * (maxX - padding * 2) + padding;
      newY = Math.random() * (maxY - padding * 2) + padding;
    }
  
    setNoPosition({ x: newX - buttonRect.width/2, y: newY - buttonRect.height/2 });
    setYesScale(scale => Math.min(scale + 0.2, 5));
    setNoTries(tries => tries + 1);
  };
  
  return (
    <section ref={containerRef} className="w-full h-96 relative flex items-center justify-center p-4 overflow-hidden">
        <div className="flex items-center justify-center gap-8 md:gap-12">
            <motion.button
              onClick={onYesClick}
              animate={{ 
                  scale: yesScale,
                  boxShadow: [
                    '0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--accent) / 0.5)',
                    '0 0 15px hsl(var(--primary) / 0.8), 0 0 30px hsl(var(--accent) / 0.7)',
                    '0 0 10px hsl(var(--primary) / 0.5), 0 0 20px hsl(var(--accent) / 0.5)',
                  ]
              }}
              whileHover={{ scale: yesScale * 1.1, transition: { type: 'spring', stiffness: 300 } }}
              whileTap={{ scale: yesScale * 0.95 }}
              transition={{
                  scale: { type: 'spring', stiffness: 300, damping: 10 },
                  boxShadow: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="z-20 px-8 py-5 md:px-10 md:py-6 text-xl md:text-2xl font-bold rounded-full origin-center text-white"
              style={{
                background: 'linear-gradient(to right, hsl(var(--secondary)), hsl(var(--primary)))',
              }}
            >
              YES ❤️
            </motion.button>
            
            <motion.div
              className="absolute"
              ref={noButtonRef}
              animate={noTries > 0 ? { x: noPosition.x, y: noPosition.y } : {}}
              style={noTries === 0 ? { position: 'relative' } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onHoverStart={handleNoInteraction}
              onClick={handleNoInteraction}
            >
              <AnimatePresence>
                {noTries > 0 && (
                  <motion.div 
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 flex flex-col items-center pointer-events-none"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                      {noTries > 1 && sadGif && <video src={sadGif.imageUrl} width={50} height={50} autoPlay loop muted playsInline />}
                      <p className="text-sm text-muted-foreground whitespace-nowrap">hehe not allowed 😝</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button
                className={cn(
                  "px-8 py-5 md:px-10 md:py-6 text-xl md:text-2xl font-bold rounded-full border-2 bg-transparent",
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
