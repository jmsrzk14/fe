"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/layout/DataTable";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import ModalPortal from "@/components/modal/ModalPortal";

interface Announcement {
  id: number;
  title: string;
  content: string;
  file_url?: string;
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
  data: Announcement[];
}

const AnnouncementPage: React.FC = () => {
  const [data, setData] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [SelectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    setToken(stored);
  }, []);

  // Filter states
  const [searchTitle, setSearchTitle] = useState("");
  const [searchContent, setSearchContent] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const fields = [
    { key: "title", label: "Judul Pengumuman", type: "string" },
    { key: "content", label: "Deskripsi", type: "string" },
  ];

  const fetchData = async (
    pageNumber: number,
    filters: { title?: string; content?: string; category?: string } = {}
  ) => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append("page", pageNumber.toString());
      params.append("per_page", "10");
      if (filters.title?.trim()) params.append("title", filters.title.trim());
      if (filters.content?.trim())
        params.append("content", filters.content.trim());
      if (filters.category?.trim())
        params.append("category", filters.category.trim());

      const res = await fetch(
        `${API_URL}/student/announcement?${params.toString()}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const json: ApiResponse = await res.json();
      setData(json.data);
      setTotalPages(json.metadata.total_pages);
      setTotalItems(json.metadata.total_items);
      setPage(json.metadata.current_page);
    } catch (err) {
      console.error("Gagal fetch data:", err);
      setError("Gagal memuat data. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchData(1, {
      title: searchTitle,
      content: searchContent,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleReset = () => {
    setSearchTitle("");
    setSearchContent("");
    setPage(1);
    fetchData(1);
  };

  const handleAdd = () => {
    router.push("/himpunan/announcement/create");
  };

  const handleEdit = (item: any) => {
    let resolvedId: number | string | undefined;

    if (typeof item === "number") {
      const row = data[item];
      resolvedId = row?.id;
      if (!resolvedId) console.warn("handleEdit: no row at index", item);
    } else if (item && typeof item === "object") {
      resolvedId = item.id ?? item.original?.id ?? item.row?.id;
      if (!resolvedId) {
        const match = data.find((d) => (item.title && d.title === item.title));
        if (match) resolvedId = match.id;
      }
    }

    if (!resolvedId) {
      console.warn("handleEdit: unable to resolve id from item:", item);
      alert("Gagal menemukan ID pengumuman untuk diedit. Cek console untuk detail.");
      return;
    }

    router.push(`/himpunan/announcement/edit?id=${encodeURIComponent(resolvedId)}`);
  };

  const handleView = (item: any) => {
    let resolvedNews: Announcement | undefined;

    if (typeof item === "number") {
      resolvedNews = data[item];
    } else if (item && typeof item === "object") {
      resolvedNews = {
        id: item.id ?? item.original?.id,
        title: item.title,
        content: item.content,
        file_url: item.file_url,
      };
    }

    if (!resolvedNews) {
      alert("Gagal menemukan data berita.");
      return;
    }

    setSelectedAnnouncement(resolvedNews);
    setIsModalOpen(true);
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
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-spin">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
          </div>
        </div>
        <p className="text-gray-600 font-medium">Memuat data Pengumuman...</p>
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
              Pengumuman
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
              Tambah Pengumuman
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
            <button
              onClick={handleReset}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-lg hover:from-red-600 hover:to-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              Reset Filter
            </button>
          </div>
        </div>

        {/* Search Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <label
              htmlFor="searchTitle"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Judul Pengumuman
            </label>
            <div className="relative">
              <input
                id="searchTitle"
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Cari berdasarkan judul..."
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="relative">
            <label
              htmlFor="searchContent"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Deskripsi
            </label>
            <div className="relative">
              <input
                id="searchContent"
                type="text"
                value={searchContent}
                onChange={(e) => setSearchContent(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Cari berdasarkan deskripsi..."
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {error}
          </div>
        )}

        {/* No Results Message */}
        {!error &&
          data.length === 0 &&
          (searchTitle || searchContent || searchCategory) && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-600">
              Tidak ada data yang sesuai dengan filter yang diterapkan.
            </div>
          )}
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable
          data={data}
          fields={fields}
          onView={handleView}
          onEdit={handleEdit}
          currentPage={page}
          perPage={10}
        />
      </div>

      {/* Pagination */}
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
              <span className="font-medium text-gray-900">
                {" "}
                {totalItems}
              </span>{" "}
              data
              {(searchTitle || searchContent || searchCategory) && (
                <span className="text-blue-600"> (terfilter)</span>
              )}
            </div>
            <nav className="flex items-center space-x-1">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                      className={`inline-flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200 ${
                        num === page
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
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
      {isModalOpen && SelectedAnnouncement && (
        <ModalPortal>
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto animate-in zoom-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* === HEADER === */}
              <div className="relative bg-gradient-to-br from-teal-600 via-emerald-600 to-green-700 text-white p-8 rounded-t-3xl">
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
                          d="M11 5.882V19m0-13.118C9.832 5.118 8.246 4.5 6.5 4.5S3.168 5.118 2 5.882v13.236C3.168 18.382 4.754 19 6.5 19s3.332-.618 4.5-1.382m0-13.236C12.168 5.118 13.754 4.5 15.5 4.5c1.747 0 3.332.618 4.5 1.382v13.236C18.832 18.382 17.246 19 15.5 19c-1.746 0-3.332-.618-4.5-1.382"
                        />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold">
                        Detail Pengumuman
                      </h2>
                      <p className="text-teal-100 text-sm mt-1">
                        Informasi lengkap pengumuman
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
                {/* File Attachment / Thumbnail */}
                <div className="flex justify-center">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition duration-500"></div>
                    <div className="relative w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden shadow-2xl border-4 border-white p-6 flex flex-col items-center justify-center space-y-4">
                      {SelectedAnnouncement.file_url ? (
                        <div className="flex flex-col items-center space-y-4">
                          <div className="p-4 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl text-white">
                            <svg
                              className="w-12 h-12"
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
                          <p className="text-sm font-medium text-gray-700 text-center max-w-xs truncate px-2">
                            {decodeURIComponent(
                              SelectedAnnouncement.file_url.split("/").pop() ||
                                "File"
                            )}
                          </p>
                          <a
                            href={`${IMAGE_URL}/${SelectedAnnouncement.file_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-sm font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg hover:scale-105"
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
                                strokeWidth={2}
                                d="M10 6l-1.414 1.414M19 9l1.414 1.414M15 5h4m-4 14h4m-9-9v4m0 0v4m0-4h4m-4 0H6"
                              />
                            </svg>
                            Buka File
                          </a>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center space-y-3">
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
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <p className="text-sm font-medium text-gray-500">
                            Tidak ada lampiran
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
                      <div className="p-1.5 bg-teal-100 rounded-lg">
                        <svg
                          className="w-4 h-4 text-teal-600"
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
                      <span>Judul Pengumuman</span>
                    </label>
                    <div className="bg-gradient-to-r from-teal-50 to-emerald-50 p-5 rounded-2xl border-2 border-teal-100 group-hover:border-teal-300 transition-all duration-300">
                      <p className="text-lg font-semibold text-gray-900 leading-relaxed">
                        {SelectedAnnouncement.title}
                      </p>
                    </div>
                  </div>

                  {/* Deskripsi */}
                  <div className="group">
                    <label className="block text-sm font-bold text-gray-600 mb-3 ml-1 flex items-center space-x-2">
                      <div className="p-1.5 bg-emerald-100 rounded-lg">
                        <svg
                          className="w-4 h-4 text-emerald-600"
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
                    <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-5 rounded-2xl border-2 border-emerald-100 group-hover:border-emerald-300 transition-all">
                      <p className="text-base font-medium text-gray-800 whitespace-pre-wrap leading-relaxed">
                        {SelectedAnnouncement.content
                          ? SelectedAnnouncement.content
                              .replace(/<[^>]*>/g, "")
                              .trim()
                          : "—"}
                      </p>
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

export default AnnouncementPage;
