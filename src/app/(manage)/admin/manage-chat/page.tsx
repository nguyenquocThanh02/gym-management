"use client";

import MessageBubble from "@/components/custom/message.custom";
import InputChat from "@/components/normal/inputChat.component";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { db } from "@/firebases/firebase";
import { useDebounce } from "@/hooks/useDebounce.hook";
import { UserApis } from "@/services";
import mainStore from "@/store/main.store";
import { formatDate } from "@/utils";
import { AvatarImage } from "@radix-ui/react-avatar";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { Search } from "lucide-react";
import Image from "next/image";
import { userInfo } from "os";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function DeviceManagePage() {
  const { listRooms, addRoomIntoList, updateRoomInList, removeRoomFromList } =
    mainStore();

  const [infoUser, setInfoUser] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const { setChats, chats } = mainStore();
  const endRef = useRef<HTMLDivElement>(null);

  const debounceSearchValue = useDebounce(valueSearch, 800);
  const breadcrumbs = [
    {
      link: "/admin",
      name: "Home",
    },
    {
      link: "#",
      name: "Chat management",
    },
  ];

  const getUser = async (userId: string) => {
    try {
      const result = await UserApis.getDetailsUser(userId);
      if (result?.status === "200") {
        return result?.data;
      }
    } catch (error) {
      toast.error(error?.message);
    }
    return;
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, roomId]);

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "rooms"), async (snapshot) => {
      for (const { type, doc } of snapshot.docChanges()) {
        const roomId = doc.id;
        const userId = doc.data().user;

        try {
          const theUser = await getUser(userId);

          const roomData = {
            roomId,
            ...doc.data(),
            ...theUser,
          };

          if (type === "added") {
            console.log(`Room added: ${roomId}`);
            addRoomIntoList(roomData);
          } else if (type === "modified") {
            console.log(`Room modified: ${roomId}`);
            updateRoomInList(roomData);
          } else if (type === "removed") {
            console.log(`Room removed: ${roomId}`);
            removeRoomFromList(roomId);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error(error?.message);
        }
      }
    });

    return () => unSub(); // Clean up the subscription on unmount
  }, []);

  const handleClickRoom = (item: any) => {
    console.log("d:", item?.email);
    setInfoUser(item);
    setRoomId(item?.roomId);
  };

  useEffect(() => {
    if (!roomId) {
      console.warn("roomId is not defined");
      return;
    }

    const unSub = onSnapshot(doc(db, "messages", roomId), (res) => {
      console.log(res?.data().messages);
      setChats({ [roomId]: res.data()?.messages });
      console.log("cagat:  ", chats[roomId]);
    });
    return () => {
      unSub();
    };
  }, [roomId]);

  return (
    <div className="h-[600px] border flex justify-between flex-col md:flex-row">
      <div className="w-full md:w-1/4 border">
        <form>
          <div className="relative ml-auto flex-1 md:grow-0 p-4">
            <Search className="absolute left-[26px] top-[26px] h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg pl-8"
              value={valueSearch}
              onChange={(e) => setValueSearch(e?.target?.value)}
            />
          </div>
        </form>
        <div className="px-4">
          <h4 className="font-light">List all user</h4>
          <ScrollArea className="h-[468px]">
            <ul>
              {listRooms &&
                listRooms
                  .slice()
                  .filter((room) =>
                    room.accountName
                      .toLowerCase()
                      .includes(debounceSearchValue.toLowerCase())
                  )
                  .sort((a, b) => b.timeLastMessage - a.timeLastMessage)
                  .map((item, index) => (
                    <li
                      className="flex gap-5 items-center hover:bg-slate-200 p-1 rounded-lg transition-all duration-500 hover:text-indigo-600"
                      key={index}
                      onClick={() => handleClickRoom(item)}
                    >
                      <Image
                        className="rounded-full border border-slate-300 "
                        src={item?.avatar || ""}
                        width={48}
                        height={48}
                        alt="Avatar"
                      />
                      <div>
                        <h5>{item?.accountName}</h5>
                        <p className="font-light text-sm">{item?.fullName}</p>
                      </div>
                    </li>
                  ))}
            </ul>
          </ScrollArea>
        </div>
      </div>
      <div className="w-full md:w-1/2 border">
        <div className="p-4 relative overflow-hidden">
          <ScrollArea className="h-[530px]">
            <div className="py-4">
              {roomId &&
                chats[roomId] &&
                chats[roomId]?.map((item: any, index: number) => (
                  <MessageBubble
                    key={index}
                    align={item?.senderByUser === true ? "left" : "right"}
                    message={item?.text}
                    timestamp={new Date(
                      item?.createdAt?.toMillis()
                    ).toLocaleString()}
                    image={
                      item?.senderByUser === true
                        ? infoUser?.avatar
                        : "https://firebasestorage.googleapis.com/v0/b/videocallapp-4fbc2.appspot.com/o/images%2Flogo.png?alt=media&token=641d8dec-f390-4810-91e1-ef833ce3d99d"
                    }
                    name={
                      item?.senderByUser === true
                        ? infoUser?.accountName
                        : "GymMax"
                    }
                  />
                ))}
            </div>

            <div ref={endRef}></div>
          </ScrollArea>
          <InputChat from="admin" roomId={roomId} />
        </div>
      </div>
      <div className="w-full md:w-1/4 border">
        {infoUser && (
          <div className="flex justify-center items-center flex-col mt-5">
            <Image
              className="rounded-full border border-slate-300"
              src={infoUser?.avatar || ""}
              width={160}
              height={160}
              alt="Avata"
            />
            <div className="font-medium text-center">
              <h5 className="text-xl font-semibold text-gray-900">
                {infoUser?.accountName}
              </h5>
              <span className="text-md text-gray-500">
                {infoUser?.fullName}
              </span>
            </div>
            <div className="mt-3">
              <h4 className="font-bold">Details</h4>
              <p>Phone: {infoUser?.phone}</p>
              <p>Email: {infoUser?.email}</p>
              <p>Date of birth: {formatDate(infoUser?.dateOfBirth)}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
