import React from "react";
import Image from "next/image"; // Giả sử bạn đang sử dụng Next.js
import { Card, CardContent, CardTitle } from "../ui/card";
interface TrainerCardProps {
  src?: string;
  name: string;
  experience?: string | number;
  describe?: string;
  specialty: string;
}

const CardTrainer: React.FC<TrainerCardProps> = ({
  src,
  name,
  experience,
  describe,
  specialty,
}) => {
  return (
    <Card>
      <CardContent className="min-h-[600px] w-full relative mx-auto h-auto overflow-hidden rounded-lg flex aspect-square items-center justify-center p-0 group">
        <Image
          src={src}
          alt={name}
          fill
          className="w-full h-full object-cover relative z-0 rounded-lg transition-all duration-300 group-hover:scale-110"
        />

        <div className="absolute bottom-0 right-0 top-0 left-0 bg-Primary/10 opacity-0 transition-opacity duration-300 hover:opacity-80">
          <div className="h-full px-1 text-center flex flex-col justify-center items-center text-shadow text-Light text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h2 className="text-2xl font-bold">{name}</h2>
            <h3 className="font-bold">Experience {experience} years</h3>
            <div>
              <h3 className="font-bold">{specialty}</h3>
              <p className="italic">{describe}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardTrainer;
