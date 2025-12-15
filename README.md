# Yenko 🚗💨

**Ghana's First Community-Focused Ridesharing Platform**

> Moving Accra forward, together. Yɛnkɔ! Let's go!

Yenko is a modern, affordable ridesharing platform designed specifically for Ghana's urban commuters. Built with cutting-edge web technologies, Yenko connects passengers with drivers heading in the same direction, making city transport more efficient, affordable, and community-driven.

[![Live Demo](https://img.shields.io/badge/demo-live-green.svg)](https://yenko.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

## ✨ Features

### 🎯 For Passengers
- **Quick Match**: Find drivers heading your direction instantly
- **Affordable Fares**: Pay as low as GH₵7-9 for popular routes
- **Real-time Tracking**: See your driver's location and ETA
- **Safe & Verified**: All drivers are background-checked
- **Multiple Payment Options**: Cash, Mobile Money, Cards

### 🚗 For Drivers
- **Zero Commission**: Keep 100% of your earnings for the first 50 trips
- **Flexible Schedule**: Drive when you want, where you want
- **Instant Payouts**: Get paid immediately after each trip
- **Route-Based Matching**: Only get matched with passengers on your route
- **GH₵500+ Weekly Earnings**: Earn consistently with high demand

### 🛡️ Safety Features
- Driver & passenger verification
- In-app SOS button
- Trip sharing with emergency contacts
- Real-time GPS tracking
- 24/7 support team

## 📱 Screenshots

<div align="center">
  <img src="public/screenshots/hero.png" alt="Hero Section" width="800"/>
  <p><em>Modern, conversion-optimized landing page</em></p>
</div>

## 🏗️ Project Structure

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

## 🚀 Tech Stack

### Frontend (`apps/web`)

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite for lightning-fast builds
- **Styling**: TailwindCSS with custom design system
- **UI Components**: Radix UI primitives + shadcn/ui
- **Icons**: Lucide React
- **Font**: Plus Jakarta Sans (modern geometric)
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation

### Backend (`apps/api`)

- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL via Supabase
- **Authentication**: JWT + OTP verification
- **Validation**: Zod schemas
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime subscriptions

### Shared (`packages/shared`)

- TypeScript type definitions
- API request/response types
- Shared validation schemas
- Common utilities

### DevOps & Tools

- **Monorepo**: PNPM workspaces
- **Package Manager**: PNPM 8+
- **Code Quality**: ESLint + Prettier
- **Version Control**: Git
- **Deployment**: Vercel (frontend) + Railway (backend)

## 🎨 Design System

- **Primary Color**: Yenko Blue (#0057FF)
- **Secondary Color**: Yenko Yellow (#FFD400)
- **Typography**: Plus Jakarta Sans (400, 500, 600, 700, 800)
- **Design Patterns**: Glassmorphism, gradient overlays, floating animations
- **Responsive**: Mobile-first approach with breakpoints

## 📋 API Endpoints

### Authentication
| Endpoint                       | Method | Description                    |
| ------------------------------ | ------ | ------------------------------ |
| `/api/auth/login`              | POST   | Request OTP via SMS            |
| `/api/auth/verify`             | POST   | Verify OTP & get JWT token     |
| `/api/auth/setup-profile`      | POST   | Complete user profile setup    |
| `/api/auth/logout`             | POST   | Invalidate session token       |

### Passenger Routes
| Endpoint                       | Method | Description                    |
| ------------------------------ | ------ | ------------------------------ |
| `/api/passenger/rides`         | GET    | Get ride history               |
| `/api/passenger/request-ride`  | POST   | Request a new ride             |
| `/api/passenger/active`        | GET    | Get active ride details        |
| `/api/passenger/cancel`        | POST   | Cancel ride request            |

### Driver Routes
| Endpoint                       | Method | Description                    |
| ------------------------------ | ------ | ------------------------------ |
| `/api/driver/register`         | POST   | Register as driver             |
| `/api/driver/rides`            | GET    | Get ride history               |
| `/api/driver/location`         | POST   | Update real-time location      |
| `/api/driver/accept`           | POST   | Accept ride request            |
| `/api/driver/complete`         | POST   | Complete ride                  |

### Matching & Discovery
| Endpoint                       | Method | Description                    |
| ------------------------------ | ------ | ------------------------------ |
| `/api/matching/find`           | POST   | Find available drivers         |
| `/api/matching/nearby`         | GET    | Get nearby drivers             |

### Waitlist (Landing Page)
| Endpoint                       | Method | Description                    |
| ------------------------------ | ------ | ------------------------------ |
| `/api/waitlist/join`           | POST   | Join early access waitlist     |
| `/api/waitlist/stats`          | GET    | Get waitlist statistics        |

### Admin (Protected)
| Endpoint                       | Method | Description                    |
| ------------------------------ | ------ | ------------------------------ |
| `/api/admin/stats`             | GET    | Get platform statistics        |
| `/api/admin/users`             | GET    | List all users                 |
| `/api/admin/drivers/approve`   | POST   | Approve driver registration    |
| `/api/admin/suspend`           | POST   | Suspend user account           |

## 🌍 Environment Variables

### Frontend (`apps/web/.env.local`)

```bash
# API Configuration
VITE_API_URL=/api                          # Backend API URL (use full URL in production)

# Supabase Configuration
VITE_SUPABASE_URL=https://xxx.supabase.co  # Your Supabase project URL
VITE_SUPABASE_ANON_KEY=eyJhbG...           # Supabase anonymous key

# Payment Integration (Optional)
VITE_PAYSTACK_PUBLIC_KEY=pk_test_xxx       # Paystack public key

# App Configuration
VITE_APP_NAME=Yenko
VITE_APP_ENV=development
```

### Backend (`apps/api/.env`)

```bash
# Server Configuration
PORT=4000
NODE_ENV=development

# Database (Supabase PostgreSQL)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.xxx.supabase.co:5432/postgres
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...        # Service role key (secret!)

# Authentication
JWT_SECRET=your-super-secret-jwt-key       # Generate with: openssl rand -base64 32

# Payment Integration (Optional)
PAYSTACK_SECRET_KEY=sk_test_xxx            # Paystack secret key

# SMS/OTP Service (Optional)
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_PHONE_NUMBER=+233xxx
```

## 📦 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/yenko.git
cd yenko
```

### 2. Install Dependencies

```bash
# Install PNPM globally if you haven't
npm install -g pnpm

# Install all dependencies
pnpm install
```

### 3. Set Up Environment Variables

```bash
# Copy example files
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env

# Edit with your credentials
code apps/web/.env.local
code apps/api/.env
```

### 4. Set Up Database (Supabase)

```bash
# 1. Create account at https://supabase.com
# 2. Create new project
# 3. Go to SQL Editor
# 4. Run the schema:
cat apps/api/sql/schema.sql
# Copy and paste into Supabase SQL Editor

# 5. Run migrations (if any):
cat apps/api/sql/migrations/*.sql
```

### 5. Seed Database (Optional)

```bash
# Populate with test data
pnpm seed
```

### 6. Start Development Servers

```bash
# Run both frontend and backend
pnpm dev

# Or run separately:
pnpm dev:web    # Frontend: http://localhost:5173
pnpm dev:api    # Backend:  http://localhost:4000
```

🎉 **Open [http://localhost:5173](http://localhost:5173)** to see the landing page!

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

#### Frontend (Vercel)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd apps/web
vercel --prod
```

#### Backend (Railway)
1. Visit [railway.app](https://railway.app)
2. Create new project from GitHub
3. Set root directory: `apps/api`
4. Add environment variables
5. Deploy!

#### Database (Supabase)
1. Create project at [supabase.com](https://supabase.com)
2. Run `apps/api/sql/schema.sql` in SQL Editor
3. Get connection credentials
4. Update environment variables

### Deployment Checklist
- [ ] Update `VITE_API_URL` with production backend URL
- [ ] Set all environment variables in hosting platforms
- [ ] Run database migrations
- [ ] Configure CORS in backend for frontend domain
- [ ] Set up custom domains (optional)
- [ ] Enable SSL certificates
- [ ] Test authentication flow
- [ ] Verify payment integration

## 📚 Documentation

- [Deployment Guide](DEPLOYMENT.md) - Complete deployment instructions
- [Admin Setup](ADMIN_DEBUG.md) - Admin functionality debugging
- [API Documentation](docs/api.md) - Detailed API reference (Coming soon)
- [Contributing Guide](CONTRIBUTING.md) - How to contribute (Coming soon)

## 🗺️ Roadmap

### Phase 1: MVP (January 2026) ✅
- [x] Landing page with waitlist
- [x] User authentication (OTP)
- [x] Basic passenger & driver flows
- [x] Route matching algorithm
- [x] Admin dashboard

### Phase 2: Pilot Launch (Q1 2026)
- [ ] Pilot route: Madina → 37 → Accra Central
- [ ] Real-time GPS tracking
- [ ] In-app payments (Mobile Money)
- [ ] Push notifications
- [ ] Rating & reviews system

### Phase 3: Expansion (Q2 2026)
- [ ] Add 3 more popular routes
- [ ] Referral program
- [ ] Driver earnings dashboard
- [ ] Trip history & receipts
- [ ] Multi-language support (Twi, Ga)

### Phase 4: Scale (Q3-Q4 2026)
- [ ] AI-powered route optimization
- [ ] Scheduled rides
- [ ] Corporate accounts
- [ ] Driver fleet management
- [ ] Advanced analytics

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write meaningful commit messages
- Add tests for new features
- Update documentation
- Ensure code passes linting

## 🐛 Bug Reports & Feature Requests

Found a bug or have an idea? [Open an issue](https://github.com/yourusername/yenko/issues)!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built with ❤️ by the Yenko team

- **Your Name** - Creator & Lead Developer - [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful component library
- [Lucide Icons](https://lucide.dev/) - Icon system
- [Supabase](https://supabase.com/) - Backend infrastructure
- [Vercel](https://vercel.com/) - Frontend hosting
- Ghana's ridesharing community for inspiration

## 📞 Contact & Support

- **Website**: [yenko.com](https://yenko.com) (coming soon)
- **Email**: hello@yenko.com
- **Twitter**: [@YenkoGH](https://twitter.com/YenkoGH)
- **WhatsApp**: +233 (0) 000 000 000

---

<div align="center">
  <strong>Moving Accra forward, together. Yɛnkɔ! 🚗💨</strong>
  <br><br>
  <a href="https://yenko.vercel.app">View Demo</a>
  ·
  <a href="https://github.com/yourusername/yenko/issues">Report Bug</a>
  ·
  <a href="https://github.com/yourusername/yenko/issues">Request Feature</a>
</div>
