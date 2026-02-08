"use client";

import { useState, useEffect, useRef } from 'react';

type TypingTextProps = {
  text: string;
  className?: string;
  speed?: number;
};

export function TypingText({ text, className, speed = 70 }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    setDisplayedText(''); 
    if (text) {
      let i = 0;
      if (cursorRef.current) {
        cursorRef.current.style.display = 'inline-block';
      }
      const intervalId = setInterval(() => {
        setDisplayedText(text.substring(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
          if (cursorRef.current) {
            cursorRef.current.style.display = 'none';
          }
        }
      }, speed);
      return () => clearInterval(intervalId);
    }
  }, [text, speed, isMounted]);

  return (
    <p className={className}>
      {displayedText}
      <span ref={cursorRef} className="w-1 h-6 -mb-1 ml-1 bg-rose-200 animate-pulse" />
    </p>
  );
}
