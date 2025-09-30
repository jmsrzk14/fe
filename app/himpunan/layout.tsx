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

  const [associationData, setAssociationData] = useState<any | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const position = sessionStorage.getItem("position");
    const organisasiId = sessionStorage.getItem("organization");
    const userStr = sessionStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (!token || !user) {
      router.push("/himpunan/dashboard");
      return;
    }

    if (!position?.includes("himpunan")) {
      if (user.position === "student") {
        router.push("/student/home");
      } else if (user.position === "lecturer") {
        router.push("/lecturer/home");
      } else {
        router.push("/");
      }
    }

    if (organisasiId && token) {
      fetch(`http://localhost:9090/api/student/associations/${organisasiId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAssociationData(data);
        })
        .catch((err) => console.error("Gagal ambil data organisasi:", err));
    }
  }, [router]);

  const orgLogo = associationData?.data?.image || null;
  const orgName = associationData?.data?.name || null;

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/auth/login");
  };

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
      {/* Sidebar (fixed height, no scroll) */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Layout */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header (fixed, tidak ikut scroll konten) */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
          <div className="p-6 flex justify-between items-center">
            {/* Title & Breadcrumb */}
            <div className="flex items-center gap-4 animate-fadeInUp">
              {orgLogo && (
                <img
                  src={`http://localhost:9090/associations/${orgLogo}`}
                  alt="Logo Organisasi"
                  className="w-16 h-16 rounded-full shadow-md"
                />
              )}
              <div className="animate-fadeInUp">
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                    Dashboard
                  </h1>
                </div>
                <p className="w-90 text-gray-600 flex items-center gap-2 animate-slideInLeft">
                  Selamat datang di Dashboard {orgName}
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 animate-fadeInDown">
              {/* Search */}
              <div className="relative group">
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${isSearchFocused ? "opacity-30" : ""
                    }`}
                ></div>
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${isSearchFocused
                      ? "text-blue-500 scale-110"
                      : "text-gray-400"
                    }`}
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Cari data..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className={`pl-10 pr-4 py-2.5 border-2 rounded-lg w-64 transition-all duration-300 bg-white/50 backdrop-blur-sm ${isSearchFocused
                      ? "border-blue-500 ring-2 ring-blue-200 shadow-lg scale-105"
                      : "border-gray-200 hover:border-gray-300"
                    }`}
                />
                {searchTerm && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Zap size={14} className="text-yellow-500 animate-pulse" />
                  </div>
                )}
              </div>

              {/* Dark Mode */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 group"
                title={isDarkMode ? "Light Mode" : "Dark Mode"}
              >
                {isDarkMode ? (
                  <Sun
                    size={18}
                    className="text-yellow-500 group-hover:rotate-180 transition-transform duration-500"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="text-gray-600 group-hover:rotate-12 transition-transform duration-300"
                  />
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 group">
                <Bell
                  size={18}
                  className="text-gray-600 group-hover:animate-swing"
                />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Settings */}
              <Link href="/settings">
                <button className="p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 group">
                  <Settings
                    size={18}
                    className="text-gray-600 group-hover:rotate-180 transition-transform duration-500"
                  />
                </button>
              </Link>

              {/* User Menu */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <User size={18} className="text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-300 ${showUserDropdown ? "rotate-180" : ""
                      }`}
                  />
                </button>

                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-slideInDown">
                    <Link href="/himpunan/profile">
                      <div className="px-4 py-2 hover:bg-blue-50 transition-colors duration-200 flex items-center gap-3 group">
                        <User
                          size={16}
                          className="text-gray-500 group-hover:text-blue-600"
                        />
                        <span className="text-gray-700 group-hover:text-blue-600">
                          Profile
                        </span>
                      </div>
                    </Link>
                    <Link href="/settings">
                      <div className="px-4 py-2 hover:bg-blue-50 transition-colors duration-200 flex items-center gap-3 group">
                        <Settings
                          size={16}
                          className="text-gray-500 group-hover:text-blue-600"
                        />
                        <span className="text-gray-700 group-hover:text-blue-600">
                          Settings
                        </span>
                      </div>
                    </Link>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button 
                      className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors duration-200 text-red-600 hover:text-red-700"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content (scrollable only here) */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10 animate-fadeInUp">{children}</div>
        </main>
      </div>
    </div>
  );
}
