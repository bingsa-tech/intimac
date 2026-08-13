<script setup>
import { ref } from 'vue'
// 💡 Importation de votre instance api personnalisée
import api from '../services/api'

// État d'ouverture/fermeture géré en interne
const isOpen = ref(false)

const form = ref({
  fullName: '',
  email: '',
  country: '',
  phone: ''
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const toggleWidget = () => {
  isOpen.value = !isOpen.value
}

const closeWidget = () => {
  isOpen.value = false
  setTimeout(() => {
    successMessage.value = ''
    errorMessage.value = ''
  }, 300)
}

const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    // 💡 Utilisez 'api' au lieu d'axios
    await api.post('/assessments/request', form.value)
    
    successMessage.value = "Votre demande a été envoyée avec succès ! Vous recevrez un e-mail une fois approuvée."
    form.value = { fullName: '', email: '', country: '', phone: '' }
  } catch (err) {
    console.error("Détail de l'erreur :", err)
    
    const msg = err.response?.data?.message
    if (Array.isArray(msg)) {
      errorMessage.value = msg.join(' | ')
    } else if (msg) {
      errorMessage.value = msg
    } else {
      errorMessage.value = "Erreur de connexion au serveur."
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="left-widget-container" :class="{ 'is-open': isOpen }">
    <!-- Onglet / Bouton déclencheur collé sur le bord gauche -->
    <button class="widget-trigger-btn" @click="toggleWidget" title="Demander une évaluation">
      <span class="btn-icon">📋</span>
      <span class="btn-text">Demander une évaluation</span>
    </button>

    <!-- Panneau du formulaire -->
    <div class="widget-panel">
      <div class="panel-header">
        <h3>Demander une évaluation</h3>
        <button class="close-btn" @click="closeWidget">&times;</button>
      </div>

      <div class="panel-body">
        <div v-if="successMessage" class="alert-success">
          <p>{{ successMessage }}</p>
          <button class="btn-primary" @click="closeWidget">Fermer</button>
        </div>

        <form v-else @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Nom complet *</label>
            <input v-model="form.fullName" required type="text" placeholder="sam bil" />
          </div>

          <div class="form-group">
            <label>Adresse E-mail *</label>
            <input v-model="form.email" required type="email" placeholder="sam@example.com" />
          </div>

          <div class="form-group">
            <label>Pays de résidence *</label>
            <input v-model="form.country" required type="text" placeholder="ex: Congo, Cameroun..." />
          </div>

          <div class="form-group">
            <label>Téléphone (optionnel)</label>
            <input v-model="form.phone" type="tel" placeholder="+1 514 ..." />
          </div>

          <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

          <div class="actions">
            <button type="button" class="btn-secondary" @click="closeWidget">Annuler</button>
            <button type="submit" class="btn-primary" :disabled="loading">
              {{ loading ? 'Envoi...' : 'Envoyer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Conteneur principal ancré à gauche */
/* 1. Ancré à DROITE au lieu de gauche */
.left-widget-container {
  position: fixed;
  right: 0; /* CHANGÉ : left -> right */
  top: 50%;
  transform: translateY(-50%);
  z-index: 9999;
  display: flex;
  align-items: center;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
/* Bouton déclencheur vertical */
.widget-trigger-btn {
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 8px 0 0 8px; /* CHANGÉ : 0 8px 8px 0 -> 8px 0 0 8px */
  padding: 12px 10px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  box-shadow: -2px 4px 10px rgba(0, 0, 0, 0.15); /* Ombres vers la gauche */
  transition: background-color 0.2s ease;
  order: 2; /* S'assure que le bouton reste collé au bord */
}

.widget-trigger-btn:hover {
  background-color: #1d4ed8;
}

.btn-text {
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  font-weight: 600;
  font-size: 0.9rem;
  letter-spacing: 0.5px;
  white-space: nowrap;
}

/* Panneau rétractable */
.widget-panel {
  position: absolute;
  right: 0; /* CHANGÉ : left -> right */
  top: 50%;
  transform: translateY(-50%) translateX(100%); /* CHANGÉ : -100% -> 100% */
  width: 320px;
  background: #ffffff;
  border-radius: 12px 0 0 12px; /* CHANGÉ : Arrondi à gauche */
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
  border: 1px solid #e5e7eb;
  overflow: hidden;
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  order: 1;
}

/* Quand le widget est ouvert */
.left-widget-container.is-open .widget-panel {
  transform: translateY(-50%) translateX(-45px); /* CHANGÉ : 45px -> -45px */
}

/* En-tête du panneau */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.panel-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #0f172a;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #64748b;
  line-height: 1;
}

.close-btn:hover {
  color: #0f172a;
}

/* Corps du formulaire */
.panel-body {
  padding: 16px;
  max-height: 80vh;
  overflow-y: auto;
}

.form-group {
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 500;
  color: #334155;
}

.form-group input {
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
}

.form-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.15);
}

.error-msg {
  color: #dc2626;
  font-size: 0.85rem;
  margin-bottom: 10px;
}

.alert-success {
  text-align: center;
  color: #166534;
  background-color: #f0fdf4;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #bbf7d0;
  font-size: 0.9rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

.btn-primary {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #cbd5e1;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}
</style>