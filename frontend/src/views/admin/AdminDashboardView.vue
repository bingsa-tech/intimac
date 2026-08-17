<template>
  <div class="admin-dashboard">
    <!-- En-tête -->
    <header class="dashboard-header">
      <div>
        <h1 class="page-title">Tableau de bord Administration</h1>
        <p class="page-subtitle">Aperçu en temps réel des métriques et des activités de la plateforme.</p>
      </div>
      <div class="header-badge">
        <span class="live-dot"></span> Système actif
      </div>
    </header>

    <!-- Écran de chargement -->
    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <span>Chargement des données analytiques...</span>
    </div>

    <template v-else>
      <!-- Grille des métriques de statistiques -->
      <div class="stats-grid">
        <!-- Carte Étudiants -->
        <div class="stat-card border-blue">
          <div class="stat-header">
            <span class="stat-label">Étudiants</span>
            <div class="stat-icon-wrapper bg-blue-light">🎓</div>
          </div>
          <p class="stat-number">{{ stats.students }}</p>
          <span class="stat-footer">Apprenants inscrits</span>
        </div>

        <!-- Carte Conseillers -->
        <div class="stat-card border-purple">
          <div class="stat-header">
            <span class="stat-label">Conseillers</span>
            <div class="stat-icon-wrapper bg-purple-light">👨‍💼</div>
          </div>
          <p class="stat-number">{{ stats.advisors }}</p>
          <span class="stat-footer">Accompagnateurs actifs</span>
        </div>

        <!-- Carte Administrateurs -->
        <div class="stat-card border-amber">
          <div class="stat-header">
            <span class="stat-label">Administrateurs</span>
            <div class="stat-icon-wrapper bg-amber-light">🛡️</div>
          </div>
          <p class="stat-number">{{ stats.admins }}</p>
          <span class="stat-footer">Gestionnaires système</span>
        </div>

        <!-- Carte Total -->
        <div class="stat-card border-emerald">
          <div class="stat-header">
            <span class="stat-label">Total Inscrits</span>
            <div class="stat-icon-wrapper bg-emerald-light">👥</div>
          </div>
          <p class="stat-number text-emerald">{{ totalUsers }}</p>
          <span class="stat-footer">Membres de la communauté</span>
        </div>
      </div>

      <!-- Section Utilisateurs Récents -->
      <div class="users-section">
        <div class="section-header">
          <div>
            <h2>Utilisateurs récents & Statut en direct</h2>
            <p class="section-subtitle">Affiche les dernières connexions et la présence en ligne.</p>
          </div>
        </div>

        <div v-if="users.length === 0" class="empty-state">
          Aucun utilisateur trouvé dans la base de données.
        </div>

        <!-- Tableau élégant des utilisateurs -->
        <div v-else class="table-container">
          <table class="users-table">
            <thead>
              <tr>
                <th>Utilisateur</th>
                <th>Rôle</th>
                <th>Statut</th>
                <th>Activité</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td class="user-cell">
                  <div class="avatar">{{ user.fullName.charAt(0).toUpperCase() }}</div>
                  <span class="user-name">{{ user.fullName }}</span>
                </td>
                <td>
                  <span class="role-badge" :class="user.role.toLowerCase()">
                    {{ user.role }}
                  </span>
                </td>
                <td>
                  <div class="status-indicator">
                    <span 
                      class="status-led" 
                      :class="{ online: user.isOnline, offline: !user.isOnline }"
                    ></span>
                    <span class="status-text" :class="{ online: user.isOnline }">
                      {{ user.isOnline ? 'En ligne' : 'Hors ligne' }}
                    </span>
                  </div>
                </td>
                <td class="activity-cell">
                  {{ user.isOnline ? 'Actif maintenant' : 'Déconnecté' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import axios from 'axios';

interface User {
  id: string;
  fullName: string;
  role: string;
  isOnline: boolean;
}

interface DashboardStats {
  students: number;
  advisors: number;
  admins: number;
}

const stats = ref<DashboardStats>({
  students: 0,
  advisors: 0,
  admins: 0,
});

const users = ref<User[]>([]);
const loading = ref<boolean>(true);
let timerId: ReturnType<typeof setInterval> | null = null;

const totalUsers = computed(() => {
  return stats.value.students + stats.value.advisors + stats.value.admins;
});

const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    
    // Normalisation de l'URL pour éviter les soucis de slashes doubles
    const rawURL = import.meta.env.VITE_API_URL || 'https://intimmacapro-backend.onrender.com';
    const baseURL = rawURL.replace(/\/+$/, '');

    // Requêtes en parallèle pour gagner en vitesse
    const [statsRes, usersRes] = await Promise.all([
      axios.get(`${baseURL}/admin/stats`, { headers }),
      axios.get(`${baseURL}/admin/users`, { headers }),
    ]);

    stats.value = statsRes.data;
    users.value = usersRes.data;
  } catch (error) {
    console.error('Erreur lors du chargement des données du dashboard:', error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchDashboardData();
  // Rafraîchissement automatique toutes les 30 secondes
  timerId = setInterval(fetchDashboardData, 30000);
});

// Destruction de l'intervalle lorsque le composant est démonté
onUnmounted(() => {
  if (timerId) clearInterval(timerId);
});
</script>

<style scoped>
/* Reset & variables globales du composant */
.admin-dashboard {
  padding: 2rem;
  background-color: #f8fafc;
  min-height: 100vh;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  color: #0f172a;
}

/* Header */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  letter-spacing: -0.025em;
}

