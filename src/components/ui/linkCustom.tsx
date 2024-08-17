import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";

interface LinkCustomProps {
  href: string;
  className?: string;
  text: string;
}

const LinkCustom: React.FC<LinkCustomProps> = ({
  href,
  className = "",
  text,
}) => {
  return (
    <Link
      href={href}
      className={cn("text-base font-semibold group relative w-max", className)}
    >
      <span>{text}</span>
      <span className="absolute -bottom-1 left-1/2 w-0 transition-all h-0.5 bg-Red group-hover:w-3/6"></span>
      <span className="absolute -bottom-1 right-1/2 w-0 transition-all h-0.5 bg-Red group-hover:w-3/6"></span>
    </Link>
  );
};

export default LinkCustom;
