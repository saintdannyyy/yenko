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

## 🏗️ Project Structure

```
yenko/
├── client/               # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Route pages
│   │   ├── lib/          # Utilities & API
│   │   ├── store/        # Zustand state
│   │   └── types/        # TypeScript types
│   ├── public/           # Static assets
│   └── package.json
├── server/               # Express backend (Node.js + TypeScript)
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── middleware/   # Auth & validation
│   │   ├── supabase/     # Database client
│   │   ├── utils/        # Helper functions
│   │   └── types/        # TypeScript types
│   ├── sql/              # Database schema
│   └── package.json
├── package.json          # Root scripts
└── vercel.json           # Deployment config
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

```bash
# Clone the repository
git clone https://github.com/saintdannyyy/yenko.git
cd yenko

# Install client dependencies
cd client && npm install

# Install server dependencies
cd ../server && npm install
```

### Environment Setup

Create `.env` files:

**client/.env:**

```bash
VITE_API_URL=/api
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**server/.env:**

```bash
PORT=4000
NODE_ENV=development
JWT_SECRET=your_secret_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
FRONTEND_URL=http://localhost:3000
```

### Development

```bash
# Run frontend (from client folder)
cd client && npm run dev    # http://localhost:3000

# Run backend (from server folder)
cd server && npm run dev    # http://localhost:4000

# Or run both from root (requires npm install in root first)
npm run dev
```

### Building

```bash
# Build frontend
cd client && npm run build

# Build backend
cd server && npm run build
```

## 🛠️ Tech Stack

### Frontend (`client/`)

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS with custom design system
- **UI Components**: Radix UI primitives + shadcn/ui
- **Icons**: Lucide React
- **Font**: Plus Jakarta Sans
- **State Management**: Zustand
- **Data Fetching**: React Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation

### Backend (`server/`)

- **Runtime**: Node.js 18+ with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL via Supabase
- **Authentication**: JWT + OTP verification
- **Validation**: Zod schemas

### DevOps

- **Deployment**: Vercel (frontend) + Railway/Render (backend)
- **Database**: Supabase (PostgreSQL)
- **Version Control**: Git + GitHub

## 🎨 Design System

- **Primary Color**: Yenko Blue (#0057FF)
- **Secondary Color**: Yenko Yellow (#FFD400)
- **Typography**: Plus Jakarta Sans (400-800 weights)
- **Design Patterns**: Glassmorphism, gradient overlays, floating animations
- **Responsive**: Mobile-first approach

## 📋 API Endpoints

### Authentication

| Endpoint                  | Method | Description      |
| ------------------------- | ------ | ---------------- |
| `/api/auth/login`         | POST   | Request OTP      |
| `/api/auth/verify`        | POST   | Verify OTP       |
| `/api/auth/me`            | GET    | Get current user |
| `/api/auth/setup-profile` | POST   | Complete profile |

### Passenger Routes

| Endpoint                      | Method | Description  |
| ----------------------------- | ------ | ------------ |
| `/api/passenger/rides`        | GET    | Ride history |
| `/api/passenger/request-ride` | POST   | Request ride |
| `/api/passenger/active`       | GET    | Active ride  |

### Driver Routes

| Endpoint               | Method | Description     |
| ---------------------- | ------ | --------------- |
| `/api/driver/register` | POST   | Register driver |
| `/api/driver/location` | POST   | Update location |
| `/api/driver/accept`   | POST   | Accept ride     |
| `/api/driver/complete` | POST   | Complete ride   |

### Matching

| Endpoint               | Method | Description    |
| ---------------------- | ------ | -------------- |
| `/api/matching/find`   | POST   | Find drivers   |
| `/api/matching/nearby` | GET    | Nearby drivers |

### Waitlist

| Endpoint              | Method | Description    |
| --------------------- | ------ | -------------- |
| `/api/waitlist/join`  | POST   | Join waitlist  |
| `/api/waitlist/stats` | GET    | Waitlist count |

### Admin

| Endpoint             | Method | Description     |
| -------------------- | ------ | --------------- |
| `/api/admin/stats`   | GET    | Dashboard stats |
| `/api/admin/users`   | GET    | All users       |
| `/api/admin/drivers` | GET    | All drivers     |

## 🚢 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Frontend (Vercel):**

1. Import repo to Vercel
2. Set root directory to `client`
3. Add environment variables
4. Deploy

**Backend (Railway):**

1. Import repo to Railway
2. Set root directory to `server`
3. Add environment variables
4. Deploy

## 🗺️ Roadmap

- [x] Landing page with waitlist
- [x] User authentication (OTP)
- [x] Driver/Passenger onboarding
- [x] Admin dashboard
- [ ] Real-time ride matching
- [ ] Payment integration (Paystack)
- [ ] Mobile app (React Native)
- [ ] Driver ratings & reviews

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines first.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📞 Contact

- **Email**: hello@yenko.com
- **Twitter**: [@yenkogh](https://twitter.com/yenkogh)
- **Instagram**: [@yenkogh](https://instagram.com/yenkogh)

---

<div align="center">
  <strong>Built with ❤️ in Ghana 🇬🇭</strong>
</div>
