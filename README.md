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
