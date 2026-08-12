<script setup lang="ts">

</script>

<template>
  <!-- Ajout de id="methodology" pour permettre les liens d'ancrage -->
  <section id="methodology" class="process-section">
    <div class="section-header center">
      
      <h2 class="section-title">Comment nous vous accompagnons</h2>
      <p class="section-subtitle">Un processus structuré en 4 étapes simples vers le succès.</p>
    </div>

    <div class="steps-timeline">
      <div class="step-card">
        <div class="step-number">01</div>
        <h4>Évaluation & Stratégie</h4>
        <p>Analyse complète de vos diplômes et budget pour définir le meilleur parcours d'admission.</p>
      </div>

      <div class="step-card">
        <div class="step-number">02</div>
        <h4>Dépôt des Candidatures</h4>
        <p>Soumission et suivi personnalisé de vos dossiers auprès des universités et collèges partenaires.</p>
      </div>

      <div class="step-card">
        <div class="step-number">03</div>
        <h4>Demandes d'Immigration</h4>
        <p>Montage de vos demandes de CAQ et Permis d'études avec vérification par un conseiller certifié.</p>
      </div>

      <div class="step-card">
        <div class="step-number">04</div>
        <h4>Préparation au Départ</h4>
        <p>Assistance pour le logement, l'accueil à l'aéroport et votre installation au Canada.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-section {
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 0 1.5rem;
}

.section-header.center { 
  text-align: center; 
  margin-bottom: 3rem; 
}

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

/* 1. CONTENEUR EN LIGNE HORIZONTALE */
.steps-timeline {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 1.5rem;
  padding-bottom: 1rem;
  scrollbar-width: thin;
  -webkit-overflow-scrolling: touch;
}

/* 2. LARGEUR FIXE ET SANS COMPRESSION POUR LES CARTES */
.step-card {
  flex: 0 0 260px; /* Largeur fixe de chaque carte */
  scroll-snap-align: start;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 1.75rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.step-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.05);
}

.step-number {
  font-size: 2.5rem;
  font-weight: 900;
  color: #2563eb;
  opacity: 0.3;
  line-height: 1;
  margin-bottom: 1rem;
}

.step-card h4 {
  font-size: 1.1rem;
  color: #0f172a;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.step-card p {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
}
</style>