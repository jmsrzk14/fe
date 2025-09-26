'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  User,
  Home,
  Camera,
  FileText,
  Megaphone,
  Mail,
  Info,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sekarang langsung bikin NAV_ITEMS dengan icon di sini
const NAV_ITEMS = [
  { href: '/', label: 'Beranda', icon: Home },
  { href: '/user/profile', label: 'Profil', icon: User },
  { href: '/user/organization', label: 'Organisasi', icon: Eye },
  { href: '/user/gallery', label: 'Galeri', icon: Camera },
  { href: '/user/news', label: 'Berita', icon: FileText },
  { href: '/user/announcements', label: 'Pengumuman', icon: Megaphone },
  { href: '/user/service', label: 'Layanan', icon: Mail },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav
        className={`z-50 transition-all duration-300 ${
          scrolled
            ? 'fixed top-4 left-4 right-4 mx-4 rounded-2xl bg-white/95 backdrop-blur-lg shadow-xl'
            : 'absolute top-0 left-0 right-0 bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-transform duration-300 group-hover:rotate-6">
                <img src="./bem.png" alt="Logo" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 group-hover:text-[#1c46b9] transition-colors">
                  BEM IT DEL
                </span>
                <span className="text-xs text-gray-500 -mt-1 group-hover:text-[#1c46b9]/70">
                  Maju Bersama
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {NAV_ITEMS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative flex items-center px-3 py-2 text-sm font-medium text-[#1c46b9] transition-all group"
                  >
                    <IconComponent className="w-4 h-4 mr-2 text-[#1c46b9]" />
                    <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                      {item.label}
                    </span>
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#1c46b9] transition-all duration-300 group-hover:w-full rounded-full"></span>
                  </Link>
                );
              })}

              <Button
                asChild
                className="relative overflow-hidden bg-[#1c46b9] hover:bg-[#1c46b9]/90 text-white rounded-full px-6 py-2 font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Link href="/auth/login" className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-[#1c46b9] hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-[#1c46b9] to-[#1c46b9]/95 z-50 transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <span className="text-[#ffe444] font-bold text-xl">B</span>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-bold text-lg">BEM IT DEL</span>
                <span className="text-white/80 text-sm">Maju Bersama</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="py-6 px-4 space-y-2 flex-1 overflow-y-auto">
        <div className="flex flex-col gap-1"> {/* kurangi gap di sini */}
  {NAV_ITEMS.map((item, index) => {
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setIsOpen(false)}
        className="flex items-center px-4 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
        style={{
          animationDelay: `${index * 50}ms`,
          animation: isOpen
            ? `slideInFromLeft 0.4s ease-out ${index * 50}ms both`
            : '',
        }}
      >
        {Icon && (
          <Icon className="w-5 h-5 mr-3 text-[#ffe444] group-hover:rotate-12 transition-transform duration-300" />
        )}
        <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
          {item.label}
        </span>
      </Link>
    );
  })}
</div>
        </div>

        {/* Footer Info */}
        <div className="p-6 border-t border-white/10">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Info className="w-4 h-4 text-[#ffe444] mr-2" />
              <span className="text-white font-medium text-sm">Info Cepat</span>
            </div>
            <p className="text-white/80 text-xs leading-relaxed">
              BEM Fakultas program bersama BEM IT DEL untuk pengembangan UI yang
              inovatif.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </>
  );
}
