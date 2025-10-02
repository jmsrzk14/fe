"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import {
  Target, Eye, Save, ArrowLeft, Sparkles, RefreshCw, AlertCircle,
} from "lucide-react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface VisiMisiResponse {
  status: string;
  message: string;
  data: {
    id: number;
    vision: string;
    mission: string;
    period: string;
    created_at: string;
    updated_at: string;
  };
}

export default function VisiMisiEditPage() {
  const router = useRouter();
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [id, setId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["link"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header", "bold", "italic", "underline", "strike",
    "list", "bullet", "color", "background", "align", "link",
  ];

  const fetchVisiMisi = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    const userStr = sessionStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;
    const externalUserId = user?.external_user_id;

    try {
      const url = `https://be-jmsrzk147707-ttmyeqw8.apn.leapcell.online/api/student/visimisibem/${externalUserId}`;
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result: VisiMisiResponse = await response.json();

      if (result.status === "success") {
        setVisi(result.data.vision || "");
        setMisi(result.data.mission || "");
        setId(result.data.id);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Gagal memuat data");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!id) return;
    setSaving(true);
    const token = sessionStorage.getItem("token");
    const userStr = sessionStorage.getItem("user"); // simpan user pas login
    const user = userStr ? JSON.parse(userStr) : null;
    const externalUserId = user.external_user_id

    try {
      const response = await fetch(
        `https://be-jmsrzk147707-ttmyeqw8.apn.leapcell.online/api/student/visimisibem/${externalUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            visi,
            misi,
          }),
        }
      );

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const result = await response.json();

      if (result.status === "success") {
        alert("Visi & Misi berhasil diperbarui!");
         router.push("/bem/visimisi");
      }
    } catch (err) {
      alert("Gagal menyimpan data");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchVisiMisi();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="animate-spin" size={28} />
        <span className="ml-2">Memuat data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <AlertCircle className="text-red-500" size={40} />
        <p className="mt-2 text-red-600">{error}</p>
        <button
          onClick={fetchVisiMisi}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600 flex items-center justify-center gap-2">
            <Sparkles className="text-[#ffd700]" /> Edit Visi & Misi
          </h1>
          <p className="text-gray-600 mt-2">
            Ubah langsung visi dan misi organisasi di bawah
          </p>
        </div>

        {/* Visi */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-blue-600 flex items-center gap-2 mb-3">
            <Eye /> Visi
          </h2>
          <div className="border-2 border-blue-300 rounded-xl overflow-hidden">
            <ReactQuill
              theme="snow"
              value={visi}
              onChange={setVisi}
              modules={quillModules}
              formats={quillFormats}
              style={{ height: "200px", backgroundColor: "white" }}
              placeholder="Masukkan visi organisasi..."
            />
          </div>
        </div>

        {/* Misi */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-yellow-600 flex items-center gap-2 mb-3">
            <Target /> Misi
          </h2>
          <div className="border-2 border-yellow-300 rounded-xl overflow-hidden">
            <ReactQuill
              theme="snow"
              value={misi}
              onChange={setMisi}
              modules={quillModules}
              formats={quillFormats}
              style={{ height: "200px", backgroundColor: "white" }}
              placeholder="Masukkan misi organisasi..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => router.push("/bem/visimisi")}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-xl text-gray-600 hover:bg-gray-50"
          >
            <ArrowLeft /> Kembali
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-[#ffd700] text-white rounded-xl shadow-lg hover:shadow-xl"
          >
            <Save />
            {saving ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>
      </div>
    </div>
  );
}