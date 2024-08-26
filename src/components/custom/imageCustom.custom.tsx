import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Image from "next/image";
import { typeDevice } from "@/types"; // Đảm bảo rằng đường dẫn đúng với vị trí file
import { Badge } from "../ui/badge";

interface ImageCustomProps {
  data: typeDevice;
}

const ImageCustom: React.FC<ImageCustomProps> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="device-container overflow-hidden relative">
      <div
        className="device-child transition duration-500 hover:scale-125 relative"
        ref={ref}
      >
        <Image
          src={data.image}
          layout="fill"
          objectFit="contain"
          quality={100}
          alt={data.name}
        />
      </div>
      <motion.div
        className="absolute md:left-[calc(50%+130px)] md:bottom-[100px] border border-Light/40 bg-Light/10 p-1 w-fit h-fit shadow-lg"
        style={{ y }}
      >
        <h2 className="text-shadow font-bold text-3xl my-2">{data.name}</h2>
        <Badge className="absolute left-1 top-0 -translate-y-3 bg-Light/80 text-Dark">
          {data.status}
        </Badge>
        <div className="text-shadow text-base max-w-md">{data.description}</div>
      </motion.div>
    </section>
  );
};

// Hook để tạo hiệu ứng parallax
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

export default ImageCustom;
