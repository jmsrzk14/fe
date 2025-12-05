'use client';

import { User, Star, Sparkles, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Linkedin, Instagram, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Executive {
  id: string;
  name: string;
  position: string;
  image: string;
  prodi: string;
  angkatan: string;
  color: string;
  emoji: string;
  linkedin?: string;
  instagram?: string;
  whatsapp?: string;
}

export default function ProfilePage() {
  const [showExecutiveCards, setShowExecutiveCards] = useState(false);
  const [activeFilter, setActiveFilter] = useState('semua');
  const [executiveData, setExecutiveData] = useState<Executive[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  useEffect(() => {
    const fetchExecutiveData = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(`${API_URL}/bems/manage`);
        if (!response.ok) {
          throw new Error('Gagal mengambil data pengurus BEM');
        }

        const data = await response.json();

        const mappedData: Executive[] = data.map((item: any) => {
          let positionLabel = mapPosition(item.position);

          if (item.position === 'ketua_department' && item.organization?.name) {
            positionLabel = `Kepala ${item.organization.name}`;
          }

          return {
            id: item.user_id.toString(),
            name: item.full_name,
            position: positionLabel,
            image: item.image || 'default.jpg',
            prodi: item.study_program,
            angkatan: item.year_enrolled?.toString() || '-',
            color: '#1c46b9',
            linkedin: item.linkedin || '',
            instagram: item.instagram || '',
            whatsapp: item.whatsapp || ''
          };
        });

        setExecutiveData(mappedData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Terjadi kesalahan tak diketahui');
        setIsLoading(false);
      }
    };

    fetchExecutiveData();
  }, []);

  const mapPosition = (pos: string) => {
    switch (pos) {
      case 'ketua_bem':
        return 'Ketua BEM';
      case 'wakil_ketua_bem':
        return 'Wakil Ketua BEM';
      case 'sekretaris_bem_1':
        return 'Sekretaris 1 BEM';
      case 'sekretaris_bem_2':
        return 'Sekretaris 2 BEM';
      case 'bendahara_bem_1':
        return 'Bendahara 1 BEM';
      case 'bendahara_bem_2':
        return 'Bendahara 2 BEM';
      case 'ketua_mpm':
        return 'Ketua MPM';
      case 'wakil_ketua_mpm':
        return 'Wakil Ketua MPM';
      case 'sekretaris_mpm':
        return 'Sekretaris MPM';
      case 'ketua_department':
        return 'Kepala Departemen';
      default:
        return pos.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  useEffect(() => {
    fetch(`${API_URL}/department`)
      .then(response => response.json())
      .then(data => {
        console.log('Departments API response:', data.data);
        setDepartments(data.data);
      })
  }, []);

  const getPriority = (pos: string) => {
    const priorities: Record<string, number> = {
      'ketua bem': 1,
      'wakil ketua bem': 2,
      'sekretaris 1 bem': 3,
      'sekretaris 2 bem': 4,
      'bendahara 1 bem': 5,
      'bendahara 2 bem': 6,
      'ketua mpm': 7,
      'wakil ketua mpm': 8,
      'sekretaris mpm': 9,
    };
    return priorities[pos.toLowerCase()] ?? 99;
  };

  const filteredExecutives = [...executiveData]
    .filter((executive) => {
      const pos = executive.position.toLowerCase();
      return !pos.includes('himpunan') && !pos.includes('ukm');
    })
    .sort((a, b) => getPriority(a.position) - getPriority(b.position));

  // Carousel logic: show 3 cards, slide 1 card at a time
  const visibleCards = 3;
  const maxSlide = Math.max(0, filteredExecutives.length - visibleCards);

  useEffect(() => {
    if (filteredExecutives.length <= visibleCards) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev >= maxSlide) {
          return 0;
        }
        return prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [maxSlide, filteredExecutives.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => {
      if (prev >= maxSlide) {
        return 0;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => {
      if (prev <= 0) {
        return maxSlide;
      }
      return prev - 1;
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] mt-12 overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute w-full h-full object-cover z-[-1]"
            style={{
              filter: 'brightness(0.9)',
              objectPosition: 'center 60%'
            }}
            src="/09301.mp4" />
          <div className="absolute inset-0 bg-black/20 z-[1]"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[70vh] text-center px-6">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 leading-tight tracking-tight drop-shadow-md">
                Profil
              </h1>
            </div>
            <p className="text-white/90 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10 font-light">
              Mengenal lebih dalam tentang organisasi mahasiswa yang berkomitmen
              membangun generasi unggul dan berkarakter di Institut Teknologi Del
            </p>
          </div>
        </div>

        <style jsx>{`
          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(10px); }
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
        `}</style>
      </section>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Maps Section */}
          <div className="mb-20">
            <div className="max-w-6xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold text-[#1c44ac] mb-4">Lokasi Kampus IT Del</h1>
              <div className="w-20 h-1 bg-[#1c44ac] mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Institut Teknologi Del berlokasi di desa Sitoluama, Laguboti, Toba, Sumatera Utara —
                tempat para mahasiswa berkembang menjadi generasi unggul dan berkarakter.
              </p>
            </div>

            <div className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
              <iframe
                title="Lokasi Institut Teknologi Del"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.3673457470372!2d99.1460578749683!3d2.3832151975960985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x302e00fdad2d7341%3A0xf59ef99c591fe451!2sInstitut%20Teknologi%20Del!5e0!3m2!1sid!2sid!4v1761879892744!5m2!1sid!2sid"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-3xl"
              ></iframe>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 via-transparent to-transparent text-white text-center py-6">
                <h3 className="text-2xl font-semibold mb-2">Institut Teknologi Del</h3>
                <p className="text-sm">Jl. Sisingamangaraja, Sitoluama, Laguboti, Toba, Sumatera Utara</p>
              </div>
            </div>
          </div>

          {/* Struktur Organisasi dengan Carousel */}
          <div className="relative py-20 px-10 mx-[-7vh] bg-white bg-[url('/gd5.png')] bg-cover bg-center bg-fixed">
            <div className="mb-20 text-center">
              <h1 className="text-4xl font-bold text-[#1c44ac] mb-4">Struktur Organisasi</h1>
              <div className="w-20 h-1 bg-[#1c44ac] mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Tim solid yang berdedikasi untuk memajukan kehidupan mahasiswa Institut Teknologi Del
              </p>

              <Link href="/user/profile/sejarah_kepengurusan">
                <button className="bg-gradient-to-r from-[#3367d6] to-[#1c44ac] hover:from-[#1c44ac] hover:to-[#3367d6] text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                  Lihat Sejarah Kepengurusan BEM
                </button>
              </Link>
            </div>

            <div className="relative max-w-6xl mx-auto">
              {isLoading ? (
                <div className="text-center py-20">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1c46b9]"></div>
                  <p className="mt-4 text-gray-600">Memuat data...</p>
                </div>
              ) : (
                <div className="relative flex items-center justify-center">
                  {/* Tombol Navigasi Kiri */}
                  {filteredExecutives.length > visibleCards && (
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#1c46b9] hover:bg-[#153a8a] text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <ChevronLeft size={24} />
                    </button>
                  )}

                  {/* Cards Container */}
                  <div className="overflow-hidden w-full px-16">
                    <div
                      className="flex transition-transform duration-700 ease-in-out"
                      style={{
                        transform: `translateX(calc(-${currentSlide * 33.333}% - ${currentSlide * 16}px))`
                      }}
                    >
                      {filteredExecutives.map((executive) => (
                        <div
                          key={executive.id}
                          className="flex-shrink-0 w-2/3 md:w-1/3 px-2"
                        >
                          <div className="relative group bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_60px_rgba(28,70,185,0.4)]">
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-500"></div>

                            <div className="relative bg-gradient-to-br from-white via-sky-50 to-blue-100 rounded-3xl m-[2px]">
                              <div className="relative p-6">
                                <div className="mb-6 relative">
                                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                                  <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-slate-600 to-slate-700 shadow-2xl ring-2 ring-white/10 group-hover:ring-white/30 transition-all duration-500">
                                    <img
                                      src={`${IMAGE_URL}/users/${executive.image}`}
                                      alt={executive.name}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                  </div>
                                </div>

                                <div className="text-center mb-6">
                                  <h3 className="text-md md:text-2xl font-bold text-gray-800 mb-2 leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-blue-400 transition-all duration-300">
                                    {executive.name}
                                  </h3>
                                  <div className="inline-block px-4 py-1.5 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-400/30 backdrop-blur-sm mb-4">
                                    <p className="text-gray-800 font-semibold text-[1.5vh] md:text-sm">
                                      {executive.position}
                                    </p>
                                  </div>
                                </div>

                                {/* Sosial Media */}
                                <div className="pt-6 border-t border-white/10">
                                  <div className="flex justify-center gap-3">
                                    {executive.linkedin && (
                                      <a
                                        href={executive.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-110"
                                      >
                                        <Linkedin size={18} />
                                      </a>
                                    )}
                                    {executive.instagram && (
                                      <a
                                        href={`https://instagram.com/${executive.instagram.replace('@', '')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-pink-500 to-orange-400 text-white rounded-xl hover:scale-110 transition-transform duration-300"
                                      >
                                        <Instagram size={18} />
                                      </a>
                                    )}
                                    {executive.whatsapp && (
                                      <a
                                        href={`https://wa.me/${executive.whatsapp}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-10 h-10 flex items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-xl transition-all duration-300 hover:scale-110"
                                      >
                                        <MessageCircle size={18} />
                                      </a>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tombol Navigasi Kanan */}
                  {filteredExecutives.length > visibleCards && (
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 bg-[#1c46b9] hover:bg-[#153a8a] text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <ChevronRight size={24} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Departemen Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-extrabold text-[#1c44ac] mb-4 mt-12">
                Departemen-Departemen BEM IT DEL
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-[#1c44ac] to-[#3b82f6] mx-auto mb-6 rounded-full"></div>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Mengenal lebih dekat berbagai departemen yang berperan aktif dalam memajukan kehidupan mahasiswa Institut Teknologi Del
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
              {departments.map((departemen) => (
                <div
                  key={departemen.id}
                  className="relative group bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1c44ac]/5 via-transparent to-[#3b82f6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-[#1c44ac] via-[#3b82f6] to-[#1c44ac] transition-all duration-700"></div>
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#1c44ac]/10 to-[#3b82f6]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-[#3b82f6]/10 to-[#1c44ac]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative p-8 text-center flex flex-col items-center">
                    <div className="relative mb-6 animate-float">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1c44ac] to-[#3b82f6] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                      <div className="relative w-32 h-32 rounded-full ring-4 ring-[#e6ecff] group-hover:ring-[#1c44ac] transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg bg-white">
                        <img
                          src={`${IMAGE_URL}/departments/${departemen.image}`}
                          alt={`Logo ${departemen.name}`}
                          className="w-28 h-28 object-cover transform group-hover:scale-110 transition-all duration-500 rounded-full"
                        />
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300"
                      style={{ color: departemen.color }}
                    >
                      {departemen.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 px-2 min-h-[3rem]">
                      {departemen.short_name}
                    </p>

                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#1c44ac]/30 to-transparent mb-6 group-hover:w-24 transition-all duration-500"></div>

                    <Link
                      href={`/user/profile/detail_departemen/${departemen.short_name}`}
                    >
                      <button className="relative bg-gradient-to-r from-[#3367d6] to-[#1c44ac] hover:from-[#1c44ac] hover:to-[#3367d6] text-white px-8 py-3 rounded-full font-semibold transition-all duration-500 group-hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden">
                        <span className="relative z-10 flex items-center gap-2">
                          Selengkapnya
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                        <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}