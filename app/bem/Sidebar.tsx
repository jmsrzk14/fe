"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { menuItems, menuItemsbem } from "@/constants/data";
import type { MenuEntry, MenuLink } from "@/constants/data";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  /** ===== Renderer untuk item link (re-usable) ===== */
  const renderLink = (item: MenuLink, index: number, isSubmenu: boolean = false) => {
    const IconComponent = item.icon;
    const isActive = pathname.startsWith(item.path);
    const isHovered = hoveredItem === item.key;

    return (
      <Link key={item.key} href={item.path} aria-current={isActive ? "page" : undefined}>
        <div
          className={`relative flex items-center ${sidebarOpen
              ? isSubmenu
                ? "gap-3 pl-10 pr-4 py-2"
                : "gap-4 px-4 py-4"
              : "justify-center px-2 py-3"
            } rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden
            ${isActive
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105"
              : "hover:bg-blue-100 text-gray-700 hover:text-blue-600 hover:shadow-md hover:scale-105"
            }`}
          onMouseEnter={() => setHoveredItem(item.key)}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {isActive && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 animate-pulse"></div>
          )}

          <div
            className={`absolute inset-0 bg-blue-200 opacity-0 transition-opacity duration-300 rounded-2xl ${isHovered && !isActive ? "opacity-30" : "opacity-0"
              }`}
          />

          <div className={`relative flex items-center ${sidebarOpen ? "gap-4 w-full" : "justify-center"}`}>
            {/* Icon */}
            <div
              className={`relative transition-all duration-300 ${isActive ? "scale-110" : isHovered ? "scale-105" : "scale-100"
                }`}
            >
              <IconComponent
                size={sidebarOpen ? (isSubmenu ? 18 : 22) : 20}
                className={`transition-all duration-300 ${isActive ? "text-white drop-shadow-lg" : "text-blue-500"}`}
              />
              {isActive && <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50 animate-ping"></div>}
            </div>

            {/* Label + Subtitle saat expanded */}
            {sidebarOpen && (
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col min-w-0 max-w-[9.5rem]">
                  <span className={`font-medium truncate ${isActive ? "text-white" : "text-gray-700"}`}>
                    {item.label}
                  </span>
                  {item.subtitle && (
                    <span
                      className={`text-xs leading-tight truncate ${isActive ? "text-white/80" : "text-gray-500"}`}
                      title={item.subtitle}
                    >
                      {item.subtitle}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Tooltip saat collapsed */}
            {!sidebarOpen && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                <div className="font-medium">{item.label}</div>
                {item.subtitle && <div className="text-[11px] opacity-80 leading-tight">{item.subtitle}</div>}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  };

  /** ===== Renderer untuk dropdown ===== */
  const renderDropdown = (item: MenuLink & { submenu?: MenuLink[] }, index: number) => {
    const isOpen = openDropdown === item.key;
    const hasSubmenu = item.submenu && item.submenu.length > 0;

    return (
      <div key={item.key}>
        <div
          className={`relative flex items-center ${sidebarOpen ? "gap-4 px-4 py-4" : "justify-center px-2 py-3"
            } rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden
            ${pathname.startsWith(item.path)
              ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-105"
              : "hover:bg-blue-100 text-gray-700 hover:text-blue-600 hover:shadow-md hover:scale-105"
            }`}
          onClick={() => sidebarOpen && hasSubmenu && setOpenDropdown(isOpen ? null : item.key)}
          onMouseEnter={() => setHoveredItem(item.key)}
          onMouseLeave={() => setHoveredItem(null)}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {pathname.startsWith(item.path) && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 animate-pulse"></div>
          )}

          <div
            className={`absolute inset-0 bg-blue-200 opacity-0 transition-opacity duration-300 rounded-2xl ${hoveredItem === item.key && !pathname.startsWith(item.path) ? "opacity-30" : "opacity-0"
              }`}
          />

          <div className={`relative flex items-center ${sidebarOpen ? "gap-4 w-full" : "justify-center"}`}>
            <div
              className={`relative transition-all duration-300 ${pathname.startsWith(item.path)
                  ? "scale-110"
                  : hoveredItem === item.key
                    ? "scale-105"
                    : "scale-100"
                }`}
            >
              <item.icon
                size={sidebarOpen ? 22 : 20}
                className={`transition-all duration-300 ${pathname.startsWith(item.path) ? "text-white drop-shadow-lg" : "text-blue-500"
                  }`}
              />
              {pathname.startsWith(item.path) && (
                <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50 animate-ping"></div>
              )}
            </div>

            {sidebarOpen && (
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col min-w-0 max-w-[9.5rem]">
                  <span
                    className={`font-medium truncate ${pathname.startsWith(item.path) ? "text-white" : "text-gray-700"
                      }`}
                  >
                    {item.label}
                  </span>
                  {item.subtitle && (
                    <span
                      className={`text-xs leading-tight truncate ${pathname.startsWith(item.path) ? "text-white/80" : "text-gray-500"
                        }`}
                      title={item.subtitle}
                    >
                      {item.subtitle}
                    </span>
                  )}
                </div>
                {hasSubmenu && (
                  <ChevronDown
                    size={16}
                    className={`ml-2 flex-shrink-0 transition-all duration-300 ${pathname.startsWith(item.path) ? "text-white" : "text-blue-400"
                      } ${isOpen ? "rotate-180" : "rotate-0"}`}
                  />
                )}
              </div>
            )}

            {!sidebarOpen && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                <div className="font-medium">{item.label}</div>
                {item.subtitle && <div className="text-[11px] opacity-80 leading-tight">{item.subtitle}</div>}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900"></div>
              </div>
            )}
          </div>
        </div>

        {sidebarOpen && isOpen && hasSubmenu && (
          <div
            className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ${sidebarOpen && isOpen && hasSubmenu ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            {item.submenu?.map((subItem, subIdx) => renderLink(subItem, index + subIdx + 1, true))}
          </div>

        )}
      </div>
    );
  };

  return (
    <div
      className={`${sidebarOpen ? "w-60" : "w-20"
        } bg-white border-r border-gray-200 shadow-xl transition-all duration-500 ease-in-out flex flex-col h-screen relative overflow-hidden`}
    >
      {/* === background effects (dipertahankan) === */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {sidebarOpen ? (
          <>
            <div className="absolute top-0 -left-4 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" />
            <div className="absolute top-0 -right-4 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000" />
            <div className="absolute -bottom-8 left-12 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000" />
          </>
        ) : (
          <>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 w-20 h-20 bg-blue-500 rounded-full mix-blend-multiply filter blur-lg animate-pulse"></div>
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-16 h-16 bg-indigo-500 rounded-full mix-blend-multiply filter blur-lg animate-pulse animation-delay-1000"></div>
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-18 h-18 bg-cyan-500 rounded-full mix-blend-multiply filter blur-lg animate-pulse animation-delay-2000"></div>
            <div className="absolute top-2/3 left-1/2 -translate-x-1/2 w-12 h-12 bg-purple-400 rounded-full mix-blend-multiply filter blur-md animate-pulse animation-delay-3000"></div>
          </>
        )}
        {!sidebarOpen && <div className="absolute inset-0 bg-gradient-to-b from-blue-100/20 via-indigo-100/20 to-cyan-100/20"></div>}
      </div>

      {/* Header */}
      <div className="relative z-10 flex-shrink-0 p-4 border-b border-gray-200/50 flex items-center justify-between backdrop-blur-sm">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" aria-label="BEM IT DEL Dashboard" className="flex items-center group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-transform duration-300 group-hover:scale-105">
                <img src="/bem.png" alt="" className="w-full h-full object-contain" />
              </div>
            </Link>
            <h2 className="text-lg font-midfielder bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              BEM IT DEL
            </h2>
          </div>
        )}
        {!sidebarOpen && (
          <div className="hidden flex-1 flex justify-center">
            <Link href="/admin/dashboard" aria-label="BEM IT DEL Dashboard" className="group">
              <div className="hidden w-8 h-8 rounded-lg sm:flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-200 group-hover:to-indigo-200">
                <img src="/bem.png" alt="" className="w-6 h-6 object-contain" />
              </div>
            </Link>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`relative p-2 rounded-lg bg-blue-100 hover:bg-blue-200 transition-all duration-300 group hover:shadow-md hover:scale-105 ${!sidebarOpen ? "ml-2" : ""}`}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <Menu size={18} className={`text-blue-600 transition-transform duration-300 ${sidebarOpen ? "rotate-180" : "rotate-0"}`} />
          <div className="absolute inset-0 bg-blue-300 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
        </button>
      </div>

      {/* Menu */}
      <div className="relative z-10 flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
        <nav className={sidebarOpen ? "space-y-2" : "space-y-1"}>
          {menuItemsbem.map((entry: MenuEntry, idx) => {
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

            return entry.key === "peminjaman" ? renderDropdown(entry, idx) : renderLink(entry, idx);
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex-shrink-0 p-3 border-t border-gray-200/70 bg-white">
        <div className="w-full">
          {sidebarOpen ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-sm" />
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse animation-delay-200 shadow-sm" />
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse animation-delay-400 shadow-sm" />
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-blue-700 drop-shadow-sm">© 2025 Admin Panel</p>
                <p className="text-[10px] text-blue-500 mt-0.5 opacity-75">v1.0.0</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <div className="flex justify-center gap-0.5">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse shadow-sm" />
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full animate-pulse animation-delay-200 shadow-sm" />
              </div>
              <p className="text-[10px] text-blue-600 font-medium">©</p>
            </div>
          )}
        </div>
      </div>

      {/* Extra CSS */}
      <style jsx>{`
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-400 { animation-delay: 400ms; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .scrollbar-thin { scrollbar-width: thin; }
        .scrollbar-thumb-blue-300::-webkit-scrollbar { width: 6px; }
        .scrollbar-thumb-blue-300::-webkit-scrollbar-track { background: rgba(219,234,254,.5); border-radius: 3px; }
        .scrollbar-thumb-blue-300::-webkit-scrollbar-thumb { background: rgba(147,197,253,.8); border-radius: 3px; transition: background-color .2s ease; }
        .scrollbar-thumb-blue-300::-webkit-scrollbar-thumb:hover { background: rgba(96,165,250,.9); }
        .scrollbar-track-blue-100::-webkit-scrollbar-track { background: rgba(219,234,254,.3); }
      `}</style>
    </div>
  );
};

export default Sidebar;