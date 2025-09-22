"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { himpunanMenuItems } from "@/constants/data";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const pathname = usePathname();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div
      className={`${
        sidebarOpen ? "w-60" : "w-20"
      } bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 
      border-r border-blue-200 dark:border-gray-700 shadow-xl 
      transition-all duration-500 ease-in-out flex flex-col h-screen relative overflow-hidden`}
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        {sidebarOpen ? (
          <>
            <div className="absolute top-0 -left-4 w-60 h-60 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-0 -right-4 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-12 w-60 h-60 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
          </>
        ) : (
          <>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-500 rounded-full mix-blend-multiply filter blur-lg animate-pulse"></div>
            <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-indigo-500 rounded-full mix-blend-multiply filter blur-lg animate-pulse animation-delay-1000"></div>
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-18 h-18 bg-cyan-500 rounded-full mix-blend-multiply filter blur-lg animate-pulse animation-delay-2000"></div>
            <div className="absolute top-2/3 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-purple-400 rounded-full mix-blend-multiply filter blur-md animate-pulse animation-delay-3000"></div>
          </>
        )}

        {!sidebarOpen && (
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100/20 via-indigo-100/20 to-cyan-100/20 dark:from-gray-800/20 dark:via-gray-800/20 dark:to-gray-900/20"></div>
        )}
      </div>

      {/* Header */}
      <div className="relative z-10 flex-shrink-0 p-4 border-b border-blue-200/50 dark:border-gray-700/50 flex items-center justify-between backdrop-blur-sm">
        {sidebarOpen && (
          <div className="flex items-center gap-2">
            <Link href="/admin/dashboard" className="flex-shrink-0 flex items-center group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-transform duration-300 group-hover:scale-105">
                <img src="/bem.png" alt="" className="w-full h-full object-contain" />
              </div>
            </Link>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              BEM IT DEL
            </h2>
          </div>
        )}

        {!sidebarOpen && (
          <div className="flex-1 flex justify-center">
            <Link href="/admin/dashboard" className="group">
              <div className="hidden w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-gray-700 dark:to-gray-600 group-hover:from-blue-200 group-hover:to-indigo-200 dark:group-hover:from-gray-600 dark:group-hover:to-gray-500">
                <img src="/bem.png" alt="" className="w-6 h-6 object-contain" />
              </div>
            </Link>
          </div>
        )}

        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`relative p-2 rounded-lg bg-blue-100 dark:bg-gray-700 hover:bg-blue-200 dark:hover:bg-gray-600 transition-all duration-300 group hover:shadow-md hover:scale-105 ${
            !sidebarOpen ? "mr-1" : ""
          }`}
        >
          <Menu
            size={18}
            className={`text-blue-600 dark:text-blue-400 transition-transform duration-300 ${
              sidebarOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>

      {/* Menu */}
      <div className="relative z-10 flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800">
        <nav className={`space-y-${sidebarOpen ? "4" : "3"}`}>
          {himpunanMenuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = pathname.startsWith(item.path);
            const isHovered = hoveredItem === item.key;

            return (
              <Link key={item.key} href={item.path}>
                <div
                  className={`relative flex items-center ${
                    sidebarOpen ? "gap-4 px-4 py-4" : "justify-center px-2 py-3"
                  } rounded-2xl cursor-pointer transition-all duration-300 group overflow-hidden
                    ${
                      isActive
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg transform scale-105"
                        : "hover:bg-blue-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-105"
                    }`}
                  onMouseEnter={() => setHoveredItem(item.key)}
                  onMouseLeave={() => setHoveredItem(null)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-20 animate-pulse"></div>
                  )}

                  <div
                    className={`absolute inset-0 bg-blue-200 dark:bg-gray-700 opacity-0 transition-opacity duration-300 rounded-2xl ${
                      isHovered && !isActive ? "opacity-30" : "opacity-0"
                    }`}
                  ></div>

                  <div className={`relative flex items-center ${sidebarOpen ? "gap-4 w-full" : "justify-center"}`}>
                    <div
                      className={`relative transition-all duration-300 ${
                        isActive
                          ? "scale-110"
                          : isHovered
                          ? "scale-105"
                          : "scale-100"
                      }`}
                    >
                      <IconComponent
                        size={sidebarOpen ? 22 : 20}
                        className={`transition-all duration-300 ${
                          isActive
                            ? "text-white drop-shadow-lg"
                            : "text-blue-500 dark:text-blue-400"
                        }`}
                      />
                      {isActive && (
                        <div className="absolute inset-0 bg-white rounded-full blur-md opacity-50 animate-ping"></div>
                      )}
                    </div>

                    {sidebarOpen && (
                      <div className="flex items-center justify-between w-full">
                        <span
                          className={`font-medium transition-all duration-300 ${
                            isActive ? "text-white" : "text-gray-700 dark:text-gray-200"
                          }`}
                        >
                          {item.label}
                        </span>
                        <ChevronRight
                          size={16}
                          className={`transition-all duration-300 ${
                            isActive
                              ? "text-white opacity-100 translate-x-0"
                              : "text-blue-400 dark:text-blue-300 opacity-0 -translate-x-2"
                          } ${
                            isHovered && !isActive ? "opacity-60 translate-x-0" : ""
                          }`}
                        />
                      </div>
                    )}

                    {!sidebarOpen && (
                      <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50 shadow-lg">
                        {item.label}
                        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 border-4 border-transparent border-r-gray-900 dark:border-r-gray-700"></div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="relative z-10 flex-shrink-0 p-3 border-t border-blue-200/70 dark:border-gray-700 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-gray-800/50 dark:to-gray-900/50 backdrop-blur-sm">
        <div className="w-full">
          {sidebarOpen ? (
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-sm"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse animation-delay-200 shadow-sm"></div>
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse animation-delay-400 shadow-sm"></div>
              </div>
              <div className="text-center">
                <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 drop-shadow-sm">
                  © 2025 Admin Panel
                </p>
                <p className="text-[10px] text-blue-500 dark:text-gray-400 mt-0.5 opacity-75">
                  v1.0.0
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1">
              <div className="flex justify-center gap-0.5">
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-pulse shadow-sm"></div>
                <div className="w-1.5 h-1.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full animate-pulse animation-delay-200 shadow-sm"></div>
              </div>
              <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">©</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
