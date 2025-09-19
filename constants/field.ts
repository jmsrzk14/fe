export const fieldConfigs = {
    visiMisi: [
      { key: 'type', label: 'Jenis', type: 'select', options: ['Visi', 'Misi'] },
      { key: 'content', label: 'Konten', type: 'textarea' }
    ],
    profile: [
      { key: 'nama', label: 'Nama Lengkap', type: 'text' },
      { key: 'jabatan', label: 'Jabatan', type: 'text' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'telp', label: 'Telepon', type: 'text' }
    ],
    mahasiswa: [
  { key: 'nama', label: 'Nama Lengkap', type: 'text' },
  { key: 'nim', label: 'NIM', type: 'text' },
  { key: 'angkatan', label: 'Angkatan', type: 'number' },
  { key: 'prodi', label: 'Program Studi', type: 'text' }
],
 himpunan: [
  { key: 'namaHimpunan', label: 'Nama Himpunan', type: 'text' },
  { key: 'singkatan', label: 'Nama Singkatan', type: 'text' }
],
    organisasi: [
      { key: 'nama', label: 'Nama Organisasi', type: 'text' },
      { key: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
      { key: 'ketua', label: 'Ketua', type: 'text' },
      { key: 'jumlahProdi', label: 'Jumlah Program Studi', type: 'number' }
    ],
    galeri: [
      { key: 'judul', label: 'Judul', type: 'text' },
      { key: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
      { key: 'kategori', label: 'Kategori', type: 'select', options: ['Akademik', 'Seminar', 'Kompetisi', 'Industri'] },
      { key: 'tanggal', label: 'Tanggal', type: 'date' }
    ],
    berita: [
      { key: 'judul', label: 'Judul Berita', type: 'text' },
      { key: 'konten', label: 'Konten', type: 'textarea' },
      { key: 'penulis', label: 'Penulis', type: 'text' },
      { key: 'tanggal', label: 'Tanggal', type: 'date' },
      { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Published'] },
      { key: 'kategori', label: 'Kategori', type: 'select', options: ['Prestasi', 'Kerjasama', 'Beasiswa', 'Event'] }
    ],
    pengumuman: [
      { key: 'judul', label: 'Judul Pengumuman', type: 'text' },
      { key: 'konten', label: 'Konten', type: 'textarea' },
      { key: 'tanggal', label: 'Tanggal', type: 'date' },
      { key: 'prioritas', label: 'Prioritas', type: 'select', options: ['Rendah', 'Sedang', 'Tinggi'] },
      { key: 'kategori', label: 'Kategori', type: 'select', options: ['Pendaftaran', 'Akademik', 'Libur', 'Pembayaran'] }
    ],
    ukm: [
      { key: 'nama', label: 'Nama UKM', type: 'text' },
      { key: 'pembina', label: 'Pembina', type: 'text' },
      { key: 'anggota', label: 'Jumlah Anggota', type: 'number' },
      { key: 'deskripsi', label: 'Deskripsi', type: 'textarea' },
      { key: 'prestasi', label: 'Prestasi', type: 'text' }
    ],
    departemen: [
      { key: 'nama', label: 'Nama Departemen', type: 'text' },
      { key: 'ketua', label: 'Ketua Departemen', type: 'text' },
      { key: 'mahasiswa', label: 'Jumlah Mahasiswa', type: 'number' },
      { key: 'dosen', label: 'Jumlah Dosen', type: 'number' },
      { key: 'akreditasi', label: 'Akreditasi', type: 'select', options: ['A', 'B', 'C'] }
    ],

  };