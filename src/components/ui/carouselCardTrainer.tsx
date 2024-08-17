"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import pt1 from "@/assets/img/pt1.jpg";
import CardTrainer from "./cardTrainer.component";
export default function CarouselTrainer() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="w-full flex justify-center py-5">
      <Carousel className="w-full max-w-5xl" plugins={[plugin.current]}>
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <CardTrainer
                  src="/path/to/image.jpg"
                  name="Lyly"
                  experience="8"
                  describe="Expert in designing tailored programs for muscle building, fat loss, and enhancing overall fitness performance."
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="translate-x-16 bg-transparent" />
        <CarouselNext className="-translate-x-16 bg-transparent" />
      </Carousel>
    </div>
  );
}
