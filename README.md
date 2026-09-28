# Theme Switcher — Panduan Penggunaan

Theme Switcher ini adalah mekanisme pergantian tema yang bisa dipakai ulang di project HTML/CSS/JavaScript lain.

Mekanismenya memiliki 4 fungsi utama:

- Memiliki beberapa pilihan tema.
- Hanya tema yang sedang aktif yang ditampilkan saat switcher tertutup.
- Klik tema aktif untuk membuka semua pilihan tema.
- Klik tema lain untuk mengganti tema, lalu pilihan kembali tertutup.
- Tema terakhir disimpan menggunakan `localStorage`, sehingga tetap digunakan ketika halaman dibuka kembali.

---

## 1. Struktur File

Cara paling sederhana adalah menggunakan 3 file:

```text
project/
├── index.html
├── style.css
└── script.js
```

Hubungkan CSS dan JavaScript di HTML:

```html
<head>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!-- Isi website -->

    <script src="script.js"></script>
</body>
```

---

# 2. Pasang HTML Theme Switcher

Letakkan kode berikut di bagian `<body>`.

```html
<div class="theme-switcher" id="themeSwitcher" aria-label="Pilih tema">

    <button
        class="theme-btn"
        type="button"
        data-theme="pagi"
        aria-label="Tema Pagi"
    >
        Pagi
    </button>

    <button
        class="theme-btn"
        type="button"
        data-theme="siang"
        aria-label="Tema Siang"
    >
        Siang
    </button>

    <button
        class="theme-btn"
        type="button"
        data-theme="sore"
        aria-label="Tema Sore"
    >
        Sore
    </button>

    <button
        class="theme-btn"
        type="button"
        data-theme="malam"
        aria-label="Tema Malam"
    >
        Malam
    </button>

</div>
```

Yang paling penting adalah bagian:

```html
data-theme="pagi"
```

Nilai `data-theme` tersebut menjadi identitas tema.

Contohnya:

```html
data-theme="pagi"
data-theme="siang"
data-theme="sore"
data-theme="malam"
```

Nama tersebut harus sama dengan nama tema yang digunakan di CSS dan JavaScript.

---

# 3. CSS Theme Switcher

Masukkan CSS berikut ke `style.css`.

```css
/* =========================
   THEME SWITCHER
========================= */

.theme-switcher {
    position: fixed;
    right: 20px;
    bottom: 20px;

    display: flex;
    gap: 8px;

    padding: 8px;

    z-index: 500;

    border-radius: 16px;

    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    background: var(--theme-panel);
    border: 1px solid var(--theme-border);

    box-shadow: 0 10px 30px var(--theme-shadow);
}


/* Saat switcher tertutup,
   hanya tombol aktif yang ditampilkan. */

.theme-switcher:not(.is-open) .theme-btn:not(.is-active) {
    display: none;
}


/* Tombol */

.theme-btn {
    border: 0;
    padding: 10px 14px;

    border-radius: 12px;

    background: transparent;
    color: inherit;

    cursor: pointer;

    transition:
        background .2s ease,
        color .2s ease,
        transform .2s ease;
}


/* Hover */

.theme-btn:hover {
    background: var(--theme-hover);
}


/* Tema yang sedang aktif */

.theme-btn.is-active {
    background: var(--theme-active);
    color: var(--theme-active-text);
}


/* =========================
   TEMA
========================= */

body[data-theme="pagi"] {
    --theme-panel: rgba(255,255,255,.78);
    --theme-border: rgba(63,110,78,.16);
    --theme-hover: rgba(220,235,224,.6);
    --theme-active: #DCEBE0;
    --theme-active-text: #1E3D2A;
    --theme-shadow: rgba(30,61,42,.14);
}


body[data-theme="siang"] {
    --theme-panel: rgba(255,255,255,.82);
    --theme-border: rgba(35,136,174,.18);
    --theme-hover: rgba(217,241,250,.75);
    --theme-active: #D9F1FA;
    --theme-active-text: #145A78;
    --theme-shadow: rgba(20,90,120,.14);
}


body[data-theme="sore"] {
    --theme-panel: rgba(255,248,245,.82);
    --theme-border: rgba(160,79,103,.2);
    --theme-hover: rgba(248,217,206,.72);
    --theme-active: #F8D9CE;
    --theme-active-text: #49305B;
    --theme-shadow: rgba(73,48,91,.16);
}


body[data-theme="malam"] {
    --theme-panel: rgba(11,16,38,.82);
    --theme-border: rgba(190,197,235,.18);
    --theme-hover: rgba(43,51,86,.78);
    --theme-active: #2B3358;
    --theme-active-text: #F5F3CE;
    --theme-shadow: rgba(0,0,0,.34);
}
```

