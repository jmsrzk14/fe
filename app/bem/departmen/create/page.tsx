"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Building2, 
  FileText, 
  Target, 
  CheckSquare, 
  Calendar, 
  Star, 
  Upload, 
  Save, 
  X,
  ArrowLeft
} from "lucide-react";

export default function DepartemenCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nama: "",
    namaSingkat: "",
    visi: "",
    misi: "",
    rencanaKerja: "",
    nilai: "",
    gambar: null as File | null,
  });

  const handleChange = (key: string, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Data Departemen baru:", formData);
    // TODO: kirim ke API
    router.push("/admin/departmen"); // kembali ke halaman list
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="p-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Tambah Departemen Baru</h1>
          </div>
          <p className="text-gray-600 ml-11">Lengkapi formulir di bawah untuk menambahkan departemen baru</p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama */}
              <div className="md:col-span-1">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Nama Departemen
                </label>
                <input
                  type="text"
                  value={formData.nama}
                  onChange={(e) => handleChange("nama", e.target.value)}
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors bg-blue-50/30"
                  placeholder="Masukkan nama departemen"
                  required
                />
              </div>

              {/* Nama Singkat */}
              <div className="md:col-span-1">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Nama Singkat
                </label>
                <input
                  type="text"
                  value={formData.namaSingkat}
                  onChange={(e) => handleChange("namaSingkat", e.target.value)}
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors bg-blue-50/30"
                  placeholder="Contoh: IT, HR, Finance"
                  required
                />
              </div>

              {/* Visi */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <Target className="w-4 h-4 text-blue-600" />
                  Visi
                </label>
                <textarea
                  value={formData.visi}
                  onChange={(e) => handleChange("visi", e.target.value)}
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors bg-blue-50/30"
                  rows={3}
                  placeholder="Tuliskan visi departemen..."
                />
              </div>

              {/* Misi */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <CheckSquare className="w-4 h-4 text-blue-600" />
                  Misi
                </label>
                <textarea
                  value={formData.misi}
                  onChange={(e) => handleChange("misi", e.target.value)}
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors bg-blue-50/30"
                  rows={3}
                  placeholder="Tuliskan misi departemen..."
                />
              </div>

              {/* Rencana Kerja */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Rencana Kerja
                </label>
                <textarea
                  value={formData.rencanaKerja}
                  onChange={(e) => handleChange("rencanaKerja", e.target.value)}
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors bg-blue-50/30"
                  rows={3}
                  placeholder="Tuliskan rencana kerja departemen..."
                />
              </div>

              {/* Nilai */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <Star className="w-4 h-4 text-blue-600" />
                  Nilai-nilai
                </label>
                <textarea
                  value={formData.nilai}
                  onChange={(e) => handleChange("nilai", e.target.value)}
                  className="w-full border-2 border-blue-200 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none transition-colors bg-blue-50/30"
                  rows={3}
                  placeholder="Tuliskan nilai-nilai departemen..."
                />
              </div>

              {/* Gambar */}
              <div className="md:col-span-2">
                <label className="flex items-center gap-2 font-semibold text-gray-700 mb-3">
                  <Upload className="w-4 h-4 text-blue-600" />
                  Gambar Departemen
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleChange("gambar", e.target.files ? e.target.files[0] : null)
                    }
                    className="w-full border-2 border-dashed border-blue-300 rounded-lg px-4 py-8 focus:border-blue-500 focus:outline-none transition-colors bg-blue-50/30 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-blue-700 file:bg-blue-100 hover:file:bg-blue-200 cursor-pointer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <p className="text-blue-600 font-medium">Pilih gambar atau drag & drop</p>
                      <p className="text-blue-400 text-sm mt-1">PNG, JPG, atau JPEG</p>
                    </div>
                  </div>
                </div>
                {formData.gambar && (
                  <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-700 text-sm">
                      File terpilih: <span className="font-medium">{formData.gambar.name}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8 pt-6 border-t border-blue-100">
              <button
                type="button"
                onClick={() => router.push("/admin/departmen")}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors font-medium"
              >
                <ArrowLeft className="w-4 h-4" />
                Batal
              </button>
              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl font-medium"
              >
                <Save className="w-4 h-4" />
                Simpan Departemen
              </button>
            </div>
          </form>
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-200 rounded-lg flex-shrink-0">
              <Star className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 mb-2">Tips Pengisian</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Gunakan nama yang jelas dan mudah dipahami</li>
                <li>• Visi harus menggambarkan tujuan jangka panjang departemen</li>
                <li>• Misi berisi langkah-langkah untuk mencapai visi</li>
                <li>• Gambar sebaiknya berukuran maksimal 2MB dengan format JPG/PNG</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}