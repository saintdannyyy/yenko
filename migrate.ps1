# Yenko Migration Script

Write-Host "This will remove the old folder structure" -ForegroundColor Yellow
Write-Host "Make sure you have tested the new apps/web and apps/api folders first" -ForegroundColor Yellow
Write-Host ""

$confirm = Read-Host "Type yes to continue"

if ($confirm -ne "yes") {
    Write-Host "Aborted." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "Cleaning up old folders..." -ForegroundColor Cyan

$foldersToRemove = @("client", "server", "frontend", "backend", "netlify", "shared")

foreach ($folder in $foldersToRemove) {
    $path = Join-Path $PSScriptRoot $folder
    if (Test-Path $path) {
        Remove-Item -Path $path -Recurse -Force
        Write-Host "  Removed $folder" -ForegroundColor Green
    }
}

$filesToRemove = @("vite.config.ts", "vite.config.server.ts", "tailwind.config.ts", "postcss.config.js", "components.json", "index.html", "netlify.toml", "AGENTS.md", "SETUP_GUIDE.md")

foreach ($file in $filesToRemove) {
    $path = Join-Path $PSScriptRoot $file
    if (Test-Path $path) {
        Remove-Item -Path $path -Force
        Write-Host "  Removed $file" -ForegroundColor Green
    }
}

$packageNew = Join-Path $PSScriptRoot "package.new.json"
$packageOld = Join-Path $PSScriptRoot "package.json"
if (Test-Path $packageNew) {
    Remove-Item -Path $packageOld -Force -ErrorAction SilentlyContinue
    Rename-Item -Path $packageNew -NewName "package.json"
    Write-Host "  Updated package.json" -ForegroundColor Green
}

$readmeNew = Join-Path $PSScriptRoot "README.new.md"
$readmeOld = Join-Path $PSScriptRoot "README.md"
if (Test-Path $readmeNew) {
    Remove-Item -Path $readmeOld -Force -ErrorAction SilentlyContinue
    Rename-Item -Path $readmeNew -NewName "README.md"
    Write-Host "  Updated README.md" -ForegroundColor Green
}

$tsconfig = Join-Path $PSScriptRoot "tsconfig.json"
if (Test-Path $tsconfig) {
    Remove-Item -Path $tsconfig -Force
    Write-Host "  Removed root tsconfig.json" -ForegroundColor Green
}

Write-Host ""
Write-Host "Migration complete" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Run pnpm install"
Write-Host "  2. Copy .env.example files"
Write-Host "  3. Run pnpm dev"
