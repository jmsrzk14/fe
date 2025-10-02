'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Calendar,
  Eye,
  Share2,
  BookOpen,
  Users,
  Award,
  CheckCircle,
  Clock,
  MapPin,
  Mail,
  Phone,
  Globe,
  FileText,
  Download,
  User,
  Building,
  MessageCircle,
  Tag,
  Heart,
  Bookmark,
  Star,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

// Define the type for news data
type NewsDetail = {
  id: string;
  title: string;
  category: string;
  date: string;
  image_url: string;
  content: string;
  created_at: string;
};

const NewsDetailPage = () => {
  const { id } = useParams(); // ambil id dari URL
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`https://be-jmsrzk147707-ttmyeqw8.apn.leapcell.online/api/news/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setNewsData(res.data.data);
        } else {
          console.error("News not found:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching detail:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // opsi: ganti 'id-ID' jadi 'en-US' kalau mau bahasa Inggris
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  if (!newsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat berita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-br from-[#2563eb] to-[#3b82f6] relative overflow-hidden">

        {/* Header with Back Button */}
        <div className="bg-g-gradient-to-br from-[#2563eb] to-[#3b82f6] sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-grey-500 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-blue-600" />
              <span className="font-medium"></span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Article Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6"
              >
                {/* Hero Image */}
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-600 to-blue-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={`https://be-jmsrzk147707-ttmyeqw8.apn.leapcell.online/news/${newsData.image_url}`}
                      alt={newsData.image_url}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {newsData.category}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {newsData.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(newsData.created_at)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
              >
                <div className="prose prose-blue max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: newsData.content }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Author Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">BEM IT Del</h3>
                    <p className="text-sm text-gray-600">Badan Eksekutif Mahasiswa</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4">Organisasi mahasiswa yang mengkoordinasi seluruh kegiatan kemahasiswaan di IT Del.</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">bem@del.ac.id</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-500" />
                  Kemitraan & Kolaborasi
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Mitra Industri</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-medium text-gray-800">Microsoft</div>
                        <div className="text-xs text-gray-600">Cloud Services</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-medium text-gray-800">Google</div>
                        <div className="text-xs text-gray-600">AI & Analytics</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-medium text-gray-800">AWS</div>
                        <div className="text-xs text-gray-600">Infrastructure</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-medium text-gray-800">Telkom</div>
                        <div className="text-xs text-gray-600">Connectivity</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-medium text-gray-800">Gojek</div>
                        <div className="text-xs text-gray-600">Tech Innovation</div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg text-center">
                        <div className="font-medium text-gray-800">Tokopedia</div>
                        <div className="text-xs text-gray-600">E-commerce</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Kolaborasi Akademik</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                        <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Award className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Institut Teknologi Bandung (ITB)</div>
                          <div className="text-sm text-gray-600">Program pertukaran mahasiswa dan penelitian bersama</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 border-l-4 border-green-500 bg-green-50">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <BookOpen className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Universitas Indonesia (UI)</div>
                          <div className="text-sm text-gray-600">Kolaborasi riset teknologi dan inovasi digital</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 border-l-4 border-purple-500 bg-purple-50">
                        <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Globe className="w-3 h-3 text-white" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">Singapore Management University</div>
                          <div className="text-sm text-gray-600">Program internasional dan transfer teknologi</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Dampak Kemitraan</h3>
                    <ul className="space-y-1 text-sm text-gray-700">
                      <li>• Peningkatan kualitas pembelajaran melalui teknologi terdepan</li>
                      <li>• Kesempatan magang dan karir di perusahaan teknologi terkemuka</li>
                      <li>• Akses ke sertifikasi internasional dan program pelatihan khusus</li>
                      <li>• Penelitian kolaboratif yang menghasilkan inovasi breakthrough</li>
                    </ul>
                  </div>
                </div>
              </motion.div>

              {/* Share Options */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-500" />
                  Fitur Unggulan dan Manfaat
                </h2>

                <div className="grid gap-4">
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Integrasi Sistem Akademik</h3>
                      <p className="text-gray-700 text-sm">
                        Platform terintegrasi dengan sistem informasi akademik untuk akses mudah ke jadwal kuliah,
                        nilai, dan tugas dalam satu tempat. Notifikasi otomatis membantu mahasiswa tidak melewatkan
                        deadline penting.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Jejaring Sosial Kampus</h3>
                      <p className="text-gray-700 text-sm">
                        Fitur jejaring sosial khusus untuk komunitas IT Del yang memungkinkan mahasiswa berinteraksi,
                        berbagi informasi, dan berkolaborasi dalam proyek-proyek akademik maupun organisasi.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Layanan Digital Terpadu</h3>
                      <p className="text-gray-700 text-sm">
                        Akses ke berbagai layanan kampus seperti perpustakaan digital, sistem pembayaran,
                        pendaftaran kegiatan, dan layanan administrasi lainnya dalam satu aplikasi.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;