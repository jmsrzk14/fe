'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Target,
  SpeakerIcon,
  MessageSquare,
  Megaphone,
  FileText,
  Users,
  Calendar,
  Settings,
  TrendingUp,
  Activity,
  Bell,
  Award,
  Star,
  Zap
} from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ApiResponse {
  status: string;
  message: string;
  metadata: { total_items: number };
  data: any[];
}

export default function DashboardHimpunan() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [aspirasiCount, setAspirasiCount] = useState<number>(0);
  const [newsCount, setNewsCount] = useState<number>(0);
  const [announcementCount, setAnnouncementCount] = useState<number>(0);
  const [token, setToken] = useState<string | null>(null);
  const [organisasiId, setOrganisasiId] = useState<string | null>(null);
  const [clubData, setClubData] = useState<any | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const stored1 = sessionStorage.getItem("token");
    setToken(stored1);
    const stored2 = sessionStorage.getItem("organization");
    setOrganisasiId(stored2);
  }, []);

  useEffect(() => {
    if (organisasiId && token) {
      fetch(`${API_URL}/student/clubs/${organisasiId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setClubData(data))
        .catch((err) => console.error("Gagal ambil data organisasi:", err));
    }
  }, [organisasiId, router]);

  const orgName = clubData?.data?.name || null;

  const fetchData = async (
    url: string,
    setter: (val: number) => void,
    label: string
  ) => {
    try {
      setLoading(true);
      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
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

  useEffect(() => {
    fetchData(
      '${API_URL}/student/news?page=1&per_page=1',
      setNewsCount,
      'berita'
    );
    fetchData(
      '${API_URL}/student/announcement?page=1&per_page=1',
      setAnnouncementCount,
      'pengumuman'
    );
  }, [token]);

  const menuItems = [
    { key: 'ringkasan', label: 'Ringkasan', icon: TrendingUp },
    { key: 'anggota', label: 'Anggota', icon: Users },
    { key: 'kegiatan', label: 'Kegiatan', icon: Calendar },
    { key: 'pengumuman', label: 'Pengumuman', icon: Megaphone },
    { key: 'pengaturan', label: 'Pengaturan', icon: Settings },
  ] as const;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 py-8 px-6">
          <div className="max-w-7xl mx-auto">
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
                    <h2 className="text-xl md:text-4xl font-midfielder mb-3">Pengurus {orgName}</h2>
                  </div>
                  <div className="hidden md:flex items-center">
                    <div className="relative">
                      <Zap size={120} className="text-white/10 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Kegiatan */}
                <Card className="border-2 border-yellow-100 dark:border-yellow-900 hover:shadow-lg transition-colors">
                  <CardHeader className="bg-yellow-50 dark:bg-yellow-900 border-b border-yellow-100 dark:border-yellow-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-500 rounded-full p-2">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
                          Berita
                        </h3>
                      </div>
                      <Activity className="w-5 h-5 text-yellow-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-3xl font-bold text-green-800 dark:text-green-300">
                      {loading ? '...' : newsCount || 2}
                    </p>
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                    </p>
                  </CardContent>
                </Card>

                {/* Pengumuman */}
                <Card className="border-2 border-green-100 dark:border-green-900 hover:shadow-lg transition-colors">
                  <CardHeader className="bg-green-50 dark:bg-green-900 border-b border-green-100 dark:border-green-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="bg-green-600 rounded-full p-2">
                          <Megaphone className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                          Pengumuman
                        </h3>
                      </div>
                      <Bell className="w-5 h-5 text-green-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <p className="text-3xl font-bold text-green-800 dark:text-green-300">
                      {loading ? '...' : announcementCount || 2}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <Card className="border-2 border-yellow-100 dark:border-yellow-900">
                <CardHeader className="bg-yellow-50 dark:bg-yellow-900 border-b border-yellow-100 dark:border-yellow-800">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500 rounded-full p-2">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-yellow-800 dark:text-yellow-200">
                      Aksi Cepat
                    </h2>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      onClick={() => router.push('/himpunan/request_sarpras')}
                      className="bg-blue-600 hover:bg-blue-700 text-white p-4 h-auto flex flex-col gap-2"
                    >
                      <SpeakerIcon className="w-6 h-6" />
                      <span>Peminjaman Barang Sarpras</span>
                    </Button>

                    <Button
                      onClick={() => router.push('/himpunan/request_depol')}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 h-auto flex flex-col gap-2"
                    >
                      <Target className="w-6 h-6" />
                      <span>Peminjaman Barang Depol</span>
                    </Button>

                    <Button
                      onClick={() => router.push('/himpunan/announcement/create')}
                      className="bg-green-600 hover:bg-green-700 text-white p-4 h-auto flex flex-col gap-2"
                    >
                      <MessageSquare className="w-6 h-6" />
                      <span>Tambah Pengumuman</span>
                    </Button>

                    <Button
                      onClick={() => router.push('/himpunan/profile')}
                      className="bg-purple-600 hover:bg-purple-700 text-white p-4 h-auto flex flex-col gap-2"
                    >
                      <Award className="w-6 h-6" />
                      <span>Profle</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}