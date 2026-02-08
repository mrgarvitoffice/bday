
"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Replaced explicit text with romantic alternatives that capture the same tone.
const romanticMessages = [
    { text: "You're mine, understand? 😏" },
    { text: "Just kidding... maybe 😇" },
    { text: "You're going to love this... ❤️" },
    { text: "Love you more than anything 😘" },
    { text: "Don't even think about saying no 😭" },
    { text: "Don't test my patience... 😈" },
    { text: "Where have you been all my life? 🤔" },
    { text: "Ready for our adventure, darling? 🔥" },
    { text: "Your wish is my command 😉" },
    { text: "I love you... more than words can say ❤️" },
];

const messageVariants = {
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } },
};

export function PreFinaleOverlay({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

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
