import { TypingText } from './typing-text';

export function LoveLetterSection() {
  return (
    <section className="w-full">
      <div className="container p-8 mx-auto rounded-2xl glassmorphism max-w-2xl">
        <TypingText
          text="Some loves don’t need words… but mine needs you."
          className="text-2xl italic text-center md:text-3xl text-rose-100 font-headline"
        />
      </div>
    </section>
  );
}
