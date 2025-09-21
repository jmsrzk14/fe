'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Plus, Calendar, Eye, Image, Sparkles } from "lucide-react";

type Gallery = {
  id: number;
  title: string;
  content: string;
  photo: string;
  created_at: string;
};

// Dummy data with placeholder images
const dummyGalleries: Gallery[] = [
  {
    id: 1,
    title: "Konser Kampus 2025",
    content: "Dokumentasi konser musik tahunan di auditorium kampus dengan berbagai penampilan dari mahasiswa berbakat.",
    photo: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400&h=300&fit=crop&crop=center",
    created_at: "2025-09-01",
  },
  {
    id: 2,
    title: "Festival Seni",
    content: "Acara kolaborasi seni tari, musik, dan teater yang menampilkan kreativitas mahasiswa dari berbagai fakultas.",
    photo: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center",
    created_at: "2025-09-05",
  },
  {
    id: 3,
    title: "Workshop Digital Art",
    content: "Pelatihan seni digital dan desain grafis untuk meningkatkan kemampuan kreativitas mahasiswa.",
    photo: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop&crop=center",
    created_at: "2025-08-28",
  },
  {
    id: 4,
    title: "Pameran Fotografi",
    content: "Pameran karya fotografi mahasiswa dengan tema kehidupan kampus dan alam Indonesia.",
    photo: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop&crop=center",
    created_at: "2025-08-20",
  },
];

export default function GaleriPage() {
  const router = useRouter();
  const [galleries] = useState<Gallery[]>(dummyGalleries);

  const goToCreate = () => {
    router.push("/ukm/galery/create");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      
        
          

      {/* Stats Section */}
    <div className="bg-yellow-50 border-b border-yellow-200 py-6 px-6">
  <div className="max-w-6xl mx-auto">
    {/* Flex utama: kiri = stats, kanan = tombol */}
    <div className="flex justify-between items-center">
      {/* Bagian statistik */}
      <div className="flex items-center gap-8">
        {/* Total Galeri */}
        <div className="flex items-center gap-3">
          <div className="bg-blue-100 rounded-full p-2">
            <Image className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-blue-600 font-medium">Total Galeri</p>
            <p className="text-2xl font-bold text-blue-800">{galleries.length}</p>
          </div>
        </div>

        {/* Kegiatan Aktif */}
        <div className="flex items-center gap-3">
          <div className="bg-yellow-100 rounded-full p-2">
            <Sparkles className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-yellow-600 font-medium">Kegiatan Aktif</p>
            <p className="text-2xl font-bold text-yellow-700">Terkini</p>
          </div>
        </div>
      </div>

      {/* Tombol di kanan */}
      <Button
        onClick={goToCreate}
        className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
      >
        <Plus className="w-5 h-5" />
        Tambah Galeri
      </Button>
    </div>
  </div>
</div>


      {/* Gallery Grid */}
      <div className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {galleries.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-blue-50 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4">
                <Camera className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Belum Ada Galeri</h3>
              <p className="text-blue-600 mb-6">Mulai berbagi momen kegiatan dengan menambahkan galeri pertama Anda</p>
              <Button onClick={goToCreate} className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Galeri Pertama
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((g) => (
                <Card key={g.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-2 border-blue-100 hover:border-blue-300">
                  <div className="relative">
                    <img
                      src={g.photo}
                      alt={g.title}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop&crop=center';
                      }}
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
                        <h2 className="text-lg font-bold text-blue-800 mb-1">{g.title}</h2>
                        <p className="text-blue-600 text-sm line-clamp-2 leading-relaxed">{g.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 pt-3 border-t border-blue-100">
                      <Calendar className="w-4 h-4 text-yellow-600" />
                      <p className="text-sm text-yellow-700 font-medium">
                        {new Date(g.created_at).toLocaleDateString("id-ID", {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Load More Section */}
      {galleries.length > 0 && (
        <div className="text-center pb-8">
          <Button variant="outline" className="border-2 border-blue-300 text-blue-600 hover:bg-blue-50 px-8 py-3">
            Muat Lebih Banyak
          </Button>
        </div>
      )}
    </div>
  );
}
