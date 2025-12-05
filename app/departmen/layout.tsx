"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Sidebar from "./Sidebar";
import { useRouter } from "next/navigation";
import { User, Bell, Settings, ChevronDown } from "lucide-react";
import { menuItems } from "@/constants/data";

interface Notification {
  id: number;
  title: string;
  message: string;
  created_at: string;
  is_read?: boolean;
}

interface MenuEntry {
  key: string;
  path: string;
  label: string;
}

interface MenuSection {
  key: string;
  label: string;
  children: MenuEntry[];
}

type MenuItem = MenuEntry | MenuSection;

export default function DepartemenLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeModule, setActiveModule] = useState("dashboard");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [associationData, setAssociationData] = useState<any | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  const dropdownRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [organisasiId, setOrganisasiId] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    setToken(stored);
    const stored1 = sessionStorage.getItem("username");
    setUsername(stored1);
    const stored2 = sessionStorage.getItem("organization");
    setOrganisasiId(stored2);
  }, []);

  // Ambil data organisasi
  useEffect(() => {
    if (organisasiId && token) {
      fetch(`${API_URL}/student/associations/${organisasiId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setAssociationData(data))
        .catch((err) => console.error("Gagal ambil data organisasi:", err));
    }
  }, [organisasiId, router]);

  // Ambil notifikasi
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
        is_read: n.is_read || false,
      }));
      setNotifications(mapped);
    } catch (err) {
      console.error("Gagal ambil notifikasi:", err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [username]);

  const unreadCount = notifications.filter((n) => !n.is_read).length;

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

  const handleLogout = () => {
    sessionStorage.clear();
    router.push("/auth/login");
  };

  const orgLogo = associationData?.data?.image || null;
  const orgName = associationData?.data?.name || null;

  // Deteksi modul aktif
  useEffect(() => {
    const currentPath = window.location.pathname;
    const flatItems: MenuEntry[] = (menuItems as MenuItem[])
      .flatMap((item) => ("children" in item ? item.children : [item]))
      .filter((i): i is MenuEntry => "path" in i);

    const currentModule =
      flatItems.find((item) => currentPath.startsWith(item.path))?.key || "dashboard";
    setActiveModule(currentModule);
  }, []);

  // Close dropdown saat klik di luar
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50 sticky top-0 z-40">
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center gap-4 animate-fadeInUp">
              {orgLogo && (
                <img
                  src={`${IMAGE_URL}/departments/${orgLogo}`}
                  alt="Logo Organisasi"
                  className="w-16 h-16 rounded-full shadow-md"
                />
              )}
              <div>
                <h1 className="hidden sm:block text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                  Dashboard
                </h1>
                <p className="hidden sm:block text-gray-600">
                  Selamat datang di Dashboard {orgName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Notification Dropdown */}
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

                {/* Dropdown Notifikasi - FIXED & HIGH Z-INDEX */}
                {showNotifDropdown && (
                  <div
                    className="fixed right-4 top-20 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-[9999] transform translate-y-2 transition-all duration-300 ease-out"
                    style={{ animation: 'slideDown 0.3s ease-out' }}
                  >
                    {notifications.length === 0 ? (
                      <p className="text-gray-500 text-sm px-4 py-2">Tidak ada notifikasi</p>
                    ) : (
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notif) => (
                          <div
                            key={notif.id}
                            className={`px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors ${
                              !notif.is_read ? "bg-blue-50/50" : ""
                            }`}
                            onClick={() => markAsRead(notif.id)}
                          >
                            <p className={`font-medium text-gray-800 text-sm ${notif.is_read ? "line-through text-gray-400" : ""}`}>
                              {notif.title}
                            </p>
                            <p className="text-gray-600 text-xs mt-1">{notif.message}</p>
                            <p className="text-gray-400 text-xs mt-1">
                              {new Date(notif.created_at).toLocaleString("id-ID", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* User Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 group"
                >
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                      <User size={18} className="text-white" />
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-300 ${
                      showUserDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown User - FIXED & HIGH Z-INDEX */}
                {showUserDropdown && (
                  <div
                    className="fixed right-4 top-20 w-48 bg-white rounded-lg shadow-2xl border border-gray-200 py-2 z-[9999] transform translate-y-2 transition-all duration-300 ease-out"
                    style={{ animation: 'slideDown 0.3s ease-out' }}
                  >
                    <Link href="/departmen/profile">
                      <div className="px-4 py-2 hover:bg-blue-50 transition-colors flex items-center gap-3 group">
                        <User size={16} className="text-gray-500 group-hover:text-blue-600" />
                        <span className="text-gray-700 group-hover:text-blue-600">Profile</span>
                      </div>
                    </Link>
                    <Link href="/settings">
                      <div className="px-4 py-2 hover:bg-blue-50 transition-colors flex items-center gap-3 group">
                        <Settings size={16} className="text-gray-500 group-hover:text-blue-600" />
                        <span className="text-gray-700 group-hover:text-blue-600">Settings</span>
                      </div>
                    </Link>
                    <div className="border-t border-gray-200 my-2"></div>
                    <button
                      className="w-full px-4 py-2 text-left hover:bg-red-50 transition-colors text-red-600 hover:text-red-700"
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

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-gray-50/50 to-blue-50/30 relative">
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