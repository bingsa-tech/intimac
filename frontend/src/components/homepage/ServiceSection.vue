<script setup lang="ts">
// Composant statique de présentation des services
</script>

<template>
  <section id= "services" class="services-section">
    <div class="section-header center">
      
      <h2 class="section-title">Des parcours sur-mesure pour votre projet canadien</h2>
      <p class="section-subtitle">Une prise en charge complète, du choix de votre programme à votre installation.</p>
    </div>

    <div class="services-grid">
      <div class="service-category-card">
        <div class="category-header">
          <span class="category-icon">🎓</span>
          <h3>Volet Études & Permis</h3>
        </div>
        <ul class="service-list">
          <li>
            <strong>Admission Universitaire :</strong> Analyse de profil, choix des programmes et dépôt des candidatures.
          </li>
          <li>
            <strong>CAQ & Permis d'Études :</strong> Montage rigoureux du dossier IRCC, preuves financières et lettre d'explication.
          </li>
        </ul>
      </div>

      <div class="service-category-card highlight">
        <div class="category-header">
          <span class="category-icon">🚀</span>
          <h3>Volet Résidence Permanente</h3>
        </div>
        <ul class="service-list">
          <li>
            <strong>Entrée Express (Fédéral) :</strong> Calcul CRS, création de profil, gestion après extraction et demande de RP.
          </li>
          <li>
            <strong>Arrima & PSTQ (Québec) :</strong> Déclaration d'intérêt (DI), stratégie d'invitation et demande de CSQ.
          </li>
        </ul>
      </div>

      <div class="service-category-card">
        <div class="category-header">
          <span class="category-icon">🛠️</span>
          <h3>Services Inclus & Outils</h3>
        </div>
        <ul class="service-list">
          <li>
            <strong>Coffre-fort Sécurisé :</strong> Centralisation et vérification de la conformité de vos pièces justificatives.
          </li>
          <li>
            <strong>Adresse Postale au Canada :</strong> Mise à disposition d'une adresse locale pour faciliter vos démarches administratives.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.services-section {
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
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}

.section-subtitle {
  color: #64748b;
  font-size: 1.05rem;
  max-width: 600px;
  margin: 0 auto;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.service-category-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.service-category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 20px -5px rgba(0, 0, 0, 0.08);
}

.service-category-card.highlight {
  border-color: #3b82f6;
  background: linear-gradient(180deg, #ffffff 0%, #f0f7ff 100%);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.category-icon { font-size: 1.75rem; }

.category-header h3 {
  font-size: 1.25rem;
  color: #0f172a;
  font-weight: 700;
}

.service-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.service-list li {
  font-size: 0.925rem;
  color: #475569;
  line-height: 1.5;
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