  'use client';

  import Image from 'next/image';
  import { motion } from 'framer-motion';
  import { ArrowRight } from 'lucide-react';
  import { Button } from '@/components/ui/button';

  export default function HeroSection() {
    return (
      <section className="relative text-white overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero.png"
            alt="Hero Background"
            fill
            priority
            className="object-cover"            
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
            {/* Left: Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <div className="inline-block px-4 py-2 bg-blue-700/80 backdrop-blur-sm text-white rounded-full shadow-md text-sm font-semibold tracking-wide">
                WELCOME TO
              </div>

              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
                BEM IT DEL <span className="text-yellow-300">2025</span>
              </h1>

              <p className="mt-4 text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                BEM IT DEL adalah organisasi mahasiswa yang menjalankan fungsi eksekutif di Institut Teknologi Del. 
                Kami berkomitmen untuk aktif, responsif, dan konstruktif melalui berbagai aksi, pengabdian, dan layanan.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  className="px-6 py-3 text-lg rounded-2xl shadow-lg bg-yellow-400 text-black hover:bg-yellow-300 transition-all"
                >
                  Pelajari Lebih Lanjut
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="px-6 py-3 text-lg rounded-2xl border-white text-black hover:bg-white/10"
                >
                  Hubungi Kami
                </Button>
              </div>
            </motion.div>

            {/* Right: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 310 }}
              animate={{ opacity: 1, scale: 1, y: 260 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-end"
            >
              <Image
                src="/bem.png"
                alt="BEM IT DEL Logo"
                width={300}
                height={300}
                className="hidden rounded-2xl absolute bottom-20 right-5 lg:flex"
              />
            </motion.div>
          </div>
        </div>
      </section>
    );
  }
