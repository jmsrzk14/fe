"use client";
import { useState } from "react";
import DataTable from "@/components/layout/DataTable";
import { staticData } from "@/constants/data";
import { fieldConfigs } from "@/constants/field";
import { useRouter } from "next/navigation";

export default function PengumumanPage() {
  const [data, setData] = useState(staticData.pengumuman);
  const router = useRouter();

  const handleEdit = (item: any) => {
    console.log("Edit Pengumuman:", item);
    // TODO: nanti bisa buka modal form edit
  };

  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index)); // hapus berdasarkan index
  };

  const handleAdd = () => {
    router.push("/admin/announcement/create"); // ✅ redirect ke halaman create
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Pengumuman</h1>
        <button
          onClick={handleAdd}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
          Tambah Pengumuman
        </button>
      </div>

      {/* DataTable Section */}
      <DataTable
        data={data}
        fields={fieldConfigs.pengumuman}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
