"use client";

import React, { useState } from "react";
import { 
  Plus, Search, Home, Save, Sparkles, BarChart3, 
  Users, BookOpen, GraduationCap, Calendar, 
  Building, Award, Settings, Bell, User,
  TrendingUp, Activity, Clock, Star,
  ChevronRight, Zap, Target, Globe
} from "lucide-react";

// Mock data untuk demo
const staticData = {
  mahasiswa: Array.from({length: 1250}, (_, i) => ({ id: i + 1, name: `Mahasiswa ${i + 1}` })),
  dosen: Array.from({length: 85}, (_, i) => ({ id: i + 1, name: `Dosen ${i + 1}` })),
  mata_kuliah: Array.from({length: 120}, (_, i) => ({ id: i + 1, name: `Mata Kuliah ${i + 1}` })),
  kelas: Array.from({length: 45}, (_, i) => ({ id: i + 1, name: `Kelas ${i + 1}` })),
  fakultas: Array.from({length: 8}, (_, i) => ({ id: i + 1, name: `Fakultas ${i + 1}` })),
  prestasi: Array.from({length: 67}, (_, i) => ({ id: i + 1, name: `Prestasi ${i + 1}` }))
};

const menuItems = [
  { key: "mahasiswa", label: "Mahasiswa", icon: GraduationCap },
  { key: "dosen", label: "Dosen", icon: Users },
  { key: "mata_kuliah", label: "Mata Kuliah", icon: BookOpen },
  { key: "kelas", label: "Kelas", icon: Calendar },
  { key: "fakultas", label: "Fakultas", icon: Building },
  { key: "prestasi", label: "Prestasi", icon: Award }
];

const DashboardPage = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Buat statistik dinamis dari semua data di staticData
  const getDashboardStats = () => {
    return Object.keys(staticData).map((key) => {
      const menuItem = menuItems.find((item) => item.key === key);
      return {
        key,
        label: menuItem?.label || key,
        count: staticData[key as keyof typeof staticData].length,
        icon: menuItem?.icon || Home,
      };
    });
  };

  const handleAdd = (key: string) => {
    setModalMode("add");
    setShowModal(true);
  };

  const handleSave = () => {
    console.log("Save clicked");
    setShowModal(false);
  };

  // Quick actions data
  const quickActions = [
    { label: "Tambah Mahasiswa", icon: GraduationCap, color: "from-emerald-500 to-emerald-600", action: () => handleAdd("mahasiswa") },
    { label: "Jadwal Hari Ini", icon: Calendar, color: "from-purple-500 to-purple-600", action: () => setActiveModule("kelas") },
    { label: "Laporan Akademik", icon: BarChart3, color: "from-orange-500 to-orange-600", action: () => {} },
    { label: "Pengaturan", icon: Settings, color: "from-gray-500 to-gray-600", action: () => {} }
  ];

  // Recent activities
  const recentActivities = [
    { icon: Users, text: "5 mahasiswa baru mendaftar", time: "2 jam lalu", color: "text-blue-600" },
    { icon: Award, text: "Prestasi lomba coding ditambahkan", time: "4 jam lalu", color: "text-green-600" },
    { icon: BookOpen, text: "3 mata kuliah baru dibuka", time: "1 hari lalu", color: "text-purple-600" },
    { icon: Building, text: "Fakultas Teknik diperbarui", time: "2 hari lalu", color: "text-orange-600" }
  ];

  return (
    <div className="flex-1 overflow-hidden bg-gray-50">
    

      {/* Main Content */}
      <main className="p-6 overflow-y-auto">
        {activeModule === "dashboard" ? (
          <div className="space-y-8">
            {/* Welcome Card */}
            <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles className="text-yellow-300" size={28} />
                    <span className="text-yellow-300 font-medium">Selamat Datang</span>
                  </div>
                  <h2 className="text-4xl font-bold mb-3">Dashboard Admin</h2>
                  <p className="text-blue-100 text-lg mb-6">
                    Kelola semua data universitas dengan mudah dan efisien ✨
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
                      <Activity className="text-green-300" size={16} />
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
                    <Target size={60} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-300" />
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
                    className={`bg-gradient-to-r ${action.color} text-white p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group`}
                  >
                    <Icon size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium">{action.label}</p>
                  </button>
                );
              })}
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getDashboardStats().map((stat, i) => {
                const Icon = stat.icon;
                const colors = [
                  "from-blue-500 to-blue-600",
                  "from-green-500 to-green-600", 
                  "from-purple-500 to-purple-600",
                  "from-orange-500 to-orange-600",
                  "from-pink-500 to-pink-600",
                  "from-indigo-500 to-indigo-600"
                ];
                return (
                  <div
                    key={stat.key}
                    onClick={() => setActiveModule(stat.key)}
                    className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 cursor-pointer group hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gray-50 rounded-full -translate-y-12 translate-x-12 group-hover:bg-gray-100 transition-colors"></div>
                    
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`p-3 rounded-2xl bg-gradient-to-r ${colors[i % colors.length]} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                          <Icon size={24} />
                        </div>
                        <div className="flex items-center text-gray-400 group-hover:text-blue-600 transition-colors">
                          <TrendingUp size={16} className="mr-1" />
                          <span className="text-xs">+12%</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                          {stat.label}
                        </h3>
                        <div className="flex items-center justify-between">
                          <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                            {stat.count}
                          </p>
                          <ChevronRight size={20} className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-xs text-gray-500">Total data tersimpan</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl">
                  <Activity size={20} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Aktivitas Terbaru</h3>
                <Star className="text-yellow-500 ml-auto" size={20} />
              </div>
              
              <div className="space-y-4">
                {recentActivities.map((activity, i) => {
                  const Icon = activity.icon;
                  return (
                    <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group">
                      <div className={`p-2 rounded-xl bg-gray-100 group-hover:scale-110 transition-transform ${activity.color}`}>
                        <Icon size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{activity.text}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <Clock size={12} />
                          {activity.time}
                        </p>
                      </div>
                      <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Modul {activeModule}</h2>
              <p className="text-gray-600">Konten untuk modul ini sedang dalam pengembangan</p>
              <button
                onClick={() => setActiveModule("dashboard")}
                className="mt-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
              >
                <Home size={16} />
                Kembali ke Dashboard
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Enhanced Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl">
                  <Plus size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    {modalMode === "add" ? "Tambah Data Baru" : "Edit Data"}
                  </h3>
                  <p className="text-blue-100 text-sm">Lengkapi formulir di bawah ini</p>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-600">📋 Formulir isi data akan ditampilkan di sini</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 border-t border-gray-200 p-6 bg-gray-50">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-white transition-colors flex items-center gap-2"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Save size={16} />
                Simpan Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;