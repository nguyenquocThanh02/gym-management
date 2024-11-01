// import Video from "next-video";
import Header from "@/components/layout/header.layout";
import Footer from "@/components/layout/footer.layout";
import Interactive from "@/components/layout/interactive.layout";

import GalleryDevice from "@/components/normal/galleryDevice.component";
import Video from "@/components/custom/video.custom";
import LinkArrow from "@/components/custom/linkArrow.custom";
import AboutGymMax from "@/components/normal/aboutGymMax.component";
import CarouselTrainer from "@/components/normal/carouselCardTrainer.component";
import HeroSection from "@/components/normal/heroSection.component";
import PopularPackages from "@/components/normal/popularPackage.component";
import ActiveDiscount from "@/components/normal/activeDiscount.component";
import NewArticals from "@/components/normal/newArtical.component";
export default function Home() {
  return (
    <section className="overflow-hidden bg-BgDark text-Light">
      <Header />
      <Interactive />
      <div className="relative">
        <Video />
        <div className="absolute bottom-0 right-0 top-0 left-0 bg-Dark opacity-20 transition-opacity duration-300"></div>
        <div
          data-aos="fade-up"
          className="hidden  lg:flex  absolute top-[100px] left-10 w-fit h-fit p-2 blur-shadow rounded"
        >
          <div className="">
            🌟 Khám Phá GymMax – Điểm Đến Cho Một Cơ Thể Khỏe Mạnh 🌟
            <ul className="text-left ml-3 leading-relaxed">
              <li>🗸 Thiết bị hiện đại và không gian tập luyện thoải mái</li>
              <li>
                🗸 Huấn luyện viên chuyên nghiệp sẵn sàng hướng dẫn và hỗ trợ bạn
              </li>
              <li>🗸 Các lớp học nhóm thú vị phù hợp với mọi cấp độ thể lực</li>
              <li>
                Ưu đãi đặc biệt: Đăng ký ngay hôm nay để nhận quà tặng độc
                quyền! 🎁
              </li>
            </ul>
          </div>
        </div>
        <ActiveDiscount />
        <div
          data-aos="fade-right"
          className="absolute w-full bottom-3 xl:bottom-[108px] left-8 text-shadow opacity-90 transition-opacity duration-300"
        >
          <h1 className="xl:text-[260px] text-4xl font-extrabold">
            Gym
            <span className="text-Primary ">Max</span>
          </h1>
          <p className="text-xl lg:text-4xl xl:mt-16 max-w-[80%] xl:hidden">
            Chào mừng bạn, hãy để chúng tôi giúp bạn trở thành phiên bản tốt
            nhất của chính mình.
          </p>
        </div>
      </div>
      <div className="l-container mt-16 mb-10">
        <h2 className="text-Primary text-shadow text-center text-3xl font-bold mb-5">
          Các gói hội viên phổ biến
        </h2>
        <p className="text-center italic text-lg bg-BgLight/30 p-3">
          Với nhiều gói dịch vụ được tùy chỉnh theo nhu cầu của bạn, bạn có thể
          chọn gói hàng tháng, hàng quý, hoặc để tiết kiệm chi phí, hãy chọn các
          gói dài hạn như gói hàng năm với nhiều tùy chọn bổ sung. Đừng lo lắng
          nếu bạn là người mới đến phòng tập; hãy chọn dịch vụ bao gồm hướng dẫn
          từ huấn luyện viên.
        </p>

        <PopularPackages />

        <LinkArrow href="/package">Xem thêm</LinkArrow>
      </div>
      <HeroSection>
        Bài tập tồi tệ duy nhất là bài tập không diễn ra. Hãy bắt đầu ngay bây
        giờ!
      </HeroSection>

      <AboutGymMax />

      <HeroSection>
        Thể hình không phải là việc trở nên tốt hơn người khác. Mà là việc trở
        nên tốt hơn chính bạn của ngày trước.
      </HeroSection>

      <div className="l-container my-8">
        <h2 className="text-Primary text-shadow text-center text-3xl font-bold mb-3">
          Huấn Luyện Viên Cá Nhân
        </h2>
        <p className="text-center italic text-lg bg-BgLight/30 p-3">
          Chúng tôi có một đội ngũ huấn luyện viên cá nhân chuyên nghiệp với
          nhiều năm kinh nghiệm, sẵn sàng hỗ trợ bạn với chuyên môn trong nhiều
          lĩnh vực như giảm cân, xây dựng cơ bắp, huấn luyện cạnh tranh, cardio,
          và nhiều hơn nữa. Họ được trang bị đầy đủ để đáp ứng mọi nhu cầu của
          bạn với sự tận tâm và chú ý, và sẽ luôn bên bạn trong suốt hành trình
          thể hình của bạn.
        </p>

        <CarouselTrainer />
        <LinkArrow href="/personal-trainer">Xem thêm</LinkArrow>
      </div>

      <HeroSection>
        Hãy tin vào chính mình và tất cả những gì bạn có. Hãy biết rằng bên
        trong bạn có điều gì đó vĩ đại hơn bất kỳ trở ngại nào.
      </HeroSection>

      <div className="my-16 l-container flex flex-col items-center gap-5">
        <h2 className="text-Primary text-shadow text-center text-3xl font-bold">
          Thiết Bị Của GymMax
        </h2>
        <p className="italic text-lg text-center bg-BgLight/30 px-3">
          Phòng tập của chúng tôi được trang bị các máy móc và thiết bị thể hình
          hiện đại nhất để hỗ trợ mọi nhu cầu tập luyện của bạn. Từ các máy
          cardio tiên tiến và thiết bị tập sức mạnh đến tạ tự do và công cụ tập
          luyện chức năng, chúng tôi cung cấp một loạt các tùy chọn toàn diện để
          giúp bạn đạt được mục tiêu thể hình của mình. Cơ sở hiện đại của chúng
          tôi đảm bảo bạn có quyền truy cập vào thiết bị chất lượng cao và công
          nghệ đổi mới để có một trải nghiệm tập luyện hiệu quả và thú vị.
        </p>

        <GalleryDevice />
        <LinkArrow href="/devices">Xem thêm</LinkArrow>
      </div>
      <div className="l-container my-10">
        <h2 className="text-Primary text-shadow text-center text-3xl font-bold mb-5">
          Bài Viết Mới
        </h2>
        <p className="text-center italic text-lg bg-BgLight/30 p-3">
          Chào mừng bạn đến với chuyên mục sức khỏe và thể hình của chúng tôi,
          nơi cung cấp những thông tin quý giá về bài tập tại gym và dinh dưỡng.
          Khám phá các thói quen tập luyện hiệu quả để nâng cao hiệu suất và
          những mẹo chuyên gia về việc duy trì một chế độ ăn cân bằng. Hãy đồng
          hành cùng chúng tôi trên hành trình đến với lối sống khỏe mạnh hơn!
        </p>

        <div className="my-6">
          <NewArticals />
        </div>

        <LinkArrow href="/artical">Xem thêm</LinkArrow>
      </div>

      <Footer />
    </section>
  );
}
