import { typeNavInfor } from "@/types/navbar.type";
import { Dumbbell, FileQuestion, PersonStanding, Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const HeaderDetail = () => {
  const navInfors: typeNavInfor[] = [
    {
      name: "Giới thiệu về chúng tôi",
      path: "/about-us",
      icon: <Users />,
      detail:
        "Tìm hiểu thêm về sứ mệnh, giá trị và đội ngũ của chúng tôi tại đây.",
    },
    {
      name: "Thiết bị",
      path: "/devices",
      icon: <Dumbbell />,
      detail: "Khám phá dải thiết bị và dụng cụ thể dục mà chúng tôi cung cấp.",
    },
    {
      name: "Huấn luyện viên cá nhân",
      path: "/personal-trainer",
      icon: <PersonStanding />,
      detail:
        "Gặp gỡ các huấn luyện viên cá nhân chứng nhận của chúng tôi và các chuyên môn của họ.",
    },
    {
      name: "Câu hỏi & Đáp",
      path: "/Q&A",
      icon: <FileQuestion />,
      detail:
        "Nhận câu trả lời cho các câu hỏi thường gặp về dịch vụ của chúng tôi.",
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
