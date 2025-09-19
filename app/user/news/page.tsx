'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';


const pencapaianData = [
  {
    id: 'digital-platform',
    title: 'Digital Platform',
    category: 'Teknologi',
    date: 'Ongoing',
    status: 'Aktif',
    statusColor: '#4285f4',
    bgColor: '#3b82f6',
    description: 'Platform digital terintegrasi untuk mendukung kegiatan mahasiswa IT Del',
    icon: '💻',
    achievement: 'Platform Terdepan'
  },
  {
    id: 'festival-budaya',
    title: 'Festival Budaya',
    category: 'Sosial',
    date: 'Oktober 2024',
    status: '200+ Peserta',
    statusColor: '#fbbf24',
    bgColor: '#3b82f6',
    description: 'Festival Budaya IT Del 2024',
    subDescription: 'Menyelenggarakan festival budaya terbesar dengan partisipasi 200+ mahasiswa dan 50+ stand kegiatan',
    icon: '🎭',
    achievement: 'Festival Terbesar'
  },
  {
    id: 'beasiswa-prestasi',
    title: 'Beasiswa Prestasi',
    category: 'Pendidikan',
    date: 'Agustus 2024',
    status: '100+ Penerima',
    statusColor: '#fbbf24',
    bgColor: '#f59e0b',
    description: 'Program Beasiswa Prestasi',
    subDescription: 'Memberikan beasiswa kepada 100+ mahasiswa berprestasi melalui kerjasama dengan berbagai mitra industri',
    icon: '🎓',
    achievement: 'Program Unggulan'
  },
  {
    id: 'esports-tournament',
    title: 'E-Sports Tournament',
    category: 'Olahraga',
    date: 'November 2024',
    status: '500+ Peserta',
    statusColor: '#fbbf24',
    bgColor: '#10b981',
    description: 'Turnamen E-Sports Nasional',
    subDescription: 'Menjadi tuan rumah turnamen e-sports tingkat nasional dengan hadiah total 500 juta rupiah',
    icon: '🎮',
    achievement: 'Turnamen Nasional'
  },
  {
    id: 'workshop-bisnis',
    title: 'Workshop Bisnis',
    category: 'Karir',
    date: 'Desember 2024',
    status: '20+ Workshop',
    statusColor: '#fbbf24',
    bgColor: '#8b5cf6',
    description: 'Workshop Kewirausahaan',
    subDescription: 'Menyelenggarakan 20+ workshop kewirausahaan dengan mentor dari startup unicorn Indonesia',
    icon: '💼',
    achievement: 'Program Mentor'
  },
  {
    id: 'green-campaign',
    title: 'Green Campaign',
    category: 'Lingkungan',
    date: 'Januari 2025',
    status: '5000+ Pohon',
    statusColor: '#fbbf24',
    bgColor: '#10b981',
    description: 'Kampanye Lingkungan Hijau',
    subDescription: 'Berhasil menanam 5000+ pohon dan mengurangi sampah plastik kampus hingga 70%',
    icon: '🌱',
    achievement: 'Kampanye Hijau'
  }
];

const filterData = [
  { id: 'semua', label: 'Semua', isActive: true },
  { id: 'teknologi', label: 'Teknologi', isActive: false },
  { id: 'sosial', label: 'Sosial', isActive: false },
  { id: 'pendidikan', label: 'Pendidikan', isActive: false },
  { id: 'olahraga', label: 'Olahraga', isActive: false },
  { id: 'karir', label: 'Karir', isActive: false },
  { id: 'lingkungan', label: 'Lingkungan', isActive: false }
];


