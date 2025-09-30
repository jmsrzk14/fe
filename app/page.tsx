"use client";

import { useState, useEffect } from 'react';
import Link from "next/link";
import HeroSection from '@/components/ui/hero-section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Award, Megaphone, ArrowRight, Star, Target, Clock, Eye, TrendingUp, Play, Zap, Lightbulb, Heart, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [visi, setVisi] = useState<string>("");
  const [misi, setMisi] = useState<string>("");
  const [recentNews, setRecentNews] = useState<any[]>([]);

  const features = [
    {
      icon: <Users className="w-8 h-8 text-[#3B82F6]" />,
      title: "Martuhan",
      description: "Representing student interests and fostering academic excellence through collaborative initiatives."
    },
    {
      icon: <Award className="w-8 h-8 text-[#3B82F6]" />,
      title: "Maroha",
      description: "Developing programs that enhance student skills and academic performance across all departments."
    },
    {
      icon: <Megaphone className="w-8 h-8 text-[#3B82F6]" />,
      title: "Marbisuk",
      description: "Bridging communication between students, faculty, and administration for better campus life."
    }
  ];

  useEffect(() => {
    const currentYear = new Date().getFullYear() - 2;
    const nextYear = currentYear + 1;
    const period = `${currentYear}-${nextYear}`;

    // Ambil data visi & misi
    fetch(`http://localhost:9090/api/visimisibem/${period}`)
      .then((res) => res.json())
      .then((data) => {
        setVisi(data.data.vision);
        setMisi(data.data.mission);
      })
      .catch((err) => console.error("Error fetching visi/misi:", err));

    fetch("http://localhost:8080/api/news") // ganti sesuai endpoint kamu
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.data)) {
          // mapping biar sesuai struktur UI
          const mappedNews = data.data.map((item: any, idx: number) => ({
            id: item.id,
            title: item.title,
            description: item.content, // konten HTML
            date: item.created_at || new Date().toISOString(), // fallback kalau API belum ada
            category: item.category || "General",
            featured: idx === 0 // contoh: berita pertama jadi featured
          }));
          setRecentNews(mappedNews);
        }
      })
      .catch((err) => console.error("Error fetching news:", err));
  }, []);

  // helper truncate text
  function truncateText(html: string, maxLength: number = 200) {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || "";

    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  }

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Mission & Vision */}
      <section className="py-20 relative overflow-hidden bg-blue-600 rounded-t-3xl shadow-xl">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-20 rounded-3xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='20' height='20' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 20 0 L 0 0 0 20' fill='none' stroke='%23ffffff' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Title */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6"
            >
              <Target className="w-8 h-8 text-indigo-600" />
              <span className="text-lg font-semibold text-white-700">
                Mission & Vision
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="text-5xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-white mb-6"
            >
              Our Mission & Vision
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-xl text-white-600 max-w-3xl mx-auto leading-relaxed"
            >
              Committed to creating a vibrant academic environment that fosters
              student growth, innovation, and collaborative success through
              excellence and dedication.
            </motion.p>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center relative">
            {/* Vertical dividers */}
            <div className="hidden md:block absolute inset-y-0 left-1/3 w-px bg-gradient-to-b from-transparent via-indigo-200 to-transparent" />
            <div className="hidden md:block absolute inset-y-0 right-1/3 w-px bg-gradient-to-b from-transparent via-indigo-200 to-transparent" />

            {/* Martuhan */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="group px-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20  rounded-2xl mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                <img src="./martuhan.png" alt="" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">
                Martuhan
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-white leading-relaxed text-left"
              >
                Building meaningful relationships and fostering a caring community
                where every individual feels valued, supported, and empowered to reach
                their full potential.
              </motion.p>

            </motion.div>

            {/* Maroha */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="group px-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                <img src="./maroha.png" alt="" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">
                Maroha
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-white leading-relaxed text-left"
              >
                Building meaningful relationships and fostering a caring community
                where every individual feels valued, supported, and empowered to reach
                their full potential.
              </motion.p>
            </motion.div>

            {/* Marbisuk */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="group px-6"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 shadow-lg group-hover:rotate-6 transition-transform duration-300">
                <img src="./marbisuk.png" alt="" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-white transition-colors">
                Marbisuk
              </h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                className="text-white leading-relaxed text-left"
              >
                Building meaningful relationships and fostering a caring community
                where every individual feels valued, supported, and empowered to reach
                their full potential.
              </motion.p>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center mt-16">
            <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg border border-white/20">
              <Users className="w-6 h-6 text-indigo-600" />
              <span className="text-gray-700 font-medium">
                Together We Achieve Excellence
              </span>
              <Lightbulb className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-white via-blue-50/40 to-slate-50">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-100/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-slate-100/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Membangun Masa Depan
              <span className="block text-blue-600">Yang Gemilang</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Bersama-sama mewujudkan visi dan menjalankan misi untuk kemajuan mahasiswa Institut Teknologi Del
            </p>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {[0, 1].map((index) => {
              const isHovered = hoveredCard === index;
              return (
                <motion.div
                  key={index}
                  className="group relative cursor-pointer"
                  onHoverStart={() => setHoveredCard(index)}
                  onHoverEnd={() => setHoveredCard(null)}
                  animate={{
                    scale: 1,
                    zIndex: isHovered ? 50 : 10,
                    y: isHovered ? '-5%' : 0,
                    filter: hoveredCard !== null && !isHovered ? 'blur(2px)' : 'blur(0px)',
                    transition: { type: 'spring', stiffness: 150, damping: 20 }
                  }}
                >
                  {/* Card Background Effects */}
                  <div
                    className="absolute -inset-1 rounded-3xl blur opacity-20 transition-all duration-700"
                    style={{
                      background: index === 0
                        ? 'linear-gradient(to right, #3b82f6, #2563eb, #1d4ed8)' // gradient biru VISI
                        : 'linear-gradient(to right, #60a5fa, #3b82f6, #2563eb)' // gradient biru MISI
                    }}
                  ></div>

                  {/* Card */}
                  <div
                    className={`relative bg-white backdrop-blur-xl rounded-3xl p-8 shadow-xl border transition-all duration-500 group-hover:shadow-2xl ${index === 0 ? 'border-blue-100/50' : 'border-slate-100/50'
                      } min-h-[420px] flex flex-col`}
                  >
                    {/* Decorative Elements */}
                    {index === 0 ? (
                      <>
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 via-blue-400/20 to-transparent rounded-full transform translate-x-20 -translate-y-20 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/15 to-transparent rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700"></div>
                      </>
                    ) : (
                      <>
                        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-bl from-blue-400/10 via-blue-300/15 to-transparent rounded-full transform -translate-x-20 -translate-y-20 group-hover:scale-110 transition-transform duration-700"></div>
                        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-500/15 to-transparent rounded-full transform translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700"></div>
                      </>
                    )}

                    {/* Card Content */}
                    <div className="relative z-10">
                      <div className="flex items-center mb-6">
                        <div
                          className={`p-3 rounded-2xl shadow-lg transition-all duration-300 group-hover:shadow-xl group-hover:scale-110 ${index === 0 ? 'bg-blue-500 group-hover:bg-blue-600' : 'bg-blue-600 group-hover:bg-blue-700'
                            }`}
                        >
                          {index === 0 ? <Star className="w-8 h-8 text-white" /> : <Target className="w-8 h-8 text-white" />}
                        </div>
                        <div className="ml-4">
                          <span
                            className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold border transition-colors ${index === 0 ? 'bg-blue-100 text-blue-700 border-blue-200/50' : 'bg-blue-200 text-blue-800 border-blue-300/50'
                              }`}
                          >
                            {index === 0 ? 'VISI' : 'MISI'}
                          </span>
                        </div>
                      </div>

                      <h3 className="text-3xl font-bold text-gray-900 mb-6 transition-colors group-hover:text-blue-900">
                        {index === 0 ? 'Visi Kami' : 'Misi Kami'}
                      </h3>

                      <div
                        className="text-gray-700 text-lg leading-relaxed prose max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: index === 0 ? visi : misi,
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* News & Announcements */}
      <section className="relative py-24 bg-blue-600 overflow-hidden rounded-t-[2rem]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <h2 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tight">
                HOT NEWS
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-white mx-auto rounded-full"></div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {recentNews.map((news, index) => (
              <motion.div
                key={news.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`group cursor-pointer ${news.featured ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              >
                <Card className={`relative overflow-hidden bg-white/95 backdrop-blur-sm border-0 shadow-2xl transition-all duration-500 hover:shadow-blue-900/20 hover:scale-105 ${news.featured
                  ? 'min-h-[500px]'
                  : 'min-h-[350px]'
                  }`}>
                  <CardHeader className={`relative z-10 ${news.featured ? 'p-8' : 'p-6'}`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-blue-500 hover:bg-blue-600">
                          {news.category.toUpperCase()}
                        </Badge>
                        {news.featured && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg">
                            <Star className="w-3 h-3 mr-1" />
                            Terbaru
                          </Badge>
                        )}
                      </div>
                    </div>

                    <CardTitle className={`font-black text-gray-900 leading-tight group-hover:text-blue-900 transition-colors duration-300 ${news.featured ? 'text-3xl mb-4' : 'text-xl mb-3'
                      }`}>
                      {news.title}
                    </CardTitle>

                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(news.date).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardDescription className="text-gray-700 leading-relaxed px-7 pb-6">
                    {truncateText(news.description, 500)}
                  </CardDescription>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Button Lihat Semua Berita */}
          <div className="mt-12 flex justify-center">
            <Link href="/user/news">
              <Button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-blue-50 transition-all duration-300">
                Lihat Semua Berita
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}