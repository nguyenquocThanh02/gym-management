import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageTrainee from "./(manage-trainee)/manageTrainee";
import ManageUser from "./(manage-user)/manageUser";

export default function TabsDemo() {
  return (
    <Tabs defaultValue="trainee">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="trainee" className="px-5">
            Trainee
          </TabsTrigger>
          <TabsTrigger value="user" className="px-5">
            User
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="trainee">
        <ManageTrainee />
      </TabsContent>
      <TabsContent value="user">
        <ManageUser />
      </TabsContent>
    </Tabs>
  );
}
