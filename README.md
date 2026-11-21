# Pusepuh Web (Fullstack)

**Deskripsi Proyek:**
Pusepuh adalah aplikasi web imageboard bergaya 4chan untuk komunitas artist membagikan karya dan berdiskusi berdasarkan kategori board (`/g/`, `/k/`, `/t/`, `/h/`, `/q/`, `/r/`).

**Teknologi yang Digunakan:**
- **Frontend:** React (Vite) + Tailwind CSS (Responsif Desktop & Mobile + Dark Mode)
- **Backend:** NestJS (REST API)
- **Database & ORM:** PostgreSQL + Prisma ORM

**Fitur Bab 10:**
- Migrasi penyimpanan data dari array in-memory ke database PostgreSQL menggunakan Prisma ORM.
- Operasi CRUD permanen (`POST`, `GET`, `PATCH`, `DELETE`) untuk entitas `Thread`.
- Endpoint statistik lanjutan (`GET /threads/stats`) untuk menghitung total thread dan jumlah thread per board.
- Dokumentasi screenshot tiap tahapan serta tampilan Desktop & Mobile tersedia di folder `docs/screenshots/`.