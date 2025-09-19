"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { 
  Users, Type, Target, Upload, Save, ArrowLeft, 
  Building2, Image, CheckCircle2, Info, Zap 
} from "lucide-react";

// ⬇️ Import ReactQuill secara dinamis (karena butuh browser)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function MahasiswaCreatePage() {
  const [formData, setFormData] = useState({
    nama: "",
    namaSingkat: "",
    visiMisi: "",
    gambar: null as File | null,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (key: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }));

    // Handle image preview
    if (key === "gambar" && value instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(value);
    } else if (key === "gambar" && !value) {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data mahasiswa:", formData);
    alert("Data himpunan berhasil ditambahkan!");
    // router.push("/admin/mahasiswa");
  };

  const handleBack = () => {
    // router.push("/admin/mahasiswa");
    console.log("Navigate back");
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Kembali ke Data Himpunan</span>
          </button>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="relative">
              <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
                <Building2 className="text-white" size={32} />
              </div>
              <div className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-md">
                <Zap size={16} className="text-blue-600" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-blue-900">Tambah Data Himpunan</h1>
              <p className="text-blue-600">Buat data himpunan mahasiswa baru</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-blue-100 overflow-hidden">
              <div className="bg-blue-600 p-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <Users size={24} />
                  Informasi Himpunan
                </h2>
              </div>
              
              <div className="p-8 space-y-8">
                {/* Nama */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                    <Building2 size={18} className="text-blue-600" />
                    Nama Lengkap Himpunan
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-blue-50 text-blue-900 font-medium"
                    value={formData.nama}
                    onChange={(e) => handleChange("nama", e.target.value)}
                    placeholder=" Contoh: Himpunan Mahasiswa Teknik Informatika"
                    required
                  />
                </div>

                {/* Nama Singkat */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                    <Type size={18} className="text-blue-600" />
                    Nama Singkat / Akronim
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-blue-50 text-blue-900 font-medium"
                    value={formData.namaSingkat}
                    onChange={(e) => handleChange("namaSingkat", e.target.value)}
                    placeholder=" Contoh: HMTI"
                    required
                  />
                </div>

                {/* Visi Misi (pakai ReactQuill) */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                    <Target size={18} className="text-blue-600" />
                    Visi & Misi
                  </label>
                  
                  <ReactQuill
                    theme="snow"
                    value={formData.visiMisi}
                    onChange={(value) => handleChange("visiMisi", value)}
                    className="bg-white rounded-xl border-2 border-blue-200"
                  />

                  {/* Character Counter */}
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-blue-600">
                      {formData.visiMisi.length > 0 && (
                        <span className="font-medium">{formData.visiMisi.length} karakter</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {formData.visiMisi.length > 100 && <CheckCircle2 size={16} className="text-green-500" />}
                      <span className={formData.visiMisi.length > 100 ? "text-green-600 font-medium" : "text-blue-500"}>
                        {formData.visiMisi.length > 100 ? " Panjang yang baik" : "Minimal 100 karakter"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                    <Upload size={18} className="text-blue-600" />
                    Upload Logo Himpunan
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) =>
                        handleChange("gambar", e.target.files ? e.target.files[0] : null)
                      }
                    />
                    <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer bg-white">
                      {previewImage ? (
                        <div className="space-y-4">
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-28 h-28 object-cover rounded-xl mx-auto border-2 border-blue-200 shadow-md"
                          />
                          <p className="text-blue-600 font-medium">
                             {formData.gambar?.name}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <Image size={48} className="mx-auto text-blue-400 mb-3" />
                          <p className="text-blue-600 font-medium">
                            📸 Klik untuk upload logo atau drag & drop
                            <br />
                            <span className="text-sm text-blue-500">PNG, JPG, atau GIF maksimal 5MB</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t-2 border-blue-100">
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.nama || !formData.namaSingkat || !formData.visiMisi}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  >
                    <Save size={20} />
                     Simpan Data Himpunan
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            {(formData.nama || formData.namaSingkat) && (
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden">
                <div className="bg-blue-600 p-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle2 size={20} />
                     Preview
                  </h3>
                </div>
                <div className="p-6 space-y-4">
                  {previewImage && (
                    <div className="text-center">
                      <img
                        src={previewImage}
                        alt="Logo Preview"
                        className="w-24 h-24 object-cover rounded-xl mx-auto border-2 border-blue-200 shadow-md"
                      />
                    </div>
                  )}
                  {formData.nama && (
                    <div className="text-center">
                      <h4 className="font-bold text-blue-900 text-lg">{formData.nama}</h4>
                      {formData.namaSingkat && (
                        <p className="text-blue-600 font-medium text-sm mt-1">({formData.namaSingkat})</p>
                      )}
                    </div>
                  )}
                  {formData.visiMisi && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-blue-700 text-sm leading-relaxed">
                        {/* Strip HTML dari ReactQuill untuk preview singkat */}
                        {formData.visiMisi.replace(/<[^>]+>/g, "").length > 150 
                          ? formData.visiMisi.replace(/<[^>]+>/g, "").substring(0, 150) + "..."
                          : formData.visiMisi.replace(/<[^>]+>/g, "")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Progress Card */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Building2 size={18} className="text-blue-600" />
                Progress Pengisian
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Nama Lengkap</span>
                  <CheckCircle2 size={16} className={formData.nama ? "text-green-500" : "text-blue-300"} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Nama Singkat</span>
                  <CheckCircle2 size={16} className={formData.namaSingkat ? "text-green-500" : "text-blue-300"} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Visi & Misi</span>
                  <CheckCircle2 size={16} className={formData.visiMisi ? "text-green-500" : "text-blue-300"} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Logo</span>
                  <CheckCircle2 size={16} className={formData.gambar ? "text-green-500" : "text-blue-300"} />
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-blue-600 mb-1">
                  <span>Kelengkapan</span>
                  <span>{Math.round((
                    (formData.nama ? 1 : 0) +
                    (formData.namaSingkat ? 1 : 0) +
                    (formData.visiMisi ? 1 : 0) +
                    (formData.gambar ? 1 : 0)
                  ) / 4 * 100)}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${((
                        (formData.nama ? 1 : 0) +
                        (formData.namaSingkat ? 1 : 0) +
                        (formData.visiMisi ? 1 : 0) +
                        (formData.gambar ? 1 : 0)
                      ) / 4) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Info size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">Tips Mengisi Data</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>Gunakan nama resmi yang lengkap</li>
                    <li>Singkatan harus mudah diingat</li>
                    <li>Visi & misi harus jelas dan inspiratif</li>
                    <li>Logo sebaiknya format PNG transparan</li>
                    <li>Pastikan semua data sudah benar</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}
