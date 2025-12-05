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
  MessageCircle,
  Tag,
  Heart,
  Bookmark,
  Star,
  Facebook,
  Twitter,
  Linkedin
} from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

// Define the type for news data
type NewsDetail = {
  id: string;
  title: string;
  category: string;
  date: string;
  image_url: string;
  content: string;
  created_at: string;
};

const NewsDetailPage = () => {
  const { id } = useParams(); // ambil id dari URL
  const router = useRouter();
  const [newsData, setNewsData] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axios
      .get(`${API_URL}/news/${id}`)
      .then((res) => {
        if (res.data.status === "success") {
          setNewsData(res.data.data);
        } else {
          console.error("News not found:", res.data);
        }
      })
      .catch((err) => console.error("Error fetching detail:", err))
      .finally(() => setLoading(false));
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    // opsi: ganti 'id-ID' jadi 'en-US' kalau mau bahasa Inggris
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  if (!newsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat berita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="relative overflow-hidden">

        {/* Header with Back Button */}
        <div className="bg-g-gradient-to-br from-[#2563eb] to-[#3b82f6] sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-grey-500 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Kembali</span>
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Article Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-6"
              >
                {/* Hero Image */}
                <div className="relative h-64 md:h-80 bg-gradient-to-br from-blue-600 to-blue-800">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img
                      src={`${IMAGE_URL}/news/${newsData.image_url}`}
                      alt={newsData.image_url}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                      {newsData.category}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {newsData.title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(newsData.created_at)}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
              >
                <div className="prose prose-blue max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: newsData.content }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;