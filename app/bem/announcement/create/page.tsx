"use client";

import React, { useState } from "react";
import { FileText, Upload, Link, Calendar, Save, ArrowLeft, Megaphone } from "lucide-react";

export default function PengumumanCreatePage() {
  const [formData, setFormData] = useState({
    judul: "",
    konten: "",
    file: null as File | null,
    url: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (key: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Pengumuman:", formData);
    alert("Pengumuman berhasil ditambahkan!");
    // router.push("/admin/pengumuman");
  };

  const handleBack = () => {
    // router.back();
    console.log("Navigate back");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Kembali</span>
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
              <Megaphone className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Tambah Pengumuman</h1>
              <p className="text-gray-600">Buat pengumuman baru untuk dipublikasikan</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2">
              <FileText size={24} />
              Detail Pengumuman
            </h2>
          </div>
          
          <div className="p-8 space-y-8">
            {/* Judul */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText size={18} className="text-blue-600" />
                Judul Pengumuman
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                value={formData.judul}
                onChange={(e) => handleChange("judul", e.target.value)}
                placeholder="Masukkan judul pengumuman yang menarik"
              />
            </div>

            {/* Konten */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText size={18} className="text-blue-600" />
                Konten Pengumuman
              </label>
              <textarea
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none"
                rows={6}
                value={formData.konten}
                onChange={(e) => handleChange("konten", e.target.value)}
                placeholder="Tulis detail pengumuman di sini..."
              />
            </div>

            {/* File Upload */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Upload size={18} className="text-blue-600" />
                Upload File Pendukung
              </label>
              <div className="relative">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) =>
                    handleChange("file", e.target.files ? e.target.files[0] : null)
                  }
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-all cursor-pointer">
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-600">
                    {formData.file ? (
                      <span className="text-blue-600 font-medium">
                        File terpilih: {formData.file.name}
                      </span>
                    ) : (
                      <>
                        Klik untuk upload file atau drag & drop
                        <br />
                        <span className="text-sm text-gray-400">PDF, DOC, atau gambar</span>
                      </>
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* URL */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Link size={18} className="text-blue-600" />
                URL Eksternal (Opsional)
              </label>
              <input
                type="url"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                value={formData.url}
                onChange={(e) => handleChange("url", e.target.value)}
                placeholder="https://contoh.com/link-terkait"
              />
            </div>

            {/* Date Range */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Calendar size={18} className="text-blue-600" />
                  Tanggal Mulai
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Calendar size={18} className="text-blue-600" />
                  Tanggal Selesai
                </label>
                <input
                  type="date"
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Save size={20} />
                Simpan Pengumuman
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Megaphone size={20} className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-800 mb-2">Tips Membuat Pengumuman Efektif</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Gunakan judul yang jelas dan menarik perhatian</li>
                <li>• Sertakan informasi penting seperti tanggal dan lokasi</li>
                <li>• Lampirkan file pendukung jika diperlukan</li>
                <li>• Pastikan tanggal mulai dan selesai sudah benar</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}