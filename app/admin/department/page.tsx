"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/layout/DataTable";
import { useRouter } from "next/navigation"; 

interface Departemen {
  id: number;
  name: string;
  shortname: string;
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
  data: Departemen[];
}

const DepartemenPage: React.FC = () => {
  const [data, setData] = useState<Departemen[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const router = useRouter(); // ✅ inisialisasi router

  const fields = [
    { key: "name", label: "Nama Departemen", type: "string" },
    { key: "short_name", label: "Nama Singkat", type: "string" },
  ];

  // Filter states
  const [searchName, setSearchName] = useState("");
  const [searchProdi, setSearchProdi] = useState("");
  const [searchStatus, setSearchStatus] = useState("");

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    const token = sessionStorage.getItem("token");

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
        `http://localhost:8080/api/admin/department?${params.toString()}`,
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
    router.push("/admin/department/create"); 
  };

  const handleEdit = (item: Departemen) => {
    console.log("Edit item:", item);
  };

  const handleDelete = async (item: Departemen) => {
    const token = sessionStorage.getItem("token");

    try {
      const res = await fetch(
        `http://localhost:8080/api/admin/department/${item.id}`,
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
        <p className="text-gray-600 font-medium">Memuat data Departemen...</p>
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
              Data Departemen Mahasiswa
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
              Tambah Departemen
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
              Nama Departemen
            </label>
            <div className="relative">
              <input
                id="searchName"
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Nama Departemen"
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
          onEdit={handleEdit}
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
    </div>
  );
};

export default DepartemenPage;
