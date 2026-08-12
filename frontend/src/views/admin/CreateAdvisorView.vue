<script setup lang="ts">
import { ref } from 'vue';
import api from '../../services/api';

const form = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  role: 'ADVISOR', // Rôle fixé pour les conseillers
});

const loading = ref(false);
const message = ref('');
const error = ref('');

const createAdvisor = async () => {
  loading.value = true;
  message.value = '';
  error.value = '';

  try {
    await api.post('/users', form.value);
    
    message.value = `Conseiller ${form.value.firstName} ${form.value.lastName} créé avec succès !`;
    // Réinitialiser le formulaire
    form.value = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'ADVISOR',
    };
  } catch (err: any) {
    error.value = err.response?.data?.message || 'Erreur lors de la création du conseiller.';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="admin-form-container">
    <h2>👤 Ajouter un nouveau Conseiller</h2>
    <p class="subtitle">Créer un compte pour un agent ou conseiller d'orientation.</p>

    <form @submit.prevent="createAdvisor" class="card">
      <div class="form-row">
        <div class="form-group">
          <label>Prénom :</label>
          <input v-model="form.firstName" type="text" required class="input" placeholder="ex: Owen" />
        </div>

        <div class="form-group">
          <label>Nom :</label>
          <input v-model="form.lastName" type="text" required class="input" placeholder="ex: Bilolo" />
        </div>
      </div>

      <div class="form-group">
        <label>Email professionnel :</label>
        <input v-model="form.email" type="email" required class="input" placeholder="conseiller@plateforme.com" />
      </div>

      <div class="form-group">
        <label>Mot de passe temporaire :</label>
        <input v-model="form.password" type="password" required class="input" placeholder="••••••••" />
      </div>

      <div class="form-group">
        <label>Rôle attribué :</label>
        <select v-model="form.role" class="input">
          <option value="ADVISOR">Conseiller (ADVISOR)</option>
          <option value="ADMIN">Administrateur (ADMIN)</option>
        </select>
      </div>

      <button type="submit" :disabled="loading" class="btn-primary">
        {{ loading ? 'Création en cours...' : 'Créer le compte Conseiller' }}
      </button>

      <p v-if="message" class="msg-success">✅ {{ message }}</p>
      <p v-if="error" class="msg-error">❌ {{ error }}</p>
    </form>
  </div>
</template>

<style scoped>
.admin-form-container { max-width: 600px; margin: 0 auto; }
.card { background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { margin-bottom: 1.2rem; }
.form-group label { display: block; font-weight: 600; margin-bottom: 0.3rem; }
.input { width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box; }
.btn-primary { background: #2563eb; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; font-weight: bold; cursor: pointer; width: 100%; }
.btn-primary:disabled { background: #a7f3d0; }
.msg-success { color: #070596; margin-top: 1rem; font-weight: bold; }
.msg-error { color: #dc2626; margin-top: 1rem; font-weight: bold; }
</style>