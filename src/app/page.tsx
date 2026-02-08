"use client";

import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/hero-section';
import { InteractionSection } from '@/components/interaction-section';
import { LoveLetterSection } from '@/components/love-letter-section';
import { MemoriesSection } from '@/components/memories-section';
import { ShareSection } from '@/components/share-section';
import { SurpriseOverlay } from '@/components/surprise-overlay';

export default function Home() {
  const [isYesClicked, setIsYesClicked] = useState(false);
  const [isPageVisible, setIsPageVisible] = useState(true);

  const handleYesClick = () => {
    setIsYesClicked(true);
    // After the fade-out, unmount the page content for performance
    setTimeout(() => setIsPageVisible(false), 1000); 
  };

  // Prevent scrolling when surprise is active
  useEffect(() => {
    if (isYesClicked) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isYesClicked]);

  return (
    <>
      {isPageVisible && (
        <div className={`transition-opacity duration-1000 ${isYesClicked ? 'opacity-0' : 'opacity-100'}`}>
          <HeroSection />
          <div className="space-y-16 py-16 md:space-y-24 md:py-24">
            <InteractionSection onYesClick={handleYesClick} />
            <LoveLetterSection />
            <MemoriesSection />
            <ShareSection />
          </div>
          <footer className="py-8 text-center text-white/50">
            <p>Crafted with love for my valentine.</p>
          </footer>
        </div>
      )}
      {isYesClicked && <SurpriseOverlay />}
    </>
  );
}
