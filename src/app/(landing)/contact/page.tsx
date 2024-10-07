import { BreadcrumbCustom } from "@/components/custom/breadscrumb.custom";
import { Mail, MapPin, Phone } from "lucide-react";
import React from "react";

const Contact = () => {
  const breadcrumbs = [
    {
      link: "/",
      name: "Home",
    },
    {
      link: "/contact",
      name: "Contact",
    },
  ];
  return (
    <div className="l-container mb-10">
      <BreadcrumbCustom links={breadcrumbs} />
      <h1 className="text-center font-bold text-2xl md:text-4xl">Contact</h1>

      <div className="w-full flex flex-col  justify-center items-center gap-8 pt-8">
        <ul className="w-full flex flex-col gap-4 border rounded-lg p-5 text-center">
          <li className="flex gap-3">
            <Phone />
            0779123499
          </li>
          <li className="flex gap-3">
            <MapPin />
            3/2 streets, Ninh Kieu, Can Tho
          </li>
          <li className="flex gap-3">
            <Mail />
            gymmax.center@gmail.com
          </li>
        </ul>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1529.8262431643261!2d105.7699649358898!3d10.030270614973542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0895a51d60719%3A0x9d76b0035f6d53d0!2zxJDhuqFpIGjhu41jIEPhuqduIFRoxqE!5e0!3m2!1svi!2s!4v1723200933180!5m2!1svi!2s"
          loading="lazy"
          className="w-full h-screen rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