export default function ProfilePage() {
  const [showExecutiveCards, setShowExecutiveCards] = useState(false);
  const [activeFilter, setActiveFilter] = useState('semua');
  const [activePage, setActivePage] = useState(1);
  


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
        <div className="relative z-10 flex items-center justify-center min-h-[60vh] text-center px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative z-10">
              <div className="inline-flex items-center bg-white rounded-full shadow-md">
                {/* Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center bg-white rounded-full shadow-md px-6 py-3 mb-6"
                >
                  <div className="w-11 h-11 rounded-full flex items-center justify-center mr-3">
                    <img src="./del.png" alt="" />
                  </div>
                  {/* Text */}
                  <span className="text-[1.2em] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                    Institut Teknologi Del
                  </span>
                </motion.div>
              </div>
            </div>
            <div className='flex flex-col items-center '>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                  className="text-[3.5em] font-bold text-white"
              >
                Berita Terjini IT DEL
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                  className="text-[3.5em] font-bold text-white"
              > 
              </motion.h1>
              <div className="w-40 h-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_15px_rgba(0,200,255,0.8)] mt-3"></div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                  className="mt-6 w-[40em] text-xl text-white mb-[6em]"
              >
                Ikuti perkembangan terbaru, cerita inspiratif, dan informasi penting seputar kegiatan mahasiswa di Institut Teknologi Del melalui portal berita resmi kami. 
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        
        

        {/* Pencapaian dan Prestasi Section */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#1c44ac] mb-4">Pencapaian & Prestasi</h1>
            <div className="w-20 h-1 bg-[#1c44ac] mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Melihat kembali prestasi dan pencapaian gemilang yang telah diraih BEM IT Del dalam periode 2024/2025
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filterData.map((filter) => (
              <button 
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-300 ${
                  activeFilter === filter.id 
                    ? 'bg-[#3b82f6] text-white hover:bg-[#2563eb]' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Pencapaian Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {pencapaianData
              .filter((pencapaian) => activeFilter === 'semua' || pencapaian.category.toLowerCase() === activeFilter)
              .map((pencapaian) => (
                <Link href="/user/news/detail" key={pencapaian.id} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 border border-gray-100 block cursor-pointer">
                    {/* Card Header with Background */}
                    <div 
                      className="relative h-32 p-6 flex items-center justify-between"
                      style={{ backgroundColor: pencapaian.bgColor }}
                    >
                      <div>
                        <h3 className="text-white text-2xl font-bold mb-2">{pencapaian.title}</h3>
                        <p className="text-white/90 text-sm">{pencapaian.date}</p>
                      </div>
                      <div className="text-white text-3xl">{pencapaian.icon}</div>
                      {/* Status Badge */}
                      <div 
                        className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: pencapaian.statusColor }}
                      >
                        {pencapaian.status}
                      </div>
                      {/* Bottom Right Circular Icon */}
                      <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <span className="text-[#3b82f6] text-xs font-bold">ℹ</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h4 className="text-lg font-bold text-gray-800 mb-2">{pencapaian.description}</h4>
                      <div className="w-12 h-1 bg-[#3b82f6] mb-4"></div>
                      {pencapaian.subDescription && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                          {pencapaian.subDescription}
                        </p>
                      )}
                      {/* Action Icons */}
                      <div className="flex justify-between items-center mt-6">
                        <div className="flex space-x-3">
                          <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <span className="text-gray-500 text-sm">👁</span>
                          </button>
                          <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <span className="text-gray-500 text-sm">❤</span>
                          </button>
                          <button className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <span className="text-gray-500 text-sm">📅</span>
                          </button>
                        </div>
                        {/* Category Badge */}
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          {pencapaian.category}
                        </span>
                      </div>
                    </div>
                </Link>
            ))}
          </div>
        </div>

        {/* Statistik Pencapaian Section */}

          

          {/* Lihat Berita Lengkap Button */}
          <div className="flex justify-center mt-8">
            <button className="px-4 py-2 bg-[#3b82f6] text-white rounded-lg hover:bg-[#2563eb] transition-colors">
              Lihat Berita Lengkap
            </button>
          </div>
        </div>
      </div>
      {/* Pagination - Bottom Section */}
      <div className="flex justify-center items-center gap-2 mt-16 mb-8">
        <button
          className={`px-4 py-2 rounded-lg ${activePage === 1 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-[#2563eb] bg-gray-100 hover:bg-gray-200 font-semibold'}`}
          disabled={activePage === 1}
          onClick={() => setActivePage(activePage - 1)}
        >
          Sebelumnya
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activePage === 1 ? 'bg-[#2563eb] text-white font-bold shadow' : 'bg-gray-100 text-gray-500 font-bold hover:bg-gray-200'}`}
          onClick={() => setActivePage(1)}
        >
          1
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activePage === 2 ? 'bg-[#2563eb] text-white font-bold shadow' : 'bg-gray-100 text-gray-500 font-bold hover:bg-gray-200'}`}
          onClick={() => setActivePage(2)}
        >
          2
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${activePage === 2 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-[#2563eb] bg-gray-100 hover:bg-gray-200 font-semibold'}`}
          disabled={activePage === 2}
          onClick={() => setActivePage(activePage + 1)}
        >
          Selanjutnya
        </button>
      </div>
    </div>
  );
}