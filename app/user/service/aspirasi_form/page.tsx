'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  Building, 
  Clock,
  CheckCircle,
  X,
  Eye,
  Share2,
  Phone,
  Mail,
  Download,
  MessageSquare,
  LightbulbIcon,
  Clipboard,
  ClipboardCheck,
  Users,
  MessagesSquare,
  Tag,
  Shield,
  AlertCircle,
  Info
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export default function AspirasiForm() {
  // State untuk form
  const [kategoriAspirasi, setKategoriAspirasi] = useState<string>("fasilitas");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const router = useRouter();



  // Handler untuk form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Aspirasi berhasil dikirim! Terima kasih atas partisipasinya.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute top-20 right-32 w-16 h-16 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full"></div>
        </div>

        {/* Institution Logo */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <MessagesSquare className="w-6 h-6 text-white" />
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          {/* Back Button */}
          <Link 
            href="/user/service"
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Layanan</span>
          </Link>

          {/* Main Content Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ● FORMULIR
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span>67</span>
                    <Share2 className="w-4 h-4 ml-2" />
                    <span>8</span>
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Form Aspirasi Mahasiswa
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-500" />
                    <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-purple-500" />
                    <span>Badan Eksekutif Mahasiswa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>Mohon diisi dengan lengkap</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Kategori Aspirasi */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <Tag className="mr-2 h-5 w-5 text-purple-500" />
                      Kategori Aspirasi
                    </h2>

                    <RadioGroup value={kategoriAspirasi} onValueChange={setKategoriAspirasi} className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="fasilitas" id="kategori-fasilitas" />
                        <Label htmlFor="kategori-fasilitas" className="font-medium">Fasilitas Kampus</Label>
                        <span className="text-xs text-gray-500">(Ruang kuliah, perpustakaan, laboratorium, dll)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="akademik" id="kategori-akademik" />
                        <Label htmlFor="kategori-akademik" className="font-medium">Akademik & Pembelajaran</Label>
                        <span className="text-xs text-gray-500">(Kurikulum, metode mengajar, ujian, dll)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="layanan" id="kategori-layanan" />
                        <Label htmlFor="kategori-layanan" className="font-medium">Layanan Mahasiswa</Label>
                        <span className="text-xs text-gray-500">(Administrasi, keuangan, kesehatan, dll)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="kegiatan" id="kategori-kegiatan" />
                        <Label htmlFor="kategori-kegiatan" className="font-medium">Kegiatan & Organisasi</Label>
                        <span className="text-xs text-gray-500">(UKM, BEM, himpunan, event kampus, dll)</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="lainnya" id="kategori-lainnya" />
                        <Label htmlFor="kategori-lainnya" className="font-medium">Lainnya</Label>
                      </div>
                    </RadioGroup>
                    
                    <div className="mt-4">
                      <Label htmlFor="kategori-detail">Detail kategori (opsional)</Label>
                      <Input id="kategori-detail" placeholder="Masukkan detail kategori yang lebih spesifik" className="mt-1" />
                    </div>
                  </section>

                  {/* Detail Aspirasi */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <FileText className="mr-2 h-5 w-5 text-purple-500" />
                      Detail Aspirasi
                    </h2>
                    
                    <div className="mb-4">
                      <Label htmlFor="judul-aspirasi">Judul Aspirasi*</Label>
                      <Input id="judul-aspirasi" placeholder="Contoh: Perbaikan Fasilitas Wifi di Asrama" className="mt-1" />
                    </div>
                    
                    <div className="mb-4">
                      <Label htmlFor="deskripsi-aspirasi">Deskripsi Aspirasi*</Label>
                      <Textarea 
                        id="deskripsi-aspirasi" 
                        placeholder="Jelaskan aspirasi atau masukan Anda secara detail. Sertakan fakta, pengalaman, atau data pendukung jika ada."
                        className="mt-1 min-h-32 resize-y"
                        rows={5}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <Label htmlFor="usulan-solusi">Usulan Solusi (opsional)</Label>
                      <Textarea 
                        id="usulan-solusi" 
                        placeholder="Jika Anda memiliki ide atau saran untuk menyelesaikan masalah, tuliskan di sini."
                        className="mt-1 resize-y"
                        rows={3}
                      />
                    </div>
                    
                    <div className="mb-4">
                      <Label htmlFor="manfaat">Manfaat yang Diharapkan (opsional)</Label>
                      <Textarea 
                        id="manfaat" 
                        placeholder="Jelaskan manfaat yang diharapkan jika aspirasi ini ditindaklanjuti."
                        className="mt-1 resize-y"
                        rows={3}
                      />
                    </div>
                  </section>





                  {/* Pernyataan */}
                  <section className="bg-purple-50 rounded-lg shadow-sm p-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex h-6 items-center">
                        <Checkbox 
                          id="agreement" 
                          checked={agreeToTerms}
                          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                        />
                      </div>
                      <div className="text-sm leading-relaxed">
                        <Label
                          htmlFor="agreement"
                          className="text-sm font-medium text-gray-800"
                        >
                          <p className="font-medium">Pernyataan Kebenaran</p>
                        </Label>
                        <p className="text-gray-600 text-xs mt-1">
                          Saya menyatakan bahwa aspirasi/masukan yang saya sampaikan adalah benar dan dapat dipertanggungjawabkan. 
                          Saya memahami bahwa penyampaian aspirasi yang mengandung unsur SARA, ujaran kebencian, atau fitnah 
                          dapat dikenakan sanksi sesuai peraturan yang berlaku. Saya menyetujui bahwa BEM IT Del dapat menindaklanjuti 
                          aspirasi ini sesuai dengan mekanisme yang ada.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <Button 
                      type="submit"
                      className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-2 rounded-lg"
                      disabled={!agreeToTerms}
                    >
                      Kirim Aspirasi
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Informasi Layanan */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-purple-500" />
                  Informasi Layanan Aspirasi
                </h3>
                <div className="space-y-3">
                  <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                    <p className="text-purple-700 font-medium text-sm">Suara Mahasiswa Penting!</p>
                    <p className="text-purple-600 text-xs mt-1">Setiap aspirasi yang masuk akan ditinjau dalam 1-3 hari kerja</p>
                  </div>
                  
                  <ul className="space-y-2">
                    {[
                      "Aspirasi akan ditinjau oleh tim BEM terkait",
                      "Identitas pelapor dapat dirahasiakan jika diperlukan",
                      "Aspirasi yang konstruktif akan ditindaklanjuti",
                      "Proses tindak lanjut dapat dipantau melalui sistem",
                      "Harap berikan informasi yang jelas dan faktual",
                      "Hindari penggunaan bahasa yang tidak pantas"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Proses Penanganan */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-purple-500" />
                  Proses Penanganan
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-700">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">Penerimaan</p>
                      <p className="text-xs text-gray-600">Aspirasi diterima dan divalidasi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-700">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">Koordinasi</p>
                      <p className="text-xs text-gray-600">Diteruskan ke divisi terkait</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-700">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">Tindak Lanjut</p>
                      <p className="text-xs text-gray-600">Penyelesaian dan implementasi</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-purple-700">4</span>
                    </div>
                    <div>
                      <p className="font-medium text-sm text-gray-800">Feedback</p>
                      <p className="text-xs text-gray-600">Laporan hasil ke mahasiswa</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              

              {/* Tips Menyampaikan Aspirasi */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-5 h-5" />
                  <h3 className="font-semibold">Tips Menyampaikan Aspirasi</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p>• Sampaikan dengan jelas dan spesifik</p>
                  <p>• Berikan data atau fakta pendukung</p>
                  <p>• Usulkan solusi yang konstruktif</p>
                  <p>• Gunakan bahasa yang sopan dan santun</p>
                </div>
              </div>

              {/* Action Buttons */}
              
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <img src="/bem.png" alt="BEM IT Del Logo" className="h-6" />
            <span className="font-semibold">BEM IT Del - Aspirasi Mahasiswa</span>
          </div>
          <p className="text-xs text-purple-200">© 2025 BEM IT Del. Hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
