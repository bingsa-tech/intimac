<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../../services/api';

const scholarships = ref<any[]>([]);
const loadingScholarships = ref(true);

const fetchScholarships = async () => {
  try {
    const response = await api.get('/scholarships');
    scholarships.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des bourses :', error);
  } finally {
    loadingScholarships.value = false;
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const formatCoverageType = (type: string) => {
  const map: Record<string, string> = {
    FULL: 'Couverture 100%',
    PARTIAL: 'Bourse Partielle',
    TUITION_ONLY: 'Frais de scolarité'
  };
  return map[type] || type;
};

const formatAmount = (amount: number) => {
  return new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(amount);
};

onMounted(() => {
  fetchScholarships();
});
</script>

<template>
  <section id="scholarships" class="scholarships-section">
    <div class="section-header center">
      
      <h2 class="section-title">Bourses d'études disponibles</h2>
      <p class="section-subtitle">Découvrez les programmes de financement actuellement ouverts aux candidatures.</p>
    </div>

    <!-- State: Squelettes de chargement -->
    <div v-if="loadingScholarships" class="scholarship-grid">
      <div v-for="n in 3" :key="n" class="skeleton-card"></div>
    </div>

    <!-- State: Liste des bourses -->
    <div v-else-if="scholarships.length > 0" class="scholarship-grid">
      <div v-for="item in scholarships" :key="item.id" class="scholarship-card">
        <div class="card-header">
          <span :class="['badge-coverage', item.coverageType?.toLowerCase()]">
            {{ formatCoverageType(item.coverageType) }}
          </span>
          <span class="country-tag">
            <span class="dot"></span>
            {{ item.country?.name || item.country || 'Canada' }}
          </span>
        </div>

        <div class="card-body">
          <h3 class="card-title">{{ item.title }}</h3>
          <p class="university-tag">🏛️ {{ item.institution || 'Université partenaire' }}</p>
          <p class="description">{{ item.description }}</p>
        </div>

        <div class="card-footer">
          <div class="meta-group">
            <div class="amount-tag">
              <strong>{{ formatAmount(item.amount) }}</strong>
              <span class="unit"> / an</span>
            </div>
            <div class="deadline-tag">
              ⏳ Limite : {{ formatDate(item.deadline) }}
            </div>
          </div>
          <router-link to="/register" class="btn-apply">
            Postuler
          </router-link>
        </div>
      </div>
    </div>

    <!-- State: Aucun résultat -->
    <div v-else class="no-data-card">
      <div class="empty-icon">📂</div>
      <p>Aucune bourse ouverte à la candidature pour le moment.</p>
    </div>
  </section>
</template>

<style scoped>
.scholarships-section {
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 0 1.5rem;
}

.section-header.center { text-align: center; margin-bottom: 3rem; }

.badge-pill {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 9999px;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
}

.section-title {
  font-size: 2rem;
  color: #0f172a;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.section-subtitle { color: #64748b; font-size: 1.05rem; }

.scholarship-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.75rem;
}

.scholarship-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.2s ease;
}

.scholarship-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px -10px rgba(15, 23, 42, 0.08);
}

.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }

.badge-coverage {
  padding: 0.25rem 0.75rem;
  background: #eff6ff;
  color: #2563eb;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
}

.badge-coverage.full { background: #dcfce7; color: #15803d; }
.badge-coverage.partial { background: #fef3c7; color: #b45309; }
.badge-coverage.tuition_only { background: #e0e7ff; color: #4338ca; }

.country-tag { display: flex; align-items: center; gap: 0.375rem; font-size: 0.8125rem; color: #475569; }
.dot { width: 6px; height: 6px; background-color: #3b82f6; border-radius: 50%; }

.card-body { flex-grow: 1; margin-bottom: 1.5rem; }
.card-title { font-size: 1.125rem; font-weight: 700; margin: 0 0 0.5rem 0; color: #0f172a; }
.university-tag { font-size: 0.875rem; color: #2563eb; font-weight: 600; margin: 0 0 0.75rem 0; }
.description { font-size: 0.875rem; color: #64748b; line-height: 1.5; margin: 0; }

.card-footer {
  padding-top: 1.25rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.meta-group { display: flex; flex-direction: column; gap: 0.25rem; }
.amount-tag { font-size: 1.125rem; color: #0f172a; }
.amount-tag .unit { font-size: 0.75rem; color: #64748b; }
.deadline-tag { font-size: 0.75rem; color: #64748b; }

.btn-apply {
  padding: 0.5rem 1rem;
  background-color: #0f172a;
  color: #ffffff;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.15s ease;
}

.btn-apply:hover { background-color: #2563eb; }

.no-data-card { text-align: center; padding: 3rem 2rem; background: white; border: 1px dashed #cbd5e1; border-radius: 16px; }
.empty-icon { font-size: 2.5rem; margin-bottom: 0.5rem; }

.skeleton-card {
  height: 220px;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  border-radius: 16px;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.service-list strong { color: #0f172a; }
.services-grid,
.scholarship-grid,
.news-grid {
  display: flex;
  overflow-x: auto; /* Active le défilement horizontal */
  scroll-snap-type: x mandatory; /* Force l'alignement propre des cartes */
  gap: 1.5rem;
  padding-bottom: 1rem; /* Espace pour la barre de défilement */
  
  /* Masque la barre de défilement sous Firefox/Chrome tout en gardant le scroll */
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
}

.service-category-card,
.scholarship-card,
.news-card {
  flex: 0 0 320px; /* Ne rétrécit pas, prend une largeur fixe de 320px */
  scroll-snap-align: start; /* Ancre la carte au début lors du défilement */
}
</style>