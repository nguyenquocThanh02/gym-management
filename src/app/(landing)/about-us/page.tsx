import AboutGymMax from "@/components/normal/aboutGymMax.component";
import { typeFeature } from "@/types/aboutGymMax.type";
import gymView1 from "@/assets/img/gymView1.jpg";
import gymView2 from "@/assets/img/gymView2.jpg";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
const AboutUs = () => {
  const features: typeFeature[] = [
    {
      name: "Thiết bị Hiện đại",
      detail:
        "Máy móc và công cụ tiên tiến dành cho mọi cấp độ thể lực, đảm bảo hiệu quả trong các buổi tập.",
      icon: "🏋️‍♂️",
      color: "bg-blue-700/50",
    },
    {
      name: "Đào tạo Cá nhân",
      detail:
        "Chương trình tập luyện được cá nhân hóa do các huấn luyện viên chứng nhận thiết kế, giúp bạn đạt được mục tiêu thể dục của mình.",
      icon: "👟",
      color: "bg-green-700/50",
    },
    {
      name: "Cơ sở Vật chất Rộng rãi",
      detail:
        "Không gian rộng rãi trong các phòng tập cho phép bạn thoải mái tập luyện và lựa chọn nhiều hình thức bài tập.",
      icon: "🛋️",
      color: "bg-yellow-700/50",
    },
    {
      name: "Cộng đồng Hỗ trợ",
      detail:
        "Một môi trường thân thiện và truyền cảm hứng, nơi bạn có thể kết nối với những người yêu thích thể thao và nhận sự động viên.",
      icon: "🤝",
      color: "bg-orange-700/50",
    },
    {
      name: "Lớp Học Nhóm",
      detail:
        "Nhiều loại lớp học thể dục nhóm đa dạng, bao gồm yoga, pilates và tập luyện cường độ cao (HIIT).",
      icon: "📅",
      color: "bg-red-700/50",
    },
    {
      name: "Môi trường Sạch sẽ và An toàn",
      detail:
        "Cơ sở thường xuyên được khử trùng và tuân thủ các quy định về sức khỏe để đảm bảo không gian tập luyện an toàn và vệ sinh.",
      icon: "🧼",
      color: "bg-purple-700/50",
    },
  ];

  const breadcrumbs = [
    {
      link: "/",
      name: "Trang chủ",
    },
    {
      link: "/about-us",
      name: "Giới thiệu",
    },
  ];

  return (
    <div className="l-container bg-BgLight/30 rounded-ss-full">
      <BreadcrumbCustom links={breadcrumbs} />
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-center font-bold text-2xl md:text-4xl">
          Giới thiệu về chúng tôi
        </h1>
        <p data-aos="fade-up" className="text-justify italic leading-loose">
          <strong className="font-bold text-2xl md:text-8xl">
            Gym<span className="text-Primary">Max</span>
          </strong>
          <span>
            được thành lập vào đầu năm 2024, đánh dấu sự ra mắt của chúng tôi
            trong thế giới thể hình với cam kết về sự xuất sắc. Chúng tôi tự hào
            vận hành hai chi nhánh, tọa lạc tại hai thành phố sôi động Cần Thơ
            và Sóc Trăng, mỗi nơi đều được thiết kế để mang đến trải nghiệm tập
            luyện cao cấp. Các phòng gym của chúng tôi nổi bật với không gian
            rộng rãi và thiết kế tỉ mỉ, kết hợp giữa tính thẩm mỹ hiện đại và
            chức năng, tạo ra môi trường khuyến khích và truyền cảm hứng. Tại
            GymMax, chúng tôi không chỉ tập trung vào sức khỏe thể chất mà còn
            cả sự an lành tổng thể. Trang thiết bị hiện đại của chúng tôi đảm
            bảo mỗi buổi tập đều hiệu quả và năng suất, dù bạn đang muốn xây
            dựng sức mạnh, cải thiện sức bền hay nâng cao thể chất tổng thể. Cam
            kết của chúng tôi không chỉ dừng lại ở việc cung cấp trang thiết bị;
            chúng tôi còn mang đến dịch vụ khách hàng xuất sắc bao gồm hỗ trợ cá
            nhân và hướng dẫn từ đội ngũ huấn luyện viên chuyên nghiệp. Các huấn
            luyện viên của chúng tôi không chỉ có trình độ cao mà còn đam mê
            giúp bạn đạt được mục tiêu thể dục. Họ làm việc chặt chẽ với từng
            thành viên để tạo ra các chương trình tập luyện phù hợp với nhu cầu
            và sở thích cá nhân, đảm bảo mỗi buổi tập đều hiệu quả và thú vị.
            Chúng tôi tin rằng thể dục nên là một hành trình dễ tiếp cận và thú
            vị, đó là lý do tại sao chúng tôi ưu tiên tạo ra một bầu không khí
            chào đón, nơi mọi người đều cảm thấy được hỗ trợ. Các cơ sở hiện đại
            của chúng tôi được trang bị công nghệ mới nhất để theo dõi tiến độ
            và nâng cao trải nghiệm tập luyện, giúp bạn dễ dàng nhìn thấy kết
            quả và duy trì động lực. Hãy đến thăm chúng tôi tại 123 Đường 3/2,
            Ninh Kiều, Cần Thơ, và đắm mình trong một môi trường thể dục kết hợp
            giữa trang thiết bị hàng đầu, huấn luyện chuyên nghiệp và cộng đồng
            hỗ trợ. Tại GymMax, chúng tôi không chỉ là một phòng gym—chúng tôi
            là đối tác của bạn trong việc đạt được một cơ thể khỏe mạnh, mạnh mẽ
            và tự tin hơn. Hãy gia nhập chúng tôi hôm nay và trải nghiệm những
            điều tốt nhất của thể dục với một đội ngũ tận tâm cho sự thành công
            của bạn.
          </span>
        </p>
        <div>
          <h2 className="text-center font-bold text-2xl md:text-3xl my-5">
            Tại sao chọn GymMax?
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-between">
            {features?.map((item, index) => (
              <li data-aos="fade-up" key={index} className="list-none">
                <div className="px-3 py-5 transition-all duration-700 hover:bg-BgLight/20 hover:rounded-xl flex items-center">
                  <div
                    className={`rounded-lg text-3xl w-16 h-16 flex items-center justify-center ${item.color}`}
                  >
                    {item.icon}
                  </div>
                  <div className="ml-4 w-4/5">
                    <h5 className="text-Light text-base mb-1.5 font-semibold">
                      {item.name}
                    </h5>
                    <p className="text-sm font-medium text-gray-400">
                      {item.detail}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="my-5 flex flex-col w-full justify-center items-center">
          <Image
            src={gymView2}
            alt="Hình ảnh phòng gym"
            className="w-[100vw] border"
          />
          <Image
            src={gymView1}
            alt="Hình ảnh phòng gym"
            className="w-full border"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
