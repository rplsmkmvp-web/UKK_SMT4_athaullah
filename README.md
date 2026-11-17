This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:8003](http://localhost:8003) with your browser to see the result.

## Database and login

The app connects to the MySQL database `db_mts4_athaullah` through Prisma. The app server listens on port `8003`; MySQL uses its own port, configured separately in `.env`.

For a fresh clone, copy `.env.example` to `.env` and replace the database username/password and admin credentials. Then run:

```bash
npm install
npm run db:generate
npm run db:migrate -- --name create_users
npm run db:seed
npm run dev
```

The migration creates the `users` table, and the seed command creates the initial admin using `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Passwords are stored as hashes. On a production server, run `npm run db:deploy`, seed the admin once, then run `npm run build` and `npm start`. Configure the server firewall or proxy to allow incoming traffic on port `8003`.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
