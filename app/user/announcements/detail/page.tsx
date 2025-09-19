'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  Eye, 
  Share2, 
  BookOpen, 
  Users, 
  Award, 
  CheckCircle,
  Clock,
  MapPin,
  Mail,
  Phone,
  Globe,
  FileText,
  Download,
  User,
  Building,
  MessageCircle
} from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

// Define the type for announcement data
type AnnouncementDetail = {
  id: string;
  organization: string;
  date: string;
  type: string;
  priority: string;
  title: string;
  description: string;
  category: string;
  views: number;
  shares: number;
  content: string;
  deadline?: string;
  location?: string;
  requirements?: string[];
  divisions?: {
    internal: string[];
    external: string[];
  };
  timeline?: {
    name: string;
    date: string;
    icon: string;
    status: 'completed' | 'current' | 'upcoming';
  }[];
  contact: {
    person: string;
    email: string;
    phone?: string;
    website?: string;
  };
};

const AnnouncementDetailPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [announcementData, setAnnouncementData] = useState<AnnouncementDetail | null>(null);
  const [activeCommentTab, setActiveCommentTab] = useState('kirim');
  const announcementId = searchParams.get('id');

  // Sample announcement detail data
  const announcementDetailData: Record<string, AnnouncementDetail> = {
    'recruitement-bem': {
      id: 'recruitement-bem',
      organization: 'BEM IT Del',
      date: '15 Januari 2024',
      type: 'TERBARU',
      priority: 'high',
      title: 'Rekrutmen Pengurus BEM IT Del Periode 2024-2025',
      description: 'Bergabunglah bersama BEM IT Del dan wujudkan perubahan positif untuk kemajuan mahasiswa',
      category: 'BEM',
      views: 456,
      shares: 89,
      content: `BEM IT Del membuka kesempatan bagi mahasiswa IT Del yang berprestasi dan berkomitmen untuk bergabung sebagai pengurus periode 2024-2025. 

Kami mencari individu yang memiliki semangat kepemimpinan, kreativitas, dan dedikasi tinggi untuk membangun masa depan yang lebih baik bagi seluruh mahasiswa IT Del.

Proses rekrutmen akan melalui beberapa tahapan: pendaftaran online, seleksi berkas, tes tertulis, dan wawancara. Pastikan Anda mempersiapkan diri dengan baik dan menunjukkan potensi terbaik Anda.`,
      deadline: '1 Februari 2024',
      location: 'Auditorium Utama IT Del',
      requirements: [
        'Mahasiswa aktif IT Del semester 2-6',
        'IPK minimal 3.00',
        'Memiliki pengalaman organisasi (diutamakan)',
        'Mampu bekerja dalam tim',
        'Berkomitmen penuh terhadap tugas dan tanggung jawab',
        'Tidak sedang menjabat di organisasi lain sebagai pengurus inti'
      ],
      divisions: {
        internal: [
          'Sekretaris Jenderal',
          'Bendahara Umum',
          'Departemen PSDM',
          'Departemen Dalam Negeri',
          'Departemen Kominfo'
        ],
        external: [
          'Departemen Luar Negeri',
          'Departemen Kewirausahaan',
          'Departemen Sosial Masyarakat',
          'Departemen Olahraga & Seni',
          'Departemen Minat Bakat'
        ]
      },
      timeline: [
        {
          name: 'Pendaftaran Dibuka',
          date: '15 Jan - 1 Feb 2024',
          icon: '📝',
          status: 'current'
        },
        {
          name: 'Seleksi Berkas',
          date: '3 - 5 Feb 2024',
          icon: '📋',
          status: 'upcoming'
        },
        {
          name: 'Tes Tertulis',
          date: '7 Feb 2024',
          icon: '✍️',
          status: 'upcoming'
        },
        {
          name: 'Wawancara',
          date: '10 - 12 Feb 2024',
          icon: '🗣️',
          status: 'upcoming'
        },
        {
          name: 'Pengumuman',
          date: '15 Feb 2024',
          icon: '📢',
          status: 'upcoming'
        }
      ],
      contact: {
        person: 'Robertus Situmorang',
        email: 'recruitment@bemitdel.ac.id',
        phone: '081234567890',
        website: 'www.bemitdel.ac.id'
      }
    },
    'startup-competition': {
      id: 'startup-competition',
      organization: 'UKM Kewirausahaan',
      date: '18 Januari 2024',
      type: 'TERBARU',
      priority: 'high',
      title: 'Kompetisi Startup Digital Innovation Challenge',
      description: 'Lomba inovasi startup digital dengan total hadiah 50 juta rupiah untuk mahasiswa IT Del',
      category: 'UKM',
      views: 234,
      shares: 42,
      content: `UKM Kewirausahaan IT Del menyelenggarakan kompetisi startup digital dengan tema "Innovation for Better Future". Kompetisi ini terbuka untuk seluruh mahasiswa IT Del yang memiliki ide inovatif di bidang teknologi digital.

Peserta diminta untuk mengembangkan solusi digital yang dapat menyelesaikan masalah nyata di masyarakat. Bidang yang dapat dipilih antara lain edtech, fintech, healthtech, agritech, dan sustainable technology.

Kompetisi ini terdiri dari beberapa tahap: pitching deck, prototype development, dan final presentation. Para peserta akan mendapat mentoring dari entrepreneur sukses dan investor yang berpengalaman. Total hadiah sebesar 50 juta rupiah akan dibagikan untuk 5 pemenang terbaik.`,
      deadline: '1 Februari 2024',
      location: 'Auditorium Utama IT Del',
      requirements: [
        'Tim terdiri dari 3-5 mahasiswa IT Del',
        'Memiliki ide inovasi digital yang original',
        'Menyertakan business plan yang lengkap',
        'Prototype minimal MVP (Minimum Viable Product)',
        'Presentasi menggunakan bahasa Indonesia atau Inggris'
      ],
      timeline: [
        {
          name: 'Pendaftaran',
          date: '18 Jan - 1 Feb 2024',
          icon: '📝',
          status: 'current'
        },
        {
          name: 'Pitching Deck',
          date: '5 Feb 2024',
          icon: '🎯',
          status: 'upcoming'
        },
        {
          name: 'Prototype Dev',
          date: '5 - 15 Feb 2024',
          icon: '⚙️',
          status: 'upcoming'
        },
        {
          name: 'Final Presentation',
          date: '20 Feb 2024',
          icon: '🏆',
          status: 'upcoming'
        }
      ],
      contact: {
        person: 'Maria Simanjuntak',
        email: 'startup@ukm-itdel.ac.id',
        phone: '081298765432'
      }
    }
  };

  useEffect(() => {
    if (announcementId && announcementDetailData[announcementId]) {
      setAnnouncementData(announcementDetailData[announcementId]);
    } else {
      // Default ke recruitement-bem jika ID tidak ditemukan
      setAnnouncementData(announcementDetailData['recruitement-bem']);
    }
  }, [announcementId]);

  if (!announcementData) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (

    
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#2563eb] to-[#3b82f6] relative overflow-hidden">
        {/* Background Elements
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute top-20 right-32 w-16 h-16 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full"></div>
        </div> */}

        {/* Institution Logo */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Building className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Back Button */}
          <button 
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Pengumuman</span>
          </button>

          {/* Main Content Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Announcement Header */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                {/* Priority Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ● {announcementData.type}
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span>{announcementData.views}</span>
                    <Share2 className="w-4 h-4 ml-2" />
                    <span>{announcementData.shares}</span>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {announcementData.title}
                </h1>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span>{announcementData.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-500" />
                    <span>{announcementData.organization}</span>
                  </div>
                  {announcementData.deadline && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-red-500" />
                      <span>Deadline: {announcementData.deadline}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Tentang Pendaftaran</h3>
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {announcementData.content}
                  </div>
                </div>

                {/* Requirements */}
                {announcementData.requirements && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Persyaratan Pendaftaran</h3>
                    <ul className="space-y-3">
                      {announcementData.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Comments Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <div className="flex items-center gap-2 mb-6">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  <h3 className="text-xl font-semibold text-gray-800">Komentar ( 2 )</h3>
                </div>

                {/* Comment Tabs */}
                <div className="flex gap-4 mb-6">
                  <button
                    onClick={() => setActiveCommentTab('kirim')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeCommentTab === 'kirim'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Kirim Komentar
                  </button>
                </div>

                {/* Comment Form */}
                {activeCommentTab === 'kirim' && (
                  <div className="space-y-4 mb-8">
                    <textarea
                      placeholder="Tulis komentar Anda..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows={4}
                    />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Kirim Komentar
                    </button>
                  </div>
                )}

                {/* Existing Comments */}
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                      AS
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-800">Ahmad Subki</span>
                          <span className="text-sm text-gray-500">1 hari lalu</span>
                        </div>
                        <p className="text-gray-700">Informasi yang sangat bermanfaat! Kapan deadline pendaftarannya?</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                      SD
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-gray-800">Sari Dewi</span>
                          <span className="text-sm text-gray-500">1 hari lalu</span>
                        </div>
                        <p className="text-gray-700">Terima kasih atas informasinya. Apakah ada syarat khusus untuk pendaftaran?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related Announcements */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Pengumuman Terkait
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Workshop Teknologi AI dan Machine Learning',
                      org: 'HIMATIF',
                      date: '20 Januari 2024',
                      type: 'SEDANG'
                    },
                    {
                      title: 'Kompetisi Startup Digital Innovation Challenge',
                      org: 'UKM Kewirausahaan',
                      date: '25 Januari 2024',
                      type: 'TERBARU'
                    },
                    {
                      title: 'Seminar Nasional Teknologi Berkelanjutan',
                      org: 'HIMATEKA',
                      date: '22 Januari 2024',
                      type: 'SEDANG'
                    }
                  ].map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-medium text-gray-800 text-sm mb-1">{item.title}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">{item.org}</span>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                        item.type === 'TERBARU' ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Divisions Available */}
              {announcementData.divisions && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Divisi yang Tersedia</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                        <Building className="w-4 h-4" />
                        Departemen Internal
                      </h4>
                      <div className="space-y-2">
                        {announcementData.divisions.internal.map((division, index) => (
                          <div key={index} className="bg-blue-50 px-3 py-2 rounded-lg text-sm text-blue-700">
                            {division}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Departemen Eksternal
                      </h4>
                      <div className="space-y-2">
                        {announcementData.divisions.external.map((division, index) => (
                          <div key={index} className="bg-green-50 px-3 py-2 rounded-lg text-sm text-green-700">
                            {division}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Timeline */}
              {announcementData.timeline && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4">Timeline Pendaftaran</h3>
                  <div className="space-y-4">
                    {announcementData.timeline.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                          item.status === 'completed' ? 'bg-green-100' :
                          item.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <span>{item.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800 text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-600">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-blue-500" />
                  {announcementData.contact.person}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{announcementData.contact.email}</span>
                  </div>
                  {announcementData.contact.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{announcementData.contact.phone}</span>
                    </div>
                  )}
                  {announcementData.contact.website && (
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">{announcementData.contact.website}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tips Success */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <h3 className="font-semibold">Tips Sukses</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p>• Persiapkan portofolio yang menarik</p>
                  <p>• Pelajari visi misi BEM IT Del</p>
                  <p>• Tunjukkan komitmen dan antusiasme</p>
                  <p>• Datang tepat waktu saat wawancara</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Daftar Sekarang
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Download Panduan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementDetailPage;