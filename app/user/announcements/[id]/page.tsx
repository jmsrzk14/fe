"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Users,
  Eye,
  Share2,
  FileText,
  Download,
  Building,
  Mail,
  User,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

type AnnouncementDetail = {
  id: number;
  title: string;
  content: string;
  organization_id: number;
  file_url?: string | null;
  organization?: { id?: number; name?: string; short_name?: string } | null;
  author?: { id?: number; name?: string } | null;
  start_date?: string | null;
  end_date?: string | null;
  views?: number;
  shares?: number;
  category?: string;
  type?: "TERBARU" | "SEDANG" | "RENDAH";
  created_at?: string;
};

export default function AnnouncementDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const [announcement, setAnnouncement] = useState<AnnouncementDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`${API_URL}/announcements/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setAnnouncement(res.data.data);
        } else {
          console.error("News not found:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching detail:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const getOrgName = (orgId: number, orgData?: any) => {
    if (orgId === 888) return "BEM IT Del";
    if (orgId === 999) return "MPM IT Del";
    if (orgData?.short_name) return orgData.short_name;
    if (orgData?.name) return orgData.name;
    return "Kemahasiswaan";
  };

  if (loading || !announcement) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat pengumuman...</p>
        </div>
      </div>
    );
  }

  const orgName = getOrgName(announcement.organization_id, announcement.organization);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#2563eb] to-[#3b82f6] h-[100vh] relative overflow-hidden">
        <div className="container mx-auto px-4 py-4 mt-12">
        </div>

        {/* Detail Utama */}
        <div className="container mx-auto px-4 py-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8"
          >
            <div className="p-6 md:p-8">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                {announcement.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4 text-blue-600" />
                  <span>{orgName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  <span>
                    {formatDate(announcement.start_date)} –{" "}
                    {formatDate(announcement.end_date)}
                  </span>
                </div>
                {announcement.author?.name && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>{announcement.author.name}</span>
                  </div>
                )}
              </div>

              {/* Isi pengumuman */}
              <div
                className="prose prose-blue max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: announcement.content }}
              />
            </div>

            {/* Info tambahan */}
            <div className="bg-gray-50 border-t p-6 flex flex-wrap gap-4 justify-between text-sm text-gray-600">
              {announcement.file_url && (
                <a
                  href={`${IMAGE_URL}/${announcement.file_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:underline"
                >
                  <Download size={16} />
                  <span>Unduh Lampiran</span>
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
