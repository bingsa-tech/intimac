<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../../services/api';

const newsList = ref<any[]>([]);
const loadingNews = ref(true);

const fetchNews = async () => {
  try {
    const response = await api.get('/news');
    newsList.value = response.data;
  } catch (error) {
    console.error('Erreur lors du chargement des actualités :', error);
  } finally {
    loadingNews.value = false;
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

onMounted(() => {
  fetchNews();
});
</script>

<template>
  <section id= "news" class="news-section">
    <div class="section-header center">
      <span class="badge-pill">Informations</span>
      <h2 class="section-title">Trouver les dernières informations</h2>
      <p class="section-subtitle">Nous vous accompagnerons dans votre parcours d'immigration.</p>
    </div>

    <!-- State: Squelettes de chargement -->
    <div v-if="loadingNews" class="news-grid">
      <div v-for="n in 3" :key="n" class="skeleton-card"></div>
    </div>

    <!-- State: Liste des actualités -->
    <div v-else-if="newsList.length > 0" class="news-grid">
      <div v-for="item in newsList" :key="item.id" class="news-card">
        <div class="news-meta">
          <span class="news-category">{{ item.category || 'Information' }}</span>
          <span class="news-date">{{ formatDate(item.createdAt) }}</span>
        </div>
        
        <h3>{{ item.title }}</h3>
        <p class="news-excerpt">{{ item.content }}</p>

        <!-- Lien vers la source externe si disponible -->
        <div v-if="item.source" class="news-source">
          <a :href="item.source" target="_blank" rel="noopener noreferrer" class="source-link">
            Consulter la source officielle ↗
          </a>
        </div>
      </div>
    </div>

    <!-- State: Aucun résultat -->
    <div v-else class="no-data-card">
      <div class="empty-icon">📰</div>
      <p>Aucune actualité publiée pour le moment.</p>
    </div>
  </section>
</template>

<style scoped>
.news-section {
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

.section-title { font-size: 2rem; color: #0f172a; font-weight: 800; margin-bottom: 0.5rem; }
.section-subtitle { color: #64748b; font-size: 1.05rem; }

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.news-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.news-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #64748b;
}

.news-category { font-weight: 700; color: #2563eb; text-transform: uppercase; }

.news-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.4;
  margin: 0;
}

.news-excerpt {
  font-size: 0.875rem;
  color: #475569;
  line-height: 1.5;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-source {
  margin-top: auto;
  padding-top: 0.5rem;
}

.source-link {
  font-size: 0.8rem;
  font-weight: 600;
  color: #2563eb;
  text-decoration: none;
}

.source-link:hover { text-decoration: underline; }

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