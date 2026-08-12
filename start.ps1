Write-Host "🚀 Démarrage de la plateforme..." -ForegroundColor Green

# 1. Démarrer Prisma Studio
Write-Host "📦 Lancement de Prisma Studio..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "npx prisma studio --port 5555"

# 2. Démarrer NestJS
Write-Host "⚙️ Démarrage du Backend NestJS..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run start:dev"

# 3. Démarrer Vue.js
Write-Host "🎨 Démarrage du Frontend Vue.js..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"

Write-Host "✅ Tous les services ont été lancés dans des fenêtres séparées." -ForegroundColor Green
