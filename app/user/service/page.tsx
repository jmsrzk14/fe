'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Projector,
  Laptop,
  Camera,
  Mic,
  Settings,
  Dumbbell,
  Building,
  Users,
  CheckCircle,
  FileText,
  Package,
  Lock
} from 'lucide-react';

const layananData = {
  saranaPrasarana: [
    {
      id: 1,
      name: 'Proyektor dan Sound System',
      icon: Projector,
      description: 'Gratis untuk mahasiswa aktif',
      available: true,
      category: 'Audio Visual'
    },
    {
      id: 2,
      name: 'Laptop Presentasi',
      icon: Laptop,
      description: 'Proses pengajuan online',
      available: true,
      category: 'Teknologi'
    },
    {
      id: 3,
      name: 'Kamera DSLR',
      icon: Camera,
      description: 'Notifikasi real-time',
      available: false,
      category: 'Dokumentasi'
    },
    {
      id: 4,
      name: 'Microphone Wireless',
      icon: Mic,
      description: 'Sistem antrian otomatis',
      available: true,
      category: 'Audio'
    },
    {
      id: 5,
      name: 'Tripod dan Lighting',
      icon: Settings,
      description: 'Sistem booking terintegrasi',
      available: true,
      category: 'Studio'
    },
    {
      id: 6,
      name: 'Peralatan Olahraga',
      icon: Dumbbell,
      description: 'Akses 24/7 untuk mahasiswa',
      available: true,
      category: 'Olahraga'
    }
  ],
  departemenOlahraga: [
    {
      id: 1,
      name: 'Ruang Seminar (50 orang)',
      icon: Building,
      description: 'Gratis untuk kegiatan akademik',
      available: true,
      category: 'Ruangan'
    },
    {
      id: 2,
      name: 'Ruang Rapat (15 orang)',
      icon: Users,
      description: 'Sistem booking online',
      available: true,
      category: 'Meeting'
    },
    {
      id: 3,
      name: 'Aula Utama (200 orang)',
      icon: Building,
      description: 'Peminjaman jangka pendek',
      available: false,
      category: 'Event'
    },
    {
      id: 4,
      name: 'Lab Komputer (30 orang)',
      icon: Laptop,
      description: 'Akses internet gratis',
      available: true,
      category: 'Laboratorium'
    },
    {
      id: 5,
      name: 'Studio Media',
      icon: Camera,
      description: 'Peralatan lengkap tersedia',
      available: true,
      category: 'Produksi'
    },
    {
      id: 6,
      name: 'Ruang Meeting',
      icon: Users,
      description: 'Fasilitas modern dan nyaman',
      available: true,
      category: 'Diskusi'
    }
  ]
};

const persyaratanData = [
  {
    id: 1,
    title: 'Mahasiswa aktif IT Del',
    description: 'Wajib memiliki kartu mahasiswa yang masih berlaku',
    icon: CheckCircle,
    color: 'text-green-600'
  },
  {
    id: 2,
    title: 'Surat permohonan resmi',
    description: 'Dari organisasi atau individu yang mengajukan',
    icon: FileText,
    color: 'text-blue-600'
  },
  {
    id: 3,
    title: 'Penanggungjawab yang jelas',
    description: 'Minimal 1 orang penanggung jawab yang dapat dihubungi',
    icon: Users,
    color: 'text-purple-600'
  }
];

const filterData = [
  { id: 'semua', label: 'Semua Layanan', isActive: true },
  { id: 'sarana', label: 'Sarana Prasarana', isActive: false },
  { id: 'olahraga', label: 'Departemen Olahraga', isActive: false }
];

