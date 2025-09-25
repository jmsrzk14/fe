"use client";
import { useState, useEffect } from "react";
import { User, Mail, BookOpen, Calendar, Shield, Camera, Linkedin, MessageCircle, Instagram, Save, Edit2 } from "lucide-react";
import axios from "axios";

interface UserProfile {
  user_id: string;
  username: string;
  name: string;
  nim: string;
  email: string;
  study_program: string;
  year_enrolled: string;
  status: string;
  image: File | null;
  linkedin: string;
  wa: string;
  ig: string;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  // Load data profile dari database by user_id
  useEffect(() => {
    if (!token) return;

    axios
      .get("http://localhost:8080/api/student/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setProfile(res.data))
      .catch((err) => console.error("Gagal ambil profil:", err));
  }, [token]);

  const handleInputChange = (field: keyof UserProfile, value: string | File | null) => {
    if (!profile) return;
    setProfile((prev) => prev ? { ...prev, [field]: value } : null);

    // Preview image
    if (field === "image" && value instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewImage(e.target?.result as string);
      reader.readAsDataURL(value);
    }
  };

  const handleSave = () => {
    if (!profile) return;

    const formData = new FormData();
    Object.entries(profile).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as any);
      }
    });

    axios
      .put(`http://localhost:5000/api/profile/${profile.user_id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Profil berhasil disimpan!");
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Gagal simpan profil:", err);
      });
  };

  if (!profile) {
    return <div className="p-6 text-center">Loading profil...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-8 relative overflow-hidden">
      {/* Beautiful Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-blue-200/10 to-indigo-300/12 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-gradient-to-br from-purple-200/10 to-pink-200/10 rounded-lg rotate-45 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-20 w-16 h-16 bg-gradient-to-br from-indigo-200/8 to-blue-200/8 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-32 w-28 h-28 bg-gradient-to-br from-pink-100/6 to-purple-100/6 rounded-2xl rotate-12 animate-float" style={{ animationDelay: '0.5s' }}></div>

        {/* Gradient Circles */}
        <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-gradient-to-r from-blue-100/8 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-gradient-to-r from-purple-100/8 to-transparent rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Modern Header */}
        <div className="glass-effect rounded-2xl shadow-xl p-6 mb-8 border border-white/40 hover-lift animate-fade-up">
          <div className="flex justify-between items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-300/15 to-purple-300/10 rounded-lg blur opacity-40"></div>
              <div className="relative">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                  Profil Pengurus
                </h1>
                <p className="text-neutral-600 mt-2">Kelola informasi profil Anda dengan mudah</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`relative flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 overflow-hidden group animate-bounce-in hover-glow ${isEditing
                ? 'bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg animate-wiggle'
                : 'bg-gradient-to-r from-yellow-400 via-blue-500 to-indigo-700 text-white hover:from-yellow-500 hover:to-indigo-800 shadow-lg hover:shadow-yellow-400/20 animate-rainbow'
                } animate-fadeInUp`}
              style={{ animationDelay: '0.4s' }}
            >
              {/* Button Shimmer Effect */}
              <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Edit2 size={20} className="relative z-10 animate-heartbeat" />
              <span className="relative z-10">{isEditing ? 'Batal Edit' : 'Edit Profil'}</span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Picture Section - Enhanced */}
          <div className="lg:col-span-1">
            <div className="glass-effect rounded-2xl shadow-xl p-6 border border-white/40 hover-lift animate-slide-left hover-shadow animate-bounce-in relative overflow-hidden" style={{ animationDelay: '0.6s' }}>
              {/* Decorative Elements dengan warna biru-ungu yang cantik */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-200/6 to-indigo-200/6 rounded-full blur-xl animate-glow"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-br from-purple-200/6 to-pink-200/6 rounded-full blur-xl animate-pulse-soft"></div>

              <div className="relative z-10">
                <h2 className="text-xl font-bold text-neutral-700 mb-6 flex items-center gap-3 animate-typewriter">
                  <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg animate-wiggle">
                    <Camera size={20} className="text-white animate-heartbeat" />
                  </div>
                  <span>Foto Profil</span>
                </h2>

                <div className="text-center">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    {/* Profile Image Container dengan warna biru yang cantik */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full p-1 animate-pulse-soft">
                      <div className="w-full h-full bg-white rounded-full p-1">
                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center text-white text-xl font-bold shadow-inner">
                            {profile.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Floating Camera Icon untuk Edit dengan warna cantik */}
                    {isEditing && (
                      <label
                        htmlFor="profile-image"
                        className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 text-white rounded-full flex items-center justify-center cursor-pointer hover:from-rose-500 hover:to-pink-600 transition-all duration-300 shadow-lg transform hover:scale-110"
                      >
                        <Camera size={18} />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleInputChange("image", e.target.files?.[0] || null)}
                          className="hidden"
                          id="profile-image"
                        />
                      </label>
                    )}
                  </div>

                  {isEditing && (
                    <p className="text-xs text-slate-500 bg-slate-50 rounded-lg p-2 border border-slate-200">
                      Max 5MB, format JPG/PNG
                    </p>
                  )}
                </div>

                {/* Enhanced Quick Info dengan warna warm */}
                <div className="mt-8 space-y-4">
                  <div className="text-center p-4 bg-gradient-to-r from-stone-50 to-neutral-50 rounded-xl border border-stone-200">
                    <h3 className="font-bold text-neutral-800 text-lg">{profile.name}</h3>
                    <p className="text-neutral-600">@{profile.username}</p>
                  </div>

                  <div className="bg-white/85 backdrop-blur-sm rounded-xl p-4 border border-white/60 shadow-inner">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-600 font-medium">Status:</span>
                      <span className={`font-semibold px-3 py-1 rounded-full text-xs shadow-sm ${profile.status === 'Aktif' ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border border-emerald-200' :
                        profile.status === 'Pengurus' ? 'bg-gradient-to-r from-sky-100 to-blue-100 text-sky-700 border border-sky-200' :
                          profile.status === 'Alumni' ? 'bg-gradient-to-r from-stone-100 to-neutral-100 text-stone-700 border border-stone-200' :
                            'bg-gradient-to-r from-rose-100 to-pink-100 text-rose-700 border border-rose-200'
                        }`}>
                        {profile.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Profile Form Section */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-2xl shadow-xl p-8 border border-white/40 hover-lift animate-slide-right hover-shadow animate-bounce-in relative overflow-hidden" style={{ animationDelay: '0.8s' }}>
              {/* Decorative Background dengan warna biru-ungu yang cantik */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-200/4 to-indigo-200/4 rounded-full blur-2xl animate-pulse-soft"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-purple-200/4 to-pink-200/4 rounded-full blur-2xl animate-glow"></div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 animate-typewriter">
                  <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg animate-wiggle">
                    <User size={24} className="text-white animate-heartbeat" />
                  </div>
                  <span className="bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent">
                    Informasi Pribadi
                  </span>
                </h2>

                <div className="space-y-6">
                  {/* Username dengan warna cantik */}
                  <div className="group hover-scale">{/* Decorative Background dengan warna biru-ungu yang cantik */}
                    <label className="block text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                      <div className="p-1 bg-gradient-to-br from-blue-400 to-indigo-500 rounded">
                        <User size={14} className="text-white" />
                      </div>
                      Username
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profile.username}
                        onChange={(e) => handleInputChange("username", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${isEditing
                          ? 'border-blue-200 bg-white focus:border-blue-300 focus:ring-4 focus:ring-blue-100 hover:border-blue-250'
                          : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-neutral-600'
                          }`}
                        placeholder="Masukkan username"
                      />
                      {isEditing && (
                        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      )}
                    </div>
                  </div>

                  {/* Nama Lengkap */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                      <div className="p-1 bg-gradient-to-br from-indigo-500 to-purple-600 rounded">
                        <User size={14} className="text-white" />
                      </div>
                      Nama Lengkap
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${isEditing
                          ? 'border-indigo-200 bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 hover:border-indigo-250'
                          : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-neutral-600'
                          }`}
                        placeholder="Masukkan name lengkap"
                      />
                      {isEditing && (
                        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-indigo-400 to-purple-500 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      )}
                    </div>
                  </div>

                  {/* NIM */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-neutral-700 mb-3 flex items-center gap-2">
                      <div className="p-1 bg-gradient-to-br from-purple-500 to-pink-600 rounded">
                        <BookOpen size={14} className="text-white" />
                      </div>
                      NIM (Nomor Induk Mahasiswa)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profile.nim}
                        onChange={(e) => handleInputChange("nim", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${isEditing
                          ? 'border-purple-200 bg-white focus:border-purple-300 focus:ring-4 focus:ring-purple-100 hover:border-purple-250'
                          : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-neutral-600'
                          }`}
                        placeholder="Contoh: 11S21001"
                      />
                      {isEditing && (
                        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-purple-400 to-pink-500 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      )}
                    </div>
                  </div>

                  {/* Gmail */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <div className="p-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded">
                        <Mail size={14} className="text-white" />
                      </div>
                      Gmail/Email Institusi
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${isEditing
                          ? 'border-blue-200 bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 hover:border-blue-300'
                          : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-neutral-600'
                          }`}
                        placeholder="name@student.del.ac.id"
                      />
                      {isEditing && (
                        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      )}
                    </div>
                  </div>

                  {/* Program Studi & Angkatan */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <div className="p-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded">
                          <BookOpen size={14} className="text-white" />
                        </div>
                        Program Studi
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={profile.study_program}
                          onChange={(e) => handleInputChange("study_program", e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${isEditing
                            ? 'border-blue-200 bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 hover:border-blue-300'
                            : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-neutral-600'
                            }`}
                          placeholder="name@student.del.ac.id"
                        />
                        {isEditing && (
                          <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        )}
                      </div>
                    </div>

                    <div className="group">
                      <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                        <div className="p-1 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded">
                          <Calendar size={14} className="text-blue-900" />
                        </div>
                        Angkatan
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={profile.year_enrolled}
                          onChange={(e) => handleInputChange("year_enrolled", e.target.value)}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${isEditing
                            ? 'border-yellow-200 bg-white focus:border-yellow-400 focus:ring-4 focus:ring-yellow-100 hover:border-yellow-300'
                            : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-neutral-600'
                            }`}
                          placeholder="2021"
                        />
                        {isEditing && (
                          <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="group">
                    <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                      <div className="p-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded">
                        <Shield size={14} className="text-white" />
                      </div>
                      Status
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={profile.status}
                        onChange={(e) => handleInputChange("status", e.target.value)}
                        disabled={!isEditing}
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${isEditing
                          ? 'border-blue-200 bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 hover:border-blue-300'
                          : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-neutral-600'
                          }`}
                        placeholder="name@student.del.ac.id"
                      />
                      {isEditing && (
                        <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced Social Media Section dengan BEM Colors */}
                  <div className="border-t-2 border-gradient-to-r from-blue-200 to-yellow-200 pt-8 mt-8">
                    <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl shadow-lg">
                        <MessageCircle size={20} className="text-blue-900" />
                      </div>
                      <span className="bg-gradient-to-r from-yellow-600 to-slate-700 bg-clip-text text-transparent">
                        Media Sosial & Kontak
                      </span>
                    </h3>

                    <div className="space-y-6">
                      {/* LinkedIn */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <div className="p-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded">
                            <Linkedin size={14} className="text-white" />
                          </div>
                          LinkedIn
                        </label>
                        <div className="relative">
                          <input
                            type="url"
                            value={profile.linkedin}
                            onChange={(e) => handleInputChange("linkedin", e.target.value)}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${isEditing
                              ? 'border-blue-200 bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 hover:border-blue-300'
                              : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-neutral-600'
                              }`}
                            placeholder="https://linkedin.com/in/username"
                          />
                          {isEditing && (
                            <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          )}
                        </div>
                      </div>

                      {/* WhatsApp dengan warna hijau BEM */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <div className="p-1 bg-gradient-to-br from-green-500 to-green-600 rounded">
                            <MessageCircle size={14} className="text-white" />
                          </div>
                          WhatsApp
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={profile.wa}
                            onChange={(e) => handleInputChange("wa", e.target.value)}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${isEditing
                              ? 'border-green-200 bg-white focus:border-green-400 focus:ring-4 focus:ring-green-100 hover:border-green-300'
                              : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-neutral-600'
                              }`}
                            placeholder="081234567890"
                          />
                          {isEditing && (
                            <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-green-400 to-green-600 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          )}
                        </div>
                      </div>

                      {/* Instagram */}
                      <div className="group">
                        <label className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                          <div className="p-1 bg-gradient-to-br from-blue-500 to-blue-600 rounded">
                            <Instagram size={14} className="text-white" />
                          </div>
                          Instagram
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={profile.ig}
                            onChange={(e) => handleInputChange("ig", e.target.value)}
                            disabled={!isEditing}
                            className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${isEditing
                              ? 'border-blue-200 bg-white focus:border-blue-400 focus:ring-4 focus:ring-blue-100 hover:border-blue-300'
                              : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 text-neutral-600'
                              }`}
                            placeholder="@username"
                          />
                          {isEditing && (
                            <div className="absolute inset-y-0 right-0 w-1 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Save Button dengan warna cantik */}
                  {isEditing && (
                    <div className="pt-8 border-t-2 border-gradient-to-r from-blue-200 via-yellow-200 to-pink-200 mt-8 animate-fadeInUp">
                      <button
                        onClick={handleSave}
                        className="w-full py-4 px-8 rounded-xl font-bold text-lg bg-gradient-to-r from-blue-500 via-yellow-400 to-pink-500 text-white shadow-2xl hover:from-blue-600 hover:via-yellow-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 relative overflow-visible group animate-float hover-glow animate-rainbow"
                        style={{ boxShadow: '0 0 32px 0 rgba(80,80,255,0.15), 0 0 0 4px rgba(255,255,255,0.2)' }}
                      >
                        {/* Particle Animation */}
                        <span className="absolute left-6 top-2 w-2 h-2 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-full opacity-70 animate-float animate-wiggle" style={{ animationDuration: '7s', animationDelay: '0.2s' }}></span>
                        <span className="absolute right-8 top-3 w-1.5 h-1.5 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-60 animate-float animate-bounce-in" style={{ animationDuration: '8s', animationDelay: '0.7s' }}></span>
                        <span className="absolute left-12 bottom-2 w-1.5 h-1.5 bg-gradient-to-br from-yellow-200 to-pink-200 rounded-full opacity-50 animate-float animate-heartbeat" style={{ animationDuration: '6s', animationDelay: '1.1s' }}></span>
                        {/* Holographic shimmer */}
                        <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2 animate-fadeInUp">
                          <Save size={22} className="inline-block animate-float animate-wiggle" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
                          Simpan Perubahan
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modern CSS Styling */}
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
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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
        
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
        
        .animate-fade-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .animate-slide-left {
          animation: slideInLeft 0.7s ease-out;
        }
        
        .animate-slide-right {
          animation: slideInRight 0.7s ease-out;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-pulse-soft {
          animation: pulse 3s ease-in-out infinite;
        }
        
        .shimmer-effect {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
        }
        
        .hover-lift {
          transition: all 0.3s ease;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
        
        .gradient-border {
          background: linear-gradient(45deg, #3b82f6, #f59e0b, #3b82f6);
          background-size: 200% 200%;
          animation: shimmer 3s ease infinite;
        }
      `}</style>
    </div>
  );
}
