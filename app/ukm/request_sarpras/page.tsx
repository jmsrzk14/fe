"use client";
import React, { useEffect, useState } from "react";
import DataTable from "@/components/layout/DataTable";
import { useRouter } from "next/navigation";

interface Peminjaman {
  id: number;
  name: string;
  status: string;
}

interface ApiResponse {
  status: string;
  message: string;
  metadata?: {
    current_page: number;
    per_page: number;
    total_items: number;
    total_pages: number;
  };
  data: Peminjaman[];
}

const PeminjamanPage: React.FC = () => {
  const [data, setData] = useState<Peminjaman[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchName, setSearchName] = useState("");
  const [searchStatus, setSearchStatus] = useState("");
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const fields = [
    { key: "name", label: "Nama Peminjam", type: "string" },
    { key: "status", label: "Status", type: "string" },
  ];

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!username || !token) {
      console.error("Username atau token tidak ditemukan di sessionStorage");
      setLoading(false);
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append("page", pageNumber.toString());
      params.append("per_page", "10");

      if (searchName.trim()) params.append("name", searchName.trim());
      if (searchStatus.trim()) params.append("status", searchStatus.trim());

      const res = await fetch(
        `${API_URL}/student/request_sarpras/user/${username}?${params.toString()}`,
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

      if (json.status === "success") {
        setData(json.data);
        setTotalPages(json.metadata?.total_pages ?? 1);
        setTotalItems(json.metadata?.total_items ?? json.data.length);
        setPage(json.metadata?.current_page ?? 1);
      } else {
        console.error("Response error:", json.message);
      }
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
    if (e.key === "Enter") handleSearch();
  };

  const handleEdit = (item: Peminjaman) => {
    router.push(`/ukm/request_sarpras/detail/${item.id}`);
  };

  const handleAdd = () => {
    router.push("/ukm/sarpras_form");
  };

  if (loading) {
    return (
      <div className="min-h-96 flex items-center justify-center bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full animate-spin">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 font-medium">Memuat data Peminjaman...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-gray-50 to-white min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Data Peminjaman Anda
          </h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAdd}
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
            >
              + Request Peminjaman
            </button>
            <button
              onClick={handleSearch}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Cari
            </button>
          </div>
        </div>

        {/* Search Input */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nama Peminjam
            </label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Nama Peminjaman"
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <DataTable data={data} fields={fields} onEdit={handleEdit} />
      </div>
    </div>
  );
};

export default PeminjamanPage;
