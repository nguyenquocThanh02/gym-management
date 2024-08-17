import CardPackage from "@/components/ui/cardPackage";
import CardTrainer from "@/components/ui/cardTrainer.component";
import React from "react";

const PackagePage = () => {
  return (
    <div className="l-container mt-[90px] bg-white/30 rounded-ss-full pb-10">
      <h1 className="text-center font-bold text-2xl md:text-4xl my-5">
        Packages
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="md:basis-1/2 lg:basis-1/3">
            <CardPackage />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PackagePage;
