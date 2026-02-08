"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion, AnimatePresence } from 'framer-motion';

const dateSteps = [
    { text: "We start the day with smiles… and you.", gifId: "gif_morning_hug" },
    { text: "A cozy coffee, a warm talk.", gifId: "gif_coffee_together" },
    { text: "An aesthetic drive, just us and the music.", gifId: "gif_car_ride" },
    { text: "Watching the sunset, painting our memories.", gifId: "gif_sunset_couple" },
    { text: "One date… many memories 💜", gifId: "gif_cuddly_couple" },
];

const cardVariants = {
    initial: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
};

const DateStep = ({ text, gifId }: { text: string, gifId: string }) => {
    const gif = PlaceHolderImages.find(img => img.id === gifId);
    return (
        <motion.div
            key={text}
            variants={cardVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="absolute inset-0 flex items-center justify-center p-4"
        >
            <motion.div 
                className="glassmorphism w-[90vw] max-w-sm p-4 md:p-6 text-center flex flex-col items-center gap-4"
                whileHover={{ scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
                {gif && (
                    <div className="relative w-full aspect-square max-w-[300px] rounded-2xl overflow-hidden">
                        <Image 
                            src={gif.imageUrl}
                            alt={text}
                            fill
                            unoptimized
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                )}
                <p className="mt-4 text-xl font-handwritten text-foreground max-w-xs" style={{ textShadow: '0 1px 4px hsl(var(--primary) / 0.5)'}}>
                    {text}
                </p>
            </motion.div>
        </motion.div>
    );
};

export function MemoriesSection({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const stepDuration = 3500;
        if (step < dateSteps.length) {
            const timer = setTimeout(() => {
                setStep(s => s + 1);
            }, stepDuration);
            return () => clearTimeout(timer);
        } else {
             const finalTimer = setTimeout(() => {
                onComplete();
            }, stepDuration);
            return () => clearTimeout(finalTimer);
        }
    }, [step, onComplete]);

    return (
        <motion.section 
            className="fixed inset-0 z-40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <AnimatePresence mode="wait">
                {step < dateSteps.length && (
                    <DateStep 
                        key={step}
                        text={dateSteps[step].text}
                        gifId={dateSteps[step].gifId}
                    />
                )}
            </AnimatePresence>
        </motion.section>
    );
}
