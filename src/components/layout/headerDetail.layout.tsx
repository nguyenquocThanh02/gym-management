import { typeNavInfor } from "@/types/navbar.type";
import { Dumbbell, FileQuestion, PersonStanding, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeaderDetail = () => {
  const navInfors: typeNavInfor[] = [
    {
      name: "About us",
      path: "/about-us",
      icon: <Users />,
      detail: "Find out more about our mission, values, and team here.",
    },
    {
      name: "Devices",
      path: "/devices",
      icon: <Dumbbell />,
      detail: "Explore the range of fitness devices and equipment we offer.",
    },
    {
      name: "Personal Trainers",
      path: "/personal-trainer",
      icon: <PersonStanding />,
      detail: "Meet our certified personal trainers and their specialties.",
    },
    {
      name: "Q&A",
      path: "/Q&A",
      icon: <FileQuestion />,
      detail: "Get answers to frequently asked questions about our services.",
    },
  ];

  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between">
        {navInfors?.map((item, index) => (
          <li className="" key={index}>
            <Link
              href={item.path}
              className="px-3 py-5 transition-all duration-500 hover:bg-BgLight/20 hover:rounded-xl flex items-center "
            >
              <div className="bg-BgLight/80 rounded-lg w-12 h-12 flex items-center justify-center">
                {item.icon}
              </div>
              <div className="ml-4 w-4/5">
                <h5 className="text-Light text-base mb-1.5 font-semibold">
                  {item.name}
                </h5>
                <p className="text-xs font-medium text-gray-400">
                  {item.detail}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default HeaderDetail;
