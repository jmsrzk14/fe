"use client";
import {ReactNode} from "react";
import { Edit } from "lucide-react";

interface DataTableProps {
  data: any[];
  fields: { key: string; label: string; type: string }[];
  onEdit: (item: any, index: number) => void;
  onDelete?: (index: number) => void;
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
      <style jsx>{`
        @keyframes wiggle {
          0%, 7% { transform: rotateZ(0); }
          15% { transform: rotateZ(-15deg); }
          20% { transform: rotateZ(10deg); }
          25% { transform: rotateZ(-10deg); }
          30% { transform: rotateZ(6deg); }
          35% { transform: rotateZ(-4deg); }
          40%, 100% { transform: rotateZ(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes glow-pulse {
          0%, 100% { 
            box-shadow: 0 0 5px rgba(234, 179, 8, 0.3),
                        0 0 10px rgba(234, 179, 8, 0.2),
                        0 0 15px rgba(234, 179, 8, 0.1);
          }
          50% { 
            box-shadow: 0 0 10px rgba(234, 179, 8, 0.6),
                        0 0 20px rgba(234, 179, 8, 0.4),
                        0 0 30px rgba(234, 179, 8, 0.2);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-8px) scale(1.05); }
        }
        @keyframes rainbow {
          0% { border-color: rgb(59 130 246); }
          25% { border-color: rgb(234 179 8); }
          50% { border-color: rgb(34 197 94); }
          75% { border-color: rgb(234 179 8); }
          100% { border-color: rgb(59 130 246); }
        }
        @keyframes slide-in-left {
          0% { 
            transform: translateX(-20px) scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        @keyframes slide-in-right {
          0% { 
            transform: translateX(20px) scale(0.8);
            opacity: 0;
          }
          100% { 
            transform: translateX(0) scale(1);
            opacity: 1;
          }
        }
        .animate-wiggle { animation: wiggle 2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
        .animate-shimmer { 
          background: linear-gradient(
            90deg, 
            transparent, 
            rgba(255, 255, 255, 0.4), 
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .animate-glow-pulse { animation: glow-pulse 2s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-rainbow { animation: rainbow 3s ease-in-out infinite; }
        .animate-slide-in-left { animation: slide-in-left 0.5s ease-out; }
        .animate-slide-in-right { animation: slide-in-right 0.5s ease-out; }
        
        .magical-hover {
          position: relative;
          overflow: hidden;
        }
        .magical-hover::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(234, 179, 8, 0.2),
            transparent
          );
          transition: left 0.5s ease;
          z-index: 1;
        }
        .magical-hover:hover::before {
          left: 100%;
        }
        
        .sparkle-effect {
          position: relative;
        }
        .sparkle-effect::after {
          content: '✨';
          position: absolute;
          top: 50%;
          right: 8px;
          transform: translateY(-50%);
          opacity: 0;
          transition: all 0.3s ease;
          font-size: 12px;
        }
        .sparkle-effect:hover::after {
          opacity: 1;
          right: 4px;
          animation: wiggle 1s ease-in-out;
        }
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
                // hitung nomor baris berdasarkan pagination
                const rowNumber = (currentPage - 1) * perPage + index + 1;

                return (
                  <tr
                    key={item.id || item.nim || index}
                    className="hover:bg-blue-50 hover:border-yellow-300 transition-all duration-200 group"
                  >
                    <td className="px-4 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full text-sm font-medium group-hover:bg-yellow-100 group-hover:text-yellow-700 transition-colors">
                        {rowNumber}
                      </span>
                    </td>
                    {fields.map((field) => (
                      <td key={field.key} className="px-4 py-4 text-sm text-blue-900">
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
                            <span className="truncate block" title={processText(item[field.key])}>
                              {processText(item[field.key])}
                            </span>
                          )}
                        </div>
                      </td>
                    ))}
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center items-center space-x-2">
                        <button
                          onClick={() => onEdit(item, index)}
                          className="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-white hover:bg-yellow-500 rounded-lg transition-all duration-200 hover:shadow-md transform hover:scale-110 group-hover:animate-bounce-slow"
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
    </>
  );
};

export default DataTable;
