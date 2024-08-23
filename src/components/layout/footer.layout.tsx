import Link from "next/link";
import React from "react";
import {
  Facebook,
  Instagram,
  Phone,
  Twitter,
  X,
  Youtube,
  MapPin,
  Mail,
} from "lucide-react";
const Footer = () => {
  return (
    <>
      <footer className="w-full bg-Footer">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            {/* <Link href="https://pagedone.io/" className="flex justify-center ">
              <Image src={logo} width={80} height={80} alt="logo" />
            </Link> */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 pt-8">
              <ul className="flex flex-col gap-4">
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
                className="w-auto h-1/2"
              ></iframe>
            </div>
            <ul className="text-lg flex items-center justify-center flex-col gap-7 md:flex-row md:gap-12 transition-all duration-500 py-10 mb-10 border-b border-gray-200">
              <li>
                <Link href="#">Pagedone</Link>
              </li>
              <li>
                <Link href="#">Products</Link>
              </li>
              <li>
                <Link href="#">Resources</Link>
              </li>
              <li>
                <Link href="#">Blogs</Link>
              </li>
              <li>
                <Link href="#">Support</Link>
              </li>
            </ul>
            <div className="flex space-x-10 justify-center items-center mb-10">
              <Link
                href="#"
                className="block transition-all duration-500 hover:text-indigo-600 "
              >
                <X size={36} />
              </Link>
              <Link
                href="#"
                className="block transition-all duration-500 hover:text-indigo-600 "
              >
                <Instagram size={36} />
              </Link>
              <Link
                href="#"
                className="block transition-all duration-500 hover:text-indigo-600 "
              >
                <Facebook size={36} />
              </Link>
              <Link
                href="#"
                className="block transition-all duration-500 hover:text-indigo-600 "
              >
                <Youtube size={36} />
              </Link>
            </div>
            <span className="text-lg text-center block">
              <Link href="https://pagedone.io/">NQT</Link> 2024, All rights
              reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
