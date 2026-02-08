"use client";

import { useEffect, useState, useMemo } from 'react';

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
  const [showText, setShowText] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setTimeout(() => setShowText(true), 1500);
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
              animation: `fall ${Math.random() * 8 + 5}s linear ${Math.random() * 10}s infinite`,
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
      {showText && (
        <h2 className="z-10 px-4 text-4xl text-center md:text-6xl font-headline text-white text-glow animate-in fade-in-0 slide-in-from-bottom-10 duration-1000">
          You’re mine, today and always 💜❤️
        </h2>
      )}
    </div>
  );
}
