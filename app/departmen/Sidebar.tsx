"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, ChevronDown, ChevronUp } from "lucide-react";
import React, { useState, useEffect } from "react";
import {
  departemenMenuItems,
  departemenDepolMenuItems,
  departemenSarprasMenuItems,
  departemenDpdkMenuItems,
} from "@/constants/data";
import type { MenuEntry, MenuLink } from "@/constants/data";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const isMenuItem = (entry: MenuEntry): entry is MenuLink => {
  return (entry as MenuLink).key !== undefined;
};

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [menuItems, setMenuItems] = useState<MenuEntry[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [associationData, setAssociationData] = useState<any | null>(null);
  const [organisasiId, setOrganisasiId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const stored = sessionStorage.getItem("token");
    setToken(stored);
    const stored2 = sessionStorage.getItem("organization");
    setOrganisasiId(stored2);
  }, []);

  useEffect(() => {
    if (organisasiId && token) {
      fetch(`${API_URL}/student/associations/${organisasiId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => setAssociationData(data))
        .catch((err) => console.error("Gagal ambil data organisasi:", err));
    }
  }, [organisasiId, router]);

  useEffect(() => {
    const orgShortName = associationData?.data?.short_name || null;
    switch (orgShortName) {
      case "DPDK":
        setMenuItems(departemenDpdkMenuItems);
        break;
      case "DEPOL":
        setMenuItems(departemenDepolMenuItems);
        break;
      case "DEPSARPRAS":
        setMenuItems(departemenSarprasMenuItems);
        break;
      default:
        setMenuItems(departemenMenuItems);
    }
  }, [associationData]);

  const handleDropdownToggle = (key: string) => {
    setOpenDropdown((prev) => (prev === key ? null : key));
  };

  const renderLink = (item: MenuLink, index: number) => {
    const IconComponent = item.icon;
    const isActive = pathname.startsWith(item.path);
    const isHovered = hoveredItem === item.key;

    return (
      <Link key={item.key} href={item.path}>
        <div
          className={`relative flex items-center ${
            sidebarOpen ? "gap-3 px-4 py-3" : "justify-center px-2 py-3"
          } rounded-xl cursor-pointer transition-all duration-300 group overflow-hidden
          ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md scale-[1.02]"
              : "hover:bg-blue-100 text-gray-700 hover:text-blue-600 hover:shadow-sm"
          }`}
          onMouseEnter={() => setHoveredItem(item.key)}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Icon */}
          <div
            className={`transition-transform duration-300 ${
              isActive ? "scale-110" : isHovered ? "scale-105" : "scale-100"
            }`}
          >
            <IconComponent
              size={sidebarOpen ? 22 : 20}
              className={`${isActive ? "text-white" : "text-blue-500"}`}
            />
          </div>

          {/* Label */}
          {sidebarOpen && (
            <div className="flex flex-col min-w-0 max-w-[10rem]">
              <span
                className={`font-medium truncate ${
                  isActive ? "text-white" : "text-gray-800"
                }`}
              >
                {item.label}
              </span>
              {item.subtitle && (
                <span
                  className={`text-xs ${
                    isActive ? "text-white/80" : "text-gray-500"
                  }`}
                >
                  {item.subtitle}
                </span>
              )}
            </div>
          )}

          {/* Tooltip (saat sidebar tertutup) */}
          {!sidebarOpen && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg">
              {item.label}
            </div>
          )}
        </div>
      </Link>
    );
  };

  const renderDropdown = (item: MenuLink, index: number) => {
    const IconComponent = item.icon;
    const isOpen = openDropdown === item.key;
    const isActive = pathname.startsWith(item.path);

    return (
      <div key={item.key} className="space-y-1">
        {/* Dropdown header */}
        <div
          onClick={() => handleDropdownToggle(item.key)}
          className={`flex items-center justify-between cursor-pointer ${
            sidebarOpen ? "px-4 py-3" : "justify-center px-2 py-3"
          } rounded-xl transition-all duration-300 group overflow-hidden ${
            isActive
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md scale-[1.02]"
              : "hover:bg-blue-100 text-gray-700 hover:text-blue-600"
          }`}
        >
          <div className="flex items-center gap-3">
            <IconComponent
              size={sidebarOpen ? 22 : 20}
              className={`${isActive ? "text-white" : "text-blue-500"}`}
            />
            {sidebarOpen && (
              <div className="flex flex-col">
                <span
                  className={`font-medium ${
                    isActive ? "text-white" : "text-gray-800"
                  }`}
                >
                  {item.label}
                </span>
                {/* 🔹 Subtitle di bawah label */}
                {item.subtitle && (
                  <span className="text-xs text-gray-500">
                    {item.subtitle}
                  </span>
                )}
              </div>
            )}
          </div>

          {sidebarOpen && (
            <div
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
            </div>
          )}
        </div>

        {/* Submenu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-64 opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
        >
          {item.submenu?.map((sub: MenuLink, i: number) => (
            <div key={sub.key} className="pl-4">
              {renderLink(sub, i)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`${
        sidebarOpen ? "w-60" : "w-20"
      } bg-white border-r border-gray-200 shadow-md transition-all duration-500 flex flex-col h-screen relative overflow-hidden`}
    >
      {/* Header */}
      <div className="relative flex-shrink-0 p-4 border-b border-gray-200 flex items-center justify-between bg-white/60 backdrop-blur-sm">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <img
                  src="/bem.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </Link>
            <h2 className="text-lg font-semibold text-blue-700">BEM IT DEL</h2>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-all duration-300 hover:shadow-md"
        >
          <Menu
            size={18}
            className={`text-blue-600 transition-transform duration-300 ${
              sidebarOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Menu list */}
      <div className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
        <nav className={sidebarOpen ? "space-y-2" : "space-y-1"}>
          {menuItems.map((entry: MenuEntry, idx) => {
            // 🔹 jika entry adalah section
            if (entry.type === "section") {
              return sidebarOpen ? (
                <div key={`section-${idx}`} className="pt-4">
                  <div className="px-4 text-[11px] font-semibold tracking-widest uppercase text-blue-400/80 select-none">
                    {entry.title}
                  </div>
                  <div className="mt-2 mb-1 h-px bg-gradient-to-r from-blue-100 via-indigo-100 to-transparent" />
                </div>
              ) : (
                <div key={`section-${idx}`} className="mx-2 my-2 h-px bg-blue-100" />
              );
            }

            // 🔹 jika entry adalah item menu biasa
            if (isMenuItem(entry)) {
              return entry.submenu && entry.submenu.length > 0
                ? renderDropdown(entry, idx)
                : renderLink(entry, idx);
            }

            return null;
          })}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
