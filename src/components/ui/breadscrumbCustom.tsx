import Link from "next/link";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import LinkCustom from "./linkCustom";

interface BreadcrumbItemProps {
  link?: string;
  name: string;
}

interface BreadcrumbCustomProps {
  links: BreadcrumbItemProps[];
}

export function BreadcrumbCustom({ links }: BreadcrumbCustomProps) {
  return (
    <Breadcrumb className="mt-3 mb-3">
      <BreadcrumbList>
        {links.map((item, index) => (
          <React.Fragment key={index}>
            {item.link ? (
              <BreadcrumbItem>
                <LinkCustom href={item.link} className="" text={item.name} />
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
