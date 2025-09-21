"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Edit, 
  Trash2, 
  Plus, 
  Users, 
  Shield, 
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  Star
} from "lucide-react";

// Mock data for demonstration
const mockProfileData = [
  {
    id: 1,
    nama: "John Doe",
    email: "john.doe@example.com",
    jabatan: "Ketua UKM",
    phone: "081234567890",
    alamat: "Jl. Kampus No. 123",
    tanggal_bergabung: "2023-01-15"
  },
  {
    id: 2,
    nama: "Jane Smith", 
    email: "jane.smith@example.com",
    jabatan: "Sekretaris",
    phone: "081987654321",
    alamat: "Jl. Universitas No. 456",
    tanggal_bergabung: "2023-02-20"
  },
  {
    id: 3,
    nama: "Mike Johnson",
    email: "mike.johnson@example.com", 
    jabatan: "Bendahara",
    phone: "081122334455",
    alamat: "Jl. Mahasiswa No. 789",
    tanggal_bergabung: "2023-03-10"
  }
];

export default function BeritaPage() {
  const [data, setData] = useState(mockProfileData);

  const handleEdit = (item: any) => {
    console.log("Edit profile:", item);
    // TODO: nanti bisa buka modal form edit
  };

  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const getJabatanIcon = (jabatan: string) => {
    if (jabatan.toLowerCase().includes('ketua')) return <Shield className="w-4 h-4 text-yellow-600" />;
    if (jabatan.toLowerCase().includes('sekretaris')) return <User className="w-4 h-4 text-blue-600" />;
    if (jabatan.toLowerCase().includes('bendahara')) return <Building className="w-4 h-4 text-green-600" />;
    return <Star className="w-4 h-4 text-gray-600" />;
  };

  return (
    <div className="min-h-screen bg-white">


      {/* Stats Section */}
      <div className="bg-yellow-50 border-b border-yellow-200 py-6 px-6">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
    {/* Bagian Statistik */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Anggota */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-100 rounded-full p-3">
          <Users className="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <p className="text-sm text-blue-600 font-medium">Total Anggota</p>
          <p className="text-2xl font-bold text-blue-800">{data.length}</p>
        </div>
      </div>

      {/* Pengurus Aktif */}
      <div className="flex items-center gap-4">
        <div className="bg-yellow-100 rounded-full p-3">
          <Shield className="w-6 h-6 text-yellow-600" />
        </div>
        <div>
          <p className="text-sm text-yellow-600 font-medium">Pengurus Aktif</p>
          <p className="text-2xl font-bold text-yellow-700">
            {
              data.filter(
                (item) =>
                  item.jabatan.toLowerCase().includes("ketua") ||
                  item.jabatan.toLowerCase().includes("sekretaris") ||
                  item.jabatan.toLowerCase().includes("bendahara")
              ).length
            }
          </p>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-4">
        <div className="bg-green-100 rounded-full p-3">
          <Star className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <p className="text-sm text-green-600 font-medium">Status</p>
          <p className="text-2xl font-bold text-green-700">Aktif</p>
        </div>
      </div>
    </div>

    {/* Tombol Tambah Anggota */}
    <Button className="bg-yellow-400 hover:bg-yellow-500 text-blue-800 font-semibold px-6 py-3 rounded-lg flex items-center gap-2 transition-colors">
      <Plus className="w-4 h-4" />
      Tambah Anggota
    </Button>
  </div>
</div>


      {/* Data Table Section */}
      <div className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          {data.length === 0 ? (
            <div className="text-center py-16">
              <div className="bg-blue-50 rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4">
                <Users className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-blue-800 mb-2">Belum Ada Data Profile</h3>
              <p className="text-blue-600 mb-6">Mulai dengan menambahkan anggota pertama</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Anggota Pertama
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {data.map((item, index) => (
                <Card key={item.id} className="border-2 border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                  <CardHeader className="bg-blue-50 border-b border-blue-100">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="bg-yellow-400 rounded-full p-2">
                          <User className="w-5 h-5 text-blue-800" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-blue-800">{item.nama}</h3>
                          <div className="flex items-center gap-2">
                            {getJabatanIcon(item.jabatan)}
                            <span className="text-sm font-medium text-blue-600">{item.jabatan}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                          className="border-blue-300 text-blue-600 hover:bg-blue-50 flex items-center gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(index)}
                          className="border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-100 rounded-full p-2">
                          <Mail className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-xs text-blue-600 font-medium">Email</p>
                          <p className="text-sm text-blue-800">{item.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-green-100 rounded-full p-2">
                          <Phone className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-xs text-green-600 font-medium">Telepon</p>
                          <p className="text-sm text-green-800">{item.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-100 rounded-full p-2">
                          <MapPin className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-xs text-purple-600 font-medium">Alamat</p>
                          <p className="text-sm text-purple-800">{item.alamat}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 md:col-span-2 lg:col-span-1">
                        <div className="bg-yellow-100 rounded-full p-2">
                          <Calendar className="w-4 h-4 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-xs text-yellow-600 font-medium">Bergabung</p>
                          <p className="text-sm text-yellow-800">
                            {new Date(item.tanggal_bergabung).toLocaleDateString("id-ID", {
                              day: 'numeric',
                              month: 'long',  
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}