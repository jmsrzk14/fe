"use client";

import React, { useState } from "react";
import { 
  Plus, Search, Home, Save, Sparkles, BarChart3, 
  Users, BookOpen, GraduationCap, Calendar, 
  Building, Award, Settings, Bell, User,
  TrendingUp, Activity, Clock, Star,
  ChevronRight, Zap, Target, Globe, Megaphone,
  Eye, FileText, Coffee, Heart
} from "lucide-react";
import { staticData } from "@/constants/data";

// Enhanced statistics calculation
const getEnhancedStats = () => {
  return [
    {
      key: "mahasiswa",
      label: "Total Mahasiswa",
      count: staticData.mahasiswa.length,
      icon: GraduationCap,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      trend: "+5%",
      description: "Mahasiswa aktif"
    },
    {
      key: "pengumuman",
      label: "Pengumuman",
      count: staticData.pengumuman.length,
      icon: Megaphone,
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
      trend: "+12%",
      description: "Pengumuman aktif"
    },
    {
      key: "himpunan",
      label: "Himpunan",
      count: staticData.himpunan.length,
      icon: Users,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      trend: "+8%",
      description: "Organisasi mahasiswa"
    },
    {
      key: "berita",
      label: "Berita",
      count: staticData.berita.length,
      icon: FileText,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      trend: "+15%",
      description: "Artikel terbaru"
    },
    {
      key: "ukm",
      label: "UKM Aktif",
      count: staticData.ukm.length,
      icon: BookOpen,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
      trend: "+3%",
      description: "Unit kegiatan"
    },
    {
      key: "galeri",
      label: "Galeri",
      count: staticData.galeri.length,
      icon: Eye,
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
      trend: "+20%",
      description: "Dokumentasi kegiatan"
    }
  ];
};

