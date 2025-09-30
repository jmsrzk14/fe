"use client";

import { Target, Eye, CheckCircle, Sparkles, Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VisiMisiPage() {
  const router = useRouter();
  const [visi, setVisi] = useState<string>("");
  const [misi, setMisi] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleEdit = () => {
    router.push("/bem/visimisi/edit");
  };

  // 🔹 Ambil data dari API
  useEffect(() => {
    const fetchVisiMisi = async () => {
      try {
        const userStr = sessionStorage.getItem("user"); // user disimpan pas login
        const token = sessionStorage.getItem("token");  // simpan token juga pas login
        const user = userStr ? JSON.parse(userStr) : null;
        const externalUserId = user?.external_user_id;

        if (!externalUserId || !token) {
          console.error("User ID atau token tidak ditemukan");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `http://localhost:8080/api/student/visimisibem/${externalUserId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();
        console.log("API Response:", result);

        if (result.status === "success") {
          setVisi(result.data.vision || "");
          setMisi(result.data.mission ? result.data.mission.split(";") : []);
        }
      } catch (err) {
        console.error("Error fetching visi misi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVisiMisi();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-yellow-50 py-8 px-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-lg border border-blue-100 mb-4">
          <Sparkles className="text-[#ffd700] animate-pulse" size={20} />
          <h1 className="text-xl md:text-2xl font-bold text-blue-600">
            Visi & Misi BEM IT Del
          </h1>
          <Sparkles className="text-[#ffd700] animate-pulse" size={20} />
        </div>
        <p className="text-gray-600 max-w-3xl mx-auto mb-6">
          Komitmen kami dalam membangun organisasi mahasiswa yang berkualitas dan berdampak positif
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={handleEdit}
            className="bg-green-500 text-white border border-gray-300 px-4 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-green-600 transition-all duration-300 shadow hover:shadow-md"
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
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-md group-hover:animate-pulse">
                <Eye className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-600">VISI</h2>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-3 top-0 w-1 h-full bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
              <div
                className="text-gray-700 leading-relaxed pl-4"
                dangerouslySetInnerHTML={{ __html: visi }}
              />

            </div>
          </div>
        </div>

        {/* Misi Section */}
        <div className="group">
          <div className="bg-white rounded-2xl shadow-lg p-6 h-full border-t-4 border-[#ffd700] hover:shadow-xl transition-all duration-500 hover:transform hover:scale-102">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-[#ffd700] to-yellow-500 rounded-xl shadow-md group-hover:animate-pulse">
                <Target className="text-white" size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#ffd700]">MISI</h2>
              </div>
            </div>

            <div className="space-y-3">
              {misi.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 group/item hover:bg-yellow-50 p-2 rounded-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle
                      className="text-[#ffd700] group-hover/item:text-yellow-600 transition-colors"
                      size={16}
                    />
                  </div>
                  <div
                    className="text-gray-700 leading-relaxed flex-1 text-sm"
                    dangerouslySetInnerHTML={{ __html: item }}
                  />
                </div>
              ))}
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
