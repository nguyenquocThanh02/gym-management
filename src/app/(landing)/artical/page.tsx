"use client";
import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import CardArtical from "@/components/normal/cardArtical.component";
import NewArticals from "@/components/normal/newArtical.component";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce.hook";
import { ArticalApis } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, SquarePlus } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ArticalPage = () => {
  const [valueSearch, setValueSearch] = useState("");
  const debounceSearchValue = useDebounce(valueSearch, 800);

  const { data } = useQuery({
    queryKey: ["articals"],
    queryFn: () => ArticalApis.getAllArticals("published"),
  });

  const breadcrumbs = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/artical",
      name: "Articals",
    },
  ];

  // const [theData, setTheData] = useState(null);
  // const [pageNumber, setPageNumber] = useState(1);
  // const [isMoreLoading, setIsMoreLoading] = useState(false);

  // const loadMoreData = async () => {
  //   console.log("vo day");
  //   setIsMoreLoading(true);
  //   await new Promise((resolve) => setTimeout(resolve, 5000));

  //   console.log("load new");
  //   setIsMoreLoading(false);
  // };

  // const onScroll = async () => {
  //   if (
  //     window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
  //     !isMoreLoading
  //   ) {
  //     await loadMoreData();
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", onScroll);

  //   return () => {
  //     window.removeEventListener("scroll", onScroll);
  //   };
  // }, [isMoreLoading, pageNumber]);

  return (
    <div>
      <div className="l-container flex justify-between my-2 items-center">
        <BreadcrumbCustom links={breadcrumbs} />
        <Link
          href={"/artical/add"}
          className="flex items-center gap-2 border p-2 rounded-md hover:opacity-80"
        >
          <Plus size={28} />
          <span className="text-xl">New artical</span>
        </Link>
      </div>
      <div className="l-container py-8">
        <h2 className="text-Primary text-shadow  text-3xl font-bold mb-3">
          New articals
        </h2>
        <NewArticals />
        <hr className="mt-8" />
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl md:text-3xl pt-3 mb-5">Articals</h2>
          <form>
            <div className="relative ml-auto flex-1 md:grow-0 text-Dark py-4 pl-4">
              <Search className="absolute left-[26px] top-[26px] h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Enter title artical"
                className="w-full rounded-lg pl-8"
                value={valueSearch}
                onChange={(e) => setValueSearch(e?.target?.value)}
              />
            </div>
          </form>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.data?.length > 0 &&
            data?.data
              ?.filter((artical) =>
                artical?.title
                  .toLowerCase()
                  .includes(debounceSearchValue.toLocaleLowerCase())
              )
              .map((item, index) => (
                <div
                  data-aos={"fade-up"}
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <CardArtical theArtical={item} />
                </div>
              ))}
        </div>
        {/* {isMoreLoading && <div>LOADING</div>} */}
      </div>
    </div>
  );
};

export default ArticalPage;
