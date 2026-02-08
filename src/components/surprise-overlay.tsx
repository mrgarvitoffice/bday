
"use client";

import { motion } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';

// IDs used in other components
const usedImageIds = [
  'gif_blushing_heart',
  'gif_footer_heart',
  'gif_sad_character',
  'gif_morning_hug',
  'gif_car_ride',
  'gif_sunset_couple',
  'gif_cuddly_couple'
];

// Get the remaining videos for the finale collage
const finaleVideos = PlaceHolderImages.filter(img => !usedImageIds.includes(img.id));

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const videoVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100
    }
  }
};

export function SurpriseOverlay() {
  return (
    <motion.div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-hidden bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black to-background" />

      {/* Video Collage Background */}
      <motion.div 
        className="absolute inset-0 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 p-2 opacity-30"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {finaleVideos.map((video, index) => (
          <motion.div
            key={video.id}
            className={`relative rounded-lg overflow-hidden
              ${index === 1 || index === 6 ? 'col-span-2 row-span-2' : ''}
              ${index === 4 ? 'col-span-1 row-span-2' : ''}
            `}
            variants={videoVariants}
          >
            <video
              src={video.imageUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="z-10 flex flex-col items-center gap-8 text-center">
        <motion.h2 
            className="text-4xl md:text-5xl font-headline text-foreground text-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
        >
            Our Valentine date is officially booked.
        </motion.h2>

        <motion.h3 
            className="text-2xl md:text-3xl font-handwritten text-accent text-glow mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.5, type: 'spring' }}
        >
            Wanna do that extremist open car babe on Valentine's for 1 hour? 😉
        </motion.h3>
      </div>
    </motion.div>
  );
}
