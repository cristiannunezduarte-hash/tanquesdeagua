// Genera íconos PNG y la imagen para redes sociales (og-default.jpg) a partir de SVG.
// Uso: node scripts/generar-iconos.mjs
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const drop = await readFile('public/favicon.svg');
const icon = async (size, pad = 0.18) =>
  sharp({ create: { width: size, height: size, channels: 4, background: '#062a4a' } })
    .composite([{ input: await sharp(drop).resize(Math.round(size * (1 - pad * 2))).png().toBuffer(), gravity: 'center' }])
    .png();

await (await icon(180)).toFile('public/apple-touch-icon.png');
await (await icon(192)).toFile('public/icon-192.png');
await (await icon(512)).toFile('public/icon-512.png');
await sharp(drop).resize(512).png().toFile('public/logo.png');

// TODO: reemplazar por una foto real 1200×630 con el logo encima
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs>
    <radialGradient id="a" cx="85%" cy="10%" r="70%"><stop offset="0" stop-color="#18b6d6" stop-opacity=".55"/><stop offset="1" stop-color="#18b6d6" stop-opacity="0"/></radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#062a4a"/><rect width="1200" height="630" fill="url(#a)"/>
  <g transform="translate(90 150) scale(4)">${drop.toString().replace(/<\/?svg[^>]*>/g, '')}</g>
  <text x="300" y="270" font-family="Arial, sans-serif" font-size="72" font-weight="800" fill="#fff">Tanques de Agua</text>
  <text x="300" y="350" font-family="Arial, sans-serif" font-size="36" fill="#bcd3e8">Lavado, desinfección e impermeabilización</text>
  <text x="300" y="400" font-family="Arial, sans-serif" font-size="36" fill="#bcd3e8">de tanques de agua potable</text>
  <path d="M0 540c200 40 400 50 600 20s400-60 600-20v90H0Z" fill="#0f6fc6" opacity=".6"/>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 85, mozjpeg: true }).toFile('public/og-default.jpg');
console.log('Íconos generados en /public');
