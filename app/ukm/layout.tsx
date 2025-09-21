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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModule, setActiveModule] = useState("dashboard");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // ✅ Simpan preferensi ke localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userStr = sessionStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (!token || !user) {
      router.push("/ukm/dashboard");
      return;
    }

    if (user.position !== "ukm") {
      if (user.position === "student") router.push("/student/home");
      else if (user.position === "lecturer") router.push("/lecturer/home");
      else router.push("/");
    }
  }, [router]);

  // Auto detect active module
  useEffect(() => {
    const currentPath = window.location.pathname;
    const currentModule =
      menuItems.find((item) => currentPath.startsWith(item.path))?.key ||
      "dashboard";
    setActiveModule(currentModule);
  }, []);

  // Close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentModuleData = menuItems.find((item) => item.key === activeModule);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 dark:border-gray-700 sticky top-0 z-40">
          <div className="p-6 flex justify-between items-center">
            {/* Title */}
            <div className="flex items-center gap-4">
              <div className="animate-fadeInUp">
                <div className="flex items-center gap-3 mb-1">
                  {currentModuleData?.icon &&
                    React.createElement(currentModuleData.icon, {
                      size: 20,
                      className:
                        "text-white animate-pulse p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg",
                    })}
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent dark:from-white dark:via-blue-200 dark:to-white">
                    Dashboard
                  </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-300 flex items-center gap-2 animate-slideInLeft">
                  <Activity size={14} className="text-blue-500 animate-bounce" />
                  Selamat datang di Dashboard Administrasi BEM
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 animate-fadeInDown">
              {/* Search */}
              <div className="relative group">
                <Search
                  className={`absolute left-3 top-1/2 -translate-y-1/2 transition-all duration-300 ${
                    isSearchFocused
                      ? "text-blue-500 scale-110"
                      : "text-gray-400 dark:text-gray-500"
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
                  className={`pl-10 pr-4 py-2.5 border-2 rounded-lg w-64 transition-all duration-300 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500
                    ${isSearchFocused
                      ? "border-blue-500 ring-2 ring-blue-200 shadow-lg scale-105"
                      : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"
                  }`}
                />
              </div>

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 group"
                title={isDarkMode ? "Light Mode" : "Dark Mode"}
              >
                {isDarkMode ? (
                  <Sun
                    size={18}
                    className="text-yellow-400 group-hover:rotate-180 transition-transform duration-500"
                  />
                ) : (
                  <Moon
                    size={18}
                    className="text-gray-600 dark:text-gray-200 group-hover:rotate-12 transition-transform duration-300"
                  />
                )}
              </button>

              {/* Notifications */}
              <button className="relative p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 group">
                <Bell size={18} className="text-gray-600 dark:text-gray-200 group-hover:animate-swing" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                    {notifications}
                  </span>
                )}
              </button>

              {/* Settings */}
              <Link href="/settings">
                <button className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-110 group">
                  <Settings size={18} className="text-gray-600 dark:text-gray-200 group-hover:rotate-180 transition-transform duration-500" />
                </button>
              </Link>

              {/* User Menu */}
              {/* ... tetap sama, tinggal tambah dark: pada warna teks/bg */}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/30 dark:from-gray-900/50 dark:to-gray-800/30 relative">
          <div className="relative z-10 animate-fadeInUp">{children}</div>
        </main>
      </div>
    </div>
  );
}
