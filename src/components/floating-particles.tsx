"use client";

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';

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
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      opacity: Math.random() * 0.3 + 0.1,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
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
          className="absolute rounded-full bg-accent/50"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          initial={{ y: 0, opacity: p.opacity }}
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
