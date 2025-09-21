"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  MapPin, 
  Search,
  Camera,
  Award,
  Code,
  Monitor,
  Mic,
  Trophy,
  GraduationCap,
  Star,
  Eye,
  Heart,
  Sparkles,
  Image,
  Play,
  Download,
  Share2,
  Filter,
  Grid,
  List,
  ChevronRight,
  BookOpen,
  Lightbulb,
  Target
} from "lucide-react";

export default function GalleryPage() {
  const featured = [
    {
      id: 1,
      title: "Seminar Nasional Teknologi",
      category: "Seminar",
      date: "5 April 2024",
      location: "Auditorium Kampus",
      attendees: "500+",
      image:
        "https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description:
        "Dokumentasi seminar nasional teknologi dengan pembicara dari berbagai universitas ternama.",
      views: 224,
      likes: 134,
      photos: 45,
      videos: 8,
    },
    {
      id: 2,
      title: "Kompetisi Programming",
      category: "Kompetisi",
      date: "20 Maret 2024",
      location: "Lab Informatika",
      attendees: "300+",
      image:
        "https://images.pexels.com/photos/1153213/pexels-photo-1153213.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description:
        "Ajang kompetisi programming dan hackathon tingkat nasional dengan peserta dari seluruh Indonesia.",
      views: 250,
      likes: 156,
      photos: 38,
      videos: 5,
    },
    {
      id: 3,
      title: "Workshop Teknologi",
      category: "Workshop",
      date: "15 Maret 2024",
      location: "Conference Hall",
      attendees: "120",
      image:
        "https://images.pexels.com/photos/1153198/pexels-photo-1153198.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      description:
        "Pelatihan dan workshop pengembangan skill teknologi untuk mahasiswa IT DEL.",
      views: 187,
      likes: 90,
      photos: 28,
      videos: 3,
    },
  ];

  const allGalleries = [
    { title: "Seminar Nasional Teknologi", icon: Mic, count: "45 foto" },
    { title: "Kompetisi Programming", icon: Code, count: "38 foto" },
    { title: "Workshop Teknologi", icon: Monitor, count: "28 foto" },
    { title: "Wisuda & Pelantikan", icon: GraduationCap, count: "62 foto" },
    { title: "Tech Talk Series", icon: Lightbulb, count: "34 foto" },
    { title: "Hackathon 2024", icon: Trophy, count: "41 foto" },
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Data Scientist @Shopee",
      year: "2018",
      rating: 5,
      text: "BEM IT DEL mengajarkan saya kepemimpinan dan networking. Pengalaman memimpin project di kampus sangat membantu di karir profesional.",
      initials: "BS",
      icon: Target,
    },
    {
      name: "Lisa Permata",
      role: "DevOps Engineer @Traveloka",
      year: "2020",
      rating: 5,
      text: "Komunitas BEM IT DEL sangat suportif! Banyak pengalaman organisasi yang memperkuat kemampuan saya dalam tim lintas-divisi.",
      initials: "LP",
      icon: Users,
    },
    {
      name: "Andi Pratama",
      role: "Full Stack Developer @Bukalapak",
      year: "2020",
      rating: 5,
      text: "Event-event teknologi yang diselenggarakan BEM IT DEL membuka banyak peluang. Exposure sangat membantu career development.",
      initials: "AP",
      icon: BookOpen,
    },
  ];

  const categories = [
    { name: "Semua Album", icon: Grid },
    { name: "Seminar", icon: Mic },
    { name: "Workshop", icon: Monitor },
    { name: "Kompetisi", icon: Trophy },
    { name: "Wisuda", icon: GraduationCap },
  ];

  return (
    <div className="bg-gradient-to-b from-blue-50 via-indigo-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-24 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 text-6xl animate-pulse">
            <Camera />
          </div>
          <div className="absolute top-32 right-20 text-4xl animate-bounce">
            <Sparkles />
          </div>
          <div className="absolute bottom-20 left-1/4 text-5xl animate-pulse delay-300">
            <Award />
          </div>
          <div className="absolute bottom-10 right-10 text-3xl animate-bounce delay-500">
            <Star />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 px-4">
          <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/20 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Image className="w-4 h-4" />
            <span>BEM ITDEL</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            GALERI
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Momen-momen berharga dalam setiap kegiatan dan pencapaian organisasi mahasiswa terdepan
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-2 text-white/90">
              <Camera className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">500+ Foto</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Play className="w-5 h-5 text-green-300" />
              <span className="font-semibold">50+ Video</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Award className="w-5 h-5 text-orange-300" />
              <span className="font-semibold">20+ Event</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Koleksi Terlengkap</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Koleksi Galeri Kegiatan
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Jelajahi dokumentasi lengkap kegiatan BEM IT DEL melalui koleksi foto dan album yang tersedia
          </p>
        </div>

        {/* Filter & Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {categories.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <Badge
                  key={idx}
                  variant={cat.name === "Semua Album" ? "default" : "outline"}
                  className={`cursor-pointer px-6 py-3 text-sm rounded-full transition-all duration-300 hover:scale-105 ${
                    cat.name === "Semua Album"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg"
                      : "hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600 hover:shadow-md"
                  }`}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {cat.name}
                </Badge>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Cari galeri kegiatan..."
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Featured Gallery */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Galeri Unggulan</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((item) => (
              <Card
                key={item.id}
                className="group hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-2xl border-0 bg-white"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-0 shadow-lg">
                      <Award className="w-3 h-3 mr-1" />
                      {item.category}
                    </Badge>
                  </div>
                  
                  {/* Media Count */}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                      <Camera className="w-3 h-3" />
                      {item.photos}
                    </div>
                    <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
                      <Play className="w-3 h-3" />
                      {item.videos}
                    </div>
                  </div>

                  {/* Overlay Actions */}
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                      <Share2 className="w-4 h-4 text-gray-700" />
                    </button>
                    <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg">
                      <Download className="w-4 h-4 text-gray-700" />
                    </button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="space-y-3 text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg mr-3">
                        <Calendar className="w-4 h-4 text-blue-600" />
                      </div>
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-green-50 rounded-lg mr-3">
                        <MapPin className="w-4 h-4 text-green-600" />
                      </div>
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-8 h-8 bg-purple-50 rounded-lg mr-3">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <span>{item.attendees} peserta</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{item.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4 text-red-500" />
                        <span>{item.likes}</span>
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      <span>Lihat Detail</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Galleries */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl">
              <Grid className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Semua Galeri</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allGalleries.map((item, idx) => {
              const IconComponent = item.icon;
              return (
                <Card
                  key={idx}
                  className="group hover:shadow-xl transition-all duration-300 rounded-2xl border-0 bg-white overflow-hidden cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
                        <IconComponent className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    <h4 className="font-bold text-lg text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-3">{item.count}</p>
                    <div className="flex items-center gap-2 text-xs text-blue-600">
                      <span>Klik untuk lihat detail</span>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-4">
              <Trophy className="w-4 h-4" />
              <span>Success Stories</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Testimoni Alumni</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cerita sukses alumni yang telah merasakan manfaat bergabung dengan BEM IT DEL
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => {
              const IconComponent = t.icon;
              return (
                <Card
                  key={idx}
                  className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white group overflow-hidden"
                >
                  <CardContent className="p-6 relative">
                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                      <div className="text-6xl font-serif text-blue-600">"</div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative">
                        <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-600 font-bold text-lg shadow-lg">
                          {t.initials}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                          <IconComponent className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{t.name}</h4>
                        <p className="text-sm text-gray-500 font-medium">{t.role}</p>
                        <p className="text-xs text-blue-600">Alumni {t.year}</p>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                      "{t.text}"
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                        {[...Array(5 - t.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-gray-200" />
                        ))}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-400">
                        <span>Verified</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}