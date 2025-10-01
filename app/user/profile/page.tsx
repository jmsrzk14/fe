'use client';

import { User, Star, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';

const kepalaDepartemenData = [
  {
    id: 'kevin-pardosi',
    name: 'Kevin Pardosi',
    position: 'Kepala DIPTEK',
    department: 'DIPTEK',
    prodi: 'Teknik Informatika',
    angkatan: '2022',
    initials: 'KP',
    emoji: '🔥',
    color: '#1c46b9'
  },
  {
    id: 'maria-simbolon',
    name: 'Maria Simbolon',
    position: 'Kepala DEPAGSOS',
    department: 'DEPAGSOS',
    prodi: 'Bioteknologi',
    angkatan: '2022',
    initials: 'MS',
    emoji: '💫',
    color: '#3b82f6'
  },
  {
    id: 'andi-siahaan',
    name: 'Andi Siahaan',
    position: 'Kepala DEPSENBUD',
    department: 'DEPSENBUD',
    prodi: 'Teknik Metalurgi',
    angkatan: '2021',
    initials: 'AS',
    emoji: '⭐',
    color: '#60a5fa'
  },
  {
    id: 'lisa-manurung',
    name: 'Lisa Manurung',
    position: 'Kepala DEPKOMINFO',
    department: 'DEPKOMINFO',
    prodi: 'Sistem Informasi',
    angkatan: '2022',
    initials: 'LM',
    emoji: '💼',
    color: '#93c5fd'
  },
  {
    id: 'robert-tampubolon',
    name: 'Robert Tampubolon',
    position: 'Kepala DEPKEBDIS',
    department: 'DEPKEBDIS',
    prodi: 'Teknik Elektro',
    angkatan: '2021',
    initials: 'RT',
    emoji: '⚡',
    color: '#1c46b9'
  },
  {
    id: 'sinta-nababan',
    name: 'Sinta Nababan',
    position: 'Kepala DPDK',
    department: 'DPDK',
    prodi: 'Manajemen Rekayasa',
    angkatan: '2021',
    initials: 'SN',
    emoji: '✨',
    color: '#60a5fa'
  },
  {
    id: 'tommy-simatupang',
    name: 'Tommy Simatupang',
    position: 'Kepala DPHM',
    department: 'DPHM',
    prodi: 'Teknik Informatika',
    angkatan: '2022',
    initials: 'TS',
    emoji: '🎯',
    color: '#93c5fd'
  },
  {
    id: 'rina-hutasoit',
    name: 'Rina Hutasoit',
    position: 'Kepala DEPOL',
    department: 'DEPOL',
    prodi: 'Bioteknologi',
    angkatan: '2021',
    initials: 'RH',
    emoji: '🌟',
    color: '#93c5fd'
  }
];

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

const statistikData = [
  {
    id: 'program-kerja',
    value: '50+',
    label: 'Program Kerja',
    icon: '🎯',
    bgColor: '#3b82f6',
    description: 'Program kerja yang telah berhasil dilaksanakan'
  },
  {
    id: 'mahasiswa-terlibat',
    value: '10K+',
    label: 'Mahasiswa Terlibat',
    icon: '👥',
    bgColor: '#3b82f6',
    description: 'Total mahasiswa yang berpartisipasi aktif'
  },
  {
    id: 'penghargaan',
    value: '25+',
    label: 'Penghargaan',
    icon: '🏆',
    bgColor: '#3b82f6',
    description: 'Penghargaan dan prestasi yang diraih'
  },
  {
    id: 'mitra-kerjasama',
    value: '100+',
    label: 'Mitra Kerjasama',
    icon: '🤝',
    bgColor: '#3b82f6',
    description: 'Kerjasama dengan berbagai institusi dan perusahaan'
  }
];

interface Executive {
  id: string;
  name: string;
  position: string;
  image: string;
  prodi: string;
  angkatan: string;
  color: string;
  emoji: string;
}

export default function ProfilePage() {
  const [showExecutiveCards, setShowExecutiveCards] = useState(false);
  const [activeFilter, setActiveFilter] = useState('semua');
  const [executiveData, setExecutiveData] = useState<Executive[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    const fetchExecutiveData = async () => {
      try {
        setIsLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('http://localhost:8080/api/bems/manage/2024-2025');
        if (!response.ok) {
          throw new Error('Failed to fetch executive data');
        }
        const data: {
          leader?: {
            user_name: string;
            full_name: string;
            position: string;
            study_program: string;
            year_enrolled: number;
            image: string;
          };
          coleader?: {
            user_name: string;
            full_name: string;
            position: string;
            study_program: string;
            year_enrolled: number;
            image: string;
          };
          secretary1?: {
            user_name: string;
            full_name: string;
            position: string;
            study_program: string;
            year_enrolled: number;
            image: string;
          };
          secretary2?: {
            user_name: string;
            full_name: string;
            position: string;
            study_program: string;
            year_enrolled: number;
            image: string;
          };
          treasurer1?: {
            user_name: string;
            full_name: string;
            position: string;
            study_program: string;
            year_enrolled: number;
            image: string;
          };
          treasurer2?: {
            user_name: string;
            full_name: string;
            position: string;
            study_program: string;
            year_enrolled: number;
            image: string;
          };
        } = await response.json();

        // Map API data to executiveData structure
        const mappedData: Executive[] = [];

        // Map leader (Ketua BEM)
        if (data.leader) {
          mappedData.push({
            id: data.leader.user_name.toLowerCase(),
            name: data.leader.full_name,
            position: data.leader.position === 'ketua_bem' ? 'Ketua BEM' : data.leader.position,
            image: data.leader.image,
            prodi: data.leader.study_program,
            angkatan: data.leader.year_enrolled.toString(),
            color: '#1c46b9',
            emoji: '🔥'
          });
        }

        // Map coleader (Wakil Ketua BEM)
        if (data.coleader) {
          mappedData.push({
            id: data.coleader.user_name.toLowerCase(),
            name: data.coleader.full_name,
            position: data.coleader.position === 'wakil_ketua_bem' ? 'Wakil Ketua BEM' : data.coleader.position,
            image: data.coleader.image,
            prodi: data.coleader.study_program,
            angkatan: data.coleader.year_enrolled.toString(),
            color: '#1c46b9',
            emoji: '⭐'
          });
        }

        if (data.secretary1) {
          mappedData.push({
            id: data.secretary1.user_name.toLowerCase(),
            name: data.secretary1.full_name,
            position: data.secretary1.position === 'sekretaris_bem_1' ? 'Sekretaris 1 BEM' : data.secretary1.position,
            image: data.secretary1.image,
            prodi: data.secretary1.study_program,
            angkatan: data.secretary1.year_enrolled.toString(),
            color: '#1c46b9',
            emoji: '📋'
          });
        }

        if (data.secretary2) {
          mappedData.push({
            id: data.secretary2.user_name.toLowerCase(),
            name: data.secretary2.full_name,
            position: data.secretary2.position === 'sekretaris_bem_2' ? 'Sekretaris 2 BEM' : data.secretary2.position,
            image: data.secretary2.image,
            prodi: data.secretary2.study_program,
            angkatan: data.secretary2.year_enrolled.toString(),
            color: '#1c46b9',
            emoji: '📋'
          });
        }

        if (data.treasurer1) {
          mappedData.push({
            id: data.treasurer1.user_name.toLowerCase(),
            name: data.treasurer1.full_name,
            position: data.treasurer1.position === 'bendahara_bem_1' ? 'Bendahara 1 BEM' : data.treasurer1.position,
            image: data.treasurer1.image,
            prodi: data.treasurer1.study_program,
            angkatan: data.treasurer1.year_enrolled.toString(),
            color: '#1c46b9',
            emoji: '📋'
          });
        }

        if (data.treasurer2) {
          mappedData.push({
            id: data.treasurer2.user_name.toLowerCase(),
            name: data.treasurer2.full_name,
            position: data.treasurer2.position === 'bendahara_bem_2' ? 'Bendahara 2 BEM' : data.treasurer2.position,
            image: data.treasurer2.image,
            prodi: data.treasurer2.study_program,
            angkatan: data.treasurer2.year_enrolled.toString(),
            color: '#1c46b9',
            emoji: '📋'
          });
        }

        setExecutiveData(mappedData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setIsLoading(false);
      }
    };

    fetchExecutiveData();
  }, []);

  useEffect(() => {
    // Fetch Departments
    fetch('http://localhost:8080/api/department')
      .then(response => response.json())
      .then(data => {
        console.log('Departments API response:', data.data);
        setDepartments(data.data);
      })
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] mt-12 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          {/* Video Background */}
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
          >
            <source src="/0930.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Light overlay for text visibility */}
          <div className="absolute inset-0 bg-black/20 z-[1]"></div>
        </div>

        {/* Main Content */}
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

        {/* Animations */}
        <style jsx>{`
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(10px);
            }
          }
          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }
        `}</style>
      </section>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-[#1c44ac] mb-4">Sejarah BEM IT DEL</h1>
            <div className="w-20 h-1 bg-[#1c44ac] mx-auto mb-6"></div>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Perjalanan panjang dalam membangun organisasi mahasiswa yang unggul dan berkarakter.
            </p>
          </div>

          {/* Timeline Section */}
          <div className="mb-20">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-12">

                {/* 2014 - Pendirian Organisasi */}
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#1c46b9] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    2014
                  </div>
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-[#1c46b9] rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">🏛️</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1c46b9]">Pendirian Organisasi</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Berdirinya Badan Eksekutif Mahasiswa Institut Teknologi Del sebagai wadah aspirasi dan kreativitas mahasiswa dalam mengembangkan
                      potensi akademik dan non-akademik. Organisasi ini didirikan dengan visi menjadi organisasi mahasiswa yang unggul, inovatif, dan
                      berkarakter.
                    </p>
                  </div>
                </div>

                {/* 2016 - Ekspansi Departemen */}
                <div className="flex items-start gap-8">
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-[#1c46b9] rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">🚀</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1c46b9]">Ekspansi Departemen</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Pembentukan departemen-departemen baru untuk mengakomodasi berbagai bidang pengembangan mahasiswa. Termasuk departemen
                      teknologi informasi, sosial kemasyarakatan, kewirausahaan, dan pengembangan diri yang menjadi pilar utama organisasi.
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-16 h-16 bg-[#1c46b9] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    2016
                  </div>
                </div>

                {/* 2019 - Era Digital */}
                <div className="flex items-start gap-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-[#1c46b9] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    2019
                  </div>
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-[#1c46b9] rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">💻</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1c46b9]">Era Digital</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Transformasi digital organisasi dengan peluncuran platform online untuk meningkatkan engagement dan komunikasi dengan mahasiswa
                      IT Del. Implementasi sistem informasi terintegrasi untuk manajemen organisasi yang lebih efektif dan transparan.
                    </p>
                  </div>
                </div>

                {/* 2024 - Inovasi Berkelanjutan */}
                <div className="flex items-start gap-8">
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-[#1c46b9] rounded-lg flex items-center justify-center">
                        <span className="text-white text-lg">🌟</span>
                      </div>
                      <h3 className="text-xl font-bold text-[#1c46b9]">Inovasi Berkelanjutan</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      Melanjutkan komitmen dalam mengembangkan program-program inovatif dan memperkuat kerjasama dengan berbagai pihak untuk
                      kemajuan mahasiswa. Fokus pada sustainability, digitalisasi, dan pemberdayaan mahasiswa di era modern.
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-16 h-16 bg-[#1c46b9] rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg order-1">
                    2024
                  </div>
                </div>


              </div>
            </div>
          </div>


          {/* Struktur Organisasi */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h1 className="text-4xl font-bold text-[#1c44ac] mb-4">Struktur Organisasi</h1>
              <div className="w-20 h-1 bg-[#1c44ac] mx-auto mb-6"></div>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Tim solid yang berdedikasi untuk memajukan kehidupan mahasiswa Institut Teknologi Del dengan semangat kolaborasi
              </p>
            </div>




            {/* Pengurus Inti Header */}
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-[#1c44ac] mb-4">Pengurus Inti</h2>
              <button
                onClick={() => setShowExecutiveCards(!showExecutiveCards)}
                className="inline-flex items-center bg-[#1c46b9] hover:bg-[#1c44ac] text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <span className="w-4 h-4 bg-white rounded-full mr-3"></span>
                <span className="text-sm font-medium">🔍Filter Periods ⚡</span>
                {showExecutiveCards ? (
                  <ChevronUp className="ml-3 w-4 h-4" />
                ) : (
                  <ChevronDown className="ml-3 w-4 h-4" />
                )}
              </button>
            </div>

            {/* Executive Cards - Conditional Rendering */}
            {showExecutiveCards && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                <style jsx>{`
                @keyframes slideDownFade {
                  0% {
                    opacity: 0;
                    transform: translateY(-50px) scale(0.9);
                  }
                  50% {
                    opacity: 0.5;
                    transform: translateY(-10px) scale(0.95);
                  }
                  100% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                  }
                }
                
                .executive-card {
                  animation: slideDownFade 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                }
                
                .executive-card:nth-child(2) { animation-delay: 0.1s; }
                .executive-card:nth-child(3) { animation-delay: 0.2s; }
                .executive-card:nth-child(4) { animation-delay: 0.3s; }
                .executive-card:nth-child(5) { animation-delay: 0.4s; }
              `}</style>

                {/* Loading State */}
                {isLoading && (
                  <div className="col-span-full text-center">
                    <p className="text-gray-600">Loading executive data...</p>
                  </div>
                )}

                {/* Error State */}
                {error && (
                  <div className="col-span-full text-center">
                    <p className="text-red-600">Error: {error}</p>
                  </div>
                )}

                {/* Dynamic Executive Cards */}
                {!isLoading && !error && executiveData.map((executive, index) => (
                  <div
                    key={executive.id}
                    className="executive-card bg-white rounded-3xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-100 opacity-0"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="text-center">
                      <div className="relative mb-4">
                        <div
                          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
                          style={{ backgroundColor: executive.color }}
                        >
                          <img
                            src={`http://localhost:8080/users/${executive.image}`}
                            alt={`Logo ${executive.image}`}
                            className="w-16 h-16 object-contain"
                          />
                        </div>
                        <div className="absolute -bottom-2 right-1/2 transform translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                        <div className="absolute top-0 left-0 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{executive.emoji}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mb-1">{executive.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{executive.position}</p>

                      <div className="text-left space-y-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-500">Program Studi:</span>
                          <span className="text-gray-700 font-medium">{executive.prodi}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-500">Angkatan:</span>
                          <span className="text-gray-700 font-medium">{executive.angkatan}</span>
                        </div>
                      </div>

                      <div className="flex justify-center space-x-3 mt-4">
                        <div className="w-8 h-8 bg-[#0077b5] rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">in</span>
                        </div>
                        <div className="w-8 h-8 bg-[#ea4335] rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Kepala Departemen Section */}
          <div className="relative py-20 bg-white bg-[url('/gd5.png')] bg-cover bg-center bg-fixed">
            <div className="mb-20 relative z-10">
              <div className="text-center mb-16">
                <h2 className="text-2xl font-bold text-[#1c44ac] mb-4">Kepala Departemen</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Para pemimpin departemen yang menjalankan program kerja strategis BEM IT Del
                </p>
              </div>

              {/* Department Heads Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {kepalaDepartemenData.map((kepala) => (
                  <div
                    key={kepala.id}
                    className="bg-white rounded-3xl shadow-xl p-6 transform hover:scale-105 transition-all duration-300 border border-gray-100"
                  >
                    <div className="text-center">
                      <div className="relative mb-4">
                        <div
                          className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
                          style={{ backgroundColor: kepala.color }}
                        >
                          <span className="text-white text-2xl font-bold">{kepala.initials}</span>
                        </div>
                        <div className="absolute -bottom-2 right-1/2 transform translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{kepala.emoji}</span>
                        </div>
                      </div>

                      <h3 className="text-lg font-bold text-gray-800 mb-1">{kepala.name}</h3>
                      <p className="text-sm text-blue-600 font-semibold mb-4">{kepala.position}</p>

                      <div className="text-left space-y-2 text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-500">Prodi:</span>
                          <span className="text-blue-600 font-medium">{kepala.prodi}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-500">Angkatan:</span>
                          <span className="text-blue-600 font-medium">{kepala.angkatan}</span>
                        </div>
                      </div>

                      <div className="flex justify-center space-x-3 mt-4">
                        <div className="w-8 h-8 bg-[#0077b5] rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">in</span>
                        </div>
                        <div className="w-8 h-8 bg-[#ea4335] rounded-lg flex items-center justify-center">
                          <span className="text-white text-xs font-bold">M</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

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
                  {/* Efek gradient animasi di background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1c44ac]/5 via-transparent to-[#3b82f6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Efek garis gradient di atas dengan animasi */}
                  <div className="absolute top-0 left-0 w-0 group-hover:w-full h-1 bg-gradient-to-r from-[#1c44ac] via-[#3b82f6] to-[#1c44ac] transition-all duration-700"></div>

                  {/* Decorative circles */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-[#1c44ac]/10 to-[#3b82f6]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-tr from-[#3b82f6]/10 to-[#1c44ac]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative p-8 text-center flex flex-col items-center">
                    {/* Department Icon dengan efek floating */}
                    <div className="relative mb-6 animate-float">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1c44ac] to-[#3b82f6] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                      <div className="relative w-32 h-32 rounded-full ring-4 ring-[#e6ecff] group-hover:ring-[#1c44ac] transition-all duration-300 flex items-center justify-center overflow-hidden shadow-lg bg-white">
                        <img
                          src={`http://localhost:8080/departments/${departemen.image}`}
                          alt={`Logo ${departemen.name}`}
                          className="w-28 h-28 object-cover transform group-hover:scale-110 transition-all duration-500 rounded-full"
                        />
                      </div>
                    </div>

                    {/* Nama Departemen */}
                    <h3
                      className="text-2xl font-bold mb-3 group-hover:scale-105 transition-transform duration-300"
                      style={{ color: departemen.color }}
                    >
                      {departemen.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 px-2 min-h-[3rem]">
                      {departemen.short_name}
                    </p>

                    {/* Divider subtle */}
                    <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-[#1c44ac]/30 to-transparent mb-6 group-hover:w-24 transition-all duration-500"></div>

                    {/* Tombol dengan efek lebih menarik */}
                    <button className="relative bg-gradient-to-r from-[#3367d6] to-[#1c44ac] hover:from-[#1c44ac] hover:to-[#3367d6] text-white px-8 py-3 rounded-full font-semibold transition-all duration-500 group-hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden">
                      <span className="relative z-10 flex items-center gap-2">
                        Selengkapnya
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-500"></span>
                    </button>
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
