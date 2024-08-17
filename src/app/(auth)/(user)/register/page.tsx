import React from "react";
import logo from "@/assets/img/logo.png";
import Image from "next/image";
import { BreadcrumbCustom } from "@/components/ui/breadscrumbCustom";
import RegisterForm from "@/components/logic/registerForm.component";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Register = () => {
  const breadcrumbs = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/register",
      name: "Register",
    },
  ];
  return (
    <section className="l-container h-full p-2">
      <BreadcrumbCustom links={breadcrumbs} />
      <div className="flex h-full flex-wrap items-center justify-center">
        <div className="w-[80%]">
          <div className="block rounded-lg shadow-md border">
            <div className="text-center mt-4">
              <Image className="mx-auto w-40" src={logo} alt="logo" />
              <h4 className="t-1 pb-1 text-xl font-semibold">REGISTER</h4>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
