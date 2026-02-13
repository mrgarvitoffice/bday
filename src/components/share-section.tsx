"use client";

import { Instagram } from 'lucide-react';
import Link from 'next/link';

export function ShareSection() {
  return (
    <section className="w-full">
      <div className="container flex flex-col items-center justify-center mx-auto gap-6">
        <Link
          href="https://www.instagram.com/_.sagar._31?igsh=MXV0Z2JjcDZiMzNhNA=="
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/80 hover:text-white hover:underline transition-colors"
        >
          <Instagram className="w-5 h-5" />
          Watch Creator Profile - Sagar Namdeo
        </Link>
      </div>
    </section>
  );
}
