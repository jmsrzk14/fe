"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "./navbar";
import Footer from "./footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Halaman yang tidak menampilkan Navbar & Footer
  const isHiddenLayout =
    pathname.startsWith("/auth") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/ukm") ||
    pathname.startsWith("/departmen") ||
    pathname.startsWith("/himpunan") ||
    pathname.startsWith("/mpm") ||
    pathname.startsWith("/credits") ||
    pathname.startsWith("/bem");

  const isProtectedRoute =
    pathname.startsWith("/user/service") ||
    pathname.startsWith("/user/announcements") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/ukm") ||
    pathname.startsWith("/departmen") ||
    pathname.startsWith("/himpunan") ||
    pathname.startsWith("/mpm") ||
    pathname.startsWith("/bem");

  // useEffect(() => {
  //   // Jalankan hanya di browser
  //   if (typeof window !== "undefined" && isProtectedRoute) {
  //     const token = sessionStorage.getItem("token");

  //     // Kalau belum login → arahkan ke halaman login
  //     if (!token) {
  //       router.push("/auth/login");
  //     }
  //   }
  // }, [pathname, isProtectedRoute, router]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isHiddenLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isHiddenLayout && <Footer />}
    </div>
  );
}
