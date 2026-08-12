
<template>
  <div class="roadmap-container">
    <h2> Mon Parcours d'Immigration Académique ({{ country }})</h2>

    <div v-if="loading" class="loading">Chargement de votre roadmap...</div>

    <div v-else-if="steps.length === 0" class="empty-state">
      <p>Aucune étape d'immigration générée pour le moment.</p>
      <button @click="generateRoadmap" class="btn-primary">Générer ma Roadmap</button>
    </div>

    <div v-else class="timeline">
      <div 
        v-for="step in steps" 
        :key="step.id" 
        class="timeline-item" 
        :class="{ completed: step.status === 'COMPLETED' }"
      >
        <div class="checkbox-wrapper">
          <input 
            type="checkbox" 
            :checked="step.status === 'COMPLETED'" 
            @change="toggleStep(step)"
          />
        </div>
        <div class="content">
          <span class="step-number">Étape {{ step.order }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../../services/api'

interface Step {
  id: string;
  order: number;
  title: string;
  description: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

const steps = ref<Step[]>([]);
const country = ref('Canada');
const loading = ref(true);

// 1. Récupérer la roadmap de l'étudiant
const fetchRoadmap = async () => {
  loading.value = true;
  try {
    const response = await api.get('/immigration/my-roadmap');
    
    // Si aucune étape n'existe encore, on la génère automatiquement
    if (response.data.length === 0) {
      await generateRoadmap();
    } else {
      steps.value = response.data;
      if (response.data[0]?.country) {
        country.value = response.data[0].country;
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement de la roadmap:', error);
  } finally {
    loading.value = false;
  }
};

// 2. Générer la roadmap selon la destination
const generateRoadmap = async () => {
  try {
    await api.post('/immigration/generate', { country: country.value });
    const response = await api.get('/immigration/my-roadmap');
    steps.value = response.data;
  } catch (error) {
    console.error('Erreur lors de la génération de la roadmap:', error);
  }
};

// 3. Basculer le statut d'une étape (Cocher / Décocher)
const toggleStep = async (step: Step) => {
  const isCurrentlyCompleted = step.status === 'COMPLETED';
  const newStatus = isCurrentlyCompleted ? 'NOT_STARTED' : 'COMPLETED';
  
  // Mise à jour optimiste dans l'UI
  step.status = newStatus;

  try {
    await api.patch(`/immigration/steps/${step.id}`, {
      isCompleted: !isCurrentlyCompleted,
    });
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut:', error);
    // Annulation en cas d'erreur
    step.status = isCurrentlyCompleted ? 'COMPLETED' : 'NOT_STARTED';
  }
};

onMounted(fetchRoadmap);
</script>

<style scoped>
.roadmap-container {
  padding: 1.5rem;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.timeline-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border-left: 5px solid #cbd5e1;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.timeline-item.completed {
  border-left-color: #10b981;
  background-color: #f0fdf4;
}

.checkbox-wrapper input {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-top: 4px;
}

.step-number {
  font-size: 0.8rem;
  font-weight: bold;
  color: #64748b;
  text-transform: uppercase;
}

.empty-state {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  margin-top: 2rem;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 1rem;
}

.btn-primary:hover {
  background-color: #1d4ed8;
}
</style>