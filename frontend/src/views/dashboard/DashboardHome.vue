<script setup lang="ts">
import { ref } from 'vue';

// Données fictives pour la vue d'ensemble (à connecter à l'API plus tard)
//const studentName = ref('Étudiant');
const applicationCount = ref(0);
const activePlan = ref('PRO');
</script>

<template>
  <div class="dashboard-home">
    <h1>👋 Bienvenue dans votre Espace Personnel</h1>
    <p class="subtitle">Gérez vos démarches d'orientation, candidatures et documents en un seul endroit.</p>

    <!-- METRICS / STATS -->
    <div class="stats-grid">
      <div class="stat-card">
        <h3>📋 Candidatures</h3>
        <p class="number">{{ applicationCount }}</p>
        <router-link to="/dashboard/applications" class="link">Voir le détail →</router-link>
      </div>

      <div class="stat-card">
        <h3>💳 Formule Actuelle</h3>
        <p class="number badge-plan">{{ activePlan }}</p>
        <router-link to="/dashboard/subscription" class="link">Gérer l'abonnement →</router-link>
      </div>

      <div class="stat-card">
        <h3>🎯 Matching</h3>
        <p class="text">Trouvez votre université idéale</p>
        <router-link to="/dashboard/matching" class="link">Lancer un test →</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.subtitle { color: #64748b; margin-bottom: 2rem; }
.stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.5rem; }
.stat-card { background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; }
.stat-card h3 { margin: 0 0 0.5rem 0; font-size: 1rem; color: #334155; }
.number { font-size: 2rem; font-weight: bold; margin: 0.5rem 0; color: #1e293b; }
.badge-plan { color: #2563eb; }
.text { color: #64748b; margin: 0.5rem 0; }
.link { color: #2563eb; text-decoration: none; font-size: 0.9rem; font-weight: 500; }
</style>