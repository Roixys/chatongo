# Chatongo Backend API

Aplikasi Flask ini berfungsi sebagai API backend untuk aplikasi obrolan bernama **Chatongo**. Dibuat menggunakan Python, Flask, SQLAlchemy, and PostgreSQL. Aplikasi ini menangani manajemen riwayat obrolan dan memungkinkan pengguna membuat riwayat obrolan serta mengirim pesan, menerima respons yang dihasilkan oleh bot. Aplikasi ini menggunakan SQLAlchemy untuk interaksi database dan terintegrasi dengan Google Generative AI untuk menghasilkan respons bot.

## Pengaturan dan Konfigurasi

### Prasyarat

- `Python` v3.12
- `Flask`
- `Flask-CORS`
- `Flask-Migrate`
- `SQLAlchemy`
- `Library klien Python Google Generative AI`
- Berkas `.env` untuk menyimpan variabel lingkungan

## Variabel env

Aplikasi ini memerlukan variabel env berikut untuk disetel dalam berkas `.env`:

**API_KEY**: Kunci API Google Generative AI Anda.
**DATABASE_URL**: String koneksi untuk database PostgreSQL Anda.

## Endpoint API

Link API Docs: ![Postman](https://documenter.getpostman.com/view/15717582/2sA3s6EUu5)
API Docs Postman berisi list API endpoint beserta contoh request dan juga response.

## Instalasi

1. **Kloning Repositori:**

```bash
git clone https://github.com/Roixys/chatongo.git
cd chatongo/be-chatongo
```

2. **Buat Lingkungan Virtual:**

```bash
python -m venv venv
source venv/bin/activate  # Pada Windows gunakan `venv\Scripts\activate`
```

3. **Instal Dependensi:**

```bash
pip install -r requirements.txt
```

4. **Siapkan file env:**

Buat berkas `.env` di root proyek **be-chatongo** dan tambahkan variabel lingkungan Anda:

```bash
API_KEY=your_google_api_key
DATABASE_URL=postgresql://username:password@localhost:5432/chatongo
```

5. **Jalankan Migrasi Database:**

```bash
make migrate
```

6. **Jalankan Aplikasi:**

```bash
make server
```

Aplikasi akan berjalan di `http://0.0.0.0:8000`.

## Model

### HistoryChat

- `id`: Primary Key
- `name`: String
- `created_at`: DateTime

### Chat

- `id`: Primary Key
- `history_chat_id`: Foreign Key to HistoryChat
- `message`: String
- `sender_type`: Enum ('user', 'bot')
- `created_at`: DateTime
