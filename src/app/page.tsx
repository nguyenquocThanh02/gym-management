// import Video from "next-video";
import Header from "@/components/layouts/header.component";
import Image from "next/image";
import logo from "@/assets/img/logo.png";
import Footer from "@/components/layouts/footer.component";
import Interactive from "@/components/layouts/interactive.component";

import GalleryDevice from "@/components/ui/galleryDevice.component";
import Video from "@/components/ui/videoCustom";
import LinkArrow from "@/components/ui/linkArrowCustom";
import AboutGymMax from "@/components/ui/aboutGymMax.component";
import CarouselTrainer from "@/components/ui/carouselCardTrainer";
import CardPackage from "@/components/ui/cardPackage";
import HeroSection from "@/components/ui/heroSection.component";
export default function Home() {
  return (
    <main className="overflow-hidden ">
      <Header />
      <Interactive />
      <div className="relative">
        <Video />
        <div className="absolute bottom-0 right-0 top-0 left-0 bg-Background opacity-20 transition-opacity duration-300"></div>
        <div className="absolute w-full bottom-3 xl:bottom-[108px] left-8 text-shadow text-Text opacity-90 transition-opacity duration-300">
          <h1 className="xl:text-[260px] text-4xl font-extrabold">
            Gym
            <span className="text-Primary ">Max</span>
          </h1>
          <p className="text-xl lg:text-4xl xl:mt-16 max-w-[80%] xl:hidden">
            Welcomes you and let us help you become the best version of yourself
          </p>
        </div>
      </div>
      <div className="l-container my-10">
        <h2 className="text-Primary text-shadow text-center text-3xl font-bold mb-5">
          Popular memberships
        </h2>
        <p className="text-center italic text-lg bg-white/30 p-3">
          With a variety of service packages tailored to your needs, you can
          choose monthly, quarterly, or to save costs, opt for longer-term
          packages such as yearly with many additional options. Do not worry if
          you are new to the gym; choose a service that includes guidance from a
          trainer.
        </p>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 py-10">
          <CardPackage />
          <CardPackage />
          <CardPackage />
        </div>
        <LinkArrow href="/personal-trainer">See more</LinkArrow>
      </div>
      <HeroSection>
        The only bad workout is the one that did not happen. Lets start right
        now
      </HeroSection>
      <AboutGymMax />

      <HeroSection>
        Fitness is not about being better than someone else. It is about being
        better than you used to be.
      </HeroSection>

      <div className="l-container my-8">
        <h2 className="text-Primary text-shadow text-center text-3xl font-bold mb-3">
          Personal Trainers
        </h2>
        <p className="text-center italic text-lg bg-white/30 p-3">
          We have a team of professional personal trainers with many years of
          experience, ready to support you with expertise in various areas such
          as weight loss, muscle building, competitive training, cardio, and
          more. They are equipped to meet any of your needs with dedication and
          attentiveness, and will be by your side throughout your fitness
          journey.
        </p>
        <CarouselTrainer />
        <LinkArrow href="/personal-trainer">See more</LinkArrow>
      </div>

      <HeroSection>
        Believe in yourself and all that you are. Know that there is something
        inside you that is greater than any obstacle.
      </HeroSection>

      <div className="my-16 l-container flex flex-col items-center gap-5">
        <h2 className="text-Primary text-shadow text-center text-3xl font-bold">
          Devices of GymMax
        </h2>
        <p className="italic text-lg text-center bg-white/30 px-3">
          Our gym is equipped with state-of-the-art fitness machines and
          equipment to support all your workout needs. From advanced cardio
          machines and strength training equipment to free weights and
          functional training tools, we provide a comprehensive range of options
          to help you achieve your fitness goals. Our modern facility ensures
          you have access to high-quality gear and innovative technology for a
          productive and enjoyable workout experience.
        </p>
        <GalleryDevice />
        <LinkArrow href="/personal-trainer">See more</LinkArrow>
      </div>
      <Footer />
    </main>
  );
}
