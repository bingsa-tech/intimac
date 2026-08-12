<script setup lang="ts">
// Aucune logique reactive complexe requise pour le moment
</script>

<template>
  <section class="hero-section">
    <div class="hero-glow hero-glow-1"></div>
    <div class="hero-glow hero-glow-2"></div>

    <div class="hero-container">
      <!-- COLONNE GAUCHE -->
      <div class="hero-content">
        <div class="hero-badge">
          <span>Votre partenaire pour étudier au Canada</span>
        </div>

        <h1 class="hero-title">
          Réussissez votre projet d'études au Canada <span class="gradient-text">sans stress</span>
        </h1>

        <p class="hero-subtitle">
          Votre intermédiaire de confiance pour l'admission, l'obtention du <strong>CAQ</strong>, le <strong>Permis d'études</strong> et la préparation complète de votre dossier <strong>IRCC</strong>.
        </p>

        <div class="hero-buttons">
          <router-link to="/register" class="btn btn-primary">
            <span>Commencer mon dossier</span>
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </router-link>
          <router-link to="/login" class="btn btn-secondary">
            Espace Client
          </router-link>
        </div>

        <div class="hero-trust">
          <div class="trust-avatars">
            <span class="avatar">👨‍🎓</span>
            <span class="avatar">👩‍🎓</span>
            <span class="avatar">👨‍💻</span>
          </div>
          <div class="trust-text">
            <strong>98.5%</strong> de dossiers d'admission acceptés
          </div>
        </div>
      </div>

      <!-- COLONNE DROITE -->
      <div class="hero-visual">
        <div class="glass-card">
          <div class="card-header-status">
            <span class="status-dot pulsing"></span>
            <span class="status-text">Suivi en temps réel IRCC</span>
          </div>
          
          <div class="card-step completed">
            <div class="step-check">✓</div>
            <div class="step-info">
              <strong>Admission Universitaire</strong>
              <span>Lettre d'acceptation reçue</span>
            </div>
          </div>

          <div class="card-step completed">
            <div class="step-check">✓</div>
            <div class="step-info">
              <strong>Demande de CAQ (Québec)</strong>
              <span>Certificat émis</span>
            </div>
          </div>

          <div class="card-step active">
            <div class="step-check pending">⏳</div>
            <div class="step-info">
              <strong>Permis d'études & IRCC</strong>
              <span>Dossier en cours de traitement</span>
            </div>              
          </div>

          <div class="card-action">
            <router-link to="/register" class="btn-appointment">
              <span>Prendre rendez-vous </span>
              <svg class="icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  padding: 5rem 1.5rem 6rem;
  background-color: #f8fafc;
  overflow: hidden;
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.4;
  z-index: 0;
  pointer-events: none;
}

.hero-glow-1 {
  width: 350px;
  height: 350px;
  background: #3b82f6;
  top: -50px;
  left: -50px;
}

.hero-glow-2 {
  width: 300px;
  height: 300px;
  background: #60a5fa;
  bottom: 0;
  right: 10%;
}

.hero-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 3.5rem;
  align-items: center;
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.85rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 1.5rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin-bottom: 1.25rem;
}

.gradient-text {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: #475569;
  line-height: 1.6;
  margin-bottom: 2rem;
  max-width: 540px;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  align-items: flex-start; 
  justify-content: flex-start;
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto !important;
  /* Forcer la largeur à s'adapter au contenu */
  width: auto !important;
  
  /* Réduire le padding horizontal (ex: 0.75rem au lieu de 1.75rem) */
  padding: 0.5rem 1rem !important; 
  
  font-size: 0.875rem;
  border-radius: 12px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #2563eb;
  color: #ffffff;
  gap: 0.5rem;
  box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.35);
}

.btn-primary:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.btn-secondary {
  background: #ffffff;
  color: #0f172a;
  border: 1px solid #cbd5e1;
}

.btn-secondary:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.btn-icon {
  width: 15px;
  height: 18px;
}

.hero-trust {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.trust-avatars {
  display: flex;
}

.avatar {
  width: 32px;
  height: 32px;
  background: #ffffff;
  border: 2px solid #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  margin-left: -8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.avatar:first-child { margin-left: 0; }

.trust-text {
  font-size: 0.875rem;
  color: #64748b;
}

.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.card-header-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #0f172a;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid #f1f5f9;
}

.status-dot {
  width: 8px;
  height: 8px;
  background-color: #22c55e;
  border-radius: 50%;
}

.status-dot.pulsing {
  box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
  animation: pulse 2s infinite;
}

.card-step {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.85rem;
  border-radius: 12px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
}

.card-step.active {
  background: #ffffff;
  border-color: #bfdbfe;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.06);
}

.step-check {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #dcfce7;
  color: #166534;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: bold;
}

.step-check.pending {
  background: #fef3c7;
}

.step-info {
  display: flex;
  flex-direction: column;
}

.step-info strong {
  font-size: 0.875rem;
  color: #0f172a;
}

.step-info span {
  font-size: 0.775rem;
  color: #64748b;
}

.card-action {
  margin-top: 0.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: center;
}

.btn-appointment {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #2563eb 0%, #0284c7 100%);
  color: #ffffff;
  font-weight: 700;
  font-size: 0.875rem;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
  transition: all 0.2s ease;
}

.btn-appointment:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.35);
}

.icon-arrow {
  width: 16px;
  height: 16px;
}

@keyframes pulse {
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
  70% { transform: scale(1); box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
}

@media (max-width: 992px) {
  .hero-container {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2.5rem;
  }
  .hero-subtitle { margin: 0 auto 2rem; }
  .hero-buttons, .hero-trust { justify-content: center; }
  .hero-title { font-size: 2.25rem; }
}
:deep(.btn) {
  padding: 0.5rem 1rem !important;
  width: auto !important;
}
</style>