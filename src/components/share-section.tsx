"use client";

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

export function ShareSection() {
  const { toast } = useToast();

  const handleShare = () => {
    if (typeof window === 'undefined') return;
    navigator.clipboard.writeText(window.location.href).then(() => {
      toast({
        title: 'Date Invite Copied! 💌',
        description: 'Send it to your valentine to book your date!',
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
        <Button onClick={handleShare} size="lg" variant="outline" className="text-lg bg-transparent border-white/50 text-white hover:bg-white/10 hover:text-white">
          <Send className="w-5 h-5 mr-2" />
          Send this date invite
        </Button>
      </div>
    </section>
  );
}
