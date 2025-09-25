"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";
import {
  Search,
  User,
  Bell,
  Settings,
  ChevronDown,
  Sun,
  Moon,
  Zap,
  Activity,
} from "lucide-react";
import { menuItems } from "@/constants/data";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModule, setActiveModule] = useState("dashboard");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [orgLogo, setOrgLogo] = useState<string | null>(null); // 🔥 state logo

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userStr = sessionStorage.getItem("user");
    const position = sessionStorage.getItem("position");
    const organisasiId = sessionStorage.getItem("organization"); // 🔥 ambil organisasi id
    const user = userStr ? JSON.parse(userStr) : null;

    console.log(organisasiId);

    if (!token || !user) {
      router.push("/ukm/dashboard");
      return;
    }

    if (!position?.includes("ukm")) {
      if (user.position === "student") {
        router.push("/student/home");
      } else if (user.position === "lecturer") {
        router.push("/lecturer/home");
      } else {
        router.push("/");
      }
    }

    // 🔥 fetch logo organisasi
    if (organisasiId && token) {
      fetch(`http://localhost:8080/api/student/clubs/${organisasiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          
          setOrgLogo(data.image || null);
        })
        .catch((err) => console.error("Gagal ambil logo organisasi:", err));
    }
  }, [router]);

  // Auto detect active module from URL
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentModule =
      menuItems.find((item) => currentPath.startsWith(item.path))?.key ||
      "dashboard";
    setActiveModule(currentModule);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentModuleData = menuItems.find(
    (item) => item.key === activeModule
  );

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
          <div className="p-6 flex justify-between items-center">
            {/* Title & Breadcrumb */}
            <div className="flex items-center gap-4">
              {orgLogo}
              {orgLogo && (
                <img
                  src={`http://localhost:8080/clubs/${orgLogo}`}
                  alt="Logo Organisasi"
                  className="w-10 h-10 rounded-lg shadow-md"
                />
              )}
              <div className="animate-fadeInUp">
                <div className="flex items-center gap-3 mb-1">
                  {currentModuleData?.icon &&
                    React.createElement(currentModuleData.icon, {
                      size: 20,
                      className:
                        "text-white animate-pulse p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg",
                    })}
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                </div>
                <p className="text-gray-600 flex items-center gap-2 animate-slideInLeft">
                  <Activity size={14} className="text-blue-500 animate-bounce" />
                  Selamat datang di Dashboard Administrasi BEM
                </p>
              </div>
            </div>
            {/* ...kontrol lainnya tetap sama... */}
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            {/* background pattern */}
          </div>
          <div className="relative z-10 animate-fadeInUp">{children}</div>
        </main>
      </div>
    </div>
  );
}
