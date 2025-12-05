import { Calendar } from "@/components/ui/calendar";
import { profile } from "console";
import {
  BookOpen,
  Briefcase,
  User,
  GraduationCap,
  Home,
  Megaphone,
  Newspaper,
  Settings,
  Target,
  Users,
  Boxes,
  ClipboardCopy,
  Image as ImageIcon,
  CalendarIcon,
  LucideIcon,
  SpeakerIcon
} from "lucide-react";

export type MenuLink = {
  type: "link";
  key: string;
  label: string;
  subtitle?: string;
  icon: LucideIcon | string;
  path: string;
  submenu?: MenuLink[];
};

export type MenuSection = {
  type: "section";
  title: string;
};

export type MenuEntry = MenuLink | MenuSection;

export const menuItems: MenuEntry[] = [
  { type: "link", key: "dashboard", label: "Dashboard", subtitle: "Ringkasan & metrik", icon: Home, path: "/admin/dashboard" },
  { type: "link", key: "mahasiswa", label: "Mahasiswa", subtitle: "Data & status", icon: Users, path: "/admin/mahasiswa" },
  { type: "link", key: "himpunan", label: "Himpunan Mahasiswa", subtitle: "Struktur & agenda", icon: GraduationCap, path: "/admin/himpunan" },
  { type: "link", key: "ukm", label: "Unit Kegiatan Mahasiswa", subtitle: "Kegiatan & anggota", icon: BookOpen, path: "/admin/ukm" },
  { type: "link", key: "departement", label: "Departemen", subtitle: "Unit & program", icon: Briefcase, path: "/admin/department" },
  { type : "link", key: "kalender", label: "Kalender", subtitle: "Kalender Kegiatan", icon: CalendarIcon, path: "/admin/calender" },
  {
    type: "link",
    key: "peminjaman",
    label: "Peminjaman",
    subtitle: "Request & track",
    icon: ClipboardCopy,
    path: "/admin/request/",
    submenu: [
      { type: "link", key: "request-sarpras", label: "Depsarpras", subtitle: "Peminjaman Depsarpras", icon: SpeakerIcon, path: "/admin/request_sarpras" },
      { type: "link", key: "request-depol", label: "Depol", subtitle: "Peminjaman Depol", icon: Target, path: "/admin/request_depol" },
    ],
  },
  { type: "link", key: "berita", label: "Berita", subtitle: "Publikasi", icon: Newspaper, path: "/admin/news" },
  { type: "link", key: "pengumuman", label: "Pengumuman", subtitle: "Info penting", icon: Megaphone, path: "/admin/announcement" },
];

export const menuItemsbem : MenuEntry[] = [
  { type : "link", key: "dashboard", label: "Dashboard", subtitle: "Dashboard BEM", icon: Home, path: "/bem/dashboard" },
  { type : "link", key: "visiMisi", label: "Visi & Misi", subtitle: "Visi & Misi BEM", icon: Target, path: "/bem/visimisi" },
  { type : "link", key: "kalender", label: "Kalender", subtitle: "Kalender Kegiatan", icon: CalendarIcon, path: "/bem/calender" },
  { type : "link", key: "aspirasi", label: "Aspirasi", subtitle: "Aspirasi Mahasiswa", icon: CalendarIcon, path: "/bem/aspirasi" },
  {
    type: "link",
    key: "peminjaman",
    label: "Peminjaman",
    subtitle: "Request & track",
    icon: ClipboardCopy,
    path: "/admin/request/",
    submenu: [
      { type: "link", key: "request-sarpras", label: "Depsarpras", subtitle: "Peminjaman Depsarpras", icon: SpeakerIcon, path: "/bem/request_sarpras" },
      { type: "link", key: "request-depol", label: "Depol", subtitle: "Peminjaman Depol", icon: Target, path: "/bem/request_depol" },
    ],
  },
  { type: "link", key: "berita", label: "Berita", subtitle: "Publikasi", icon: Newspaper, path: "/bem/news" },
  { type : "link", key: "pengumuman", label: "Pengumuman", subtitle: "Pengumuman BEM", icon: Megaphone, path: "/bem/announcement" },
  { type : "link", key: "profile", label: "Profile", subtitle: "Profile BEM", icon: Settings, path: "/bem/profile" },
];

