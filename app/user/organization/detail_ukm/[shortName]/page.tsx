'use client';

import { useState, useEffect } from 'react';
import { useParams } from "next/navigation";
import {
  ArrowLeft, Calendar, Building, ExternalLink, Mail, Instagram,
  Target, Zap, ClipboardList, Users, CheckCircle, Linkedin, Phone,
  MapPin, GraduationCap, Home
} from 'lucide-react';

// Interfaces
interface Member {
  id: number;
  dim_id: number;
  user_id: number;
  organization_id: number;
  organization: any | null;
  user_name: string;
  nim: string;
  full_name: string;
  email: string;
  study_program_id: number;
  study_program: string;
  faculty: string;
  year_enrolled: number;
  status: string;
  dormitory: string;
  position: string;
  linkedin: string;
  whatsapp: string;
  instagram: string;
  image: string;
  last_sync: string;
  created_at: string;
  updated_at: string;
}

interface AdminData {
  id: number;
  organization_id: number;
  period: string;
  vision: string;
  mission: string;
  workplan: string;
  leader_id: number;
  leader: Member | null;
  coleader_id: number;
  coleader: Member | null;
  secretary1_id: number;
  secretary1: Member | null;
  secretary2_id: number;
  secretary2: Member | null;
  treasurer1_id: number;
  treasurer1: Member | null;
  treasurer2_id: number;
  treasurer2: Member | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface ApiUkm {
  id: number;
  category_id: number;
  category: any | null;
  name: string;
  short_name: string;
  image: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface AdminApiResponse {
  data: AdminData;
  status: string;
}

interface UkmApiResponse {
  data: ApiUkm;
  message: string;
  status: string;
}

const positionLabels: Record<string, string> = {
  'ketua_ukm': 'Ketua UKM',
  'wakil_ketua': 'Wakil Ketua UKM',
  'sekretaris_1': 'Sekretaris 1 UKM',
  'sekretaris_2': 'Sekretaris 2 UKM',
  'bendahara_1': 'Bendahara 1 UKM',
  'bendahara_2': 'Bendahara 2 UKM'
};

const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

// Member Card Component
const MemberCard = ({ member, position, index }: { member: Member; position: string; index: number }) => (
  <div
    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
    style={{ animation: `fadeInUp 0.6s ease-out ${index * 100}ms both` }}
  >
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Photo */}
      <div className="w-full h-1/2 relative">
        <img
          src={
            member.image
              ? `${IMAGE_URL}/users/${member.image}`
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&background=3b82f6&color=fff&size=300`
          }
          alt={member.full_name}
          className="w-full h-full object-cover object-center"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.full_name)}&background=3b82f6&color=fff&size=300`;
          }}
        />
      </div>

      {/* Info */}
      <div className="flex-1 text-center px-4 py-4 space-y-1">
        <h3 className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-300">
          {member.full_name}
        </h3>
        <p className="text-sm font-semibold text-blue-600 mt-1">
          {positionLabels[position] || position}
        </p>
        <p className="text-xs text-gray-500 mt-1">{member.study_program}</p>
        <p className="text-xs text-gray-400 mt-2">Angkatan {member.year_enrolled}</p>
      </div>

