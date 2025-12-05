"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios, { AxiosError } from "axios";
import {
  ArrowLeft,
  Upload,
  Save,
  Building2,
  Info,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";
import AlertToast from "@/components/layout/AlertToast";

interface HimpunanForm {
  name: string;
  short_name: string;
  image: File | null;
  existingImageUrl?: string | null;
}

export default function HimpunanEditPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  const [formData, setFormData] = useState<HimpunanForm>({
    name: "",
    short_name: "",
    image: null,
    existingImageUrl: null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    setToken(stored);
  }, []);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const token = sessionStorage.getItem("token");
    axios
      .get(`${API_URL}/admin/associations/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      })
      .then((res) => {
        let payload: any = res.data;
        if (payload && payload.data) payload = payload.data;
        if (Array.isArray(payload)) payload = payload[0] ?? {};

        // Support multiple possible field names
        const name = payload.name ?? payload.title ?? "";
        const short_name =
          payload.short_name ?? payload.shortName ?? payload.short ?? "";
        const imageUrlCandidate =
          payload.image_url ?? payload.image ?? payload.logo ?? null;

        let previewUrl: string | null = null;
        if (imageUrlCandidate) {
          if (
            typeof imageUrlCandidate === "string" &&
            /^(https?:)?\/\//.test(imageUrlCandidate)
          ) {
            previewUrl = imageUrlCandidate;
          } else {
            previewUrl = `${IMAGE_URL}/associations/${imageUrlCandidate}`;
          }
        }

        setFormData((p) => ({
          ...p,
          name,
          short_name,
          existingImageUrl: previewUrl,
        }));
        setPreviewImage(previewUrl);
      })
      .catch((err) => {
        console.error("fetch association error:", err);
        setError("Gagal memuat data himpunan.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleBack = () => router.push("/admin/himpunan");

  const handleFileChange = (f: File | null) => {
    if (!f) {
      setFormData((p) => ({ ...p, image: null }));
      setPreviewImage(null);
      return;
    }
    if (f.size > 5 * 1024 * 1024) {
      AlertToast.warning("Ukuran file maksimal 5MB");
      return;
    }
    setFormData((p) => ({ ...p, image: f }));
    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target?.result as string);
    reader.readAsDataURL(f);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);
    if (!formData.name || !formData.short_name) {
      AlertToast.error("Nama dan nama singkat harus diisi");
      return;
    }
    setSubmitting(true);
    try {
      if (!token) {
        setError("Anda harus login");
        router.push("/auth/login");
        return;
      }
      let res;
      if (formData.image instanceof File) {
        const body = new FormData();
        body.append("name", formData.name);
        body.append("short_name", formData.short_name);
        body.append("image", formData.image);
        res = await axios.put(
          `${API_URL}/admin/associations/${id}`,
          body,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        res = await axios.put(
          `${API_URL}/admin/associations/${id}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
      }
      if (res.status === 200) {
        AlertToast.success("Data himpunan berhasil diperbarui");
        const ts = Date.now();
        router.push(`/admin/himpunan?page=1&updated=${ts}`);
      }
    } catch (err) {
      const error = err as AxiosError<{ message?: string }>;
      setError(error.response?.data?.message || "Gagal menyimpan");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Memuat data...</div>;

  const completenessPercent = Math.round(
    (((formData.name ? 1 : 0) +
      (formData.short_name ? 1 : 0) +
      (formData.image || formData.existingImageUrl ? 1 : 0)) /
      3) *
      100
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Edit Himpunan
              </h1>
              <p className="text-sm text-gray-600">
                Perbarui data himpunan mahasiswa
              </p>
            </div>
            <button
              onClick={handleBack}
              className="text-blue-600 hover:text-blue-800 inline-flex items-center gap-2"
            >
              <ArrowLeft size={18} /> Kembali
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="bg-white rounded-xl shadow p-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Himpunan
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, name: e.target.value }))
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Singkat
                </label>
                <input
                  type="text"
                  value={formData.short_name}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, short_name: e.target.value }))
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-bold text-blue-900">
                  <Upload size={18} className="text-blue-600" />
                  Upload Logo Himpunan
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/gif"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) =>
                      handleFileChange(
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                    disabled={submitting}
                  />
                  <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 text-center hover:border-blue-500 hover:bg-blue-50 transition-all cursor-pointer bg-white">
                    {previewImage ? (
                      <div className="space-y-4">
                        <img
                          src={previewImage as string}
                          alt="Preview"
                          width={112}
                          height={112}
                          className="w-28 h-28 object-cover rounded-xl mx-auto border-2 border-blue-200 shadow-md"
                        />
                        <p className="text-blue-600 font-medium">
                          {formData.image?.name}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon
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

              <div className="pt-4 border-t">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  <Save size={16} />{" "}
                  {submitting ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
              <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                <Building2 size={18} className="text-blue-600" /> Progress
                Pengisian
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Nama Lengkap</span>
                  <CheckCircle
                    size={16}
                    className={
                      formData.name ? "text-green-500" : "text-blue-300"
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Nama Singkat</span>
                  <CheckCircle
                    size={16}
                    className={
                      formData.short_name ? "text-green-500" : "text-blue-300"
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-700">Logo</span>
                  <CheckCircle
                    size={16}
                    className={
                      formData.image || formData.existingImageUrl
                        ? "text-green-500"
                        : "text-blue-300"
                    }
                  />
                </div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-xs text-blue-600 mb-1">
                  <span>Kelengkapan</span>
                  <span>{completenessPercent}%</span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completenessPercent}%` }}
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
                    Tips Mengisi Data
                  </h3>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>Gunakan nama resmi yang lengkap</li>
                    <li>Singkatan harus mudah diingat</li>
                    <li>Visi & misi harus jelas dan inspiratif</li>
                    <li>
                      Manfaatkan formatting text untuk tampilan yang menarik
                    </li>
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
