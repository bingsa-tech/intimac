<template>
  <div class="admin-dashboard">
    <h1>📊 Tableau de bord Administration</h1>
    <p>Bienvenue dans votre espace d'administration.</p>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Conseillers</h3>
        <p class="stat-number">--</p>
      </div>
      <div class="stat-card">
        <h3>Étudiants</h3>
        <p class="stat-number">--</p>
      </div>
      <div class="stat-card">
        <h3>Rendez-vous</h3>
        <p class="stat-number">--</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Tu pourras charger ici les statistiques de ton API plus tard
</script>

<style scoped>
.admin-dashboard {
  padding: 1rem;
}
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}
.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}
.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #0284c7;
  margin-top: 0.5rem;
}
</style>