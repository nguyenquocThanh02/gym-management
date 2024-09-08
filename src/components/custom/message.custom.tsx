import Image from "next/image";
import React from "react";

interface MessageBubbleProps {
  align: "left" | "right";
  message: string;
  timestamp: string;
  image?: string;
  name: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  align,
  message,
  timestamp,
  image,
  name,
}) => {
  const alignmentClass = align === "right" ? "justify-end" : "justify-start";
  const bgColor =
    align === "right"
      ? "bg-indigo-600 text-white"
      : "bg-gray-100 text-gray-900";
  const textColor = align === "right" ? "text-white" : "text-gray-900";

  return (
    <div className={`flex gap-2.5 ${alignmentClass} mb-4`}>
      {align === "left" && image && (
        <Image
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full"
          width={10}
          height={10}
        />
      )}
      <div className={`grid ${align === "right" ? "ml-auto" : ""}`}>
        <h5
          className={`text-gray-900 text-sm font-semibold leading-snug pb-1 ${
            align === "right" ? "text-right" : ""
          }`}
        >
          {name}
        </h5>
        <div className={`px-3 py-2 ${bgColor} rounded`}>
          <h2 className={`text-sm font-normal leading-snug ${textColor}`}>
            {message}
          </h2>
        </div>
        <div className={`justify-${align} items-center inline-flex mb-2.5`}>
          <h6 className={`text-gray-500 text-xs font-normal leading-4 py-1`}>
            {timestamp}
          </h6>
        </div>
      </div>
      {align === "right" && image && (
        <Image
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full"
          width={10}
          height={10}
        />
      )}
    </div>
  );
};

export default MessageBubble;
