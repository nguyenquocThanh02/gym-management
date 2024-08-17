import React from "react";
import loginImage from "@/assets/img/loginImg.png";
import logo from "@/assets/img/logo.png";
import Image from "next/image";
import LoginForm from "@/components/logic/loginForm.component";
import { BreadcrumbCustom } from "@/components/ui/breadscrumbCustom";

const Login = () => {
  const breadcrumbs = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/login",
      name: "Login",
    },
  ];
  return (
    <section className="l-container h-full p-2">
      <BreadcrumbCustom links={breadcrumbs} />
      <div className="flex h-full flex-wrap items-center justify-center">
        <div className="w-[80%]">
          <div className="block rounded-lg  shadow-md border">
            <div className="g-0 lg:flex lg:flex-wrap">
              <div className="px-4 md:px-0 lg:w-6/12">
                <div className="md:mx-6 md:p-12">
                  <div className="text-center">
                    <Image className="mx-auto w-40" src={logo} alt="logo" />
                    <h4 className="mb-8 mt-1 pb-1 text-xl font-semibold">
                      LOGIN
                    </h4>
                  </div>
                  <LoginForm />
                </div>
              </div>

              <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-e-lg lg:rounded-bl-none overflow-hidden">
                <div className="relative h-full overflow-hidden object-cover bg-no-repeat">
                  <Image
                    src={loginImage}
                    className="w-full h-full transition duration-300 ease-in-out transform hover:scale-110"
                    alt="Louvre"
                    style={{ boxSizing: "border-box" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
