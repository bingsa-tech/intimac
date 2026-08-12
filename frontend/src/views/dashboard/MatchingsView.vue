<script setup lang="ts">
import { ref } from 'vue';
import api from '../../services/api';

const gpa = ref<number>(3.5);
const budget = ref<number>(15000);
const language = ref<string>('Français');
const results = ref<any[]>([]);
const loading = ref<boolean>(false);
const message = ref<string>('');

const runMatching = async () => {
  loading.value = true;
  message.value = '';
  try {
    const res = await api.post('/matchings', {
      gpa: gpa.value,
      maxBudget: budget.value,
      languages: [language.value],
    });
    results.value = res.data;
  } catch (err: any) {
    message.value = 'Erreur lors du calcul du matching : ' + (err.response?.data?.message || err.message);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="matching-container">
    <h1>🎯 Moteur de Matching</h1>
    <p>Évaluez vos chances et trouvez les programmes d'études correspondant à votre profil.</p>

    <!-- FORMULAIRE DE CRITÈRES -->
    <div class="card">
      <h2>Vos Critères</h2>
      <div class="form-grid">
        <div>
          <label>Moyenne académique / GPA (ex: 3.5)</label>
          <input v-model.number="gpa" type="number" step="0.1" class="input" />
        </div>

        <div>
          <label>Budget Maximum annuel ($)</label>
          <input v-model.number="budget" type="number" class="input" />
        </div>

        <div>
          <label>Langue d'enseignement principale</label>
          <select v-model="language" class="input">
            <option value="Français">Français</option>
            <option value="Anglais">Anglais</option>
          </select>
        </div>
      </div>

      <button @click="runMatching" :disabled="loading" class="btn-submit">
        {{ loading ? 'Calcul en cours...' : 'Lancer le Matching' }}
      </button>
    </div>

    <!-- RÉSULTATS DU MATCHING -->
    <div v-if="results.length > 0" class="results-section">
      <h2>Programmes Recommandés ({{ results.length }})</h2>
      <div class="results-grid">
        <div v-for="item in results" :key="item.id" class="result-card">
          <div class="badge">{{ item.score || '90' }}% de compatibilité</div>
          <h3>{{ item.program?.title || item.title }}</h3>
          <p>🏛️ {{ item.program?.university?.name || 'Université' }}</p>
          <p>💰 {{ item.program?.tuition || item.tuition }}$ / an</p>
        </div>
      </div>
    </div>

    <p v-if="message" class="error">{{ message }}</p>
  </div>
</template>

<style scoped>
.matching-container { max-width: 800px; }
.card { background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; margin: 1.5rem 0; }
.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem; }
.input { width: 100%; padding: 0.6rem; margin-top: 0.4rem; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box; }
.btn-submit { background: #2563eb; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; font-weight: bold; cursor: pointer; }
.results-grid { display: grid; gap: 1rem; margin-top: 1rem; }
.result-card { background: white; border: 1px solid #e2e8f0; padding: 1rem; border-radius: 8px; position: relative; }
.badge { position: absolute; top: 1rem; right: 1rem; background: #dcfce7; color: #15803d; padding: 0.25rem 0.5rem; border-radius: 999px; font-size: 0.85rem; font-weight: bold; }
.error { color: #dc2626; margin-top: 1rem; }
</style>