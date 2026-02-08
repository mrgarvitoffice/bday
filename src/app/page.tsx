"use client";

import { useState, useEffect } from 'react';
import { HeroSection } from '@/components/hero-section';
import { InteractionSection } from '@/components/interaction-section';
import { LoveLetterSection } from '@/components/love-letter-section';
import { MemoriesSection } from '@/components/memories-section';
import { ShareSection } from '@/components/share-section';
import { SurpriseOverlay } from '@/components/surprise-overlay';

export default function Home() {
  const [showDateFlow, setShowDateFlow] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const [isPageFadingOut, setIsPageFadingOut] = useState(false);

  const handleYesClick = () => {
    setIsPageFadingOut(true);
    // After a short fade, start the date flow
    setTimeout(() => {
      setShowDateFlow(true);
    }, 1000); 
  };
  
  const handleDateFlowComplete = () => {
    setShowDateFlow(false);
    // isPageFadingOut is already true, so this will trigger the finale
    setShowFinale(true);
  }

  // Prevent scrolling when surprise is active
  useEffect(() => {
    if (showFinale || showDateFlow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showFinale, showDateFlow]);
  
  if (showFinale) {
    return <SurpriseOverlay />;
  }
  
  if (showDateFlow) {
    return <MemoriesSection onComplete={handleDateFlowComplete} />;
  }

  return (
    <div className={`transition-opacity duration-1000 ${isPageFadingOut ? 'opacity-0' : 'opacity-100'}`}>
      <HeroSection />
      <div className="space-y-16 py-16 md:space-y-24 md:py-24">
        <LoveLetterSection />
        <InteractionSection onYesClick={handleYesClick} />
        <ShareSection />
      </div>
      <footer className="py-8 text-center text-white/50">
        <p>Crafted with love for my valentine.</p>
      </footer>
    </div>
  );
}
