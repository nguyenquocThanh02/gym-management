"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import device1 from "@/assets/img/device1.jpg";
import device3 from "@/assets/img/device3.jpg";
import device4 from "@/assets/img/device4.jpg";
import device5 from "@/assets/img/device5.jpg";
import device6 from "@/assets/img/device6.jpg";
import device7 from "@/assets/img/device7.jpg";
import device8 from "@/assets/img/device8.jpg";
import device10 from "@/assets/img/device10.jpg";
import device12 from "@/assets/img/device12.jpg";
import Image from "next/image";

// Tạo đối tượng hình ảnh
const images = {
  device1,
  device3,
  device4,
  device5,
  device6,
  device7,
  device8,
  device10,
  device12,
};

// Component chính để hiển thị hình ảnh
const Devices = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Mảng các key hình ảnh để hiển thị
  const imageKeys = [
    "device6",
    "device4",
    "device8",
    "device10",
    "device12",
    "device6",
    "device8",
    "device10",
  ];

  return (
    <div className="l-container bg-white/30 rounded-full">
      <h1 className="text-center font-bold text-4xl fixed top-28 left-0 right-0 mx-auto z-10 text-shadow">
        Devices
      </h1>
      {imageKeys.map((key, index) => (
        <ImageCustom src={images[key]} key={index} index={index} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
    </div>
  );
};

export default Devices;

// Hook để tạo hiệu ứng parallax
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

// Component để hiển thị từng hình ảnh
function ImageCustom({ src, index }: { src: string; index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="device-container overflow-hidden">
      <div
        className="device-child transition duration-500 hover:scale-125"
        ref={ref}
      >
        <Image src={device1} alt="Device" className="device-img" />
      </div>
      <motion.div
        className="absolute md:left-[calc(50%+130px)] md:bottom-[100px] border border-white p-1 w-fit h-fit"
        style={{ y }}
      >
        <h2 className="text-shadow font-bold text-3xl">Tạ đòn 20kg x 2</h2>
        <div className="text-shadow text-base max-w-md">
          Tạ đòn là dụng cụ không thể thiếu đối với bất kỳ ai khi vào phòng tập,
          một dụng cụ đơn giản nhưng cực kỳ hiệu quả và phù hợp với hầu hết các
          bài tập. Tạ đòn là dụng cụ không thể thiếu đối với bất kỳ ai khi vào
          phòng tập, một dụng cụ đơn giản nhưng cực kỳ hiệu quả và phù hợp với
          hầu hết các bài tập.
        </div>
      </motion.div>{" "}
    </section>
  );
}
