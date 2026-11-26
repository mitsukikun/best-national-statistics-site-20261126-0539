// NusaData — perute hash dan semua kontrol interaktif. DRAF.
// Rute: #/ (beranda), #/penduduk, #/ekonomi, #/kesehatan, #/pendidikan,
// #/sumber. window.__shotReady menandai halaman selesai dirender.

import { GDP, POPULATION, PROVINCES } from './data.js';
import { barChart, lineChart } from './charts.js';
import { economy, education, health, home, missing, population, sourcesPage } from './views.js';

const app = document.getElementById('app');

const ROUTES = {
  '': home,
  penduduk: population,
  ekonomi: economy,
  kesehatan: health,
  pendidikan: education,
  sumber: sourcesPage,
};

function currentRoute() {
  const m = location.hash.match(/^#\/([^/?]+)?/);
  return m ? (m[1] || '') : '';
}

// Toggle bagan beranda: Penduduk (batang) atau PDB (garis).
function wireHomeToggle() {
  const box = document.getElementById('hero-chart');
  if (!box) return;
  const src = document.getElementById('hero-src');
  document.querySelectorAll('[data-chart]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-chart]').forEach((b) => b.classList.remove('on'));
      btn.classList.add('on');
      if (btn.dataset.chart === 'gdp') {
        box.innerHTML = lineChart(GDP);
        if (src) src.textContent = GDP.source;
      } else {
        box.innerHTML = barChart(POPULATION);
        if (src) src.textContent = POPULATION.source;
      }
    });
  });
}

// Tabel provinsi: cari + urutkan, bekerja pada baris yang dirender.
function wireProvinceTable() {
  const table = document.getElementById('prov-table');
  if (!table) return;
  const body = table.querySelector('tbody');
  const input = document.getElementById('prov-search');
  let rows = [...PROVINCES];
  let query = '';
  function draw() {
    const shown = rows.filter((p) => p.name.toLowerCase().includes(query));
    body.innerHTML = shown.length
      ? shown.map((p) => `<tr><td>${p.name}</td><td>${p.capital}</td><td>${p.pop.toFixed(1).replace('.', ',')}</td></tr>`).join('')
      : '<tr><td colspan="3">Tidak ada provinsi yang cocok. Coba kata lain.</td></tr>';
  }
  if (input) input.addEventListener('input', () => { query = input.value.trim().toLowerCase(); draw(); });
  const byName = document.getElementById('sort-name');
  const byPop = document.getElementById('sort-pop');
  if (byName) byName.addEventListener('click', () => { rows = [...rows].sort((a, b) => a.name.localeCompare(b.name, 'id')); draw(); });
  if (byPop) byPop.addEventListener('click', () => { rows = [...rows].sort((a, b) => b.pop - a.pop); draw(); });
}

// Saring daftar sumber berdasarkan topik.
function wireSourceFilter() {
  const sel = document.getElementById('src-filter');
  if (!sel) return;
  sel.addEventListener('change', () => {
    const keepScroll = window.scrollY;
    app.innerHTML = sourcesPage(sel.value);
    wireSourceFilter();
    window.scrollTo(0, keepScroll);
    const again = document.getElementById('src-filter');
    if (again) again.focus();
    window.__shotReady = true;
  });
}

function render() {
  window.__shotReady = false;
  const route = currentRoute();
  const view = ROUTES[route] || missing;
  document.title = `${route ? route[0].toUpperCase() + route.slice(1) : 'Beranda'} | NusaData — Statistik Indonesia`;
  app.innerHTML = view();
  document.querySelectorAll('nav a').forEach((a) => {
    const href = a.getAttribute('href') || '';
    a.classList.toggle('active', href === `#/${route}`);
  });
  wireHomeToggle();
  wireProvinceTable();
  wireSourceFilter();
  window.scrollTo(0, 0);
  window.__shotReady = true;
}

window.addEventListener('hashchange', render);
render();
