"use client";
import React, { RefObject, useEffect, useRef, useState } from "react";
import Link from "next/link";
import logo from "@/assets/img/logo.png";
import Image from "next/image";
import { AlignJustify, ChevronDown } from "lucide-react";
import HeaderDetail from "./headerDetail.component";
import { typeNavBar } from "@/types/navbar.type";
import ButtonCustom from "../ui/buttonCustom";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Button } from "../ui/button";

const Header = () => {
  const headerRef: RefObject<HTMLDivElement> = useRef(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

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

  return (
    <>
      <nav
        ref={headerRef}
        className="fixed top-0 w-full py-2 z-20 bg-Background"
      >
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
                          className="flex justify-center items-center gap-1"
                        >
                          <span>{item.name}</span>
                          <ChevronDown className="mt-1" size={17} />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-full ml-[7%] mt-4 bg-Background">
                        {item.dropdown}
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <Link href={item.path} key={index}>
                      <Button variant="ghost">{item.name}</Button>
                    </Link>
                  )
                )}
              </div>

              <div className="flex flex-col lg:gap-2 lg:flex-row gap-y-4 lg:items-center ml-auto justify-center">
                <ButtonCustom className="" variant="custom">
                  <Link href={"/login"}>Login</Link>
                </ButtonCustom>
                <ButtonCustom className="" variant="custom">
                  <Link href={"/register"}>Register</Link>
                </ButtonCustom>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
