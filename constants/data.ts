import {
  BookOpen,
  Briefcase,
  Building,
  GraduationCap,
  Home,
  Megaphone,
  Newspaper,
  Settings,
  Target,
  Users,
  Image as ImageIcon,
} from "lucide-react";
  // Static data
  export const staticData = {
    visiMisi: [
      { id: 1, type: 'Visi', content: 'Menjadi universitas terdepan dalam pendidikan dan penelitian yang menghasilkan lulusan berkualitas dan berdaya saing global', createdAt: '2024-01-15' },
      { id: 2, type: 'Misi', content: 'Menyelenggarakan pendidikan tinggi berkualitas dengan mengintegrasikan nilai-nilai kearifan lokal dan teknologi modern', createdAt: '2024-01-15' },
      { id: 3, type: 'Misi', content: 'Mengembangkan penelitian dan pengabdian masyarakat yang inovatif dan berkelanjutan', createdAt: '2024-01-15' },
      { id: 4, type: 'Misi', content: 'Membangun kerjasama strategis dengan berbagai pihak untuk meningkatkan kualitas pendidikan', createdAt: '2024-01-15' }
    ],
    profile: [
      { id: 1, nama: 'Prof. Dr. Ahmad Budiman, M.Eng', jabatan: 'Rektor', email: 'rektor@universitas.ac.id', telp: '021-7654321' },
      { id: 2, nama: 'Dr. Siti Nurhaliza, S.T., M.T.', jabatan: 'Wakil Rektor I Bidang Akademik', email: 'warek1@universitas.ac.id', telp: '021-7654322' },
      { id: 3, nama: 'Prof. Dr. Ir. Budi Santoso, M.Sc.', jabatan: 'Wakil Rektor II Bidang Kemahasiswaan', email: 'warek2@universitas.ac.id', telp: '021-7654323' },
      { id: 4, nama: 'Dr. Maya Indira, S.E., M.M.', jabatan: 'Wakil Rektor III Bidang Kerjasama', email: 'warek3@universitas.ac.id', telp: '021-7654324' }
    ],
   mahasiswa: [
  { id: 1, nama: 'Ahmad Budiman', nim: '11S21001', angkatan: 2021, prodi: 'S1 Informatika' },
  { id: 2, nama: 'Siti Nurhaliza', nim: '11S21002', angkatan: 2021, prodi: 'S1 Sistem Informasi' },
  { id: 3, nama: 'Budi Santoso', nim: '11S21003', angkatan: 2020, prodi: 'S1 Teknik Elektro' },
  { id: 4, nama: 'Maya Indira', nim: '11S21004', angkatan: 2020, prodi: 'S1 Manajemen' }
],
himpunan: [
  {  namaHimpunan: 'Himpunan Mahasiswa Informatika', singkatan: 'HIMATIKA' },
  {  namaHimpunan: 'Himpunan Mahasiswa Sistem Informasi', singkatan: 'HIMASI' },
  {  namaHimpunan: 'Himpunan Mahasiswa Teknik Elektro', singkatan: 'HIMATEK' },
  {  namaHimpunan: 'Himpunan Mahasiswa Manajemen', singkatan: 'HIMAM' }
],

    organisasi: [
      { id: 1, nama: 'Fakultas Teknik', deskripsi: 'Fakultas yang menyelenggarakan pendidikan di bidang teknik dan teknologi', ketua: 'Dr. Rudi Hartono, S.T., M.T.', jumlahProdi: 5 },
      { id: 2, nama: 'Fakultas Ekonomi dan Bisnis', deskripsi: 'Fakultas yang menyelenggarakan pendidikan di bidang ekonomi dan bisnis', ketua: 'Prof. Dr. Lisa Marlina, S.E., M.M.', jumlahProdi: 3 },
      { id: 3, nama: 'Fakultas Ilmu Komputer', deskripsi: 'Fakultas yang menyelenggarakan pendidikan di bidang teknologi informasi', ketua: 'Dr. Andi Pratama, S.Kom., M.T.', jumlahProdi: 4 },
      { id: 4, nama: 'Fakultas Sains dan Matematika', deskripsi: 'Fakultas yang menyelenggarakan pendidikan di bidang sains dan matematika', ketua: 'Prof. Dr. Sarah Johnson, M.Sc.', jumlahProdi: 3 }
    ],
    galeri: [
      { id: 1, judul: 'Wisuda Periode I Tahun 2024', deskripsi: 'Prosesi wisuda sarjana dan magister periode pertama tahun akademik 2023/2024', kategori: 'Akademik', tanggal: '2024-03-15' },
      { id: 2, judul: 'Seminar Nasional Teknologi Digital', deskripsi: 'Seminar nasional tentang perkembangan teknologi digital dan AI', kategori: 'Seminar', tanggal: '2024-02-20' },
      { id: 3, judul: 'Kompetisi Programming Mahasiswa', deskripsi: 'Kompetisi programming tingkat nasional yang diikuti mahasiswa IT', kategori: 'Kompetisi', tanggal: '2024-01-25' },
      { id: 4, judul: 'Kunjungan Industri', deskripsi: 'Kegiatan kunjungan industri mahasiswa ke perusahaan teknologi terkemuka', kategori: 'Industri', tanggal: '2024-01-10' }
    ],
    berita: [
      { id: 1, judul: 'Mahasiswa Teknik Informatika Raih Juara 1 Kompetisi Programming Nasional', konten: 'Tim mahasiswa Teknik Informatika berhasil meraih juara pertama dalam kompetisi programming tingkat nasional', penulis: 'Humas Universitas', tanggal: '2024-03-10', status: 'Published', kategori: 'Prestasi' },
      { id: 2, judul: 'Universitas Menjalin Kerjasama Internasional dengan Universitas di Jepang', konten: 'Penandatanganan MoU kerjasama bidang penelitian dan pertukaran mahasiswa', penulis: 'Bagian Kerjasama', tanggal: '2024-03-08', status: 'Published', kategori: 'Kerjasama' },
      { id: 3, judul: 'Pembukaan Program Beasiswa untuk Mahasiswa Berprestasi', konten: 'Program beasiswa penuh untuk mahasiswa dengan prestasi akademik dan non-akademik terbaik', penulis: 'Bagian Kemahasiswaan', tanggal: '2024-03-05', status: 'Draft', kategori: 'Beasiswa' },
      { id: 4, judul: 'Seminar Nasional: Masa Depan Teknologi AI di Indonesia', konten: 'Seminar yang menghadirkan pakar AI terkemuka membahas perkembangan teknologi AI', penulis: 'Fakultas Teknik', tanggal: '2024-02-28', status: 'Published', kategori: 'Event' }
    ],
    pengumuman: [
      { 
        id: 1, 
        judul: 'Pendaftaran Mahasiswa Baru Tahun Akademik 2024/2025', 
        content: 'Pembukaan pendaftaran mahasiswa baru untuk semua program studi. Periode pendaftaran: 1 Maret - 30 April 2024. Silahkan siapkan berkas-berkas yang diperlukan sesuai dengan ketentuan yang berlaku.',
        filepath: '/files/pendaftaran-maba-2024.pdf',
        tanggal_mulai: '2024-03-01', 
        tanggal_tutup: '2024-04-30'
      },
      { 
        id: 2, 
        judul: 'Jadwal Ujian Tengah Semester Genap 2023/2024', 
        content: 'Pengumuman jadwal UTS untuk semua fakultas. Pelaksanaan: 15-26 April 2024. Harap mempersiapkan diri dengan baik dan mengikuti protokol kesehatan yang berlaku.',
        filepath: '/files/jadwal-uts-genap-2024.pdf',
        tanggal_mulai: '2024-03-12', 
        tanggal_tutup: '2024-04-26'
      },
      { 
        id: 3, 
        judul: 'Libur Semester dan Hari Raya', 
        content: 'Pengumuman libur semester genap dan libur hari raya. Kuliah dimulai kembali: 6 Mei 2024. Selamat menikmati libur dan mohon tetap menjaga kesehatan.',
        filepath: '/files/libur-semester-2024.pdf',
        tanggal_mulai: '2024-03-12', 
        tanggal_tutup: '2024-05-06'
      },
      { 
        id: 4, 
        judul: 'Pembayaran SPP Semester Genap 2023/2024', 
        content: 'Batas akhir pembayaran SPP: 31 Maret 2024. Dapat dibayar melalui bank partner atau virtual account. Pastikan untuk menyimpan bukti pembayaran dengan baik.',
        filepath: '/files/pembayaran-spp-genap-2024.pdf',
        tanggal_mulai: '2024-02-15', 
        tanggal_tutup: '2024-03-31'
      }
    ],
    ukm: [
      { id: 1, nama: 'UKM Basket Universitas', pembina: 'Drs. Andi Setiawan, M.Pd.', anggota: 45, deskripsi: 'Unit kegiatan mahasiswa yang bergerak di bidang olahraga bola basket', prestasi: 'Juara 1 Liga Basket Antar Universitas 2023' },
      { id: 2, nama: 'UKM Paduan Suara Mahasiswa', pembina: 'Dra. Sarah Melati, M.Sn.', anggota: 35, deskripsi: 'Unit kegiatan mahasiswa di bidang seni musik vokal dan paduan suara', prestasi: 'Juara 2 Festival Paduan Suara Nasional 2023' },
      { id: 3, nama: 'UKM Fotografi dan Sinematografi', pembina: 'Budi Prasetyo, S.Sn., M.Ds.', anggota: 28, deskripsi: 'UKM yang mengembangkan bakat mahasiswa di bidang fotografi dan videografi', prestasi: 'Best Documentary Film Festival 2023' },
      { id: 4, nama: 'UKM Pecinta Alam dan Lingkungan', pembina: 'Dr. Ir. Eko Susanto, M.Si.', anggota: 52, deskripsi: 'UKM yang fokus pada kegiatan alam bebas dan pelestarian lingkungan', prestasi: 'Program Konservasi Terbaik se-Jawa 2023' }
    ],
    departemen: [
      { id: 1, nama: 'Teknik Informatika', ketua: 'Dr. Rudi Hartono, S.T., M.T.', mahasiswa: 450, dosen: 15, akreditasi: 'A' },
      { id: 2, nama: 'Sistem Informasi', ketua: 'Dr. Maya Sari, S.Kom., M.T.', mahasiswa: 320, dosen: 12, akreditasi: 'A' },
      { id: 3, nama: 'Teknik Elektro', ketua: 'Prof. Dr. Ir. Bambang Susilo, M.T.', mahasiswa: 280, dosen: 18, akreditasi: 'A' },
      { id: 4, nama: 'Manajemen', ketua: 'Dr. Sinta Dewi, S.E., M.M.', mahasiswa: 380, dosen: 14, akreditasi: 'A' },
      { id: 5, nama: 'Akuntansi', ketua: 'Prof. Dr. Hadi Purnomo, S.E., M.Ak.', mahasiswa: 350, dosen: 13, akreditasi: 'A' }
    ],
  
  };



