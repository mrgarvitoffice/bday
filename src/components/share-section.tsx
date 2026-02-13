
"use client";

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Instagram, Send } from 'lucide-react';
import Link from 'next/link';

export function ShareSection() {
  const { toast } = useToast();

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: 'Date Invite Copied! 💌',
        description: 'To my Kaushiki 😊!',
      });
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: 'Oops!',
        description: 'Could not copy the link.',
        variant: 'destructive'
      });
    });
  };

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
        <Button onClick={handleShare} size="lg" variant="outline" className="text-lg bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white">
          <Send className="w-5 h-5 mr-2" />
          Send this date invite
        </Button>
      </div>
    </section>
  );
}
