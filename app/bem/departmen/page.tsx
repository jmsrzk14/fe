"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // ✅ untuk navigasi
import { Plus } from "lucide-react"; // ✅ icon tambah
import { staticData } from "@/constants/data";
import { fieldConfigs } from "@/constants/field";
import dynamic from "next/dynamic";

const DataTable = dynamic(() => import("@/components/layout/DataTable"), {
  ssr: false,
});
export default function DepartemenPage() {
  const [data, setData] = useState(staticData.departemen);
  const router = useRouter();

  const handleEdit = (item: any) => {
    console.log("Edit Departemen:", item);
    // TODO: nanti bisa buka modal form edit
  };

  const handleDelete = (index: number) => {

  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Departemen</h1>
        <button
          onClick={() => router.push("/admin/departmen/create")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={18} />
          Tambah Departemen
        </button>
      </div>

      <DataTable
        data={data}
        fields={fieldConfigs.departemen}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
