"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import { Save, ArrowLeft, FileText, Upload, Calendar, Zap } from "lucide-react";
import AlertToast from "@/components/layout/AlertToast";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface FormDataAnn {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  file: File | null;
}

// helper untuk strip HTML jika perlu
const stripHtml = (html: string | null | undefined) => {
  if (!html) return "";
  try {
    if (typeof document !== "undefined") {
      const tmp = document.createElement("DIV");
      tmp.innerHTML = html;
      return tmp.textContent || tmp.innerText || "";
    }
  } catch {}
  return String(html).replace(/<[^>]*>/g, "");
};

export default function AnnouncementEditPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  const [formData, setFormData] = useState<FormDataAnn>({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
    file: null,
  });
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    setToken(stored);
  }, []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios
      .get(`${API_URL}/student/announcements/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      .then((res) => {
        let payload: any = res.data;
        if (payload && payload.data) payload = payload.data;
        if (Array.isArray(payload)) payload = payload[0] ?? {};

        const title = payload.title ?? "";
        const content = payload.content ?? "";
        const startDate = payload.start_date ?? payload.startDate ?? "";
        const endDate = payload.end_date ?? payload.endDate ?? "";

        const fileCandidate =
          payload.file_name ?? payload.file ?? payload.file_url ?? null;
        const preview =
          fileCandidate && typeof fileCandidate === "string"
            ? /^(https?:)?\/\//.test(fileCandidate)
              ? fileCandidate
              : `${IMAGE_URL}/${fileCandidate}`
            : null;

        setFormData({
          title,
          content,
          startDate,
          endDate,
          file: null,
        });
        setPreviewFile(preview);
      })
      .catch((err) => {
        console.error("fetch announcement error:", (err as AxiosError)?.response ?? err);
        setError("Gagal memuat data announcement");
      })
      .finally(() => setLoading(false));
  }, [id, token]);

  const handleChange = (
    key: keyof FormDataAnn,
    value: string | File | null
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value } as any));
    setError(null);

    if (key === "file" && value instanceof File) {
      if (value.size > 5 * 1024 * 1024) {
        AlertToast.warning("Ukuran file maksimal 5MB.");
        setFormData((prev) => ({ ...prev, file: null } as any));
        setPreviewFile(null);
        return;
      }
      setPreviewFile(value.name);
    } else if (key === "file" && !value) {
      setPreviewFile(null);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!formData.title || !formData.content) {
      AlertToast.error("Judul dan Konten wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (!token) {
        setError("Anda harus login.");
        router.push("/auth/login");
        return;
      }

      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("content", formData.content);
      if (formData.startDate) fd.append("start_date", formData.startDate);
      if (formData.endDate) fd.append("end_date", formData.endDate);
      if (formData.file instanceof File) {
        fd.append("file", formData.file);
      } else if (previewFile) {
        fd.append("existing_file", previewFile);
      }

      const res = await axios.put(
        `${API_URL}/student/announcements/${id}`,
        fd,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 200) {
        AlertToast.success("Pengumuman berhasil diperbarui.");
        router.push("/ukm/announcement");
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Terjadi kesalahan saat menyimpan.");
      if (error.response?.status === 401) {
        sessionStorage.removeItem("token");
        router.push("/auth/login");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!id) return <div className="p-6">ID tidak ditemukan.</div>;
  if (loading) return <div className="p-6">Memuat data...</div>;

  // ✅ konfigurasi toolbar ReactQuill
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      ["clean"],
    ],
  };

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => router.push("/ukm/announcement")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 transition-colors group"
          disabled={isSubmitting}
        >
          <ArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Kembali ke Data Pengumuman</span>
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
            <h1 className="text-3xl font-bold text-blue-900">Edit Pengumuman</h1>
            <p className="text-blue-600">Perbarui pengumuman</p>
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
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
              <FileText size={18} className="text-blue-600" /> Judul
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="w-full border border-blue-200 rounded-xl px-4 py-3 mt-2 focus:border-blue-500 focus:ring focus:ring-blue-100 outline-none"
              disabled={isSubmitting}
              required
            />
          </div>

          {/* ✅ ReactQuill sebagai editor konten */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-2">
              <FileText size={18} className="text-blue-600" /> Konten
            </label>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(value) => handleChange("content", value)}
              modules={quillModules}
              readOnly={isSubmitting}
              className="bg-white border border-blue-200 rounded-xl"
            />
          </div>

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

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
              <Upload size={18} className="text-blue-600" /> Upload File (Opsional)
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

          <div className="pt-4 border-t border-blue-100">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all shadow-lg disabled:opacity-50"
            >
              <Save size={20} />{" "}
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
