import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/react-query.provider";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body
          className={cn(
            "min-h-screen font-sans antialiased bg-Background text-Text",
            poppins.variable
          )}
        >
          {children}
        </body>
      </ReactQueryProvider>
    </html>
  );
}
