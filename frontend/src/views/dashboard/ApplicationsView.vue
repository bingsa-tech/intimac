<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../../services/api';

const programs = ref<any[]>([]);
const applications = ref<any[]>([]);
const selectedProgramId = ref('');
const motivation = ref('');
const loading = ref(false);

const loadData = async () => {
  try {
    const [progRes, appRes] = await Promise.all([
      api.get('/programs'),
      api.get('/applications/my-applications')
    ]);
    programs.value = progRes.data;
    applications.value = appRes.data;
  } catch (err) {
    console.error('Erreur chargement candidatures:', err);
  }
};

const createApplication = async () => {
  if (!selectedProgramId.value) return alert('Veuillez sélectionner un programme');
  loading.value = true;
  try {
    await api.post('/applications', {
      programId: selectedProgramId.value,
      motivation: motivation.value,
    });
    selectedProgramId.value = '';
    motivation.value = '';
    await loadData();
  } catch (err: any) {
    alert(err.response?.data?.message || 'Erreur lors de la création');
  } finally {
    loading.value = false;
  }
};

const deleteApplication = async (id: string) => {
  if (!confirm('Supprimer cette candidature ?')) return;
  try {
    await api.delete(`/applications/${id}`);
    await loadData();
  } catch (err) {
    alert('Erreur de suppression');
  }
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div>
    <h1>📁 Gestion des Candidatures</h1>

    <!-- FORMULAIRE -->
    <div class="card">
      <h2>Déposer une Candidature</h2>
      <select v-model="selectedProgramId" class="input">
        <option value="" disabled>-- Choisir un programme d'études --</option>
        <option v-for="p in programs" :key="p.id" :value="p.id">
          {{ p.title }} ({{ p.university?.name }})
        </option>
      </select>
      <textarea v-model="motivation" placeholder="Lettre / Remarques de motivation..." class="input" rows="3"></textarea>
      <button @click="createApplication" :disabled="loading" class="btn-primary">
        {{ loading ? 'Envoi...' : 'Soumettre la candidature' }}
      </button>
    </div>

    <!-- LISTE DES CANDIDATURES -->
    <div class="list">
      <h2>Mes Candidatures ({{ applications.length }})</h2>
      <div v-if="applications.length === 0" class="empty">Aucune candidature enregistrée pour le moment.</div>
      <div v-for="app in applications" :key="app.id" class="app-card">
        <div class="header">
          <h3>{{ app.program?.title }}</h3>
          <span class="status">{{ app.status }}</span>
        </div>
        <p class="univ">🏛️ {{ app.program?.university?.name }}</p>
        <p v-if="app.motivation" class="motivation">"{{ app.motivation }}"</p>
        <button @click="deleteApplication(app.id)" class="btn-danger">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 2rem; }
.input { width: 100%; padding: 0.6rem; margin-bottom: 1rem; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box; }
.btn-primary { background: #2563eb; color: white; border: none; padding: 0.6rem 1.2rem; border-radius: 4px; font-weight: bold; cursor: pointer; }
.app-card { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; }
.header { display: flex; justify-content: space-between; align-items: center; }
.header h3 { margin: 0; }
.status { background: #dbeafe; color: #1e40af; padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.8rem; font-weight: bold; }
.univ { color: #64748b; margin: 0.4rem 0; }
.motivation { font-style: italic; color: #334155; }
.btn-danger { background: #ef4444; color: white; border: none; padding: 0.3rem 0.6rem; border-radius: 4px; cursor: pointer; font-size: 0.85rem; }
.empty { color: #94a3b8; }
</style>