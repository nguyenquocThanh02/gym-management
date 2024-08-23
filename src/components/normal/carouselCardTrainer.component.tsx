"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CardTrainer from "./cardTrainer.component";
import { PTApis } from "@/services/pt.service";
import { useQuery } from "@tanstack/react-query";
import { typePT } from "@/types/pt.type";
export default function CarouselTrainer() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const { data, isLoading } = useQuery<any>({
    queryKey: ["personal-trainers"],
    queryFn: PTApis.getAllPT,
  });

  const arrs: typePT[] = data?.data || [];

  return (
    <div className="w-full flex justify-center py-5">
      <Carousel className="w-full max-w-5xl" plugins={[plugin.current]}>
        <CarouselContent className="-ml-1">
          {arrs.map((item, index) => (
            <CarouselItem
              key={index}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <CardTrainer
                  src={item?.profileImage}
                  name={item.name}
                  experience={item.experienceYears}
                  describe={item?.bio}
                  specialty={item.specialty}
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
