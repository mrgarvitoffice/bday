"use client";

import { motion } from 'framer-motion';
import { FloatingParticles } from './floating-particles';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 3.5,
    },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const HeartIcon = () => (
    <motion.svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 100, damping: 10 }}
    >
        <motion.path
            d="M50 87.2C25.5 69.2 12.5 56.2 12.5 40C12.5 27.3 22.3 17.5 35 17.5C42.4 17.5 49.3 21.4 50 27.5C50.7 21.4 57.6 17.5 65 17.5C77.7 17.5 87.5 27.3 87.5 40C87.5 56.2 74.5 69.2 50 87.2Z"
            stroke="hsl(var(--accent))"
            strokeWidth="2"
            fill="transparent"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 2.2 }}
        >
             <animate
                attributeName="stroke-width"
                values="2;3;2"
                dur="2s"
                repeatCount="indefinite"
                begin="3.5s"
            />
        </motion.path>
    </motion.svg>
)

export function HeroSection() {
    const title = "Will you be my Valentine?".split("");
    const blushingHeart = PlaceHolderImages.find(img => img.id === 'gif_blushing_heart');

  return (
    <header className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 text-center overflow-hidden">
        <FloatingParticles />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="z-10"
        >
            <HeartIcon />
        </motion.div>
        
        <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl font-headline text-foreground mt-8"
            style={{ textShadow: '0 0 8px hsl(var(--accent) / 0.6), 0 0 20px hsl(var(--primary) / 0.4)'}}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {title.map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                    {char}
                </motion.span>
            ))}
        </motion.h1>

        <motion.div
            className="mt-6 flex items-center justify-center gap-2"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 5 }}
        >
            <p className="text-xl md:text-2xl text-muted-foreground font-handwritten" style={{textShadow: '0 1px 5px hsl(var(--accent) / 0.5)'}}>
                Wanna do that open car babe on Valentine..
            </p>
             {blushingHeart && (
                <Image 
                    src={blushingHeart.imageUrl}
                    alt={blushingHeart.description}
                    width={40}
                    height={40}
                    unoptimized
                    className="inline-block"
                />
            )}
             ❤️
        </motion.div>
    </header>
  );
}
