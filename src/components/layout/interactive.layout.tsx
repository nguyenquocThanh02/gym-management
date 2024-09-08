"use client";
import {
  CircleUserRound,
  MessageSquareMore,
  PanelRightClose,
  Paperclip,
  PhoneCall,
  Send,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import mainStore from "@/store/main.store";
import MessageBubble from "../custom/message.custom";
import { ScrollArea } from "../ui/scroll-area";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebases/firebase";
import { localStorageKey } from "@/constants/localStorage";

const Interactive: React.FC = () => {
  const openChat = mainStore((state) => state.chatOpen);
  const setOpenChat = mainStore((state) => state.setChatOpen);
  const roomId = localStorage.getItem(localStorageKey.roomId);

  useEffect(() => {
    if (!roomId) {
      console.warn("roomId is not defined");
      return;
    }

    const docRef = doc(db, "messages", roomId);

    const unSub = onSnapshot(
      docRef,
      (res) => {
        console.log(res.data()?.messages);
        // setChats({ [roomId]: res.data()?.messages });
        // setLoading(false);
      },
      (error) => {
        console.error("Error fetching messages:", error);
      }
    );

    return () => {
      unSub();
    };
  }, [roomId]);

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
          "z-20 fixed bottom-0 right-0 w-full h-3/4 md:w-1/3 bg-BgLight",
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
        <div className="px-4 overflow-hidden">
          <ScrollArea className="h-[calc(100%-100px)]">
            <div className="py-4">
              <MessageBubble
                align="left"
                message="Guts, I need a review of work. Are you ready?"
                timestamp="05:14 PM"
                image="https://firebasestorage.googleapis.com/v0/b/videocallapp-4fbc2.appspot.com/o/images%2Favata.avif?alt=media&token=2db259a3-0d10-416b-a8b4-e8854601746d"
                name="Shanay cruz"
              />
              <MessageBubble
                align="left"
                message="Let me know"
                timestamp="05:14 PM"
                image="https://firebasestorage.googleapis.com/v0/b/videocallapp-4fbc2.appspot.com/o/images%2Favata.avif?alt=media&token=2db259a3-0d10-416b-a8b4-e8854601746d"
                name="Shanay cruz"
              />
              <MessageBubble
                align="right"
                message="Yes, let’s see, send your work here"
                timestamp="05:14 PM"
                image="https://firebasestorage.googleapis.com/v0/b/videocallapp-4fbc2.appspot.com/o/images%2Favata.avif?alt=media&token=2db259a3-0d10-416b-a8b4-e8854601746d"
                name="You"
              />
              <MessageBubble
                align="right"
                message="Anyone on for lunch today"
                timestamp="05:14 PM"
                image="https://firebasestorage.googleapis.com/v0/b/videocallapp-4fbc2.appspot.com/o/images%2Favata.avif?alt=media&token=2db259a3-0d10-416b-a8b4-e8854601746d"
                name="You"
              />
            </div>
          </ScrollArea>
          <div className="w-full right-0 left-0 absolute bottom-1 pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between">
            <div className="flex items-center gap-2">
              <CircleUserRound size={22} color="blue" />
              <input className="grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <Paperclip size={20} color="#ccc" />
              <button className="items-center flex px-3 py-2 bg-indigo-600 rounded-full shadow">
                <Send size={12} color="white" />
                <h3 className="text-white text-xs font-semibold leading-4 px-2">
                  Send
                </h3>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interactive;
