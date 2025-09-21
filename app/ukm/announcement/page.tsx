"use client";
import { useState } from "react";
import { 
  Megaphone, 
  Edit3, 
  Trash2, 
  Plus, 
  Search, 
  Filter, 
  Calendar, 
  User, 
  Eye, 
  TrendingUp,
  Bell,
  Clock,
  AlertCircle,
  Router
} from "lucide-react";
import { useRouter } from "next/navigation"; 

// Mock data for demonstration
const staticData = {
  pengumuman: [
    {
      id: 1,
      title: "Pendaftaran Kegiatan Workshop AI 2024",
      author: "Admin UKM",
      date: "2024-03-15",
      views: 850,
      category: "Workshop",
      status: "Active",
      priority: "High",
      deadline: "2024-03-25"
    },
    {
      id: 2,
      title: "Rapat Koordinasi Bulanan Maret",
      author: "Ketua UKM",
      date: "2024-03-14",
      views: 420,
      category: "Meeting",
      status: "Active",
      priority: "Medium",
      deadline: "2024-03-20"
    },
    {
      id: 3,
      title: "Kompetisi Programming Internal",
      author: "Divisi IT",
      date: "2024-03-13",
      views: 1200,
      category: "Competition",
      status: "Draft",
      priority: "High",
      deadline: "2024-03-30"
    },
    {
      id: 4,
      title: "Pengumpulan Laporan Kegiatan Q1",
      author: "Sekretaris",
      date: "2024-03-12",
      views: 650,
      category: "Report",
      status: "Expired",
      priority: "Low",
      deadline: "2024-03-18"
    }
  ]
};

const fieldConfigs = {
  pengumuman: [
    { key: "title", label: "Judul Pengumuman", type: "text" },
    { key: "author", label: "Pembuat", type: "text" },
    { key: "date", label: "Tanggal Dibuat", type: "date" },
    { key: "deadline", label: "Deadline", type: "date" },
    { key: "views", label: "Views", type: "number" },
    { key: "category", label: "Kategori", type: "text" },
    { key: "priority", label: "Prioritas", type: "text" },
    { key: "status", label: "Status", type: "text" }
  ]
};

export default function PengumumanPage() {
  const [data, setData] = useState(staticData.pengumuman);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  
  const router = useRouter(); // ✅ inisialisasi router

  const handleEdit = (item: any) => {
    console.log("Edit Pengumuman:", item);
    // TODO: nanti bisa buka modal form edit
  };

  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

   const handleAdd = () => {
    router.push("/ukm/announcement/create"); 
  };

  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedFilter === "all" || item.status.toLowerCase() === selectedFilter) &&
    (selectedPriority === "all" || item.priority.toLowerCase() === selectedPriority)
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-800";
      case "draft": return "bg-yellow-100 text-yellow-800";
      case "expired": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "high": return <AlertCircle className="h-4 w-4" />;
      case "medium": return <Clock className="h-4 w-4" />;
      case "low": return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const totalViews = data.reduce((sum, item) => sum + item.views, 0);
  const activeCount = data.filter(item => item.status === "Active").length;
  const expiredCount = data.filter(item => item.status === "Expired").length;

  const isDeadlineNear = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      {/* Header Section */}
    {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-xl backdrop-blur-sm">
                <Megaphone className="h-8 w-8 text-yellow-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                  Manajemen Pengumuman
                </h1>
                <p className="text-blue-100 mt-1">Kelola dan pantau semua pengumuman UKM</p>
              </div>
            </div>
            
            <button
              onClick={handleAdd}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:from-yellow-300 hover:to-yellow-400 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              <Plus className="h-5 w-5" />
              Tambah Pengumuman
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="container mx-auto px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Pengumuman</p>
                <p className="text-3xl font-bold text-blue-600">{data.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-xl">
                <Megaphone className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Aktif</p>
                <p className="text-3xl font-bold text-green-600">{activeCount}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-xl">
                <Bell className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Kadaluarsa</p>
                <p className="text-3xl font-bold text-red-600">{expiredCount}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-xl">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Views</p>
                <p className="text-3xl font-bold text-yellow-600">{totalViews.toLocaleString()}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-xl">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
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
                placeholder="Cari pengumuman..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center gap-3 flex-wrap">
              <Filter className="text-gray-400 h-5 w-5" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">Semua Status</option>
                <option value="active">Aktif</option>
                <option value="draft">Draft</option>
                <option value="expired">Kadaluarsa</option>
              </select>
              
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">Semua Prioritas</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Enhanced Data Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-blue-700">
                <tr>
                  {fieldConfigs.pengumuman.map((field) => (
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
                    className={`hover:bg-blue-50 transition-colors duration-150 ${
                      isDeadlineNear(item.deadline) && item.status === 'Active' 
                        ? 'bg-red-50 border-l-4 border-red-400' 
                        : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 flex items-center gap-2">
                            {item.title}
                            {isDeadlineNear(item.deadline) && item.status === 'Active' && (
                              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                                Segera Berakhir!
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            Kategori: {item.category}
                          </div>
                        </div>
                      </div>
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
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className={`text-gray-700 ${
                          isDeadlineNear(item.deadline) && item.status === 'Active' 
                            ? 'font-bold text-red-600' 
                            : ''
                        }`}>
                          {item.deadline}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Eye className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-700">{item.views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {getPriorityIcon(item.priority)}
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(item.priority)}`}>
                          {item.priority}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
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
              <Megaphone className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Tidak ada pengumuman ditemukan</h3>
              <p className="text-gray-500">Coba ubah kata kunci pencarian atau filter Anda</p>
            </div>
          )}
        </div>

        {/* Urgent Announcements Alert */}
        {data.some(item => isDeadlineNear(item.deadline) && item.status === 'Active') && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl shadow-lg p-6 mt-8">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-yellow-300" />
              <div>
                <h3 className="text-xl font-bold">⚠️ Perhatian!</h3>
                <p className="text-red-100 mt-1">
                  Ada {data.filter(item => isDeadlineNear(item.deadline) && item.status === 'Active').length} pengumuman 
                  yang akan berakhir dalam 3 hari ke depan. Segera tindak lanjuti!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Footer Summary */}
        {filteredData.length > 0 && (
          <div className="bg-white rounded-2xl shadow-lg mt-6 px-6 py-4">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="text-sm text-gray-600">
                Menampilkan {filteredData.length} dari {data.length} pengumuman
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500">
                <span>Total views: {totalViews.toLocaleString()}</span>
                <span>Aktif: {activeCount}</span>
                <span>Kadaluarsa: {expiredCount}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}