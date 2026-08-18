<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../../services/api';

const router = useRouter();

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

const createNews = async () => {
  loading.value = true;
  message.value = '';
  error.value = '';

  const payload = {
    ...form.value,
    source: form.value.source.trim() !== '' ? form.value.source.trim() : undefined,
  };
  try {
    await api.post('/news', payload);
    
    message.value = `L'actualité "${form.value.title}" a été créée avec succès !`;
    
    // Réinitialisation du formulaire
    form.value = {
      title: '',
      category: 'Information',
      source: '',
      content: '',
      published: true,
    };

    // Redirection optionnelle vers la gestion des news après 1.5 seconde
    setTimeout(() => {
      router.push('/admin/create-news');
    }, 1500);

  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erreur lors de la création de l\'actualité.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="admin-form-container">
    <div class="header-action">
      <h2>Publier une Actualité</h2>
      <router-link to="/admin/news" class="btn-back">← Retour à la liste</router-link>
    </div>
    <p class="subtitle">Diffusez des mises à jour sur l'immigration, les bourses et les procédures d'admission.</p>

    <form @submit.prevent="createNews" class="card">
      <div class="form-group">
        <label>Titre de l'actualité * :</label>
        <input 
          v-model="form.title" 
          type="text" 
          required 
          class="input" 
          placeholder="ex: Ouverture des demandes de bourses 2026" 
        />
      </div>

      <div class="form-group">
  <label>Catégorie :</label>
  <select v-model="form.category" class="input">
    <option value="Information">Information Générale</option>
    <option value="IRCC">Mise à jour IRCC</option>
    <option value="Bourses">Bourses & Financement</option>
    <option value="Forum">Forum & Colloques</option>
    <option value="Procédure">Procédure</option>
  </select>
</div>

      <div class="form-group">
        <label>Lien de la source originale (optionnel) :</label>
        <input 
          v-model="form.source" 
          type="url" 
          class="input" 
          placeholder="https://www.canada.ca/fr/immigration..." 
        />
      </div>

      <div class="form-group">
        <label>Contenu de l'article * :</label>
        <textarea 
          v-model="form.content" 
          required 
          rows="6" 
          class="input textarea" 
          placeholder="Rédigez ici les détails de l'annonce..."
        ></textarea>
      </div>

      <div class="form-group-checkbox">
        <label class="checkbox-label">
          <input v-model="form.published" type="checkbox" />
          Publier immédiatement l'article sur la page d'accueil
        </label>
      </div>

      <button type="submit" :disabled="loading" class="btn-primary">
        {{ loading ? 'Publication en cours...' : 'Publier l\'actualité' }}
      </button>

      <p v-if="message" class="msg-success">✅ {{ message }}</p>
      <p v-if="error" class="msg-error">❌ {{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.admin-form-container { max-width: 650px; margin: 0 auto; }

.header-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;
}

.subtitle {
  color: #64748b;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
}

.btn-back {
  color: #2563eb;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
}

.btn-back:hover { text-decoration: underline; }

.card { 
  background: white; 
  padding: 1.5rem; 
  border-radius: 8px; 
  border: 1px solid #e2e8f0; 
}

.form-group { margin-bottom: 1.2rem; }

.form-group label { 
  display: block; 
  font-weight: 600; 
  margin-bottom: 0.3rem; 
  color: #334155;
  font-size: 0.9rem;
}

.input { 
  width: 100%; 
  padding: 0.6rem; 
  border: 1px solid #cbd5e1; 
  border-radius: 4px; 
  box-sizing: border-box; 
  font-family: inherit;
}

.textarea { resize: vertical; min-height: 120px; }

.form-group-checkbox { margin-bottom: 1.5rem; }

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: #334155;
  cursor: pointer;
}

.btn-primary { 
  background: #2563eb; 
  color: white; 
  border: none; 
  padding: 0.75rem 1.5rem; 
  border-radius: 4px; 
  font-weight: bold; 
  cursor: pointer; 
  width: 100%; 
  transition: background 0.2s ease;
}

.btn-primary:hover { background: #1d4ed8; }
.btn-primary:disabled { background: #93c5fd; cursor: not-allowed; }

.msg-success { color: #059669; margin-top: 1rem; font-weight: bold; }
.msg-error { color: #dc2626; margin-top: 1rem; font-weight: bold; }
</style>