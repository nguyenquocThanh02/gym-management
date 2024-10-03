import React from "react";
import Image from "next/image"; // Giả sử bạn đang sử dụng Next.js
import { Card, CardContent } from "../ui/card";
import { typeArtical } from "@/types";
import { formatDate } from "@/utils";
import Link from "next/link";
import { Calendar, UserRoundPen } from "lucide-react";

const CardArtical: React.FC<{ theArtical: typeArtical }> = ({ theArtical }) => {
  return (
    <div>
      <Link href={`/artical/details/${theArtical?._id}`}>
        <Card className="border-none shadow-cardArtical hover:shadow-md hover:shadow-Light transition-all duration-300">
          <CardContent className="h-[260px] w-full relative mx-auto overflow-hidden rounded-lg flex aspect-square items-center justify-center p-0 group">
            <Image
              src={theArtical?.coverImage}
              alt={theArtical?.title}
              fill
              className="w-full h-full object-cover relative z-0 rounded-lg transition-all duration-300"
            />

            <div className="absolute flex flex-col items-center justify-around text-Light text-shadow bottom-0 right-0 top-0 left-0 bg-Primary/10  transition-opacity duration-300 hover:opacity-90">
              <div className="text-2xl">
                <h3 className=" text-center font-semibold px-3">
                  {theArtical?.title}
                </h3>
              </div>
              <div className="bg-Dark/30 px-1 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-lg text-center px-3">
                  {theArtical?.description}
                </p>
              </div>
              <div className="text-base flex flex-col items-center">
                <h4 className="flex gap-2 items-center">
                  <UserRoundPen size={18} /> {theArtical?.author?.name}
                </h4>
                <span className="flex gap-2 items-center">
                  <Calendar size={18} />
                  {formatDate(theArtical?.updatedAt)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
};

export default CardArtical;
