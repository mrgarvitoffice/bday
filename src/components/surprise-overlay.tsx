
"use client";

import { motion } from 'framer-motion';

export function SurpriseOverlay() {
  return (
    <motion.div 
        className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 overflow-hidden bg-background"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-background via-black to-background" />

      <div className="z-10 flex flex-col items-center gap-8 text-center">
        <motion.h2 
            className="text-4xl md:text-5xl font-headline text-foreground text-glow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
            Our Valentine date is officially booked.
        </motion.h2>

        <motion.h3 
            className="text-2xl md:text-3xl font-handwritten text-accent text-glow mt-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, type: 'spring' }}
        >
            Wanna do that unforgettable open car babe on Valentine's for 1 hour? 😉
        </motion.h3>
      </div>
    </motion.div>
  );
}
