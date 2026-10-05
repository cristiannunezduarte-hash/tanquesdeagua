// Descarga en calidad ORIGINAL todas las imágenes de la página de Wix.
// Uso: npm run imagenes:wix [-- https://otra-url-de-wix]
// Las imágenes quedan en src/assets/images/wix/. Luego renómbralas
// (hero.jpg, lavado.jpg, impermeabilizacion.jpg, mantenimiento.jpg,
// instalacion.jpg, equipo.jpg) y muévelas a src/assets/images/.
// Astro las convertirá automáticamente a AVIF/WebP en varios tamaños.
import { mkdir, writeFile } from 'node:fs/promises';

const pages = process.argv.slice(2);
if (pages.length === 0) pages.push('https://cristiannunezduart.wixsite.com/tanques-de-agua');

const outDir = 'src/assets/images/wix';
await mkdir(outDir, { recursive: true });

const ids = new Set();
for (const page of pages) {
  const html = await (await fetch(page, { headers: { 'user-agent': 'Mozilla/5.0' } })).text();
  // Ej.: https://static.wixstatic.com/media/abc123_def~mv2.jpg/v1/fill/w_980,h_600/...  →  abc123_def~mv2.jpg
  for (const m of html.matchAll(/static\.wixstatic\.com\/media\/([a-zA-Z0-9_~.-]+\.(?:jpe?g|png|webp|gif))/g)) {
    ids.add(m[1]);
  }
}

console.log(`Encontradas ${ids.size} imágenes`);
for (const id of ids) {
  const url = `https://static.wixstatic.com/media/${id}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.warn(`  ✗ ${url} (${res.status})`);
    continue;
  }
  const file = `${outDir}/${id.replace(/~mv2/, '')}`;
  await writeFile(file, Buffer.from(await res.arrayBuffer()));
  console.log(`  ✓ ${file}`);
}
