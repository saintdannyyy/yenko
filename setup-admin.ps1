# Quick Start Script for Admin Dashboard Testing

Write-Host "🚀 Starting Yenko Admin Dashboard" -ForegroundColor Cyan
Write-Host ""

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Host "❌ Error: Please run this from the yenko project root" -ForegroundColor Red
    exit 1
}

Write-Host "📦 Step 1: Installing dependencies..." -ForegroundColor Yellow
pnpm install

Write-Host ""
Write-Host "🗄️  Step 2: Setting up database..." -ForegroundColor Yellow
Write-Host "Running migration..." -ForegroundColor Gray
$env:PGPASSWORD = ""
psql $env:DATABASE_URL -f apps/api/sql/migrations/add_suspended_column.sql 2>&1 | Out-Null

Write-Host ""
Write-Host "🌱 Step 3: Seeding database..." -ForegroundColor Yellow
cd apps/api
pnpm run seed
cd ..\..

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Cyan
Write-Host "1. Start backend:  cd apps/api && pnpm run dev"
Write-Host "2. Start frontend: cd apps/web && pnpm run dev (in new terminal)"
Write-Host "3. Login with phone: +233202248817"
Write-Host ""
Write-Host "📖 See ADMIN_DEBUG.md for troubleshooting" -ForegroundColor Gray
