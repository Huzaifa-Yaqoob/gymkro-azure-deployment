# IronForge Gym Monorepo

Monorepo containing a **NestJS API** with basic auth and a **Next.js gym display website**, managed by **Nx**.

## Architecture

```
gym-monorepo/
├── apps/
│   ├── gym-api/          NestJS backend (Port 3000)
│   └── gym-web/          Next.js frontend (Port 4200)
├── nx.json               Nx configuration
└── package.json          Workspace root
```

## Tech Stack

- **Frontend:** Next.js 16, React 19, CSS (custom)
- **Backend:** NestJS 11, Prisma 5, PostgreSQL, Passport JWT, bcrypt
- **Monorepo:** Nx 23 with npm workspaces

## Prerequisites

- Node.js 18+
- PostgreSQL running locally or remotely

## Getting Started

### 1. Install dependencies

```bash
cd gym-monorepo
npm install
```

### 2. Configure environment

Edit `apps/gym-api/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gym_db?schema=public"
JWT_SECRET="change-this-to-a-secure-random-string"
```

### 3. Set up the database

```bash
# Push the Prisma schema to PostgreSQL (creates tables)
npx prisma db push --schema=apps/gym-api/prisma/schema.prisma

# Generate Prisma client
npx prisma generate --schema=apps/gym-api/prisma/schema.prisma
```

### 4. Start the API (Terminal 1)

```bash
npx nx serve gym-api
```

API runs at `http://localhost:3000/api`

### 5. Start the website (Terminal 2)

```bash
npx nx dev gym-web
```

Website runs at `http://localhost:4200`

The Next.js app proxies `/api/*` requests to the NestJS backend automatically.

## API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/signup` | No | Create account (`email`, `name`, `password`) |
| POST | `/api/auth/login` | No | Sign in (`email`, `password`) |
| GET | `/api/auth/profile` | Yes (JWT) | Get current user profile |
| GET | `/api` | No | Health check |

Auth endpoints return a JWT `token` and `user` object. Include the token in subsequent requests as `Authorization: Bearer <token>`.

## Website Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, pricing, contact form |
| `/login` | Sign in page |
| `/signup` | Create account page |
| `/dashboard` | Protected dashboard (profile, membership info) |

## Building for Production

```bash
# Build both apps
npx nx build gym-api
npx nx build gym-web

# Outputs:
# apps/gym-api/dist/   - Compiled NestJS API
# apps/gym-web/.next/  - Compiled Next.js app
```

The Next.js app is configured with `output: 'standalone'` for easy deployment.

## Nx Commands

```bash
npx nx build <app>         # Build an app
npx nx serve <app>         # Serve an app in dev mode
npx nx dev <app>           # Dev server with HMR
npx nx graph               # View project graph
npx nx show project <app>  # View project details
```

## Project Structure

```
apps/gym-api/
├── prisma/schema.prisma    Database schema (User model)
├── src/
│   ├── main.ts             Entry point with CORS setup
│   └── app/
│       ├── auth/           Auth module (signup, login, JWT)
│       ├── prisma.service.ts
│       ├── prisma.module.ts
│       └── app.module.ts

apps/gym-web/
└── src/
    ├── app/
    │   ├── page.tsx        Landing page
    │   ├── login/          Login page
    │   ├── signup/         Signup page
    │   ├── dashboard/      Protected dashboard
    │   ├── layout.tsx      Root layout
    │   └── global.css      Global styles
    └── lib/
        └── api.ts          API client with JWT handling
```
