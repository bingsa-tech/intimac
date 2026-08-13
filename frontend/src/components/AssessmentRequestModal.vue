<script setup>
import { ref } from 'vue'
import axios from 'axios' // ou votre client API configuré

const props = defineProps({
  isOpen: Boolean
})
const emit = defineEmits(['close'])

const form = ref({
  fullName: '',
  email: '',
  country: '',
  phone: ''
})

const loading = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const handleSubmit = async () => {
  loading.value = true
  errorMessage.value = ''
  try {
    await axios.post('/assessment-requests', form.value)
    successMessage.value = "Votre demande a été envoyée avec succès ! Vous recevrez un e-mail une fois approuvée."
    form.value = { fullName: '', email: '', country: '', phone: '' }
  } catch (err) {
    errorMessage.value = err.response?.data?.message || "Erreur lors de l'envoi."
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="emit('close')">
    <div class="modal-content">
      <h3>Demander une évaluation</h3>
      
      <div v-if="successMessage" class="alert-success">
        {{ successMessage }}
        <button @click="emit('close')">Fermer</button>
      </div>

      <form v-else @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>Nom complet</label>
          <input v-model="form.fullName" required type="text" placeholder="Jean Dupont" />
        </div>

        <div class="form-group">
          <label>Adresse E-mail</label>
          <input v-model="form.email" required type="email" placeholder="jean@example.com" />
        </div>
        <div class="form-group">
          <label>Pays de résidence</label>
          <input v-model="form.country" required type="text" placeholder="Pays de résidence" />
        </div>
        <div class="form-group">
          <label>Téléphone (optionnel)</label>
          <input v-model="form.phone" type="tel" placeholder="+1 514 ..." />
        </div>

        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

        <div class="actions">
          <button type="button" @click="emit('close')">Annuler</button>
          <button type="submit" :disabled="loading">
            {{ loading ? 'Envoi...' : 'Envoyer la demande' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>