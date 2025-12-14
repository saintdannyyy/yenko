# Yenko 🚗

Affordable ride sharing platform for Ghana.

## Project Structure

```
yenko/
├── apps/
│   ├── web/              # React frontend (Vite + TypeScript)
│   └── api/              # Express backend (Node.js + TypeScript)
├── packages/
│   └── shared/           # Shared types & utilities
├── pnpm-workspace.yaml   # PNPM workspace config
└── package.json          # Root workspace scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- PNPM 8+
- Supabase account

### Installation

```bash
# Install dependencies
pnpm install

# Copy environment files
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# Update .env files with your credentials
```

### Development

```bash
# Run both frontend and backend
pnpm dev

# Run frontend only
pnpm dev:web

# Run backend only
pnpm dev:api
```

### Building

```bash
# Build all packages
pnpm build

# Build specific app
pnpm build:web
pnpm build:api
```

### Testing

```bash
# Run all tests
pnpm test

# Seed database
pnpm seed
```

## Tech Stack

### Frontend (apps/web)

- React 18 + TypeScript
- Vite for bundling
- TailwindCSS + Radix UI
- React Query for data fetching
- Zustand for state management
- React Router for navigation

### Backend (apps/api)

- Express.js + TypeScript
- Supabase for database & auth
- JWT for API authentication
- Zod for validation

### Shared (packages/shared)

- TypeScript type definitions
- API request/response types
- Shared utilities

## API Endpoints

| Endpoint                           | Description            |
| ---------------------------------- | ---------------------- |
| `POST /api/auth/login`             | Request OTP            |
| `POST /api/auth/verify`            | Verify OTP & get token |
| `POST /api/auth/setup-profile`     | Set up user profile    |
| `GET /api/passenger/rides`         | Get passenger rides    |
| `POST /api/passenger/request-ride` | Request a ride         |
| `GET /api/driver/rides`            | Get driver rides       |
| `POST /api/driver/location`        | Update driver location |
| `POST /api/matching/find`          | Find available drivers |
| `GET /api/admin/stats`             | Get admin statistics   |

## Environment Variables

### Frontend (apps/web/.env.local)

```
VITE_API_URL=/api
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_PAYSTACK_PUBLIC_KEY=...
```

### Backend (apps/api/.env)

```
PORT=4000
JWT_SECRET=...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
PAYSTACK_SECRET_KEY=...
```

## Deployment

### Netlify (Frontend)

The frontend is configured for Netlify deployment with `netlify.toml`.

### Railway/Render (Backend)

Deploy the backend to Railway, Render, or any Node.js hosting.

## License

MIT
