"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  MapPin,
  BookOpen,
  Eye,
  Star,
} from "lucide-react";

type Activity = {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
  organizationId: string;
  organizer: string;
  shortName: string;
  image?: string;
  imageUrl?: string;
  departmentColor: string;
  type: string;
};

const ActivityCalendar: React.FC = () => {
  const [calendarEvents, setCalendarEvents] = useState<Activity[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Activity[]>([]);

  const today = new Date();
  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dateDetailsOpen, setDateDetailsOpen] = useState(false);
  const [selectedDateActivities, setSelectedDateActivities] = useState<Activity[]>([]);
  const [selectedDate, setSelectedDate] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  const monthNames = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember",
  ];
  const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

  const fetchCalendarEvents = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/event`);
      const data = await res.json();

      if (data.events && Array.isArray(data.events)) {
        const formatted = data.events.map((e: any) => {
          const orgName = (e.organization?.name ?? "").toLowerCase();
          const isHimpunan = orgName.includes("himpunan");
          const isDepartment = orgName.includes("departemen");

          const imageUrl = isHimpunan
            ? `${IMAGE_URL}/associations/${e.organization?.image}`
            : isDepartment
              ? `${IMAGE_URL}/departments/${e.organization?.image}`
              : `${IMAGE_URL}/clubs/${e.organization?.image}`;

          return {
            id: e.id,
            title: e.title,
            description: e.description,
            location: e.location,
            startDate: e.start.split("T")[0],
            endDate: e.end.split("T")[0],
            startTime: e.start.split("T")[1]?.substring(0, 5),
            endTime: e.end.split("T")[1]?.substring(0, 5),
            organizationId: e.organization_id,
            organizer: e.organization?.name ?? "Tanpa Organisasi",
            shortName: e.organization?.short_name ?? "-",
            image: e.organization?.image ?? null,
            imageUrl,
            departmentColor: e.color ?? "#2563EB",
            type: e.type ?? "Event",
          } as Activity;
        });

        setCalendarEvents(formatted);
      }
    } catch (err) {
      console.error("Failed to fetch calendar events", err);
    }
  }, []);

  const fetchUpcomingEvents = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/events`);
      const data = await res.json();

      const raw = Array.isArray(data) ? data : data.events ?? [];

      const formatted = raw.map((e: any) => {
        const orgName = (e.organization?.name ?? "").toLowerCase();
        const isHimpunan = orgName.includes("himpunan");
        const isDepartment = orgName.includes("departemen");

        const imageUrl = isHimpunan
          ? `${IMAGE_URL}/associations/${e.organization?.image}`
          : isDepartment
            ? `${IMAGE_URL}/departments/${e.organization?.image}`
            : `${IMAGE_URL}/clubs/${e.organization?.image}`;

        return {
          id: e.id,
          title: e.title,
          description: e.description ?? "",
          location: e.location ?? "-",
          startDate: e.startDate ?? e.start?.split("T")[0],
          endDate: e.endDate ?? e.end?.split("T")[0],
          organizationId: e.organization_id,
          organizer: e.organization?.name ?? "Tanpa Organisasi",
          shortName: e.organization?.short_name ?? "-",
          image: e.organization?.image ?? null,
          imageUrl,
          departmentColor: e.color ?? "#2563EB",
          type: e.type ?? "Event",
        } as Activity;
      });

      setUpcomingEvents(formatted);
    } catch (err) {
      console.error("Failed to fetch upcoming events", err);
    }
  }, []);

  useEffect(() => {
    fetchCalendarEvents();
    fetchUpcomingEvents();
  }, [fetchCalendarEvents, fetchUpcomingEvents]);

  const getCurrentMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  };

  const getActivitiesForDate = (day: number) => {
    if (!day) return [];
    const dateStr = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return calendarEvents.filter((e) => e.startDate === dateStr);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      next.setMonth(prev.getMonth() + (direction === "next" ? 1 : -1));
      return next;
    });
  };

  const handleDateClick = (day: number) => {
    const dateString = `${currentDate.getFullYear()}-${String(
      currentDate.getMonth() + 1
    ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const dayActs = getActivitiesForDate(day);
    setSelectedDate(dateString);
    if (dayActs.length) {
      setSelectedDateActivities(dayActs);
      setDateDetailsOpen(true);
    }
  };

  const isToday = (day: number) => {
    if (!day) return false;
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-[90rem] mx-auto px-6 sm:px-8 lg:px-12">
        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg mb-6"
          >
            <Calendar className="w-8 h-8 text-blue-600" />
            <span className="text-lg font-semibold text-gray-700">
              Kalender Kegiatan
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6"
          >
            Kalender Kegiatan
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Jadwal terpadu semua kegiatan organisasi mahasiswa IT DEL dengan
            visualisasi kode warna untuk kemudahan identifikasi
          </motion.p>
        </div>

        {/* GRID: Calendar + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* MAIN CALENDAR */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800">
                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth("prev")}
                      className="hover:bg-blue-50 border-blue-200"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth("next")}
                      className="hover:bg-blue-50 border-blue-200"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-8">
                {/* Day headers */}
                <div className="grid grid-cols-7 gap-2 sm:gap-4 mb-4 sm:mb-6">
                  {dayNames.map((d) => (
                    <div
                      key={d}
                      className="text-center font-semibold text-gray-600 py-2 sm:py-4 text-xs sm:text-lg"
                    >
                      {d}
                    </div>
                  ))}
                </div>

                {/* Calendar grid */}
                <div className="grid grid-cols-7 gap-2 sm:gap-4 text-xs sm:text-sm">
                  {getCurrentMonthDays().map((day, idx) => {
                    const dayActs = day ? getActivitiesForDate(day) : [];
                    const hasAct = dayActs.length > 0;
                    const today = day ? isToday(day) : false;

                    return (
                      <motion.div
                        key={idx}
                        whileHover={day ? { scale: 1.05 } : {}}
                        whileTap={day ? { scale: 0.95 } : {}}
                        className={`
                          aspect-square relative rounded-xl transition-all duration-200 flex items-center justify-center
                          ${day ? "cursor-pointer" : ""}
                          ${today ? "bg-blue-600 text-white font-bold" : ""}
                          ${hasAct && !today
                            ? "bg-gradient-to-br from-blue-100 to-indigo-100 border-2 border-blue-300 hover:shadow-lg"
                            : ""
                          }
                          ${!hasAct && !today && day ? "hover:bg-gray-50" : ""}
                        `}
                        onClick={() => day && handleDateClick(day)}
                      >
                        {day && (
                          <>
                            <span
                              className={`absolute top-1 right-1 sm:top-2 sm:right-2 text-[8px] sm:text-sm font-medium ${today
                                ? "text-white"
                                : hasAct
                                  ? "text-blue-700"
                                  : "text-gray-700"
                                }`}
                            >
                              {day}
                            </span>

                            {hasAct && (
                              <div className="flex flex-col items-center justify-center">
                                {dayActs.slice(0, 1).map((a, i) => (
                                  <div key={i} className="flex flex-col items-center">
                                    {a ? (
                                      <img
                                        src={
                                          a.organizationId == "888"
                                            ? "/bem.png"
                                            : a.organizationId == "999"
                                              ? "/mpm.png"
                                              : a.organizer?.toLowerCase().includes("himpunan")
                                                ? `${IMAGE_URL}/associations/${a.image}`
                                                : a.organizer?.toLowerCase().includes("departemen")
                                                  ? `${IMAGE_URL}/departments/${a.image}`
                                                  : `${IMAGE_URL}/clubs/${a.image}`
                                        }
                                        alt={a.shortName}
                                        className="w-6 h-6 lg:w-20 lg:h-20 rounded-full object-cover border-2 border-white shadow-lg"
                                      />
                                    ) : (
                                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100">
                                        <BookOpen className="w-8 h-8 text-blue-600" />
                                      </div>
                                    )}
                                  </div>
                                ))}
                                {dayActs.length > 1 && (
                                  <span className="text-xs text-gray-500 font-medium">
                                    +{dayActs.length - 1}
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
          </motion.div>

          {/* UPCOMING EVENTS SIDEBAR */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className="shadow-2xl border-0 bg-white/70 backdrop-blur-sm h-fit">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  Kegiatan Bulan Ini
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents
                  .filter((e) => {
                    const d = new Date(e.startDate);
                    return d.getMonth() === currentDate.getMonth() && d.getFullYear() === currentDate.getFullYear();
                  })
                  .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                  .map((act) => (
                    <motion.div
                      key={act.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-lg border-l-4 bg-gradient-to-r from-white to-blue-50 cursor-pointer hover:shadow-md transition-all duration-200"
                      style={{ borderLeftColor: act.departmentColor }}
                      onClick={() => {
                        setSelectedActivity(act);
                        setDialogOpen(true);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        {act ? (
                          <img
                            src={
                              act.organizationId == "888"
                                ? "/bem.png"
                                : act.organizationId == "999"
                                  ? "/mpm.png"
                                  : act.organizer?.toLowerCase().includes("himpunan")
                                    ? `${IMAGE_URL}/associations/${act.image}`
                                    : act.organizer?.toLowerCase().includes("departemen")
                                      ? `${IMAGE_URL}/departments/${act.image}`
                                      : `${IMAGE_URL}/clubs/${act.image}`
                            }
                            alt={act.shortName}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm mr-2"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                            <BookOpen className="w-5 h-5 text-blue-600" />
                          </div>
                        )}
                        <Badge
                          variant="secondary"
                          className="text-xs"
                          style={{
                            backgroundColor: `${act.departmentColor}20`,
                            color: act.departmentColor,
                          }}
                        >
                          {act.organizationId == "888"
                            ? "BEM"
                            : act.organizationId == "999"
                              ? "MPM"
                              : act.shortName}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm text-gray-800 mb-1 line-clamp-2">
                        {act.title}
                      </h4>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(act.startDate).toLocaleDateString("id-ID")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                        <MapPin className="w-3 h-3" />
                        <span className="line-clamp-1">{act.location}</span>
                      </div>
                    </motion.div>
                  ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* DATE DETAILS DIALOG */}
        <Dialog open={dateDetailsOpen} onOpenChange={setDateDetailsOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                Kegiatan pada{" "}
                {new Date(selectedDate).toLocaleDateString("id-ID", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selectedDateActivities.map((a) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border rounded-lg p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      {a ? (
                        <img
                          src={
                            a.organizationId == "888"
                              ? "/bem.png"
                              : a.organizationId == "999"
                                ? "/mpm.png"
                                : a.organizer?.toLowerCase().includes("himpunan")
                                  ? `${IMAGE_URL}/associations/${a.image}`
                                  : a.organizer?.toLowerCase().includes("departemen")
                                    ? `${IMAGE_URL}/departments/${a.image}`
                                    : `${IMAGE_URL}/clubs/${a.image}`
                          }
                          alt={a.shortName}
                          className="w-12 h-12 rounded-full object-cover border border-gray-200 shadow-sm flex-shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1">{a.title}</h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {a.description}
                        </p>
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-3 h-3" />
                          <span className="text-xs text-gray-500">
                            {new Date(a.startDate).toLocaleDateString("id-ID")}
                            {a.startDate !== a.endDate && ` – ${new Date(a.endDate).toLocaleDateString("id-ID")}`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span className="text-xs text-gray-500">{a.location}</span>
                        </div>
                        <Badge
                          variant="secondary"
                          className="mt-2 text-xs"
                          style={{
                            backgroundColor: `${a.departmentColor}20`,
                            color: a.departmentColor,
                          }}
                        >
                          {a.organizationId == "888"
                            ? "BEM"
                            : a.organizationId == "999"
                              ? "MPM"
                              : a.shortName}
                        </Badge>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setDateDetailsOpen(false);
                        setSelectedActivity(a);
                        setDialogOpen(true);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        {/* ACTIVITY DETAIL DIALOG */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="max-w-2xl">
            {selectedActivity && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-800">
                    {selectedActivity.title}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  <DialogDescription className="text-gray-600 text-base leading-relaxed">
                    {selectedActivity.description}
                  </DialogDescription>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="font-semibold text-gray-700">Tanggal Mulai</div>
                        <div className="text-sm text-gray-600">
                          {new Date(selectedActivity.startDate).toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-lg">
                      <Calendar className="w-5 h-5 text-indigo-600" />
                      <div>
                        <div className="font-semibold text-gray-700">Tanggal Selesai</div>
                        <div className="text-sm text-gray-600">
                          {new Date(selectedActivity.endDate).toLocaleDateString("id-ID", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg md:col-span-2">
                      <MapPin className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="font-semibold text-gray-700">Lokasi</div>
                        <div className="text-sm text-gray-600">{selectedActivity.location}</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-gray-700 mb-2">Penyelenggara</h4>
                    <p className="text-sm text-gray-600">
                      {selectedActivity.organizationId == "888"
                        ? "BEM"
                        : selectedActivity.organizationId == "999"
                          ? "MPM"
                          : selectedActivity.shortName}
                    </p>
                    {selectedActivity && (
                      <div className="mt-3">
                        <img
                          src={
                            selectedActivity.organizationId == "888"
                              ? "/bem.png"
                              : selectedActivity.organizationId == "999"
                                ? "/mpm.png"
                                : selectedActivity.organizer?.toLowerCase().includes("himpunan")
                                  ? `${IMAGE_URL}/associations/${selectedActivity.image}`
                                  : selectedActivity.organizer?.toLowerCase().includes("departemen")
                                    ? `${IMAGE_URL}/departments/${selectedActivity.image}`
                                    : `${IMAGE_URL}/clubs/${selectedActivity.image}`
                          }
                          alt={selectedActivity.shortName}
                          className="w-20 h-20 rounded-full object-cover border border-gray-200 shadow-sm"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ActivityCalendar;