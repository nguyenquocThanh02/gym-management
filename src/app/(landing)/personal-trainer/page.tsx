import CardTrainer from "@/components/ui/cardTrainer.component";
import React from "react";

const PersonalTrainer = () => {
  return (
    <div className="l-container mt-[90px] bg-white/30 rounded-ss-full ">
      <h1 className="text-center font-bold text-2xl md:text-4xl my-5">
        Personal Trainers
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <CardTrainer
                src="/path/to/image.jpg"
                name="Lyly"
                experience="8"
                describe="Expert in designing tailored programs for muscle building, fat loss, and enhancing overall fitness performance."
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalTrainer;
