"use client";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import React from "react";

export function Hero() {
  const carouselItems = [
    {
      id: 1,
      image: "/images/hero/women-fashion.jpeg",
      title: "Summer Sale",
      subtitle: "Up to 50% Off on Selected Items",
    },
    {
      id: 2,
      image: "/images/hero/women-fashion.jpeg",
      title: "New Arrivals",
      subtitle: "Discover the Latest Trends",
    },
    {
      id: 3,
      image: "/images/hero/women-fashion.jpeg",
      title: "Limited Edition",
      subtitle: "Exclusive Items Available Now",
    },
  ];

  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  return (
    <div className="relative w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.play()}
      >
        <CarouselContent className="h-[300px] sm:h-[400px]">
          {carouselItems.map((item, index) => (
            <CarouselItem key={item.id} className="h-full">
              <div className="relative w-full h-[300px] sm:h-[400px]">
                {/* Image container - ensure full height */}
                <div className="absolute inset-0 h-full w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover w-full h-full"
                    priority={index === 0}
                  />
                </div>

                {/* Text overlay */}
                <div className="relative h-full flex items-end pb-8 sm:pb-12">
                  <div className="absolute inset-0 bg-black/30" />
                  <div className="container mx-auto px-4 text-left z-10">
                    <div className="max-w-md">
                      <h1 className="text-3xl sm:text-4xl font-bold text-white">
                        {item.title}
                      </h1>
                      <p className="mt-2 text-sm sm:text-base text-white">
                        {item.subtitle}
                      </p>
                      <Button className="mt-4">Shop Now</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation buttons container below the carousel */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <CarouselPrevious className="static translate-y-0" />
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
}
