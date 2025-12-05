"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/layout/DataTable";
import { useRouter } from "next/navigation"; 
import NextImage from "next/image";
import ModalPortal from "@/components/modal/ModalPortal";

interface News {
  id: number;
  title: string;
  category: string;
  content: string;
  image_url?: string;
}

interface ApiResponse {
  status: string;
  message: string;
  metadata: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
    links: {
      first: string;
      last: string;
    };
  };
  data: News[];
}

const NewsPage: React.FC = () => {
  const [data, setData] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<News | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    setToken(stored);
  }, []);

  const fields = [
    { key: "title", label: "Judul Berita", type: "string" },
    { key: "category", label: "Kategori", type: "string" },
  ];

  // Filter states
  const [searchName, setSearchName] = useState("");
  const [searchProdi, setSearchProdi] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const fetchData = async (pageNumber: number) => {
    setLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("page", pageNumber.toString());
      params.append("per_page", "10");

      if (searchName.trim()) {
        params.append("name", searchName.trim());
      }
      if (searchProdi.trim()) {
        params.append("study_program", searchProdi.trim());
      }
      if (searchStatus.trim()) {
        params.append("status", searchStatus.trim());
      }

      let res = await fetch(
        `${API_URL}/student/news?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      let json: ApiResponse = await res.json();
      setData(json.data);
      setTotalPages(json.metadata.total_pages);
      setTotalItems(json.metadata.total_items);
      setPage(json.metadata.current_page);
    } catch (err) {
      console.error("Gagal fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchData(1);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const hasActiveFilters =
    searchName.trim() || searchProdi.trim() || searchStatus.trim();

  // ✅ perbaikan di sini
  const handleAdd = () => {
    router.push("/bem/news/create");
  };

  const handleEdit = (item: any) => {
    // DataTable bisa mengirim index (number) atau row object
    console.log("handleEdit called with:", item);
    let resolvedId: number | string | undefined;

    if (typeof item === "number") {
      const row = data[item];
      resolvedId = row?.id;
      if (!resolvedId) {
        console.warn("handleEdit: index provided but no row at that index", item);
      }
    } else if (item && typeof item === "object") {
      resolvedId = item.id ?? item.original?.id ?? item.row?.id;
      if (!resolvedId) {
        // fallback: try match by title
        const match = data.find((d) => item.title && d.title === item.title);
        if (match) resolvedId = match.id;
      }
    }

    if (!resolvedId) {
      console.warn("handleEdit: unable to resolve id from item:", item);
      alert("Gagal menemukan ID untuk diedit. Cek console untuk detail.");
      return;
    }

    router.push(`/bem/news/edit?id=${encodeURIComponent(resolvedId)}`);
  };

  const handleView = (item: any) => {
    let resolvedNews: News | undefined;

    if (typeof item === "number") {
      resolvedNews = data[item];
    } else if (item && typeof item === "object") {
      resolvedNews = {
        id: item.id ?? item.original?.id,
        title: item.title,
        category: item.category,
        content: item.content,
        image_url: item.image || item.image_url,
      };
    }

    if (!resolvedNews) {
      alert("Gagal menemukan data berita.");
      return;
    }

    setSelectedNews(resolvedNews);
    setIsModalOpen(true);
  };

  const handleDelete = async (item: News) => {

    try {
      const res = await fetch(
        `${API_URL}/student/news/${item.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      fetchData(page);
    } catch (err) {
      console.error("Gagal hapus data:", err);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const delta = 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (page > delta + 2) pages.push("...");
      const start = Math.max(2, page - delta);
      const end = Math.min(totalPages - 1, page + delta);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (page < totalPages - delta - 1) pages.push("...");
      if (totalPages > 1) pages.push(totalPages);
    }
    return pages;
  };

  const LoadingState = () => (
    <div className="min-h-96 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-spin">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-gray-600 font-medium">Memuat data news...</p>
        <div className="flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );

  if (loading) return <LoadingState />;

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Data Berita
            </h1>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAdd} // ✅ sudah diperbaiki
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg hover:from-green-600 hover:to-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Tambah Berita
            </button>
            <button
              onClick={handleSearch}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Cari
            </button>
          </div>
        </div>

        {/* Search input tetap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <label
              htmlFor="searchName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Judul Berita
            </label>
            <div className="relative">
              <input
                id="searchName"
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Cari Judul Berita"
                className="w-full pl-10 pr-4 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          data={data}
          fields={fields}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentPage={page}
          perPage={10}
        />
      </div>

      {/* Pagination tetap */}
      {totalPages > 1 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              Menampilkan{" "}
              <span className="font-medium text-gray-900">
                {(page - 1) * 10 + 1}
              </span>{" "}
              -{" "}
              <span className="font-medium text-gray-900">
                {Math.min(page * 10, totalItems)}
              </span>{" "}
              dari
              <span className="font-medium text-gray-900"> {totalItems}</span>{" "}
              data
              {hasActiveFilters && (
                <span className="text-blue-600"> (terfilter)</span>
              )}
            </div>

            <nav className="flex items-center space-x-1">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </button>

              <div className="hidden sm:flex items-center space-x-1">
                {getPageNumbers().map((num, idx) =>
                  typeof num === "number" ? (
                    <button
                      key={idx}
                      onClick={() => setPage(num)}
                      className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${num === page
                        ? "bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg transform scale-105"
                        : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:shadow-sm"
                        }`}
                    >
                      {num}
                    </button>
                  ) : (
                    <span
                      key={idx}
                      className="inline-flex items-center justify-center w-10 h-10 text-gray-400"
                    >
                      {num}
                    </span>
                  )
                )}
              </div>

              <div className="sm:hidden px-4 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg">
                {page} / {totalPages}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-sm"
              >
                Next
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      )}
      {isModalOpen && selectedNews && (
        <ModalPortal>
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-x-hidden">
            <div
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto animate-in zoom-in duration-300 overflow-x-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* === HEADER === */}
              <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-8 rounded-t-3xl">
                <div className="absolute top-0 right-0 w-72 h-72 bg-white opacity-10 rounded-full -mr-36 -mt-36 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-56 h-56 bg-white opacity-10 rounded-full -ml-28 -mb-28 blur-2xl"></div>

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <svg
                        className="w-9 h-9"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">Detail Berita</h2>
                      <p className="text-blue-100 text-sm mt-1">
                        Informasi lengkap
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-3 rounded-2xl bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm hover:rotate-90"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              {/* === BODY === */}
              <div className="p-8 space-y-8 bg-gradient-to-br from-gray-50 to-white">
                {/* Thumbnail */}
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                      {selectedNews ? (
                        <NextImage
                          src={`${IMAGE_URL}/news/${selectedNews.image_url}`}
                          alt={selectedNews.title}
                          width={256}
                          height={256}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src =
                              "/images/placeholder-news.jpg";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-dashed border-gray-400 rounded-3xl flex flex-col items-center justify-center space-y-3">
                          <svg
                            className="w-16 h-16 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm font-medium text-gray-500">
                            Tidak ada gambar
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Info Cards */}
                <div className="space-y-6">
                  {/* Judul */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-600 mb-3 ml-1 flex items-center space-x-2">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <svg
                          className="w-4 h-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          />
                        </svg>
                      </div>
                      <span>Judul Berita</span>
                    </label>
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-2xl border-2 border-blue-100 group-hover:border-blue-300 transition-all duration-300">
                      <p className="text-lg font-semibold text-gray-900 capitalize">
                        {selectedNews.title}
                      </p>
                    </div>
                  </div>

                  {/* Kategori */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-600 mb-3 ml-1 flex items-center space-x-2">
                      <div className="p-1.5 bg-indigo-100 rounded-lg">
                        <svg
                          className="w-4 h-4 text-indigo-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          />
                        </svg>
                      </div>
                      <span>Kategori</span>
                    </label>
                    <div className="inline-flex items-center space-x-3 text-base font-bold text-indigo-700 bg-gradient-to-r from-indigo-50 to-purple-50 px-6 py-3.5 rounded-2xl border-2 border-indigo-100 group-hover:border-indigo-300 transition-all">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-600"></span>
                      </span>
                      <span className="capitalize">
                        {selectedNews.category
                          ? selectedNews.category.replace(/<[^>]*>/g, "")
                          : "—"}
                      </span>
                    </div>
                  </div>

                  {/* Deskripsi */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-600 mb-3 ml-1 flex items-center space-x-2">
                      <div className="p-1.5 bg-purple-100 rounded-lg">
                        <svg
                          className="w-4 h-4 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <span>Deskripsi</span>
                    </label>
                    <div className="bg-gradient-to-r from-purple-50 to-rose-50 p-5 rounded-2xl border-2 border-purple-100 group-hover:border-purple-300 transition-all">
                      {selectedNews.content ? (
                        <div
                          className="text-base font-medium text-gray-800 prose max-w-none capitalize"
                          dangerouslySetInnerHTML={{ __html: selectedNews.content }}
                        />
                      ) : (
                        <p className="text-base font-medium text-gray-800">—</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalPortal>
      )}
    </div>
  );
};

export default NewsPage;