---

# 4. Cara Membuat Website Ikut Berubah Tema

Theme Switcher tidak hanya mengubah tombol.

Kita bisa membuat elemen website menggunakan variable CSS.

Contohnya:

```css
body {
    background: var(--bg);
    color: var(--text);
}
```

Kemudian setiap tema bisa memiliki warna sendiri.

Contoh:

```css
body[data-theme="pagi"] {
    --bg: #f5faf6;
    --text: #1e3d2a;
}

body[data-theme="siang"] {
    --bg: #eefaff;
    --text: #145a78;
}

body[data-theme="sore"] {
    --bg: #fff6f2;
    --text: #49305b;
}

body[data-theme="malam"] {
    --bg: #0b1026;
    --text: #f5f3ce;
}
```

Kemudian gunakan:

```css
body {
    background: var(--bg);
    color: var(--text);
}
```

Jadi ketika tema berubah:

```text
pagi
  ↓
body[data-theme="pagi"]
  ↓
--bg dan --text berubah
  ↓
website ikut berubah
```

---

# 5. JavaScript

Masukkan kode berikut ke `script.js`.

```javascript
const themeButtons = document.querySelectorAll(".theme-btn");
const themeSwitcher = document.getElementById("themeSwitcher");

const savedTheme =
    localStorage.getItem("website-theme") || "pagi";


function setTheme(theme) {

    /* Terapkan tema ke body */
    document.body.dataset.theme = theme;


    /* Tutup pilihan tema */
    if (themeSwitcher) {
        themeSwitcher.classList.remove("is-open");
    }


    /* Tandai tombol yang aktif */
    themeButtons.forEach(button => {

        const active =
            button.dataset.theme === theme;

        button.classList.toggle(
            "is-active",
            active
        );

        button.setAttribute(
            "aria-pressed",
            active
        );

    });


    /* Simpan tema */
    localStorage.setItem(
        "website-theme",
        theme
    );
}


/* Klik tombol */

themeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const isActive =
            button.classList.contains("is-active");


        /* Jika tombol yang diklik
           adalah tema aktif,
           buka/tutup pilihan */

        if (isActive && themeSwitcher) {

            themeSwitcher.classList.toggle(
                "is-open"
            );

            return;
        }


        /* Jika memilih tema lain */
        setTheme(button.dataset.theme);

    });

});


/* Terapkan tema yang tersimpan */
setTheme(savedTheme);
```

---

# 6. Cara Kerjanya

Misalnya tema yang aktif adalah:

```text
Pagi
```

Karena switcher belum dibuka, CSS:

```css
.theme-switcher:not(.is-open) .theme-btn:not(.is-active) {
    display: none;
}
```

akan menyembunyikan:

```text
Siang
Sore
Malam
```

Sehingga yang terlihat hanya:

```text
[ Pagi ]
```

---

## 7. Ketika Tombol Aktif Diklik

Misalnya sekarang:

```text
[ Pagi ]
```

Klik tombol tersebut.

JavaScript akan menjalankan:

```javascript
themeSwitcher.classList.toggle("is-open");
```

Hasilnya:

```text
[ Pagi ] [ Siang ] [ Sore ] [ Malam ]
```

Semua pilihan sekarang terlihat.

---

# 8. Ketika Memilih Tema Lain

Misalnya klik:

```text
Siang
```

JavaScript menjalankan:

```javascript
setTheme(button.dataset.theme);
```

Nilai:

```javascript
button.dataset.theme
```

berisi:

```text
siang
```

Kemudian:

```javascript
document.body.dataset.theme = theme;
```

menghasilkan:

```html
<body data-theme="siang">
```

CSS kemudian bisa membaca:

```css
body[data-theme="siang"]
```

dan menerapkan warna tema Siang.

Setelah itu switcher kembali tertutup:

```text
[ Siang ]
```

---

# 9. Penyimpanan Tema

Tema disimpan menggunakan:

```javascript
localStorage.setItem(
    "website-theme",
    theme
);
```

Misalnya user memilih:

```text
Malam
```

maka browser menyimpan:

```text
website-theme = malam
```

Ketika halaman dibuka lagi:

