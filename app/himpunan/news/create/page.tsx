"use client";
import { useState } from "react";
import {
  Plus,
  ArrowLeft,
  Save,
  Eye,
  Image,
  Calendar,
  User,
  Tag,
  FileText,
  Upload,
  X,
  Check,
} from "lucide-react";

export default function TambahBeritaPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    date: "",
    category: "",
    status: "draft",
    content: "",
    excerpt: "",
    tags: "",
    featuredImage: null as File | null,
  });

  const [previewMode, setPreviewMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
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

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setFormData((prev) => ({
          ...prev,
          featuredImage: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    setFormData((prev) => ({
      ...prev,
      featuredImage: null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset after success
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
      setUploadedImage(null);
    }, 3000);

    console.log("Form submitted:", formData);
  };

  const handleBack = () => {
    console.log("Navigate back");
  };

  const togglePreview = () => setPreviewMode((prev) => !prev);

  /** --- SUCCESS PAGE --- */
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md w-full">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* --- HEADER --- */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
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

            <button
              onClick={togglePreview}
              className={`px-4 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all ${
                previewMode
                  ? "bg-yellow-400 text-blue-900 hover:bg-yellow-300"
                  : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
              }`}
            >
              <Eye className="h-5 w-5" />
              {previewMode ? "Edit" : "Preview"}
            </button>
          </div>
        </div>
      </div>

      {/* --- MAIN CONTENT --- */}
      <div className="container mx-auto px-6 py-8">
        {previewMode ? (
          /** --- PREVIEW MODE --- */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8">
              <div className="mb-6 flex gap-3">
                <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                  {formData.category || "Kategori"}
                </span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">
                  {formData.status === "draft" ? "Draft" : "Published"}
                </span>
              </div>

              {uploadedImage && (
                <img
                  src={uploadedImage}
                  alt="Featured"
                  className="w-full h-64 object-cover rounded-xl mb-6"
                />
              )}

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {formData.title || "Judul Berita"}
              </h1>

              <div className="flex items-center gap-6 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{formData.author || "Penulis"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formData.date || "Tanggal"}</span>
                </div>
              </div>

              {formData.excerpt && (
                <p className="text-xl text-gray-700 font-medium mb-6 leading-relaxed">
                  {formData.excerpt}
                </p>
              )}

              <div className="prose prose-lg max-w-none">
                {formData.content ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: formData.content.replace(/\n/g, "<br>"),
                    }}
                  />
                ) : (
                  <p className="text-gray-500 italic">
                    Konten berita akan ditampilkan di sini...
                  </p>
                )}
              </div>

              {formData.tags && (
                <div className="mt-8 pt-6 border-t">
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.split(",").map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /** --- FORM MODE --- */
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* --- LEFT SECTION --- */}
            <div className="lg:col-span-2 space-y-6">
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
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange("author", e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="Penulis *"
                    required
                  />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Ringkasan singkat berita (opsional)"
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
                />
              </div>

              {/* Gambar Utama */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-3 mb-2">
                  <Image className="h-6 w-6 text-green-600 bg-green-100 p-2 rounded-lg" />
                  <h3 className="text-xl font-bold text-gray-800">Gambar Utama</h3>
                </div>

                {uploadedImage ? (
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <label
                    htmlFor="image-upload"
                    className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center block cursor-pointer hover:border-blue-500 transition-colors"
                  >
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Klik untuk upload gambar</p>
                    <input
                      type="file"
                      accept="image/*"
                      id="image-upload"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* --- RIGHT SIDEBAR --- */}
            <div className="space-y-6">
              {/* Pengaturan */}
              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Tag className="h-6 w-6 text-purple-600 bg-purple-100 p-2 rounded-lg" />
                  <h3 className="text-xl font-bold text-gray-800">Pengaturan</h3>
                </div>

                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>

                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="tag1, tag2, tag3"
                />
                <p className="text-xs text-gray-500">Pisahkan dengan koma</p>
              </div>

              {/* Tombol Aksi */}
              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="h-5 w-5" />
                      Simpan Berita
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleBack}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-200"
                >
                  Batal
                </button>
              </div>

              {/* Tips */}
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl shadow-lg p-6 border border-yellow-200">
                <h4 className="font-bold text-yellow-800 mb-3">💡 Tips Menulis</h4>
                <ul className="text-sm text-yellow-700 space-y-2">
                  <li>• Gunakan judul yang menarik</li>
                  <li>• Mulai dengan lead yang kuat</li>
                  <li>• Gunakan paragraf pendek</li>
                  <li>• Sertakan gambar relevan</li>
                  <li>• Periksa ejaan sebelum publikasi</li>
                </ul>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
