'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Camera, Upload, Save, FileImage, Type, FileText } from "lucide-react";

export default function TambahGaleriPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return; // keluar kalau null

    const file = e.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };


  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (photo) {
      formData.append('photo', photo);
    }
    
    console.log("Galeri baru:", { title, content, photo: photo?.name });
    alert("Galeri berhasil ditambahkan!");
    
    // Reset form
    setTitle("");
    setContent("");
    setPhoto(null);
    setPhotoPreview("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-blue-600 text-white py-8 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Camera className="w-8 h-8 text-yellow-300" />
            <h1 className="text-3xl font-bold">Tambah Galeri</h1>
          </div>
          <p className="text-blue-100">Bagikan momen berharga kegiatan Anda</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="py-8 px-6">
        <Card className="max-w-2xl mx-auto border-2 border-blue-100 shadow-lg">
          <CardHeader className="bg-yellow-50 border-b border-yellow-200">
            <div className="flex items-center gap-2">
              <FileImage className="w-6 h-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-blue-800">Form Galeri Baru</h2>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Title Input */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-blue-600" />
                  <label className="text-sm font-semibold text-blue-800">Judul Galeri</label>
                </div>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Contoh: Kegiatan Bakti Sosial 2024"
                  className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-200"
                />
              </div>

              {/* Content Input */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <label className="text-sm font-semibold text-blue-800">Deskripsi Kegiatan</label>
                </div>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Ceritakan detail kegiatan, lokasi, tanggal, dan hal menarik lainnya..."
                  rows={4}
                  className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-200 resize-none"
                />
              </div>

              {/* Photo Upload */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-blue-600" />
                  <label className="text-sm font-semibold text-blue-800">Upload Foto</label>
                </div>
                
                <div className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="border-2 border-dashed border-blue-300 bg-blue-50 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 hover:border-blue-400 transition-colors"
                  />
                </div>

                {/* Photo Preview */}
                {photoPreview && (
                  <div className="mt-4">
                    <p className="text-sm text-blue-600 font-medium mb-2">Preview Foto:</p>
                    <div className="relative inline-block">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="w-48 h-36 object-cover rounded-lg border-4 border-yellow-300 shadow-md"
                      />
                      <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-1">
                        <Camera className="w-4 h-4 text-blue-800" />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-md"
                >
                  <Save className="w-5 h-5" />
                  Simpan Galeri
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="max-w-2xl mx-auto mt-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="bg-yellow-300 rounded-full p-2">
                <FileImage className="w-5 h-5 text-blue-800" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800 mb-1">Tips Upload Foto</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Format yang didukung: JPG, PNG, GIF</li>
                  <li>• Ukuran maksimal: 5MB</li>
                  <li>• Resolusi yang disarankan: minimal 800x600 piksel</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}