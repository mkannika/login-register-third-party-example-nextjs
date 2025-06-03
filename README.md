# login-register-third-party-example-nextjs

A practical example project demonstrating **Login**, **Register**, and **Third-Party Authentication** (Google, Facebook) using Next.js 13+ App Router, Firebase, Prisma, and Zustand.  
This project is designed for developers who want to learn how to implement modern authentication flows in a Next.js full-stack application.

---

## 🛠️ Tech Stack & Libraries

- **Next.js 13+ (App Router)** — React framework for server-side rendering and routing.
- **TypeScript** — Type-safe JavaScript for scalable development.
- **Prisma** — Modern ORM for PostgreSQL (or other databases).
- **PostgreSQL** — Default database (can be swapped).
- **Firebase Auth** — Third-party authentication (Google, Facebook, etc.).
- **Zustand** — Lightweight state management for React.
- **React Hook Form** — Form state management and validation.
- **Tailwind CSS** — Utility-first CSS framework for styling.
- **Radix UI** — Accessible UI primitives.
- **Lucide React** — Icon library.
- **ESLint & Prettier** — Code quality and formatting.
- **Jest** — (Optional) For unit testing.

---

## 📦 Features

- Email/password registration and login
- Google and Facebook OAuth login
- Secure password hashing with bcrypt
- User session management with Zustand (local store)
- Prisma ORM for database access
- Environment variable configuration for secrets and API keys
- Responsive UI with Tailwind CSS and Radix UI
- Error handling and user feedback with toast notifications

---

## 🚀 Getting Started

1. **Clone the repository**
```
https://github.com/mkannika/login-register-third-party-example-nextjs.git
# or
git@github.com:mkannika/login-register-third-party-example-nextjs.git
```

3. **Install dependencies**
```
npm install
# or
yarn install
```
3. **Configure environment variables**
Create a `.env` file in the root directory and fill in your credentials:
```
DATABASE_URL=""
# FIREBASE
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_FIREBASE_PROJECT_ID=""
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=""
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FIREBASE_APP_ID=""
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback
```
