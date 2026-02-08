"use client";

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Share2 } from 'lucide-react';

export function ShareSection() {
  const { toast } = useToast();

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: 'Link Copied! 💌',
        description: 'Share it with your valentine.',
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
      <div className="container flex flex-col items-center justify-center mx-auto">
        <h3 className="mb-4 text-2xl text-center font-headline">Fallen for me?</h3>
        <Button onClick={handleShare} size="lg" variant="outline" className="text-lg bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white">
          <Share2 className="w-5 h-5 mr-2" />
          Share with your Valentine
        </Button>
      </div>
    </section>
  );
}
