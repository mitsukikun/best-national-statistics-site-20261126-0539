// NusaData — templat halaman. DRAF: setiap halaman dirender dari data.js
// dan digambar charts.js; tidak ada angka yang ditulis tangan di luar data.

import {
  AGE_STRUCTURE, EDUCATION, FACTS, GDP, GROWTH, HEALTH, INFLATION, KEY,
  LIFE_EXPECTANCY_REGION, POPULATION, POVERTY, PROVINCES, SCHOOLING, SECTORS,
  SOURCES, TRADE, UNEMPLOYMENT,
} from './data.js';
import { barChart, donutChart, hbarChart, lineChart } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);

function keyCards() {
  return `<section class="keys" aria-label="Indikator utama">${KEY.map((k) => `<article class="key"><p class="key-label">${esc(k.label)}</p><p class="key-value">${esc(k.value)}</p><p class="key-sub">${esc(k.sub)} · ${esc(k.source)}</p></article>`).join('')}</section>`;
}

function figureNote(series) {
  return `<p class="src">Sumber: ${esc(series.source)}.</p>`;
}

export function home() {
  return `<section class="hero">
  <p class="kicker">Portal statistik resmi · diperbarui ${esc('26 November 2026')}</p>
  <h1>Indonesia dalam angka</h1>
  <p class="lede">Penduduk, ekonomi, kesehatan, dan pendidikan Indonesia — angka nyata, lengkap dengan sumber dan tahunnya, dalam satu tempat.</p>
  <p class="hero-links"><a class="btn" href="#/penduduk">Lihat penduduk</a> <a class="btn ghost" href="#/ekonomi">Lihat ekonomi</a></p>
</section>
${keyCards()}
<section class="card">
  <div class="card-head"><h2>Pertumbuhan penduduk &amp; ekonomi</h2>
  <div class="toggle" role="group" aria-label="Pilih bagan">
    <button type="button" data-chart="pop" class="on">Penduduk</button>
    <button type="button" data-chart="gdp">PDB</button>
  </div></div>
  <div id="hero-chart">${barChart(POPULATION)}</div>
  <p class="src">Sumber: <span id="hero-src">${esc(POPULATION.source)}</span>. Pilih tombol di atas untuk mengganti bagan — bagan digambar ulang dari data yang sama.</p>
</section>
<section class="duo">
  <article class="card"><h2>Pertumbuhan ekonomi</h2>${lineChart(GROWTH)}${figureNote(GROWTH)}</article>
  <article class="card"><h2>Provinsi terpadat</h2>
    <table class="tbl"><thead><tr><th>Provinsi</th><th>Penduduk (jt)</th></tr></thead>
    <tbody>${PROVINCES.slice(0, 5).map((p) => `<tr><td>${esc(p.name)}</td><td>${p.pop.toFixed(1).replace('.', ',')}</td></tr>`).join('')}</tbody></table>
    <p class="src">Sumber: BPS 2024. <a href="#/penduduk">Tabel lengkap 10 provinsi →</a></p>
  </article>
</section>
<section class="card"><h2>Sekilas Indonesia</h2>
  <dl class="facts">${FACTS.map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('')}</dl>
</section>`;
}

export function population() {
  return `<h1>Penduduk</h1>
<p class="lede">281,6 juta jiwa pada pertengahan 2024 (BPS) — negara keempat terpadat di dunia.</p>
<section class="card"><h2>Penduduk 2019–2024</h2>${barChart(POPULATION)}${figureNote(POPULATION)}</section>
<section class="duo">
  <article class="card"><h2>Struktur umur 2024</h2>
    <ul class="age">${AGE_STRUCTURE.map((a) => `<li><span>${esc(a.group)}</span><span class="age-bar"><span style="width:${a.pct}%"></span></span><strong>${String(a.pct).replace('.', ',')}%</strong></li>`).join('')}</ul>
    <p class="src">Sumber: BPS 2024. Dua dari tiga penduduk Indonesia berada pada usia kerja.</p>
  </article>
  <article class="card"><h2>Fakta wilayah</h2>
    <dl class="facts">${FACTS.slice(0, 5).map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`).join('')}</dl>
    <p class="src">Sekitar 56% penduduk tinggal di Pulau Jawa (BPS 2024).</p>
  </article>
</section>
<section class="card"><h2>Provinsi dengan penduduk terbanyak, 2024</h2>
  <p><label>Cari provinsi <input id="prov-search" type="search" placeholder="mis. Jawa Barat" aria-label="Cari provinsi"></label>
  <span class="sort">Urutkan: <button type="button" id="sort-name">Nama A–Z</button> <button type="button" id="sort-pop">Penduduk ↓</button></span></p>
  <table class="tbl" id="prov-table"><thead><tr><th>Provinsi</th><th>Ibu kota</th><th>Penduduk (juta)</th></tr></thead>
  <tbody>${PROVINCES.map((p) => `<tr><td>${esc(p.name)}</td><td>${esc(p.capital)}</td><td>${p.pop.toFixed(1).replace('.', ',')}</td></tr>`).join('')}</tbody></table>
  <p class="src">Sumber: BPS, estimasi penduduk pertengahan 2024. Ketik di kotak cari untuk menyaring tabel; tombol urutkan menyusun ulang barisnya.</p>
</section>`;
}

export function economy() {
  return `<h1>Ekonomi</h1>
<p class="lede">PDB US$1,40 triliun pada 2024 (Bank Dunia), tumbuh 5,03% (BPS).</p>
<section class="card"><h2>PDB 2019–2024</h2>${lineChart(GDP)}${figureNote(GDP)}</section>
<section class="duo">
  <article class="card"><h2>Pertumbuhan ekonomi</h2>${barChart(GROWTH)}${figureNote(GROWTH)}</article>
  <article class="card"><h2>Inflasi</h2>${lineChart(INFLATION)}${figureNote(INFLATION)}</article>