export const menuItemsmpm : MenuEntry[] = [
  { type : "link", key: "dashboard", label: "Dashboard", subtitle: "Dashboard MPM", icon: Home, path: "/mpm/dashboard" },
  { type : "link", key: "kalender", label: "Kalender", subtitle: "Kalender Kegiatan", icon: CalendarIcon, path: "/mpm/calender" },
  { type : "link", key: "aspirasi", label: "Aspirasi", subtitle: "Aspirasi Mahasiswa", icon: CalendarIcon, path: "/mpm/aspirasi" },
  {
    type: "link",
    key: "peminjaman",
    label: "Peminjaman",
    subtitle: "Request & track",
    icon: ClipboardCopy,
    path: "/admin/request/",
    submenu: [
      { type: "link", key: "request-sarpras", label: "Depsarpras", subtitle: "Peminjaman Depsarpras", icon: SpeakerIcon, path: "/mpm/request_sarpras" },
      { type: "link", key: "request-depol", label: "Depol", subtitle: "Peminjaman Depol", icon: Target, path: "/mpm/request_depol" },
    ],
  },
  { type: "link", key: "berita", label: "Berita", subtitle: "Publikasi", icon: Newspaper, path: "/mpm/news" },
  { type : "link", key: "pengumuman", label: "Pengumuman", subtitle: "Pengumuman MPM", icon: Megaphone, path: "/mpm/announcement" },
  { type : "link", key: "profile", label: "Profile", subtitle: "Profile MPM", icon: Settings, path: "/mpm/profile" },
];

export const ukmMenuItems : MenuEntry[] = [
  { type: "link", key: "dashboard", label: "Dashboard", subtitle: "Dashboard UKM", icon: Home, path: "/ukm/dashboard" },  
  {
    type: "link",
    key: "peminjaman",
    label: "Peminjaman",
    subtitle: "Request & track",
    icon: ClipboardCopy,
    path: "/ukm/request/",
    submenu: [
      { type: "link", key: "request-sarpras", label: "Depsarpras", subtitle: "Peminjaman Depsarpras", icon: SpeakerIcon, path: "/ukm/request_sarpras" },
      { type: "link", key: "request-depol", label: "Depol", subtitle: "Peminjaman Depol", icon: Target, path: "/ukm/request_depol" },
    ],
  },
  { type: "link", key: "berita", label: "Berita", subtitle: "Berita", icon: Newspaper, path: "/ukm/news" },
  { type: "link", key: "pengumuman", label: "Pengumuman", subtitle: "Pengumuman UKM", icon: Megaphone, path: "/ukm/announcement" },
  { type: "link", key: "profile", label: "Profile", subtitle: "Profile UKM", icon: User, path: "/ukm/profile" },
];

export const departemenMenuItems : MenuEntry[] = [
  { type: "link", key: "dashboard", label: "Dashboard", subtitle: "Dashboard Departemen", icon: Home, path: "/departmen/dashboard" },
  { type : "link", key: "kalender", label: "Kalender", subtitle: "Kalender Kegiatan", icon: CalendarIcon, path: "/departmen/calenderDep" },
  {
    type: "link",
    key: "peminjaman",
    label: "Peminjaman",
    subtitle: "Request & track",
    icon: ClipboardCopy,
    path: "/departmen/request/",
    submenu: [
      { type: "link", key: "request-sarpras", label: "Depsarpras", subtitle: "Peminjaman Depsarpras", icon: SpeakerIcon, path: "/departmen/request_sarpras" },
      { type: "link", key: "request-depol", label: "Depol", subtitle: "Peminjaman Depol", icon: Target, path: "/departmen/request_depol" },
    ],
  },
  { type: "link", key: "berita", label: "Berita", subtitle: "Berita Departemen", icon: Newspaper, path: "/departmen/news" },
  { type: "link", key: "pengumuman", label: "Pengumuman", subtitle: "Pengumuman Departemen", icon: Megaphone, path: "/departmen/announcement" },
  { type: "link", key: "profile", label: "Profile", subtitle: "Profile Departemen", icon: User, path: "/departmen/profile" },
];

