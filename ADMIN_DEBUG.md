# Admin Dashboard Debugging Guide

## Issues Fixed

### 1. Backend - Driver Data Structure

**Problem**: The driver endpoint was using Supabase join syntax that wasn't properly structuring the data.

**Solution**: Changed from nested profile join to explicitly fetching and merging profile data with each driver record.

### 2. Frontend - Error Handling

**Problem**: Errors were silently failing with no details in console.

**Solution**: Added comprehensive console.log statements and detailed error messages to track:

- API response status codes
- Response data
- Error details from failed requests

### 3. Seed Script - Error Handling

**Problem**: Seed script would fail without clear error messages.

**Solution**:

- Added cleanup of existing test users before creating new ones
- Added detailed error logging at each step
- Added `suspended: false` field to profiles

## Testing Steps

### Step 1: Apply Database Migration

```powershell
cd c:\Users\HP\Projects\yenko\apps\api
psql $env:DATABASE_URL -f sql/migrations/add_suspended_column.sql
```

### Step 2: Run Seed Script

```powershell
cd c:\Users\HP\Projects\yenko
pnpm run seed
```

**Expected Output:**

```
🌱 Seeding database...
Cleaning up existing test data...
Creating test users...
✓ Created test users
Creating profiles...
✓ Created profiles
Creating driver record...
✓ Created driver profile
Creating passenger record...
✓ Created passenger profile
Creating driver route...
✓ Created driver route
✓ Created 20-30 sample rides
✓ Created sample ratings
✓ Created waitlist entries

✅ Seeding complete!
```

### Step 3: Start Backend

```powershell
cd apps/api
pnpm run dev
```

**Expected Output:**

```
Server running on port 4000
```

### Step 4: Start Frontend

```powershell
cd apps/web
pnpm run dev
```

**Expected Output:**

```
VITE ready in XXXms
➜ Local: http://localhost:3000/
```

### Step 5: Test Admin Login

1. Navigate to `http://localhost:3000/auth/login`
2. Enter phone: `+233202248817`
3. Check your terminal/database for the OTP code
4. Enter the OTP and login

### Step 6: Check Browser Console

Open Developer Tools (F12) and check the Console tab. You should see:

```
Fetching analytics...
Analytics response status: 200
Analytics data: { success: true, analytics: { ... } }
```

## What to Check If Still Broken

### Backend Not Starting?

1. Check if port 4000 is already in use:

```powershell
Get-NetTCPConnection -LocalPort 4000
```

2. Check environment variables:

```powershell
# In apps/api/.env
DATABASE_URL=your_supabase_url
SUPABASE_SERVICE_KEY=your_service_key
JWT_SECRET=your_secret
```

### Database Connection Issues?

Test connection:

```powershell
psql $env:DATABASE_URL -c "SELECT COUNT(*) FROM profiles;"
```

### API Returns 401 (Unauthorized)?

1. Check localStorage has token:
   - Open DevTools → Application → Local Storage
   - Look for 'token' key
2. Token might be expired - logout and login again

### API Returns 500?

1. Check backend terminal for error details
2. Look for red error messages with stack traces
3. Common issues:
   - Supabase client not initialized
   - Database schema mismatch
   - Missing environment variables

### Data Shows But Charts Don't?

1. Check if `recharts` is installed:

```powershell
cd apps/web
pnpm list recharts
```

2. If not installed:

```powershell
pnpm add recharts
```

### No Data in Analytics?

Check if rides exist in database:

```powershell
psql $env:DATABASE_URL -c "SELECT COUNT(*), status FROM rides GROUP BY status;"
```

Expected output should show completed, pending, and cancelled rides.

## Console Logs to Look For

### Successful Analytics Fetch:

```
Fetching analytics...
Analytics response status: 200
Analytics data: {
  success: true,
  analytics: {
    totalUsers: 3,
    totalDrivers: 1,
    verifiedDrivers: 1,
    completedRides: 15,
    totalRevenue: 450,
    ...
  }
}
```

### Successful Users Fetch:

```
Fetching users from /api/admin/users...
users response status: 200
users data: {
  success: true,
  users: [
    { id: "...", full_name: "Admin User", ... },
    ...
  ]
}
```

## Quick Diagnostic Commands

```powershell
# Check if backend is running
curl http://localhost:4000/api/health

# Check if you have data
psql $env:DATABASE_URL -c "SELECT COUNT(*) FROM profiles;"
psql $env:DATABASE_URL -c "SELECT COUNT(*) FROM rides;"
psql $env:DATABASE_URL -c "SELECT COUNT(*) FROM waitlist;"

# Check backend logs
cd apps/api
pnpm run dev
# Look for request logs like: [2024-12-15T...] GET /api/admin/analytics/detailed
```

## Common Error Messages

### "Failed to load analytics"

- Backend not running or crashed
- Database connection failed
- JWT token invalid/expired

### "Failed to load users/drivers/trips"

- Same as above, plus check that tables exist
- Check admin role in database: `SELECT role FROM profiles WHERE phone = '+233202248817';`

### "No analytics data available"

- API call succeeded but returned null/empty
- Check if rides exist in database
- Check date range filters (we're looking at last 7 days)

### Network Error

- Backend not running on port 4000
- CORS issues (should be fixed by proxy)
- Firewall blocking local connections
