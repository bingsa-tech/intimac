<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const programs = ref<any[]>([]);
const applications = ref<any[]>([]);
const selectedProgramId = ref('');
const motivation = ref('');

const loadData = async () => {
  try {
    const [progRes, appRes] = await Promise.all([
      api.get('/programs'),
      api.get('/applications/my-applications')
    ]);
    programs.value = progRes.data;
    applications.value = appRes.data;
  } catch (err) {
    console.error(err);
  }
};

const createApplication = async () => {
  try {
    await api.post('/applications', {
      programId: selectedProgramId.value,
      motivation: motivation.value,
    });
    selectedProgramId.value = '';
    motivation.value = '';
    loadData();
  } catch (err) {
    alert('Erreur lors de la création');
  }
};

const logout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div style="max-width: 900px; margin: 2rem auto; font-family: system-ui, sans-serif;">
    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 1rem;">
      <h1>📊 Mon Tableau de Bord</h1>
      <button @click="logout" style="background: #dc2626; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Déconnexion</button>
    </div>

    <div style="margin-top: 2rem;">
      <h2>📝 Soumettre une Candidature</h2>
      <select v-model="selectedProgramId" style="width: 100%; padding: 0.5rem; margin-bottom: 1rem;">
        <option value="" disabled>-- Sélectionner un programme d'études --</option>
        <option v-for="p in programs" :key="p.id" :value="p.id">{{ p.title }} ({{ p.university?.name }})</option>
      </select>
      <textarea v-model="motivation" placeholder="Lettre de motivation..." style="width: 100%; padding: 0.5rem; margin-bottom: 1rem;"></textarea>
      <button @click="createApplication" style="background: #2563eb; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Déposer la candidature</button>
    </div>

    <div style="margin-top: 3rem;">
      <h2>📋 Mes Candidatures Enregistrées</h2>
      <div v-for="app in applications" :key="app.id" style="border: 1px solid #e2e8f0; padding: 1rem; border-radius: 6px; margin-bottom: 1rem;">
        <h3>{{ app.program?.title }}</h3>
        <p><strong>Statut :</strong> {{ app.status }}</p>
        <p><em>"{{ app.motivation || 'Pas de motivation renseignée' }}"</em></p>
      </div>
    </div>
  </div>
</template>