"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    organizer: ''
  });
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    setToken(stored);
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_URL}/event`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.events && Array.isArray(data.events)) {
        const formatted = data.events.map((e: any) => {

          return {
            id: e.id,
            title: e.title,
            description: e.description,
            location: e.location,
            startDate: e.start.split("T")[0], // yyyy-mm-dd
            endDate: e.end.split("T")[0],
            startTime: e.start.split("T")[1]?.substring(0, 5), // hh:mm
            endTime: e.end.split("T")[1]?.substring(0, 5),
            organizationId: e.organization_id,
            organization: e.organization || null,
            image: e.organization?.image || null,
            organizationName: e.organization?.name || "Tanpa Departemen",
            shortName: e.organization?.short_name || "-",
          };
        });

        setActivities(formatted);
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
        const res = await fetch(`${API_URL}/student/departments`, {
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

  const handleViewActivity = (activity: any) => {
    setViewingActivity(activity);
    setIsViewDialogOpen(true);
  };

  const itemsPerPage = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil(activities.length / itemsPerPage),
    [activities]
  );

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return activities.slice(startIndex, startIndex + itemsPerPage);
  }, [activities, currentPage]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            Kalender Kegiatan
          </h1>
        </div>
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
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Activities List */}
      <Card className="overflow-x-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900">
            Daftar Kegiatan
          </CardTitle>
        </CardHeader>

        <CardContent>
          {activities.length === 0 ? (
            <p className="text-gray-600">Tidak ada kegiatan.</p>
          ) : (
            <>
              {/* --- List kegiatan --- */}
              <div className="space-y-4">
                {currentData.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        {/* --- Logo & Label Organisasi --- */}
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
                              alt={activity.shortName}
                              className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
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
                              ? "BEM"
                              : activity.organizationId === 999
                                ? "MPM"
                                : activity.shortName || "Kemahasiswaan"}
                          </Badge>
                        </div>

                        {/* --- Judul dan Deskripsi --- */}
                        <h3 className="font-semibold text-lg text-gray-900 mb-2">
                          {activity.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {activity.description}
                        </p>

                        {/* --- Info tanggal dan lokasi --- */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(activity.startDate).toLocaleDateString("id-ID")}
                              {activity.startDate !== activity.endDate &&
                                ` - ${new Date(activity.endDate).toLocaleDateString("id-ID")}`}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{activity.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* --- Tombol lihat detail --- */}
                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewActivity(activity)}
                          className="text-green-600 hover:text-green-700"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* --- Navigasi Halaman --- */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 pt-6">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>

                  <span className="text-gray-700 text-sm">
                    Halaman {currentPage} dari {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

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
                <Label>Penyelenggara</Label>
                <p className="text-gray-700">
                  {viewingActivity.organizationId === 888
                    ? "Badan Eksekutif Mahasiswa"
                    : viewingActivity.organizationId === 999
                      ? "Majelis Permusyawaratan Mahasiswa"
                      : viewingActivity.shortName}
                </p>
              </div>

              {viewingActivity && (
                <div>
                  <Label>Logo Penyelenggara</Label>
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
                    alt={viewingActivity.shortName}
                    className="w-20 h-20 rounded-full object-cover border border-gray-200 shadow-sm mt-2"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4">
                <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                  Tutup
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
                            alt={activity.shortName}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
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
                            ? "BEM"
                            : activity.organizationId === 999
                              ? "MPM"
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