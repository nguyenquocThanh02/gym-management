"use client";
import React from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { typeDevice } from "@/types";
import { DeviceApis } from "@/services";
import { useQuery } from "@tanstack/react-query";
import ImageCustom from "@/components/custom/imageCustom.custom";

const Devices: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["devices"],
    queryFn: DeviceApis.getAllDevice,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading devices.</div>;

  const arrs: typeDevice[] = data?.data || [];

  return (
    <div className="l-container -mt-[86px] bg-BgLight/30 rounded-full">
      <h1 className="text-center font-bold text-4xl fixed top-28 left-0 right-0 mx-auto z-10 text-shadow">
        Devices
      </h1>
      {arrs.map((item, index) => (
        <ImageCustom data={item} key={index} />
      ))}
      <motion.div className="progress" style={{ scaleX }} />
    </div>
  );
};

export default Devices;
