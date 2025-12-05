"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface Item {
  id: number;
  name: string;
  image?: string;
  amount?: number;
}

interface PeminjamanDetail {
  id: number;
  name: string;
  activity?: string;
  location?: string;
  request_plan?: string;
  return_plan?: string;
  status: string;
  reason?: string;
  image_url_barang?: string;
  image_url_ktm?: string;
  items?: Item[];
}

const RequestDetailPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();

  const [data, setData] = useState<PeminjamanDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [returning, setReturning] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  // --- Fetch Detail Request ---
  const fetchDetail = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");
    try {
      const res = await fetch(`${API_URL}/student/request_depol/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      setData(json.data?.request || json.data || null);
      const rawItems = json.data.item_names || json.data.items || [];
      setItems(Array.isArray(rawItems) ? rawItems : []);
    } catch (err) {
      console.error(err);
      setData(null);
      await Swal.fire("Gagal", "Terjadi kesalahan saat memuat data.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  // --- Upload Foto Barang ---
  const handleUpload = async () => {
    if (!selectedFile) {
      await Swal.fire("Peringatan", "Pilih file terlebih dahulu!", "warning");
      return;
    }

    const confirmUpload = await Swal.fire({
      title: "Kirim Foto Barang?",
      text: "Pastikan foto barang yang Anda unggah sudah benar.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, kirim!",
      cancelButtonText: "Batal",
      confirmButtonColor: "#2563eb",
    });

    if (!confirmUpload.isConfirmed) return;

    setUploading(true);
    const token = sessionStorage.getItem("token");
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await fetch(
        `${API_URL}/student/request_depol/image_barang/${id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Gagal mengunggah foto barang.");

      await Swal.fire("Berhasil", "Foto barang berhasil dikirim!", "success");
      setShowUploadModal(false);
      setSelectedFile(null);
      fetchDetail();
    } catch (err) {
      console.error("Upload error:", err);
      await Swal.fire("Gagal", "Terjadi kesalahan saat mengunggah foto.", "error");
    } finally {
      setUploading(false);
    }
  };

  // --- Kembalikan Barang ---
  const handleReturn = async () => {
    const confirmReturn = await Swal.fire({
      title: "Konfirmasi Pengembalian",
      text: "Apakah Anda yakin ingin mengembalikan barang?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, kembalikan",
      cancelButtonText: "Batal",
      confirmButtonColor: "#16a34a",
    });

    if (!confirmReturn.isConfirmed) return;

    setReturning(true);
    const token = sessionStorage.getItem("token");

    try {
      const res = await fetch(
        `${API_URL}/student/request_depol/return/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Gagal mengembalikan barang.");

      await Swal.fire("Berhasil", "Barang berhasil dikembalikan!", "success");
      fetchDetail();
    } catch (err) {
      console.error("Return error:", err);
      await Swal.fire("Gagal", "Terjadi kesalahan saat mengembalikan barang.", "error");
    } finally {
      setReturning(false);
    }
  };

  // --- Status Badge ---
  const getStatusBadge = (status: string) => {
    const map: Record<string, { bg: string; text: string; icon: string }> = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "⏳" },
      approved: { bg: "bg-blue-100", text: "text-blue-800", icon: "👍" },
      rejected: { bg: "bg-red-100", text: "text-red-800", icon: "✗" },
      diambil: { bg: "bg-purple-100", text: "text-purple-800", icon: "📦" },
      selesai: { bg: "bg-emerald-100", text: "text-emerald-800", icon: "✅" },
    };

    const cfg = map[status.toLowerCase()] || map.pending;
    return (
      <span
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${cfg.bg} ${cfg.text} font-semibold`}
      >
        <span>{cfg.icon}</span> {status.toUpperCase()}
      </span>
    );
  };

  // --- Loading & Error ---
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <p className="text-gray-600 font-medium">Memuat data...</p>
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
        <p className="text-gray-600 mb-4">Data tidak ditemukan.</p>
        <button
          onClick={() => router.back()}
          className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Kembali
        </button>
      </div>
    );

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Detail Peminjaman Barang DEPOL</h1>

        {getStatusBadge(data.status)}

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <InfoCard label="Nama Peminjam" value={data.name || "-"} />
          <InfoCard label="Keperluan" value={data.activity || "-"} />
          <InfoCard label="Lokasi" value={data.location || "-"} />
          <InfoCard
            label="Tanggal Pinjam"
            value={
              data.request_plan
                ? new Date(data.request_plan).toLocaleDateString("id-ID", { dateStyle: "long" })
                : "-"
            }
          />
          <InfoCard
            label="Tanggal Kembali"
            value={
              data.return_plan
                ? new Date(data.return_plan).toLocaleDateString("id-ID", { dateStyle: "long" })
                : "-"
            }
          />
        </div>

        <p className="mt-8 text-gray-700">
          <strong>Alasan Penolakan:</strong> {data.reason || "-"}
        </p>

        {/* Foto Barang dan KTM */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {data.image_url_ktm && (
            <ImageCard
              title="Foto KTM"
              src={`${IMAGE_URL}/request/${data.image_url_ktm}`}
              alt="KTM"
            />
          )}
          {data.image_url_barang && (
            <ImageCard
              title="Foto Barang"
              src={`${IMAGE_URL}/barang/${data.image_url_barang}`}
              alt="Barang"
            />
          )}
        </div>

        {/* List Barang */}
        <div className="mt-10 bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            📦 List Barang
          </h2>
          {items.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden">
                <thead className="bg-blue-600 text-white text-left text-sm uppercase">
                  <tr>
                    <th className="py-3 px-4">No</th>
                    <th className="py-3 px-4">Nama Barang</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4">{i + 1}</td>
                      <td className="py-3 px-4 font-medium">{item}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 italic">Tidak ada barang terdaftar.</p>
          )}
        </div>

        {/* Tombol Upload / Kembalikan Barang */}
        {data.status.toLowerCase() === "approved" && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold"
            >
              Kirim Foto Barang 📷
            </button>
          </div>
        )}

        {data.status.toLowerCase() === "diambil" && (
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleReturn}
              disabled={returning}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-semibold disabled:bg-emerald-300"
            >
              {returning ? "Mengembalikan..." : "Kembalikan Barang 🔁"}
            </button>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => router.back()}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            ← Kembali
          </button>
        </div>
      </div>

      {/* Modal Upload Foto */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Upload Foto Barang</h2>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-4"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium"
              >
                Batal
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading || !selectedFile}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium disabled:bg-blue-300"
              >
                {uploading ? "Mengunggah..." : "Kirim"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* Komponen InfoCard */
const InfoCard = ({ label, value }: { label: string; value: string | number }) => (
  <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-semibold text-gray-800">{value}</p>
  </div>
);

/* Komponen ImageCard */
const ImageCard = ({ title, src, alt }: { title: string; src: string; alt: string }) => (
  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200">
    <p className="text-sm font-semibold text-gray-700 mb-3">{title}</p>
    <img src={src} alt={alt} className="w-full h-64 object-contain rounded-lg border" />
  </div>
);

export default RequestDetailPage;