```javascript
const savedTheme =
    localStorage.getItem("website-theme") || "pagi";
```

JavaScript membaca tema tersebut.

Jadi jika sebelumnya user memilih:

```text
Malam
```

ketika website dibuka kembali, tema tetap:

```text
Malam
```

---

# 10. Mengganti Nama Tema

Tema tidak harus bernama:

```text
pagi
siang
sore
malam
```

Kamu bisa menggunakan nama apa saja.

Contoh:

```html
data-theme="merah"
data-theme="biru"
data-theme="hijau"
```

CSS:

```css
body[data-theme="merah"] {
    --bg: #fff0f0;
}

body[data-theme="biru"] {
    --bg: #eef6ff;
}

body[data-theme="hijau"] {
    --bg: #effaf1;
}
```

JavaScript tidak perlu diubah.

Ini karena JavaScript mengambil nama tema langsung dari:

```javascript
button.dataset.theme
```

---

# 11. Menambah Tema Baru

Misalnya ingin menambahkan tema:

```text
ungu
```

### HTML

Tambahkan tombol:

```html
<button
    class="theme-btn"
    type="button"
    data-theme="ungu"
    aria-label="Tema Ungu"
>
    Ungu
</button>
```

### CSS

Tambahkan:

```css
body[data-theme="ungu"] {
    --theme-panel: rgba(250,245,255,.82);
    --theme-border: rgba(120,80,160,.18);
    --theme-hover: rgba(235,220,250,.75);
    --theme-active: #eadcf5;
    --theme-active-text: #5b3478;
    --theme-shadow: rgba(70,40,90,.16);
}
```

Tidak perlu mengubah JavaScript.

---

# 12. Menggunakan Icon

Teks tombol juga bisa diganti dengan icon.

Contoh:

```html
<button
    class="theme-btn"
    type="button"
    data-theme="pagi"
    aria-label="Tema Pagi"
>
    ☀️
</button>
```

Atau:

```html
<button
    class="theme-btn"
    type="button"
    data-theme="malam"
    aria-label="Tema Malam"
>
    🌙
</button>
```

JavaScript tetap sama.

---

# 13. Jika Ingin Menjalankan Kode di Project Baru

Urutannya cukup seperti ini:

### Langkah 1

Buat:

```text
index.html
style.css
script.js
```

### Langkah 2

Masukkan HTML Theme Switcher ke:

```text
index.html
```

### Langkah 3

Masukkan CSS Theme Switcher ke:

```text
style.css
```

### Langkah 4

Masukkan JavaScript Theme Switcher ke:

```text
script.js
```

### Langkah 5

Pastikan nama `data-theme` sama.

Contoh:

```html
data-theme="pagi"
```

harus memiliki CSS:

```css
body[data-theme="pagi"]
```

### Langkah 6

Gunakan CSS variable untuk elemen website.

Contoh:

```css
body {
    background: var(--bg);
    color: var(--text);
}
```

---

# 14. Ringkasan Mekanisme

Secara sederhana, alurnya adalah:

```text
User klik tombol tema
        ↓
JavaScript membaca data-theme
        ↓
document.body.dataset.theme = tema
        ↓
CSS membaca body[data-theme="..."]
        ↓
Variable warna berubah
        ↓
Tampilan website berubah
        ↓
Tema disimpan ke localStorage
```

Untuk mekanisme tombol:

```text
Tema aktif saja
      ↓
Klik tema aktif
      ↓
Semua tema muncul
      ↓
Pilih tema lain
      ↓
Tema berubah
      ↓
Pilihan kembali tertutup
      ↓
Hanya tema aktif yang terlihat
```

---

# 15. Bagian yang Wajib Diingat

Kalau ingin menggunakan mekanisme ini di project lain, sebenarnya hanya ada **3 bagian utama** yang perlu dipindahkan:

### HTML

```html
data-theme="nama-tema"
```

### CSS

```css
body[data-theme="nama-tema"] {
    --variable: nilai;
}
```

### JavaScript

```javascript
document.body.dataset.theme = theme;
```

Selama ketiga bagian tersebut menggunakan nama tema yang sama, mekanismenya dapat digunakan kembali di project lain.

---

## Catatan

Mekanisme ini hanya menangani **pergantian tema**.

Ia tidak otomatis mengubah isi teks, gambar, icon, layout, atau konten halaman.

Jika ingin setiap tema memiliki konten berbeda, mekanisme konten perlu dibuat terpisah dari theme switcher utama.
