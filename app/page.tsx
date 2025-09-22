"use client";

import { useState, useEffect } from 'react';
import HeroSection from '@/components/ui/hero-section';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Award, Megaphone, ArrowRight, Star, Target } from 'lucide-react';

export default function HomePage() {
  const [himpunans, setHimpunans] = useState<any[]>([]);
  const [ukms, setUkms] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  const recentNews = [
    {
      title: 'Pelantikan Pengurus Baru BEM IT Del',
      category: 'Announcement',
      date: '2025-09-10',
      description:
        'Pelantikan pengurus baru BEM IT Del periode 2025/2026 dilaksanakan di Auditorium Institut Teknologi Del.',
      featured: true,
    },
    {
      title: 'Seminar Nasional Teknologi Digital',
      category: 'Event',
      date: '2025-09-05',
      description:
        'BEM IT Del sukses menyelenggarakan Seminar Nasional dengan tema “Inovasi Digital untuk Generasi Emas 2045”.',
      featured: false,
    },
    {
      title: 'Donasi Peduli Pendidikan',
      category: 'Social',
      date: '2025-08-28',
      description:
        'Departemen Sosial BEM IT Del menggalang dana untuk mendukung pendidikan anak-anak di daerah terpencil.',
      featured: false,
    },
  ];

  const features = [
    {
      icon: <Users className="w-8 h-8 text-[#3B82F6]" />,
      title: "Student Representation",
      description: "Representing student interests and fostering academic excellence through collaborative initiatives."
    },
    {
      icon: <Award className="w-8 h-8 text-[#3B82F6]" />,
      title: "Achievement Programs",
      description: "Developing programs that enhance student skills and academic performance across all departments."
    },
    {
      icon: <Megaphone className="w-8 h-8 text-[#3B82F6]" />,
      title: "Communication Hub",
      description: "Bridging communication between students, faculty, and administration for better campus life."
    }
  ];

  useEffect(() => {
    // Fetch Departments
    fetch('http://localhost:9090/api/department')
    .then(response => response.json())
    .then(data => {
      console.log('Departments API response:', data.data);
      setDepartments(data.data);
    })

    // Fetch Himpunan Mahasiswa
    fetch('http://localhost:9090/api/association')
    .then(response => response.json())
    .then(data => {
      console.log('Associations API response:', data.data);
      setHimpunans(data.data);
    })

    // Fetch UKM
    fetch('http://localhost:9090/api/club')
      .then(response => response.json())
      .then(data => {
        console.log('Clubs API response:', data.data);
        setUkms(data.data);
      })
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission & Vision</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Committed to creating a vibrant academic environment that fosters student growth,
              innovation, and collaborative success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Vision Card */}
            <Card className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3B82F6]/20 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
              <CardHeader className="relative">
                <div className="flex items-center mb-4">
                  <Star className="w-6 h-6 text-[#3B82F6] mr-2" />
                  <Badge variant="secondary" className="bg-[#3B82F6]/10 text-[#3B82F6]">Vision</Badge>
                </div>
                <CardTitle className="text-2xl text-[#3B82F6]">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Menjadi organisasi mahasiswa yang unggul, inovatif, dan berkomitmen dalam
                  mengembangkan potensi mahasiswa untuk berkontribusi positif bagi masyarakat
                  dan bangsa.
                </p>
              </CardContent>
            </Card>

            {/* Mission Card */}
            <Card className="relative overflow-hidden">
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#3B82F6]/20 to-transparent rounded-full transform -translate-x-16 translate-y-16"></div>
              <CardHeader className="relative">
                <div className="flex items-center mb-4">
                  <Target className="w-6 h-6 text-[#3B82F6] mr-2" />
                  <Badge variant="secondary" className="bg-[#3B82F6]/10 text-[#3B82F6]">Mission</Badge>
                </div>
                <CardTitle className="text-2xl text-[#3B82F6]">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-gray-700 text-lg leading-relaxed">
                  Menjadi organisasi mahasiswa yang unggul, inovatif, dan berkomitmen dalam
                  mengembangkan potensi mahasiswa Institut Teknologi Del untuk
                  berkontribusi positif bagi masyarakat dan bangsa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Departemen BEM</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Departemen-departemen yang menjalankan program kerja untuk kemajuan mahasiswa IT Del
            </p>
          </div>

          {/* Grid Departemen */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {departments.map((dept, index) => (
              <Card
                key={index}
                className="text-center rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 mx-auto mb-4">
                    <img
                      src={`http://localhost:9090/departments/${dept.image}`}
                      alt={dept.name}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800">{dept.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 leading-relaxed mb-6">
                    {dept.short_name}
                  </CardDescription>
                  <Button className="w-30 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-700 hover:to-gray-100 text-blue-900 font-semibold transition-all duration-300">
                    Pelajari
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Himpunan Mahasiswa Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">Himpunan Mahasiswa</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organisasi mahasiswa berdasarkan program studi di Institut Teknologi Del
            </p>
          </div>

          {/* Grid Himpunan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {himpunans.map((hmj, index) => (
              <Card key={index} className="flex items-center p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex-shrink-0">
                  <div className="flex-shrink-0">
                  <img
                    src={`http://localhost:9090/associations/${hmj.image}`}
                    alt={hmj.name}
                    className="w-20 h-20 rounded-full object-contain"
                  />
                </div>
                </div>
                <div className="ml-6 flex-1">
                  <CardTitle className="text-xl font-semibold mb-2">{hmj.name}</CardTitle>
                  <CardDescription className="text-base text-gray-600 mb-4">{hmj.short_name}</CardDescription>
                  <Button className="bg-[#3B82F6] hover:bg-blue-600 text-white">Info Lengkap</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Unit Kegiatan Mahasiswa Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1E3A8A] mb-4">Unit Kegiatan Mahasiswa</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Новости pengembangan minat dan bakat mahasiswa di berbagai bidang
            </p>
          </div>

          {/* Grid UKM */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ukms.map((ukm, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4">
                    <img
                      src={`http://localhost:9090/clubs/${ukm.image}`}
                      alt={ukm.name}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <CardTitle className="text-xl font-semibold">{ukm.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed mb-4">
                    {ukm.short_name}
                  </CardDescription>
                  <Button className="bg-[#2563EB] hover:bg-blue-600 text-white">Bergabung</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News & Announcements */}
       <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest News & Updates</h2>
              <p className="text-xl text-gray-600">Stay updated with our latest activities and announcements</p>
            </div>
            <Button variant="outline" className="hidden md:flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentNews.map((news, index) => (
              <Card
                key={index}
                className={`hover:shadow-lg transition-shadow duration-300 ${
                  news.featured ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="bg-[#3B82F6]/10 text-[#3B82F6]">
                      {news.category}
                    </Badge>
                    {news.featured && <Badge className="bg-[#3B82F6]">Featured</Badge>}
                  </div>
                  <CardTitle className="text-xl hover:text-[#3B82F6] transition-colors cursor-pointer">
                    {news.title}
                  </CardTitle>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-1" />
                    {news.date}
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {news.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Button variant="outline" className="flex items-center mx-auto">
              View All News <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}