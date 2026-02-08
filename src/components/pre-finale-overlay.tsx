
"use client";

import { Music } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const romanticMessages = [
    { text: "Meri property hai samjhi? 😏" },
    { text: "ACCHA SOLLY 😇" },
    { text: "You will lobb it... ❤️" },
    { text: "Lobb uhh kajuuuu 😘" },
    { text: "Tu mujhse pyaar nahi karti? 😭" },
    { text: "Matt karo reham madam...😈" },
    { text: "Kidhar thi madam? 🤔" },
    { text: "Ready ho, darling baby? 🔥" },
    { text: "Jo hukum, malkin. I am your personal gulam. 😉" },
    { text: "I love you... ❤️" },
];

const messageVariants = {
  enter: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2, ease: 'easeIn' } },
};

export function PreFinaleOverlay({ onComplete }: { onComplete: () => void }) {
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (index >= romanticMessages.length) {
      setTimeout(() => {
        setShow(false);
        setTimeout(onComplete, 500);
      }, 500);
      return;
    }

    const messageDuration = index < 2 ? 1000 : 700;

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
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Music className="w-16 h-16 text-primary/80" />
      </motion.div>

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
