<template>
  <div class="admin-dashboard">
    <h1>📊 Tableau de bord Administration</h1>
    <p>Bienvenue dans votre espace d'administration.</p>

    <!-- Cartes de statistiques -->
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Étudiants</h3>
        <p class="stat-number">{{ stats.students }}</p>
      </div>

      <div class="stat-card">
        <h3>Conseillers</h3>
        <p class="stat-number">{{ stats.advisors }}</p>
      </div>

      <div class="stat-card">
        <h3>Administrateurs</h3>
        <p class="stat-number">{{ stats.admins }}</p>
      </div>

      <div class="stat-card">
        <h3>Total Inscrits</h3>
        <p class="stat-number">{{ totalUsers }}</p>
      </div>
    </div>

    <!-- Section Utilisateurs en ligne & Liste -->
    <div class="users-section">
      <h2>👥 Utilisateurs récents & Statut</h2>
      <div class="user-list">
        <div v-for="user in users" :key="user.id" class="user-card">
          <div class="user-info">
            <!-- LED Statut -->
            <span 
              class="status-led" 
              :class="{ online: user.isOnline, offline: !user.isOnline }"
              :title="user.isOnline ? 'En ligne' : 'Hors ligne'"
            ></span>
            <span class="user-name">{{ user.fullName }}</span>
            <span class="user-role-badge">{{ user.role }}</span>
          </div>
          <span class="status-text">{{ user.isOnline ? 'En ligne' : 'Hors ligne' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';

// Types TypeScript
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

// États réactifs
const stats = ref<DashboardStats>({
  students: 0,
  advisors: 0,
  admins: 0,
});

const users = ref<User[]>([]);

// Calcul du nombre total d'utilisateurs inscrits
const totalUsers = computed(() => {
  return stats.value.students + stats.value.advisors + stats.value.admins;
});

// Fonction pour récupérer les données du backend
const fetchDashboardData = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const baseURL = import.meta.env.VITE_API_URL || 'https://intimmacapro-backend.onrender.com';

    // 1. Charger les statistiques des compteurs
    const statsRes = await axios.get(`${baseURL}/admin/stats`, { headers });
    stats.value = statsRes.data;

    // 2. Charger la liste des utilisateurs avec leur statut (online/offline)
    const usersRes = await axios.get(`${baseURL}/admin/users`, { headers });
    users.value = usersRes.data;
  } catch (error) {
    console.error('Erreur lors du chargement des données du dashboard:', error);
  }
};

onMounted(() => {
  fetchDashboardData();
  // Optionnel : Rafraîchir le statut en ligne toutes les 30 secondes
  setInterval(fetchDashboardData, 30000);
});
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
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #0284c7;
  margin-top: 0.5rem;
}

/* Section Utilisateurs & LED */
.users-section {
  margin-top: 2.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.user-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border: 1px solid #f1f5f9;
  border-radius: 6px;
  background-color: #f8fafc;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-name {
  font-weight: 600;
  color: #334155;
}

.user-role-badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  background: #e2e8f0;
  border-radius: 4px;
  color: #475569;
}

.status-text {
  font-size: 0.85rem;
  color: #64748b;
}

/* --- Style de la LED Verte --- */
.status-led {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.3s ease;
}

/* En ligne (Verte avec effet lumineux) */
.status-led.online {
  background-color: #22c55e;
  box-shadow: 0 0 8px #22c55e;
}

/* Hors ligne (Gris) */
.status-led.offline {
  background-color: #94a3b8;
}
</style>