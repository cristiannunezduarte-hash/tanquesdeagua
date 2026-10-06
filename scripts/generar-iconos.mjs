// Genera íconos PNG y la imagen para redes sociales (og-default.jpg).
// Uso: node scripts/generar-iconos.mjs
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const logo = await readFile('public/favicon.svg');
const icon = (size) => sharp(logo, { density: 600 }).resize(size, size).png();

await icon(180).toFile('public/apple-touch-icon.png');
await icon(192).toFile('public/icon-192.png');
await icon(512).toFile('public/icon-512.png');
await icon(512).toFile('public/logo.png');

// Imagen para compartir en WhatsApp/Facebook (1200×630) sobre la foto de riego
const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0a2236" stop-opacity=".95"/><stop offset=".75" stop-color="#0a2236" stop-opacity=".55"/><stop offset="1" stop-color="#0a2236" stop-opacity=".2"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(80 120) scale(2.4)">${logo.toString().replace(/<\/?svg[^>]*>/g, '')}</g>
  <text x="80" y="300" font-family="Arial, sans-serif" font-size="74" font-weight="800" fill="#fff">Tanques de agua</text>
  <text x="80" y="370" font-family="Arial, sans-serif" font-size="34" fill="#8fd3ea">Potable · Cafetero · Ganadero · Sistemas sépticos · Valvulería</text>
  <rect x="80" y="430" width="470" height="70" rx="35" fill="#cfc62d"/>
  <text x="315" y="476" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="700" fill="#0a2236">Dimafer &amp; Hermaco · 45 años</text>
</svg>`;
await sharp('src/assets/images/sistema-de-riego.jpg')
  .resize(1200, 630, { fit: 'cover' })
  .composite([{ input: Buffer.from(overlay) }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/og-default.jpg');
console.log('Íconos generados en /public');
