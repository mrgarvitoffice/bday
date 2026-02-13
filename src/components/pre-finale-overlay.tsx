"use client";

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Replaced explicit text with romantic alternatives that capture the same tone.
const romanticMessages = [
  { text: "To my soulmate - Kaushiki💫" },
{ text: "You’ve seen me at my best 😌✨" },
{ text: "And you stood by me at my worst 💔➡️❤️" },
{ text: "You didn’t turn away when things got hard 🫂" },
{ text: "You chose to stay 🙏" },
{ text: "Thank you for loving me 💖" },
{ text: "Thank you for loving me so purely 🤍" },
{ text: "Your love feels honest, real, and safe 🕊️" },
{ text: "You make me a better person 🌱" },
{ text: "Not by changing me" },
{ text: "But just by being in my life 🌍" },
{ text: "You bring peace into my chaos 🌊➡️☀️" },
{ text: "You understand me without words 🧠❤️" },
{ text: "You support me without conditions 🤝" },
{ text: "You aren’t just my friend 🙂" },
{ text: "You’re more than that 💫" },
{ text: "You’re my strength, my comfort, my home 🏡" },
{ text: "You’re my everything Kaushiki❤️‍🔥🙏" },
];

const messageVariants = {
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
};

export function PreFinaleOverlay({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/song.mp3');
    audio.loop = true;
    audioRef.current = audio;

    let isCancelled = false;

    const playAudio = async () => {
      try {
        await audio.play();
      } catch (err: any) {
        // In development with React Strict Mode, components may render twice,
        // causing the first play() attempt to be interrupted by the cleanup's pause().
        // This is expected and can be safely ignored.
        if (err.name === 'AbortError') {
          console.log('Audio play() aborted, this is expected in development.');
        } else {
          console.error("Audio autoplay failed:", err);
          // Fallback for browsers that block autoplay
          const playOnInteraction = () => {
            if (!isCancelled) {
              audio.play().catch(e => console.error("Interaction play failed", e));
              window.removeEventListener('click', playOnInteraction);
              window.removeEventListener('touchstart', playOnInteraction);
            }
          };
          window.addEventListener('click', playOnInteraction);
          window.addEventListener('touchstart', playOnInteraction);
        }
      }
    };

    playAudio();

    return () => {
      isCancelled = true;
      // Fade out audio instead of abrupt stop
      let vol = audio.volume;
      const fadeOutInterval = setInterval(() => {
        if (vol > 0.1) {
          vol -= 0.1;
          audio.volume = vol;
        } else {
          clearInterval(fadeOutInterval);
          audio.pause();
          audio.src = '';
        }
      }, 50);
    };
  }, []);

  useEffect(() => {
    if (index >= romanticMessages.length) {
      setTimeout(() => {
        setShow(false);
        setTimeout(onComplete, 500); // Wait for fade out
      }, 500);
      return;
    }

    // Increased duration to make text readable
    const messageDuration = 1500; 

    const timer = setTimeout(() => {
      setIndex(i => i + 1);
    }, messageDuration);

    return () => clearTimeout(timer);
  }, [index, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {index < romanticMessages.length && (
            <motion.p
              key={index}
              className="text-4xl md:text-6xl font-bold text-center text-white font-headline text-glow p-4"
              variants={messageVariants}
              initial="exit"
              animate="enter"
              exit="exit"
            >
              {romanticMessages[index].text}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
