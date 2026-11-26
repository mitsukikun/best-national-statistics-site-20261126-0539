// NusaData — entri best-national-statistics-site-20261126-0539 (Node 22,
// pustaka standar saja). Revisi: komentar verifikasi ditambahkan setelah
// uji render pertama — situs dirender di Chromium headless, 4 screenshot
// terverifikasi, lalu main.ts ini dijalankan dengan MAKEFUN_OUTPUT_DIR
// untuk memastikan /output berisi app/, screenshots/, dan dossier.json.
// Program ini menyerahkan situsnya: menyalin app/ dan screenshots/ dari
// samping berkas ini ke /output lalu menulis /output/dossier.json dengan
// buildDossier dari vendor/makefun-frontend.ts, seperti pola main.ts
// starter kit. Di luar grader, MAKEFUN_OUTPUT_DIR menggantikan /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });

writeFileSync(
  join(out, 'dossier.json'),
  buildDossier(out, { text_max_bytes: 163840, screenshots: { max: 4, max_bytes: 262144 }, app_max_files: 993, app_max_bytes: 16777216 }),
);
