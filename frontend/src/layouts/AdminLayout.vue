<template>
  <div class="admin-layout">
    <!-- Barre latérale d'administration -->
    <aside class="sidebar">
      <div class="logo">
        <h2>🛡️ Admin Panel</h2>
      </div>
      
      <nav class="nav-menu">
        <!--  Ajusté vers la route existante pour éviter les erreurs 404/Page blanche -->
        <router-link to="/admin/create-advisor" class="nav-item">
          Ajouter un Conseiller
        </router-link>
         <router-link to="/admin/create-news" class="nav-item">
          Ajouter une Actualité
        </router-link>
        <router-link to="/admin/messages" class="nav-item">
          Lire les messages
        </router-link>
        <router-link to="/admin/appointments" class="nav-item">
          Gestion des Rendez-vous
        </router-link>
        <router-link to="/admin/settings" class="btn-settings" >Paramètres (Entités)</router-link>
        <!--  Désactivé ou redirigé tant que la vue /admin/users n'existe pas dans index.ts -->
        <!-- 
        <router-link to="/admin/users" class="nav-item">
          Utilisateurs
        </router-link> 
        -->
      </nav>

      <div class="user-info">
        <p>{{ currentUser?.firstName || 'Admin' }}</p>
        <button @click="logout" class="btn-logout">Déconnexion</button>
      </div>
    </aside>

    <!-- Zone de contenu principal -->
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = ref<any>(null);

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    try {
      currentUser.value = JSON.parse(user);
    } catch (e) {
      console.error('Erreur de lecture du rôle utilisateur', e);
    }
  }
});

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  router.push('/login');
};
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f8fafc;
}

.sidebar {
  width: 260px;
  background-color: #0f172a;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
}

.logo h2 {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: #38bdf8;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.nav-item {
  color: #94a3b8;
  text-decoration: none;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-item:hover,
.nav-item.router-link-active {
  background-color: #1e293b;
  color: #ffffff;
}

.user-info {
  border-top: 1px solid #334155;
  padding-top: 1rem;
}

.user-info p {
  color: #e2e8f0;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.btn-logout {
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-logout:hover {
  background-color: #ef4444;
  color: white;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.btn-settings {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  background-color: #2563eb; /* Bleu */
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none; /* Supprime le soulignement HTML du lien */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.btn-settings:hover {
  background-color: #1d4ed8; /* Bleu plus foncé au survol */
  transform: translateY(-1px);
}
</style>