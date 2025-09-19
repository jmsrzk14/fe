"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Target, Eye, Save, ArrowLeft, Type, 
  CheckCircle2, Info, Sparkles, AlertCircle, Edit2, Trash2
} from "lucide-react";

export default function VisiMisiEditPage() {
  const router = useRouter();
  
  // Data awal visi misi (nanti bisa dari API)
  const [visiMisiData, setVisiMisiData] = useState([
    { 
      id: 1, 
      type: 'Visi' as 'Visi' | 'Misi', 
      content: 'Menjadi organisasi mahasiswa yang terdepan dalam mengembangkan potensi akademik, karakter, dan kepemimpinan mahasiswa Institut Teknologi Del untuk kemajuan bangsa dan negara.' 
    },
    { 
      id: 2, 
      type: 'Misi' as 'Visi' | 'Misi', 
      content: 'Mengembangkan program-program inovatif yang mendukung prestasi akademik dan non-akademik mahasiswa' 
    },
    { 
      id: 3, 
      type: 'Misi' as 'Visi' | 'Misi', 
      content: 'Memfasilitasi pengembangan soft skills dan kepemimpinan melalui berbagai kegiatan organisasi' 
    },
    { 
      id: 4, 
      type: 'Misi' as 'Visi' | 'Misi', 
      content: 'Menjadi jembatan komunikasi antara mahasiswa, dosen, dan pihak institusi untuk kemajuan bersama' 
    },
    { 
      id: 5, 
      type: 'Misi' as 'Visi' | 'Misi', 
      content: 'Mengadakan kegiatan yang bermanfaat untuk pengembangan minat, bakat, dan kreativitas mahasiswa' 
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<{id: number, type: 'Visi' | 'Misi', content: string} | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    type: "Visi" as "Visi" | "Misi",
    content: "",
    id: 0,
  });

  const [errors, setErrors] = useState({
    type: "",
    content: "",
  });

  const handleSelectItem = (item: {id: number, type: 'Visi' | 'Misi', content: string}) => {
    setSelectedItem(item);
    setFormData({
      type: item.type,
      content: item.content,
      id: item.id,
    });
    setIsEditing(true);
    setErrors({ type: "", content: "" });
  };

  const handleChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    
    // Clear error when user starts typing
    if (errors[key as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      type: "",
      content: "",
    };

    if (!formData.type) {
      newErrors.type = "Pilih jenis (Visi atau Misi)";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Konten tidak boleh kosong";
    } else if (formData.content.trim().length < 20) {
      newErrors.content = "Konten minimal 20 karakter";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Update data
    setVisiMisiData(prev => 
      prev.map(item => 
        item.id === formData.id 
          ? { ...item, type: formData.type, content: formData.content }
          : item
      )
    );

    alert(`${formData.type} berhasil diperbarui!`);
    handleCancel();
  };

  const handleDelete = () => {
    if (confirm(`Apakah Anda yakin ingin menghapus ${formData.type} ini?`)) {
      setVisiMisiData(prev => prev.filter(item => item.id !== formData.id));
      alert(`${formData.type} berhasil dihapus!`);
      handleCancel();
    }
  };

  const handleCancel = () => {
    setSelectedItem(null);
    setIsEditing(false);
    setFormData({ type: "Visi", content: "", id: 0 });
    setErrors({ type: "", content: "" });
  };

  const handleBack = () => {
    router.push("/bem/visimisi");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg border border-blue-100 mb-4">
            <Sparkles className="text-[#ffd700] animate-pulse" size={24} />
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Edit Visi & Misi</h1>
            <Sparkles className="text-[#ffd700] animate-pulse" size={24} />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pilih visi atau misi yang ingin diedit dari daftar di bawah
          </p>
        </div>

        {!isEditing ? (
          // Selection Mode - Card Layout
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* VISI Column */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full shadow-lg">
                    <Eye size={24} />
                    <h2 className="text-xl font-bold">VISI</h2>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">Cita-cita Organisasi</p>
                </div>
                
                <div className="space-y-4">
                  {visiMisiData
                    .filter(item => item.type === 'Visi')
                    .map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => handleSelectItem(item)}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-l-4 border-blue-500 overflow-hidden group"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-blue-100 rounded-lg">
                                <Eye className="text-blue-600" size={20} />
                              </div>
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                ID: {item.id}
                              </span>
                            </div>
                            <div className="p-2 text-blue-600 group-hover:bg-blue-50 rounded-lg transition-all duration-300">
                              <Edit2 size={18} />
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm">
                            {item.content}
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-blue-600">
                            <Sparkles size={16} />
                            <span className="text-xs font-medium">Klik untuk edit</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                  {visiMisiData.filter(item => item.type === 'Visi').length === 0 && (
                    <div className="bg-blue-50 border-2 border-dashed border-blue-200 rounded-2xl p-8 text-center">
                      <Eye className="mx-auto text-blue-300 mb-3" size={32} />
                      <h3 className="text-blue-600 font-bold mb-2">Belum Ada Visi</h3>
                      <p className="text-blue-500 text-sm">Tambahkan visi organisasi</p>
                    </div>
                  )}
                </div>
              </div>

              {/* MISI Column */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#ffd700] to-yellow-500 text-blue-600 px-6 py-3 rounded-full shadow-lg">
                    <Target size={24} />
                    <h2 className="text-xl font-bold">MISI</h2>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">Langkah Strategis</p>
                </div>
                
                <div className="space-y-4">
                  {visiMisiData
                    .filter(item => item.type === 'Misi')
                    .map((item, index) => (
                      <div 
                        key={item.id} 
                        onClick={() => handleSelectItem(item)}
                        className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-l-4 border-[#ffd700] overflow-hidden group"
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-yellow-100 rounded-lg">
                                <Target className="text-[#ffd700]" size={20} />
                              </div>
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-medium rounded-full">
                                Misi {index + 1}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                ID: {item.id}
                              </span>
                            </div>
                            <div className="p-2 text-[#ffd700] group-hover:bg-yellow-50 rounded-lg transition-all duration-300">
                              <Edit2 size={18} />
                            </div>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-sm">
                            {item.content}
                          </p>
                          <div className="mt-4 flex items-center gap-2 text-[#ffd700]">
                            <Sparkles size={16} />
                            <span className="text-xs font-medium">Klik untuk edit</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                  {visiMisiData.filter(item => item.type === 'Misi').length === 0 && (
                    <div className="bg-yellow-50 border-2 border-dashed border-yellow-200 rounded-2xl p-8 text-center">
                      <Target className="mx-auto text-yellow-300 mb-3" size={32} />
                      <h3 className="text-[#ffd700] font-bold mb-2">Belum Ada Misi</h3>
                      <p className="text-yellow-600 text-sm">Tambahkan misi organisasi</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={handleBack}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                <ArrowLeft size={20} />
                Kembali ke Visi Misi
              </button>
              <button
                onClick={() => router.push("/bem/visimisi/create")}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-[#ffd700] text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium transform hover:scale-105"
              >
                <Sparkles size={20} />
                Tambah Visi / Misi Baru
              </button>
            </div>
          </>
        ) : (
          // Edit Mode - Form like create page
          <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-blue-600">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type Selection */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">
                  <Type size={16} className="inline mr-2 text-blue-600" />
                  Jenis
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleChange("type", "Visi")}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                      formData.type === "Visi"
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-blue-300 text-gray-600"
                    }`}
                  >
                    <Eye size={24} className={formData.type === "Visi" ? "text-blue-600" : "text-gray-400"} />
                    <div className="text-left">
                      <div className="font-bold">VISI</div>
                      <div className="text-xs">Cita-cita Organisasi</div>
                    </div>
                    {formData.type === "Visi" && (
                      <CheckCircle2 size={20} className="text-blue-600 ml-auto" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleChange("type", "Misi")}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 ${
                      formData.type === "Misi"
                        ? "border-[#ffd700] bg-yellow-50 text-yellow-700"
                        : "border-gray-200 hover:border-yellow-300 text-gray-600"
                    }`}
                  >
                    <Target size={24} className={formData.type === "Misi" ? "text-[#ffd700]" : "text-gray-400"} />
                    <div className="text-left">
                      <div className="font-bold">MISI</div>
                      <div className="text-xs">Langkah Strategis</div>
                    </div>
                    {formData.type === "Misi" && (
                      <CheckCircle2 size={20} className="text-[#ffd700] ml-auto" />
                    )}
                  </button>
                </div>
                {errors.type && (
                  <p className="text-red-500 text-sm mt-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    {errors.type}
                  </p>
                )}
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  <Info size={16} className="inline mr-2 text-[#ffd700]" />
                  Konten {formData.type}
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 resize-none min-h-[120px] focus:ring-2 ${
                    errors.content
                      ? "border-red-300 focus:ring-red-200"
                      : formData.type === "Visi"
                      ? "border-blue-300 focus:ring-blue-200 focus:border-blue-500"
                      : "border-yellow-300 focus:ring-yellow-200 focus:border-[#ffd700]"
                  }`}
                  placeholder={
                    formData.type === "Visi"
                      ? "Masukkan visi organisasi BEM IT Del..."
                      : "Masukkan salah satu misi organisasi BEM IT Del..."
                  }
                  rows={6}
                />
                <div className="flex justify-between items-center mt-2">
                  <div className="text-sm text-gray-500">
                    {formData.content.length} karakter (minimal 20)
                  </div>
                  {errors.content && (
                    <p className="text-red-500 text-sm flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.content}
                    </p>
                  )}
                </div>
              </div>

              {/* Info Box */}
              <div className={`p-4 rounded-xl border-l-4 ${
                formData.type === "Visi"
                  ? "bg-blue-50 border-blue-400"
                  : "bg-yellow-50 border-[#ffd700]"
              }`}>
                <div className="flex items-start gap-3">
                  <Info size={20} className={formData.type === "Visi" ? "text-blue-600" : "text-[#ffd700]"} />
                  <div>
                    <h4 className={`font-bold mb-1 ${
                      formData.type === "Visi" ? "text-blue-700" : "text-yellow-700"
                    }`}>
                      Tips untuk {formData.type}:
                    </h4>
                    <ul className={`text-sm space-y-1 ${
                      formData.type === "Visi" ? "text-blue-600" : "text-yellow-600"
                    }`}>
                      {formData.type === "Visi" ? (
                        <>
                          <li>• Jelaskan cita-cita jangka panjang organisasi</li>
                          <li>• Gunakan bahasa yang inspiratif dan motivational</li>
                          <li>• Fokus pada dampak yang ingin dicapai</li>
                        </>
                      ) : (
                        <>
                          <li>• Jelaskan langkah konkret untuk mencapai visi</li>
                          <li>• Gunakan kalimat yang jelas dan actionable</li>
                          <li>• Setiap misi sebaiknya fokus pada satu aspek</li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
                >
                  <ArrowLeft size={20} />
                  Batal
                </button>
                
                <button
                  type="button"
                  onClick={handleDelete}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:bg-red-700"
                >
                  <Trash2 size={20} />
                  Hapus {formData.type}
                </button>
                
                <button
                  type="submit"
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex-1 ${
                    formData.type === "Visi"
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-[#ffd700] text-blue-600 hover:bg-yellow-400"
                  }`}
                >
                  <Save size={20} />
                  Update {formData.type}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