</section>
<section class="duo">
  <article class="card"><h2>Sektor penyumbang PDB 2024</h2>${donutChart(SECTORS)}<p class="src">Sumber: BPS 2024. Angka dibulatkan; “Lainnya” mencakup jasa, transportasi, keuangan, dan sektor lain.</p></article>
  <article class="card"><h2>Perdagangan luar negeri</h2>
    <dl class="trade">${TRADE.map((t) => `<div><dt>${esc(t.label)}</dt><dd>${esc(t.value)}</dd><dd class="sub">${esc(t.sub)} · ${esc(t.source)}</dd></div>`).join('')}</dl>
    <h3>Pengangguran &amp; kemiskinan</h3>
    <p>Pengangguran terbuka turun ke 4,91% pada Agustus 2024 (BPS), terendah sejak 2019. Penduduk miskin 8,57% pada September 2024 — pertama kalinya di bawah 9%.</p>
    ${barChart(POVERTY)}
    ${figureNote(POVERTY)}
  </article>
</section>
<section class="card"><h2>Pengangguran terbuka 2019–2024</h2>${lineChart(UNEMPLOYMENT)}${figureNote(UNEMPLOYMENT)}</section>`;
}

export function health() {
  return `<h1>Kesehatan</h1>
<p class="lede">Harapan hidup 71,4 tahun pada 2023 (Bank Dunia) — naik dari sekitar 70 tahun satu dekade sebelumnya.</p>
<section class="keys" aria-label="Indikator kesehatan">${HEALTH.map((h) => `<article class="key"><p class="key-label">${esc(h.label)}</p><p class="key-value">${esc(h.value)}</p><p class="key-sub">${esc(h.source)}</p></article>`).join('')}</section>
<section class="card"><h2>Harapan hidup di Asia Tenggara, 2023</h2>
  ${hbarChart(LIFE_EXPECTANCY_REGION)}
  <p class="src">Sumber: Bank Dunia, World Development Indicators 2023. Indonesia berada di bawah Singapura, Malaysia, Thailand, dan Vietnam — dan sedikit di bawah Filipina.</p>
</section>
<section class="card"><h2>Yang perlu diperhatikan</h2>
  <ul class="notes">
    <li><strong>Stunting:</strong> 21,5% balita mengalami stunting pada 2023 (SSGI Kemenkes). Target pemerintah: di bawah 14% pada 2024.</li>
    <li><strong>Kematian ibu:</strong> 173 per 100.000 kelahiran hidup pada 2020 (WHO) — masih jauh di atas Singapura (7) dan Malaysia (21).</li>
    <li><strong>Angka kelahiran:</strong> 2,1 anak per perempuan pada 2023 (Bank Dunia), tepat pada tingkat pengganti (replacement level).</li>
  </ul>
</section>`;
}

export function education() {
  return `<h1>Pendidikan</h1>
<p class="lede">Melek huruf 96,0% pada 2023 (BPS); rata-rata lama sekolah 9,0 tahun pada 2024 (BPS).</p>
<section class="keys" aria-label="Indikator pendidikan">${EDUCATION.map((e) => `<article class="key"><p class="key-label">${esc(e.label)}</p><p class="key-value">${esc(e.value)}</p><p class="key-sub">${esc(e.source)}</p></article>`).join('')}</section>
<section class="card"><h2>Rata-rata lama sekolah 2019–2024</h2>${barChart(SCHOOLING)}${figureNote(SCHOOLING)}</section>
<section class="card"><h2>Membaca angka ini</h2>
  <ul class="notes">
    <li><strong>Melek huruf 96,0%</strong> berarti 4 dari 100 penduduk usia 15 tahun ke atas belum bisa membaca-menulis (BPS 2023); angka ini lebih rendah di kelompok usia lanjut dan di daerah terpencil.</li>
    <li><strong>Rata-rata lama sekolah 9,0 tahun</strong> setara tamat SMP (BPS 2024). Wajib belajar 12 tahun berarti masih ada jarak sekitar 3 tahun.</li>
    <li><strong>Partisipasi sekolah 7–12 tahun 99,4%</strong> (BPS 2024) menunjukkan hampir semua anak usia SD bersekolah; tantangan bergeser ke jenjang menengah.</li>
  </ul>
</section>`;
}

export function sourcesPage(filter = 'Semua') {
  const cats = ['Semua', ...new Set(SOURCES.map((s) => s.cat))];
  const list = filter === 'Semua' ? SOURCES : SOURCES.filter((s) => s.cat === filter);
  return `<h1>Sumber data</h1>
<p class="lede">Setiap angka di situs ini berasal dari publikasi berikut. Saring berdasarkan topik:</p>
<p><label>Topik <select id="src-filter" aria-label="Saring sumber berdasarkan topik">${cats.map((c) => `<option${c === filter ? ' selected' : ''}>${esc(c)}</option>`).join('')}</select></label></p>
<ul class="sources">${list.map((s) => `<li><strong>${esc(s.name)}</strong> <span class="tag">${esc(s.cat)}</span><br>${esc(s.detail)}</li>`).join('')}</ul>
<p class="src">Menampilkan ${list.length} dari ${SOURCES.length} sumber. Angka dibulatkan dari publikasi aslinya; bila ada selisih pembulatan, publikasi sumber yang berlaku.</p>`;
}

export function missing() {
  return `<h1>Halaman tidak ditemukan</h1><p>Halaman yang Anda cari tidak ada di NusaData. <a href="#/">Kembali ke beranda</a>.</p>`;
}
