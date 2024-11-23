import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticalOfUserComponent from "./articalOfUser.component";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";

export default function ArticalOfUserPage() {
  const stateArticals = [
    { name: "Đang xem xét", en: "reviewing" },
    {
      name: "Công khai",
      en: "published",
    },
    { name: "Khoá", en: "draft" },
  ];

  const breadcrumbs = [
    {
      link: "/",
      name: "Trang chủ",
    },
    {
      link: "/artical",
      name: "Bài viết",
    },
    {
      link: "/artical/of-user",
      name: "Bài viết của tôi",
    },
  ];

  return (
    <div className="l-container">
      <BreadcrumbCustom links={breadcrumbs} />
      <h1 className="text-center font-bold text-3xl mb-4 mt-2">
        Bài viết của tôi
      </h1>
      <Tabs defaultValue="reviewing" className="my-3">
        <div className="flex items-center">
          <TabsList>
            {stateArticals?.map((item, index) => (
              <TabsTrigger key={index} value={item.en} className="px-5">
                {item.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {stateArticals?.map((item, index) => (
          <TabsContent key={index} value={item.en}>
            <ArticalOfUserComponent status={item.en.toLowerCase()} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
