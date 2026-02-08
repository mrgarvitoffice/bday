"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FloatingHearts } from "./floating-hearts";
import { Coffee, Film, Music, Route } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const CalendarIcon = ({ icon, delay }: { icon: React.ReactNode, delay: number }) => (
    <div className="p-4 rounded-full bg-white/10 animate-bounce-in" style={{ animationDelay: `${delay}ms` }}>
        {icon}
    </div>
);

export function HeroSection() {
    const [step, setStep] = useState(0);
    const coupleGif = PlaceHolderImages.find(img => img.id === 'gif_couple_shy');

    useEffect(() => {
        const timings = [1500, 3500, 3500]; // Durations for steps 0, 1, 2
        if (step < timings.length) {
            const timer = setTimeout(() => {
                setStep(s => s + 1);
            }, timings[step]);
            return () => clearTimeout(timer);
        }
    }, [step]);


    return (
        <header className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 text-center overflow-hidden">
            <FloatingHearts />
            
            {/* Step 0: Initial text */}
            <div className={`absolute transition-opacity duration-1000 ${step === 0 ? 'opacity-100' : 'opacity-0'}`}>
                <p className="text-white/80">wait… something special is coming 💜</p>
            </div>
            
            {/* Step 1: Couple GIF */}
            <div className={`absolute transition-opacity duration-1000 ${step === 1 ? 'opacity-100' : 'opacity-0'}`}>
                {coupleGif && (
                    <Image 
                        src={coupleGif.imageUrl}
                        alt={coupleGif.description}
                        width={250}
                        height={250}
                        unoptimized
                        className="rounded-full"
                    />
                )}
            </div>

            {/* Step 2: Calendar Icons */}
            <div className={`absolute transition-opacity duration-1000 ${step === 2 ? 'opacity-100' : 'opacity-0'}`}>
                <div className="flex gap-4 text-white">
                    <CalendarIcon icon={<Coffee />} delay={100} />
                    <CalendarIcon icon={<Film />} delay={300} />
                    <CalendarIcon icon={<Music />} delay={500} />
                    <CalendarIcon icon={<Route />} delay={700} />
                </div>
            </div>

            {/* Step 3: Main Confession */}
            <div className={`z-10 text-center transition-all duration-1000 delay-500 ${step >= 3 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                <h1 className="text-5xl tracking-tight text-white sm:text-7xl lg:text-8xl font-headline text-glow animate-heart-pulse">
                    Will You Be My Valentine? ❤️
                </h1>
            </div>

        </header>
    );
}
