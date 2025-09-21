"use client";
import React from "react";
import { Edit } from "lucide-react";

interface DataTableProps {
  data: any[];
  fields: { key: string; label: string; type: string }[];
  onEdit: (item: any, index: number) => void;
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
    <div className="overflow-hidden rounded-xl border border-blue-200 bg-white shadow-lg hover:shadow-xl transition-all duration-500">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-50 border-b-2 border-blue-200">
              <th className="px-6 py-4 text-center text-sm font-semibold text-blue-700 uppercase tracking-wider">
                No
              </th>
              {fields.map((field) => (
                <th
                  key={field.key}
                  className="px-6 py-4 text-left text-sm font-semibold text-blue-700 uppercase tracking-wider"
                >
                  {field.label}
                </th>
              ))}
              <th className="px-6 py-4 text-center text-sm font-semibold text-blue-700 uppercase tracking-wider">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((item, index) => {
              // hitung nomor baris berdasarkan pagination
              const rowNumber = (currentPage - 1) * perPage + index + 1;

              return (
                <tr
                  key={item.id || item.nim || index}
                  className="hover:bg-blue-50 transition-all duration-300 ease-in-out border-b border-blue-100 hover:border-blue-200 hover:shadow-md hover:scale-[1.01] group"
                >
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className="inline-flex items-center justify-center w-10 h-10 bg-yellow-400 text-blue-900 rounded-full text-sm font-bold shadow-lg group-hover:animate-bounce group-hover:scale-110 transition-all duration-300">
                      {rowNumber}
                    </span>
                  </td>
                  {fields.map((field) => (
                    <td key={field.key} className="px-6 py-4 text-sm text-gray-900">
                      <div className="max-w-xs">
                        {field.key === "status" ? (
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                              item[field.key]?.toLowerCase() === "aktif"
                                ? "bg-green-100 text-green-800 border border-green-200"
                                : item[field.key]?.toLowerCase() === "tidak aktif"
                                ? "bg-red-100 text-red-800 border border-red-200"
                                : "bg-gray-100 text-gray-800 border border-gray-200"
                            }`}
                          >
                            {item[field.key]}
                          </span>
                        ) : field.key === "nim" ? (
                          <span className="font-mono font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            {item[field.key]}
                          </span>
                        ) : field.key === "year_enrolled" ? (
                          <span className="inline-flex items-center px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-200">
                            {item[field.key]}
                          </span>
                        ) : field.key === "judul" ? (
                          <div className="space-y-1">
                            <div className="font-semibold text-gray-900 leading-tight" title={item[field.key]}>
                              {item[field.key] && item[field.key].length > 40 
                                ? `${item[field.key].substring(0, 40)}...`
                                : item[field.key]
                              }
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                                Pengumuman
                              </span>
                            </div>
                          </div>
                        ) : field.key === "content" ? (
                          <div className="text-gray-600 leading-relaxed" title={item[field.key]}>
                            {item[field.key] && item[field.key].length > 80 
                              ? `${item[field.key].substring(0, 80)}...`
                              : item[field.key]
                            }
                          </div>
                        ) : field.key === "filepath" ? (
                          <div className="flex items-center space-x-2">
                            <div className="bg-gray-100 p-1 rounded">
                              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                            </div>
                            <span className="font-mono text-sm bg-gray-50 px-2 py-1 rounded text-gray-700 border">
                              {item[field.key] && item[field.key].length > 25 
                                ? `${item[field.key].substring(0, 25)}...`
                                : item[field.key]
                              }
                            </span>
                          </div>
                        ) : field.key === "tanggal_mulai" ? (
                          <div className="flex items-center space-x-2">
                            <div className="bg-green-100 p-1 rounded">
                              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 rounded-lg text-xs font-medium border border-green-200">
                              {new Date(item[field.key]).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        ) : field.key === "tanggal_tutup" ? (
                          <div className="flex items-center space-x-2">
                            <div className="bg-red-100 p-1 rounded">
                              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <span className="inline-flex items-center px-3 py-1 bg-red-50 text-red-700 rounded-lg text-xs font-medium border border-red-200">
                              {new Date(item[field.key]).toLocaleDateString('id-ID', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        ) : (
                          <span className="block truncate" title={item[field.key]}>
                            {item[field.key]}
                          </span>
                        )}
                      </div>
                    </td>
                  ))}
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="flex justify-center items-center space-x-2">
                      <button
                        onClick={() => onEdit(item, index)}
                        className="group inline-flex items-center justify-center w-10 h-10 text-white bg-blue-500 hover:bg-blue-600 rounded-xl transition-all duration-300 hover:shadow-lg border-2 border-blue-300 hover:border-blue-500 hover:scale-110 hover:rotate-12"
                        title="Edit pengumuman"
                      >
                        <Edit size={16} className="group-hover:scale-110 group-hover:animate-pulse transition-all duration-300" />
                      </button>
                      {onDelete && (
                        <button
                          onClick={() => onDelete(index)}
                          className="group inline-flex items-center justify-center w-10 h-10 text-white bg-red-500 hover:bg-red-600 rounded-xl transition-all duration-300 hover:shadow-lg border-2 border-red-300 hover:border-red-500 hover:scale-110 hover:-rotate-12"
                          title="Hapus pengumuman"
                        >
                          <svg className="w-4 h-4 group-hover:scale-110 group-hover:animate-bounce transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      )}
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
