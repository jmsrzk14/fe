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
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
                <img src="bem.png" alt="BEM" />
              </div>
              <span className="text-xl font-bold">BEM 2024</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Badan Eksekutif Mahasiswa committed to serving students and fostering academic excellence 
              through innovation and collaboration.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#3B82F6] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-[#3B82F6] transition-colors">Home</Link></li>
              <li><Link href="/organization" className="text-gray-300 hover:text-[#3B82F6] transition-colors">Organization</Link></li>
              <li><Link href="/articles" className="text-gray-300 hover:text-[#3B82F6] transition-colors">Articles</Link></li>
              <li><Link href="/announcements" className="text-gray-300 hover:text-[#3B82F6] transition-colors">Announcements</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <Mail className="w-4 h-4 mr-2" />
                bem2024@university.ac.id
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="w-4 h-4 mr-2" />
                +62 123 456 789
              </li>
              <li className="flex items-center text-gray-300">
                <MapPin className="w-4 h-4 mr-2" />
                Campus University
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">&copy; 2024 BEM. All rights reserved.</p>
          <p className="text-gray-400">Created By Pakkail x Delpro</p>
        </div>
      </div>
    </footer>
  );
}