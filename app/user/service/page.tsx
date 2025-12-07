'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Swal from "sweetalert2";
import {
  Projector,
  Laptop,
  Camera,
  Mic,
  Dumbbell,
  CheckCircle,
  Calendar,
  Lock,
  MessageCircle,
  MessagesSquare
} from 'lucide-react';

export default function ServicePage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [statusData, setStatusData] = useState<number>(0);
  const [isLoadingToken, setIsLoadingToken] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const stored = sessionStorage.getItem("username");
    setUsername(stored);
    const stored1 = sessionStorage.getItem("token");
    setToken(stored1);
    setIsLoadingToken(false);
  }, []);

  useEffect(() => {
    if (!token) return;
    let isMounted = true;

    const fetchStatus = async () => {
      if (!token) {
        if (isMounted) setStatusData(0);
        return;
      }

      try {
        const res = await fetch(`${API_URL}/status`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        const json = await res.json();

        if (json?.data?.status === 0 || json?.data?.status === 1) {
          if (isMounted) setStatusData(json.data.status);
        } else {
          console.warn('Status tidak valid dari API:', json);
          if (isMounted) setStatusData(0);
        }
      } catch (err) {
        console.error("Gagal mengambil status:", err);
        if (isMounted) setStatusData(0);
      }
    };

    fetchStatus();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // useEffect(() => {
  //   if (isLoadingToken) return; 
  //   if (!token) {
  //     Swal.fire({
  //       title: "Access Denied!",
  //       text: "Kamu harus login terlebih dahulu untuk mengakses halaman ini.",
  //       icon: "warning",
  //       confirmButtonText: "OK",
  //       confirmButtonColor: "#2563eb",
  //       background: "#fefefe",
  //       allowOutsideClick: false,
  //       customClass: {
  //         confirmButton: "swal-confirm-button",
  //       },
  //       didOpen: () => {
  //         const style = document.createElement("style");
  //         style.innerHTML = `
  //           .swal-confirm-button {
  //             color: #fff !important;
  //             background-color: #2563eb !important;
  //             border: none !important;
  //             border-radius: 8px !important;
  //             font-weight: 600 !important;
  //             padding: 10px 24px !important;
  //             box-shadow: none !important;
  //             transition: background-color 0.2s ease !important;
  //           }
  //           .swal-confirm-button:hover {
  //             background-color: #1d4ed8 !important; /* lebih gelap saat hover */
  //           }
  //         `;
  //         document.head.appendChild(style);
  //       },
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         router.push("/auth/login");
  //       }
  //     });
  //     return;
  //   }
  // }, [router, token, isLoadingToken]);

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
              className="inline-flex items-center bg-white rounded-full shadow-md px-6 py-3 mb-6 mt-12"
            >
              <div className="w-11 h-11 rounded-full flex items-center justify-center mr-3">
                <img src="/del.png" alt="Logo IT Del" />
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

      <div className="text-center mb-8 mt-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Layanan Peminjaman
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base mb-6">
          Layanan peminjaman fasilitas dan peralatan untuk mendukung berbagai kegiatan mahasiswa
        </p>
      </div>

      {/* Main Content Area */}
      <div className="py-8 bg-gradient-to-b from-blue-50 to-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4"
        >
          {/* Layanan Peminjaman - Redesigned */}
          <div className="grid grid-cols-1 gap-8 mb-16">
            {/* Integrated Sarana & Prasarana Service Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50/50 rounded-2xl p-6 md:p-8 border border-blue-100/70 shadow-sm relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full -mr-32 -mt-32 z-0"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-100/30 rounded-full -ml-20 -mb-20 z-0"></div>

                <div className="flex flex-col gap-6 relative z-10 h-full">
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 bg-gradient-to-br from-blue-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
                      <Projector className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Peminjaman Sarana & Prasarana</h3>
                  </div>

                  <p className="text-gray-600">
                    Layanan peminjaman peralatan dan aset organisasi untuk mendukung kegiatan mahasiswa seperti sound system, proyektor, dan peralatan lainnya.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-1">
                    <div>
                      <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-3">
                        <CheckCircle className="w-4 h-4 text-blue-500" /> Persyaratan
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5" />
                          <span>Mahasiswa aktif IT Del</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500 mt-0.5" />
                          <span>Kartu identitas yang masih berlaku</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 mt-auto pt-4 gap-4">
                    <Link
                      href="/user/service/sarpras_form"
                      className="block text-center w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all"
                    >
                      Isi Form Peminjaman
                    </Link>

                    {username && (
                      <Link
                        href={`/user/service/sarpras_status/${username}`}
                        className="block text-center w-full py-4 px-6 bg-white hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all"
                      >
                        Lihat Status Peminjaman
                      </Link>
                    )}

                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 bg-white/80 rounded-full px-3 py-1.5 md:col-span-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>Sistem Online 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>


          {/* Departemen Olahraga Section */}
          <div className="border-t border-gray-200 pt-10 pb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                Departemen Olahraga
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base mb-6">
                Layanan peminjaman peralatan olahraga untuk kegiatan mahasiswa
              </p>
            </div>

            {/* Departemen Olahraga Card - Full Width */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="h-full mb-16"
            >
              <div className="bg-gradient-to-r from-green-50 to-emerald-50/50 rounded-2xl p-6 md:p-8 border border-green-100/70 shadow-sm relative overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-64 h-64 bg-green-100/30 rounded-full -mr-32 -mt-32 z-0"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-100/30 rounded-full -ml-20 -mb-20 z-0"></div>

                <div className="flex flex-col gap-6 relative z-10 h-full">
                  <div className="flex items-center gap-4">
                    <div className="shrink-0 bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-2xl shadow-lg">
                      <Dumbbell className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">Peminjaman Peralatan Olahraga</h3>
                  </div>

                  <p className="text-gray-600">
                    Layanan peminjaman peralatan olahraga untuk mendukung kegiatan mahasiswa seperti pertandingan, latihan, dan kegiatan rekreasi lainnya. Fasilitas ini bertujuan untuk mendorong gaya hidup sehat dan aktif di kalangan mahasiswa.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-1">
                    <div>
                      <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-3">
                        <CheckCircle className="w-4 h-4 text-green-500" /> Yang Dapat Dipinjam
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="bg-green-100 p-1 rounded-md mt-0.5">
                            <Dumbbell className="w-3.5 h-3.5 text-green-600" />
                          </span>
                          <span>Bola Basket, Voli, Sepak Bola</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-green-100 p-1 rounded-md mt-0.5">
                            <Dumbbell className="w-3.5 h-3.5 text-green-600" />
                          </span>
                          <span>Net dan Peralatan Voli</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="bg-green-100 p-1 rounded-md mt-0.5">
                            <Dumbbell className="w-3.5 h-3.5 text-green-600" />
                          </span>
                          <span>Raket dan Kok Badminton</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 mt-auto pt-4 gap-4">
                    <Link
                      href="/user/service/depol_form"
                      className="block text-center w-full py-4 px-6 bg-green-600 hover:bg-green-700 active:bg-green-800 active:scale-[0.98] text-white font-semibold rounded-xl transition-all duration-200 transform active:translate-y-0.5 active:shadow-inner shadow-lg shadow-green-500/20 hover:shadow-xl hover:shadow-green-500/25 text-white font-semibold rounded-xl transition-all"
                    >
                      Isi Form Peminjaman
                    </Link>

                    {username && (
                      <Link
                        href={`/user/service/depol_status/${username}`}
                        className="block text-center w-full py-4 px-6 bg-white hover:bg-gray-200 text-gray-800 font-semibold rounded-xl transition-all"
                      >
                        Lihat Status Peminjaman
                      </Link>
                    )}

                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 bg-white/80 rounded-full px-3 py-1.5 md:col-span-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Sistem Online 24/7</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Aspirasi Mahasiswa Section */}
          <div className="mb-0">
            <div className="grid grid-cols-1 gap-8 mb-6">
              {/* Aspirasi Card - Integrated */}
              <div className="border-t border-gray-200 pt-20 pb-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Aspirasi Mahasiswa
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
                    Sampaikan saran, kritik, dan masukan untuk kemajuan kampus
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 mb-12">
                  {/* Aspirasi Card - Integrated */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                    className="h-full"
                  >
                    <div
                      className={`rounded-2xl p-6 md:p-8 border shadow-sm relative overflow-hidden h-full transition-all duration-300 ${statusData === 0
                        ? 'bg-gray-100 border-gray-300 cursor-not-allowed opacity-60'
                        : 'bg-gradient-to-r from-purple-50 to-violet-50/50 border-purple-100/70'
                        }`}
                    >
                      {/* Background Circles - Hanya tampil jika aktif */}
                      {statusData === 1 && (
                        <>
                          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-100/30 rounded-full -mr-32 -mt-32 z-0"></div>
                          <div className="absolute bottom-0 left-0 w-40 h-40 bg-violet-100/30 rounded-full -ml-20 -mb-20 z-0"></div>
                        </>
                      )}

                      <div className="flex flex-col gap-6 relative z-10 h-full">
                        <div className="flex items-center gap-4">
                          <div
                            className={`shrink-0 p-4 rounded-2xl shadow-lg ${statusData === 0
                              ? 'bg-gray-400'
                              : 'bg-gradient-to-br from-purple-500 to-violet-600'
                              }`}
                          >
                            <MessagesSquare className={`w-8 h-8 ${statusData === 0 ? 'text-gray-600' : 'text-white'}`} />
                          </div>
                          <div>
                            <h3 className={`text-xl font-bold ${statusData === 0 ? 'text-gray-500' : 'text-gray-800'}`}>
                              Aspirasi Mahasiswa
                            </h3>
                            {statusData === 0 && (
                              <p className="text-sm text-gray-500 mt-1">Layanan sementara tidak tersedia</p>
                            )}
                          </div>
                        </div>

                        <p className={`${statusData === 0 ? 'text-gray-500' : 'text-gray-600'}`}>
                          {statusData === 0
                            ? 'Layanan pengajuan aspirasi sedang dinonaktifkan oleh admin.'
                            : 'Layanan Aspirasi Mahasiswa adalah saluran resmi untuk menyampaikan pendapat, ide, saran, dan masukan dari mahasiswa kepada pihak kampus melalui BEM IT Del.'}
                        </p>

                        {/* Konten hanya muncul jika aktif */}
                        {statusData === 1 ? (
                          <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-1">
                              <div>
                                <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-3">
                                  <CheckCircle className="w-4 h-4 text-purple-500" /> Jenis Aspirasi
                                </h4>
                                <ul className="text-sm text-gray-600 space-y-2">
                                  <li className="flex items-start gap-2">
                                    <span className="bg-purple-100 p-1 rounded-md mt-0.5">
                                      <MessageCircle className="w-3.5 h-3.5 text-purple-600" />
                                    </span>
                                    <span>Saran pengembangan fasilitas</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="bg-purple-100 p-1 rounded-md mt-0.5">
                                      <MessageCircle className="w-3.5 h-3.5 text-purple-600" />
                                    </span>
                                    <span>Masukan kegiatan kampus</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <span className="bg-purple-100 p-1 rounded-md mt-0.5">
                                      <MessageCircle className="w-3.5 h-3.5 text-purple-600" />
                                    </span>
                                    <span>Ide inovasi layanan mahasiswa</span>
                                  </li>
                                </ul>
                              </div>

                              <div>
                                <h4 className="font-medium text-gray-800 flex items-center gap-2 mb-3">
                                  <CheckCircle className="w-4 h-4 text-purple-500" /> Proses Penanganan
                                </h4>
                                <ul className="text-sm text-gray-600 space-y-2">
                                  <li className="flex items-start gap-2">
                                    <CheckCircle className="w-3.5 h-3.5 text-purple-500 mt-0.5" />
                                    <span>Pencatatan aspirasi dalam sistem</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle className="w-3.5 h-3.5 text-purple-500 mt-0.5" />
                                    <span>Peninjauan & kategorisasi</span>
                                  </li>
                                  <li className="flex items-start gap-2">
                                    <CheckCircle className="w-3.5 h-3.5 text-purple-500 mt-0.5" />
                                    <span>Tindak lanjut & koordinasi</span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </>
                        ) : (
                          /* Tampilan saat nonaktif */
                          <div className="flex items-center justify-center py-8">
                            <div className="text-center">
                              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                              <p className="text-gray-500 font-medium">Layanan Ditutup Sementara</p>
                              <p className="text-xs text-gray-400 mt-1">Pihak BEM sedang menutup fitur aspirasi.</p>
                            </div>
                          </div>
                        )}

                        {/* Tombol */}
                        <div className="mt-auto pt-4">
                          {statusData === 1 ? (
                            <Link
                              href="/user/service/aspirasi_form"
                              className="block text-center w-full py-4 px-6 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 active:scale-[0.98] text-white font-semibold rounded-xl transition-all duration-200 transform active:translate-y-0.5 active:shadow-inner shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/25"
                            >
                              Sampaikan Aspirasi Anda
                            </Link>
                          ) : (
                            <button
                              disabled
                              className="block w-full py-4 px-6 bg-gray-400 text-gray-600 font-semibold rounded-xl cursor-not-allowed"
                            >
                              Layanan Tidak Tersedia
                            </button>
                          )}

                          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 bg-white/80 rounded-full px-3 py-1.5">
                            <div className={`w-2 h-2 rounded-full ${statusData === 1 ? 'bg-purple-400 animate-pulse' : 'bg-gray-400'}`}></div>
                            <span>{statusData === 1 ? 'Sistem Online 24/7' : 'Sistem Offline'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

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
