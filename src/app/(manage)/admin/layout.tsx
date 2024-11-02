"use client";

import { useEffect, useState } from "react";
import NavbarManage from "@/components/layout/navbarManage.layout";
import HeaderManage from "@/components/layout/headerManage.layout";
import {
  BadgeDollarSign,
  ChartLine,
  Dumbbell,
  FileQuestion,
  Home,
  Package,
  PersonStanding,
  ScrollText,
  ShoppingCart,
  Users2,
} from "lucide-react";
import FooterManage from "@/components/layout/footerManage.layout";
import { localStorageKey } from "@/constants/localStorage";
import { onMessageListener, requestFCMToken } from "@/firebases/firebase";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [fcmToken, setFcmToken] = useState<string>("");
  const idUser = localStorage.getItem(localStorageKey.userId);
  const role = localStorage.getItem(localStorageKey.role);

  const navItems = [
    { href: "/admin", name: "Trang chủ", icon: <Home className="h-5 w-5" /> },
    {
      href: "/admin/dashboard",
      name: "Thống kê",
      icon: <ChartLine className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-register-tracking",
      name: "Theo dõi đăng ký",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-package",
      name: "Quản lý gói",
      icon: <Package className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-account",
      name: "Quản lý tài khoản",
      icon: <Users2 className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-device",
      name: "Quản lý thiết bị",
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-personal-trainer",
      name: "Quản lý huấn luyện viên",
      icon: <PersonStanding className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-discount",
      name: "Quản lý giảm giá",
      icon: <BadgeDollarSign className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-artical",
      name: "Quản lý bài viết",
      icon: <ScrollText className="h-5 w-5" />,
    },
  ];

  const theNavItems =
    role === "trainee"
      ? navItems.filter(
          (item) =>
            ![
              "/admin/dashboard",
              "/admin/manage-account",
              "/admin/manage-package",
            ].includes(item?.href)
        )
      : navItems;

  useEffect(() => {
    const fetchFCMToken = async () => {
      try {
        const token = await requestFCMToken();
        setFcmToken(token);
      } catch (err) {
        console.log("Error getting fcm token: ", err);
      }
    };
    fetchFCMToken();
  }, []);

  onMessageListener()
    .then((payload) => {
      toast.info("New message received");
    })
    .catch((err) => {
      toast.warning("Faild to receive message");
    });

  if (!idUser || !role) {
    redirect("/login-trainee");
  }
  return (
    <div className="flex min-h-screen w-full flex-col">
      <NavbarManage navItems={theNavItems} />
      <div className="flex flex-col sm:gap-4 sm:pl-14 min-h-screen">
        <HeaderManage navItems={theNavItems} />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-8">
          {children}
        </main>
        <FooterManage />
      </div>
    </div>
  );
}
