import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageReviewing from "./(manage-reviewing)/manageReviewing";
import ManagePublished from "./(manage-published)/manage-published";
import ManageBlocked from "./(manage-blocked)/manage-blocked";

export default function TabArticalManage() {
  return (
    <Tabs defaultValue="Reviewing">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="Reviewing" className="px-5">
            Đang xem xét
          </TabsTrigger>
          <TabsTrigger value="Published" className="px-5">
            Công khai 
          </TabsTrigger>
          <TabsTrigger value="Blocked" className="px-5">
            Khoá
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="Reviewing">
        <ManageReviewing />
      </TabsContent>
      <TabsContent value="Published">
        <ManagePublished />
      </TabsContent>
      <TabsContent value="Blocked">
        <ManageBlocked />
      </TabsContent>
    </Tabs>
  );
}
