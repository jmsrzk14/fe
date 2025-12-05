"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import dynamic from "next/dynamic";
// ReactQuill depends on `document` — load client-side only to avoid server error
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import AlertToast from "@/components/layout/AlertToast";
import "react-quill/dist/quill.snow.css";
import NextImage from "next/image";
import {
  Users,
  Type,
  Target,
  Upload,
  Save,
  ArrowLeft,
  Building2,
  Image as ImageIcon,
  CheckCircle2,
  Info,
  Zap,
} from "lucide-react";

interface FormDataNews {
  title: string;
  content: string;
  image_url: File | null;
}

function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
}

export default function NewsEditPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [formData, setFormData] = useState<FormDataNews>({
    title: "",
    content: "",
    image_url: null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  
  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    setToken(stored);
  }, []);
  
  useEffect(() => {
    if (!id) return;

    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.get(
          `${API_URL}/student/news/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("GET /api/student/news/:id raw:", res.data);
        let d: any = res.data;
        if (d && d.data) d = d.data;
        if (Array.isArray(d)) d = d[0] ?? {};

        setFormData({
          title: d.title || "",
          content: d.content || "",
          image_url: null, 
        });

        // pilih field gambar mana yang tersedia
        const imageCandidate = d.image_url ?? d.image ?? d.imageUrl ?? null;
        const preview = imageCandidate
          ? typeof imageCandidate === "string" &&
            /^(https?:)?\/\//.test(imageCandidate)
            ? imageCandidate
            : `${IMAGE_URL}/news/${imageCandidate}`
          : null;
        console.log(
          "news image candidate:",
          imageCandidate,
          "preview:",
          preview
        );
        setPreviewImage(preview);
      } catch (err) {
        console.error(
          "GET /api/student/news/:id error:",
          (err as AxiosError)?.response ?? err
        );
        setError("Gagal memuat data news. Periksa console untuk detail.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id, router]);

  const handleChange = (
    key: keyof FormDataNews,
    value: string | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value } as any));
    setError(null);

    if (key === "image_url" && value instanceof File) {
      if (value.size > 5 * 1024 * 1024) {
        AlertToast.warning("Ukuran file maksimal 5MB.");
        setFormData((prev) => ({ ...prev, gambar: null } as any));
        setPreviewImage(null);
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target?.result as string);
      reader.readAsDataURL(value);
    } else if (key === "image_url" && !value) {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!formData.title || !formData.content) {
      AlertToast.error("Judul dan Deskripsi wajib diisi.");
      return;
    }

    if (formData.content.length < 100) {
      AlertToast.error("Deskripsi minimal 100 karakter.");
      return;
    }

    setIsSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("content", formData.content);
      if (formData.image_url instanceof File)
        fd.append("image", formData.image_url);
      const res = await axios.put(
        `${API_URL}/student/news/${id}`,
        fd,
        {
          headers: { Authorization: `Bearer ${token}` }, // do not set Content-Type
        }
      );
      if (res.status === 200) {
        AlertToast.success("Data news berhasil diperbarui.");
        const ts = Date.now();
        router.push(`/bem/news?page=1&updated=${ts}`);
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      console.error("PUT /api/student/news/:id error:", error?.response ?? error);
      setError(error.response?.data?.message || "Gagal menyimpan data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const completeness = Math.round(
    (((formData.title ? 1 : 0) +
      (formData.content ? 1 : 0) +
      (formData.image_url ? 1 : 0)) /
      3) *
      100
  );

  if (loading) return <div className="p-6">Memuat data...</div>;

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/bem/news")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
            disabled={isSubmitting}
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span className="font-medium">Kembali ke Data News</span>
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
                Edit Data News
              </h1>
              <p className="text-blue-600">Perbarui data News mahasiswa</p>
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
                  Informasi News
                </h2>
              </div>

              <div className="p-8 space-y-8">
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                    <Building2 size={18} className="text-blue-600" />
                    Judul News
                  </label>
                  <input
                    type="text"
                    className="w-full border-2 border-blue-200 rounded-xl px-4 py-4 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all outline-none bg-blue-50 text-blue-900 font-medium"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                    <Target size={18} className="text-blue-600" />
                    Deskripsi
                  </label>
                  <div className="border-2 border-blue-200 rounded-xl overflow-hidden bg-white">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(v) => handleChange("content", v)}
                      style={{ height: 200 }}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-blue-600">
                      {formData.content.length > 0 && (
                        <span className="font-medium">
                          {formData.content.length} karakter
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {formData.content.length >= 100 && (
                        <CheckCircle2 size={16} className="text-green-500" />
                      )}
                      <span
                        className={
                          formData.content.length >= 100
                            ? "text-green-600 font-medium"
                            : "text-blue-500"
                        }
                      >
                        {formData.content.length >= 100
                          ? "✅ Panjang yang baik"
                          : "Minimal 100 karakter"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                    <Upload size={18} className="text-blue-600" />
                    Upload Thumbnail
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/gif"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) =>
                        handleChange(
                          "image_url",
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                      disabled={isSubmitting}
                    />
                    <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer bg-white">
                      {previewImage ? (
                        <div className="space-y-4">
                          <NextImage
                            src={previewImage}
                            alt="Preview"
                            width={112}
                            height={112}
                            className="w-28 h-28 object-cover rounded-xl mx-auto border-2 border-blue-200 shadow-md"
                          />
                          <p className="text-blue-600 font-medium">
                            📁 {formData.image_url?.name}
                          </p>
                        </div>
                      ) : (
                        <div>
                          <ImageIcon
                            size={48}
                            className="mx-auto text-blue-400 mb-3"
                          />
                          <p className="text-blue-600 font-medium">
                            📸 Klik untuk upload thumbnail
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
                    {isSubmitting ? "Menyimpan..." : "💾 Simpan Perubahan"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 lg:sticky lg:top-28">
            {(formData.title || formData.content ) && (
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
                      <NextImage
                        src={previewImage}
                        alt="Logo Preview"
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded-xl mx-auto border-2 border-blue-200 shadow-md"
                      />
                    </div>
                  )}
                  {formData.title && (
                    <div className="text-center">
                      <h4 className="font-bold text-blue-900 text-lg break-words">
                        {formData.title}
                      </h4>
                    </div>
                  )}
                  {formData.content && (
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-blue-700 text-sm leading-relaxed break-words line-clamp-3">
                        <strong>Deskripsi:</strong>{" "}
                        {stripHtml(formData.content).length > 150
                          ? stripHtml(formData.content).substring(0, 150) +
                            "..."
                          : stripHtml(formData.content)}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Building2 size={18} className="text-blue-600" />
                📊 Progress Pengisian
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Judul</span>
                  <CheckCircle2
                    size={16}
                    className={
                      formData.title ? "text-green-500" : "text-blue-300"
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Deskripsi</span>
                  <CheckCircle2
                    size={16}
                    className={
                      formData.content ? "text-green-500" : "text-blue-300"
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Gambar</span>
                  <CheckCircle2
                    size={16}
                    className={
                      formData.image_url ? "text-green-500" : "text-blue-300"
                    }
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-blue-600 mb-1">
                  <span>Kelengkapan</span>
                  <span>{completeness}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: completeness + "%" }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-blue-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Info size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">
                    💡 Tips Mengisi Data
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>🎯 Judul harus jelas dan tepat</li>
                    <li>⚡ Deskripsi harus mendukung judul</li>
                    <li>🖼️ Gunakan gambar berkualitas (PNG/JPG)</li>
                    <li>✅ Periksa kembali sebelum disimpan</li>
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
