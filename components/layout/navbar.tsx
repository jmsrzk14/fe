'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, User, Home, Users, Camera, FileText, Megaphone, Mail, Info } from 'lucide-react';
import { NAV_ITEMS } from '@/constants/navigation';
import { Button } from '@/components/ui/button';

const navIcons = {
  '/': { icon: Home, label: 'Beranda' },
  '/profile': { icon: User, label: 'Profile' },
  '/organization': { icon: Users, label: 'Organisasi' },
  '/gallery': { icon: Camera, label: 'Galeri' },
  '/articles': { icon: FileText, label: 'Berita' },
  '/announcements': { icon: Megaphone, label: 'Pengumuman' },
  '/contact': { icon: Mail, label: 'Kontak' },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-xl' 
          : 'bg-white shadow-lg'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-transform duration-300 group-hover:scale-105">
                  <img src="./bem.png" alt="" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-gray-900">BEM IT DEL</span>
                  <span className="text-xs text-gray-500 -mt-1">Maju Bersama</span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {NAV_ITEMS.slice(0, -1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-[#1c46b9] px-3 py-2 text-sm font-medium transition-all duration-200 relative group"
                >
                  {navIcons[item.href as keyof typeof navIcons]?.label || item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1c46b9] group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              <Button 
                asChild
                className="bg-[#1c46b9] hover:bg-[#1c46b9]/90 text-white px-6 py-2 rounded-lg transition-colors duration-200"
              >
                <Link href="/auth/login">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Link>
              </Button>
            </div>

            {/* Mobile/Tablet menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-[#1c46b9] hover:bg-gray-100 transition-colors duration-200"
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
      <div className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-[#1c46b9] to-[#1c46b9]/95 z-50 transform transition-transform duration-300 ease-out lg:hidden ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
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
              className="p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="py-6 px-4 space-y-2 flex-1 overflow-y-auto">
          {NAV_ITEMS.map((item, index) => {
            const iconData = navIcons[item.href as keyof typeof navIcons];
            const IconComponent = iconData?.icon;
            const label = iconData?.label || item.label;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-center px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200 group"
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  animation: isOpen ? `slideInFromLeft 0.4s ease-out ${index * 50}ms both` : ''
                }}
              >
                <div className="flex items-center justify-center w-8 h-8 mr-4">
                  {IconComponent && (
                    <IconComponent className="w-5 h-5 text-[#ffe444] group-hover:scale-110 transition-transform duration-200" />
                  )}
                </div>
                <span className="font-medium">{label}</span>
                <div className="ml-auto w-1 h-6 bg-[#ffe444] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </Link>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="p-6 border-t border-white/10">
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center mb-2">
              <Info className="w-4 h-4 text-[#ffe444] mr-2" />
              <span className="text-white font-medium text-sm">Info Cepat</span>
            </div>
            <p className="text-white/80 text-xs leading-relaxed">
              BEM Fakultas program bersama BEM IT DEL untuk pengembangan UI yang inovatif.
            </p>
          </div>
        </div>
      </div>

      {/* Custom animations */}
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