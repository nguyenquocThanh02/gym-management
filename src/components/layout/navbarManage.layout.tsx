"use client";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  MessageCircle,
  MessageSquareText,
  Package2,
  Settings,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Định nghĩa kiểu cho props
type NavItem = {
  href: string;
  name: string;
  icon: JSX.Element;
};

type NavbarManageProps = {
  navItems: NavItem[];
};

const NavbarManage: React.FC<NavbarManageProps> = ({ navItems }) => {
  const paramPath = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-BgDark sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 pb-4 pt-6">
        {/* <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-BgLight/20 text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link> */}

        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:animate-tada md:h-8 md:w-8",
                    {
                      "bg-Light text-Dark/80": paramPath === item.href,
                      "bg-BgLight/20 text-Light/80": paramPath !== item.href,
                    }
                  )}
                >
                  {item.icon}
                  <span className="sr-only">{item.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="right"
                className="bg-BgDark text-Light border border-none ml-2"
              >
                {item.name}
              </TooltipContent>
            </Tooltip>
          ))}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/admin/manage-chat"
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:animate-tada md:h-8 md:w-8",
                  {
                    "bg-Light text-Dark/80": paramPath === "/admin/manage-chat",
                    "bg-BgLight/20 text-Light/80":
                      paramPath !== "/admin/manage-chat",
                  }
                )}
              >
                <MessageSquareText />
                <span className="sr-only">Chat</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="bg-BgDark text-Light border border-none ml-2"
            >
              Chat
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>

      <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-Light/80 transition-colors hover:animate-tada md:h-8 md:w-8"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
};

export default NavbarManage;