export const himpunanMenuItems : MenuEntry[]= [
  { type: "link", key: "dashboard", label: "Dashboard", subtitle: "Dashboard Himpunan", icon: Home, path: "/himpunan/dashboard" },
  { type : "link", key: "kalender", label: "Kalender", subtitle: "Kalender Kegiatan", icon: CalendarIcon, path: "/himpunan/calender" },
  {
    type: "link",
    key: "peminjaman",
    label: "Peminjaman",
    subtitle: "Request & track",
    icon: ClipboardCopy,
    path: "/himpunan/request/",
    submenu: [
      { type: "link", key: "request-sarpras", label: "Depsarpras", subtitle: "Peminjaman Depsarpras", icon: SpeakerIcon, path: "/himpunan/request_sarpras" },
      { type: "link", key: "request-depol", label: "Depol", subtitle: "Peminjaman Depol", icon: Target, path: "/himpunan/request_depol" },
    ],
  },
  { type: "link", key: "pengumuman", label: "Pengumuman", subtitle: "Pengumuman Himpunan", icon: Megaphone, path: "/himpunan/announcement" },
  { type: "link", key: "berita", label: "Berita", subtitle: "Berita Himpunan", icon: Newspaper, path: "/himpunan/news" },
  { type: "link", key: "profile", label: "Profile", subtitle: "Profile Himpunan", icon: User, path: "/himpunan/profile" },
];

export const departemenSarprasMenuItems   : MenuEntry[] = [
  { type: "link", key: "dashboard", label: "Dashboard", subtitle: "Dashboard Departemen", icon: Home, path: "/departmen/dashboard" },
  { type : "link", key: "kalender", label: "Kalender", subtitle: "Kalender Kegiatan", icon: CalendarIcon, path: "/departmen/calenderDep" },
  { type: "link", key: "barang", label: "Barang", subtitle: "Daftar Barang Sarpras", icon: Boxes, path: "/departmen/item_sarpras" },
  { type: "link", key: "peminjaman", label: "Peminjaman", subtitle: "Peminjaman Barang Sarpras", icon: ClipboardCopy, path: "/departmen/request_sarprasDep" },
  { type: "link", key: "pengumuman", label: "Pengumuman", subtitle: "Pengumuman Departemen", icon: Megaphone, path: "/departmen/announcement" },
  { type: "link", key: "berita", label: "Berita", subtitle: "Berita Himpunan", icon: Newspaper, path: "/departmen/news" },
  { type: "link", key: "profile", label: "Profile", subtitle: "Profile Departemen", icon: User, path: "/departmen/profile" },
];

export const departemenDepolMenuItems   : MenuEntry[] = [
  { type: "link", key: "dashboard", label: "Dashboard", subtitle: "Dashboard Departemen", icon: Home, path: "/departmen/dashboard" },
  { type : "link", key: "kalender", label: "Kalender", subtitle: "Kalender Kegiatan", icon: CalendarIcon, path: "/departmen/calenderDep" },
  { type: "link", key: "barang", label: "Barang", subtitle: "Daftar Barang Depol", icon: Boxes, path: "/departmen/item_depol" },
  { type: "link", key: "peminjaman", label: "Peminjaman", subtitle: "Peminjaman Barang Depol", icon: ClipboardCopy, path: "/departmen/request_depol" },
  { type: "link", key: "berita", label: "Berita", subtitle: "Berita Himpunan", icon: Newspaper, path: "/departmen/news" },
  { type: "link", key: "pengumuman", label: "Pengumuman", subtitle: "Pengumuman Departemen", icon: Megaphone, path: "/departmen/announcement" },
  { type: "link", key: "profile", label: "Profile", subtitle: "Profile Departemen", icon: User, path: "/departmen/profile" },
];

export const departemenDpdkMenuItems   : MenuEntry[] = [
  { type: "link", key: "dashboard", label: "Dashboard", subtitle: "Dashboard Departement", icon: Home, path: "/departmen/dashboard" },
  { type : "link", key: "kalender", label: "Kalender", subtitle: "Kalender Kegiatan", icon: CalendarIcon, path: "/departmen/calender" },
  {
    type: "link",
    key: "peminjaman",
    label: "Peminjaman",
    subtitle: "Request & track",
    icon: ClipboardCopy,
    path: "/departmen/request/",
    submenu: [
      { type: "link", key: "request-sarpras", label: "Depsarpras", subtitle: "Peminjaman Depsarpras", icon: SpeakerIcon, path: "/departmen/request_sarpras" },
      { type: "link", key: "request-depol", label: "Depol", subtitle: "Peminjaman Depol", icon: Target, path: "/departmen/request_depol" },
    ],
  },
  { type: "link", key: "pengumuman", label: "Pengumuman", subtitle: "Pengumuman Departemen", icon: Megaphone, path: "/departmen/announcement" },
  { type: "link", key: "berita", label: "Berita", subtitle: "Berita Departemen", icon: Newspaper, path: "/departmen/news" },
  { type: "link", key: "profile", label: "Profile", subtitle: "Profile Departemen", icon: User, path: "/departmen/profile" },
];
