#!/bin/bash

echo "🛑 Arrêt des serveurs..."

# Tuer les processus sur les ports
fuser -k 3000/tcp 5173/tcp 5555/tcp > /dev/null 2>&1

echo "✔️ Tous les services ont été arrêtés."
