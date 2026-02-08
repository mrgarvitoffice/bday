"use client";

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
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

export function SurpriseOverlay() {
  const [showContent, setShowContent] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const excitedGif = PlaceHolderImages.find(img => img.id === 'gif_excited_character');
  const loveGif1 = PlaceHolderImages.find(img => img.id === 'gif_love_1');
  const loveGif2 = PlaceHolderImages.find(img => img.id === 'gif_love_2');
  const loveGif3 = PlaceHolderImages.find(img => img.id === 'gif_love_3');
  const loveGif4 = PlaceHolderImages.find(img => img.id === 'gif_love_4');
  const loveGif5 = PlaceHolderImages.find(img => img.id === 'gif_love_5');
  const loveGif6 = PlaceHolderImages.find(img => img.id === 'gif_love_6');


  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setShowContent(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const particles = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 150 }).map((_, i) => {
        const size = Math.random() * 2.5 + 1; // 1rem to 3.5rem
        return {
            id: i,
            style: {
              left: `${Math.random() * 100}%`,
              animation: `fall ${Math.random() * 8 + 5}s linear ${Math.random() * 5}s infinite`,
              width: `${size}rem`,
              height: `${size}rem`,
              opacity: Math.random() * 0.7 + 0.3,
            },
            className: `absolute ${Math.random() > 0.3 ? 'text-primary' : Math.random() > 0.5 ? 'text-accent' : 'text-rose-300'}`,
        }
    });
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in-50">
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(({id, style, className}) => <HeartIcon key={id} style={style} className={className} />)}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-1 h-1 bg-white rounded-full animate-burst" 
          style={{
            boxShadow: '0 0 50px 20px #fff, 0 0 100px 50px hsl(var(--primary)), 0 0 140px 90px hsl(var(--accent))'
          }}
        />
      </div>
      {showContent && (
        <div className="z-10 flex flex-col items-center gap-8 px-4 text-center animate-in fade-in-0 slide-in-from-bottom-10 duration-1000">
           <div className="flex flex-wrap items-center justify-center gap-4">
               {loveGif1 && <Image src={loveGif1.imageUrl} alt={loveGif1.description} unoptimized width={120} height={120} className="rounded-lg animate-bounce-in" style={{animationDelay: '200ms'}} />}
               {excitedGif && <Image src={excitedGif.imageUrl} alt={excitedGif.description} unoptimized width={150} height={150} className="rounded-lg animate-bounce-in" />}
               {loveGif2 && <Image src={loveGif2.imageUrl} alt={loveGif2.description} unoptimized width={120} height={120} className="rounded-lg animate-bounce-in" style={{animationDelay: '400ms'}} />}
               {loveGif3 && <Image src={loveGif3.imageUrl} alt={loveGif3.description} unoptimized width={120} height={120} className="rounded-lg animate-bounce-in" style={{animationDelay: '600ms'}} />}
               {loveGif4 && <Image src={loveGif4.imageUrl} alt={loveGif4.description} unoptimized width={120} height={120} className="rounded-lg animate-bounce-in" style={{animationDelay: '800ms'}} />}
               {loveGif5 && <Image src={loveGif5.imageUrl} alt={loveGif5.description} unoptimized width={120} height={120} className="rounded-lg animate-bounce-in" style={{animationDelay: '1000ms'}} />}
               {loveGif6 && <Image src={loveGif6.imageUrl} alt={loveGif6.description} unoptimized width={120} height={120} className="rounded-lg animate-bounce-in" style={{animationDelay: '1200ms'}} />}
           </div>
           <h2 className="text-4xl md:text-5xl font-headline text-white text-glow">
            Our Valentine date is officially booked 💜❤️
          </h2>
        </div>
      )}
    </div>
  );
}
