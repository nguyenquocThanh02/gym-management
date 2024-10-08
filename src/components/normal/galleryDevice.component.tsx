import Image from "next/image";
import React from "react";
import device4 from "@/assets/img/device4.jpg";
import device6 from "@/assets/img/device6.jpg";
import device8 from "@/assets/img/device8.jpg";
import device10 from "@/assets/img/device10.jpg";
import device12 from "@/assets/img/device12.jpg";

const images = {
  device4,
  device6,
  device8,
  device10,
  device12,
};

const GalleryDevice = () => {
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
    <div className="gallery my-16">
      {imageKeys.map((key, index) => (
        <span style={{ "--i": index + 1 }} key={index}>
          <Image src={images[key]} alt="" layout="fill" />
        </span>
      ))}
    </div>
  );
};

export default GalleryDevice;
