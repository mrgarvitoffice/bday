
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
  const noButtonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const sadGif = PlaceHolderImages.find(img => img.id === 'gif_sad_character');

  const handleNoInteraction = () => {
    if (!noButtonRef.current || !containerRef.current) return;
  
    const containerRect = containerRef.current.getBoundingClientRect();
    const buttonRect = noButtonRef.current.getBoundingClientRect();
    
    const newX = Math.random() * (containerRect.width - buttonRect.width);
    const newY = Math.random() * (containerRect.height - buttonRect.height);
  
    setNoPosition({ x: newX, y: newY });
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
              animate={noTries > 0 ? { x: noPosition.x, y: noPosition.y, top: 0, left: 0 } : {}}
              style={noTries === 0 ? { position: 'relative' } : { position: 'absolute' }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              onMouseEnter={handleNoInteraction}
              onTouchStart={handleNoInteraction}
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
                      <p className="text-sm text-muted-foreground whitespace-nowrap">Not an option 😝</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={handleNoInteraction}
                className={cn(
                  "px-8 py-5 md:px-10 md:py-6 text-xl md:text-2xl font-bold rounded-full border-2 bg-transparent",
                  noTries > 0 ? "border-muted-foreground/50 text-muted-foreground/70" : "border-foreground/50 text-foreground"
                )}
              >
                NO 💔
              </button>
            </motion.div>
        </div>
    </section>
  );
}
