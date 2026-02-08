import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function LoveLetterSection() {
  const blushingHeart = PlaceHolderImages.find(img => img.id === 'gif_blushing_heart');
  return (
    <section className="w-full">
      <div className="container p-8 mx-auto text-center max-w-2xl">
        <p className="text-xl md:text-2xl text-rose-100 font-headline flex items-center justify-center gap-2">
            Wanna do that open car babe on Valentine..
            {blushingHeart && (
                <Image 
                    src={blushingHeart.imageUrl}
                    alt={blushingHeart.description}
                    width={40}
                    height={40}
                    unoptimized
                    className="inline-block"
                />
            )}
            ❤️
        </p>
      </div>
    </section>
  );
}
