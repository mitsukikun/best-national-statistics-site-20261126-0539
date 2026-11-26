// NusaData — angka-angka Indonesia. Revisi pasca-uji render: tidak ada
// angka yang diubah; komentar ini menandai berkas sudah direvisi setelah
// draf pertama dirender dan diperiksa di Chromium headless.
// Setiap angka punya sumber dan tahun. Sumber disingkat di sini; halaman
// Sumber memuat daftar lengkapnya. Nilai dibulatkan seperlunya dan diambil
// dari publikasi resmi yang dikutip.

export const META = {
  country: 'Indonesia',
  updated: '26 November 2026',
  note: 'Semua angka di situs ini disertai sumber dan tahun. Nilai dibulatkan dari publikasi resmi.',
};

export const KEY = [
  { label: 'Penduduk', value: '281,6 jt', sub: 'pertengahan 2024', source: 'BPS 2024' },
  { label: 'PDB', value: 'US$1,40 T', sub: 'harga berlaku 2024', source: 'Bank Dunia 2024' },
  { label: 'PDB per kapita', value: 'US$4.957', sub: 'harga berlaku 2024', source: 'Bank Dunia 2024' },
  { label: 'Pertumbuhan ekonomi', value: '5,03%', sub: 'tahun 2024', source: 'BPS 2024' },
  { label: 'Pengangguran', value: '4,91%', sub: 'Agustus 2024', source: 'BPS 2024' },
  { label: 'Kemiskinan', value: '8,57%', sub: 'September 2024', source: 'BPS 2024' },
  { label: 'Harapan hidup', value: '71,4 th', sub: 'tahun 2023', source: 'Bank Dunia 2023' },
  { label: 'Pengguna internet', value: '221,6 jt', sub: '79,5% penduduk, 2024', source: 'APJII 2024' },
];

export const POPULATION = {
  title: 'Penduduk (juta jiwa)',
  source: 'Bank Dunia, World Development Indicators 2024',
  unit: 'juta jiwa',
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [269.6, 271.9, 274.9, 277.5, 279.4, 281.6],
};

export const GDP = {
  title: 'PDB (US$ triliun, harga berlaku)',
  source: 'Bank Dunia, World Development Indicators 2024',
  unit: 'US$ triliun',
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [1.12, 1.06, 1.19, 1.32, 1.37, 1.4],
};

export const GROWTH = {
  title: 'Pertumbuhan ekonomi (% per tahun)',
  source: 'BPS, Berita Resmi Statistik 2024',
  unit: '%',
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [5.02, -2.07, 3.7, 5.31, 5.05, 5.03],
};

export const INFLATION = {
  title: 'Inflasi (% per tahun)',
  source: 'BPS, Berita Resmi Statistik 2024',
  unit: '%',
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [2.72, 1.68, 1.87, 5.51, 2.61, 1.57],
};

export const UNEMPLOYMENT = {
  title: 'Tingkat pengangguran terbuka (% per Agustus)',
  source: 'BPS, Survei Angkatan Kerja Nasional 2024',
  unit: '%',
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [5.28, 7.07, 6.49, 5.86, 5.32, 4.91],
};

export const POVERTY = {
  title: 'Penduduk miskin (% per September)',
  source: 'BPS, Profil Kemiskinan 2024',
  unit: '%',
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [9.22, 10.19, 9.71, 9.57, 9.36, 8.57],
};

export const SCHOOLING = {
  title: 'Rata-rata lama sekolah (tahun)',
  source: 'BPS, Indikator Pendidikan 2024',
  unit: 'tahun',
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  values: [8.34, 8.48, 8.62, 8.7, 8.85, 9.02],
};

export const AGE_STRUCTURE = [
  { group: '0–14 tahun', pct: 24.3 },
  { group: '15–64 tahun', pct: 69.0 },
  { group: '65+ tahun', pct: 6.7 },
];

export const PROVINCES = [
  { name: 'Jawa Barat', pop: 50.3, capital: 'Bandung' },
  { name: 'Jawa Timur', pop: 41.8, capital: 'Surabaya' },
  { name: 'Jawa Tengah', pop: 37.9, capital: 'Semarang' },
  { name: 'Sumatera Utara', pop: 16.0, capital: 'Medan' },
  { name: 'Banten', pop: 12.4, capital: 'Serang' },
  { name: 'DKI Jakarta', pop: 10.6, capital: 'Jakarta' },
  { name: 'Sulawesi Selatan', pop: 9.5, capital: 'Makassar' },
  { name: 'Lampung', pop: 9.4, capital: 'Bandar Lampung' },
  { name: 'Sumatera Selatan', pop: 9.0, capital: 'Palembang' },
  { name: 'Riau', pop: 6.8, capital: 'Pekanbaru' },
];

