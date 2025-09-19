"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Target, Eye, Save, ArrowLeft, Type, 
  CheckCircle2, Info, Sparkles, AlertCircle
} from "lucide-react";

export default function VisiMisiCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get('type');
  
  const [formData, setFormData] = useState({
    type: (typeParam === 'visi' ? 'Visi' : typeParam === 'misi' ? 'Misi' : 'Visi') as "Visi" | "Misi",
    content: "",
  });

  const [errors, setErrors] = useState({
    type: "",
    content: "",
  });

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

    console.log("Data visi misi:", formData);
    alert(`${formData.type} berhasil ditambahkan!`);
    router.push("/bem/visimisi");
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
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600">Tambah Visi & Misi</h1>
            <Sparkles className="text-[#ffd700] animate-pulse" size={24} />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tambahkan visi atau misi baru untuk BEM IT Del
          </p>
        </div>

        {/* Form */}
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
                onClick={handleBack}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium"
              >
                <ArrowLeft size={20} />
                Kembali
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
                Simpan {formData.type}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
