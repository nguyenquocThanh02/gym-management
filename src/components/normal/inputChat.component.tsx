import { localStorageKey } from "@/constants/localStorage";
import { db } from "@/firebases/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { CircleUserRound, Paperclip, Send } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const InputChat: React.FC<{ from: string; roomId: string }> = ({
  from,
  roomId,
}) => {
  const [text, setText] = useState("");

  const handleSend = async (e: any) => {
    e.preventDefault();

    if (text === "") return;
    try {
      await updateDoc(doc(db, "messages", roomId), {
        messages: arrayUnion({
          senderByUser: from === "user" ? true : false,
          text,
          createdAt: new Date(),
        }),
      });
      setText("");

      await updateDoc(doc(db, "rooms", roomId), {
        lastMessage: text,
        timeLastMessage: new Date(),
        isSeen: false,
      });
    } catch (error) {
      toast.warning("You can chat right now!!");
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSend(e)}>
        <div className="w-full  pl-3 pr-1 py-1 rounded-3xl border border-gray-200 items-center gap-2 inline-flex justify-between">
          <div className="w-full flex items-center gap-2">
            <CircleUserRound size={22} color="blue" />
            <input
              className="grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none"
              type="text"
              placeholder="Enter text ..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Paperclip size={20} color="#ccc" />
            <button
              type="submit"
              className="items-center flex px-3 py-2 bg-indigo-600 rounded-full shadow"
            >
              <Send size={12} color="white" />
              <h3 className="text-white text-xs font-semibold leading-4 px-2">
                Send
              </h3>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputChat;
