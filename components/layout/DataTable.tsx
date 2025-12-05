"use client";
import { ReactNode } from "react";
import { Edit, Eye, Trash2 } from "lucide-react";

interface DataTableProps {
  data: any[];
  fields: { key: string; label: string; type: string }[];
  onEdit?: (item: any, index: number) => void;
  onDelete?: (item: any, index: number) => void;
  onView?: (item: any, index: number) => void;
  currentPage?: number;
  perPage?: number;
  actionIcon?: ReactNode;
}

function stripHtml(html: string) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function capitalizeFirstLetter(text: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function processText(html: string) {
  const text = stripHtml(html);
  return capitalizeFirstLetter(text.trim());
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  fields,
  onEdit,
  onDelete,
  onView,
  currentPage = 1,
  perPage = 10,
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-xl shadow-sm border border-blue-200">
        <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-4 animate-pulse">
          <svg
            className="w-12 h-12 text-blue-400 animate-bounce"
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
        <h3 className="text-lg font-semibold text-blue-900 mb-2">Tidak ada data</h3>
        <p className="text-blue-500">Belum ada data yang tersedia untuk ditampilkan.</p>
      </div>
    );
  }

  return (
    <>
      {/* ✨ Animasi tetap dipertahankan */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>

      <div className="overflow-hidden rounded-xl border border-blue-200 bg-white shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-blue-500 text-white">
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
            <tbody className="divide-y divide-blue-100">
              {data.map((item, index) => {
                const rowNumber = (currentPage - 1) * perPage + index + 1;

                return (
                  <tr
                    key={item.id || item.nim || index}
                    className="hover:bg-blue-50 transition-all duration-200 group"
                  >
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-medium group-hover:bg-yellow-100 group-hover:text-yellow-700 transition-colors">
                        {rowNumber}
                      </span>
                    </td>
                    {fields.map((field) => (
                      <td key={field.key} className="px-4 py-4 text-sm text-blue-900">
                        <div className="max-w-xs">
                          <span
                            className="truncate block"
                            title={processText(item[field.key])}
                          >
                            {processText(item[field.key])}
                          </span>
                        </div>
                      </td>
                    ))}

                    {/* Kolom Aksi */}
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        {onView && (
                          <button
                            onClick={() => onView(item, index)}
                            className="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-white hover:bg-blue-500 rounded-lg transition-all duration-200 hover:shadow-md transform hover:scale-110"
                            title="Lihat data"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                        
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item, index)}
                            className="inline-flex items-center justify-center w-8 h-8 text-yellow-600 hover:text-white hover:bg-yellow-500 rounded-lg transition-all duration-200 hover:shadow-md transform hover:scale-110"
                            title="Edit data"
                          >
                            <Edit size={16} />
                          </button>
                        )}

                        {onDelete && (
                          <button
                            onClick={() => onDelete(item, index)}
                            className="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200 hover:shadow-md transform hover:scale-110"
                            title="Hapus data"
                          >
                            <Trash2 size={16} />
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
    </>
  );
};

export default DataTable;
