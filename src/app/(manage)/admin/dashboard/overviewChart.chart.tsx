"use client";

import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { RegisterTrackingApis } from "@/services";
import MyEditor from "@/components/custom/MyEditor.custom";

const chartConfig = {
  views: {
    label: "total price",
  },
  paypal: {
    label: "paypal",
    color: "hsl(var(--chart-1))",
  },
  offline: {
    label: "offline",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export default function OverviewChart() {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("paypal");

  const [theMonth, setTheMonth] = React.useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  });

  const { data } = useQuery({
    queryKey: ["dataChartMonth", theMonth],
    queryFn: () => RegisterTrackingApis.getChartMonth(theMonth),
    enabled: !!theMonth,
  });

  const total = React.useMemo(
    () => ({
      paypal: data?.data?.reduce((acc, curr) => acc + curr.paypal, 0),
      offline: data?.data?.reduce((acc, curr) => acc + curr.offline, 0),
    }),
    [data]
  );

  return (
    <div>
      <input
        type="month"
        value={theMonth}
        onChange={(e) => setTheMonth(e.target.value)}
        className="p-1 my-2 border rounded-md"
      />

      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Bar Chart - total price</CardTitle>
            <CardDescription>Showing total price at {theMonth}</CardDescription>
          </div>
          <div className="flex">
            {["paypal", "offline"].map((key) => {
              const chart = key as keyof typeof chartConfig;
              return (
                <button
                  key={chart}
                  data-active={activeChart === chart}
                  className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                  onClick={() => setActiveChart(chart)}
                >
                  <span className="text-xs text-muted-foreground">
                    {chartConfig[chart].label}
                  </span>
                  <span className="text-lg font-bold leading-none sm:text-3xl">
                    ${total[key as keyof typeof total]?.toLocaleString()}
                  </span>
                </button>
              );
            })}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[250px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={data?.data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={true}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
