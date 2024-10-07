"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Link from "next/link";
import logo from "@/assets/img/logo.png";
import Image from "next/image";
import {
  AlignJustify,
  ChevronDown,
  LogOut,
  Package,
  ScrollText,
  UserPen,
} from "lucide-react";
import HeaderDetail from "./headerDetail.layout";
import { typeFunctionNav, typeNavBar } from "@/types/navbar.type";
import ButtonCustom from "../custom/button.custom";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { localStorageKey } from "@/constants/localStorage";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { UserApis } from "@/services";
import { typeAccount } from "@/types";

const Header = () => {
  const headerRef: RefObject<HTMLDivElement> = useRef(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const idUser = localStorage.getItem(localStorageKey?.userId) || "";

  const { data: userData } = useQuery({
    queryKey: ["user"],
    queryFn: () => UserApis?.getDetailsUser(idUser),
  });
  const theUser: typeAccount = userData?.data || null;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        headerRef?.current?.classList.add(
          "xl:scroll-custom",
          "xl:animate-fadeindown"
        );
      } else {
        headerRef?.current?.classList.remove(
          "xl:animate-fadeindown",
          "xl:scroll-custom"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbars: typeNavBar[] = [
    {
      name: "Packages",
      path: "/package",
      dropdown: null,
    },
    {
      name: "Information",
      path: "#",
      dropdown: <HeaderDetail />,
    },
    {
      name: "Artical",
      path: "/artical",
      dropdown: null,
    },
    {
      name: "Contact",
      path: "/contact",
      dropdown: null,
    },
  ];

  const functionNavs: typeFunctionNav[] = [
    {
      name: "My register tracking",
      path: "/register-tracking",
      icon: <Package size={18} />,
    },
    {
      name: "My artical",
      path: "/artical/of-user",
      icon: <ScrollText size={18} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <UserPen size={18} />,
    },
  ];

  const paramPath = usePathname();

  const handleLogout = () => {
    localStorage.removeItem(localStorageKey?.accessToken);
    localStorage.removeItem(localStorageKey?.refreshToken);
    localStorage.removeItem(localStorageKey?.userId);
    localStorage.removeItem(localStorageKey?.roomId);
    window.location.reload();
  };

  return (
    <>
      <nav ref={headerRef} className="fixed top-0 w-full py-2 z-20 bg-BgDark">
        <div className="container">
          <div className="w-full flex  flex-col lg:flex-row lg:justify-center">
            <div className=" flex justify-between  lg:flex-row">
              <Link href="/" className="flex items-center">
                <Image
                  src={logo}
                  width={70}
                  height={70}
                  alt="Logo"
                  quality={100}
                />
              </Link>
              <button
                type="button"
                className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 "
                onClick={() => setMenuOpen((e) => !e)}
              >
                <AlignJustify />
              </button>
            </div>
            <div className={`${!menuOpen && "hidden"} w-full lg:flex `}>
              <div className="flex flex-col text-lg justify-center items-center m-4 gap-2 lg:flex-row">
                {navbars.map((item, index) =>
                  item.dropdown ? (
                    <HoverCard key={index} openDelay={0}>
                      <HoverCardTrigger asChild>
                        <Button
                          variant="ghost"
                          className={`flex justify-center items-center gap-1 ${
                            [
                              "/Q&A",
                              "/about-us",
                              "/devices",
                              "/personal-trainer",
                            ].includes(paramPath)
                              ? "text-Primary"
                              : ""
                          }`}
                        >
                          <span>{item.name}</span>
                          <ChevronDown className="mt-1" size={17} />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-full ml-[7%] mt-4 bg-BgDark/95">
                        {item.dropdown}
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <Link href={item.path} key={index}>
                      <Button
                        variant="ghost"
                        className={`${
                          paramPath === item.path ? "text-Primary" : ""
                        }`}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  )
                )}
              </div>
              {theUser ? (
                <div className="ml-auto flex items-center">
                  <HoverCard openDelay={0}>
                    <HoverCardTrigger asChild>
                      <Button
                        variant={"ghost"}
                        className="flex gap-2 hover:bg-inherit hover:text-Light hover:opacity-85"
                      >
                        <Avatar className="shadow-md">
                          <AvatarImage src={theUser?.avatar} />
                          <AvatarFallback className="text-Dark/80">
                            Avatar
                          </AvatarFallback>
                        </Avatar>
                        <h4 className="text-shadow">{theUser?.accountName}</h4>
                      </Button>
                    </HoverCardTrigger>
                    <HoverCardContent className="mt-4 bg-BgDark/95">
                      <ul className="text-Light flex flex-col gap-2">
                        {functionNavs?.map((item, index) => (
                          <Link href={item?.path} key={index}>
                            <li className="flex items-center gap-2 hover:opacity-80">
                              {item?.icon}
                              {item?.name}
                            </li>
                          </Link>
                        ))}
                        <hr />
                        <li className="flex items-center gap-2 hover:opacity-80">
                          <LogOut size={18} />
                          <button onClick={handleLogout}>Log out</button>
                        </li>
                      </ul>
                    </HoverCardContent>
                  </HoverCard>
                </div>
              ) : (
                <div className="flex flex-col lg:gap-2 lg:flex-row gap-y-4 lg:items-center ml-auto justify-center">
                  <ButtonCustom className="" variant="custom">
                    <Link href={"/login"}>Login</Link>
                  </ButtonCustom>
                  <ButtonCustom className="" variant="custom">
                    <Link href={"/register"}>Register</Link>
                  </ButtonCustom>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
