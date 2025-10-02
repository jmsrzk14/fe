"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import dynamic from "next/dynamic";
import {
  Users,
  Type,
  Target,
  Upload,
  Save,
  ArrowLeft,
  Building2,
  Image,
  CheckCircle2,
  Info,
  Star,
  Zap,
} from "lucide-react";
import Swal from "sweetalert2";

// Dynamic import React Quill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface FormData {
  title: string;
  content: string;
  gambar: File | null;
}

export default function GaleryCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    content: "",
    gambar: null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Quill modules configuration
  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'color', 'background', 'align', 'link'
  ];

  // Helper function to strip HTML and get text length
  const getTextLength = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent?.length || tmp.innerText?.length || 0;
  };

  // Helper function to strip HTML for preview
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const handleChange = (key: keyof FormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setError(null);

    // Handle image preview
    if (key === "gambar" && value instanceof File) {
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
        setFormData((prev) => ({ ...prev, gambar: null }));
        setPreviewImage(null);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(value);
    } else if (key === "gambar" && !value) {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("Anda harus login untuk melakukan aksi ini.");
        router.push("/login");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("content", formData.content);
      if (formData.gambar) {
        formDataToSend.append("image_url", formData.gambar);
      }

      const response = await axios.post(
        "https://be-jmsrzk147707-ttmyeqw8.apn.leapcell.online/api/admin/galery",
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
          title: "Data Galery berhasil ditambahkan!",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: "#22c55e",
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        setTimeout(() => {
          router.push("/admin/galery");
        }, 1500);
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      if (error.response?.status === 401) {
        setError("Sesi tidak valid atau telah berakhir. Silakan login kembali.");
        sessionStorage.removeItem("token");
        router.push("/auth/login");
      } else {
        setError(
          error.response?.data?.message || "Terjadi kesalahan saat menyimpan data."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push("/admin/galery");
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
            disabled={isSubmitting}
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Kembali ke Data Galery</span>
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
              <h1 className="text-3xl font-bold text-blue-900">
                Tambah Data Galery
              </h1>
              <p className="text-blue-600">Buat data galery mahasiswa baru dengan editor rich text</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-2 border-red-300 rounded-xl text-red-700">
            {error}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl border-2 border-blue-100 overflow-hidden">
              <div className="bg-blue-600 p-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <Users size={24} />
                  Informasi galeri
                </h2>
              </div>

              <div className="p-8 space-y-8">
                {/* Nama */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                    <Building2 size={18} className="text-blue-600" />
                    Nama Lengkap galeri
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-blue-50 text-blue-900 font-medium"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Contoh: galeri Mahasiswa Teknik Informatika"
                    required
                    disabled={isSubmitting}
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
                    value={formData.content}
                    onChange={(e) => handleChange("content", e.target.value)}
                    placeholder="Contoh: HMTI"
                    required
                    disabled={isSubmitting}
                  />
                </div>
                {/* File Upload */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                    <Upload size={18} className="text-blue-600" />
                    Upload Logo galeri
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/gif"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) =>
                        handleChange(
                          "gambar",
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                      disabled={isSubmitting}
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
                          <Image
                            size={48}
                            className="mx-auto text-blue-400 mb-3"
                          />
                          <p className="text-blue-600 font-medium">
                            Klik untuk upload logo atau drag & drop
                            <br />
                            <span className="text-sm text-blue-500">
                              PNG, JPG, atau GIF maksimal 5MB
                            </span>
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
                    disabled={
                      isSubmitting ||
                      !formData.title ||
                      !formData.content
                    }
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 hover:shadow-xl transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
                  >
                    <Save size={20} />
                    {isSubmitting ? "Menyimpan..." : "Simpan Data Galeri"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            {(formData.title ||
              formData.content) && (
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
                  {formData.title && (
                    <div className="text-center">
                      <h4 className="font-bold text-blue-900 text-lg">
                        {formData.title}
                      </h4>
                      {formData.content && (
                        <p className="text-blue-600 font-medium text-sm mt-1">
                          ({formData.content})
                        </p>
                      )}
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
                  <CheckCircle2
                    size={16}
                    className={
                      formData.title ? "text-green-500" : "text-blue-300"
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Nama Singkat</span>
                  <CheckCircle2
                    size={16}
                    className={
                      formData.content ? "text-green-500" : "text-blue-300"
                    }
                  />
                </div>
                </div>
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-blue-600 mb-1">
                  <span>Kelengkapan</span>
                  <span>
                    {Math.round(
                      (((formData.title ? 1 : 0) +
                        (formData.content ? 1 : 0) +
                        (formData.gambar ? 1 : 0)) /
                        3) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${
                        (((formData.title ? 1 : 0) +
                          (formData.content ? 1 : 0) +
                          (formData.gambar ? 1 : 0)) /
                          3) *
                        100
                      }%`,
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
                  <h3 className="font-bold text-blue-900 mb-2">
                    Tips Mengisi Data
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>Gunakan nama resmi yang lengkap</li>
                    <li>Singkatan harus mudah diingat</li>
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