#!/bin/bash

echo "🧹 Nettoyage des anciens processus sur les ports 3000, 5173, 5555..."
fuser -k 3000/tcp 5173/tcp 5555/tcp > /dev/null 2>&1

# Démarrage de PostgreSQL si nécessaire
if ! pg_isready -q; then
    echo "🐘 Démarrage de PostgreSQL..."
    sudo service postgresql start
fi

echo "🚀 Démarrage de la plateforme..."

# 1. Démarrer Prisma Studio
echo "📦 Lancement de Prisma Studio (http://localhost:5555)..."
(cd backend && npx prisma studio --port 5555) &

# 2. Démarrer le Backend NestJS
echo "⚙️ Démarrage du Backend NestJS (http://localhost:3000)..."
(cd backend && npm run start:dev) &

# 3. Démarrer le Frontend Vue.js
echo "🎨 Démarrage du Frontend Vue.js (http://localhost:5173)..."
(cd frontend && npm run dev) &

# 4. Attente du démarrage des serveurs puis ouverture du portail
(
  sleep 4
  echo "🌐 Ouverture du portail dans le navigateur..."
  
  # Récupération du chemin absolu Windows du fichier portal.html
  FILE_PATH=$(wslpath -w "$(pwd)/portal.html")
  
  # Tente d'ouvrir avec le navigateur Windows par défaut via cmd.exe
  cmd.exe /c start "" "$FILE_PATH" 2>/dev/null || explorer.exe "$FILE_PATH"
) &

echo "✅ Tous les services ont été démarrés !"
echo "💡 Appuyez sur [CTRL+C] pour tout arrêter proprement."

wait
