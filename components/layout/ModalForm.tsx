"use client";
import React from "react";
import { Save } from "lucide-react";

interface ModalFormProps {
  show: boolean;
  mode: "add" | "edit";
  item: any;
  fields: { key: string; label: string; type: string }[];
  onClose: () => void;
  onSave: () => void;
  onChange: (key: string, value: any) => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ show, mode, item, fields, onClose, onSave, onChange }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="font-bold mb-4">{mode === "add" ? "Tambah Data" : "Edit Data"}</h2>
        {fields.map((f) => (
          <div key={f.key} className="mb-3">
            <label className="block text-sm mb-1">{f.label}</label>
            <input
              type={f.type}
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={item[f.key] || ""}
              onChange={(e) => onChange(f.key, e.target.value)}
            />
          </div>
        ))}
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 border rounded-lg">
            Batal
          </button>
          <button onClick={onSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            <Save size={16} className="inline-block mr-2" />
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
    