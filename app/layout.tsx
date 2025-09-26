import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LayoutWrapper from '@/components/layout/layout-auth';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BEM 2024 - Badan Eksekutif Mahasiswa',
  description:
    'Badan Eksekutif Mahasiswa 2024-2025 - Bersama Mewujudkan Aksi, Prestasi, dan Kolaborasi',
  icons: {
    icon: "/bem.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}


