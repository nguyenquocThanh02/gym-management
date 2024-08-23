import React from "react";
import Image from "next/image";

import gymView1 from "@/assets/img/gymView1.jpg";
import gymView2 from "@/assets/img/gymView2.jpg";

import LinkArrow from "@/components/custom/linkArrow.custom";
const AboutGymMax = () => {
  return (
    <div>
      <div className="mt-8 l-container">
        <h2 className="text-Primary text-center text-3xl font-bold mb-4">
          Summary GymMax
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 my-10 bg-BgLight/30 items-center px-8">
          <div className="flex lg:items-end flex-col justify-center">
            <Image
              src={gymView2}
              alt="view gym"
              className="w-[100vw] border lg:translate-y-16"
            />
            <Image
              src={gymView1}
              alt="view gym"
              className="w-full lg:w-[200px] border lg:-translate-y-16 lg:translate-x-6"
            />
          </div>
          <div className="col-span-2">
            <h3 className="text-bold text-2xl mb-5">About GymMax</h3>
            <p className="text-justify italic leading-relaxed">
              GymMax was established in early 2024, with two branches located in
              Can Tho and Soc Trang. Our gyms feature spacious facilities and
              modern design, aiming to provide excellent health and an
              attractive physique for everyone. At GymMax, we offer an
              exceptional workout experience with state-of-the-art equipment,
              supportive customer services, and personalized training from
              professional coaches. Visit us at 123 3/2 Street, Ninh Kieu, Can
              Tho, to experience the best of fitness with us.
            </p>
            <div className="bg-Footer p-4 w-full mt-5 text-lg italic">
              GymMax is always a trusted choice for your health and fitness
              goals.
            </div>
            <LinkArrow href="/about-us" className="mt-3">
              See more
            </LinkArrow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGymMax;
