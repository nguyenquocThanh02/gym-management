import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArticalOfUserComponent from "./articalOfUser.component";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";

export default function ArticalOfUserPage() {
  const stateArticals = ["Reviewing", "Published", "Blocked"];

  const breadcrumbs = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/artical",
      name: "Articals",
    },
    {
      link: "/artical/of-user",
      name: "My artical",
    },
  ];
  return (
    <div className="l-container">
      <BreadcrumbCustom links={breadcrumbs} />
      <h1 className="text-center font-bold text-3xl mb-4 mt-2">My articals</h1>
      <Tabs defaultValue="Reviewing" className="my-3">
        <div className="flex items-center">
          <TabsList>
            {stateArticals?.map((item, index) => (
              <TabsTrigger key={index} value={item} className="px-5">
                {item}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        {stateArticals?.map((item, index) => (
          <TabsContent key={index} value={item}>
            <ArticalOfUserComponent status={item.toLowerCase()} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
