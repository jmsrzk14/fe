'use client';

import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';
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
  Eye,
  Share2,
  Phone,
  Mail
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

export default function SarprasForm() {
  // State untuk form
  const [selectedDates, setSelectedDates] = useState<{
    startDate: Date | undefined;
    endDate: Date | undefined;
  }>({
    startDate: undefined,
    endDate: undefined,
  });

  const [formData, setFormData] = useState({
    tujuanKegiatan: "",
    lokasi: "",
    nim: "",
    nama: "",
    prodi: "",
    departemen: "",
    email: "",
    teleponAktif: "",
  });

  const [isUrgent, setIsUrgent] = useState<string>("tidak");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [inventaris, setInventaris] = useState<{ id: number; name: string }[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  useEffect(() => {
    const fetchInventaris = async () => {
      try {
        const res = await fetch(`${API_URL}/item_depol`);
        const data = await res.json();
        setInventaris(data.data);
      } catch (error) {
        console.error("Gagal memuat data inventaris:", error);
      }
    };
    fetchInventaris();
  }, []);

  const handleCheckboxChange = (id: number) => {
    setSelectedItems(prev =>
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Handler untuk file upload
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    // ✅ Cek dulu apakah elemen input dan punya files
    if (
      e.target instanceof HTMLInputElement &&
      e.target.type === "file" &&
      e.target.files &&
      e.target.files.length > 0
    ) {
      setUploadedFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Pilih Barang!",
        text: "Silakan pilih setidaknya satu barang inventaris sebelum mengajukan.",
        confirmButtonColor: "#16a34a",
      });
      return;
    }

    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (!username) {
      Swal.fire({
        icon: "error",
        title: "Belum Login",
        text: "Silakan login terlebih dahulu untuk mengajukan peminjaman.",
        confirmButtonColor: "#16a34a",
      });
      router.push("/auth/login");
      return;
    }

    const form = new FormData();
    form.append("username", username);
    form.append("isUrgent", isUrgent);
    form.append("startDate", selectedDates.startDate?.toISOString() || "");
    form.append("endDate", selectedDates.endDate?.toISOString() || "");
    form.append("tujuan", formData.tujuanKegiatan);
    form.append("lokasi", formData.lokasi);
    form.append("nim", formData.nim);
    form.append("nama", formData.nama);
    form.append("prodi", formData.prodi);
    form.append("departemen", formData.departemen);
    form.append("email", formData.email);
    form.append("teleponAktif", formData.teleponAktif);
    form.append("items", JSON.stringify(selectedItems));

    if (fileInputRef.current?.files?.[0]) {
      form.append("image_ktm", fileInputRef.current.files[0]);
    }

    try {
      const res = await fetch(`${API_URL}/student/requests_depol`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      const responseText = await res.text();

      if (res.ok) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Peminjaman berhasil diajukan!",
          showConfirmButton: false,
          timer: 2000,
          timerProgressBar: true,
        });

        // Tunggu sedikit agar toast sempat tampil sebelum redirect
        setTimeout(() => {
          router.push("/departmen/request_depol");
        }, 1800);
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal Mengajukan",
          text: responseText || "Terjadi kesalahan pada server.",
          confirmButtonColor: "#16a34a",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Kesalahan!",
        text: "Terjadi kesalahan saat mengirim data.",
        confirmButtonColor: "#16a34a",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="relative overflow-hidden">
        <div className="relative z-10 container mx-auto px-4">
          {/* Main Content Container */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    ● FORMULIR
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  Form Peminjaman DEPOL BEM
                </h1>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-green-500" />
                    <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-green-500" />
                    <span>BEM IT Del</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-500" />
                    <span>Mohon diisi dengan lengkap</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inventaris dan Peminjam */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <Clipboard className="mr-2 h-5 w-5 text-green-500" />
                      Pilih Barang Inventaris
                    </h2>

                    {inventaris.length === 0 ? (
                      <p className="text-gray-500 text-sm italic">Memuat data inventaris...</p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {inventaris.map((item) => (
                          <div key={item.id} className="flex items-center space-x-2 border p-2 rounded-md hover:bg-gray-50 transition">
                            <Checkbox
                              id={`inventaris-${item.id}`}
                              checked={selectedItems.includes(item.id)}
                              onCheckedChange={() => handleCheckboxChange(item.id)}
                            />
                            <Label htmlFor={`inventaris-${item.id}`} className="text-gray-700 text-sm">
                              {item.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-green-600 text-sm mt-4 mb-0 italic">
                      Pilih barang yang akan dipinjam.
                    </p>
                  </section>


                  {/* Tujuan Nama Kegiatan */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <FileText className="mr-2 h-5 w-5 text-green-500" />
                      Tujuan Nama Kegiatan
                    </h2>
                    <Input
                      id="tujuanKegiatan"
                      placeholder="Masukkan tujuan atau nama kegiatan"
                      value={formData.tujuanKegiatan}
                      onChange={handleChange}
                    />
                  </section>

                  {/* Lokasi Utama Penggunaan */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <MapPin className="mr-2 h-5 w-5 text-green-500" />
                      Lokasi Utama Penggunaan
                    </h2>
                    <Input
                      id="lokasi"
                      placeholder="Masukkan lokasi penggunaan"
                      value={formData.lokasi}
                      onChange={handleChange}
                    />
                  </section>

                  {/* PIC Penanggung Jawab Peminjaman */}
                  <section className="bg-white rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center mb-4">
                      <User className="mr-2 h-5 w-5 text-green-500" />
                      PIC Penanggung Jawab Peminjaman
                    </h2>
                    <div className="grid grid-cols-1 gap-4 mb-4">
                      <div>
                        <Label htmlFor="nama">Nama</Label>
                        <Input
                          id="nama"
                          placeholder="Masukkan nama lengkap"
                          value={formData.nama}
                          onChange={handleChange}
                          className='mt-1'
                        />
                      </div>
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
                        <Label htmlFor="tanggal-mulai">Tanggal/Waktu untuk peminjaman*</Label>
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
                              onSelect={(date) => setSelectedDates({ ...selectedDates, startDate: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div>
                        <Label htmlFor="tanggal-selesai">Tanggal/Waktu untuk pengembalian*</Label>
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
                              onSelect={(date) => setSelectedDates({ ...selectedDates, endDate: date })}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
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
                        onChange={handleChange}
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
                          Saya menyatakan bahwa saya bertanggung jawab untuk mengembalikan peralatan yang dipinjam di atas dalam kondisi
                          yang sama saat dipinjam pada waktu yang telah ditentukan. Bila terjadi kerusakan atau kehilangan akan ditanggung
                          oleh peminjam sesuai peraturan. Saya menyetujui persyaratan ini dan semua peraturan yang berlaku untuk peminjaman
                          sarana prasarana BEM IT Del.
                        </p>
                      </div>
                    </div>
                  </section>



                  {/* Submit Button */}
                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="bg-green-500 hover:bg-green-600 text-white px-8 py-2 rounded-lg"
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

              {/* Contact Information */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Phone className="w-5 h-5 text-green-500" />
                  Kontak Penanggung Jawab
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">Robertus Situmorang</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">sarpras@bemitdel.ac.id</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">081234567890</span>
                  </div>
                </div>
              </div>

              {/* Tips Sukses */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-5 h-5" />
                  <h3 className="font-semibold">Tips Peminjaman</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p>• Pastikan semua data diisi dengan lengkap</p>
                  <p>• Periksa ketersediaan inventaris sebelum mengajukan</p>
                  <p>• Lampirkan dokumen pendukung yang jelas</p>
                  <p>• Hubungi penanggung jawab jika ada pertanyaan</p>
                </div>
              </div>

              {/* Action Buttons */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}