"use client";

import { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface Heart {
  id: number;
  style: React.CSSProperties;
}

export function FloatingHearts() {
  const [isMounted, setIsMounted] = useState(false);
  const floatingHeartGif = PlaceHolderImages.find(img => img.id === 'gif_floating_heart');

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
      return {
        id: i,
        style: {
          width: `${size}rem`,
          height: `${size}rem`,
          left: `${left}vw`,
          animation: `float ${duration}s linear ${delay}s infinite`,
        },
      };
    });
  }, [isMounted]);

  if (!isMounted || !floatingHeartGif) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="absolute bottom-[-10vh]"
          style={heart.style}
        >
          <Image
            src={floatingHeartGif.imageUrl}
            alt={floatingHeartGif.description}
            fill
            unoptimized
            style={{objectFit: 'contain'}}
          />
        </div>
      ))}
    </div>
  );
}
