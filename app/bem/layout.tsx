"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import {
  Bell,
  ChevronDown,
  LogOut,
  Search,
  Settings,
  Sun,
  Moon,
  User as UserIcon,
  Check,
} from "lucide-react";
import { menuItems } from "@/constants/data";
import axios from "axios";

interface Notification {
  id: number;
  title: string;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [openNotif, setOpenNotif] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [loadingNotif, setLoadingNotif] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const stored = sessionStorage.getItem("username");
    setUsername(stored);
    const stored1 = sessionStorage.getItem("token");
    setToken(stored1);
  }, []);

  // Ambil semua notifikasi
  const fetchNotifications = async () => {
    if (!token || !username) return;
    try {
      const res = await fetch(`${API_URL}/student/notifications/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      const mapped: Notification[] = (data.notifications || []).map((n: any) => ({
        id: n.id,
        title: n.title,
        message: n.message,
        created_at: n.created_at,
        is_read: n.is_read || false, // default false
      }));
      setNotifications(mapped);
    } catch (err) {
      console.error("Gagal ambil notifikasi:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [username]);

  // Hitung badge unread
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  // Tandai notifikasi sudah dibaca dan buat UserNotification
  const markAsRead = async (notificationID: number) => {
    if (!username || !token) return;
    try {
      await fetch(
        `${API_URL}/student/notifications/${username}/${notificationID}/read`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationID ? { ...n, is_read: true } : n))
      );
    } catch (err) {
      console.error("Gagal menandai notifikasi:", err);
    }
  };

  // ====== Mode sidebar dan route aktif ======
  useEffect(() => {
    if (!pathname) return;
    const current =
      (menuItems as any[])
        .filter((i) => typeof i?.path === "string")
        .find((i) => pathname.startsWith(i.path))?.key || "dashboard";
    setActiveModule(current);
    setOpenNotif(false);
    setOpenUser(false);
  }, [pathname]);

  // ====== Theme (persist) ======
  useEffect(() => {
    const saved = localStorage.getItem("adm-theme-dark");
    const flag = saved ? JSON.parse(saved) : false;
    setIsDarkMode(!!flag);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("adm-theme-dark", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  // ====== Click outside handler ======
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setOpenNotif(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setOpenUser(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ====== Data modul aktif ======
  const currentModuleData = useMemo(
    () => (menuItems as any[]).find((i) => i?.key === activeModule),
    [activeModule]
  );

  // ====== Logout ======
  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/auth/login");
  };


  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 z-20 border-b border-slate-200/70 dark:border-slate-800/70">
          <div className="bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between px-4 sm:px-6 py-3">
              {/* Left: Search */}
              <div className="hidden md:flex animate-fadeInUp">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                  
                </h1>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-1 sm:gap-2">
                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                  <button
                    onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                    className="relative p-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-110 group"
                  >
                    <Bell size={18} className="text-gray-600 group-hover:animate-swing" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse shadow-lg">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  {showNotifDropdown && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto animate-slideInDown">
                      {notifications.length === 0 && (
                        <p className="text-gray-500 text-sm px-4 py-2">Tidak ada notifikasi</p>
                      )}
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors duration-200 ${!notif.is_read ? "bg-blue-50/50" : "bg-white"
                            }`}
                          onClick={() => markAsRead(notif.id)}
                        >
                          <p className={`font-medium text-gray-800 ${notif.is_read ? "line-through text-gray-400" : ""}`}>
                            {notif.title}
                          </p>
                          <p className="text-gray-600 text-sm">{notif.message}</p>
                          <p className="text-gray-400 text-xs mt-1">
                            {new Date(notif.created_at).toLocaleString("id-ID", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                              second: "2-digit",
                              hour12: false
                            })}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* User */}
                <div className="relative" ref={userRef}>
                  <button
                    onClick={() => setOpenUser((v) => !v)}
                    className="flex items-center gap-2 rounded-full py-1 pr-2 pl-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <div className="h-9 w-9 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden flex items-center justify-center">
                      <UserIcon className="h-5 w-5 text-slate-700 dark:text-slate-200" />
                    </div>
                    <ChevronDown className={`h-4 w-4 transition ${openUser ? "rotate-180" : ""}`} />
                  </button>

                  {openUser && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xl overflow-hidden">
                      <Link
                        href="/profile"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/40"
                      >
                        <UserIcon className="h-4 w-4" />
                        Profile
                      </Link>
                      <Link
                        href="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/40"
                      >
                        <Settings className="h-4 w-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2 px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-screen-2xl mx-auto">
            <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 shadow-sm p-4 md:p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
