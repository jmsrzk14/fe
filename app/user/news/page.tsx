'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import axios from 'axios';

const filterData = [
  { id: 'semua', label: 'Semua', isActive: true },
  { id: 'teknologi', label: 'Teknologi', isActive: false },
  { id: 'sosial', label: 'Sosial', isActive: false },
  { id: 'pendidikan', label: 'Pendidikan', isActive: false },
  { id: 'olahraga', label: 'Olahraga', isActive: false },
  { id: 'karir', label: 'Karir', isActive: false },
  { id: 'lingkungan', label: 'Lingkungan', isActive: false }
];

interface News {
  id: number;
  title: string;
  category: string;
  date: string;
  status: string;
  content: string;
  image_url: string;
  created_at: string;
}

export default function ProfilePage() {
  const [activeFilter, setActiveFilter] = useState('semua');
  const [activePage, setActivePage] = useState(1);
  const [newsData, setNewsData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 10; // tampilkan 10 berita per halaman

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/news");
        if (res.data.status === "success") {
          setNewsData(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  // Filter berita sesuai kategori
  const filteredNews = newsData.filter(
    (news) => activeFilter === 'semua' || news.category.toLowerCase() === activeFilter
  );

  // Pagination
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const currentData = filteredNews.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      {/* Hero Section and Main Content */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative min-h-[60vh] bg-gradient-to-br from-[#1c46b9] via-[#2563eb] to-[#3b82f6] overflow-hidden py-16"
      >
        <div className="absolute inset-0">
          {/* Large circles */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-48 h-48 bg-white/5 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 right-10 w-24 h-24 bg-[#ffe444]/20 rounded-full"></div>

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1c46b9]/20 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        </div>


        {/* Main content inside hero */}
        <div className="relative z-10 flex items-center justify-center min-h-[60vh] text-center px-4 mt-12">
          <div className="max-w-4xl mx-auto">
            <div className="relative z-10">
              <div className="inline-flex items-center">
                {/* Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center bg-white rounded-full shadow-md px-6 py-3 mb-6"
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mr-3">
                    <img src="/del.png" alt="" />
                  </div>
                  {/* Text */}
                  <span className="text-[1.2em] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                    Institut Teknologi Del
                  </span>
                </motion.div>
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[3.5em] sm:text-4xl md:text-5xl lg:text-[3.5em] font-bold text-white"
              >
                Berita Terkini IT DEL
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[3.5em] font-bold text-white"
              >
              </motion.h1>
              <div className="w-40 h-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_15px_rgba(0,200,255,0.8)] mt-12"></div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-12 max-w-xl sm:max-w-2xl md:max-w-3xl text-base sm:text-lg md:text-xl text-white mb-12"
              >
                Ikuti perkembangan terbaru, cerita inspiratif, dan informasi penting seputar kegiatan mahasiswa di Institut Teknologi Del melalui portal berita resmi kami.
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filterData.map((filter) => (
              <button
                key={filter.id}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setActivePage(1); // reset ke page 1 kalau ganti filter
                }}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${activeFilter === filter.id
                    ? 'bg-[#3b82f6] text-white hover:bg-[#2563eb]'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {currentData.map((news) => (
              <Link
                href={`/user/news/detail/${news.id}`}
                key={news.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-2 transition-all duration-300 border border-gray-100 block cursor-pointer"
              >
                <div className="relative h-48 p-6 overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      src={`http://localhost:8080/news/${news.image_url}`}
                      alt={news.image_url}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
                  </div>
                  <div className="relative z-10 h-full flex flex-col justify-end">
                    <h3 className="text-white text-xl font-bold mb-2 line-clamp-2 group-hover:text-blue-100 transition-colors drop-shadow-lg">
                      {news.title}
                    </h3>
                    <div className="flex items-center text-white/90 text-sm drop-shadow-md">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {formatDate(news.created_at)}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <span className="inline-block text-xs font-semibold text-[#3b82f6] bg-blue-50 px-3 py-1 rounded-full capitalize">
                      {news.category}
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-2">
                    {news.content.replace(/<[^>]*>/g, '')}
                  </p>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-4"></div>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/user/news/detail/${news.id}`}
                      className="text-[#3b82f6] text-sm font-semibold flex items-center hover:gap-2 gap-1 transition-all duration-200"
                    >
                      Baca
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-16 mb-8 flex-wrap">
            <button
              className={`px-4 py-2 rounded-lg ${activePage === 1
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  : 'text-[#2563eb] bg-gray-100 hover:bg-gray-200 font-semibold'
                }`}
              disabled={activePage === 1}
              onClick={() => setActivePage(activePage - 1)}
            >
              Sebelumnya
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`px-4 py-2 rounded-lg ${activePage === page
                    ? 'bg-[#2563eb] text-white font-bold shadow'
                    : 'bg-gray-100 text-gray-500 font-bold hover:bg-gray-200'
                  }`}
                onClick={() => setActivePage(page)}
              >
                {page}
              </button>
            ))}

            <button
              className={`px-4 py-2 rounded-lg ${activePage === totalPages
                  ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                  : 'text-[#2563eb] bg-gray-100 hover:bg-gray-200 font-semibold'
                }`}
              disabled={activePage === totalPages}
              onClick={() => setActivePage(activePage + 1)}
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}