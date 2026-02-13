
"use client";

import { useState, useEffect, useRef } from 'react';
import { HeroSection } from '@/components/hero-section';
import { InteractionSection } from '@/components/interaction-section';
import { MemoriesSection } from '@/components/memories-section';
import { PreFinaleOverlay } from '@/components/pre-finale-overlay';
import { ShareSection } from '@/components/share-section';
import { SurpriseOverlay } from '@/components/surprise-overlay';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showDateFlow, setShowDateFlow] = useState(false);
  const [showPreFinale, setShowPreFinale] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const footerHeart = PlaceHolderImages.find(img => img.id === 'gif_footer_heart');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleYesClick = () => {
    setShowDateFlow(true);
    
    if (audioRef.current) return; 

    const audio = new Audio('/Song.mp3');
    audio.loop = true;
    audio.currentTime = 30; // Start at 30 seconds
    audioRef.current = audio;
    
    audio.play().catch(err => {
        console.error("Failed to play audio:", err);
    });
  };
  
  const handleDateFlowComplete = () => {
    setShowDateFlow(false);
    setShowPreFinale(true);
  }

  const handlePreFinaleComplete = () => {
    setShowPreFinale(false);
    setShowFinale(true);
  }

  useEffect(() => {
    if (showFinale || showDateFlow || showPreFinale) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [showFinale, showDateFlow, showPreFinale]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      if (audio) {
        audio.pause();
        audio.src = '';
      }
    };
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen overflow-x-hidden">
      <div className="w-full max-w-[1100px] mx-auto px-4">
        <AnimatePresence>
          {!showDateFlow && !showPreFinale && !showFinale && (
            <>
              <HeroSection />
              <InteractionSection onYesClick={handleYesClick} />
              <div className="py-16 md:py-24">
                <ShareSection />
              </div>
              <footer className="py-8 text-center text-white/50 flex flex-col items-center justify-center gap-4">
                <p>Crafted with love for my valentine.</p>
                {footerHeart && (
                  <video
                    src={footerHeart.imageUrl}
                    width={50}
                    height={50}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                )}
              </footer>
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showDateFlow && <MemoriesSection onComplete={handleDateFlowComplete} />}
        {showPreFinale && <PreFinaleOverlay onComplete={handlePreFinaleComplete} />}
        {showFinale && <SurpriseOverlay />}
      </AnimatePresence>
    </main>
  );
}
