"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ gunakan useRouter
import { Plus } from "lucide-react";
import { staticData } from "@/constants/data";
import { fieldConfigs } from "@/constants/field";
import DataTable from "@/components/layout/DataTable";

export default function VisiMisiPage() {
  const router = useRouter(); // ✅ buat router
  const [data, setData] = useState(staticData.visiMisi);

  const handleAdd = () => {
    router.push("/admin/visimisi/create"); 
  };

  const handleEdit = (item: any) => {
    router.push(`/admin/visimisi/edit/${item.id}`);
  };

  const handleDelete = (id: number) => {
    setData(data.filter((d) => d.id !== id));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between mb-6">
        <h1 className="font-bold text-2xl">Kelola Visi & Misi</h1>
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg shadow-blue-200"
        >
          <Plus size={16} />
          Tambah
        </button>
      </div>

      {/* Tabel */}
      <DataTable
        data={data}
        fields={fieldConfigs.visiMisi}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
