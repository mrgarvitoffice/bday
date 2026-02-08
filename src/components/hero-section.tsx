
"use client";

import { motion } from 'framer-motion';
import { FloatingParticles } from './floating-particles';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 3,
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
      ease: 'easeOut',
      duration: 0.6,
    },
  },
};

const subtitleVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: {
            delay: 4.5,
            duration: 0.5,
            ease: 'easeOut'
        }
    }
}

const HeartIcon = () => (
    <motion.div
        initial={{ opacity: 0, filter: 'drop-shadow(0 0 0px hsl(var(--primary)))' }}
        animate={{ opacity: 1, filter: 'drop-shadow(0 0 10px hsl(var(--primary)))' }}
        transition={{ duration: 2, delay: 0.5, filter: { delay: 3.5, duration: 1} }}
    >
        <motion.svg
            width="100"
            height="100"
            viewBox="0 0 100 100"
            initial={{ scale: 0.5 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ 
                scale: { delay: 4.5, duration: 2, repeat: Infinity, repeatType: 'mirror' },
                default: { delay: 2, type: 'spring', stiffness: 100, damping: 10 }
            }}
        >
            <motion.path
                d="M50 87.2C25.5 69.2 12.5 56.2 12.5 40C12.5 27.3 22.3 17.5 35 17.5C42.4 17.5 49.3 21.4 50 27.5C50.7 21.4 57.6 17.5 65 17.5C77.7 17.5 87.5 27.3 87.5 40C87.5 56.2 74.5 69.2 50 87.2Z"
                stroke="hsl(var(--accent))"
                strokeWidth="1.5"
                fill="transparent"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 2.2 }}
            />
            <motion.path
                d="M50 87.2C25.5 69.2 12.5 56.2 12.5 40C12.5 27.3 22.3 17.5 35 17.5C42.4 17.5 49.3 21.4 50 27.5C50.7 21.4 57.6 17.5 65 17.5C77.7 17.5 87.5 27.3 87.5 40C87.5 56.2 74.5 69.2 50 87.2Z"
                fill="hsl(var(--primary) / 0.5)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3.5 }}
            />
        </motion.svg>
    </motion.div>
)

export function HeroSection() {
    const title = "Will you be my Valentine?".split("");
    const blushingHeart = PlaceHolderImages.find(img => img.id === 'gif_blushing_heart');

  return (
    <header className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 text-center overflow-hidden">
        <FloatingParticles />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        
        <HeartIcon />
        
        <motion.h1
            className="text-5xl sm:text-7xl lg:text-8xl font-headline text-foreground mt-8 text-glow"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {title.map((char, index) => (
                <motion.span key={index} variants={charVariants}>
                    {char === ' ' ? '\u00A0' : char}
                </motion.span>
            ))}
        </motion.h1>

        <motion.div
            className="mt-6 flex items-center justify-center gap-2"
            variants={subtitleVariants}
            initial="hidden"
            animate="visible"
        >
            <p className="text-xl md:text-2xl text-muted-foreground font-handwritten" style={{textShadow: '0 1px 5px hsl(var(--accent) / 0.5)'}}>
                I've got a surprise for you... if you say yes.
            </p>
             {blushingHeart && (
                <video 
                    src={blushingHeart.imageUrl}
                    width={40}
                    height={40}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="inline-block"
                />
            )}
        </motion.div>
    </header>
  );
}
