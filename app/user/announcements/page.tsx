"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

interface Announcement {
  id: number;
  title: string;
  content: string;
  organization_id: number;
  file_url?: string | null;
  organization?: { id?: number; name?: string; short_name?: string } | null;
  author?: { id?: number; name?: string } | null;
  start_date?: string | null;
  end_date?: string | null;
  views?: number;
  shares?: number;
  category?: string;
  type?: "TERBARU" | "SEDANG" | "RENDAH";
}

export default function AnnouncementsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 18;
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [isLoadingToken, setIsLoadingToken] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const stored1 = sessionStorage.getItem("token");
    setToken(stored1);
    setIsLoadingToken(false);
  }, []);

  useEffect(() => {
    if (!token) return;

    const fetchAnnouncements = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/announcements`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        });

        const payload = res.data;
        const rows = payload?.data ?? [];
        setAnnouncements(Array.isArray(rows) ? rows : []);
      } catch (err) {
        console.error("fetch /api/announcements error:", err);
        setErrorMsg("Gagal memuat pengumuman");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, [token]);

  useEffect(() => {
    if (isLoadingToken) return; 
    if (!token) {
      Swal.fire({
        title: "Access Denied!",
        text: "Kamu harus login terlebih dahulu untuk mengakses halaman ini.",
        icon: "warning",
        confirmButtonText: "OK",
        confirmButtonColor: "#2563eb",
        background: "#fefefe",
        allowOutsideClick: false,
        customClass: {
          confirmButton: "swal-confirm-button",
        },
        didOpen: () => {
          const style = document.createElement("style");
          style.innerHTML = `
              .swal-confirm-button {
                color: #fff !important;
                background-color: #2563eb !important;
                border: none !important;
                border-radius: 8px !important;
                font-weight: 600 !important;
                padding: 10px 24px !important;
                box-shadow: none !important;
                transition: background-color 0.2s ease !important;
              }
              .swal-confirm-button:hover {
                background-color: #1d4ed8 !important; /* lebih gelap saat hover */
              }
            `;
          document.head.appendChild(style);
        },
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/auth/login");
        }
      });
      return;
    }
  }, [router, token, isLoadingToken]);

  const getPriorityBadge = useCallback((type: Announcement["type"]) => {
    switch (type) {
      case "TERBARU":
        return { bg: "bg-red-500", text: "text-white" };
      case "SEDANG":
        return { bg: "bg-yellow-500", text: "text-white" };
      default:
        return { bg: "bg-green-500", text: "text-white" };
    }
  }, []);

  // Filter dan pencarian
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((a) => {
      const org = (a.organization?.short_name || "").toLowerCase();
      const matchesFilter =
        activeFilter === "Semua" ||
        org.includes(activeFilter.toLowerCase());

      const text = (a.title || "") + " " + (a.content || "");
      const matchesSearch = text
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [announcements, activeFilter, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAnnouncements.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredAnnouncements.slice(start, start + itemsPerPage);
  }, [filteredAnnouncements, currentPage]);

  // Navigasi ke halaman detail
  const handleCardClick = useCallback(
    (announcementId: number) => {
      router.push(`/user/announcements/${announcementId}`);
    },
    [router]
  );

  // Pagination buttons
  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-br from-[#2563eb] to-[#3b82f6] py-16 md:py-20"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Pengumuman Terkini</h1>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Informasi terbaru dari organisasi mahasiswa Institut Teknologi Del
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="Cari pengumuman..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1); // reset ke halaman 1 saat mencari
              }}
              className="w-full px-4 py-3 pr-10 rounded-lg bg-white/90 text-gray-800 focus:ring-2 focus:ring-blue-200"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          </div>
        </div>
      </motion.section>

      {/* Daftar Pengumuman */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">
          Daftar Pengumuman
        </h2>

        {isLoading && <div className="text-center py-8 text-gray-500">Memuat...</div>}
        {errorMsg && <div className="text-center py-8 text-red-500">{errorMsg}</div>}
        {!isLoading && paginatedData.length === 0 && (
          <div className="text-center py-8 text-gray-600">Tidak ada pengumuman ditemukan.</div>
        )}

        {!isLoading && paginatedData.length > 0 && (
          <>
            {/* Grid Pengumuman */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedData.map((a, i) => {
                const badge = getPriorityBadge(a.type);
                let orgName = "Kemahasiswaan"; // default

                if (a.organization_id === 888) {
                  orgName = "BEM";
                } else if (a.organization_id === 999) {
                  orgName = "MPM";
                } else if (a.organization?.name) {
                  orgName = a.organization.short_name || a.organization.name;
                }

                const start = a.start_date
                  ? new Date(a.start_date).toLocaleDateString("id-ID", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  : "-";

                return (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    onClick={() => handleCardClick(a.id)}
                    className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden group"
                  >
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex justify-between items-center mb-3">
                        <span className={`${badge.bg} ${badge.text} text-xs px-3 py-1 rounded-full`}>
                          {a.type || "RENDAH"}
                        </span>
                        <span className="text-sm text-gray-500 font-medium">{orgName}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
                        {a.title}
                      </h3>
                    </div>

                    <div className="px-6 py-3 bg-white border-t">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(a.id);
                        }}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        Baca Selengkapnya
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md text-sm font-medium ${currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
              >
                Prev
              </button>

              {/* Nomor Halaman */}
              {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md text-sm font-medium ${currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
