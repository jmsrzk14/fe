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
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [himpunanCount, setHimpunanCount] = useState<number | null>(null);
  const [newsCount, setNewsCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [mahasiswaCount, setMahasiswaCount] = useState<number | null>(null);
  const [uKMCount, setUKMCount] = useState<number | null>(null);
  const [departmentCount, setDepartmentCount] = useState<number | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [announcementCount, setAnnouncementCount] = useState<number | null>(
    null
  );
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
      const stored = sessionStorage.getItem("token");
      setToken(stored);
    }, []);

  // ✅ Ambil data Himpunan Mahasiswa dari API
  useEffect(() => {
    const fetchMahasiswaCount = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/admin/students?page=1&per_page=1`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const json: ApiResponse = await res.json();
        setMahasiswaCount(json.metadata.total_items || 0);
      } catch (error) {
        console.error("Gagal memuat jumlah himpunan:", error);
        setMahasiswaCount(0);
      } finally {
        setLoading(false);
      }
    };
    const fetchHimpunanCount = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/admin/association?page=1&per_page=1`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const json: ApiResponse = await res.json();
        setHimpunanCount(json.metadata.total_items || 0);
      } catch (error) {
        console.error("Gagal memuat jumlah himpunan:", error);
        setHimpunanCount(0);
      } finally {
        setLoading(false);
      }
    };

    const fetchUKMCount = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/admin/clubs?page=1&per_page=1`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const json: ApiResponse = await res.json();
        setUKMCount(json.metadata.total_items || 0);
      } catch (error) {
        console.error("Gagal memuat jumlah himpunan:", error);
        setUKMCount(0);
      } finally {
        setLoading(false);
      }
    };
    const fetchDepartmentCount = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/admin/department?page=1&per_page=1`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const json: ApiResponse = await res.json();
        setDepartmentCount(json.metadata.total_items || 0);
      } catch (error) {
        console.error("Gagal memuat jumlah himpunan:", error);
        setDepartmentCount(0);
      } finally {
        setLoading(false);
      }
    };

    const fetchNewsCount = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/admin/news?page=1&per_page=1`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const json: ApiResponse = await res.json();
        setNewsCount(json.metadata.total_items || 0);
      } catch (error) {
        console.error("Gagal memuat jumlah Berita:", error);
        setNewsCount(0);
      } finally {
        setLoading(false);
      }
    };
    const fetchAnnouncementCount = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${API_URL}/admin/announcement?page=1&per_page=1`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);

        const json: ApiResponse = await res.json();
        setAnnouncementCount(json.metadata.total_items || 0);
      } catch (error) {
        console.error("Gagal memuat jumlah Berita:", error);
        setAnnouncementCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchHimpunanCount();
    fetchNewsCount();
    fetchMahasiswaCount();
    fetchUKMCount();
    fetchDepartmentCount();
    fetchAnnouncementCount();
  }, []);

  const getDashboardStats = () => {
    return [
      {
        key: "mahasiswa",
        label: "Mahasiswa",
        count: mahasiswaCount ?? 0,
        icon: GraduationCap,
      },
      {
        key: "himpunan_mahasiswa",
        label: "Himpunan Mahasiswa",
        count: himpunanCount ?? 0,
        icon: Users,
      },
      {
        key: "unit_kegiatan_mahasiswa",
        label: "Unit Kegiatan Mahasiswa",
        count: uKMCount ?? 0,
        icon: BookOpen,
      },
      {
        key: "departemen",
        label: "Departemen",
        count: departmentCount ?? 0,
        icon: Calendar,
      },
      {
        key: "pengumuman",
        label: "Pengumuman",
        count: announcementCount ?? 0,
        icon: Building,
      },
      {
        key: "berita",
        label: "Berita",
        count: newsCount ?? 0,
        icon: Award,
      },
    ];
  };

  const quickActions = [
    {
      label: "Tambah Mahasiswa",
      icon: GraduationCap,
      color: "from-emerald-500 to-emerald-600",
      action: () => setShowModal(true),
    },
    {
      label: "Jadwal Hari Ini",
      icon: Calendar,
      color: "from-purple-500 to-purple-600",
      action: () => setActiveModule("kelas"),
    },
    {
      label: "Laporan Akademik",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      action: () => {},
    },
    {
      label: "Pengaturan",
      icon: Settings,
      color: "from-gray-500 to-gray-600",
      action: () => {},
    },
  ];

  return (
    <div className="flex-1 overflow-hidden bg-gray-50">
      <main className="p-6 overflow-y-auto">
        {activeModule === "dashboard" ? (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="hidden md:flex items-center gap-2 mb-3">
                    <span className="text-yellow-300 font-midfielder">Selamat Datang</span>
                  </div>
                  <h2 className="text-xl md:text-4xl font-midfielder mb-3">Dashboard Kemahasiswaan</h2>
                  <p className="hidden md:flex text-blue-100 text-lg mb-6">
                    Kelola semua data dengan mudah dan efisien 
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                      <span>Sistem Aktif</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                      <Clock size={16} />
                      <span>Update Terbaru</span>
                    </div>
                  </div>
                </div>
                <div className="hidden md:flex items-center">
                  <div className="relative">
                    <Zap size={120} className="text-white/10 animate-pulse" />
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
                    onClick={action.action}
                    className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-2xl shadow-lg hover:scale-105 transition`}
                  >
                    <Icon size={24} className="mb-2" />
                    <p className="text-sm font-medium">{action.label}</p>
                  </button>
                );
              })}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getDashboardStats().map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.key}
                    onClick={() => {
                      if (stat.key === "himpunan_mahasiswa") {
                        router.push("/admin/himpunan"); // 🔥 pindah ke halaman admin/himpunan
                      } else if (stat.key === "berita") {
                        router.push("/admin/news"); // opsional, kalau nanti kamu mau buat halaman berita juga
                      } else if (stat.key === "unit_kegiatan_mahasiswa") {
                        router.push("/admin/ukm"); // opsional, kalau nanti kamu mau buat halaman berita juga
                      } else if (stat.key === "pengumuman") {
                        router.push("/admin/announcement"); // opsional, kalau nanti kamu mau buat halaman berita juga
                      } else if (stat.key === "departemen") {
                        router.push("/admin/department"); // opsional, kalau nanti kamu mau buat halaman berita juga
                      } else if (stat.key === "mahasiswa") {
                        router.push("/admin/mahasiswa"); // opsional, kalau nanti kamu mau buat halaman berita juga
                      } else {
                        setActiveModule(stat.key);
                      }
                    }}
                    className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 cursor-pointer hover:shadow-xl transition transform hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-600 text-white rounded-2xl">
                        <Icon size={24} />
                      </div>
                      <TrendingUp size={16} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">
                      {stat.label}
                    </h3>
                    <p className="text-3xl font-bold text-gray-900">
                      {loading && stat.key === "himpunan_mahasiswa"
                        ? "..."
                        : stat.count}
                    </p>
                    <p className="text-xs text-gray-500">
                      Total data tersimpan
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Modul {activeModule}
            </h2>
            <p className="text-gray-600 mb-4">
              Konten untuk modul ini sedang dalam pengembangan.
            </p>
            <button
              onClick={() => setActiveModule("dashboard")}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition"
            >
              <Home size={16} className="inline mr-2" />
              Kembali ke Dashboard
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
