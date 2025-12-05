import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-3">
                <img src="/bem.png" alt="BEM" />
              </div>
              <span className="text-xl font-bold">BEM 2024</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Badan Eksekutif Mahasiswa committed to serving students and fostering academic excellence
              through innovation and collaboration.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/bem.itdel" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.tiktok.com/@bem.itdel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#3B82F6] transition-colors"
                aria-label="TikTok"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M208 80.6a59.6 59.6 0 0 1-34-10.4v70a69.6 69.6 0 1 1-69.6-69.6 69.2 69.2 0 0 1 14.4 1.6v33.6a36 36 0 1 0 25.2 34.4V16h32a59.8 59.8 0 0 0 59.6 59.6Z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/bem.itdel" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                bem@del.ac.id
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                +62 123 456 789
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; BEM IT Del. All rights reserved.</p>
          <Link href="/credits">
            <p className="text-blue-600 underline hover:text-blue-700">Created By Pakkail x Delpro</p>
          </Link>
        </div>
      </div>
    </footer>
  );
}