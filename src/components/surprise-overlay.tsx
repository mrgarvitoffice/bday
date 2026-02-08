"use client";

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const HeartIcon = ({ style, className }: { style?: React.CSSProperties, className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      style={style}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );

const loveGifs = [
    'gif_excited_character', 'gif_love_1', 'gif_love_2', 'gif_love_3', 'gif_love_4', 'gif_love_5', 'gif_love_6', 'gif_floating_heart', 'gif_couple_shy'
].map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};


export function SurpriseOverlay() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        animation: `fall ${Math.random() * 5 + 5}s linear ${Math.random() * 5}s infinite`,
        width: `${Math.random() * 1.5 + 0.75}rem`,
        height: `${Math.random() * 1.5 + 0.75}rem`,
      },
      className: `absolute ${Math.random() > 0.5 ? 'text-primary' : 'text-accent'}`,
    }));
  }, [isMounted]);

  if (!isMounted) return null;
  
  return (
    <motion.div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
        <div className="absolute inset-0 overflow-hidden">
            {particles.map(({id, style, className}) => <HeartIcon key={id} style={style} className={className} />)}
        </div>
      
        <AnimatePresence>
            <motion.div 
                className="z-10 flex flex-col items-center gap-8 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
            >
                <motion.div 
                    className="flex flex-wrap items-center justify-center gap-2 md:gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                {loveGifs.map((gif, i) => gif && (
                    <motion.div key={i} variants={itemVariants} className="glassmorphism p-2">
                        <Image src={gif.imageUrl} alt={gif.description} unoptimized width={100} height={100} className="rounded-lg" />
                    </motion.div>
                ))}
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-headline text-foreground text-glow">
                    Our Valentine date is officially booked 💜❤️
                </h2>
            </motion.div>
        </AnimatePresence>
    </motion.div>
  );
}
