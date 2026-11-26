// NusaData — gambar SVG digambar dari kode sendiri, tanpa pustaka luar.
// DRAF: barChart, lineChart, donutChart, hbarChart. Semua menerima data
// {years, values} atau daftar {name, pct} dan mengembalikan string SVG.

const NS = 'http://www.w3.org/2000/svg';
const INK = '#0b3d3a';
const TEAL = '#147a72';
const AMBER = '#e8a317';
const TERRA = '#c4552d';
const GRID = '#d8d2c2';
const MUTED = '#5d6b66';

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => `&#${c.charCodeAt(0)};`);
}

function niceMax(v) {
  const p = 10 ** Math.floor(Math.log10(v));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 3 ? 3 : n <= 4 ? 4 : n <= 5 ? 5 : n <= 7.5 ? 7.5 : 10) * p;
}

function fmt(v) {
  return String(v).replace('.', ',');
}

// Bagan batang vertikal dengan label nilai di atas tiap batang.
export function barChart(series, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 300;
  const padL = 52;
  const padB = 34;
  const padT = 26;
  const max = niceMax(Math.max(...series.values) * 1.05);
  const min = Math.min(0, Math.min(...series.values));
  const range = max - min;
  const plotW = w - padL - 16;
  const plotH = h - padT - padB;
  const step = plotW / series.values.length;
  const bw = Math.min(46, step * 0.58);
  const y = (v) => padT + plotH - ((v - min) / range) * plotH;
  let g = '';
  for (let i = 0; i <= 4; i += 1) {
    const gv = min + (range * i) / 4;
    const gy = y(gv);
    g += `<line x1="${padL}" y1="${gy}" x2="${w - 16}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>`;
    g += `<text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmt(Math.round(gv * 100) / 100)}</text>`;
  }
  const bars = series.values
    .map((v, i) => {
      const x = padL + step * i + (step - bw) / 2;
      const neg = v < 0;
      const yTop = neg ? y(0) : y(v);
      const bh = Math.abs(y(v) - y(0));
      const col = neg ? TERRA : i === series.values.length - 1 ? AMBER : TEAL;
      return `<rect x="${x.toFixed(1)}" y="${yTop.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(bh, 2).toFixed(1)}" rx="3" fill="${col}"/>`
        + `<text x="${(x + bw / 2).toFixed(1)}" y="${(yTop - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${fmt(v)}</text>`
        + `<text x="${(x + bw / 2).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="11" fill="${MUTED}">${series.years[i]}</text>`;
    })
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(series.title)}" xmlns="${NS}">${g}${bars}</svg>`;
}

// Bagan garis dengan titik dan label nilai.
export function lineChart(series, opts = {}) {
  const w = opts.width || 640;
  const h = opts.height || 300;
  const padL = 52;
  const padB = 34;
  const padT = 26;
  const vals = series.values;
  const lo = Math.min(...vals);
  const hi = Math.max(...vals);
  const min = Math.floor(lo * 0.9 * 100) / 100;
  const max = Math.ceil(hi * 1.05 * 100) / 100;
  const range = max - min || 1;
  const plotW = w - padL - 16;
  const plotH = h - padT - padB;
  const x = (i) => padL + (plotW * i) / (vals.length - 1);
  const y = (v) => padT + plotH - ((v - min) / range) * plotH;
  let g = '';
  for (let i = 0; i <= 4; i += 1) {
    const gv = min + (range * i) / 4;
    const gy = y(gv);
    g += `<line x1="${padL}" y1="${gy}" x2="${w - 16}" y2="${gy}" stroke="${GRID}" stroke-width="1"/>`;
    g += `<text x="${padL - 8}" y="${gy + 4}" text-anchor="end" font-size="11" fill="${MUTED}">${fmt(Math.round(gv * 100) / 100)}</text>`;
  }
  const pts = vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
  const dots = vals
    .map((v, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4.5" fill="${AMBER}" stroke="#fff" stroke-width="1.5"/>`
      + `<text x="${x(i).toFixed(1)}" y="${(y(v) - 10).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="700" fill="${INK}">${fmt(v)}</text>`
      + `<text x="${x(i).toFixed(1)}" y="${h - 12}" text-anchor="middle" font-size="11" fill="${MUTED}">${series.years[i]}</text>`)
    .join('');
  return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(series.title)}" xmlns="${NS}">${g}<polyline points="${pts}" fill="none" stroke="${TEAL}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>${dots}</svg>`;
}

// Bagan donat: daftar {name, pct} dengan legenda.
export function donutChart(items, opts = {}) {
  const size = opts.size || 300;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const inner = r * 0.62;
  const total = items.reduce((a, b) => a + b.pct, 0);
  const palette = [TEAL, AMBER, TERRA, '#7a9e7e', '#4a6fa5', '#9a8c6a'];
  let a0 = -Math.PI / 2;
  let paths = '';
  items.forEach((it, i) => {
    const a1 = a0 + (it.pct / total) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const xi1 = cx + inner * Math.cos(a1);
    const yi1 = cy + inner * Math.sin(a1);
    const xi0 = cx + inner * Math.cos(a0);
    const yi0 = cy + inner * Math.sin(a0);
    paths += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${xi1.toFixed(1)} ${yi1.toFixed(1)} A ${inner} ${inner} 0 ${large} 0 ${xi0.toFixed(1)} ${yi0.toFixed(1)} Z" fill="${palette[i % palette.length]}"/>`;
    a0 = a1;
  });
  const legend = items
    .map((it, i) => `<li><span class="sw" style="background:${palette[i % palette.length]}"></span>${esc(it.name)} — <strong>${fmt(it.pct)}%</strong></li>`)
    .join('');
  return `<div class="donut-wrap"><svg viewBox="0 0 ${size} ${size}" role="img" aria-label="Pembagian sektor ekonomi" xmlns="${NS}">${paths}<text x="${cx}" y="${cy - 4}" text-anchor="middle" font-size="26" font-weight="800" fill="${INK}">100%</text><text x="${cx}" y="${cy + 18}" text-anchor="middle" font-size="12" fill="${MUTED}">dari PDB</text></svg><ul class="legend">${legend}</ul></div>`;
}

// Bagan batang horizontal untuk perbandingan antarwilayah.
export function hbarChart(items, opts = {}) {
  const w = opts.width || 640;
  const rowH = 34;
  const h = items.length * rowH + 16;
  const max = Math.max(...items.map((i) => i.value));
  const labelW = 110;
  const rows = items
    .map((it) => {
      const bw = ((w - labelW - 70) * it.value) / max;
      const isId = it.name === 'Indonesia';
      return `<div class="hbar-row"><span class="hbar-label">${esc(it.name)}</span><span class="hbar-track"><span class="hbar-fill${isId ? ' id' : ''}" style="width:${(bw / (w - labelW - 70)) * 100}%"></span></span><span class="hbar-value">${fmt(it.value)}</span></div>`;
    })
    .join('');
  return `<div class="hbar" style="height:${h}px">${rows}</div>`;
}
