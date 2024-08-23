"use client";
import {
  CircleX,
  Ghost,
  MessageSquareMore,
  PanelRightClose,
  PhoneCall,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import mainStore from "@/store/main.store";

const Interactive: React.FC = () => {
  const openChat = mainStore((state) => state.chatOpen);
  const setOpenChat = mainStore((state) => state.setChatOpen);
  console.log("tesst", openChat);

  return (
    <>
      <div className="fixed top-[50%] right-3 lg:right-[68px] z-10 border border-Primary rounded-full p-0.5 bg-transparent">
        <ul className="w-full h-full p-0.5 rounded-full">
          <li className="flex justify-center animate-tada items-center rounded-full border border-Primary w-14 h-14">
            <Button
              variant="ghost"
              className="hover:bg-transparent"
              onClick={setOpenChat}
            >
              <MessageSquareMore size={32} color="red" />
            </Button>
          </li>
          <li className="flex justify-center animate-tada items-center rounded-full border border-Primary w-14 h-14 mt-3">
            <PhoneCall size={32} color="red" />
          </li>
        </ul>
      </div>

      <div
        className={cn(
          "z-20 fixed bottom-0 right-0 w-full h-1/2 md:w-1/3 bg-BgLight",
          {
            "animate-accordion-up": openChat,
            "animate-accordion-down hidden": !openChat,
          }
        )}
      >
        <div className="w-full bg-Dark/20">
          <Button
            variant="ghost"
            className="hover:bg-transparent"
            onClick={setOpenChat}
          >
            <PanelRightClose color="black" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default Interactive;
