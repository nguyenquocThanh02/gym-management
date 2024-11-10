"use client";

import * as React from "react";
import {
  DollarSign,
  ScrollText,
  TrendingUp,
  TrendingUpIcon,
  UserRoundPlus,
} from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { formatDate, renderVND } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";

const chartConfig = {
  price: {
    label: "price",
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

export default function DateChart() {
  const [theDate, setTheDate] = React.useState(
    new Date().toISOString().slice(0, 10)
  );

  const { data } = useQuery({
    queryKey: ["chartDate", theDate],
    queryFn: () => RegisterTrackingApis.getChartDate(theDate),
    enabled: !!theDate,
  });
  console.log("🚀 ~ DateChart ~ data:", data);

  const totalPrice = React.useMemo(() => {
    return data?.data?.paypal + data?.data?.offline || 0;
  }, [data]);

  const dataChart = React.useMemo(() => {
    if (data?.data === null) {
      return [];
    }
    return [
      {
        browser: "paypal",
        price: data?.data?.paypal || 0,
        fill: "var(--color-paypal)",
      },
      {
        browser: "offline",
        price: data?.data?.offline || 0,
        fill: "var(--color-offline)",
      },
    ];
  }, [data]);
  return (
    <div>
      <input
        type="date"
        value={theDate}
        onChange={(e) => setTheDate(e.target.value)}
        className="border mb-3 p-1 rounded-md"
      />
      <div className="flex flex-col md:flex-row items-center justify-start gap-5 mb-3">
        <Card className="bg-slate-300 w-[280px] h-[160px] rounded-lg  text-Light">
          <CardContent className="h-full w-full flex justify-between items-center">
            <div className="">
              <h3 className="font-semibold text-lg">Tổng người dùng</h3>
              <div className="flex gap-3 items-center mt-2 text-4xl">
                <p>{data?.data?.amountUser}</p>
                <TrendingUpIcon />
              </div>
            </div>
            <div className="border rounded-full p-3">
              <UserRoundPlus size={40} />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-300 w-[280px] h-[160px] rounded-lg  text-Light">
          <CardContent className="h-full w-full flex justify-between items-center">
            <div className="">
              <h3 className="font-semibold text-lg">Tổng bài báo</h3>
              <div className="flex gap-3 items-center mt-2 text-4xl">
                <p>{data?.data?.amountArtical}</p>
                <TrendingUpIcon />
              </div>
            </div>
            <div className="border rounded-full p-3">
              <ScrollText size={40} />
            </div>
          </CardContent>
        </Card>
        <Sheet>
          <SheetTrigger>
            <Card className="bg-slate-300 w-[280px] h-[160px] rounded-lg  text-Light">
              <CardContent className="h-full w-full flex justify-between items-center">
                <div className="">
                  <h3 className="font-semibold text-lg">Tổng doanh thu</h3>
                  <div className="flex gap-3 items-center mt-2 text-2xl">
                    <p>{renderVND(data?.data?.paypal + data?.data?.offline)}</p>
                    <TrendingUpIcon />
                  </div>
                </div>
                <div className="border rounded-full p-3">
                  <DollarSign size={40} />
                </div>
              </CardContent>
            </Card>
          </SheetTrigger>
          <SheetContent side={"right"}>
            <SheetHeader>
              <SheetTitle className="text-2xl font-medium my-5">
                Chi tiết doanh thu trong ngày
              </SheetTitle>
            </SheetHeader>
            <div className="">
              <div className="flex items-center font-semibold">
                <div className="w-10">STT</div>
                <div className="flex-1 ">Khách hàng</div>
                <div className="flex-1">Giá gói</div>
                <div className="flex-1">Chi tiết</div>
              </div>
              {data?.data?.registerTrackings?.map((item, index) => (
                <div key={index} className="mt-5">
                  <div className="flex" key={index}>
                    <div className="w-10">{index + 1}</div>
                    <div className="flex-1">{item?.user?.fullName}</div>
                    <div className="flex-1">{renderVND(item?.totalPrice)}</div>
                    <div className="flex-1 flex flex-col gap-1">
                      <Link
                        className="w-fit bg-slate-400 rounded-2xl h-fit py-1 text-Light text-xs px-2"
                        href={`/admin/manage-account/details/${item?.user?.idUser}`}
                      >
                        Xem tài khoản
                      </Link>
                      <Link
                        className="w-fit bg-lime-100 rounded-2xl h-fit py-1 text-Dark text-xs px-2"
                        href={`/admin/manage-register-tracking/details/${item?._id}`}
                      >
                        Xem đăng ký
                      </Link>
                    </div>
                  </div>
                  <hr className="mb-4 mt-2" />
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Tổng thanh toán qua Paypal - Trực tiếp</CardTitle>
          <CardDescription>{formatDate(theDate)}</CardDescription>
        </CardHeader>
        <CardContent className="relative flex-1 pb-0">
          {totalPrice === 0 && (
            <div className="absolute flex justify-center items-center w-full h-full">
              <Badge className="text-lg">
                Không có gói tập nào được đăng ký trong ngày.
              </Badge>
            </div>
          )}

          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={dataChart}
                dataKey="price"
                nameKey="browser"
                innerRadius={60}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-xl font-bold"
                          >
                            {totalPrice.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-lg"
                          >
                            đ
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Tận dụng các chương trình khuyến mãi để tăng cường đăng ký.{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Sử dụng biểu đồ dưới đây để xem thống kê tổng quan hàng tháng.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
