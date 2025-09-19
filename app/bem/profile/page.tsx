"use client";
import { useState } from "react";
import { User, Mail, BookOpen, Calendar, Shield, Camera, Linkedin, MessageCircle, Instagram, Save, Edit2 } from "lucide-react";

interface UserProfile {
  username: string;
  nama: string;
  nim: string;
  gmail: string;
  programStudi: string;
  angkatan: string;
  status: string;
  gambar: File | null;
  linkedin: string;
  wa: string;
  ig: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile>({
    username: "john_doe123",
    nama: "John Doe Sitompul",
    nim: "11S21001",
    gmail: "john.doe@student.del.ac.id",
    programStudi: "Teknik Informatika",
    angkatan: "2021",
    status: "Anggota Aktif",
    gambar: null,
    linkedin: "https://linkedin.com/in/johndoe",
    wa: "081234567890",
    ig: "@johndoe_del"
  });

  const handleInputChange = (field: keyof UserProfile, value: string | File | null) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    
    // Handle image preview
    if (field === "gambar" && value instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(value);
    }
  };

  const handleSave = () => {
    // TODO: Implement save functionality to backend
    console.log("Saving profile:", profile);
    setIsEditing(false);
    alert("Profile berhasil disimpan!");
  };

  const statusOptions = [
    "Anggota Aktif",
    "Pengurus",
    "Alumni",
    "Calon Anggota"
  ];

  const programStudiOptions = [
    "Teknik Informatika",
    "Sistem Informasi",
    "Teknik Elektro",
    "Manajemen Rekayasa Industri",
    "Teknik Bioproses"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-4 md:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Floating Sparkles */}
        <div className="sparkle sparkle-1"></div>
        <div className="sparkle sparkle-2"></div>
        <div className="sparkle sparkle-3"></div>
        <div className="sparkle sparkle-4"></div>
        <div className="sparkle sparkle-5"></div>
      </div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-t-4 border-[#ffd700] animate-fade-in-down hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-102 bg-gradient-to-r from-white to-blue-50/30">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-blue-600 ">Profil BEM User</h1>
              <p className="text-gray-600 mt-2 animate-fade-in animate-typewriter">Kelola informasi profil BEM IT Del Anda</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-500 border-2 transform hover:scale-105 active:scale-95 relative overflow-hidden group ${
                isEditing 
                  ? 'bg-gray-500 text-white hover:bg-gray-600 shadow-lg border-gray-500' 
                  : 'bg-[#ffd700] text-blue-600 border-[#ffd700] hover:bg-yellow-400 hover:border-yellow-400 shadow-lg hover:shadow-2xl animate-pulse-subtle hover:shadow-yellow-300/50'
              }`}
            >
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              <Edit2 size={20} className="animate-spin-on-hover" />
              {isEditing ? 'Batal Edit' : 'Edit Profil'}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Picture Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-[#ffd700] animate-fade-in-left hover:shadow-2xl transition-all duration-500 hover:border-l-8 hover:transform hover:scale-102 bg-gradient-to-br from-white to-yellow-50/30">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Camera size={24} className="text-[#ffd700] animate-wiggle hover:animate-bounce" />
                <span className="animate-slide-in-left">Foto Profil</span>
              </h2>
              
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 group">
                  {previewImage ? (
                    <img 
                      src={previewImage} 
                      alt="Profile" 
                      className="w-full h-full rounded-full object-cover border-4 border-[#ffd700] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-[#ffd700] flex items-center justify-center text-white text-2xl font-bold shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 animate-float">
                      {profile.nama.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                  )}
                </div>
                
                {isEditing && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleInputChange("gambar", e.target.files?.[0] || null)}
                      className="hidden"
                      id="profile-image"
                    />
                    <label 
                      htmlFor="profile-image" 
                      className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffd700] text-blue-600 border-2 border-[#ffd700] rounded-lg hover:bg-yellow-400 hover:border-yellow-400 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 animate-bounce-on-hover"
                    >
                      <Camera size={16} />
                      Ubah Foto
                    </label>
                    <p className="text-xs text-gray-500 mt-2">Max 5MB, format JPG/PNG</p>
                  </div>
                )}
              </div>

              {/* Quick Info */}
              <div className="mt-6 space-y-3">
                <div className="text-center">
                  <h3 className="font-bold text-gray-800">{profile.nama}</h3>
                  <p className="text-gray-600">@{profile.username}</p>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-yellow-50 rounded-lg p-3 border border-[#ffd700]/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Status:</span>
                    <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                      profile.status === 'Anggota Aktif' ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-700' :
                      profile.status === 'Pengurus' ? 'bg-gradient-to-r from-blue-100 to-[#ffd700]/20 text-blue-700' :
                      profile.status === 'Alumni' ? 'bg-gradient-to-r from-purple-100 to-purple-200 text-purple-700' :
                      'bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700'
                    }`}>
                      {profile.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 border-r-4 border-blue-600 animate-fade-in-right">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <User size={24} className="text-blue-600 animate-wiggle" />
                <span className="text-blue-600">Informasi Pribadi</span>
              </h2>

              <div className="space-y-6 animate-stagger-children">
                {/* Username */}
                <div className="animate-slide-in-up">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <User size={16} className="inline mr-2 text-[#ffd700] animate-spin-slow" />
                    Username
                  </label>
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(e) => handleInputChange("username", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 ${
                      isEditing 
                        ? 'border-[#ffd700] bg-white focus:ring-2 focus:ring-[#ffd700]/50 focus:border-blue-500' 
                        : 'border-gray-200 bg-gradient-to-r from-blue-50 to-yellow-50'
                    }`}
                    placeholder="Masukkan username"
                  />
                </div>

                {/* Nama Lengkap */}
                <div className="animate-slide-in-up animation-delay-100">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <User size={16} className="inline mr-2 text-blue-600 animate-pulse-icon" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={profile.nama}
                    onChange={(e) => handleInputChange("nama", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 ${
                      isEditing 
                        ? 'border-blue-300 bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-[#ffd700]' 
                        : 'border-gray-200 bg-gradient-to-r from-blue-50 to-yellow-50'
                    }`}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>

                {/* NIM */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <BookOpen size={16} className="inline mr-2 text-[#ffd700]" />
                    NIM (Nomor Induk Mahasiswa)
                  </label>
                  <input
                    type="text"
                    value={profile.nim}
                    onChange={(e) => handleInputChange("nim", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 ${
                      isEditing 
                        ? 'border-[#ffd700] bg-white focus:ring-2 focus:ring-[#ffd700]/50 focus:border-blue-500' 
                        : 'border-gray-200 bg-gradient-to-r from-blue-50 to-yellow-50'
                    }`}
                    placeholder="Contoh: 11S21001"
                  />
                </div>

                {/* Gmail */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <Mail size={16} className="inline mr-2 text-blue-600" />
                    Gmail/Email Institusi
                  </label>
                  <input
                    type="email"
                    value={profile.gmail}
                    onChange={(e) => handleInputChange("gmail", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-xl transition-all duration-300 ${
                      isEditing 
                        ? 'border-blue-300 bg-white focus:ring-2 focus:ring-blue-500/50 focus:border-[#ffd700]' 
                        : 'border-gray-200 bg-gradient-to-r from-blue-50 to-yellow-50'
                    }`}
                    placeholder="nama@student.del.ac.id"
                  />
                </div>

                {/* Program Studi & Angkatan */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <BookOpen size={16} className="inline mr-2" />
                      Program Studi
                    </label>
                    <select
                      value={profile.programStudi}
                      onChange={(e) => handleInputChange("programStudi", e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300 transition-colors ${
                        isEditing 
                          ? 'border-blue-300 bg-white hover:border-yellow-400' 
                          : 'border-blue-200 bg-blue-50'
                      }`}
                    >
                      {programStudiOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      <Calendar size={16} className="inline mr-2" />
                      Angkatan
                    </label>
                    <input
                      type="text"
                      value={profile.angkatan}
                      onChange={(e) => handleInputChange("angkatan", e.target.value)}
                      disabled={!isEditing}
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300 transition-colors ${
                        isEditing 
                          ? 'border-blue-300 bg-white hover:border-yellow-400' 
                          : 'border-blue-200 bg-blue-50'
                      }`}
                      placeholder="2021"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    <Shield size={16} className="inline mr-2" />
                    Status BEM
                  </label>
                  <select
                    value={profile.status}
                    onChange={(e) => handleInputChange("status", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300 transition-colors ${
                      isEditing 
                        ? 'border-blue-300 bg-white hover:border-yellow-400' 
                        : 'border-blue-200 bg-blue-50'
                    }`}
                  >
                    {statusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                {/* Social Media */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Media Sosial & Kontak</h3>
                  
                  <div className="space-y-4">
                    {/* LinkedIn */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        <Linkedin size={16} className="inline mr-2 text-blue-500" />
                        LinkedIn
                      </label>
                      <input
                        type="url"
                        value={profile.linkedin}
                        onChange={(e) => handleInputChange("linkedin", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300 transition-colors ${
                          isEditing 
                            ? 'border-blue-300 bg-white hover:border-yellow-400' 
                            : 'border-blue-200 bg-blue-50'
                        }`}
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        <MessageCircle size={16} className="inline mr-2 text-yellow-500" />
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        value={profile.wa}
                        onChange={(e) => handleInputChange("wa", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300 transition-colors ${
                          isEditing 
                            ? 'border-blue-300 bg-white hover:border-yellow-400' 
                            : 'border-blue-200 bg-blue-50'
                        }`}
                        placeholder="081234567890"
                      />
                    </div>

                    {/* Instagram */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        <Instagram size={16} className="inline mr-2 text-blue-500" />
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={profile.ig}
                        onChange={(e) => handleInputChange("ig", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-yellow-300 transition-colors ${
                          isEditing 
                            ? 'border-blue-300 bg-white hover:border-yellow-400' 
                            : 'border-blue-200 bg-blue-50'
                        }`}
                        placeholder="username"
                      />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                  <div className="pt-6 border-t">
                    <button
                      onClick={handleSave}
                      className="w-full bg-[#ffd700] text-blue-600 border-2 border-[#ffd700] py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:bg-yellow-400 hover:border-yellow-400 hover:shadow-xl transform hover:scale-105 active:scale-95 animate-pulse-button"
                    >
                      <Save size={20} />
                      Simpan Perubahan
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes wiggle {
          0%, 100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(-5deg);
          }
          75% {
            transform: rotate(5deg);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-fade-in-down {
          animation: fade-in-down 0.6s ease-out;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.6s ease-out 0.2s both;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.6s ease-out 0.4s both;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out 0.3s both;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.5s ease-out;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-pulse-icon {
          animation: pulse-subtle 1.5s ease-in-out infinite;
        }
        
        .animate-pulse-button {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
        
        .animate-bounce-on-hover:hover {
          animation: bounce-subtle 0.6s ease-in-out;
        }
        
        .animate-stagger-children > * {
          animation-delay: calc(var(--stagger) * 100ms);
        }
        
        .animation-delay-100 {
          animation-delay: 100ms;
        }
      `}</style>
    </div>
  );
}
