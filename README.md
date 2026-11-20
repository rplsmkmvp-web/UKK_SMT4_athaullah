# UKK

## Database MySQL

File SQL struktur tabel ikut tersimpan di repo: `database/db_mts3_athaullah.sql`.

Setelah clone, impor file itu lewat phpMyAdmin (pilih Import), atau dari terminal:

```bash
mysql -u root -p < database/db_mts3_athaullah.sql
```

Salin `.env.example` menjadi `.env`, lalu atur host, port, username, dan password MySQL. Isi `ADMIN_EMAIL`, `ADMIN_PASSWORD`, serta `ADMIN_SESSION_SECRET`, kemudian jalankan:

```bash
npm install
npm run db:generate
npm run db:seed
npm run dev
```

File SQL membuat struktur `users`, `orders`, dan `products`. `npm run db:seed` membuat akun admin awal di `users` memakai kredensial dari `.env`. Jangan commit `.env`.

## Deploy online

Hubungkan repo GitHub ke hosting Next.js (misalnya Vercel). Build otomatis menjalankan Prisma generate sebelum `next build`. Atur `DATABASE_URL`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USER`, `DATABASE_PASSWORD`, `DATABASE_NAME`, dan `ADMIN_SESSION_SECRET` pada environment hosting. Database harus berada di server online dan menerima koneksi dari aplikasi; `127.0.0.1` hanya menunjuk ke mesin aplikasi sendiri. Impor struktur tabel dari `database/db_mts3_athaullah.sql` ke database online sebelum membuka fitur admin.
