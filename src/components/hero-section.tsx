import { FloatingHearts } from "./floating-hearts";

export function HeroSection() {
  return (
    <header className="relative flex flex-col items-center justify-center w-full min-h-screen px-4 text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] h-[50vw] max-w-lg max-h-lg bg-red-500/20 rounded-full blur-3xl animate-pulse -z-10" />
      <FloatingHearts />
      <div className="z-10 text-center animate-in fade-in duration-1000 delay-500">
        <h1 className="text-5xl tracking-tight text-white sm:text-7xl lg:text-8xl font-headline text-glow">
          Will You Be My Valentine? ❤️
        </h1>
      </div>
    </header>
  );
}
