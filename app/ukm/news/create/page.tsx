"use client";
import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  Upload,
  Image,
  CheckCircle2,
  Info,
  Tag,
  FileText,
  User,
  Calendar,
  Plus,
  Zap,
} from "lucide-react";

interface FormData {
  title: string;
  author: string;
  date: string;
  category: string;
  status: string;
  content: string;
  excerpt: string;
  tags: string;
  featuredImage: File | null;
}

export default function TambahBeritaPage() {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    date: "",
    category: "",
    status: "draft",
    content: "",
    excerpt: "",
    tags: "",
    featuredImage: null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [
    "Teknologi",
    "Ekonomi",
    "Pendidikan",
    "Politik",
    "Olahraga",
    "Kesehatan",
    "Hiburan",
    "Lainnya",
  ];

  // Handle input change for text fields
  const handleInputChange = (key: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError(null);

    // Handle image preview
    if (key === "featuredImage" && value instanceof File) {
      if (value.size > 5 * 1024 * 1024) {
        setError("Ukuran gambar tidak boleh melebihi 5MB.");
        setFormData((prev) => ({ ...prev, featuredImage: null }));
        setPreviewImage(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(value);
    } else if (key === "featuredImage" && !value) {
      setPreviewImage(null);
    }
  };

  // Remove image
  const removeImage = () => {
    setPreviewImage(null);
    setFormData((prev) => ({
      ...prev,
      featuredImage: null,
    }));
  };

  // Submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!formData.title || !formData.author || !formData.date || !formData.category || !formData.content) {
      setError("Semua kolom wajib diisi.");
      return;
    }
    if (formData.content.length < 100) {
      setError("Konten harus minimal 100 karakter.");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    setTimeout(() => {
      setShowSuccess(false);
      setFormData({
        title: "",
        author: "",
        date: "",
        category: "",
        status: "draft",
        content: "",
        excerpt: "",
        tags: "",
        featuredImage: null,
      });
      setPreviewImage(null);
    }, 3000);
  };

  const handleBack = () => {
    // ...existing code...
    // Implement navigation logic here
  };

  /** --- SUCCESS PAGE --- */
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Berhasil!</h2>
          <p className="text-gray-600 mb-6">
            Berita telah berhasil ditambahkan dan disimpan.
          </p>
          <button
            onClick={handleBack}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            Kembali ke Daftar Berita
          </button>
        </div>
      </div>
    );
  }

  // Progress calculation
  const progress =
    ((formData.title ? 1 : 0) +
      (formData.author ? 1 : 0) +
      (formData.date ? 1 : 0) +
      (formData.category ? 1 : 0) +
      (formData.content.length >= 100 ? 1 : 0) +
      (formData.featuredImage ? 1 : 0)) /
    6 *
    100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* --- HEADER --- */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="bg-white bg-opacity-20 p-2 rounded-xl backdrop-blur-sm hover:bg-opacity-30 transition-all"
            >
              <ArrowLeft className="h-6 w-6 text-yellow-300" />
            </button>
            <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
              <Plus className="h-8 w-8 text-yellow-300" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                Tambah Berita Baru
              </h1>
              <p className="text-blue-100 mt-1">
                Buat dan publikasikan berita terbaru
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
            {/* Informasi Dasar */}
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-6 w-6 text-blue-600 bg-blue-100 p-2 rounded-lg" />
                <h3 className="text-xl font-bold text-gray-800">Informasi Dasar</h3>
              </div>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Judul berita *"
                required
                disabled={isSubmitting}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Penulis *"
                  required
                  disabled={isSubmitting}
                />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleInputChange("date", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={isSubmitting}
                />
              </div>
              <textarea
                value={formData.excerpt}
                onChange={(e) => handleInputChange("excerpt", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Ringkasan singkat berita (opsional)"
                disabled={isSubmitting}
              />
            </div>

            {/* Konten */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-6 w-6 text-yellow-600 bg-yellow-100 p-2 rounded-lg" />
                <h3 className="text-xl font-bold text-gray-800">Konten Berita</h3>
              </div>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange("content", e.target.value)}
                rows={12}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Tulis konten berita..."
                required
                disabled={isSubmitting}
              />
              <div className="flex justify-between items-center mt-2">
                <div className="text-sm text-blue-600">
                  {formData.content.length > 0 && (
                    <span className="font-medium">{formData.content.length} karakter</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {formData.content.length >= 100 && <CheckCircle2 size={16} className="text-green-500" />}
                  <span className={formData.content.length >= 100 ? "text-green-600 font-medium" : "text-blue-500"}>
                    {formData.content.length >= 100 ? "✅ Panjang yang baik" : "Minimal 100 karakter"}
                  </span>
                </div>
              </div>
            </div>

            {/* Gambar Utama */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-3 mb-2">
                <Image className="h-6 w-6 text-green-600 bg-green-100 p-2 rounded-lg" />
                <h3 className="text-xl font-bold text-gray-800">Gambar Utama</h3>
              </div>
              <div className="relative">
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/gif"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleInputChange("featuredImage", e.target.files ? e.target.files[0] : null)}
                  disabled={isSubmitting}
                  style={{ zIndex: 2 }}
                />
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition-colors bg-white cursor-pointer">
                  {previewImage ? (
                    <div className="space-y-4">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-28 h-28 object-cover rounded-xl mx-auto border-2 border-blue-200 shadow-md"
                      />
                      <p className="text-blue-600 font-medium">📁 {formData.featuredImage?.name}</p>
                      <button
                        type="button"
                        onClick={removeImage}
                        className="mt-2 bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600"
                        disabled={isSubmitting}
                      >
                        Hapus Gambar
                      </button>
                    </div>
                  ) : (
                    <div>
                      <Image size={48} className="mx-auto text-blue-400 mb-3" />
                      <p className="text-blue-600 font-medium">
                        📸 Klik untuk upload gambar atau drag & drop
                        <br />
                        <span className="text-sm text-blue-500">PNG, JPG, atau GIF maksimal 5MB</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Tombol Aksi */}
            <div className="pt-6 border-t-2 border-blue-100">
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.title ||
                  !formData.author ||
                  !formData.date ||
                  !formData.category ||
                  !formData.content
                }
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                <Save size={20} />
                {isSubmitting ? "Menyimpan..." : "💾 Simpan Berita"}
              </button>
            </div>
          </form>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            {(formData.title || formData.content || formData.category) && (
              <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden">
                <div className="bg-blue-600 p-4">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <CheckCircle2 size={20} />
                    👀 Preview
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
                  {formData.title && (
                    <div className="text-center">
                      <h4 className="font-bold text-blue-900 text-lg">{formData.title}</h4>
                      {formData.content && (
                        <p className="text-blue-600 font-medium text-sm mt-1">({formData.content})</p>
                      )}
                    </div>
                  )}
                  {formData.content && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-blue-700 text-sm leading-relaxed">
                        <strong>Konten:</strong>{" "}
                        {formData.content.length > 150 ? formData.content.substring(0, 150) + "..." : formData.content}
                      </p>
                    </div>
                  )}
                  {formData.category && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-blue-700 text-sm leading-relaxed">
                        <strong>Kategori:</strong> {formData.category}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Progress Card */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Tag size={18} className="text-blue-600" />
                📊 Progress Pengisian
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Judul</span>
                  <CheckCircle2 size={16} className={formData.title ? "text-green-500" : "text-blue-300"} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Penulis</span>
                  <CheckCircle2 size={16} className={formData.author ? "text-green-500" : "text-blue-300"} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Tanggal</span>
                  <CheckCircle2 size={16} className={formData.date ? "text-green-500" : "text-blue-300"} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Kategori</span>
                  <CheckCircle2 size={16} className={formData.category ? "text-green-500" : "text-blue-300"} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Konten</span>
                  <CheckCircle2 size={16} className={formData.content.length >= 100 ? "text-green-500" : "text-blue-300"} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Gambar</span>
                  <CheckCircle2 size={16} className={formData.featuredImage ? "text-green-500" : "text-blue-300"} />
                </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-blue-600 mb-1">
                  <span>Kelengkapan</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
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
                  <h3 className="font-bold text-blue-900 mb-2">💡 Tips Menulis Berita</h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>🎯 Gunakan judul yang menarik</li>
                    <li>⚡ Sertakan penulis dan tanggal</li>
                    <li>✨ Konten minimal 100 karakter</li>
                    <li>🖼️ Gambar sebaiknya format PNG/JPG/GIF</li>
                    <li>✅ Pastikan semua data sudah benar</li>
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
