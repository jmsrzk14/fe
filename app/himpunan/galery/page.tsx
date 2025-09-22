'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Plus,
  Calendar,
  Eye,
  Image,
  Sparkles,
  Edit3,
  Trash2,
  X,
} from "lucide-react";

type Gallery = {
  id: number;
  title: string;
  content: string;
  photo: string;
  created_at: string;
};

// Dummy data dengan placeholder
const dummyGalleries: Gallery[] = [
  {
    id: 1,
    title: "Konser Kampus 2025",
    content:
      "Dokumentasi konser musik tahunan di auditorium kampus dengan berbagai penampilan dari mahasiswa berbakat.",
    photo:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop&crop=center",
    created_at: "2025-09-01",
  },
  {
    id: 2,
    title: "Festival Seni",
    content:
      "Acara kolaborasi seni tari, musik, dan teater yang menampilkan kreativitas mahasiswa dari berbagai fakultas.",
    photo:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
    created_at: "2025-09-05",
  },
];

export default function GaleriPage() {
  const [galleries, setGalleries] = useState<Gallery[]>(dummyGalleries);
  const [editing, setEditing] = useState<Gallery | null>(null);

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus galeri ini?")) {
      setGalleries((prev) => prev.filter((g) => g.id !== id));
    }
  };

  const handleSave = () => {
    if (!editing) return;
    setGalleries((prev) =>
      prev.map((g) => (g.id === editing.id ? editing : g))
    );
    setEditing(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Stats Section */}
      <div className="bg-yellow-50 border-b border-yellow-200 py-6 px-6">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-8">
            {/* Total Galeri */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 rounded-full p-2">
                <Image className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-blue-600 font-medium">Total Galeri</p>
                <p className="text-2xl font-bold text-blue-800">
                  {galleries.length}
                </p>
              </div>
            </div>

            {/* Kegiatan Aktif */}
            <div className="flex items-center gap-3">
              <div className="bg-yellow-100 rounded-full p-2">
                <Sparkles className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-yellow-600 font-medium">
                  Kegiatan Aktif
                </p>
                <p className="text-2xl font-bold text-yellow-700">Terkini</p>
              </div>
            </div>
          </div>

          <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
            <Plus className="w-5 h-5" />
            Tambah Galeri
          </Button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((g) => (
            <Card
              key={g.id}
              className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-blue-100 hover:border-blue-300"
            >
              <div className="relative">
                <img
                  src={g.photo}
                  alt={g.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3 bg-yellow-400 rounded-full p-2">
                  <Eye className="w-4 h-4 text-blue-800" />
                </div>
              </div>
              <CardContent className="p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="bg-blue-100 rounded-full p-1.5 mt-1">
                    <Camera className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-lg font-bold text-blue-800 mb-1">
                      {g.title}
                    </h2>
                    <p className="text-blue-600 text-sm line-clamp-2 leading-relaxed">
                      {g.content}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-blue-100 mb-3">
                  <Calendar className="w-4 h-4 text-yellow-600" />
                  <p className="text-sm text-yellow-700 font-medium">
                    {new Date(g.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Tombol aksi edit & delete */}
                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditing(g)}
                    className="flex items-center gap-1 border-blue-300 text-blue-600 hover:bg-blue-50"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(g.id)}
                    className="flex items-center gap-1 border-red-300 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Modal Edit */}
      {editing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6 relative">
            <button
              onClick={() => setEditing(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold text-blue-800 mb-4">
              Edit Galeri
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Judul
                </label>
                <input
                  type="text"
                  value={editing.title}
                  onChange={(e) =>
                    setEditing({ ...editing, title: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Deskripsi
                </label>
                <textarea
                  value={editing.content}
                  onChange={(e) =>
                    setEditing({ ...editing, content: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Foto
                </label>
                <input
                  type="text"
                  value={editing.photo}
                  onChange={(e) =>
                    setEditing({ ...editing, photo: e.target.value })
                  }
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setEditing(null)}
                className="border-gray-300"
              >
                Batal
              </Button>
              <Button
                onClick={handleSave}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
