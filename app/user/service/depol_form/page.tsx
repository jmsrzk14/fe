'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Calendar, 
  FileText, 
  MapPin, 
  User, 
  Building, 
  Upload, 
  Check,
  Clock,
  CalendarDays,
  Clipboard,
  ClipboardCheck,
  CheckCircle,
  X,
  Eye,
  Share2,
  Phone,
  Mail,
  Users,
  Download,
  Dumbbell,
  CalendarRange
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

export default function DepolForm() {
  // State untuk form
  const [selectedDates, setSelectedDates] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });
  
  const [isUrgent, setIsUrgent] = useState<string>("tidak");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const router = useRouter();

  // Handler untuk file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  // Handler untuk form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form berhasil dikirim! Sistem akan segera memproses permintaan Anda.");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#2563eb] to-[#3b82f6] relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
          <div className="absolute top-20 right-32 w-16 h-16 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 bg-white/5 rounded-full"></div>
        </div>

        {/* Institution Logo */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Dumbbell className="w-6 h-6 text-white" />
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
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ● FORMULIR
                  </span>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Eye className="w-4 h-4" />
                    <span>89</span>
                    <Share2 className="w-4 h-4 ml-2" />
                    <span>12</span>
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Form Peminjaman Peralatan Olahraga
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-green-500" />
                    <span>Departemen Olahraga</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>Mohon diisi dengan lengkap</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inventaris Olahraga dan Peminjam */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <Dumbbell className="mr-2 h-5 w-5 text-green-500" />
                      Peralatan Olahraga
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bola-basket">Bola Basket</Label>
                        <Input id="bola-basket" type="number" min="0" placeholder="0" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="bola-voli">Bola Voli</Label>
                        <Input id="bola-voli" type="number" min="0" placeholder="0" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="bola-sepak">Bola Sepak</Label>
                        <Input id="bola-sepak" type="number" min="0" placeholder="0" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="raket-bulutangkis">Raket Bulutangkis</Label>
                        <Input id="raket-bulutangkis" type="number" min="0" placeholder="0" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="kok-bulutangkis">Kok Bulutangkis (tabung)</Label>
                        <Input id="kok-bulutangkis" type="number" min="0" placeholder="0" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="net-bulutangkis">Net Bulutangkis</Label>
                        <Input id="net-bulutangkis" type="number" min="0" placeholder="0" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="bet-pingpong">Bet Pingpong</Label>
                        <Input id="bet-pingpong" type="number" min="0" placeholder="0" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="bola-pingpong">Bola Pingpong (set)</Label>
                        <Input id="bola-pingpong" type="number" min="0" placeholder="0" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="cone">Cone Latihan</Label>
                        <Input id="cone" type="number" min="0" placeholder="0" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="stopwatch">Stopwatch</Label>
                        <Input id="stopwatch" type="number" min="0" placeholder="0" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="jersey-basket">Jersey Basket (set)</Label>
                        <Input id="jersey-basket" type="number" min="0" placeholder="0" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="jersey-futsal">Jersey Futsal (set)</Label>
                        <Input id="jersey-futsal" type="number" min="0" placeholder="0" className="mt-1" />
                      </div>
                    </div>
                    <p className="text-green-600 text-sm mt-4 mb-0 italic">
                      Peralatan lain (sebutkan pada tujuan kegiatan)
                    </p>
                  </section>

                  {/* Tujuan Kegiatan */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <FileText className="mr-2 h-5 w-5 text-green-500" />
                      Tujuan Kegiatan
                    </h2>
                    <Input placeholder="Contoh: Latihan tim basket untuk persiapan kompetisi kampus" />
                  </section>

                  {/* Lokasi Penggunaan */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <MapPin className="mr-2 h-5 w-5 text-green-500" />
                      Lokasi Penggunaan
                    </h2>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="loc-lap-basket" />
                        <label htmlFor="loc-lap-basket" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Lapangan Basket
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="loc-lap-voli" />
                        <label htmlFor="loc-lap-voli" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Lapangan Voli
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="loc-lap-futsal" />
                        <label htmlFor="loc-lap-futsal" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Lapangan Futsal
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="loc-hall-olahraga" />
                        <label htmlFor="loc-hall-olahraga" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Hall Olahraga
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="loc-luar-kampus" />
                        <label htmlFor="loc-luar-kampus" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Luar Kampus
                        </label>
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="lokasi-lainnya">Lokasi lainnya (jika ada)</Label>
                      <Input id="lokasi-lainnya" placeholder="Sebutkan lokasi penggunaan jika tidak tercantum di atas" className="mt-1" />
                    </div>
                  </section>

                  {/* PIC Penanggung Jawab Peminjaman */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <User className="mr-2 h-5 w-5 text-green-500" />
                      PIC Penanggung Jawab Peminjaman
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label htmlFor="nim">NIM</Label>
                        <Input id="nim" placeholder="Masukkan NIM" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="nama">Nama</Label>
                        <Input id="nama" placeholder="Masukkan nama lengkap" className="mt-1" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="prodi">Prodi</Label>
                      <select 
                        id="prodi" 
                        className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value="" disabled selected>Please Select</option>
                        <option value="d3ti">D3 Teknologi Informasi</option>
                        <option value="d4trpl">D4 Teknologi Rekayasa Perangkat Lunak</option>
                        <option value="s1if">S1 Informatika</option>
                        <option value="s1si">S1 Sistem Informasi</option>
                        <option value="s1te">S1 Teknik Elektro</option>
                        <option value="s1mr">S1 Manajemen Rekayasa</option>
                        <option value="s1bp">S1 Bioproses</option>
                      </select>
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="organisasi">Organisasi/Kepanitiaan</Label>
                      <Input id="organisasi" placeholder="Contoh: UKM Basket, Panitia ITDEL Cup, dll." className="mt-1" />
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="Masukkan email" className="mt-1" />
                    </div>
                    <div className="mb-4">
                      <Label htmlFor="nomor-telepon">Nomor Telepon</Label>
                      <Input id="nomor-telepon" placeholder="Masukkan nomor telepon aktif" className="mt-1" />
                    </div>
                  </section>

                  {/* Pemeriksaan Kondisi Peminjaman */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <ClipboardCheck className="mr-2 h-5 w-5 text-green-500" />
                      Pemeriksaan Kondisi Peminjaman
                    </h2>
                    <p className="mb-3">Dipinjam atas Kondisi Darurat (Urgent Peminjaman)?*</p>
                    <RadioGroup value={isUrgent} onValueChange={setIsUrgent} className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ya" id="urgent-ya" />
                        <Label htmlFor="urgent-ya">Ya</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="tidak" id="urgent-tidak" />
                        <Label htmlFor="urgent-tidak">Tidak</Label>
                      </div>
                    </RadioGroup>
                    
                    <div className="mt-4">
                      <Label htmlFor="alasan-urgensi">Alasan Urgensi (jika Ya)</Label>
                      <textarea
                        id="alasan-urgensi" 
                        placeholder="Jelaskan alasan peminjaman darurat"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none mt-1"
                        rows={3}
                        disabled={isUrgent === "tidak"}
                      />
                    </div>
                  </section>

                  {/* Tanggal dan Waktu Peminjaman */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <CalendarDays className="mr-2 h-5 w-5 text-green-500" />
                      Tanggal dan Waktu Peminjaman
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                      <div>
                        <Label htmlFor="tanggal-mulai">Tanggal peminjaman*</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal mt-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
                            >
                              <Calendar className="mr-2 h-4 w-4 text-green-500" />
                              {selectedDates.startDate ? format(selectedDates.startDate, "PPP") : <span>Pilih tanggal</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={selectedDates.startDate}
                              onSelect={(date) => setSelectedDates({...selectedDates, startDate: date})}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="tanggal-selesai">Tanggal pengembalian*</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal mt-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500"
                            >
                              <Calendar className="mr-2 h-4 w-4 text-green-500" />
                              {selectedDates.endDate ? format(selectedDates.endDate, "PPP") : <span>Pilih tanggal</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <CalendarComponent
                              mode="single"
                              selected={selectedDates.endDate}
                              onSelect={(date) => setSelectedDates({...selectedDates, endDate: date})}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="waktu-mulai">Waktu peminjaman*</Label>
                        <Input id="waktu-mulai" type="time" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="waktu-selesai">Waktu pengembalian*</Label>
                        <Input id="waktu-selesai" type="time" className="mt-1" />
                      </div>
                    </div>
                  </section>

                  {/* Foto KTM Penanggung Jawab */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <Upload className="mr-2 h-5 w-5 text-green-500" />
                      Foto KTM Penanggung Jawab
                    </h2>
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6">
                      <Upload className="h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 mb-1">Upload foto KTM yang jelas dan tidak buram</p>
                      <p className="text-xs text-gray-400">Format: JPG, PNG maks 5MB</p>
                      <input 
                        type="file" 
                        ref={fileInputRef}
                        className="hidden" 
                        onChange={handleFileChange}
                        accept=".jpg,.jpeg,.png"
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        type="button"
                        className="mt-4 rounded-lg border-gray-300 hover:bg-gray-50"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Pilih File
                      </Button>
                      {uploadedFileName && (
                        <div className="mt-2 text-sm text-green-600 flex items-center">
                          <Check className="h-4 w-4 mr-1" /> {uploadedFileName}
                        </div>
                      )}
                    </div>
                  </section>

                  {/* Pernyataan Tanggung Jawab */}
                  <section className="bg-green-50 rounded-lg shadow-sm p-6">
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
                          <p className="font-medium">Pernyataan Tanggung Jawab</p>
                        </Label>
                        <p className="text-gray-600 text-xs mt-1">
                          Saya menyatakan bahwa saya bertanggung jawab untuk mengembalikan peralatan olahraga yang dipinjam di atas dalam kondisi
                          yang sama saat dipinjam pada waktu yang telah ditentukan. Bila terjadi kerusakan atau kehilangan akan ditanggung
                          oleh peminjam sesuai peraturan. Saya menyetujui persyaratan ini dan semua peraturan yang berlaku untuk peminjaman
                          peralatan olahraga Departemen Olahraga IT Del.
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <Button 
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-2 rounded-lg"
                      disabled={!agreeToTerms}
                    >
                      Ajukan Peminjaman
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Persyaratan Peminjaman */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <ClipboardCheck className="w-5 h-5 text-green-500" />
                  Persyaratan Peminjaman
                </h3>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                    <p className="text-green-700 font-medium text-sm">Penting!</p>
                    <p className="text-green-600 text-xs mt-1">Peminjaman harus dilakukan minimal 3 hari sebelum tanggal penggunaan</p>
                  </div>
                  
                  <ul className="space-y-2">
                    {[
                      "Merupakan mahasiswa aktif IT Del",
                      "Mengisi formulir dengan data yang benar dan lengkap",
                      "Melampirkan surat keterangan dari organisasi (jika atas nama organisasi)",
                      "Memiliki kartu identitas yang masih berlaku",
                      "Bertanggung jawab penuh atas barang yang dipinjam",
                      "Mengembalikan tepat waktu sesuai jadwal pengembalian"
                    ].map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="text-xs text-gray-500 italic mt-2">
                    Kegagalan memenuhi persyaratan di atas dapat mengakibatkan penolakan peminjaman.
                  </div>
                </div>
              </div>

              {/* Jadwal Kegiatan Olahraga */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <CalendarRange className="w-5 h-5 text-green-500" />
                  Jadwal Kegiatan Olahraga
                </h3>
                <div className="space-y-3">
                  <div className="border-l-4 border-green-500 pl-3 py-2">
                    <p className="text-sm font-medium text-gray-800">Latihan Basket Reguler</p>
                    <p className="text-xs text-gray-500">Senin & Rabu, 16:00 - 18:00</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3 py-2">
                    <p className="text-sm font-medium text-gray-800">Latihan Futsal Putra</p>
                    <p className="text-xs text-gray-500">Selasa & Jumat, 16:00 - 18:00</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3 py-2">
                    <p className="text-sm font-medium text-gray-800">Latihan Voli Putri</p>
                    <p className="text-xs text-gray-500">Selasa & Kamis, 16:00 - 18:00</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3 py-2">
                    <p className="text-sm font-medium text-gray-800">Turnamen ITDEL Cup</p>
                    <p className="text-xs text-gray-500">15-30 Oktober 2025</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-500" />
                  Kontak Penanggung Jawab
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Ahmad Suherman</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">olahraga@bemitdel.ac.id</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">081234567890</span>
                  </div>
                </div>
              </div>

              {/* Tips Sukses */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <h3 className="font-semibold">Tips Peminjaman</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p>• Pastikan semua data diisi dengan lengkap</p>
                  <p>• Periksa jadwal kegiatan olahraga kampus</p>
                  <p>• Hindari peminjaman bentrok dengan jadwal tetap</p>
                  <p>• Cek kondisi peralatan saat peminjaman dan pengembalian</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Panduan Olahraga
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[#2563eb] to-[#3b82f6] text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center items-center space-x-2 mb-2">
            <img src="/bem.png" alt="BEM IT Del Logo" className="h-6" />
            <span className="font-semibold">BEM IT Del - Departemen Olahraga</span>
          </div>
          <p className="text-xs text-blue-200">© 2025 BEM IT Del. Hak cipta dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
