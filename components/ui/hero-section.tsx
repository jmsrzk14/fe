'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const carouselImages = [
    '/logo/Logo_DEPKEBDIS.png',
    '/logo/Logo_DEPOL.png',
    '/logo/Logo_DEPAGSOS.png',
    '/logo/Logo_DEPKOMINFO.png',
    '/logo/Logo_SARPRAS.png',
    '/logo/Logo_DPDK.png',
  ];

  return (
    <section className="relative text-black overflow-hidden min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero.png"
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/70 to-white/90" />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-center lg:text-left space-y-6"
          >
            <div className="inline-block px-4 py-2 bg-blue-700 text-white rounded-full shadow-md text-sm font-semibold tracking-wide">
              WELCOME TO
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-blue-800">
              BEM IT DEL <span className="text-black">2025</span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              BEM IT DEL adalah organisasi mahasiswa yang menjalankan fungsi eksekutif di Institut Teknologi Del. 
              Kami berkomitmen untuk aktif, responsif, dan konstruktif melalui berbagai aksi, pengabdian, dan layanan.
            </p>

            {/* Carousel */}
            <div className="mt-10 relative overflow-hidden">
              <motion.div
                className="flex gap-4 sm:gap-6"
                animate={{ x: ['0%', '-100%'] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'loop',
                  ease: 'linear',
                  duration: 15,
                }}
              >
                {[...carouselImages, ...carouselImages].map((src, i) => (
                  <div
                    key={i}
                    className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-full border-4 border-blue-500 overflow-hidden shadow-lg bg-white"
                  >
                    <Image
                      src={src}
                      alt={`Carousel ${i + 1}`}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Logos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row justify-center lg:justify-center items-center gap-6 sm:gap-8"
          >
            <Image
              src="/bem.png"
              alt="BEM IT DEL Logo"
              width={300}
              height={300}
              className="rounded-2xl shadow-xl"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}