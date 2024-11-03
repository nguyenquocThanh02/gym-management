"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PTApis, RegisterTrackingApis } from "@/services";
import { useQuery } from "@tanstack/react-query";
import CalendarToday from "./[today]/calendarToday";
import CalendarAll from "./[all]/calendarAll";

export default function CalendarRT() {
  const { data } = useQuery({
    queryKey: ["calendar-RT"],
    queryFn: () => RegisterTrackingApis.getRTforCalendar(),
  });

  const { data: PT } = useQuery({
    queryKey: ["PTs"],
    queryFn: () => PTApis.getAllPT(),
  });

  return (
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
        <CalendarToday data={data?.data?.today} pt={PT?.data} />
      </TabsContent>
      <TabsContent value="all">
        <CalendarAll data={data?.data?.all} pt={PT?.data} />
      </TabsContent>
    </Tabs>
  );
}
