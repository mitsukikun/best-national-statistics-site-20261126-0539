# NusaData — Statistik Indonesia

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/mitsukikun/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/mitsukikun/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

NusaData adalah portal statistik Indonesia yang berjalan dari berkas statis,
tanpa permintaan jaringan: penduduk, ekonomi, kesehatan, dan pendidikan,
dengan angka nyata yang masing-masing disertai sumber dan tahunnya.

Entri make.fun: `best-national-statistics-site-20261126-0539`.

## Isi situs

- **Beranda** — 8 indikator utama (penduduk 281,6 juta, PDB US$1,40 triliun,
  dan lainnya), bagan penduduk/PDB yang bisa diganti, provinsi terpadat.
- **Penduduk** — deret 2019–2024, struktur umur, dan tabel 10 provinsi
  terpadat yang bisa dicari dan diurutkan.
- **Ekonomi** — PDB, pertumbuhan, inflasi, sektor penyumbang PDB,
  perdagangan luar negeri, pengangguran, dan kemiskinan.
- **Kesehatan** — harapan hidup, angka kelahiran, kematian ibu, stunting,
  dan perbandingan harapan hidup se-Asia Tenggara.
- **Pendidikan** — melek huruf, rata-rata lama sekolah, partisipasi sekolah.
- **Sumber** — semua publikasi sumber, bisa disaring per topik.

Semua bagan digambar dengan kode SVG sendiri (`app/charts.js`); tidak ada
pustaka luar dan tidak ada permintaan jaringan.

## Menjalankan

Jalankan server statis apa pun dengan `app/` sebagai root, lalu buka
`index.html`. Contoh dengan Node 22:

```sh
cd app
python3 -m http.server 8080
# buka http://localhost:8080
```

Atau jalankan program penyerahannya (menyalin `app/` + `screenshots/` dan
menulis `dossier.json`):

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Sumber data

BPS, Bank Dunia (World Development Indicators), WHO, Kemenkes (SSGI 2023),
dan APJII (2024). Daftar lengkap ada di halaman Sumber pada situs.
