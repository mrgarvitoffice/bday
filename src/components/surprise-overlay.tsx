"use client";

import { useEffect, useState, useMemo } from 'react';

const Particle = ({ style, className }: { style: React.CSSProperties; className: string }) => (
  <div style={style} className={`absolute rounded-full ${className}`} />
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
    return Array.from({ length: 100 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        animation: `fall ${Math.random() * 5 + 5}s linear ${Math.random() * 5}s infinite`,
        width: `${Math.random() * 8 + 4}px`,
        height: `${Math.random() * 8 + 4}px`,
        opacity: Math.random() * 0.5 + 0.5,
      },
      className: Math.random() > 0.3 ? 'bg-primary' : Math.random() > 0.5 ? 'bg-accent' : 'bg-rose-300',
    }));
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-in fade-in-50">
      <div className="absolute inset-0 overflow-hidden">
        {particles.map(p => <Particle key={p.id} {...p} />)}
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
