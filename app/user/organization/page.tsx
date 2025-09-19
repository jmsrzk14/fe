'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import { Users, Target, Calendar, Award, Briefcase, User, Star, Sparkles, RefreshCw, AlertCircle } from 'lucide-react';
import { Viga } from "next/font/google";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';

const viga = Viga({
  weight: "400",
  subsets: ["latin"],
});

interface Himpunan {
  id: number;
  name: string;
  short_name: string;
  image: string;
  vision: string;
  mission: string;
  values: string;
  created_at: string;
  updated_at: string;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Himpunan[];
}

export default function OrganizationPage() {
  const [himpunan, setHimpunan] = useState<Himpunan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchHimpunanData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:8080/api/association', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();
      setHimpunan(result.data); // Set the fetched data to state
    } catch (err) {
      console.error('Error fetching himpunan data:', err);
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan saat memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHimpunanData();
  }, [retryCount]);

  // Loading Component
  const LoadingState = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mb-6"
      />
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Memuat Data Himpunan</h3>
      <p className="text-gray-500">Sedang mengambil informasi terbaru...</p>
    </div>
  );

  // Error Component
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.6 }}
        className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6"
      >
        <AlertCircle className="w-8 h-8 text-red-600" />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-700 mb-2">Gagal Memuat Data</h3>
      <p className="text-gray-500 mb-6 text-center max-w-md">{error}</p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setRetryCount(prev => prev + 1)} // Trigger refetch on click
        className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Coba Lagi
      </motion.button>
    </div>
  );

  return (
    <div className="text-center mb-16">
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

        {/* Main content */}
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
                    <img src="./del.png" alt="Institut Teknologi Del" />
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
                className={`${viga.className} text-[3.5em] font-bold text-white`}
              >
                Organisasi Mahasiswa
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`${viga.className} text-[3.5em] font-bold text-white`}
              >
                HIMPUNAN MAHASISWA
              </motion.h1>
              <div className="w-40 h-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_15px_rgba(0,200,255,0.8)] mt-3"></div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`${viga.className} mt-6 w-[40em] text-xl text-white mb-[6em]`}
              >
                Wadah pengembangan akademik dan non-akademik mahasiswa sesuai dengan bidang keahlian masing-masing program studi di Institut Teknologi Del
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      <div className="relative min-h-[60vh] bg-gradient-to-r from-[#F9FBFF] to-[#E9F5FF] overflow-hidden px-16 py-16 mb-[-4em]">
        {/* Blur Circles */}
        <div className="absolute top-10 left-10 w-24 h-24 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
        <div className="absolute top-32 left-1/3 w-48 h-48 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-20 right-10 w-20 h-20 bg-cyan-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse"></div>

        <div className='flex flex-col items-center'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={`${viga.className} text-[3.5em] font-bold text-transparent font-bold bg-clip-text bg-gradient-to-r from-blue-800 to-blue-400`}
          >
            Himpunan Mahasiswa
          </motion.h1>
          <p className='mt-4 w-[30em] text-xl mb-6'>
            Organisasi mahasiswa berdasarkan program studi untuk pengembangan akademik dan non-akademik
          </p>
          <div className="w-40 h-1 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_15px_rgba(0,200,255,0.8)] mb-[6em]"></div>
        </div>

        {/* Conditional Rendering */}
        {loading ? (
          <LoadingState />
        ) : error && himpunan.length === 0 ? (
          <ErrorState />
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {himpunan.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="shadow-lg hover:shadow-2xl transition duration-300 rounded-2xl bg-white border border-gray-100 h-full">
                  <CardHeader className="flex flex-col items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="p-4 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-600 mb-4 shadow-lg shadow-blue-300/50 flex items-center justify-center"
                    >
                    <img 
                        src={`association.image`} 
                        alt={`Logo ${item.image}`}
                        className="w-10 h-10 object-contain"
                      />
                    </motion.div>
                    <CardTitle className="text-xl font-bold">{item.name}</CardTitle>
                    <CardDescription className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                      {item.short_name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center flex-1 flex flex-col">
                    <Progress className="mb-4 w-[7em] h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 shadow-[0_0_15px_rgba(0,200,255,0.8)] mx-auto" />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-2 px-4 bg-gradient-to-r from-cyan-400 to-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition"
                      onClick={() => {
                        console.log('View detail for:', item.name);
                      }}
                    >
                      Lihat Detail
                    </motion.button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}