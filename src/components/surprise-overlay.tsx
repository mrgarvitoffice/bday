"use client";

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
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
    'gif_excited_character', 
    'gif_love_1', 
    'gif_love_2', 
    'gif_love_3', 
    'gif_love_4', 
    'gif_love_5', 
    'gif_love_6',
    'gif_love_7',
    'gif_love_8'
].map(id => PlaceHolderImages.find(img => img.id === id)).filter(Boolean);

const romanticMessages = [
    "You said yes!",
    "I knew you couldn't resist.",
    "Our adventure awaits...",
    "Get ready for the best date ever.",
    "Just you and me.",
    "My heart is all yours.",
    "Can't wait to see you.",
    "I'm counting down the seconds.",
    "You + Me = ❤️",
    "Prepare to be pampered.",
    "This is our story.",
];

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

const messageContainerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.4,
            delayChildren: 2.5, // Start after initial animations
        }
    }
}

const messageItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' }}
}

const finalQuestionVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 2.5 + (romanticMessages.length * 0.4) + 0.5, // After all messages
            type: 'spring',
        },
    },
}


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
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
        <div className="absolute inset-0">
            {particles.map(({id, style, className}) => <HeartIcon key={id} style={style} className={className} />)}
        </div>
      
        <div 
            className="z-10 flex flex-col items-center gap-8 text-center"
        >
            <motion.div 
                className="grid grid-cols-3 gap-2 md:gap-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
            {loveGifs.map((gif, i) => gif && (
                <motion.div key={i} variants={itemVariants} className="glassmorphism p-2">
                    <video src={gif.imageUrl} autoPlay loop muted playsInline width={100} height={100} className="rounded-lg object-cover aspect-square" />
                </motion.div>
            ))}
            </motion.div>
            <motion.h2 
                className="text-4xl md:text-5xl font-headline text-foreground text-glow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
            >
                Our Valentine date is officially booked ❤️
            </motion.h2>

            <motion.div 
                className="flex flex-col gap-2 mt-4 h-24 relative w-full"
                variants={messageContainerVariants}
                initial="hidden"
                animate="visible"
            >
                {romanticMessages.map((msg, i) => (
                    <motion.p 
                        key={i} 
                        className="text-xl md:text-2xl font-handwritten text-accent absolute left-1/2 -translate-x-1/2"
                        initial={{ opacity: 0, y: 20, rotate: Math.random() * 20 - 10 }}
                        animate={{ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.3 } }}
                        exit={{ opacity: 0 }}
                    >
                        {msg}
                    </motion.p>
                ))}
            </motion.div>

            <motion.h3 
                className="text-2xl md:text-3xl font-handwritten text-foreground text-glow mt-6"
                variants={finalQuestionVariants}
                initial="hidden"
                animate="visible"
            >
                Wanna do that open car babe on Valentine for 1 hour ??
            </motion.h3>
        </div>
    </motion.div>
  );
}
