<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../../services/api';

const route = useRoute();
const router = useRouter();
const newsId = route.params.id as string;

const form = ref({
  title: '',
  category: 'Information',
  source: '',
  content: '',
  published: true,
});

const loading = ref(false);
const message = ref('');
const error = ref('');

// Charger les données existantes
onMounted(async () => {
  try {
    const res = await api.get(`/news/${newsId}`);
    const data = res.data?.data || res.data;
    form.value = {
      title: data.title,
      category: data.category,
      source: data.source || '',
      content: data.content,
      published: data.published,
    };
  } catch (err) {
    error.value = "Impossible de charger l'actualité.";
  }
});

const updateNews = async () => {
  loading.value = true;
  message.value = '';
  error.value = '';

  const payload = {
    ...form.value,
    source: form.value.source.trim() !== '' ? form.value.source.trim() : undefined,
  };

  try {
    await api.patch(`/news/${newsId}`, payload);
    message.value = 'Mise à jour réussie !';
    setTimeout(() => router.push('/admin/news'), 1200);
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erreur lors de la mise à jour.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="admin-form-container">
    <div class="header-action">
      <h2>Modifier l'Actualité</h2>
      <router-link to="/admin/news" class="btn-back">← Annuler</router-link>
    </div>

    <form @submit.prevent="updateNews" class="card">
      <div class="form-group">
        <label>Titre de l'actualité * :</label>
        <input v-model="form.title" type="text" required class="input" />
      </div>

      <div class="form-group">
        <label>Catégorie :</label>
        <select v-model="form.category" class="input">
          <option value="Information">Information Générale</option>
          <option value="IRCC">Mise à jour IRCC</option>
          <option value="Bourses">Bourses & Financement</option>
          <option value="Procédure">Procédures d'admission</option>
        </select>
      </div>

      <div class="form-group">
        <label>Lien de la source originale :</label>
        <input v-model="form.source" type="url" class="input" />
      </div>

      <div class="form-group">
        <label>Contenu de l'article * :</label>
        <textarea v-model="form.content" required rows="6" class="input textarea"></textarea>
      </div>

      <div class="form-group-checkbox">
        <label class="checkbox-label">
          <input v-model="form.published" type="checkbox" />
          Publier l'article sur la page d'accueil
        </label>
      </div>

      <button type="submit" :disabled="loading" class="btn-primary">
        {{ loading ? 'Enregistrement...' : 'Enregistrer les modifications' }}
      </button>

      <p v-if="message" class="msg-success">✅ {{ message }}</p>
      <p v-if="error" class="msg-error">❌ {{ error }}</p>
    </form>
  </div>
</template>