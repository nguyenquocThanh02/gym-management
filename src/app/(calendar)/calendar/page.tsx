"use client";
import CalendarAll from "@/app/(manage)/admin/manage-calendar/[all]/calendarAll";
import CalendarToday from "@/app/(manage)/admin/manage-calendar/[today]/calendarToday";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PTApis, RegisterTrackingApis } from "@/services";
import { useQuery } from "@tanstack/react-query";

export default function CalendarForPT() {
  const { data } = useQuery({
    queryKey: ["calendar-RT"],
    queryFn: () => RegisterTrackingApis.getRTforCalendar(),
  });

  const { data: PT } = useQuery({
    queryKey: ["PTs"],
    queryFn: () => PTApis.getAllPT(),
  });

  return (
    <div className="w-full p-8">
      <Tabs defaultValue="today">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="today" className="px-5">
              Hôm nay
            </TabsTrigger>
            <TabsTrigger value="all" className="px-5">
              Tất cả
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="today">
          <CalendarToday
            data={data?.data?.today}
            pt={PT?.data}
            justView={true}
          />
        </TabsContent>
        <TabsContent value="all">
          <CalendarAll data={data?.data?.all} pt={PT?.data} justView={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
