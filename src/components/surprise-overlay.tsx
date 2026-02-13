"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useMemo } from 'react';

// Explicitly select all 15 JPGs and the 2 specified videos for the collage.
const finaleMedia = PlaceHolderImages.filter(
  (media) =>
    media.imageUrl.endsWith('.jpg') ||
    media.id === 'gif_cuddly_couple' ||
    media.id === 'gif_morning_hug'
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 20,
      stiffness: 100,
    }
  }
};


export function SurpriseOverlay() {
  const shuffledMedia = useMemo(() => finaleMedia.sort(() => 0.5 - Math.random()), []);
  // Repeat the media list more times to ensure it fills any screen size and prevents empty space.
  const extendedMedia = useMemo(() => [...shuffledMedia, ...shuffledMedia, ...shuffledMedia, ...shuffledMedia], [shuffledMedia]);

  return (
    <motion.div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
      {/* Masonry Collage Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden opacity-70">
        <motion.div
            className="h-full w-full p-4 [column-count:2] sm:[column-count:3] md:[column-count:4] lg:[column-count:5] xl:[column-count:6] gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {extendedMedia.map((media, index) => {
            const isVideo = media.imageUrl.endsWith('.mp4');
            return (
                <motion.div
                key={`${media.id}-${index}`}
                className="mb-4 rounded-lg overflow-hidden shadow-lg"
                style={{ breakInside: 'avoid' }}
                variants={itemVariants}
                >
                {isVideo ? (
                    <video
                        src={media.imageUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="object-cover w-full h-full"
                    />
                ) : (
                    <Image
                        src={media.imageUrl}
                        alt={media.description}
                        width={500}
                        height={500}
                        className="object-cover w-full h-auto"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                    />
                )}
                </motion.div>
            );
            })}
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-black/80" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full max-w-4xl mx-auto px-4">
        <motion.div
            className="p-6 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: 'easeOut' }}
        >
            <h2 
                className="text-4xl md:text-5xl font-headline text-foreground text-glow"
            >
                Our Valentine date is officially booked.
            </h2>

            <h3 
                className="text-3xl md:text-4xl font-handwritten font-bold mt-6"
                style={{
                  color: 'hsl(350 100% 97%)', // Very light valentine shade
                  textShadow: [
                    // Black outline for crispness
                    '-1.5px -1.5px 0 #000',
                    '1.5px -1.5px 0 #000',
                    '-1.5px 1.5px 0 #000',
                    '1.5px 1.5px 0 #000',
                    '0px 0px 5px black',
                    // Valentine Glow
                    '0 0 10px hsl(var(--primary) / 0.8)',
                    '0 0 30px hsl(var(--primary) / 0.6)'
                  ].join(', ')
                }}
            >
                Kaushiki you are the girl who knows the rhythm of my heart better than I do: Happy Birthday. Thank you for being the peace in my chaos and the light in my world. If my life were a book  you’d be every single best scene I lived.I’m not just celebrating the day you were born; I’m celebrating every way you’ve made my life better just by being in it. 🌙✨
            </h3>
        </motion.div>
      </div>
    </motion.div>
  );
}
