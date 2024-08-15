# Chatongo Frontend

Aplikasi ini merupakan frontend untuk aplikasi obrolan **Chatongo** yang dibangun menggunakan `React.js`. Aplikasi ini menampilkan sidebar dengan riwayat obrolan dan area obrolan di mana pengguna dapat melihat dan mengirim pesan. Antarmuka pengguna dirancang menggunakan `Chakra UI`, dan `Tailwind CSS` digunakan untuk styling tambahan. Aplikasi ini terhubung ke backend untuk mengambil dan menyimpan data obrolan.

## Struktur Komponen

`App.tsx`: Komponen utama yang mengatur state global dan menangani pengambilan data dari backend.
`ChatSidebar.tsx`: Komponen untuk menampilkan daftar riwayat obrolan dan menyediakan opsi untuk membuat obrolan baru.
`ChatArea.tsx`: Komponen untuk menampilkan dan mengirim pesan dalam obrolan yang dipilih.

## Konfigurasi dan Instalasi

### Prasyarat

- `Node.js` v16+
- `npm` atau sejenisnya
- Berkas `.env` untuk menyimpan variabel lingkungan

## Variabel Lingkungan

Aplikasi ini memerlukan variabel lingkungan berikut untuk disetel dalam berkas .env:

`VITE_BACKEND_URL`: URL dari backend Flask yang telah Anda bangun sebelumnya.

## Instalasi

1. **Kloning Repositori:**

```bash
git clone https://github.com/Roixys/chatongo.git
cd chatongo/fe-chatongo
```

2. **Instal Dependensi:**

```bash
npm install
```

3. **Siapkan file env:**

Buat berkas `.env` di root proyek **fe-chatongo** dan tambahkan variabel lingkungan Anda:

```bash
VITE_BACKEND_URL=http://localhost:8000
```

4. **Jalankan Aplikasi:**

```bash
npm run dev
```

Aplikasi akan berjalan di `http://0.0.0.0:3000`.
