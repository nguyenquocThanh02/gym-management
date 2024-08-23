import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const QuestionAnswer = () => {
  const questionAnswers: { question: string; answer: string }[] = [
    {
      question: "Các gói tập tại gym thường bao gồm những gì?",
      answer:
        "Các gói tập thường bao gồm các lớp tập thể dục, truy cập thiết bị, và dịch vụ tư vấn dinh dưỡng. Một số gói cũng có các buổi tập cá nhân hoặc nhóm với huấn luyện viên.",
    },
    {
      question: "Làm thế nào để chọn gói tập phù hợp với tôi?",
      answer:
        "Chọn gói tập phù hợp dựa trên mục tiêu cá nhân của bạn, như giảm cân, tăng cơ, hoặc cải thiện sức bền. Hãy tham khảo ý kiến từ nhân viên gym để chọn gói phù hợp.",
    },
    {
      question: "Tôi có thể thay đổi gói tập khi cần không?",
      answer:
        "Nhiều gym cho phép thay đổi gói tập, nhưng điều này phụ thuộc vào chính sách của từng cơ sở. Hãy liên hệ với nhân viên để biết thêm chi tiết.",
    },
    {
      question: "Huấn luyện viên cá nhân là gì?",
      answer:
        "Huấn luyện viên cá nhân là người giúp bạn đạt được mục tiêu tập luyện bằng cách tạo kế hoạch tập luyện cá nhân hóa, hướng dẫn kỹ thuật, và cung cấp động lực.",
    },
    {
      question: "Tôi nên chọn huấn luyện viên cá nhân như thế nào?",
      answer:
        "Lựa chọn huấn luyện viên dựa trên kinh nghiệm, chuyên môn, và các chứng chỉ liên quan. Hãy gặp gỡ và trao đổi để chắc chắn rằng bạn có thể làm việc hiệu quả với họ.",
    },
    {
      question: "Có cần phải có một huấn luyện viên cá nhân không?",
      answer:
        "Huấn luyện viên cá nhân không bắt buộc, nhưng có thể giúp bạn đạt kết quả nhanh hơn và an toàn hơn, đặc biệt nếu bạn mới bắt đầu hoặc có mục tiêu cụ thể.",
    },
    {
      question: "Các bài tập giảm cân hiệu quả là gì?",
      answer:
        "Các bài tập giảm cân hiệu quả bao gồm cardio (như chạy, bơi), tập cường độ cao (HIIT), và các bài tập sức mạnh. Kết hợp các bài tập này với chế độ ăn uống hợp lý sẽ giúp bạn giảm cân.",
    },
    {
      question: "Tôi có thể tập luyện mỗi ngày không?",
      answer:
        "Tập luyện mỗi ngày có thể được thực hiện, nhưng cần thay đổi cường độ và loại bài tập để tránh chấn thương và phục hồi cơ bắp. Đảm bảo có thời gian nghỉ ngơi hợp lý.",
    },
    {
      question: "Tôi nên ăn gì trước và sau khi tập luyện?",
      answer:
        "Trước khi tập, nên ăn một bữa nhẹ chứa carbohydrate và protein. Sau khi tập, tiêu thụ protein và carbohydrate để phục hồi cơ bắp và năng lượng.",
    },
    {
      question: "Cân nặng có ảnh hưởng đến hiệu quả tập luyện không?",
      answer:
        "Cân nặng có thể ảnh hưởng đến hiệu quả tập luyện. Người nặng hơn có thể gặp khó khăn hơn khi tập, nhưng tập luyện đều đặn và chế độ ăn uống hợp lý sẽ giúp cải thiện tình trạng này.",
    },
    {
      question: "Làm thế nào để theo dõi tiến độ tập luyện của tôi?",
      answer:
        "Bạn có thể theo dõi tiến độ bằng cách ghi chép các bài tập, theo dõi trọng lượng và số lần lặp lại, và sử dụng các ứng dụng theo dõi thể dục. Thực hiện các kiểm tra định kỳ cũng là một cách tốt.",
    },
    {
      question: "Có những lợi ích gì khi tập luyện với nhóm?",
      answer:
        "Tập luyện với nhóm có thể tăng động lực, tạo cảm giác cộng đồng và hỗ trợ từ các thành viên khác. Nó cũng giúp duy trì cam kết và làm cho buổi tập trở nên thú vị hơn.",
    },
    {
      question: "Tập luyện vào thời điểm nào trong ngày là tốt nhất?",
      answer:
        "Thời điểm tập luyện tốt nhất là khi bạn cảm thấy thoải mái và có năng lượng. Một số người thích tập vào buổi sáng, trong khi những người khác thấy hiệu quả hơn vào buổi chiều hoặc tối.",
    },
    {
      question: "Làm thế nào để phòng ngừa chấn thương khi tập luyện?",
      answer:
        "Để phòng ngừa chấn thương, hãy khởi động kỹ trước khi tập, sử dụng kỹ thuật đúng, và không quá tải trọng lượng. Cũng quan trọng là nghe theo cơ thể và nghỉ ngơi khi cần thiết.",
    },
    {
      question: "Có thể tập luyện hiệu quả mà không cần thiết bị không?",
      answer:
        "Có, bạn hoàn toàn có thể tập luyện hiệu quả mà không cần thiết bị bằng cách sử dụng trọng lượng cơ thể, bài tập cardio, và các bài tập thể lực như hít đất, squats, và lunges.",
    },
    {
      question: "Tôi có cần phải uống thực phẩm chức năng không?",
      answer:
        "Thực phẩm chức năng không phải là bắt buộc, nhưng có thể hỗ trợ cho chế độ ăn uống và mục tiêu tập luyện của bạn. Hãy tham khảo ý kiến bác sĩ hoặc chuyên gia dinh dưỡng trước khi sử dụng.",
    },
  ];

  return (
    <div className="l-container bg-BgLight/30 rounded-ss-full py-10">
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
