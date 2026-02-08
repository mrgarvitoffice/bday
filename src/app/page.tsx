"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { HeroSection } from '@/components/hero-section';
import { InteractionSection } from '@/components/interaction-section';
import { MemoriesSection } from '@/components/memories-section';
import { ShareSection } from '@/components/share-section';
import { SurpriseOverlay } from '@/components/surprise-overlay';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AnimatePresence } from 'framer-motion';

export default function Home() {
  const [showDateFlow, setShowDateFlow] = useState(false);
  const [showFinale, setShowFinale] = useState(false);
  const footerHeart = PlaceHolderImages.find(img => img.id === 'gif_footer_heart');

  const handleYesClick = () => {
    setShowDateFlow(true);
  };
  
  const handleDateFlowComplete = () => {
    setShowDateFlow(false);
    setShowFinale(true);
  }

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

  return (
    <main className="flex flex-col items-center min-h-screen overflow-x-hidden">
      <div className="w-full max-w-[1100px] mx-auto px-4">
        <AnimatePresence>
          {!showDateFlow && !showFinale && (
            <>
              <HeroSection />
              <InteractionSection onYesClick={handleYesClick} />
              <div className="py-16 md:py-24">
                <ShareSection />
              </div>
              <footer className="py-8 text-center text-white/50 flex flex-col items-center justify-center gap-4">
                <p>Crafted with love for my valentine.</p>
                {footerHeart && (
                  <Image
                    src={footerHeart.imageUrl}
                    alt={footerHeart.description}
                    width={50}
                    height={50}
                    unoptimized
                  />
                )}
              </footer>
            </>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showDateFlow && <MemoriesSection onComplete={handleDateFlowComplete} />}
        {showFinale && <SurpriseOverlay />}
      </AnimatePresence>
    </main>
  );
}
