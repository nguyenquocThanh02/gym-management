import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import Header from "@/components/layouts/header.component";
import Footer from "@/components/layouts/footer.component";
import Interactive from "@/components/layouts/interactive.component";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={cn("w-full")}>
      <Header />
      <Interactive />
      {children}
      <Footer />
    </main>
  );
}
