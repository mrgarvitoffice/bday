import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function MemoriesSection() {
  const images = PlaceHolderImages;

  return (
    <section className="w-full">
      <div className="container mx-auto">
        <h2 className="mb-8 text-4xl text-center md:text-5xl font-headline text-glow">Our Memories</h2>
        <Carousel opts={{ loop: true }} className="w-full max-w-4xl mx-auto">
          <CarouselContent>
            {images.map((image) => (
              <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden transition-all duration-300 border-0 bg-transparent group hover:shadow-[0_0_20px_theme(colors.primary)]">
                    <CardContent className="flex items-center justify-center p-0">
                       <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={800}
                        height={600}
                        className="object-cover w-full transition-transform duration-300 rounded-md aspect-square group-hover:scale-110"
                        data-ai-hint={image.imageHint}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-white transition bg-black/20 border-white/20 hover:bg-primary" />
          <CarouselNext className="text-white transition bg-black/20 border-white/20 hover:bg-primary" />
        </Carousel>
      </div>
    </section>
  );
}