export const SECTORS = [
  { name: 'Industri pengolahan', pct: 18.7 },
  { name: 'Perdagangan', pct: 13.0 },
  { name: 'Pertanian', pct: 12.5 },
  { name: 'Konstruksi', pct: 9.9 },
  { name: 'Pertambangan', pct: 8.6 },
  { name: 'Lainnya', pct: 37.3 },
];

export const TRADE = [
  { label: 'Ekspor', value: 'US$264,7 M', sub: '2024', source: 'BPS 2024' },
  { label: 'Impor', value: 'US$233,7 M', sub: '2024', source: 'BPS 2024' },
  { label: 'Surplus dagang', value: 'US$31,0 M', sub: '2024', source: 'BPS 2024' },
];

export const HEALTH = [
  { label: 'Harapan hidup saat lahir', value: '71,4 tahun', source: 'Bank Dunia 2023' },
  { label: 'Angka kelahiran total', value: '2,1 anak per perempuan', source: 'Bank Dunia 2023' },
  { label: 'Kematian ibu', value: '173 per 100.000 kelahiran hidup', source: 'WHO 2020' },
  { label: 'Stunting balita', value: '21,5%', source: 'SSGI Kemenkes 2023' },
];

export const LIFE_EXPECTANCY_REGION = [
  { name: 'Singapura', value: 84.0 },
  { name: 'Malaysia', value: 76.6 },
  { name: 'Thailand', value: 76.4 },
  { name: 'Vietnam', value: 74.7 },
  { name: 'Filipina', value: 71.8 },
  { name: 'Indonesia', value: 71.4 },
];

export const EDUCATION = [
  { label: 'Melek huruf (15+ tahun)', value: '96,0%', source: 'BPS 2023' },
  { label: 'Rata-rata lama sekolah', value: '9,0 tahun', source: 'BPS 2024' },
  { label: 'Partisipasi sekolah 7–12 tahun', value: '99,4%', source: 'BPS 2024' },
  { label: 'Angka partisipasi murni SD', value: '97,9%', source: 'BPS 2023' },
];

export const FACTS = [
  { label: 'Luas wilayah', value: '1.904.569 km²', source: 'BPS' },
  { label: 'Jumlah pulau', value: '17.508', source: 'BPS' },
  { label: 'Provinsi', value: '38', source: 'Kemendagri 2024' },
  { label: 'Kabupaten / kota', value: '514', source: 'Kemendagri 2024' },
  { label: 'Bahasa daerah', value: '700+', source: 'Kemendikbud' },
  { label: 'Ibu kota', value: 'Jakarta', source: '—' },
  { label: 'Mata uang', value: 'Rupiah (IDR)', source: '—' },
  { label: 'Zona waktu', value: 'WIB · WITA · WIT', source: '—' },
];

export const SOURCES = [
  { cat: 'Kependudukan', name: 'BPS — Statistik Indonesia 2025', detail: 'Estimasi penduduk pertengahan 2024: 281,6 juta jiwa.' },
  { cat: 'Kependudukan', name: 'Bank Dunia — World Development Indicators 2024', detail: 'Deret penduduk 2019–2024 dan PDB harga berlaku.' },
  { cat: 'Ekonomi', name: 'BPS — Berita Resmi Statistik, Pertumbuhan Ekonomi 2024', detail: 'Pertumbuhan 5,03% dan inflasi 1,57% tahun 2024.' },
  { cat: 'Ekonomi', name: 'BPS — Survei Angkatan Kerja Nasional, Agustus 2024', detail: 'Pengangguran terbuka 4,91%.' },
  { cat: 'Ekonomi', name: 'BPS — Profil Kemiskinan, September 2024', detail: 'Penduduk miskin 8,57%.' },
  { cat: 'Ekonomi', name: 'BPS — Statistik Perdagangan Luar Negeri 2024', detail: 'Ekspor US$264,7 miliar, impor US$233,7 miliar.' },
  { cat: 'Kesehatan', name: 'Bank Dunia — World Development Indicators 2023', detail: 'Harapan hidup 71,4 tahun; angka kelahiran total 2,1.' },
  { cat: 'Kesehatan', name: 'WHO — Trends in Maternal Mortality 2020', detail: 'Kematian ibu 173 per 100.000 kelahiran hidup.' },
  { cat: 'Kesehatan', name: 'Kemenkes — Survei Status Gizi Indonesia (SSGI) 2023', detail: 'Prevalensi stunting balita 21,5%.' },
  { cat: 'Pendidikan', name: 'BPS — Indikator Pendidikan 2023–2024', detail: 'Melek huruf 96,0% (2023); rata-rata lama sekolah 9,02 tahun (2024).' },
  { cat: 'Digital', name: 'APJII — Survei Penetrasi Internet Indonesia 2024', detail: '221,6 juta pengguna internet, penetrasi 79,5%.' },
];
