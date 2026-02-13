"use client";

import { useMemo } from 'react';
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
  initialX: string;
  initialY: string;
  size: number;
  duration: number;
  delay: number;
}

// Function to generate a random position along the border
const getRandomBorderPosition = () => {
  const side = Math.floor(Math.random() * 4);
  const position = Math.random() * 100;
  switch (side) {
    case 0: // top
      return { initialX: `${position}vw`, initialY: '-10vh' };
    case 1: // right
      return { initialX: '110vw', initialY: `${position}vh` };
    case 2: // bottom
      return { initialX: `${position}vw`, initialY: '110vh' };
    case 3: // left
      return { initialX: '-10vw', initialY: `${position}vh` };
    default:
      return { initialX: '-10vw', initialY: '-10vh' };
  }
};


export function CornerHearts() {
  const particles: Particle[] = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
        const { initialX, initialY } = getRandomBorderPosition();
        return {
            id: i,
            initialX,
            initialY,
            size: Math.random() * 15 + 5,
            duration: Math.random() * 10 + 8,
            delay: Math.random() * 15,
        }
    });
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute text-accent/50"
          style={{
            width: p.size,
            height: p.size,
          }}
          initial={{
              top: p.initialY,
              left: p.initialX,
              opacity: 0,
              scale: 0.5
          }}
          animate={{
            opacity: [0, 1, 0],
            top: '50%',
            left: '50%',
            translateX: '-50%',
            translateY: '-50%',
            scale: 1.2
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeOut",
            repeat: Infinity,
          }}
        >
            <HeartParticle />
        </motion.div>
      ))}
    </div>
  );
}
