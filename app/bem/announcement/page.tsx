"use client";
import React, { useState, useEffect } from "react";
import DataTable from "@/components/layout/DataTable";
import { staticData } from "@/constants/data";
import { fieldConfigs } from "@/constants/field";
import { useRouter } from "next/navigation";
import { Plus, Megaphone, Calendar, Search, Filter } from "lucide-react";

export default function PengumumanPage() {
  const [data, setData] = useState(staticData.pengumuman);
  const [filteredData, setFilteredData] = useState(staticData.pengumuman);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const router = useRouter();

  // Custom styles untuk animasi lucu
  const customStyles = `
    @keyframes wiggle {
      0%, 7% { transform: rotateZ(0); }
      15% { transform: rotateZ(-15deg); }
      20% { transform: rotateZ(10deg); }
      25% { transform: rotateZ(-10deg); }
      30% { transform: rotateZ(6deg); }
      35% { transform: rotateZ(-4deg); }
      40%, 100% { transform: rotateZ(0); }
    }
    @keyframes bounce-slow {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    @keyframes fade-in-up {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-in-right {
      0% { opacity: 0; transform: translateX(20px); }
      100% { opacity: 1; transform: translateX(0); }
    }
    .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
    .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
    .animate-fade-in-right { animation: fade-in-right 0.8s ease-out; }
  `;

  const handleEdit = (item: any, index: number) => {
    console.log("Edit Pengumuman:", item);
    // Redirect ke halaman edit dengan ID sebagai parameter
    router.push(`/bem/announcement/edit?id=${index}`);
  };

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    setFilteredData(newData);
  };

  const handleAdd = () => {
    router.push("/bem/announcement/create"); // ✅ redirect ke halaman create
  };

  // Fungsi search dan filter
  const applyFilters = () => {
    let filtered = [...data];

    // Filter berdasarkan search term
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.judul?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter berdasarkan status
    if (filterStatus !== "all") {
      const today = new Date();
      filtered = filtered.filter(item => {
        const startDate = new Date(item.tanggal_mulai);
        const endDate = new Date(item.tanggal_tutup);
        const isActive = today >= startDate && today <= endDate;
        
        return filterStatus === "active" ? isActive : !isActive;
      });
    }

    setFilteredData(filtered);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus(status);
  };

  // Apply filters whenever searchTerm, filterStatus, or data changes
  useEffect(() => {
    applyFilters();
  }, [searchTerm, filterStatus, data]);

  // Hitung statistik
  const totalPengumuman = data.length;
  const activeAnnouncements = data.filter(item => {
    const today = new Date();
    const startDate = new Date(item.tanggal_mulai);
    const endDate = new Date(item.tanggal_tutup);
    return today >= startDate && today <= endDate;
  }).length;

  return (
    <div className="min-h-screen bg-blue-50 relative overflow-hidden">
      {/* Custom CSS untuk animasi */}
      <style jsx>{customStyles}</style>
      
      {/* Floating elements untuk dekorasi */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-20 animate-ping delay-2000"></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-yellow-500 rounded-full opacity-30 animate-pulse delay-1500"></div>
        <div className="absolute top-1/3 right-1/3 w-5 h-5 bg-blue-300 rounded-full opacity-20 animate-bounce delay-3000"></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-yellow-600 rounded-full opacity-25 animate-ping delay-500"></div>
      </div>
      {/* Header dengan Background Solid */}
      <div className="bg-blue-600 px-6 py-8 shadow-xl relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-300/20 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-8 right-16 w-16 h-16 bg-white/10 rounded-full animate-pulse delay-500"></div>
          <div className="absolute bottom-4 left-1/3 w-20 h-20 bg-yellow-400/15 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute top-1/2 right-8 w-12 h-12 bg-white/20 rounded-full animate-ping delay-1500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl animate-pulse hover:animate-bounce transition-all duration-300">
                <Megaphone className="w-8 h-8 text-white animate-wiggle" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2 animate-fade-in-up">
                  Manajemen Pengumuman
                </h1>
                <p className="text-blue-100 text-lg animate-fade-in-up delay-300">
                  Kelola pengumuman BEM IT Del dengan mudah dan efisien
                </p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="group relative inline-flex items-center px-6 py-3 text-base font-semibold text-blue-900 bg-yellow-400 rounded-xl hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300/50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-2 hover:scale-105 animate-bounce-slow"
            >
              <Plus className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform duration-300" />
              Tambah Pengumuman
              {/* Sparkle effect */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-200 rounded-full animate-ping"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 -mt-6 relative z-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:rotate-1 animate-fade-in-up">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Total Pengumuman</p>
                <p className="text-3xl font-bold text-blue-700 animate-pulse">{totalPengumuman}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full animate-bounce hover:animate-spin">
                <Megaphone className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-200 hover:shadow-xl transition-all duration-300 hover:scale-105 hover:-rotate-1 animate-fade-in-up delay-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-600 mb-1">Sedang Aktif</p>
                <p className="text-3xl font-bold text-green-600 animate-pulse">{activeAnnouncements}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full animate-bounce delay-500 hover:animate-ping">
                <Calendar className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 pb-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-blue-200 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
            <div className="px-6 py-4 bg-blue-50 border-b border-blue-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <h2 className="text-xl font-semibold text-blue-700 animate-pulse">
                  Daftar Pengumuman
                </h2>
                <div className="flex items-center space-x-4">
                  {/* Search Box */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-blue-500 group-hover:animate-bounce" />
                    </div>
                    <input
                      type="text"
                      placeholder="Cari pengumuman..."
                      value={searchTerm}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="block w-80 pl-10 pr-3 py-2 border-2 border-blue-300 rounded-lg leading-5 bg-white placeholder-blue-400 focus:outline-none focus:placeholder-blue-300 focus:ring-4 focus:ring-blue-300/30 focus:border-blue-500 transition-all duration-300 hover:border-blue-400 hover:shadow-md"
                    />
                    {/* Sparkle animation when focused */}
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  
                  {/* Filter Dropdown */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Filter className="h-4 w-4 text-blue-500 group-hover:animate-spin" />
                    </div>
                    <select
                      value={filterStatus}
                      onChange={(e) => handleFilterChange(e.target.value)}
                      className="block w-40 pl-9 pr-8 py-2 border-2 border-blue-300 rounded-lg leading-5 bg-white focus:outline-none focus:ring-4 focus:ring-blue-300/30 focus:border-blue-500 transition-all duration-300 appearance-none hover:border-blue-400 hover:shadow-md cursor-pointer"
                    >
                      <option value="all">Semua Status</option>
                      <option value="active">Sedang Aktif</option>
                      <option value="inactive">Tidak Aktif</option>
                    </select>
                    {/* Custom dropdown arrow */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg className="w-4 h-4 text-blue-500 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-blue-600 animate-fade-in-right">
                    <Calendar className="w-4 h-4 animate-pulse" />
                    <span>Diperbarui hari ini</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6">
              <DataTable
                data={filteredData}
                fields={fieldConfigs.pengumuman}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
