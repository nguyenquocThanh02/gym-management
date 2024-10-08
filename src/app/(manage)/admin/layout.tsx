"use client"; // Đánh dấu đây là Client Component

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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    const savedRole = localStorage?.getItem(localStorageKey?.role) || "";
    setRole(savedRole);
  }, []);

  const navItems = [
    { href: "/admin", name: "Home", icon: <Home className="h-5 w-5" /> },
    {
      href: "/admin/dashboard",
      name: "Dashboard",
      icon: <ChartLine className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-register-tracking",
      name: "Subscription Tracking",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-package",
      name: "Package Management",
      icon: <Package className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-account",
      name: "Account Management",
      icon: <Users2 className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-device",
      name: "Device Management",
      icon: <Dumbbell className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-personal-trainer",
      name: "Personal Trainer Management",
      icon: <PersonStanding className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-discount",
      name: "Discount Management",
      icon: <BadgeDollarSign className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-q&a",
      name: "Q&A Management",
      icon: <FileQuestion className="h-5 w-5" />,
    },
    {
      href: "/admin/manage-artical",
      name: "Artical Management",
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
