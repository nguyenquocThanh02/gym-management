import React from "react";
import Image from "next/image";
import logo from "@/assets/img/logo.png";

interface HeroSectionProps {
  children: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({ children }) => {
  return (
    <div className="bg-attachment flex flex-col justify-center items-center">
      <Image data-aos="flip-up" src={logo} alt="logo" className="w-[160px]" />

      <h3
        data-aos="fade-up"
        className="text-3xl font-bold text-Light text-shadow text-center opacity-85 sm:w-1/2"
      >
        {children}
      </h3>
    </div>
  );
};

export default HeroSection;