      {/* Contact */}
      <div className="flex justify-center gap-2 pb-4">
        {member.instagram && (
          <a
            href={`${member.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-110"
            title="Instagram"
          >
            <Instagram className="w-4 h-4" />
          </a>
        )}
        {member.linkedin && (
          <a
            href={`${member.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-all duration-200 transform hover:scale-110"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>
        )}
        {member.whatsapp && (
          <a
            href={`https://wa.me/${member.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-110"
            title="WhatsApp"
          >
            <Phone className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function UkmDetail() {
  const params = useParams();
  const shortName = params?.shortName as string || 'HIMATIF';

  // Generate default period (current year + next year)
  const currentYear = new Date().getFullYear();
  const defaultPeriod = `${currentYear}-${currentYear + 1}`;

  const [period, setPeriod] = useState(defaultPeriod);
  const [isLoading, setIsLoading] = useState(true);
  const [ukmData, setUkmData] = useState<ApiUkm | null>(null);
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showPeriodSelector, setShowPeriodSelector] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Generate period options (current year ± 5 years)
  const periodOptions = Array.from({ length: 11 }, (_, i) => {
    const year = currentYear - 1 + i;
    return `${year}-${year + 1}`;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch ukm basic data
        const ukmResponse = await fetch(`${API_URL}/associations/${shortName}`);
        if (!ukmResponse.ok) {
          throw new Error(`Failed to fetch ukm data: ${ukmResponse.status}`);
        }
        const ukmResult: UkmApiResponse = await ukmResponse.json();
        if (ukmResult.status === 'success' && ukmResult.data) {
          setUkmData(ukmResult.data);
        }

        // Fetch admin data (vision, mission, workplan, members)
        try {
          const adminResponse = await fetch(`${API_URL}/associations/admin/${shortName}/${period}`);
          if (adminResponse.ok) {
            const adminResult: AdminApiResponse = await adminResponse.json();
            if (adminResult.status === 'success' && adminResult.data) {
              setAdminData(adminResult.data);
            } else {
              // Data tidak ditemukan untuk periode ini, set null
              setAdminData(null);
            }
          } else {
            // API error tapi bukan masalah fatal, set null
            console.log(`No admin data found for period ${period}`);
            setAdminData(null);
          }
        } catch (adminErr) {
          // Error saat fetch admin data, tetap lanjut dengan data kosong
          console.log('Admin data fetch error:', adminErr);
          setAdminData(null);
        }

        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [shortName, period]); // Add period as dependency

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-3">
          <div className="w-16 h-16 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-600 font-medium">Memuat data periode {period}...</p>
        </div>
      </div>
    );
  }

  if (error || !ukmData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center bg-white p-8 rounded-2xl shadow-md max-w-md">
          <ExternalLink className="w-10 h-10 text-red-600 mx-auto mb-3" />
          <h1 className="text-xl font-bold text-red-600 mb-2">Ukm Tidak Ditemukan</h1>
          <p className="text-gray-700 mb-4">
            Data ukm <span className="font-semibold">{shortName}</span> tidak ditemukan dalam sistem.
          </p>
          <button
            onClick={() => window.location.href = '/user/organization'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Daftar Ukm
          </button>
        </div>
      </div>
    );
  }

  // Parse mission and workplan from string to array
  const parseMissionWorkplan = (text: string): string[] => {
    if (!text || text === '-') return [];
    return text.split('\n').filter(item => item.trim() !== '');
  };

  const missionList = adminData ? parseMissionWorkplan(adminData.mission) : [];
  const workplanList = adminData ? parseMissionWorkplan(adminData.workplan) : [];

  // Collect all members
  const members: Array<{ member: Member; position: string }> = [];
  if (adminData) {
    if (adminData.leader) members.push({ member: adminData.leader, position: 'ketua_ukm' });
    if (adminData.coleader) members.push({ member: adminData.coleader, position: 'wakil_ketua' });
    if (adminData.secretary1) members.push({ member: adminData.secretary1, position: 'sekretaris_1' });
    if (adminData.secretary2) members.push({ member: adminData.secretary2, position: 'sekretaris_2' });
    if (adminData.treasurer1) members.push({ member: adminData.treasurer1, position: 'bendahara_1' });
    if (adminData.treasurer2) members.push({ member: adminData.treasurer2, position: 'bendahara_2' });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 via-indigo-700 to-purple-800 text-white py-16 relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <button
            onClick={() => window.location.href = '/user/organization'}
            className="flex items-center mt-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/30 transition-all duration-300 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="ml-2 font-medium">Kembali</span>
          </button>

          <div className="flex flex-col items-center mt-8 space-y-6">
            <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center overflow-hidden shadow-2xl hover:scale-110 transition-transform duration-300">
              <img
                src={`${IMAGE_URL}/clubs/${ukmData.image}`}
                alt={ukmData.name}
                className="w-24 h-24 object-cover rounded-full"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(ukmData.short_name)}&background=ffffff&color=3b82f6&size=200`;
                }}
              />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-5xl font-extrabold tracking-tight drop-shadow-lg">{ukmData.short_name}</h1>
              <p className="text-xl opacity-90 max-w-2xl">{ukmData.name}</p>
            </div>

            {/* Info Badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <button
                onClick={() => setShowPeriodSelector(!showPeriodSelector)}
                className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 hover:bg-white/30 transition-all duration-300 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Periode {period}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-300 ${showPeriodSelector ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Period Selector Dropdown */}
            {showPeriodSelector && (
              <div
                className="mt-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 max-w-xs mx-auto border border-white/50"
                style={{ animation: 'fadeInUp 0.3s ease-out' }}
              >
                <h3 className="text-gray-800 font-semibold mb-3 text-sm">Pilih Periode:</h3>
                <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                  {periodOptions.map((periodOption) => (
                    <button
                      key={periodOption}
                      onClick={() => {
                        setPeriod(periodOption);
                        setShowPeriodSelector(false);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${period === periodOption
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                      {periodOption}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 space-y-16">

        {/* Pengurus Section */}
        <section>
          <div
            className="text-center mb-12"
            style={{ animation: 'fadeInUp 0.6s ease-out' }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-3">Pengurus UKM</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tim pengurus periode <span className="font-semibold text-blue-600">{period}</span>
            </p>
          </div>

          {members.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {members.map((item, index) => (
                <MemberCard
                  key={item.member.id}
                  member={item.member}
                  position={item.position}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100">
              <Users className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Data Pengurus Belum Tersedia
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Data pengurus untuk periode <span className="font-semibold text-blue-600">{period}</span> belum diinput ke dalam sistem.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}