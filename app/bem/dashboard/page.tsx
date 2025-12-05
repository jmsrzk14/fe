"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Search,
  Home,
  Save,
  Sparkles,
  BarChart3,
  Users,
  BookOpen,
  GraduationCap,
  Calendar,
  Building,
  Award,
  Settings,
  Bell,
  User,
  TrendingUp,
  Activity,
  Clock,
  Star,
  ChevronRight,
  Zap,
  Target,
  Globe,
  Megaphone,
  Eye,
  FileText,
  Coffee,
  Heart,
} from "lucide-react";

interface ApiResponse {
  status: string;
  message: string;
  metadata: {
    total_items: number;
  };
  data: any[];
}

const DashboardPage = () => {
  const router = useRouter();
  const [activeModule, setActiveModule] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  const [aspirasiCount, setAspirasiCount] = useState<number>(0);
  const [newsCount, setNewsCount] = useState<number>(0);
  const [announcementCount, setAnnouncementCount] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    setToken(stored);
  }, []);

  const staticData = {
    berita: Array.from({ length: 10 }, (_, i) => ({ id: i + 1 })),
    ukm: Array.from({ length: 5 }, (_, i) => ({ id: i + 1 })),
    mahasiswa: Array.from({ length: 1250 }, (_, i) => ({ id: i + 1 })),
    mata_kuliah: Array.from({ length: 120 }, (_, i) => ({ id: i + 1 })),
    kelas: Array.from({ length: 45 }, (_, i) => ({ id: i + 1 })),
    fakultas: Array.from({ length: 8 }, (_, i) => ({ id: i + 1 })),
    prestasi: Array.from({ length: 67 }, (_, i) => ({ id: i + 1 })),
  };

  // ✅ Ambil data dari API
  useEffect(() => {
    const fetchData = async (
      url: string,
      setter: (val: number) => void,
      label: string
    ) => {
      try {
        setLoading(true);
        const res = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const json: ApiResponse = await res.json();
        setter(json.metadata.total_items || 0);
      } catch (error) {
        console.error(`Gagal memuat jumlah ${label}:`, error);
        setter(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData(
      `${API_URL}/admin/aspirations?page=1&per_page=1`,
      setAspirasiCount,
      "aspirasi"
    );
    fetchData(
      `${API_URL}/admin/news?page=1&per_page=1`,
      setNewsCount,
      "berita"
    );
    fetchData(
      `${API_URL}/admin/announcement?page=1&per_page=1`,
      setAnnouncementCount,
      "pengumuman"
    );
  }, []);

  // ✅ Statistik utama (didefinisikan setelah state agar bisa akses data)
  const getEnhancedStats = () => [
    {
      key: "pengumuman",
      label: "Pengumuman",
      count: announcementCount,
      icon: Megaphone,
      color: "bg-yellow-500",
      trend: "+12%",
      description: "Pengumuman aktif",
    },
    {
      key: "berita",
      label: "Berita",
      count: newsCount || staticData.berita.length,
      icon: FileText,
      color: "bg-purple-500",
      trend: "+15%",
      description: "Artikel terbaru",
    },
    {
      key: "aspirasi",
      label: "Aspirasi",
      count: staticData.ukm.length,
      icon: BookOpen,
      color: "bg-red-500",
      trend: "+3%",
      description: "Unit kegiatan",
    },
  ];

  // ✅ Quick Actions
  const quickActions = [
    {
      label: "Pengumuman",
      icon: Megaphone,
      bgColor: "bg-blue-500 hover:bg-blue-600",
      path: "/bem/announcement",
    },
    {
      label: "Berita",
      icon: GraduationCap,
      bgColor: "bg-yellow-500 hover:bg-yellow-600",
      path: "bem/news",
    },
    {
      label: "Aspirasi",
      icon: Users,
      bgColor: "bg-blue-600 hover:bg-blue-700",
      path: "/bem/aspirasi",
    },
    {
      label: "Profile",
      icon: Settings,
      bgColor: "bg-yellow-600 hover:bg-yellow-700",
      path: "/bem/profile",
    },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes wiggle {
          0%,
          7% {
            transform: rotateZ(0);
          }
          15% {
            transform: rotateZ(-15deg);
          }
          20% {
            transform: rotateZ(10deg);
          }
          25% {
            transform: rotateZ(-10deg);
          }
          30% {
            transform: rotateZ(6deg);
          }
          35% {
            transform: rotateZ(-4deg);
          }
          40%,
          100% {
            transform: rotateZ(0);
          }
        }
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
      `}</style>

      <div className="flex-1 overflow-hidden bg-blue-50">
        <main className="p-6 overflow-y-auto">
          {activeModule === "dashboard" ? (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="relative bg-blue-500 rounded-3xl p-8 text-white shadow-2xl overflow-hidden animate-fade-in-up">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-400 opacity-20 rounded-full -translate-y-32 translate-x-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 opacity-20 rounded-full translate-y-24 -translate-x-24"></div>

                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3 animate-bounce-slow">
                      <Sparkles className="text-yellow-300 animate-wiggle" size={28} />
                      <span className="text-yellow-300 font-medium">Selamat Datang di</span>
                    </div>
                    <h2 className="text-4xl font-bold mb-3 text-white">Dashboard BEM IT Del</h2>
                    <p className="text-blue-100 text-lg mb-6">
                      Kelola semua kegiatan MPM dengan mudah dan efisien 🎯
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded-full">
                        <Activity className="text-white animate-bounce-slow" size={16} />
                        <span>Sistem Aktif</span>
                      </div>
                      <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                        <Clock size={16} />
                        <span>Update Terbaru</span>
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center animate-float">
                    <div className="relative">
                      <div className="w-32 h-32 bg-yellow-300 rounded-full flex items-center justify-center animate-bounce-slow">
                        <Heart size={60} className="text-blue-600" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => router.push(action.path)} // ✅ ini ganti setActiveModule jadi routing
                      className={`${action.bgColor} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
                    >
                      <Icon
                        size={28}
                        className="mb-3 group-hover:animate-wiggle mx-auto"
                      />
                      <p className="text-sm font-semibold">{action.label}</p>
                    </button>
                  );
                })}
              </div>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getEnhancedStats().map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.key}
                      className="bg-white p-6 rounded-3xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg`}
                        >
                          <Icon size={24} />
                        </div>
                        <div className="flex items-center text-blue-400">
                          <TrendingUp size={16} className="mr-1" />
                          <span className="text-xs font-semibold">
                            {stat.trend}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-blue-900">
                        {stat.label}
                      </h3>
                      <p className="text-3xl font-bold text-blue-600">
                        {stat.count}
                      </p>
                      <p className="text-xs text-blue-500">
                        {stat.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-blue-100 text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-blue-900 mb-2">
                Modul {activeModule}
              </h2>
              <p className="text-blue-600 mb-6">
                Konten untuk modul ini sedang dalam pengembangan
              </p>
              <button
                onClick={() => setActiveModule("dashboard")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 flex items-center gap-2 mx-auto"
              >
                <Home size={16} />
                Kembali ke Dashboard
              </button>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default DashboardPage;
