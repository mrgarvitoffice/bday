
"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useState, useEffect, useMemo } from 'react';

// Select all JPGs and two specific GIFs for the collage
const finaleJpgs = PlaceHolderImages.filter(media => media.imageUrl.endsWith('.jpg'));
const finaleGifs = PlaceHolderImages.filter(media => ['gif_cuddly_couple', 'gif_morning_hug'].includes(media.id));
const allFinaleMedia = [...finaleJpgs, ...finaleGifs];

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5, rotate: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: (i % 2 === 0 ? 1 : -1) * (Math.random() * 5 + 2),
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
      delay: i * 0.05
    }
  })
};


interface MediaLayout {
    id: string;
    imageUrl: string;
    description: string;
    top: string;
    left: string;
    width: string;
    height: string;
    rotation: number;
    zIndex: number;
}


export function SurpriseOverlay() {
  const [layout, setLayout] = useState<MediaLayout[]>([]);

  const shuffledMedia = useMemo(() => allFinaleMedia.sort(() => 0.5 - Math.random()), []);

  useEffect(() => {
    const generateLayout = () => {
      return shuffledMedia.map((media, index) => {
        const size = Math.random() * 15 + 15; // Size between 15% and 30% of viewport width
        return {
          ...media,
          top: `${Math.random() * 85}%`,
          left: `${Math.random() * 85}%`,
          width: `${size}vw`,
          height: `${size * (Math.random() * 0.4 + 0.8)}vw`, // slightly random aspect ratio based on width
          rotation: Math.random() * 20 - 10, // -10 to 10 degrees
          zIndex: index,
        };
      });
    };
    setLayout(generateLayout());
  }, [shuffledMedia]);


  return (
    <motion.div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-hidden bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black/80 to-background" />

      {/* Media Collage Background */}
      <motion.div 
        className="absolute inset-0 opacity-25"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {layout.map((media, i) => {
          const isVideo = media.imageUrl.endsWith('.mp4');
          return (
            <motion.div
              key={media.id}
              className="absolute rounded-lg overflow-hidden shadow-2xl"
              style={{
                top: media.top,
                left: media.left,
                width: media.width,
                height: media.height,
                zIndex: media.zIndex,
              }}
              variants={itemVariants}
              custom={i}
              initial="hidden"
              animate="visible"
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
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>

      <div className="z-10 flex flex-col items-center text-center">
        <motion.div
            className="p-6 md:p-10 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
        >
            <h2 
                className="text-4xl md:text-5xl font-headline text-foreground text-glow"
            >
                Our Valentine date is officially booked.
            </h2>

            <h3 
                className="text-3xl md:text-4xl font-handwritten font-bold mt-6"
                style={{
                  color: 'hsl(350 100% 97%)', // Very light valentine shade (same as --foreground)
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
