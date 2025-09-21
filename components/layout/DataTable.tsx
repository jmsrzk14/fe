"use client";
import React from "react";
import { Edit } from "lucide-react";

interface DataTableProps {
  data: any[];
  fields: { key: string; label: string; type: string }[];
  onEdit: (item: any) => void;
  onDelete?: (index: number) => void;
  currentPage?: number;
  perPage?: number;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  fields,
  onEdit,
  onDelete,
  currentPage = 1,
  perPage = 10,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Tidak ada data</h3>
        <p className="text-gray-500">Belum ada data yang tersedia untuk ditampilkan.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <th className="px-4 py-4 text-center text-sm font-semibold">No</th>
              {fields.map((field) => (
                <th
                  key={field.key}
                  className="px-4 py-4 text-left text-sm font-semibold"
                >
                  {field.label}
                </th>
              ))}
              <th className="px-4 py-4 text-center text-sm font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, index) => {
              // hitung nomor baris berdasarkan pagination
              const rowNumber = (currentPage - 1) * perPage + index + 1;

              return (
                <tr
                  key={item.id || item.nim || index}
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200"
                >
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                      {rowNumber}
                    </span>
                  </td>
                  {fields.map((field) => (
                    <td key={field.key} className="px-4 py-4 text-sm text-gray-900">
                      <div className="max-w-xs">
                        {field.key === "status" ? (
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              item[field.key]?.toLowerCase() === "aktif"
                                ? "bg-green-100 text-green-800"
                                : item[field.key]?.toLowerCase() === "tidak aktif"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {item[field.key]}
                          </span>
                        ) : field.key === "nim" ? (
                          <span className="font-mono font-medium text-blue-600">
                            {item[field.key]}
                          </span>
                        ) : field.key === "year_enrolled" ? (
                          <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium">
                            {item[field.key]}
                          </span>
                        ) : (
                          <span className="truncate block" title={item[field.key]}>
                            {item[field.key]}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() => onEdit(item)}
                        className="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-white hover:bg-blue-600 rounded-lg transition-all duration-200 hover:shadow-md"
                        title="Edit data"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
