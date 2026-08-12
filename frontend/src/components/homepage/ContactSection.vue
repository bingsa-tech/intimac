<script setup lang="ts">
import { ref, reactive } from 'vue'

// État du formulaire
const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// États de la requête asynchrone
const isLoading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  isLoading.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // Remplacer l'URL ci-dessous par votre endpoint backend réel (ex: http://localhost:3000/api/contact)
    const response = await fetch('http://localhost:3000/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })

    if (!response.ok) {
      throw new Error('Une erreur est survenue lors de l\'envoi.')
    }

    // Réinitialisation du formulaire en cas de succès
    successMessage.value = 'Votre message a été envoyé avec succès ! Notre équipe vous répondra sous 24h.'
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (err: any) {
    errorMessage.value = err.message || 'Impossible d\'envoyer le message pour le moment.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <section id="contact" class="contact-section">
    <div class="section-header center">
      
      <h2 class="section-title">Parlons de votre projet</h2>
      <p class="section-subtitle">
        Une question sur nos services, bourses ou accompagnements ? Écrivez-nous et recevez une réponse rapide.
      </p>
    </div>

    <div class="contact-grid">
      <!-- Bloc Informations de Contact -->
      <div class="contact-info-card">
        <h3>Nos Coordonnées</h3>
        <p class="info-intro">Notre équipe est à votre disposition pour vous orienter dans vos démarches.</p>

        <div class="info-items">
          <div class="info-item">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <strong>Téléphone</strong>
              <p>+1 (438) 924-8545</p>
            </div>
          </div>

          <div class="info-item">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <strong>Email</strong>
              <p>biljobs@outlook.com</p>
            </div>
          </div>

          <div class="info-item">
            <div class="icon-wrapper">
              <svg xmlns="http://www.acim.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <strong>Adresse</strong>
              <p>Serbrooke, Québec, Canada</p>
              <p>519, rue Marcel-gingras, J1E 0L3</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Formulaire Asynchrone -->
      <div class="contact-form-card">
        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Nom complet</label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Ex: Owen bil"
              />
            </div>

            <div class="form-group">
              <label for="email">Adresse email</label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="samuel.bil@admin.com"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="subject">Sujet</label>
            <input
              id="subject"
              v-model="form.subject"
              type="text"
              required
              placeholder="Ex: suis-je éligible ??"
            />
          </div>

          <div class="form-group">
            <label for="message">Message</label>
            <textarea
              id="message"
              v-model="form.message"
              rows="5"
              required
              placeholder="Expliquez-nous brièvement votre situation..."
            ></textarea>
          </div>

          <!-- Messages de retour utilisateur -->
          <div v-if="successMessage" class="alert alert-success">
            {{ successMessage }}
          </div>

          <div v-if="errorMessage" class="alert alert-error">
            {{ errorMessage }}
          </div>

          <button type="submit" class="btn-submit" :disabled="isLoading">
            <span v-if="isLoading" class="spinner"></span>
            <span v-else>Envoyer le message</span>
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  max-width: 1200px;
  margin: 2rem auto 0;
  padding: 0 1.5rem;
}

.section-header.center {
  text-align: center;
  margin-bottom: 2.5rem;
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

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 2rem;
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}

/* Carte Info */
.contact-info-card {
  background: #0f172a;
  color: #ffffff;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
}

.contact-info-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}

.info-intro {
  color: #94a3b8;
  font-size: 0.95rem;
  margin-bottom: 2rem;
  line-height: 1.5;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.icon-wrapper {
  background: rgba(255, 255, 255, 0.1);
  color: #3b82f6;
  padding: 0.6rem;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-item strong {
  display: block;
  font-size: 0.875rem;
  color: #cbd5e1;
}

.info-item p {
  color: #ffffff;
  font-size: 0.95rem;
  margin: 0.2rem 0 0;
}

/* Carte Formulaire */
.contact-form-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.form-group label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 0.95rem;
  color: #0f172a;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15);
}

.btn-submit {
  width: fit-content;
  padding: 0.75rem 2rem;
  background: #2563eb;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-submit:hover:not(:disabled) {
  background: #1d4ed8;
  transform: translateY(-1px);
}

.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Alertes & Spinner */
.alert {
  padding: 0.85rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
}

.alert-success {
  background: #f0fdf4;
  color: #166534;
  border: 1px solid #bbf7d0;
}

.alert-error {
  background: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
}

.spinner {
  width: 18px;
  height: 18px;
  border: 2px solid #ffffff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>