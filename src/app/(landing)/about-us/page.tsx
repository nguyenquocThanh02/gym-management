import AboutGymMax from "@/components/normal/aboutGymMax.component";
import { typeFeature } from "@/types/aboutGymMax.type";
import gymView1 from "@/assets/img/gymView1.jpg";
import gymView2 from "@/assets/img/gymView2.jpg";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
const AboutUs = () => {
  const features: typeFeature[] = [
    {
      name: "Modern Equipment",
      detail:
        "State-of-the-art machines and tools designed for all fitness levels to ensure effective workouts.",
      icon: "🏋️‍♂️",
      color: "bg-blue-700/50",
    },
    {
      name: "Personal Training",
      detail:
        "Customized training programs created by certified trainers to help you achieve your personal fitness goals.",
      icon: "👟",
      color: "bg-green-700/50",
    },
    {
      name: "Spacious Facilities",
      detail:
        "Ample space in our gyms allows for comfortable workouts and a variety of exercise options.",
      icon: "🛋️",
      color: "bg-yellow-700/50",
    },
    {
      name: "Supportive Community",
      detail:
        "A friendly and motivating environment where you can connect with fellow fitness enthusiasts and receive encouragement.",
      icon: "🤝",
      color: "bg-orange-700/50",
    },
    {
      name: "Group Classes",
      detail:
        "Diverse range of group fitness classes, including yoga, pilates, and high-intensity interval training (HIIT).",
      icon: "📅",
      color: "bg-red-700/50",
    },
    {
      name: "Clean and Safe Environment",
      detail:
        "Regularly sanitized facilities and adherence to health protocols to ensure a safe and hygienic workout space.",
      icon: "🧼",
      color: "bg-purple-700/50",
    },
  ];

  const breadcrumbs = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/about-us",
      name: "About us",
    },
  ];

  return (
    <div className="l-container bg-BgLight/30 rounded-ss-full">
      <BreadcrumbCustom links={breadcrumbs} />
      <div className=" flex flex-col justify-center items-center gap-5 ">
        <h1 className="text-center font-bold text-2xl md:text-4xl">About us</h1>
        <p data-aos="fade-up" className="text-justify italic leading-loose">
          <strong className="font-bold text-2xl md:text-8xl">
            Gym<span className="text-Primary">Max</span>
          </strong>
          <span>
            was established in early 2024, marking our entry into the fitness
            world with a commitment to excellence. We proudly operate two
            branches, strategically located in the vibrant cities of Can Tho and
            Soc Trang, each designed to offer a premium workout experience. Our
            gyms are characterized by their spacious and meticulously designed
            facilities, which blend modern aesthetics with functionality,
            creating an environment that motivates and inspires. At GymMax, we
            are dedicated to fostering not only physical health but also overall
            well-being. Our state-of-the-art equipment ensures that every
            workout is efficient and effective, whether you are aiming to build
            strength, improve endurance, or enhance your overall fitness. Our
            commitment extends beyond just providing equipment; we offer
            exceptional customer service that includes personalized support and
            guidance from our team of professional trainers. Our professional
            coaches are not only highly qualified but also passionate about
            helping you achieve your fitness goals. They work closely with each
            member to create tailored training programs that address individual
            needs and preferences, ensuring that every session is productive and
            enjoyable. We believe that fitness should be an accessible and
            enjoyable journey, which is why we prioritize creating a welcoming
            atmosphere where everyone feels supported. Our modern facilities are
            equipped with the latest technology to track progress and enhance
            the workout experience, making it easier for you to see results and
            stay motivated. Visit us at 123 3/2 Street, Ninh Kieu, Can Tho, and
            immerse yourself in a fitness environment that combines top-tier
            equipment, expert coaching, and a supportive community. At GymMax,
            we are more than just a gym—we are your partner in achieving a
            healthier, stronger, and more confident you. Join us today and
            experience the best of fitness with a team that is dedicated to your
            success.
          </span>
        </p>
        <div>
          <h2 className="text-center font-bold text-2xl md:text-3xl my-5">
            Why choose GymMax?
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between">
            {features?.map((item, index) => (
              <li data-aos="fade-up" key={index} className="list-none">
                <div className="px-3 py-5 transition-all duration-700 5over:bg-BgLight/20 hover:rounded-xl flex items-center">
                  <div
                    className={`rounded-lg text-3xl w-16 h-16 flex items-center justify-center ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <div className="ml-4 w-4/5">
                    <h5 className="text-Light text-base mb-1.5 font-semibold">
                      {item.name}
                    </h5>
                    <p className="text-sm font-medium text-gray-400">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="my-5 flex flex-col w-full justify-center items-center">
          <Image src={gymView2} alt="view gym" className="w-[100vw] border" />
          <Image src={gymView1} alt="view gym" className="w-full border" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
