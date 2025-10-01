"use client";
import { useState } from "react";
import DataTable from "@/components/layout/DataTable";
import { staticData } from "@/constants/data";
import { fieldConfigs } from "@/constants/field";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function BeritaPage() {
  const [data, setData] = useState(staticData.berita);

  const handleEdit = (item: any) => {
    console.log("Edit Berita:", item);
    // TODO: nanti bisa buka modal form edit
  };

  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Berita</h1>
      <DataTable
        data={data}
        fields={fieldConfigs.berita}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
