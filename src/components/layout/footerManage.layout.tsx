import Link from "next/link";
import React from "react";

const FooterManage = () => {
  return (
    <>
      <footer className="relative bottom-0 w-full bg-Footer text-Light p-1 sm:pl-6">
        <span className="text-base block">
          <Link href="#">NQT</Link> 2024, All rights reserved.
        </span>
      </footer>
    </>
  );
};

export default FooterManage;
