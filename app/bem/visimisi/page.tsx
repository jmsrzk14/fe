"use client";

import { Target, Eye, CheckCircle, Sparkles, Plus, Edit } from "lucide-react";
import { useRouter } from "next/navigation";

export default function VisiMisiPage() {
  const router = useRouter();
  const handleAddVisi = () => {
    router.push("/bem/visimisi/create?type=visi");
  };

  const handleAddMisi = () => {
    router.push("/bem/visimisi/create?type=misi");
  };

  const handleEdit = () => {
    router.push("/bem/visimisi/edit");
  };

  const visi = "Menjadi organisasi mahasiswa yang terdepan dalam mengembangkan potensi akademik, karakter, dan kepemimpinan mahasiswa Institut Teknologi Del untuk kemajuan bangsa dan negara.";
  
  const misi = [
    "Mengembangkan program-program inovatif yang mendukung prestasi akademik dan non-akademik mahasiswa",
    "Memfasilitasi pengembangan soft skills dan kepemimpinan melalui berbagai kegiatan organisasi",
    "Menjadi jembatan komunikasi antara mahasiswa, dosen, dan pihak institusi untuk kemajuan bersama",
    "Mengadakan kegiatan yang bermanfaat untuk pengembangan minat, bakat, dan kreativitas mahasiswa",
    "Berkontribusi aktif dalam membangun citra positif Institut Teknologi Del di mata masyarakat"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-lg border border-blue-100 mb-4">
          <Sparkles className="text-[#ffd700] animate-pulse" size={20} />
          <h1 className="text-xl md:text-2xl font-bold text-blue-600">Visi & Misi BEM IT Del</h1>
          <Sparkles className="text-[#ffd700] animate-pulse" size={20} />
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto mb-6">
          Komitmen kami dalam membangun organisasi mahasiswa yang berkualitas dan berdampak positif
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button 
            onClick={handleAddVisi}
            className="bg-[#ffd700] text-blue-600 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus size={16} />
            Tambah Visi
          </button>
          <button 
            onClick={handleAddMisi}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Plus size={16} />
            Tambah Misi
          </button>
          <button 
            onClick={handleEdit}
            className="bg-white text-gray-600 border border-gray-300 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-50 transition-all duration-300 shadow hover:shadow-md"
          >
            <Edit size={16} />
            Edit
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6">
        {/* Visi Section */}
        <div className="group">
          <div className="bg-white rounded-2xl shadow-lg p-6 h-full border-t-4 border-blue-600 hover:shadow-xl transition-all duration-500 hover:transform hover:scale-102">
            {/* Icon Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md group-hover:animate-pulse">
                <Eye className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-600">VISI</h2>
                <p className="text-blue-400 font-medium text-sm">Cita-cita Organisasi</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="relative">
              <div className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
              <p className="text-gray-700 leading-relaxed pl-4">
                {visi}
              </p>
            </div>
            
            {/* Decorative Elements */}
            <div className="mt-4 flex justify-end">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Misi Section */}
        <div className="group">
          <div className="bg-white rounded-2xl shadow-lg p-6 h-full border-t-4 border-[#ffd700] hover:shadow-xl transition-all duration-500 hover:transform hover:scale-102">
            {/* Icon Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-[#ffd700] to-yellow-500 rounded-xl shadow-md group-hover:animate-pulse">
                <Target className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#ffd700]">MISI</h2>
                <p className="text-yellow-600 font-medium text-sm">Langkah Strategis</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="space-y-3">
              {misi.map((item, index) => (
                <div key={index} className="flex items-start gap-3 group/item hover:bg-yellow-50 p-2 rounded-lg transition-all duration-300">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="text-[#ffd700] group-hover/item:text-yellow-600 transition-colors" size={16} />
                  </div>
                  <p className="text-gray-700 leading-relaxed flex-1 text-sm">
                    {item}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Decorative Elements */}
            <div className="mt-4 flex justify-end">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-[#ffd700] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Message */}
      <div className="max-w-4xl mx-auto mt-8 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-[#ffd700] p-1 rounded-xl">
          <div className="bg-white rounded-xl p-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Bersama Membangun Masa Depan yang Gemilang
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              Dengan visi dan misi yang jelas, BEM IT Del berkomitmen untuk terus berinovasi 
              dan memberikan yang terbaik bagi seluruh mahasiswa Institut Teknologi Del.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
