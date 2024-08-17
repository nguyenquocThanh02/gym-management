import React from "react";
import Image from "next/image"; // Giả sử bạn đang sử dụng Next.js
import { Card, CardContent, CardTitle } from "./card";
import pt1 from "@/assets/img/pt2.png";
interface TrainerCardProps {
  src: string;
  name: string;
  experience: string;
  describe: string;
}

const CardTrainer: React.FC<TrainerCardProps> = ({
  src,
  name,
  experience,
  describe,
}) => {
  return (
    <Card>
      <CardContent className="min-h-[600px] w-full relative mx-auto h-auto overflow-hidden rounded-lg flex aspect-square items-center justify-center p-0 group">
        <Image
          src={pt1}
          alt={name}
          className="w-full h-full object-cover relative z-0 rounded-lg transition-all duration-300 group-hover:scale-110"
        />

        <div className="absolute bottom-0 right-0 top-0 left-0 bg-Primary/20 opacity-0 transition-opacity duration-300 hover:opacity-90">
          <div className="h-full text-center flex flex-col justify-center items-center text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h4>{name}</h4>
            <h5>Experience {experience} years</h5>
            <div>
              <p className="italic">{describe}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTrainer;
