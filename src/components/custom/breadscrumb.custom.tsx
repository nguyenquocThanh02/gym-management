"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LinkCustom from "./link.custom";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface BreadcrumbItemProps {
  link?: string;
  name: string;
}

interface BreadcrumbCustomProps {
  links: BreadcrumbItemProps[];
}

export function BreadcrumbCustom({ links }: BreadcrumbCustomProps) {
  const paramPath = usePathname();

  return (
    <Breadcrumb className="mt-3 mb-3">
      <BreadcrumbList>
        {links.map((item, index) => (
          <React.Fragment key={index}>
            {item.link ? (
              <BreadcrumbItem>
                <LinkCustom
                  href={item.link}
                  className={cn("transition-colors", {
                    "text-Primary": paramPath === item.link,
                  })}
                  text={item.name}
                />
              </BreadcrumbItem>
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              </BreadcrumbItem>
            )}
            {index < links.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
