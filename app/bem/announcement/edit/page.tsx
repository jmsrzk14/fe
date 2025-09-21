"use client";

import React, { useState, useEffect } from "react";
import { FileText, Link, Calendar, Save, ArrowLeft, Megaphone, Sparkles, Edit, AlertCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { staticData } from "@/constants/data";

export default function PengumumanEditPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    judul: "",
    content: "",
    filepath: "",
    tanggal_mulai: "",
    tanggal_tutup: "",
  });
  const [loading, setLoading] = useState(true);
  const [editIndex, setEditIndex] = useState<number | null>(null);

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
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes fade-in-up {
      0% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
      50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
    }
    .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
    .animate-float { animation: float 3s ease-in-out infinite; }
    .animate-fade-in-up { animation: fade-in-up 0.6s ease-out; }
    .animate-shake { animation: shake 0.5s ease-in-out; }
    .animate-glow { animation: glow 2s ease-in-out infinite; }
  `;

  // Load data pengumuman berdasarkan ID dari URL params
  useEffect(() => {
    const id = searchParams.get('id');
    if (id !== null) {
      setEditIndex(parseInt(id));
      // Simulasi loading data
      setTimeout(() => {
        const pengumuman = staticData.pengumuman[parseInt(id)];
        if (pengumuman) {
          setFormData({
            judul: pengumuman.judul || "",
            content: pengumuman.content || "",
            filepath: pengumuman.filepath || "",
            tanggal_mulai: pengumuman.tanggal_mulai || "",
            tanggal_tutup: pengumuman.tanggal_tutup || "",
          });
        }
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!formData.judul.trim() || !formData.content.trim() || !formData.tanggal_mulai || !formData.tanggal_tutup) {
      alert("Mohon lengkapi semua field yang wajib diisi!");
      return;
    }

    // Validasi tanggal
    if (new Date(formData.tanggal_tutup) < new Date(formData.tanggal_mulai)) {
      alert("Tanggal tutup tidak boleh lebih awal dari tanggal mulai!");
      return;
    }

    console.log("Update Pengumuman:", formData);
    alert("Pengumuman berhasil diperbarui!");
    router.push("/bem/announcement");
  };

  const handleBack = () => {
    router.back();
  };

  const handleCancel = () => {
    if (confirm("Apakah Anda yakin ingin membatalkan perubahan? Data yang belum disimpan akan hilang.")) {
      router.push("/bem/announcement");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-50 flex items-center justify-center relative overflow-hidden">
        {/* Floating elements untuk dekorasi loading */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
          <div className="absolute top-40 right-20 w-6 h-6 bg-blue-400 rounded-full opacity-20 animate-ping delay-2000"></div>
          <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-yellow-500 rounded-full opacity-30 animate-pulse delay-1500"></div>
        </div>
        
        <div className="text-center z-10">
          <div className="relative mb-6">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-yellow-400 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Edit className="w-8 h-8 text-blue-600 animate-pulse" />
            </div>
          </div>
          <p className="text-blue-600 font-semibold text-lg">Memuat data pengumuman...</p>
          <p className="text-blue-400 text-sm mt-2">Mohon tunggu sebentar</p>
        </div>
      </div>
    );
  }

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

      <div className="max-w-4xl mx-auto p-4 md:p-8 relative z-10">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-blue-600 mb-4">
            <button 
              onClick={() => router.push("/bem/announcement")}
              className="hover:text-blue-800 transition-colors"
            >
              Pengumuman
            </button>
            <span className="text-gray-400">›</span>
            <span className="text-blue-800 font-semibold">Edit Pengumuman</span>
            {editIndex !== null && (
              <>
                <span className="text-gray-400">›</span>
                <span className="text-gray-600">#{editIndex + 1}</span>
              </>
            )}
          </nav>

          <button
            onClick={handleBack}
            className="group flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-all duration-300 hover:scale-105"
          >
            <ArrowLeft size={20} className="group-hover:animate-wiggle" />
            <span className="font-medium">Kembali ke Daftar Pengumuman</span>
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-yellow-400 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 animate-float">
              <Edit className="text-blue-900 animate-wiggle" size={32} />
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-blue-700 mb-2">Edit Pengumuman</h1>
              <p className="text-blue-600 text-lg">Perbarui informasi pengumuman yang sudah ada</p>
            </div>
            {/* Status Badge */}
            <div className="bg-orange-100 border border-orange-200 rounded-xl px-4 py-2 animate-glow">
              <span className="text-orange-700 font-semibold text-sm flex items-center gap-2">
                <Edit size={16} />
                Mode Edit
              </span>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border-2 border-blue-200 overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in-up delay-300">
          <div className="bg-blue-600 p-6 relative">
            {/* Decorative elements */}
            <div className="absolute top-2 right-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-2 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
            
            <h2 className="text-xl font-semibold text-white flex items-center gap-3">
              <Edit size={24} className="animate-pulse" />
              Perbarui Detail Pengumuman
              <Sparkles size={20} className="text-yellow-300 animate-bounce" />
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            {/* Judul */}
            <div className="space-y-3 group">
              <label className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                <FileText size={18} className="text-blue-600 group-hover:animate-bounce" />
                Judul Pengumuman
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300 hover:shadow-md"
                  value={formData.judul}
                  onChange={(e) => handleChange("judul", e.target.value)}
                  placeholder="Masukkan judul pengumuman yang menarik dan informatif"
                  required
                />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-3 group">
              <label className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                <FileText size={18} className="text-blue-600 group-hover:animate-bounce" />
                Content Pengumuman
                <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <textarea
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none resize-none hover:border-blue-300 hover:shadow-md"
                  rows={6}
                  value={formData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Tulis detail pengumuman di sini... Jelaskan informasi penting dengan jelas dan lengkap."
                  required
                />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>

            {/* File Path */}
            <div className="space-y-3 group">
              <label className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                <Link size={18} className="text-blue-600 group-hover:animate-bounce" />
                File Path
                <span className="text-gray-400 text-xs">(Opsional)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  className="w-full border-2 border-blue-200 rounded-xl px-4 py-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 outline-none hover:border-blue-300 hover:shadow-md"
                  value={formData.filepath}
                  onChange={(e) => handleChange("filepath", e.target.value)}
                  placeholder="Masukkan path file, contoh: /files/pengumuman.pdf"
                />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
              </div>
            </div>

            {/* Date Range */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3 group">
                <label className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                  <Calendar size={18} className="text-green-600 group-hover:animate-bounce" />
                  Tanggal Mulai
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full border-2 border-green-200 rounded-xl px-4 py-4 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-300 outline-none hover:border-green-300 hover:shadow-md"
                    value={formData.tanggal_mulai}
                    onChange={(e) => handleChange("tanggal_mulai", e.target.value)}
                    required
                  />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>

              <div className="space-y-3 group">
                <label className="flex items-center gap-2 text-sm font-semibold text-blue-700">
                  <Calendar size={18} className="text-red-600 group-hover:animate-bounce" />
                  Tanggal Tutup
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full border-2 border-red-200 rounded-xl px-4 py-4 focus:border-red-500 focus:ring-4 focus:ring-red-100 transition-all duration-300 outline-none hover:border-red-300 hover:shadow-md"
                    value={formData.tanggal_tutup}
                    onChange={(e) => handleChange("tanggal_tutup", e.target.value)}
                    required
                  />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="pt-8 border-t-2 border-blue-100">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="group flex-1 sm:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-xl hover:bg-yellow-500 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl relative overflow-hidden"
                >
                  <Save size={20} className="group-hover:animate-bounce" />
                  Perbarui Pengumuman
                  {/* Sparkle effects */}
                  <div className="absolute top-1 right-2 w-2 h-2 bg-yellow-200 rounded-full animate-ping"></div>
                  <div className="absolute bottom-2 left-3 w-1 h-1 bg-yellow-300 rounded-full animate-pulse delay-500"></div>
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-red-300 text-red-600 font-semibold rounded-xl hover:bg-red-50 transition-all duration-300 hover:scale-105"
                >
                  <AlertCircle size={18} />
                  Batal
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-white border-2 border-yellow-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in-up delay-500">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-yellow-100 rounded-xl animate-pulse">
              <Edit size={24} className="text-yellow-600 animate-wiggle" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-blue-700 mb-3 text-lg flex items-center gap-2">
                Tips Mengedit Pengumuman
                <Sparkles size={18} className="text-yellow-500 animate-bounce" />
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-sm text-blue-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    Periksa kembali semua informasi sebelum menyimpan
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200"></div>
                    Pastikan tanggal tutup tidak lebih awal dari tanggal mulai
                  </li>
                </ul>
                <ul className="text-sm text-blue-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-400"></div>
                    Gunakan bahasa yang jelas dan mudah dipahami
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-600"></div>
                    Backup data sebelum melakukan perubahan besar
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}