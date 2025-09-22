'use client';

import { useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Megaphone, 
  Settings,
  TrendingUp,
  Activity,
  Bell,
  ChevronRight,
  Star,
  Clock,
  UserPlus,
  CalendarPlus,
  MessageSquare,
  Award
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DashboardUKM() {
  const [activeMenu, setActiveMenu] = useState("ringkasan");

  const recentActivities = [
    { id: 1, type: "member", message: "5 anggota baru bergabung", time: "2 jam lalu", icon: UserPlus },
    { id: 2, type: "event", message: "Workshop Fotografi dimulai", time: "4 jam lalu", icon: CalendarPlus },
    { id: 3, type: "announcement", message: "Pengumuman rapat mingguan", time: "1 hari lalu", icon: MessageSquare }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Main Content */}
      <main className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {activeMenu === "ringkasan" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-2 border-blue-100 dark:border-blue-900 hover:shadow-lg transition-colors">
                  <CardHeader className="bg-blue-50 dark:bg-blue-900 border-b border-blue-100 dark:border-blue-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 rounded-full p-2">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">Jumlah Anggota</h3>
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-3xl font-bold text-blue-800 dark:text-blue-300">120</p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">+12 bulan ini</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-yellow-100 dark:border-yellow-900 hover:shadow-lg transition-colors">
                  <CardHeader className="bg-yellow-50 dark:bg-yellow-900 border-b border-yellow-100 dark:border-yellow-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-500 rounded-full p-2">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">Kegiatan Aktif</h3>
                      </div>
                      <Activity className="w-5 h-5 text-yellow-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-3xl font-bold text-yellow-800 dark:text-yellow-300">5</p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">3 akan datang</p>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-100 dark:border-green-900 hover:shadow-lg transition-colors">
                  <CardHeader className="bg-green-50 dark:bg-green-900 border-b border-green-100 dark:border-green-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-600 rounded-full p-2">
                          <Megaphone className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">Pengumuman Baru</h3>
                      </div>
                      <Bell className="w-5 h-5 text-green-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-3xl font-bold text-green-800 dark:text-green-300">2</p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">Perlu tindakan</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <Card className="border-2 border-blue-100 dark:border-blue-900 transition-colors">
                <CardHeader className="bg-blue-50 dark:bg-blue-900 border-b border-blue-100 dark:border-blue-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 rounded-full p-2">
                      <Activity className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200">Aktivitas Terbaru</h2>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentActivities.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div 
                          key={activity.id} 
                          className="flex items-center gap-4 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <div className="bg-yellow-100 dark:bg-yellow-800 rounded-full p-2">
                            <Icon className="w-4 h-4 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div className="flex-1">
                            <p className="text-blue-800 dark:text-blue-200 font-medium">{activity.message}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3 text-gray-500 dark:text-gray-400" />
                              <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-2 border-yellow-100 dark:border-yellow-900 transition-colors">
                <CardHeader className="bg-yellow-50 dark:bg-yellow-900 border-b border-yellow-100 dark:border-yellow-800 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500 rounded-full p-2">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">Aksi Cepat</h2>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white p-4 h-auto flex flex-col gap-2">
                      <UserPlus className="w-6 h-6" />
                      <span>Tambah Anggota</span>
                    </Button>
                    <Button className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 h-auto flex flex-col gap-2">
                      <CalendarPlus className="w-6 h-6" />
                      <span>Buat Kegiatan</span>
                    </Button>
                    <Button className="bg-green-600 hover:bg-green-700 text-white p-4 h-auto flex flex-col gap-2">
                      <MessageSquare className="w-6 h-6" />
                      <span>Kirim Pengumuman</span>
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white p-4 h-auto flex flex-col gap-2">
                      <Award className="w-6 h-6" />
                      <span>Lihat Laporan</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Anggota */}
          {activeMenu === "anggota" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-blue-100 dark:bg-blue-800 rounded-full p-3">
                  <Users className="w-8 h-8 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-200">Daftar Anggota</h2>
                  <p className="text-blue-600 dark:text-blue-400">Kelola data anggota UKM</p>
                </div>
              </div>
              <Card className="border-2 border-blue-100 dark:border-blue-900 transition-colors">
                <CardContent className="p-8 text-center">
                  <Users className="w-16 h-16 text-blue-400 dark:text-blue-300 mx-auto mb-4" />
                  <p className="text-blue-600 dark:text-blue-400">Fitur daftar anggota akan ditampilkan di sini</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Kegiatan */}
          {activeMenu === "kegiatan" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-yellow-100 dark:bg-yellow-800 rounded-full p-3">
                  <Calendar className="w-8 h-8 text-yellow-600 dark:text-yellow-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-yellow-800 dark:text-yellow-200">Daftar Kegiatan</h2>
                  <p className="text-yellow-600 dark:text-yellow-400">Kelola jadwal dan kegiatan UKM</p>
                </div>
              </div>
              <Card className="border-2 border-yellow-100 dark:border-yellow-900 transition-colors">
                <CardContent className="p-8 text-center">
                  <Calendar className="w-16 h-16 text-yellow-400 dark:text-yellow-300 mx-auto mb-4" />
                  <p className="text-yellow-600 dark:text-yellow-400">Fitur daftar kegiatan akan ditampilkan di sini</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Pengumuman */}
          {activeMenu === "pengumuman" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-green-100 dark:bg-green-800 rounded-full p-3">
                  <Megaphone className="w-8 h-8 text-green-600 dark:text-green-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">Pengumuman</h2>
                  <p className="text-green-600 dark:text-green-400">Kelola pengumuman dan pemberitahuan</p>
                </div>
              </div>
              <Card className="border-2 border-green-100 dark:border-green-900 transition-colors">
                <CardContent className="p-8 text-center">
                  <Megaphone className="w-16 h-16 text-green-400 dark:text-green-300 mx-auto mb-4" />
                  <p className="text-green-600 dark:text-green-400">Fitur pengumuman akan ditampilkan di sini</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Pengaturan */}
          {activeMenu === "pengaturan" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-purple-100 dark:bg-purple-800 rounded-full p-3">
                  <Settings className="w-8 h-8 text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-200">Pengaturan UKM</h2>
                  <p className="text-purple-600 dark:text-purple-400">Kelola profil dan konfigurasi UKM</p>
                </div>
              </div>
              <Card className="border-2 border-purple-100 dark:border-purple-900 transition-colors">
                <CardContent className="p-8 text-center">
                  <Settings className="w-16 h-16 text-purple-400 dark:text-purple-300 mx-auto mb-4" />
                  <p className="text-purple-600 dark:text-purple-400">Fitur pengaturan akan ditampilkan di sini</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
