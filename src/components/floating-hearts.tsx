"use client";

import { useEffect, useState, useMemo } from 'react';

const HeartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

interface Heart {
  id: number;
  style: React.CSSProperties;
  colorClass: string;
}

export function FloatingHearts() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const hearts = useMemo(() => {
    if (!isMounted) return [];
    return Array.from({ length: 15 }).map((_, i) => {
      const size = Math.random() * 2 + 1; // 1rem to 3rem
      const delay = Math.random() * 10;
      const duration = Math.random() * 10 + 10; // 10s to 20s
      const left = Math.random() * 100;
      const colorClass = Math.random() > 0.5 ? 'text-primary' : 'text-purple-400';
      return {
        id: i,
        style: {
          width: `${size}rem`,
          height: `${size}rem`,
          left: `${left}vw`,
          animation: `float ${duration}s linear ${delay}s infinite`,
        },
        colorClass,
      };
    });
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      {hearts.map(heart => (
        <HeartIcon
          key={heart.id}
          className={`absolute bottom-[-10vh] ${heart.colorClass}`}
          style={heart.style}
        />
      ))}
    </div>
  );
}
