#!/bin/bash

# 1. Se placer dans le répertoire du projet
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$PROJECT_DIR" || exit 1

echo "🔍 Vérification des modifications..."

# 2. Vérifier s'il y a des modifications
if [ -z "$(git status --porcelain)" ]; then
    echo "ℹ️ Aucune modification à envoyer."
    exit 0
fi

# Show git status summary
git status -s

echo ""
# 3. Demander le message de commit
read -p "💬 Entrez le message de commit (ou Entrée pour message auto) : " USER_MSG

if [ -z "$USER_MSG" ]; then
    COMMIT_MSG="fix: mise à jour du $(date '+%Y-%m-%d %H:%M')"
else
    COMMIT_MSG="$USER_MSG"
fi

# 4. Test de build optionnel du Backend pour éviter de casser Render
if [ -d "$PROJECT_DIR/backend" ]; then
    echo "⚙️ Vérification de la compilation NestJS..."
    (cd backend && npm run build > /dev/null 2>&1)
    if [ $? -ne 0 ]; then
        echo "❌ Erreur de compilation dans le backend ! Le push a été annulé."
        exit 1
    fi
    echo "✅ Backend compilé avec succès."
fi

# 5. Git Add, Commit et Push
echo "🚀 Envoi sur GitHub..."
git add .
git commit -m "$COMMIT_MSG"
git push origin main

echo "🎉 Modifications envoyées avec succès !"