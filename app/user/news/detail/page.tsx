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
import { useSearchParams, useRouter } from 'next/navigation';

// Define the type for news data
type NewsDetail = {
  id: string;
  title: string;
  category: string;
  date: string;
  author: string;
  views: number;
  comments: number;
  image: string;
  content: string;
  quote: {
    text: string;
    author: string;
  };
  tags?: string[];
  relatedNews?: string[];
  authorInfo?: {
    name: string;
    role: string;
    email: string;
    bio: string;
  };
};

// Sample news data yang sesuai dengan halaman utama
const newsDetailData: Record<string, NewsDetail> = {
  'delconnect-launch': {
    id: 'delconnect-launch',
    title: 'Peluncuran Aplikasi DelConnect untuk Mahasiswa IT Del',
    category: 'Teknologi',
    date: 'March 3, 2023',
    author: 'HIMATIF',
    views: 215,
    comments: 19,
    image: '/hero.png',
    content: `
      HIMATIF dalam satu platform terintegrasi dengan fitur akademik, sosial, dan layanan kampus. 
      Aplikasi ini dapat diunduh melalui play store maupun app store.
      
      Dalam acara peluncuran yang diselenggarakan di Auditorium Utama Institut Teknologi Del, HIMATIF 
      (Himpunan Mahasiswa Teknik Informatika) memperkenalkan inovasi terbaru mereka - aplikasi mobile 
      DelConnect. Aplikasi ini dikembangkan selama 8 bulan oleh tim mahasiswa terbaik dari berbagai angkatan 
      dengan dukungan penuh dari fakultas dan pihak kampus.
    `,
    quote: {
      text: "DelConnect bukan hanya aplikasi biasa, ini adalah revolusi digital yang akan mengubah cara mahasiswa IT Del berinteraksi dan mengakses layanan kampus.",
      author: "HIMATIF DEL"
    },
    tags: ['Teknologi', 'Aplikasi Mobile', 'Mahasiswa', 'Digital'],
    relatedNews: ['digital-platform', 'festival-budaya'],
    authorInfo: {
      name: 'HIMATIF IT Del',
      role: 'Himpunan Mahasiswa Teknik Informatika',
      email: 'himatif@del.ac.id',
      bio: 'Organisasi mahasiswa yang berfokus pada pengembangan teknologi dan inovasi digital di IT Del.'
    }
  },
  'digital-platform': {
    id: 'digital-platform',
    title: 'Digital Platform Terintegrasi untuk Mahasiswa IT Del',
    category: 'Teknologi',
    date: 'Ongoing',
    author: 'BEM IT Del',
    views: 342,
    comments: 28,
    image: '/hero.png',
    content: `
      Platform digital terintegrasi untuk mendukung kegiatan mahasiswa IT Del telah dikembangkan sebagai solusi modern 
      untuk mengoptimalkan layanan kampus. Platform ini menggabungkan berbagai fitur penting dalam satu ekosistem digital.
      
      Dengan teknologi terdepan, platform ini memungkinkan mahasiswa mengakses berbagai layanan kampus dengan mudah 
      dan efisien. Fitur-fitur unggulan mencakup sistem informasi akademik, portal berita, galeri kegiatan, 
      dan sistem komunikasi terintegrasi.
    `,
    quote: {
      text: "Platform terdepan ini menjadi fondasi digitalisasi kampus IT Del untuk masa depan yang lebih connected.",
      author: "Tim Pengembang IT Del"
    },
    tags: ['Digital', 'Platform', 'Integrasi', 'Kampus'],
    relatedNews: ['delconnect-launch', 'festival-budaya'],
    authorInfo: {
      name: 'BEM IT Del',
      role: 'Badan Eksekutif Mahasiswa',
      email: 'bem@del.ac.id',
      bio: 'Organisasi mahasiswa yang mengkoordinasi seluruh kegiatan kemahasiswaan di IT Del.'
    }
  },
  'festival-budaya': {
    id: 'festival-budaya',
    title: 'Festival Budaya IT Del 2024 Sukses Diselenggarakan',
    category: 'Sosial',
    date: 'Oktober 2024',
    author: 'BEM IT Del',
    views: 456,
    comments: 35,
    image: '/hero.png',
    content: `
      Festival Budaya IT Del 2024 telah sukses diselenggarakan dengan partisipasi lebih dari 200 mahasiswa 
      dan 50+ stand kegiatan budaya nusantara. Acara ini menjadi ajang untuk melestarikan dan memperkenalkan 
      kekayaan budaya Indonesia di lingkungan kampus.
      
      Festival ini menampilkan berbagai pertunjukan seni tradisional, pameran budaya daerah, kuliner nusantara, 
      dan workshop kerajinan tradisional. Antusiasme peserta sangat tinggi dengan partisipasi aktif dari 
      seluruh civitas akademika IT Del.
    `,
    quote: {
      text: "Festival Budaya ini menjadi momentum penting untuk memperkuat identitas budaya dan keberagaman di IT Del.",
      author: "Panitia Festival Budaya"
    },
    tags: ['Budaya', 'Festival', 'Tradisional', 'Nusantara'],
    relatedNews: ['delconnect-launch', 'digital-platform'],
    authorInfo: {
      name: 'BEM IT Del',
      role: 'Badan Eksekutif Mahasiswa',
      email: 'bem@del.ac.id',
      bio: 'Organisasi mahasiswa yang mengkoordinasi seluruh kegiatan kemahasiswaan di IT Del.'
    }
  }
};

const NewsDetailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsDetail | null>(null);
  const [activeCommentTab, setActiveCommentTab] = useState('kirim');
  const newsId = searchParams.get('id');

  useEffect(() => {
    if (newsId && newsDetailData[newsId]) {
      setNewsData(newsDetailData[newsId]);
    } else {
      // Default ke digital-platform jika ID tidak ditemukan
      setNewsData(newsDetailData['digital-platform']);
    }
  }, [newsId]);

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
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali ke Berita</span>
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
                  <FileText className="w-16 h-16 text-white opacity-50" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
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
                    <span>{newsData.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{newsData.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <span>{newsData.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{newsData.comments} komentar</span>
                  </div>
                </div>

                {/* Tags */}
                {newsData.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {newsData.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Heart className="w-4 h-4" />
                    <span>Suka</span>
                  </button>
                  <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <Bookmark className="w-4 h-4" />
                    <span>Simpan</span>
                  </button>
                  <button className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Bagikan</span>
                  </button>
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
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {newsData.content}
                </div>
                
                {/* Quote */}
                {newsData.quote && (
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-8 rounded-r-lg">
                    <blockquote className="text-blue-900 text-lg font-medium italic mb-2">
                      "{newsData.quote.text}"
                    </blockquote>
                    <cite className="text-blue-700 font-semibold">
                      — {newsData.quote.author}
                    </cite>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Additional Content Sections */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
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

            {/* Impact and Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Star className="w-5 h-5 text-blue-500" />
                Dampak dan Statistik
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">2,500+</div>
                  <div className="text-sm text-gray-600">Pengguna Aktif</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-sm text-gray-600">Tingkat Kepuasan</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">50+</div>
                  <div className="text-sm text-gray-600">Fitur Tersedia</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-600">Dukungan Teknis</div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">Testimoni Mahasiswa</h3>
                <blockquote className="text-gray-700 italic">
                  "Platform ini benar-benar memudahkan kehidupan akademik saya. Semua informasi yang saya butuhkan 
                  tersedia dalam satu aplikasi, dari jadwal kuliah hingga pengumuman organisasi."
                </blockquote>
                <cite className="text-sm text-gray-600 mt-2 block">— Sarah Situmorang, Mahasiswa Teknik Informatika</cite>
              </div>
            </motion.div>

            {/* Future Development */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Pengembangan Selanjutnya
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-700">Integrasi dengan sistem e-learning yang lebih canggih</span>
                </div>
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-gray-700">Fitur AI untuk rekomendasi personal dan analisis pembelajaran</span>
                </div>
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-gray-700">Aplikasi mobile dengan teknologi AR untuk virtual campus tour</span>
                </div>
                <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Sistem blockchain untuk sertifikasi digital dan transkrip</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Timeline Pengembangan</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Q1 2025: Fitur AI Learning Assistant</span>
                    <span className="text-blue-600 font-medium">In Progress</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Q2 2025: Mobile App Enhancement</span>
                    <span className="text-gray-500">Planned</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Q3 2025: Blockchain Integration</span>
                    <span className="text-gray-500">Research Phase</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Partnership and Collaboration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
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

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-5 h-5 text-blue-500" />
                <h3 className="text-lg font-semibold">Komentar ({newsData.comments})</h3>
              </div>

              {activeCommentTab === 'kirim' && (
                <div className="space-y-4">
                  <textarea
                    placeholder="Tulis komentar Anda..."
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                  />
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Kirim Komentar
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Author Info */}
            {newsData.authorInfo && (
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
                    <h3 className="font-semibold text-gray-900">{newsData.authorInfo.name}</h3>
                    <p className="text-sm text-gray-600">{newsData.authorInfo.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4">{newsData.authorInfo.bio}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-blue-500" />
                    <span className="text-gray-600">{newsData.authorInfo.email}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Related News */}
            {newsData.relatedNews && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
              >
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  Berita Terkait
                </h3>
                <div className="space-y-3">
                  {newsData.relatedNews.map((relatedId) => {
                    const related = newsDetailData[relatedId];
                    if (!related) return null;
                    return (
                      <div 
                        key={relatedId}
                        className="group cursor-pointer p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        onClick={() => router.push(`/user/news/detail?id=${relatedId}`)}
                      >
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm leading-tight mb-1">
                          {related.title}
                        </h4>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>{related.category}</span>
                          <span>{related.date}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Share Options */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-blue-500" />
                Bagikan Berita
              </h3>
              <div className="flex gap-3">
                <button className="flex items-center justify-center w-10 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="flex items-center justify-center w-10 h-10 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
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