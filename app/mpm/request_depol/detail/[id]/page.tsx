"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Item {
  id: number;
  name: string;
  image?: string;
  amount?: number;
}

interface PeminjamanDetail {
  id: number;
  name: string;
  item: string | Item[];
  activity: string;
  location: string;
  request_plan: string;
  return_plan: string;
  requester_id: number;
  approver_id: number;
  image_url_ktm: string;
  reason: string;
  image_url_barang: string;
  status: string;
}

const RequestDetailPage: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [data, setData] = useState<PeminjamanDetail | null>(null);
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  const fetchDetail = async () => {
    setLoading(true);
    const token = sessionStorage.getItem("token");

    try {
      const res = await fetch(`${API_URL}/student/request_sarpras/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const json = await res.json();
      setData(json.data.request);

      const rawItems = json.data.item_names || json.data.items || [];
      setItems(Array.isArray(rawItems) ? rawItems : []);
    } catch (err) {
      console.error("Gagal fetch detail:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Memuat detail data...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <div className="text-6xl mb-4">📋</div>
          <p className="text-gray-600 text-lg">Data tidak ditemukan.</p>
          <button
            onClick={() => router.back()}
            className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            Kembali
          </button>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<
      string,
      { bg: string; text: string; icon: string }
    > = {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: "⏳" },
      dikembalikan: { bg: "bg-emerald-100", text: "text-emerald-800", icon: "🔁" },
      approved: { bg: "bg-blue-100", text: "text-blue-800", icon: "👍" },
      rejected: { bg: "bg-red-100", text: "text-red-800", icon: "✗" },
      diambil: { bg: "bg-purple-100", text: "text-purple-800", icon: "📦" },
      selesai: { bg: "bg-emerald-100", text: "text-emerald-800", icon: "✅" },
    };

    const config = statusConfig[status.toLowerCase()] || statusConfig.pending;

    return (
      <span
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} ${config.text} font-semibold text-sm`}
      >
        <span className="text-lg">{config.icon}</span>
        {status.toUpperCase()}
      </span>
    );
  };

  const isPending = data.status.toLowerCase() === "pending";
  const isDikembalikan = data.status.toLowerCase() === "dikembalikan";

  return (
    <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white mb-2">
              Detail Peminjaman
            </h1>
          </div>

          <div className="p-8">
            {/* Status */}
            <div className="flex flex-col justify-between mb-6 pb-6 border-b-2 border-gray-100">
              <div className="mb-12">
                <p className="text-sm text-gray-500 mb-1">Status Peminjaman</p>
                {getStatusBadge(data.status)}
              </div>
            
              <p className="mt-12">
                Alasan Penolakan: {data.reason ? data.reason : "-"}
              </p>
            </div>

            {/* Info Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <InfoCard icon="👤" label="Nama Peminjam" value={data.name} />
              <InfoCard icon="🎯" label="Keperluan" value={data.activity || "-"} />
              <InfoCard icon="📍" label="Lokasi" value={data.location || "-"} />
              <InfoCard
                icon="📅"
                label="Tanggal Pinjam"
                value={new Date(data.request_plan).toLocaleDateString("id-ID", {
                  dateStyle: "long",
                })}
              />
              <InfoCard
                icon="📅"
                label="Tanggal Kembali"
                value={new Date(data.return_plan).toLocaleDateString("id-ID", {
                  dateStyle: "long",
                })}
              />
            </div>

            {/* Images Section */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
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

            {/* Tabel Barang */}
            <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200 shadow-sm">
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

            {/* Button Back */}
            <div className="flex justify-end mt-8">
              <button
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <span>←</span>
                Kembali
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Komponen Tambahan */
const InfoCard = ({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string | number;
}) => (
  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
    <div className="flex items-start gap-3">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
        <p className="text-base font-semibold text-gray-900 break-words">{value}</p>
      </div>
    </div>
  </div>
);

const ImageCard = ({ title, src, alt }: { title: string; src: string; alt: string }) => (
  <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-200">
    <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
      <span>📸</span>
      {title}
    </p>
    <div className="relative group overflow-hidden rounded-lg">
      <img
        src={src}
        alt={alt}
        className="w-full h-64 object-contain rounded-lg border-2 border-gray-200 group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 rounded-lg"></div>
    </div>
  </div>
);

export default RequestDetailPage;