export const menuItems = [
  { key: "dashboard", label: "Dashboard", icon: Home, path: "/admin/dashboard" },
  { key: "mahasiswa", label: "Mahasiswa", icon: Users, path: "/admin/mahasiswa" },
  { key: "himpunan", label: "Himpunan Mahasiswa", icon: GraduationCap, path: "/admin/himpunan" },
  { key: "ukm", label: "UKM", icon: BookOpen, path: "/admin/ukm" },
  { key: "departement", label: "Departemen", icon: Briefcase, path: "/admin/department" },
  { key: "galeri", label: "Galeri", icon: ImageIcon, path: "/admin/galery" }, 
  { key: "berita", label: "Berita", icon: Newspaper, path: "/admin/news" },
  { key: "pengumuman", label: "Pengumuman", icon: Megaphone, path: "/admin/announcement" },
  { key: "visiMisi", label: "Visi & Misi", icon: Target, path: "/admin/visimisi" },
  { key: "profile", label: "Profile", icon: Settings, path: "/admin/profile" },
];

export const menuItemsbem = [
  { key: "dashboard", label: "Dashboard", icon: Home, path: "/bem/dashboard" },
  { key: "galeri", label: "Galeri", icon: ImageIcon, path: "/bem/galery" },
  { key: "berita", label: "Berita", icon: Newspaper, path: "/bem/news" },
  { key: "pengumuman", label: "Pengumuman", icon: Megaphone, path: "/bem/announcement" },
  { key: "visiMisi", label: "Visi & Misi", icon: Target, path: "/bem/visimisi" },
  { key: "profile", label: "Profile", icon: Settings, path: "/bem/profile" },
];

 export const ukmMenuItems = [
  { key: "dashboard", label: "Dashboard", icon: Home, path: "/ukm/dashboard" },
  { key: "profile", label: "Profile", icon: Newspaper, path: "/ukm/profile" },
  { key: "galeri", label: "Galeri", icon: ImageIcon, path: "/ukm/galery" }, 
  { key: "berita", label: "Berita", icon: Newspaper, path: "/ukm/news" },
  { key: "pengumuman", label: "Pengumuman", icon: Megaphone, path: "/ukm/announcement" },
  ];

   export const departemenMenuItems = [
  { key: "dashboard", label: "Dashboard", icon: Home, path: "/departmen/dashboard" },
  { key: "profile", label: "Profile", icon: Newspaper, path: "/departmen/profile" },
  { key: "galeri", label: "Galeri", icon: ImageIcon, path: "/departmen/galery" }, 
  { key: "berita", label: "Berita", icon: Newspaper, path: "/departmen/news" },
  { key: "pengumuman", label: "Pengumuman", icon: Megaphone, path: "/departmen/announcement" },
  ];

     export const himpunanMenuItems = [
  { key: "dashboard", label: "Dashboard", icon: Home, path: "/himpunan/dashboard" },
  { key: "profile", label: "Profile", icon: Newspaper, path: "/himpunan/profile" },
  { key: "galeri", label: "Galeri", icon: ImageIcon, path: "/himpunan/galery" }, 
  { key: "berita", label: "Berita", icon: Newspaper, path: "/himpunan/news" },
  { key: "pengumuman", label: "Pengumuman", icon: Megaphone, path: "/himpunan/announcement" },
  ];