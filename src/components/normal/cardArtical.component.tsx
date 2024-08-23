import React from "react";
import Image from "next/image"; // Giả sử bạn đang sử dụng Next.js
import pt1 from "@/assets/img/pt2.png";
import { Card, CardContent } from "../ui/card";
interface TrainerCardProps {
  src: string;
  name: string;
  experience: string;
  describe: string;
}

const CardArtical: React.FC<TrainerCardProps> = ({
  src,
  name,
  experience,
  describe,
}) => {
  return (
    <Card>
      <CardContent className="w-full relative  overflow-hidden rounded-lg flex  ">
        <Image
          src={pt1}
          alt={name}
          className="w-full object-cover absolute top-0 right-0 left-0 z-0"
        />

        <div className=" flex flex-col justify-center items-center text-Dark text-2xl">
          <h4>{name}</h4>
          <h5>Experience {experience} years</h5>
          <div>
            <p className="italic">{describe}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardArtical;
