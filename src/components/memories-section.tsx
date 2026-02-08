"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Share2, Star, Waves } from 'lucide-react';

const dateSteps = [
    { text: "We start the day with smiles… and you.", gifId: "gif_morning_hug" },
    { text: "A cozy coffee, a warm talk.", gifId: "gif_coffee_together", icon: <Waves /> },
    { text: "An aesthetic drive, just us and the music.", gifId: "gif_car_ride", icon: <Star /> },
    { text: "Watching the sunset, painting our memories.", gifId: "gif_sunset_couple" },
    { text: "One date… many memories 💜", gifId: "gif_cuddly_couple" },
];

const DateStep = ({ text, gifId, isActive }: { text: string, gifId: string, isActive: boolean }) => {
    const gif = PlaceHolderImages.find(img => img.id === gifId);
    return (
        <div className={cn(
            "absolute inset-0 flex flex-col items-center justify-center text-center p-4 transition-opacity duration-1000",
            isActive ? "opacity-100" : "opacity-0"
        )}>
            {gif && (
                <Image 
                    src={gif.imageUrl}
                    alt={text}
                    width={300}
                    height={300}
                    unoptimized
                    className="rounded-2xl shadow-2xl shadow-primary/20"
                />
            )}
            <p className="mt-8 text-2xl font-headline text-white text-glow max-w-sm">{text}</p>
        </div>
    );
};

export function MemoriesSection({ onComplete }: { onComplete: () => void }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        if (step < dateSteps.length -1) {
            const timer = setTimeout(() => {
                setStep(s => s + 1);
            }, 3000); // 3 seconds per step
            return () => clearTimeout(timer);
        } else {
             const finalTimer = setTimeout(() => {
                onComplete();
            }, 3000);
            return () => clearTimeout(finalTimer);
        }
    }, [step, onComplete]);

    return (
        <section className="fixed inset-0 z-40 bg-background flex items-center justify-center animate-in fade-in duration-1000">
            <div className="relative w-full h-full max-w-md max-h-screen">
                {dateSteps.map((dateStep, index) => (
                    <DateStep 
                        key={index}
                        text={dateStep.text}
                        gifId={dateStep.gifId}
                        isActive={step === index}
                    />
                ))}
                {/* Background decorations */}
                <Star className="absolute top-1/4 left-4 text-accent/50 animate-pulse" />
                <Waves className="absolute bottom-1/4 right-4 text-accent/50 animate-pulse animation-delay-500" />
            </div>
        </section>
    );
}
