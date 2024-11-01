import React from "react";
import Image from "next/image";

import gymView1 from "@/assets/img/gymView1.jpg";
import gymView2 from "@/assets/img/gymView2.jpg";

import LinkArrow from "@/components/custom/linkArrow.custom";
const AboutGymMax = () => {
  return (
    <div>
      <div className="mt-8 l-container">
        <h2 className="text-Primary text-center text-3xl font-bold mb-4">
          Tổng quan về GymMax
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 my-10 bg-BgLight/30 items-center px-8">
          <div
            data-aos="fade-right"
            className="flex lg:items-end flex-col justify-center"
          >
            <Image
              src={gymView2}
              alt="view gym"
              className="w-[100vw] border lg:translate-y-16"
            />
            <Image
              src={gymView1}
              alt="view gym"
              className="w-full lg:w-[200px] border lg:-translate-y-16 lg:translate-x-6"
            />
          </div>
          <div data-aos="fade-left" className="col-span-2">
            <h3 className="text-bold text-2xl mb-5">Giới thiệu về GymMax</h3>
            <p className="text-justify italic leading-relaxed">
              GymMax được thành lập vào đầu năm 2024, với hai chi nhánh nằm ở
              Cần Thơ và Sóc Trăng. Các phòng tập của chúng tôi có cơ sở vật
              chất rộng rãi và thiết kế hiện đại, nhằm cung cấp sức khỏe tốt
              nhất và một vóc dáng thu hút cho mọi người. Tại GymMax, chúng tôi
              mang đến trải nghiệm tập luyện vượt trội với trang thiết bị hiện
              đại, dịch vụ khách hàng hỗ trợ và đào tạo cá nhân từ các huấn
              luyện viên chuyên nghiệp. Hãy đến thăm chúng tôi tại 123 Đường
              3/2, Ninh Kiều, Cần Thơ, để trải nghiệm những điều tốt nhất về thể
              hình cùng chúng tôi.
            </p>
            <div className="bg-Footer p-4 w-full mt-5 text-lg italic">
              GymMax luôn là sự lựa chọn đáng tin cậy cho sức khỏe và mục tiêu
              thể hình của bạn.
            </div>

            <LinkArrow href="/about-us" className="mt-3">
              Xem thêm
            </LinkArrow>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutGymMax;
