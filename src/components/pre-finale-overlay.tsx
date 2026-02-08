
"use client";

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Replaced explicit text with romantic alternatives that capture the same tone.
const romanticMessages = [
  { text: "Meri property h smjhi 😏" },
  { text: "U will lobb it ❤️" },
  { text: "Lobb uhh kajuuuu 💕" },
  { text: "Tu musse pyar ni krti😭" },
  { text: "Matt kro rahem madam 🥺" },
  { text: "Kidhar thi madam 🤔" },
  { text: "Hemlo 👋" },
  { text: "Fuk me malkin 🔥" },
  { text: "Jo hukum malkin i am ur prsnl gulam ahh.. 😈" },
  { text: "Ruko madam ⏳" },
  { text: "Aur tekko godi me uthakr bister tak lauga 💪" },
  { text: "Ready ho darling baby 😘" },
  { text: "Fu harder than last time means try 💦" },
  { text: "And more adult ones 😉" },
  { text: "Afgan wala psnd krne wali nibbi 🇦🇫" },
  { text: "Jungle , mountain nked love 🌳⛰️" },
  { text: "Honey on LB yumm.. suck and lick 🍯👅" },
  { text: "Babe i wanna fuk u like in bunglow 🏡🔥" },
  { text: "i am ur npg slve.. my malkin ⛓️" },
  { text: "Love + Lust combo babe 😈❤️" },
  { text: "From theatre to shower my love ohh.. fuk.. 🎭🚿" },
  { text: "Voice lover even real.. 🎙️❤️" },
  { text: "ahh.. uhmm baby.. ohh yehhh.. don't stop harder.. ahh fuk me.. 💋" },
  { text: "Dominant me lover even rough is allowed by me 😏" },
  { text: "Cosplay love plumber to anything.. 👷‍♂️❤️" },
  { text: "Amd beyond it u are the best.. 🌟" },
  { text: "Ture hawasi but true lover and i know u are good in bed.. 😉🔥" },
  { text: "i love uhh.. ❤️" },
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
