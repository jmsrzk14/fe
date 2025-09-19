"use client";
import { useState } from "react";
import DataTable from "@/components/layout/DataTable";
import { staticData } from "@/constants/data";
import { fieldConfigs } from "@/constants/field";

export default function BeritaPage() {
  const [data, setData] = useState(staticData.organisasi);

  const handleEdit = (item: any) => {
    console.log("Edit organisasi:", item);
    
  };

  const handleDelete = (index: number) => {
    setData(data.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Organisasi</h1>
      <DataTable
        data={data}
        fields={fieldConfigs.organisasi}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
