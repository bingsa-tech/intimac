<script setup lang="ts">
import {ref} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const currentUser = ref<any>(null);
const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user'); // On nettoie aussi les infos utilisateur
  router.push('/');
};
</script>

<template>
  <div class="dashboard-layout">
    <!-- BARRE LATÉRALE (SIDEBAR) -->
    <aside class="sidebar">
      <div class="brand">🎓 Mon Portail</div>
      <nav class="menu">
        <router-link to="/dashboard" exact-active-class="active">📊 Vue d'ensemble</router-link>
        <router-link to="/dashboard/matching" active-class="active">🎯 Moteur de Matching</router-link>
        <router-link to="/dashboard/applications" active-class="active">📁 Mes Candidatures</router-link>
        <router-link to="/dashboard/documents" active-class="active">📄 Mes Documents</router-link>
        <router-link to="/dashboard/roadmap" active-class="active">🚀 Roadmap</router-link> 
        <router-link to="/dashboard/appointments" active-class="active">📅 Prise de Rendez-vous</router-link> 
        <router-link to="/dashboard/assessments" active-class="active"> Évaluations</router-link>
        <router-link to="/dashboard/subscription" active-class="active">💳 Mon Abonnement</router-link>
      </nav>
      <div class="user-info">
        <p>{{ currentUser?.firstName || 'Student' }}</p>
        <button @click="logout" class="btn-logout">Déconnexion</button>
      </div>
    </aside>

    <!-- CONTENU PRINCIPAL DYNAMIQUE -->
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout { 
  display: flex; 
  min-height: 100vh; 
  font-family: system-ui, sans-serif; 
}
.sidebar { 
  width: 250px; 
  background: #0f172a; 
  color: white; 
  padding: 1.5rem; 
  display: flex; 
  flex-direction: column; 
}
.brand { 
  font-size: 1.2rem; 
  font-weight: bold; 
  margin-bottom: 2rem; 
  color: #38bdf8; 
}
.menu { 
  display: flex; 
  flex-direction: column; 
  gap: 0.5rem; 
  flex-grow: 1; 
}
.menu a { 
  color: #94a3b8; 
  text-decoration: none; 
  padding: 0.75rem 1rem; 
  border-radius: 6px; 
  font-weight: 500; 
  transition: all 0.2s ease;
}
.menu a:hover, .menu a.active { 
  background: #1e293b; 
  color: white; 
}
.btn-logout { 
  background: #ef4444; 
  color: white; 
  border: none; 
  padding: 0.75rem; 
  border-radius: 6px; 
  cursor: pointer; 
  font-weight: bold; 
  margin-top: 1rem;
}
.btn-logout:hover {
  background: #dc2626;
}
.content { 
  flex-grow: 1; 
  background: #f8fafc; 
  padding: 2rem; 
  overflow-y: auto; 
}
</style>