const DashboardPage = () => {
  const [activeModule, setActiveModule] = useState("dashboard");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = (key: string) => {
    setModalMode("add");
    setShowModal(true);
  };

  const handleSave = () => {
    console.log("Save clicked");
    setShowModal(false);
  };

  // Quick actions dengan design blue-yellow theme
  const quickActions = [
    { 
      label: "Buat Pengumuman", 
      icon: Megaphone, 
      bgColor: "bg-blue-500 hover:bg-blue-600", 
      action: () => handleAdd("pengumuman") 
    },
    { 
      label: "Data Mahasiswa", 
      icon: GraduationCap, 
      bgColor: "bg-yellow-500 hover:bg-yellow-600", 
      action: () => setActiveModule("mahasiswa") 
    },
    { 
      label: "Kelola Himpunan", 
      icon: Users, 
      bgColor: "bg-blue-600 hover:bg-blue-700", 
      action: () => setActiveModule("himpunan") 
    },
    { 
      label: "Pengaturan", 
      icon: Settings, 
      bgColor: "bg-yellow-600 hover:bg-yellow-700", 
      action: () => {} 
    }
  ];

  // Recent activities
  const recentActivities = [
    { 
      icon: Megaphone, 
      text: "Pengumuman baru: Pendaftaran Anggota BEM", 
      time: "2 jam lalu", 
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    { 
      icon: Users, 
      text: "5 mahasiswa baru bergabung ke HIMATIKA", 
      time: "4 jam lalu", 
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    { 
      icon: FileText, 
      text: "Artikel baru dipublikasikan", 
      time: "1 hari lalu", 
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    { 
      icon: Calendar, 
      text: "Event workshop coding dijadwalkan", 
      time: "2 hari lalu", 
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <>
      <style jsx>{`
        @keyframes wiggle {
          0%, 7% { transform: rotateZ(0); }
          15% { transform: rotateZ(-15deg); }
          20% { transform: rotateZ(10deg); }
          25% { transform: rotateZ(-10deg); }
          30% { transform: rotateZ(6deg); }
          35% { transform: rotateZ(-4deg); }
          40%, 100% { transform: rotateZ(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
      `}</style>

      <div className="flex-1 overflow-hidden bg-blue-50">
        {/* Main Content */}
        <main className="p-6 overflow-y-auto">
          {activeModule === "dashboard" ? (
            <div className="space-y-8">
              {/* Welcome Card dengan Blue Theme */}
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
                      Kelola semua kegiatan BEM dengan mudah dan efisien 🎯
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

              {/* Quick Actions dengan Blue-Yellow Theme */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
                {quickActions.map((action, i) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={i}
                      onClick={action.action}
                      className={`${action.bgColor} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-fade-in-up`}
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <Icon size={28} className="mb-3 group-hover:animate-wiggle transition-transform mx-auto" />
                      <p className="text-sm font-semibold">{action.label}</p>
                    </button>
                  );
                })}
              </div>

              {/* Main Stats Grid dengan design yang konsisten */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getEnhancedStats().map((stat, i) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.key}
                      onClick={() => setActiveModule(stat.key)}
                      className="bg-white p-6 rounded-3xl shadow-lg border border-blue-100 cursor-pointer group hover:shadow-xl hover:border-yellow-300 transition-all duration-300 hover:scale-105 relative overflow-hidden animate-fade-in-up"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -translate-y-12 translate-x-12 group-hover:bg-yellow-50 transition-colors"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-3 rounded-2xl ${stat.color} text-white shadow-lg group-hover:animate-bounce-slow transition-transform`}>
                            <Icon size={24} />
                          </div>
                          <div className="flex items-center text-blue-400 group-hover:text-yellow-600 transition-colors">
                            <TrendingUp size={16} className="mr-1" />
                            <span className="text-xs font-semibold">{stat.trend}</span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-lg font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
                            {stat.label}
                          </h3>
                          <div className="flex items-center justify-between">
                            <p className="text-3xl font-bold text-blue-600">
                              {stat.count}
                            </p>
                            <ChevronRight size={20} className="text-blue-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all" />
                          </div>
                          <p className="text-xs text-blue-500">{stat.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Recent Activities dengan design yang diperbaiki */}
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-blue-100 hover:border-yellow-300 transition-colors animate-fade-in-up">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500 text-white rounded-xl animate-bounce-slow">
                    <Activity size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-900">Aktivitas Terbaru</h3>
                  <Star className="text-yellow-500 ml-auto animate-wiggle" size={20} />
                </div>
                
                <div className="space-y-4">
                  {recentActivities.map((activity, i) => {
                    const Icon = activity.icon;
                    return (
                      <div 
                        key={i} 
                        className="flex items-center gap-4 p-4 rounded-2xl border border-blue-100 hover:border-yellow-300 hover:bg-blue-50 transition-all group animate-fade-in-up"
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <div className={`p-3 rounded-xl ${activity.bgColor} group-hover:animate-bounce-slow transition-transform`}>
                          <Icon size={18} className={activity.color} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-blue-900">{activity.text}</p>
                          <p className="text-sm text-blue-500 flex items-center gap-1">
                            <Clock size={12} />
                            {activity.time}
                          </p>
                        </div>
                        <ChevronRight size={16} className="text-blue-400 group-hover:text-yellow-600 group-hover:translate-x-1 transition-all" />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fun Statistics Section */}
              <div className="bg-white rounded-3xl shadow-lg p-6 border border-blue-100 animate-fade-in-up">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Coffee className="text-yellow-500 animate-wiggle" size={24} />
                    <h3 className="text-xl font-bold text-blue-900">BEM IT Del dalam Angka</h3>
                    <Coffee className="text-yellow-500 animate-wiggle" size={24} />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-colors">
                    <div className="text-2xl font-bold text-blue-600 animate-bounce-slow">
                      {staticData.mahasiswa.length}
                    </div>
                    <div className="text-sm text-blue-500 font-medium">Mahasiswa Terdaftar</div>
                  </div>
                  
                  <div className="text-center p-4 bg-yellow-50 rounded-xl border border-yellow-200 hover:bg-yellow-100 transition-colors">
                    <div className="text-2xl font-bold text-yellow-600 animate-bounce-slow">
                      {staticData.pengumuman.length}
                    </div>
                    <div className="text-sm text-yellow-600 font-medium">Pengumuman Aktif</div>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200 hover:bg-green-100 transition-colors">
                    <div className="text-2xl font-bold text-green-600 animate-bounce-slow">
                      {staticData.himpunan.length}
                    </div>
                    <div className="text-sm text-green-600 font-medium">Himpunan Aktif</div>
                  </div>
                  
                  <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200 hover:bg-purple-100 transition-colors">
                    <div className="text-2xl font-bold text-purple-600 animate-bounce-slow">
                      {staticData.ukm.length}
                    </div>
                    <div className="text-sm text-purple-600 font-medium">UKM Aktif</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-lg p-8 border border-blue-100 animate-fade-in-up">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce-slow">
                  <Home className="text-white" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-blue-900 mb-2">Modul {activeModule}</h2>
                <p className="text-blue-600 mb-6">Konten untuk modul ini sedang dalam pengembangan</p>
                <button
                  onClick={() => setActiveModule("dashboard")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2 mx-auto"
                >
                  <Home size={16} />
                  Kembali ke Dashboard
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Enhanced Modal dengan Blue-Yellow Theme */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
              <div className="bg-blue-500 p-6 text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500 rounded-xl animate-bounce-slow">
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
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-wiggle">
                    <BookOpen className="text-blue-500" size={24} />
                  </div>
                  <p className="text-blue-600">📋 Formulir isi data akan ditampilkan di sini</p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 border-t border-blue-100 p-6 bg-blue-50">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 rounded-xl border-2 border-blue-200 text-blue-600 hover:bg-blue-100 transition-colors flex items-center gap-2"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  <Save size={16} />
                  Simpan Data
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;