'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, Users, Share, Bookmark, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Define TypeScript interface for announcements
interface Announcement {
  id: number;
  organization: string;
  date: string;
  type: 'TERBARU' | 'SEDANG' | 'RENDAH';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  category: string;
  views: number;
  shares: number;
}

export default function AnnouncementsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Define announcements data
  const announcements: Announcement[] = [
    {
      id: 1,
      organization: 'BEM IT Del',
      date: '10 Januari 2024',
      type: 'TERBARU',
      priority: 'high',
      title: 'Pendaftaran Anggota Baru BEM IT Del 2024',
      description: 'Membuka kesempatan bagi mahasiswa baru untuk bergabung dalam kepanitiaan BEM IT Del periode 2024-2025',
      category: 'BEM',
      views: 150,
      shares: 23,
    },
    // ... other announcements (unchanged for brevity)
  ];

  const filterOptions = [
    { id: 'semua', label: 'Semua', color: 'bg-blue-500' },
    { id: 'bem', label: 'BEM', color: 'bg-blue-600' },
    { id: 'himatif', label: 'HIMATIF', color: 'bg-purple-500' },
    { id: 'ukm', label: 'UKM', color: 'bg-green-500' },
  ];

  // Memoized priority badge styling
  const getPriorityBadge = useCallback((type: Announcement['type']) => {
    switch (type) {
      case 'TERBARU':
        return { bg: 'bg-red-500', text: 'text-white' };
      case 'SEDANG':
        return { bg: 'bg-yellow-500', text: 'text-white' };
      default:
        return { bg: 'bg-green-500', text: 'text-white' };
    }
  }, []);

  // Memoized filtered announcements
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((announcement) => {
      const matchesFilter =
        activeFilter === 'Semua' ||
        announcement.category.toLowerCase() === activeFilter.toLowerCase();
      const matchesSearch =
        announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        announcement.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  // Handle card click with proper URL formatting
  const handleCardClick = useCallback(
    (announcementId: string) => {
      setIsLoading(true);
      router.push(`/user/announcements/detail?id=${announcementId}`);
      setIsLoading(false);
    },
    [router]
  );

  // Handle bookmark action
  const handleBookmark = useCallback((e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    // Implement bookmark functionality here
    console.log(`Bookmarked announcement ${id}`);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-[#2563eb] to-[#3b82f6] py-16 md:py-20"
        aria-label="Announcements Hero Section"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            Pengumuman Terkini
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg lg:text-xl mb-8 max-w-2xl mx-auto opacity-90"
          >
            Informasi terbaru dari berbagai organisasi mahasiswa Institut Teknologi Del
            untuk mendukung pengembangan akademik dan non-akademik
          </motion.p>

          {/* Filter Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6"
            role="tablist"
            aria-label="Announcement Filters"
          >
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.label)}
                className={`px-4 py-2 md:px-6 md:py-2 rounded-full font-medium transition-all duration-300 text-sm md:text-base ${
                  activeFilter === filter.label
                    ? 'bg-white text-blue-600 shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
                role="tab"
                aria-selected={activeFilter === filter.label}
                aria-controls="announcements-panel"
              >
                {filter.label}
              </button>
            ))}
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Cari pengumuman..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pr-12 rounded-lg bg-white/90 backdrop-blur text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
                aria-label="Search announcements"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-12" id="announcements-panel" role="tabpanel">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Daftar Pengumuman
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Tetap update dengan informasi terbaru dari organisasi mahasiswa
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredAnnouncements.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">Tidak ada pengumuman yang ditemukan.</p>
          </div>
        )}

        {/* Announcements Grid */}
        {!isLoading && filteredAnnouncements.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filteredAnnouncements.map((announcement, index) => {
              const priorityStyle = getPriorityBadge(announcement.type);

              return (
                <motion.div
                  key={announcement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
                  onClick={() => handleCardClick(announcement.id.toString())}
                  role="article"
                  aria-labelledby={`announcement-title-${announcement.id}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick(announcement.id.toString());
                    }
                  }}
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">
                            {announcement.organization.substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {announcement.organization}
                          </h3>
                          <p className="text-sm text-gray-500">{announcement.date}</p>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${priorityStyle.bg} ${priorityStyle.text}`}
                      >
                        ● {announcement.type}
                      </span>
                    </div>

                    <h4
                      id={`announcement-title-${announcement.id}`}
                      className="text-lg font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors"
                    >
                      {announcement.title}
                    </h4>

                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                      {announcement.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="px-6 py-4 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{announcement.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Share className="w-4 h-4" />
                          <span>{announcement.shares}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                          onClick={(e) => handleBookmark(e, announcement.id)}
                          aria-label={`Bookmark announcement ${announcement.title}`}
                        >
                          <Bookmark className="w-4 h-4 text-gray-500" />
                        </button>
                        <button
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(announcement.id.toString());
                          }}
                          aria-label={`Read more about ${announcement.title}`}
                        >
                          Baca Selengkapnya
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Priority Legend */}
        <div className="mt-12 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 bg-white rounded-full px-6 py-3 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-sm font-medium text-gray-700">Prioritas Tinggi</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="text-sm font-medium text-gray-700">Prioritas Sedang</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-sm font-medium text-gray-700">Prioritas Rendah</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}