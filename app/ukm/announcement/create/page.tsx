"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import {
  Save,
  ArrowLeft,
  FileText,
  Upload,
  Calendar,
  Image,
  CheckCircle2,
  Info,
  Zap,
} from "lucide-react";

interface FormData {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  file: File | null;
}
import Swal from "sweetalert2";
export default function AnnouncementCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
    file: null,
  });
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (key: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError(null);

    if (key === "file" && value instanceof File) {
      if (value.size > 5 * 1024 * 1024) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "warning",
          title: "Ukuran logo tidak boleh melebihi 5MB",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#fffff",
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        setFormData((prev) => ({ ...prev, file: null }));
        setPreviewFile(null);
        return;
      }
      setPreviewFile(value.name);
    } else if (key === "file" && !value) {
      setPreviewFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.content) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "Semua Kolom Harus Terisi!",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: "#fff",
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Anda harus login.");
        router.push("/login");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      if (formData.startDate)
        formDataToSend.append("start_date", formData.startDate);
      if (formData.endDate) formDataToSend.append("end_date", formData.endDate);
      if (formData.file) formDataToSend.append("file", formData.file);

      const response = await axios.post(
        "http://localhost:9090/api/student/announcements",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Data Pengumuman berhasil ditambahkan!",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#fff",
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        router.push("/admin/announcement");
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <button
          onClick={() => router.push("/admin/announcement")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
          disabled={isSubmitting}
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Kembali ke Data Announcement</span>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="p-4 bg-blue-600 rounded-2xl shadow-lg">
              <FileText className="text-white" size={32} />
            </div>
            <div className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-md">
              <Zap size={16} className="text-blue-600" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-900">
              Tambah Announcement
            </h1>
            <p className="text-blue-600">
              Buat pengumuman baru untuk mahasiswa
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow-2xl border border-blue-100 p-8 space-y-6"
        >
          {/* Title */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
              <FileText size={18} className="text-blue-600" /> Judul
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 mt-2 focus:border-blue-500 focus:ring focus:ring-blue-100 outline-none"
              placeholder="Masukkan judul announcement"
              disabled={isSubmitting}
              required
            />
          </div>

          {/* Content */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
              <FileText size={18} className="text-blue-600" /> Konten
            </label>
            <textarea
              rows={6}
              value={formData.content}
              onChange={(e) => handleChange("content", e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 mt-2 focus:border-blue-500 focus:ring focus:ring-blue-100 outline-none resize-none"
              placeholder="Tulis konten pengumuman..."
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Start & End Date */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                <Calendar size={18} className="text-blue-600" /> Tanggal Mulai
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleChange("startDate", e.target.value)}
                className="w-full border border-blue-200 rounded-xl px-4 py-3 mt-2 focus:border-blue-500 focus:ring focus:ring-blue-100 outline-none"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                <Calendar size={18} className="text-blue-600" /> Tanggal Selesai
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleChange("endDate", e.target.value)}
                className="w-full border border-blue-200 rounded-xl px-4 py-3 mt-2 focus:border-blue-500 focus:ring focus:ring-blue-100 outline-none"
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* File Upload */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
              <Upload size={18} className="text-blue-600" /> Upload File
              (Opsional)
            </label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) =>
                handleChange("file", e.target.files ? e.target.files[0] : null)
              }
              disabled={isSubmitting}
              className="mt-2"
            />
            {previewFile && (
              <p className="text-sm text-blue-600 mt-2">📎 {previewFile}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-blue-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
            >
              <Save size={20} />
              {isSubmitting ? "Menyimpan..." : "Simpan Announcement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
