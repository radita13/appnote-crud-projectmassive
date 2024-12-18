# Tugas Tech Web Backend (Notes)

Project ini adalah aplikasi pencatat tugas (Notes) yang sedang dikembangkan sebagai bagian dari project kelompok massive studi independen infinite learning program Web Development & UI/UX Design.

## Deskripsi
Aplikasi ini dirancang untuk membantu pengguna dalam membuat, melihat, mengedit, dan menghapus catatan tugas. Saat ini, pengembangan masih berfokus pada implementasi backend dengan dukungan API.

## Fitur
- Menambahkan catatan note baru
- Melihat catatan note
- Mengedit catatan note yang sudah ada
- Menghapus note

## Kebutuhan Project
- [x] Mampu membuat notes baru
- [x] Mampu menampilkan semua notes
- [x] Mampu menampilkan salah satu notes
- [x] Mampu mengubah notes (judul, tanggal, dan catatan)
- [x] Mampu menghapus notes

## SQL Printah
1.  Printah SQL ini digunakan untuk menambahkan atau membuat data baru ke dalam tabel `notes_db`. bagian `title`, `datetime`, dan `note` menunjukkan kolom-kolom dalam tabel notes yang akan di isi dengan data baru. 
    ```bash
    INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)
    ```
2.  Printah SQL ini digunakan untuk mengambil dan menampilkan semua isi kolom data note atau catatan mulai dari `title`, `datetime`, dan `note` data dari tabel `notes_db`.
    ```bash
    SELECT * FROM notes
    ```
3.  Printah SQL ini digunakan untuk mengambil dan menampilkan semua isi kolom data dari tabel `notes_db` dimana hanya akan mengambil data berdasarkan `id` note atau catatan.
    ```bash
       SELECT * FROM notes WHERE id = ?
    ```
4.  Printah SQL ini digunakan untuk memperbarui atau mengubah data yang sudah ada di tabel `notes_db`. Kolom title, datetime, dan note akan diubah dengan nilai yang diberikan pada note yang memiliki `id` sesuai dengan nilai yang diberikan. Query ini memungkinkan untuk memperbarui catatan tertentu berdasarkan `ID`.
    ```bash
      UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?
    ```
5. Perintah SQL ini digunakan untuk menghapus data note dari tabel `notes_db` yang memiliki `id` sesuai dengan nilai yang diberikan. Query ini akan menghapus satu catatan atau note berdasarkan `ID` yang ditentukan.
   ```bash
     DELETE FROM notes WHERE id = ?
   ```

## Database
```bash
CREATE DATABASE notes_db;
USE notes_db;
create table notes
(
    id    bigint auto_increment primary key,
    title    text     not null,
    datetime    datetime not null,
    note    longtext not null
);
```

## Env
```bash
APP_PORT=3000
HOST=localhost
USER=root
PASSWORD=
DATABASE=notes_db
```

## Setup install project

### Stack teknologi 
- Node.js
- Express
- MySQL
- Postman - API Testing Tool

### Dependencies
- body-parser
- dotenv
- express
- mysql
- nodemon

## Clone Repository
1. Buka Terminal atau Command Prompt.
   Navigasikan ke direktori tempat Anda ingin menyimpan project ini.
2. Clone Repository dari GitHub.
   Jalankan perintah berikut untuk menyalin repository ke komputer Anda:
```bash
git clone https://github.com/radita13/appnote-crud-projectmassive.git
```
3. Masuk ke Direktori Project.
    Setelah clone selesai, pindah ke folder project:
```bash
cd appnote-crud-projectmassive
```
4. Install Dependencies
   Jalankan perintah berikut untuk menginstal semua dependencies yang dibutuhkan:
```bash
    npm install
```

