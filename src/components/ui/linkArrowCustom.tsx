import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import React from "react";

interface LinkArrowProps {
  children: React.ReactNode;
  className?: string;
  href: string;
}

const LinkArrow: React.FC<LinkArrowProps> = ({ children, className, href }) => {
  return (
    <div className={cn("flex justify-center ", className)}>
      <a
        href={href}
        className={cn(
          "relative inline-flex rounded-full border items-center justify-start py-1 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out hover:pl-10 hover:pr-6 group"
        )}
      >
        <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
          <MoveRight />
        </span>
        <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
          <MoveRight />
        </span>
        <span className="relative w-full text-left transition-colors duration-200 ease-in-out">
          {children}
        </span>
      </a>
    </div>
  );
};

export default LinkArrow;
