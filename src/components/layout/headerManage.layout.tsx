"use client";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import React from "react";

import logo from "@/assets/img/logo.png";
import { localStorageKey } from "@/constants/localStorage";
import { useQuery } from "@tanstack/react-query";
import { UserApis } from "@/services";
import { typeAccount, typeInforUser } from "@/types";
import { useRouter } from "next/navigation";
type NavItem = {
  href: string;
  name: string;
  icon: JSX.Element;
};

type NavbarManageProps = {
  navItems: NavItem[];
};

const HeaderManage: React.FC<NavbarManageProps> = ({ navItems }) => {
  const route = useRouter();
  const idUser = localStorage.getItem(localStorageKey.userId) || "";
  const role = localStorage.getItem(localStorageKey.role) || "";
  const { data } = useQuery({
    queryKey: ["admin"],
    queryFn: () => UserApis.getDetailsUser(idUser),
  });
  const theUser: typeAccount = data?.data || null;

  const handleLogout = () => {
    localStorage.removeItem(localStorageKey.accessToken);
    localStorage.removeItem(localStorageKey.refreshToken);
    localStorage.removeItem(localStorageKey.userId);
    localStorage.removeItem(localStorageKey.role);
    route.push(`/login-${role}`);
  };

  return (
    <>
      <header className="sticky top-0 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:px-6 sm:pt-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="sm:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              {/* <Link
                href="#"
                className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="sr-only">Acme Inc</span>
              </Link> */}
              {navItems?.map((item, index) => (
                <Link
                  key={index}
                  href={item?.href}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  {item?.icon}
                  {item?.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
        <div className="hidden sm:flex gap-2 justify-center items-center">
          <Image src={logo} alt="logo" className="w-14 h-14" />
          <h3 className="text-lg font-bold text-Light text-shadow">
            Gym<strong className="text-Primary">Max</strong>
          </h3>
        </div>
        <div className="ml-auto flex-1 md:grow-0 text-shadow text-Light font-semibold text-lg">
          {theUser?.accountName}
        </div>
        {/* accout admin or trainee */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Image
                src={theUser?.avatar}
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
};

export default HeaderManage;
