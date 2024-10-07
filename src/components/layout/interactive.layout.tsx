"use client";
import {
  CircleUserRound,
  MessageSquareMore,
  PanelRightClose,
  Paperclip,
  PhoneCall,
  Send,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import mainStore from "@/store/main.store";
import MessageBubble from "../custom/message.custom";
import { ScrollArea } from "../ui/scroll-area";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebases/firebase";
import { localStorageKey } from "@/constants/localStorage";
import InputChat from "../normal/inputChat.component";
import { toast } from "sonner";
import { Tooltip, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { TooltipContent } from "@radix-ui/react-tooltip";
import { Badge } from "../ui/badge";

const Interactive: React.FC = () => {
  const openChat = mainStore((state) => state.chatOpen);
  const setOpenChat = mainStore((state) => state.setChatOpen);
  const roomId = localStorage.getItem(localStorageKey.roomId) || "";
  const endRef = useRef<HTMLDivElement>(null);

  const { chats } = mainStore();
  const setChats = mainStore((state) => state.setChats);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, openChat]);
  useEffect(() => {
    if (!roomId) {
      console.warn("roomId is not defined");
      return;
    }

    const unSub = onSnapshot(doc(db, "messages", roomId), (res) => {
      setChats({ [roomId]: res.data()?.messages });
    });
    return () => {
      unSub();
    };
  }, [roomId]);

  const handleToggleChat = () => {
    if (!roomId) {
      toast.warning("You need login before chatting!");
    } else setOpenChat();
  };

  return (
    <>
      <div className="fixed top-[50%] right-3 lg:right-[68px] z-10 border border-Primary rounded-full p-0.5 bg-transparent">
        <ul className="w-full h-full p-0.5 rounded-full">
          <li className="flex justify-center animate-tada items-center rounded-full border border-Primary w-14 h-14">
            <Button
              variant="ghost"
              className="hover:bg-transparent"
              onClick={handleToggleChat}
            >
              <MessageSquareMore size={32} color="red" />
            </Button>
          </li>
          <li className="flex justify-center animate-tada items-center rounded-full border border-Primary w-14 h-14 mt-3">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger>
                  <PhoneCall size={32} color="red" />
                </TooltipTrigger>
                <TooltipContent side="left" className="mr-4">
                  <Badge variant={"secondary"} className="text-xl">
                    0779228856
                  </Badge>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </li>
        </ul>
      </div>

      <div
        className={cn(
          "z-20 fixed bottom-0 right-0 w-full h-3/4 md:w-1/3 bg-BgLight",
          {
            "transition-all duration-500": openChat,
            "transition-all duration-500 hidden": !openChat,
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
        <div className="px-4 overflow-hidden">
          <ScrollArea className="h-[420px]">
            <div className="py-4">
              {roomId &&
                chats[roomId] &&
                chats[roomId]?.map((item: any, index: number) => (
                  <MessageBubble
                    key={index}
                    align={item?.senderByUser === true ? "right" : "left"}
                    message={item?.text}
                    timestamp={new Date(
                      item?.createdAt?.toMillis()
                    ).toLocaleString()}
                    image={
                      item?.senderByUser === true
                        ? ""
                        : "https://firebasestorage.googleapis.com/v0/b/videocallapp-4fbc2.appspot.com/o/images%2Flogo.png?alt=media&token=641d8dec-f390-4810-91e1-ef833ce3d99d"
                    }
                    name={item?.senderByUser === true ? "You" : "GymMax"}
                  />
                ))}
            </div>

            <div ref={endRef}></div>
          </ScrollArea>
          <InputChat from="user" roomId={roomId} />
        </div>
      </div>
    </>
  );
};

export default Interactive;
