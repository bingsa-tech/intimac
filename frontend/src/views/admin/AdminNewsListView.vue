<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';

const router = useRouter();
const newsList = ref<any[]>([]);
const loading = ref(false);

const fetchNews = async () => {
  loading.value = true;
  try {
    const res = await api.get('/news');
    newsList.value = res.data?.data || res.data;
  } catch (err) {
    console.error('Erreur chargement news:', err);
  } finally {
    loading.value = false;
  }
};

const deleteNews = async (id: string, title: string) => {
  if (!confirm(`Voulez-vous vraiment supprimer "${title}" ?`)) return;
  try {
    await api.delete(`/news/${id}`);
    fetchNews(); // Rafraîchit la liste
  } catch (err) {
    alert('Erreur lors de la suppression.');
  }
};

const editNews = (id: string) => {
  router.push(`/admin/news/edit/${id}`);
};

onMounted(fetchNews);
</script>

<template>
  <div class="admin-container">
    <div class="header">
      <h2>Gestion des Actualités</h2>
      <router-link to="/admin/create-news" class="btn-primary">+ Créer une Actualité</router-link>
    </div>

    <div v-if="loading" class="loading">Chargement...</div>

    <table v-else-if="newsList.length > 0" class="table">
      <thead>
        <tr>
          <th>Titre</th>
          <th>Catégorie</th>
          <th>Statut</th>
          <th>Date</th>
          <th class="text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in newsList" :key="item.id">
          <td class="font-bold">{{ item.title }}</td>
          <td><span class="badge">{{ item.category }}</span></td>
          <td>
            <span :class="item.published ? 'status-online' : 'status-draft'">
              {{ item.published ? 'Publié' : 'Brouillon' }}
            </span>
          </td>
          <td>{{ new Date(item.createdAt).toLocaleDateString('fr-FR') }}</td>
          <td class="actions">
            <button @click="editNews(item.id)" class="btn-edit">✏️ Éditer</button>
            <button @click="deleteNews(item.id, item.title)" class="btn-delete">🗑️ Supprimer</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-else>Aucune actualité trouvée.</p>
  </div>
</template>

<style scoped>
.admin-container { max-width: 1000px; margin: 0 auto; padding: 1.5rem; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.table { width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0; }
th, td { padding: 1rem; text-align: left; border-bottom: 1px solid #f1f5f9; }
th { background: #f8fafc; font-size: 0.8rem; text-transform: uppercase; color: #64748b; }
.badge { background: #e0f2fe; color: #0369a1; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem; }
.status-online { color: #16a34a; font-weight: 600; }
.status-draft { color: #dc2626; font-weight: 600; }
.actions { display: flex; gap: 0.5rem; justify-content: flex-end; }
.btn-primary { background: #2563eb; color: white; padding: 0.6rem 1rem; text-decoration: none; border-radius: 4px; font-weight: 600; }
.btn-edit { background: #fef3c7; color: #d97706; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
.btn-delete { background: #fee2e2; color: #dc2626; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
</style>