// Sarana Prasarana Card Component
const SaranaCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      console.log('Handling login');
      setIsLoading(true);
      setLoginStatus('loading');
      
      // Simulasi loading
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setLoginStatus('success');
      
      // Redirect to form page
      setTimeout(() => {
        console.log('Redirecting to form page');
        router.push('/user/service/sarpras_form');
      }, 1000);
    } catch (error) {
      console.error('Error in handleLogin:', error);
      setIsLoading(false);
      setLoginStatus('idle');
    }
  };

  const getButtonContent = () => {
    switch (loginStatus) {
      case 'loading':
        return (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Menghubungkan...</span>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Berhasil! Mengalihkan...</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Lanjut untuk Menggunakan Layanan</span>
          </div>
        );
    }
  };

  const getButtonStyles = () => {
    switch (loginStatus) {
      case 'loading':
        return 'bg-gray-500';
      case 'success':
        return 'bg-green-500';
      default:
        return 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40';
    }
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 w-full h-full transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl cursor-pointer" onClick={handleLogin}>
      {/* Direct link added for fallback navigation */}
      <Link href="/user/service/sarpras_form" className="absolute inset-0 z-0">
        <span className="sr-only">Buka form peminjaman</span>
      </Link>
      {/* Subtle top accent */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-blue-500 rounded-full"></div>
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto">
            <Projector className="w-8 h-8 text-white" />
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl blur-lg opacity-20 -z-10"></div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Peminjaman Sarana Prasarana
        </h1>
        
        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
          Layanan peminjaman peralatan dan aset organisasi untuk mendukung kegiatan mahasiswa seperti sound system, proyektor, dan peralatan lainnya.
        </p>
      </div>

      {/* Features highlights */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="text-center p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
          <div className="text-2xl mb-1">📋</div>
          <div className="text-xs font-medium text-gray-700">Prosedur Resmi</div>
        </div>
        <div className="text-center p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
          <div className="text-2xl mb-1">🖥️</div>
          <div className="text-xs font-medium text-gray-700">Peminjaman Alat </div>
        </div>
      </div>

      {/* Login Button */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // Mencegah event bubbling
          handleLogin();
        }}
        disabled={isLoading}
        className={`
          relative w-full py-4 px-6 rounded-2xl text-white font-semibold text-sm
          transition-all duration-300 transform hover:-translate-y-1
          focus:outline-none focus:ring-4 focus:ring-blue-500/20
          disabled:cursor-not-allowed disabled:transform-none
          overflow-hidden group
          ${getButtonStyles()}
        `}
      >
        {/* Button shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <div className="relative z-10">
          {loginStatus === 'idle' ? (
            <div className="flex items-center justify-center space-x-2">
              <span>Isi Form Peminjaman</span>
            </div>
          ) : (
            getButtonContent()
          )}
        </div>
      </button>

      {/* Footer */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 text-xs text-gray-500 bg-gray-50/50 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <span>Sistem Online</span>
        </div>
      </div>
    </div>
  );
};

// Departemen Olahraga Card Component
const DepolCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    setLoginStatus('loading');
    
    // Simulasi loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoginStatus('success');
    
    setTimeout(() => {
      // Navigasi ke halaman form depol
      router.push('/user/service/depol_form');
    }, 1000);
  };

  const getButtonContent = () => {
    switch (loginStatus) {
      case 'loading':
        return (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Menghubungkan...</span>
          </div>
        );
      case 'success':
        return (
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Berhasil! Mengalihkan...</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center space-x-2">
            <Lock className="w-4 h-4" />
            <span>Lanjut untuk Menggunakan Layanan</span>
          </div>
        );
    }
  };

  const getButtonStyles = () => {
    switch (loginStatus) {
      case 'loading':
        return 'bg-gray-500';
      case 'success':
        return 'bg-green-500';
      default:
        return 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40';
    }
  };

  return (
    <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 w-full h-full transform transition-all duration-500 hover:scale-[1.02] hover:shadow-3xl">
      {/* Subtle top accent */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-green-500 rounded-full"></div>
      
      {/* Header */}
      <div className="text-center mb-8">
        <div className="relative inline-block mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur-lg opacity-20 -z-10"></div>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Peminjaman Olahraga
        </h1>
        
        <p className="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">
          Layanan peminjaman peralatan olahraga untuk kegiatan mahasiswa seperti pertandingan, latihan, dan kegiatan rekreasi lainnya.
        </p>
      </div>

      {/* Features highlights */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="text-center p-3 bg-yellow-50/50 rounded-xl border border-yellow-200/50">
          <div className="text-2xl mb-1">📋</div>
          <div className="text-xs font-medium text-gray-700">Prosedur Resmi</div>
        </div>
        <div className="text-center p-3 bg-green-50/50 rounded-xl border border-green-100/50">
          <div className="text-2xl mb-1">⚽</div>
          <div className="text-xs font-medium text-gray-700">Peralatan Olahraga</div>
        </div>
      </div>

      {/* Login Button */}
      <button
        onClick={handleLogin}
        disabled={isLoading}
        className={`
          relative w-full py-4 px-6 rounded-2xl text-white font-semibold text-sm
          transition-all duration-300 transform hover:-translate-y-1
          focus:outline-none focus:ring-4 focus:ring-green-500/20
          disabled:cursor-not-allowed disabled:transform-none
          overflow-hidden group
          ${getButtonStyles()}
        `}
      >
        {/* Button shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        
        <div className="relative z-10">
          {getButtonContent()}
        </div>
      </button>

      {/* Footer */}
      <div className="mt-6 text-center">
        <div className="inline-flex items-center space-x-2 text-xs text-gray-500 bg-gray-50/50 px-3 py-1.5 rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>Sistem Online</span>
        </div>
      </div>
    </div>
  );
};

export default function ServicePage() {
  const [activeFilter, setActiveFilter] = useState('semua');
  const [activePage, setActivePage] = useState(1);
  const [activeTab, setActiveTab] = useState('layanan');

  return (
    <div>
      {/* Hero Section - Service */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative min-h-[60vh] bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 overflow-hidden py-16"
      >
        <div className="absolute inset-0">
          {/* Background decorations */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-20 w-48 h-48 bg-white/5 rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 right-10 w-24 h-24 bg-cyan-400/20 rounded-full"></div>

          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-[60vh] text-center px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center bg-white rounded-full shadow-md px-6 py-3 mb-6"
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center mr-3">
                <img src="./del.png" alt="Logo IT Del" />
              </div>
              <span className="text-[1.2em] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Institut Teknologi Del
              </span>
            </motion.div>

            <div className="flex flex-col items-center">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-[3.5em] font-bold text-white"
              >
                Layanan Mahasiswa
              </motion.h1>

              <div className="w-40 h-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_15px_rgba(0,200,255,0.8)] mt-3"></div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mt-6 max-w-3xl text-xl text-white/90 mb-[6em]"
              >
                Berbagai layanan digital yang memudahkan mahasiswa dalam mengakses fasilitas dan menyampaikan aspirasi
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>
      
     <div className="text-center mb-12 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Informasi Layanan
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          Tetap update dengan informasi terbaru dari organisasi mahasiswa
        </p>
      </div>



      {/* Main Content Area */}
      <div className="py-16 bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4"
        >
          {/* Two Cards Side by Side - Enhanced Design */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Sarana Prasarana Card - Enhanced Interactive Style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <SaranaCard />
            </motion.div>

            {/* Departemen Olahraga Card - Enhanced Interactive Style */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <DepolCard />
            </motion.div>
          </div>
          
          {/* Contact Section */}

          <div className="mt-20 mb-16 bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-50 rounded-full -ml-32 -mb-32"></div>
            
            <div className="relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Butuh Bantuan?</h2>
                <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mx-auto mb-6"></div>
                <p className="text-lg text-gray-600">
                  Jika Anda memiliki pertanyaan atau membutuhkan informasi lebih lanjut tentang peminjaman, silahkan hubungi kami.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl text-center hover:shadow-md transition-all">
                  <div className="w-14 h-14 mx-auto bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-blue-700">bem@del.ac.id</p>
                </div>
                
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl text-center hover:shadow-md transition-all">
                  <div className="w-14 h-14 mx-auto bg-green-600 rounded-xl flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">WhatsApp</h3>
                  <p className="text-green-700">+62 812-3456-7890</p>
                </div>
                
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-2xl text-center hover:shadow-md transition-all">
                  <div className="w-14 h-14 mx-auto bg-purple-600 rounded-xl flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Instagram</h3>
                  <p className="text-purple-700">@bem_itdel</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
