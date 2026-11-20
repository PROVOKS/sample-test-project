# simpel. — Landing Page Minimalis

Landing page sederhana dengan **HTML**, **Tailwind CSS v4** (diinstal lewat Node.js), dan **JavaScript** murni.

## Menjalankan project

```bash
npm install
npm run dev     # build CSS + watch perubahan
```

Lalu buka `index.html` di browser, atau jalankan server statis:

```bash
npx serve .
```

Untuk build CSS final (minified):

```bash
npm run build
```

Hasil build ditulis ke `css/output.css` dan dipakai langsung oleh `index.html`.

## Struktur

```
src/input.css   sumber Tailwind (@import + @theme)
css/output.css  hasil build (jangan diedit manual)
js/main.js      menu mobile, reveal, nav aktif, back-to-top
index.html      seluruh markup semantik
```

## Catatan

- Tailwind v4 tidak memakai `tailwind.config.js`; tema didefinisikan dengan `@theme` di `src/input.css`.
- Layout memakai flexbox (nav, tombol, footer), grid (hero, fitur, galeri), dan position (`sticky`, `relative`/`absolute`, `fixed`).
- Semua warna, font, dan aset bersifat lokal; tidak bergantung pada CDN atau gambar eksternal.
