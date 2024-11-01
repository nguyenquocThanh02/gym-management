import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QuestionAnswer = () => {
  const questionAnswers: { question: string; answer: string }[] = [
    {
      question: "Gói tập gym thường bao gồm những gì?",
      answer:
        "Gói tập gym thường bao gồm các lớp học thể dục, quyền truy cập vào thiết bị, và dịch vụ tư vấn dinh dưỡng. Một số gói cũng bao gồm các buổi huấn luyện cá nhân hoặc nhóm với huấn luyện viên.",
    },
    {
      question: "Tôi nên chọn gói nào cho mình?",
      answer:
        "Chọn gói phù hợp dựa trên mục tiêu cá nhân của bạn, chẳng hạn như giảm cân, tăng cơ, hoặc cải thiện sức bền. Hãy tham khảo nhân viên gym để chọn gói phù hợp.",
    },
    {
      question: "Tôi có thể thay đổi gói của mình khi cần không?",
      answer:
        "Nhiều phòng gym cho phép bạn thay đổi gói, nhưng điều này phụ thuộc vào chính sách của từng cơ sở. Hãy liên hệ với nhân viên để biết thêm chi tiết.",
    },
    {
      question: "Huấn luyện viên cá nhân là gì?",
      answer:
        "Huấn luyện viên cá nhân giúp bạn đạt được mục tiêu tập luyện bằng cách tạo ra một kế hoạch tập luyện cá nhân hóa, hướng dẫn kỹ thuật và cung cấp động lực.",
    },
    {
      question: "Tôi nên chọn huấn luyện viên cá nhân như thế nào?",
      answer:
        "Chọn huấn luyện viên dựa trên kinh nghiệm, chuyên môn, và chứng chỉ liên quan. Hãy gặp gỡ và thảo luận để đảm bảo bạn có thể làm việc hiệu quả cùng nhau.",
    },
    {
      question: "Có cần thiết phải có huấn luyện viên cá nhân không?",
      answer:
        "Huấn luyện viên cá nhân không bắt buộc, nhưng có thể giúp bạn đạt được kết quả nhanh hơn và an toàn hơn, đặc biệt nếu bạn là người mới bắt đầu hoặc có mục tiêu cụ thể.",
    },
    {
      question: "Những bài tập giảm cân hiệu quả là gì?",
      answer:
        "Những bài tập giảm cân hiệu quả bao gồm cardio (như chạy, bơi), tập luyện cường độ cao (HIIT), và tập sức mạnh. Kết hợp chúng với chế độ ăn hợp lý sẽ giúp bạn giảm cân.",
    },
    {
      question: "Tôi có thể tập mỗi ngày không?",
      answer:
        "Tập mỗi ngày là khả thi, nhưng bạn cần thay đổi cường độ và loại bài tập để tránh chấn thương và cho cơ bắp phục hồi. Đảm bảo có thời gian nghỉ ngơi đầy đủ.",
    },
    {
      question: "Tôi nên ăn gì trước và sau khi tập?",
      answer:
        "Trước khi tập, hãy ăn một bữa nhẹ có chứa carbohydrate và protein. Sau khi tập, tiêu thụ protein và carbohydrate để phục hồi cơ bắp và năng lượng.",
    },
    {
      question: "Cân nặng có ảnh hưởng đến hiệu quả tập luyện không?",
      answer:
        "Cân nặng có thể ảnh hưởng đến hiệu quả tập luyện. Những người nặng hơn có thể gặp khó khăn hơn khi tập, nhưng việc tập luyện đều đặn và chế độ ăn hợp lý sẽ giúp cải thiện tình trạng này.",
    },
    {
      question: "Tôi có thể theo dõi tiến độ tập luyện của mình như thế nào?",
      answer:
        "Bạn có thể theo dõi tiến độ bằng cách ghi chép các bài tập, theo dõi trọng lượng và số lần lặp lại, và sử dụng các ứng dụng theo dõi thể dục. Đánh giá định kỳ cũng là một cách tốt.",
    },
    {
      question: "Lợi ích của việc tập luyện nhóm là gì?",
      answer:
        "Tập luyện trong nhóm có thể tăng cường động lực, tạo cảm giác cộng đồng, và cung cấp hỗ trợ từ các thành viên khác. Nó cũng giúp duy trì cam kết và làm cho việc tập luyện thú vị hơn.",
    },
    {
      question: "Thời điểm nào trong ngày là tốt nhất để tập luyện?",
      answer:
        "Thời điểm tốt nhất để tập luyện là khi bạn cảm thấy thoải mái và tràn đầy năng lượng. Một số người thích tập vào buổi sáng, trong khi những người khác thấy hiệu quả hơn vào buổi chiều hoặc tối.",
    },
    {
      question: "Làm thế nào tôi có thể ngăn ngừa chấn thương khi tập luyện?",
      answer:
        "Để ngăn ngừa chấn thương, hãy khởi động kỹ lưỡng trước khi tập, sử dụng kỹ thuật đúng, và tránh nâng quá tải. Cũng quan trọng là lắng nghe cơ thể và nghỉ ngơi khi cần thiết.",
    },
    {
      question: "Tôi có thể tập hiệu quả mà không cần thiết bị không?",
      answer:
        "Có, bạn có thể tập hiệu quả mà không cần thiết bị bằng cách sử dụng trọng lượng cơ thể, các bài tập cardio, và các bài tập sức mạnh như chống đẩy, ngồi xổm, và lunge.",
    },
    {
      question: "Tôi có cần bổ sung không?",
      answer:
        "Bổ sung không bắt buộc, nhưng có thể hỗ trợ chế độ ăn và mục tiêu tập luyện của bạn. Hãy tham khảo ý kiến bác sĩ hoặc chuyên gia dinh dưỡng trước khi sử dụng.",
    },
  ];

  const breadcrumbs = [
    {
      link: "/",
      name: "Trang chủ",
    },
    {
      link: "/Q&A",
      name: "Q&A",
    },
  ];
  return (
    <div className="l-container bg-BgLight/30 rounded-ss-full pb-10">
      <BreadcrumbCustom links={breadcrumbs} />
      <h1 className="text-center font-bold text-4xl">Q&A</h1>
      <Accordion type="single" collapsible className="w-full py-4">
        {questionAnswers?.map((item, index) => (
          <AccordionItem value={item.question} key={index}>
            <AccordionTrigger className="text-shadow">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-shadow">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default QuestionAnswer;
