"use client";

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

const HeartParticle = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-full h-full"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  duration: number;
  delay: number;
}

export function FloatingParticles() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particles: Particle[] = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 12 + 4,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 10,
    }));
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute text-accent/40"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          initial={{ y: 0, x: 0, opacity: p.opacity, rotate: Math.random() * 360 }}
          animate={{
            y: [0, -15 + Math.random() * -10, 0],
            x: [0, 15 + Math.random() * 10, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: "easeInOut"
          }}
        >
            <HeartParticle />
        </motion.div>
      ))}
    </div>
  );
}