.page-subtitle {
  color: #64748b;
  font-size: 0.95rem;
  margin-top: 0.25rem;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #334155;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.live-dot {
  width: 8px;
  height: 8px;
  background-color: #22c55e;
  border-radius: 50%;
  box-shadow: 0 0 6px #22c55e;
}

/* Loading & Empty States */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #64748b;
  gap: 1rem;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top-color: #0284c7;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: #94a3b8;
  font-size: 0.95rem;
}

/* Grid des Statistiques */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.25rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: #ffffff;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

/* Bordures colorées discrètes */
.border-blue { border-top: 4px solid #3b82f6; }
.border-purple { border-top: 4px solid #a855f7; }
.border-amber { border-top: 4px solid #f59e0b; }
.border-emerald { border-top: 4px solid #10b981; }

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stat-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-icon-wrapper {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.bg-blue-light { background-color: #eff6ff; }
.bg-purple-light { background-color: #faf5ff; }
.bg-amber-light { background-color: #fffbeb; }
.bg-emerald-light { background-color: #ecfdf5; }

.stat-number {
  font-size: 2.25rem;
  font-weight: 800;
  color: #0f172a;
  margin-top: 0.5rem;
  line-height: 1;
}

.text-emerald { color: #059669; }

.stat-footer {
  display: inline-block;
  font-size: 0.8rem;
  color: #94a3b8;
  margin-top: 0.75rem;
}

/* Section Utilisateurs & Tableau */
.users-section {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
  overflow: hidden;
}

.section-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.section-header h2 {
  font-size: 1.15rem;
  font-weight: 700;
  color: #0f172a;
}

.section-subtitle {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 0.2rem;
}

/* Tableau */
.table-container {
  overflow-x: auto;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.users-table th {
  background-color: #f8fafc;
  padding: 0.875rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 1px solid #e2e8f0;
}

.users-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.9rem;
}

.users-table tbody tr:last-child td {
  border-bottom: none;
}

.users-table tbody tr:hover {
  background-color: #f8fafc;
}

/* cellules utilisateur */
.user-cell {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #e2e8f0;
  color: #334155;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
}

.user-name {
  font-weight: 600;
  color: #1e293b;
}

/* Badges de Rôles */
.role-badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: capitalize;
}

.role-badge.student { background-color: #eff6ff; color: #1d4ed8; }
.role-badge.advisor { background-color: #faf5ff; color: #7e22ce; }
.role-badge.admin { background-color: #fffbeb; color: #b45309; }

/* Statut LED & Texte */
.status-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-led {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  display: inline-block;
  transition: all 0.3s ease;
}

.status-led.online {
  background-color: #22c55e;
  box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
}

.status-led.offline {
  background-color: #cbd5e1;
}

.status-text {
  font-weight: 500;
  color: #64748b;
}

.status-text.online {
  color: #15803d;
}

.activity-cell {
  color: #94a3b8;
  font-size: 0.85rem;
}
</style>