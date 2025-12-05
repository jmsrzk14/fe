import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import LayoutWrapper from '@/components/layout/layout-auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BEM - Badan Eksekutif Mahasiswa',
  description:
    'Badan Eksekutif Mahasiswa - Bersama Mewujudkan Aksi, Prestasi, dan Kolaborasi',
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


