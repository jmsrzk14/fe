"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import Footer from "./footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Halaman yang tidak menampilkan Navbar & Footer
  const isHiddenLayout =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/ukm") ||
    pathname.startsWith("/bem");

  return (
    <div className="min-h-screen flex flex-col">
      {!isHiddenLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isHiddenLayout && <Footer />}
    </div>
  );
}
