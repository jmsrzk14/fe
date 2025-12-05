"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, Edit, Trash2, BookOpen, Settings, ChevronLeft, ChevronRight, MapPin, Eye } from 'lucide-react';

const CalendarDashboard: React.FC = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDateActivitiesOpen, setIsDateActivitiesOpen] = useState(false);
  const [selectedDateActivities, setSelectedDateActivities] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [editingActivity, setEditingActivity] = useState<any>(null);
  const [viewingActivity, setViewingActivity] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    organizer: ''
  });
  const [token, setToken] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    setToken(stored);
  }, []);

  const fetchEvents = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await fetch(`${API_URL}/event`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log(data);

      if (data.events && Array.isArray(data.events)) {
        const formatted = data.events.map((e: any) => {

          const orgName = e.organization?.name?.toLowerCase() || "";

          const isHimpunan = orgName.includes("himpunan");
          const isDepartment = orgName.includes("departemen");

          let imageUrl = "";

          if (e.organization?.id == 888) {
            imageUrl = "http://localhost:3000/bem.png";
          } else if (e.organization?.id === 999) {
            imageUrl = "${IMAGE_URL}/static/mpm-logo.png";
          } else if (isHimpunan) {
            imageUrl = `${IMAGE_URL}/associations/${e.organization?.image}`;
          } else if (isDepartment) {
            imageUrl = `${IMAGE_URL}/departments/${e.organization?.image}`;
          } else {
            imageUrl = `${IMAGE_URL}/clubs/${e.organization?.image}`;
          }

          return {
            id: e.id,
            title: e.title,
            description: e.description,
            location: e.location,
            startDate: e.start.split("T")[0], // yyyy-mm-dd
            endDate: e.end.split("T")[0],
            startTime: e.start.split("T")[1]?.substring(0, 5), // hh:mm
            endTime: e.end.split("T")[1]?.substring(0, 5),
            organizationId: e.organization_id || null,
            organization: e.organization || null,
            image: e.organization?.image || null,
            organizationName: e.organization?.name || "Tanpa Departemen",
            shortName: e.organization?.short_name || "-",
          };
        });

        setActivities(formatted);
        console.log("Formatted events:", formatted);
      } else {
        console.warn("⚠️ Tidak ada data events yang valid:", data);
      }
    } catch (err) {
      console.error("❌ Gagal memuat data kegiatan:", err);
    }
  };

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`${API_URL}/student/organization`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const json = await res.json();
        if (json.status === "success" && Array.isArray(json.data)) {
          setDepartments(json.data);
        }
      } catch (err) {
        console.error("Gagal memuat data departemen:", err);
      }
    };
    fetchDepartments();
  }, []);

  useEffect(() => {
    // Add CSS untuk memastikan format 24 jam
    const style = document.createElement('style');
    style.textContent = `
      input[type="datetime-local"]::-webkit-datetime-edit-ampm-field {
        display: none !important;
      }
      input[type="datetime-local"] {
        color-scheme: light;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const getCurrentMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const getActivitiesForDate = (day: number) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    return activities.filter((event) => {
      return event.startDate === dateStr;
    });
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const isToday = (day: number) => {
    if (!day) return false;
    const today = new Date();
    return today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear();
  };

  const handleDateClick = (day: number) => {
    const dayActivities = getActivitiesForDate(day);
    if (dayActivities.length > 0) {
      setSelectedDateActivities(dayActivities);
      setIsDateActivitiesOpen(true);
    } else {
      const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      setEditingActivity(null);
      setFormData({
        title: '',
        description: '',
        startDate: dateString,
        endDate: dateString,
        location: '',
        organizer: 'none'
      });
      setIsDialogOpen(true);
    }
  };

  const handleAddActivity = () => {
    const today = new Date();
    const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    setEditingActivity(null);
    setFormData({
      title: '',
      description: '',
      startDate: todayString,
      endDate: todayString,
      location: '',
      organizer: 'none'
    });
    setIsDialogOpen(true);
  };

  const handleSaveActivity = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("Token tidak ditemukan. Silakan login kembali.");
        return;
      }

      const selectedDept = formData.organizer !== "none"
        ? departments.find(dept => String(dept.id) === formData.organizer)
        : null;

      const startDatetime = new Date(`${formData.startDate}T00:00:00`).toISOString();
      const endDatetime = new Date(`${formData.endDate}T23:59:59`).toISOString();

      const payload = {
        title: formData.title,
        description: formData.description,
        start: startDatetime,
        end: endDatetime,
        location: formData.location,
        organization_id: formData.organizer !== "none" ? parseInt(formData.organizer) : null,
      };

      console.log("📦 Data dikirim ke backend:", payload);

      const endpoint = editingActivity
        ? `${API_URL}/student/events/${editingActivity.id}`
        : `${API_URL}/student/events`;

      const res = await fetch(endpoint, {
        method: editingActivity ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      console.log("📩 Response API:", result);

      if (res.ok) {
        await fetchEvents();
        setIsDialogOpen(false);
        setEditingActivity(null);
        setFormData({
          title: '',
          description: '',
          startDate: '',
          endDate: '',
          location: '',
          organizer: 'none'
        });
      } else {
        console.error("Gagal menyimpan kegiatan:", result);
      }
    } catch (error) {
      console.error("❌ Gagal menyimpan kegiatan:", error);
    }
  };

  const handleEditActivity = (activity: any) => {
    setEditingActivity(activity);
    setFormData({
      title: activity.title,
      description: activity.description,
      startDate: activity.startDate,
      endDate: activity.endDate,
      location: activity.location,
      organizer: activity.organization?.id ? String(activity.organization.id) : "none",
    });
    setIsDialogOpen(true);
  };

  const handleViewActivity = (activity: any) => {
    setViewingActivity(activity);
    setIsViewDialogOpen(true);
  };

  const handleDeleteActivity = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus kegiatan ini?')) {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch(`${API_URL}/student/events/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          await fetchEvents(); // Refresh events after successful delete
        } else {
          console.error("Gagal menghapus kegiatan");
        }
      } catch (error) {
        console.error("❌ Gagal menghapus kegiatan:", error);
      }
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            Kalender Kegiatan
          </h1>
          <p className="text-gray-600 mt-2">Kelola semua kegiatan organisasi mahasiswa IT DEL</p>
        </div>
        <Button onClick={handleAddActivity} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Kegiatan
        </Button>
      </div>

      {/* Calendar View */}
      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <Calendar className="w-7 h-7 text-blue-600" />
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('prev')}
                className="hover:bg-blue-50 border-blue-200"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigateMonth('next')}
                className="hover:bg-blue-50 border-blue-200"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center font-semibold text-gray-600 py-3 text-lg">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-3">
            {getCurrentMonthDays().map((day, index) => {
              const dayActivities = day ? getActivitiesForDate(day) : [];
              const hasActivity = dayActivities.length > 0;
              const isTodayDate = day ? isToday(day) : false;

              return (
                <motion.div
                  key={index}
                  whileHover={day ? { scale: 1.02 } : {}}
                  whileTap={day ? { scale: 0.98 } : {}}
                  className={`
                    min-h-[120px] relative p-3 rounded-xl transition-all duration-200 border cursor-pointer
                    ${day ? 'hover:shadow-md' : 'cursor-default'}
                    ${isTodayDate ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-200 hover:border-blue-300'}
                    ${hasActivity && !isTodayDate ? 'border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-50' : ''}
                  `}
                  onClick={() => day && handleDateClick(day)}
                >
                  {day && (
                    <>
                      <span className={`absolute top-2 right-2 text-sm font-medium ${isTodayDate ? 'text-white' : hasActivity ? 'text-blue-700' : 'text-gray-700'}`}>
                        {day}
                      </span>

                      {hasActivity && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                          {dayActivities.slice(0, 1).map((activity, idx) => (
                            <div key={idx} className="flex flex-col items-center">
                              {activity ? (
                                console.log(activity),
                                <img
                                  src={
                                    activity.organizationId === 888
                                      ? "/bem.png"
                                      : activity.organizationId === 999
                                        ? "/mpm.jpg"
                                        : activity.organizationName?.toLowerCase().includes("himpunan")
                                          ? `${IMAGE_URL}/associations/${activity.image}`
                                          : activity.organizationName?.toLowerCase().includes("departemen")
                                            ? `${IMAGE_URL}/departments/${activity.image}`
                                            : `${IMAGE_URL}/clubs/${activity.image}`
                                  }
                                  alt={activity.shortName}
                                  className="w-20 h-20 rounded-full object-cover border border-gray-200 shadow-sm"
                                />

                              ) : (
                                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                                  <BookOpen className="w-4 h-4 text-blue-600" />
                                </div>
                              )}
                            </div>
                          ))}

                          {dayActivities.length > 1 && (
                            <span className="text-[10px] text-gray-500 font-medium">
                              +{dayActivities.length - 1} lainnya
                            </span>
                          )}
                        </div>
                      )}

                      {!hasActivity && (
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div className="flex flex-col items-center gap-2">
                            <Plus className="w-6 h-6 text-gray-400" />
                            <span className="text-xs text-gray-500">Tambah Kegiatan</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Activities List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">Daftar Kegiatan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {activity ? (
                        <img
                          src={
                            activity.organizationId === 888
                              ? "/bem.png"
                              : activity.organizationId === 999
                                ? "/mpm.jpg"
                                : activity.organizationName?.toLowerCase().includes("himpunan")
                                  ? `${IMAGE_URL}/associations/${activity.image}`
                                  : activity.organizationName?.toLowerCase().includes("departemen")
                                    ? `${IMAGE_URL}/departments/${activity.image}`
                                    : `${IMAGE_URL}/clubs/${activity.image}`
                          }
                          alt={activity.organizationId}
                          className="w-20 h-20 rounded-full object-cover border border-gray-200 shadow-sm"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                          <BookOpen className="w-4 h-4 text-blue-600" />
                        </div>
                      )}
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-700"
                      >
                        {activity.organizationId === 888
                          ? "Badan Eksekutif Mahasiswa"
                          : activity.organizationId === 999
                            ? "Majelis Permusyawaratan Mahasiswa"
                            : activity.shortName}
                      </Badge>
                    </div>

                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {activity.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {activity.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(activity.startDate).toLocaleDateString('id-ID')}
                          {activity.startDate !== activity.endDate &&
                            ` - ${new Date(activity.endDate).toLocaleDateString('id-ID')}`
                          }
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{activity.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewActivity(activity)}
                      className="text-green-600 hover:text-green-700"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditActivity(activity)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteActivity(activity.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add/Edit Activity Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingActivity ? 'Edit Kegiatan' : 'Tambah Kegiatan Baru'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Judul Kegiatan</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Masukkan judul kegiatan"
              />
            </div>

            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Masukkan deskripsi kegiatan"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Tanggal Mulai</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="endDate">Tanggal Selesai</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Masukkan lokasi kegiatan"
              />
            </div>

            <div>
              <Label>Penyelenggara</Label>
              <Select
                value={formData.organizer}
                onValueChange={(value) => handleInputChange("organizer", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih departemen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Tanpa Penyelenggara</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={String(dept.id)}>
                      {dept.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="888">Badan Eksekutif Mahasiswa</SelectItem>
                  <SelectItem value="999">Majelis Permusyawaratan Mahasiswa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Batal
              </Button>
              <Button
                onClick={handleSaveActivity}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingActivity ? 'Update' : 'Simpan'} Kegiatan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Activity Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detail Kegiatan</DialogTitle>
          </DialogHeader>

          {viewingActivity && (
            <div className="space-y-4">
              <div>
                <Label>Judul Kegiatan</Label>
                <p className="text-gray-700">{viewingActivity.title}</p>
              </div>

              <div>
                <Label>Deskripsi</Label>
                <p className="text-gray-700">{viewingActivity.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Tanggal Mulai</Label>
                  <p className="text-gray-700">{new Date(viewingActivity.startDate).toLocaleDateString('id-ID')}</p>
                </div>
                <div>
                  <Label>Tanggal Selesai</Label>
                  <p className="text-gray-700">{new Date(viewingActivity.endDate).toLocaleDateString('id-ID')}</p>
                </div>
              </div>

              <div>
                <Label>Lokasi</Label>
                <p className="text-gray-700">{viewingActivity.location}</p>
              </div>

              <div>
                <Label>Departemen</Label>
                <p className="text-gray-700">{
                  viewingActivity.organizationId == "888"
                    ? "Badan Eksekutif Mahasiswa"
                    : viewingActivity.organizationId == "999"
                      ? "Majelis Permusyawaratan Mahasiswa"
                      : viewingActivity.organizationName}
                </p>
              </div>

              {viewingActivity && (
                <div>
                  <Label>Logo Departemen</Label>
                  <img
                    src={
                      viewingActivity.organizationId === 888
                        ? "/bem.png"
                        : viewingActivity.organizationId === 999
                          ? "/mpm.jpg"
                          : viewingActivity.organizationName?.toLowerCase().includes("himpunan")
                            ? `${IMAGE_URL}/associations/${viewingActivity.image}`
                            : viewingActivity.organizationName?.toLowerCase().includes("departemen")
                              ? `${IMAGE_URL}/departments/${viewingActivity.image}`
                              : `${IMAGE_URL}/clubs/${viewingActivity.image}`
                    }
                    alt={viewingActivity.organizationId}
                    className="w-20 h-20 rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Tutup
                </Button>
                <Button
                  onClick={() => {
                    setIsViewDialogOpen(false);
                    handleEditActivity(viewingActivity);
                  }}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Edit Kegiatan
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Date Activities Modal */}
      <Dialog open={isDateActivitiesOpen} onOpenChange={setIsDateActivitiesOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Kegiatan pada Tanggal Ini</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {selectedDateActivities.length > 0 ? (
              selectedDateActivities.map((activity) => (
                <div key={activity.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {activity ? (
                          <img
                            src={
                              activity.organizationId === 888
                                ? "/bem.png"
                                : activity.organizationId === 999
                                  ? "/mpm.jpg"
                                  : activity.organizationName?.toLowerCase().includes("himpunan")
                                    ? `${IMAGE_URL}/associations/${activity.image}`
                                    : activity.organizationName?.toLowerCase().includes("departemen")
                                      ? `${IMAGE_URL}/departments/${activity.image}`
                                      : `${IMAGE_URL}/clubs/${activity.image}`
                            }
                            alt={activity.organizationId}
                            className="w-20 h-20 rounded-full object-cover border border-gray-200 shadow-sm"
                          />
                        ) : (
                          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100">
                            <BookOpen className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700"
                        >
                          {activity.organizationId === 888
                            ? "Badan Eksekutif Mahasiswa"
                            : activity.organizationId === 999
                              ? "Majelis Permusyawaratan Mahasiswa"
                              : activity.shortName}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-lg text-gray-900 mb-2">
                        {activity.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {activity.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {new Date(activity.startDate).toLocaleDateString('id-ID')}
                            {activity.startDate !== activity.endDate &&
                              ` - ${new Date(activity.endDate).toLocaleDateString('id-ID')}`
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{activity.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsDateActivitiesOpen(false);
                          handleViewActivity(activity);
                        }}
                        className="text-green-600 hover:text-green-700"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsDateActivitiesOpen(false);
                          handleEditActivity(activity);
                        }}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteActivity(activity.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Tidak ada kegiatan pada tanggal ini.</p>
            )}
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDateActivitiesOpen(false)}>
                Tutup
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarDashboard;