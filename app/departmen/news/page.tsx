"use client";
import { useState } from "react";
import {
  Newspaper,
  Edit3,
  Trash2,
  Plus,
  Search,
  Filter,
  Calendar,
  User,
  Eye,
  TrendingUp
} from "lucide-react";
import { useRouter } from "next/navigation"; // ✅ gunakan next/navigation

// Mock data untuk demo
const staticData = {
  berita: [
    {
      id: 1,
      title: "Perkembangan Teknologi AI di Indonesia",
      author: "John Doe",
      date: "2024-03-15",
      views: 1250,
      category: "Teknologi",
      status: "Published"
    },
    {
      id: 2,
      title: "Ekonomi Digital Meningkat Pesat",
      author: "Jane Smith",
      date: "2024-03-14",
      views: 890,
      category: "Ekonomi",
      status: "Draft"
    },
    {
      id: 3,
      title: "Inovasi Pendidikan di Era Digital",
      author: "Ahmad Rahman",
      date: "2024-03-13",
      views: 2100,
      category: "Pendidikan",
      status: "Published"
    }
  ]
};

const fieldConfigs = {
  berita: [
    { key: "title", label: "Judul", type: "text" },
    { key: "author", label: "Penulis", type: "text" },
    { key: "date", label: "Tanggal", type: "date" },
    { key: "views", label: "Views", type: "number" },
    { key: "category", label: "Kategori", type: "text" },
    { key: "status", label: "Status", type: "text" }
  ]
};

export default function BeritaPage() {
  const [data, setData] = useState(staticData.berita);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const router = useRouter(); // ✅ pakai hook router dari next/navigation

  const goToCreate = () => {
    router.push("/ukm/news/create"); // ✅ arahkan ke halaman create
  };

  const handleEdit = (item: any) => {
    console.log("Edit Berita:", item);
  };

  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedFilter === "all" ||
        item.status.toLowerCase() === selectedFilter)
  );

  const getStatusColor = (status: string) =>
    status === "Published"
      ? "bg-green-100 text-green-800"
      : "bg-yellow-100 text-yellow-800";

  const totalViews = data.reduce((sum, item) => sum + item.views, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
                <Newspaper className="h-8 w-8 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                  Manajemen Berita
                </h1>
                <p className="text-blue-100 mt-1">
                  Kelola dan pantau semua berita Anda
                </p>
              </div>
            </div>

            {/* ✅ tombol Tambah Berita */}
            <button
              onClick={goToCreate}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Plus className="h-5 w-5" />
              Tambah Berita
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Berita</p>
                <p className="text-3xl font-bold text-blue-600">{data.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Newspaper className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Views</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {totalViews.toLocaleString()}
                </p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Published</p>
                <p className="text-3xl font-bold text-green-600">
                  {data.filter((item) => item.status === "Published").length}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 pb-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center gap-3">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">Semua Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                <tr>
                  {fieldConfigs.berita.map((field) => (
                    <th
                      key={field.key}
                      className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider"
                    >
                      {field.label}
                    </th>
                  ))}
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((item, index) => (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {item.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{item.author}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{item.date}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-700">
                          {item.views.toLocaleString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-150"
                          title="Edit"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-150"
                          title="Hapus"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12">
              <Newspaper className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                Tidak ada berita ditemukan
              </h3>
              <p className="text-gray-500">
                Coba ubah kata kunci pencarian atau filter Anda
              </p>
            </div>
          )}
        </div>

        {/* Pagination Footer */}
        {filteredData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg mt-6 px-6 py-4 flex justify-between">
            <div className="text-sm text-gray-600">
              Menampilkan {filteredData.length} dari {data.length} berita
            </div>
            <div className="text-sm text-gray-500">
              Total views: {totalViews.toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
