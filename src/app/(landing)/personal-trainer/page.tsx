"use client";
import CardTrainer from "@/components/normal/cardTrainer.component";
import { PTApis } from "@/services/pt.service";
import { typePT } from "@/types/pt.type";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const PersonalTrainer = () => {
  const { data, isLoading } = useQuery<any>({
    queryKey: ["personal-trainers"],
    queryFn: PTApis.getAllPT,
  });

  const arrs: typePT[] = data?.data || [];

  return (
    <div className="l-container bg-BgLight/30 rounded-ss-full pb-8">
      <h1 className="text-center font-bold text-2xl md:text-4xl my-5">
        Personal Trainers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {arrs.map((item, index) => (
          <div
            data-aos="fade-up"
            key={index}
            className="pl-1 md:basis-1/2 lg:basis-1/3"
          >
            <div className="p-1">
              <CardTrainer
                src={item?.profileImage}
                name={item.name}
                experience={item?.experienceYears}
                describe={item?.bio}
                specialty={item.specialty}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalTrainer;
