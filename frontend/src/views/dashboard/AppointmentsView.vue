<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import api from '../../services/api';

interface Slot {
  time: string;
  isAvailable: boolean;
}

const appointments = ref<any[]>([]);
const advisors = ref<any[]>([]);
const appointmentDate = ref(new Date().toISOString().split('T')[0]); // Date du jour par défaut
const advisorId = ref('');
const selectedSlot = ref<string>('');
const availableSlots = ref<Slot[]>([]);
const notes = ref('');
const loading = ref(false);
const message = ref('');

// Créneaux de secours en cas d'erreur 404 de l'API
const useFallbackSlots = () => {
  availableSlots.value = [
    { time: '09:00', isAvailable: true },
    { time: '10:00', isAvailable: true },
    { time: '11:00', isAvailable: true },
    { time: '14:00', isAvailable: true },
    { time: '15:00', isAvailable: true },
  ];
};

// 1. Charger la liste des conseillers
const loadAdvisors = async () => {
  try {
    const res = await api.get('/users/advisors'); 
    advisors.value = res.data;
    if (advisors.value.length > 0) {
      advisorId.value = advisors.value[0].id;
    }
  } catch (err) {
    console.error('Erreur chargement conseillers:', err);
  }
};

// 2. Charger les RDV déjà pris par l'étudiant
const loadAppointments = async () => {
  try {
    const res = await api.get('/appointments/my-appointments');
    appointments.value = res.data;
  } catch (err) {
    console.error('Erreur chargement RDV:', err);
  }
};

// 3. Charger dynamiquement les créneaux disponibles
const fetchAvailableSlots = async () => {
  if (!advisorId.value || !appointmentDate.value) return;

  try {
    const res = await api.get('/appointments/available-slots', {
      params: {
        advisorId: advisorId.value,
        date: appointmentDate.value,
      },
    });

    if (Array.isArray(res.data) && res.data.length > 0) {
      availableSlots.value = res.data;
    } else {
      useFallbackSlots();
    }
  } catch (err) {
    console.warn('Route API non trouvée (404). Utilisation des créneaux de secours.');
    useFallbackSlots(); // Débloque le bouton si la route n'existe pas encore
  } finally {
    // Auto-sélection du premier créneau libre
    const firstAvailable = availableSlots.value.find(s => s.isAvailable);
    if (firstAvailable) {
      selectedSlot.value = firstAvailable.time;
    } else {
      selectedSlot.value = '';
    }
  }
};

// Réagir aux changements de date ou de conseiller
watch([appointmentDate, advisorId], () => {
  fetchAvailableSlots();
});

// Sélection manuelle d'un créneau par l'utilisateur
const selectSlot = (slot: Slot) => {
  if (slot.isAvailable) {
    selectedSlot.value = slot.time;
  }
};

// 4. Réserver le rendez-vous
const bookAppointment = async () => {
  if (!appointmentDate.value) {
    message.value = 'Veuillez sélectionner une date.';
    return;
  }

  if (!selectedSlot.value) {
    message.value = 'Veuillez choisir un créneau horaire disponible.';
    return;
  }

  if (!advisorId.value) {
    message.value = 'Veuillez choisir un conseiller.';
    return;
  }

  loading.value = true;
  message.value = '';

  try {
    const fullDate = new Date(`${appointmentDate.value}T${selectedSlot.value}:00`).toISOString();

    await api.post('/appointments', {
      date: fullDate,
      advisorId: advisorId.value,
      notes: notes.value,
    });

    message.value = 'Rendez-vous demandé avec succès !';
    notes.value = '';
    selectedSlot.value = '';
    await loadAppointments();
    await fetchAvailableSlots();
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Erreur lors de la réservation.';
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  await loadAdvisors();
  await loadAppointments();
  await fetchAvailableSlots();
});
</script>

<template>
  <div class="appointments-container">
    <h1>📅 Prise de Rendez-vous Conseiller</h1>

    <!-- FORMULAIRE DE RÉSERVATION -->
    <div class="card">
      <h2>Réserver une session d'orientation</h2>

      <div class="form-group">
        <label>Choisir un conseiller :</label>
        <select v-model="advisorId" class="input" :disabled="advisors.length === 0">
          <option v-if="advisors.length === 0" value="">Aucun conseiller disponible</option>
          <option v-for="adv in advisors" :key="adv.id" :value="adv.id">
            {{ adv.firstName || '' }} {{ adv.lastName || '' }} ({{ adv.email }})
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Date :</label>
        <input type="date" v-model="appointmentDate" class="input" />
      </div>

      <!-- CRÉNEAUX HORAIRES DYNAMIQUES -->
      <div class="form-group">
        <label>Créneaux disponibles :</label>
        <div v-if="availableSlots.length === 0" class="empty">Chargement des créneaux...</div>
        <div v-else class="slots-grid">
          <button
            v-for="slot in availableSlots"
            :key="slot.time"
            type="button"
            :disabled="!slot.isAvailable"
            :class="{ 
              'slot-disabled': !slot.isAvailable, 
              'slot-selected': selectedSlot === slot.time 
            }"
            @click="selectSlot(slot)"
          >
            {{ slot.time }}
            <span v-if="!slot.isAvailable"> (Occupé)</span>
          </button>
        </div>
        <p v-if="!selectedSlot && availableSlots.length > 0" class="warn-msg">
          ⚠️ Aucun créneau disponible sélectionné pour cette date.
        </p>
      </div>

      <div class="form-group">
        <label>Sujet / Questions pour le conseiller :</label>
        <textarea v-model="notes" class="input" placeholder="Ex: Choix de l'université, documents CAQ..."></textarea>
      </div>

      <button @click="bookAppointment" :disabled="loading || !advisorId || !selectedSlot" class="btn-primary">
        {{ loading ? 'Réservation...' : 'Confirmer le Rendez-vous' }}
      </button>

      <p v-if="message" class="msg">{{ message }}</p>
    </div>

    <!-- LISTE DES MES RDV -->
    <div class="card">
      <h2>Mes Rendez-vous Programmé(s) ({{ appointments.length }})</h2>
      
      <div v-if="appointments.length === 0" class="empty">
        Aucun rendez-vous planifié pour le moment.
      </div>

      <div v-for="apt in appointments" :key="apt.id" class="apt-row">
        <div>
          <strong>{{ new Date(apt.date).toLocaleString('fr-FR') }}</strong>
          <p class="notes-text">{{ apt.notes || 'Aucune note fournie' }}</p>
        </div>
        <span :class="['status-badge', apt.status]">{{ apt.status }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.appointments-container { max-width: 700px; font-family: system-ui, sans-serif; }
.card { background: white; border: 1px solid #e2e8f0; padding: 1.5rem; border-radius: 8px; margin-bottom: 1.5rem; }
.form-group { margin-bottom: 1.25rem; }
.form-group label { display: block; font-weight: bold; margin-bottom: 0.4rem; font-size: 0.9rem; }
.input { width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box; }

.slots-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 0.5rem;
  margin-top: 0.5rem;
}
.slots-grid button {
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  cursor: pointer;
  border: 1px solid #2563eb;
  background: white;
  color: #2563eb;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.2s ease;
}
.slots-grid button:hover:not(:disabled) {
  background-color: #eff6ff;
}
.slot-disabled {
  background-color: #f1f5f9 !important;
  color: #94a3b8 !important;
  border-color: #cbd5e1 !important;
  cursor: not-allowed !important;
  text-decoration: line-through;
}
.slot-selected {
  background-color: #2563eb !important;
  color: white !important;
}

.btn-primary { background: #2563eb; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; font-weight: bold; cursor: pointer; width: 100%; }
.btn-primary:disabled { background: #93c5fd; cursor: not-allowed; }
.warn-msg { color: #dc2626; font-size: 0.85rem; margin-top: 0.5rem; font-weight: 500; }
.msg { margin-top: 1rem; font-weight: 500; text-align: center; }
.empty { color: #94a3b8; font-style: italic; }
.apt-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; padding: 0.75rem 0; }
.notes-text { margin: 0.25rem 0 0 0; color: #64748b; font-size: 0.9rem; }
.status-badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
.PENDING { background: #fef3c7; color: #b45309; }
.CONFIRMED { background: #dcfce7; color: #15803d; }
.CANCELLED { background: #fee2e2; color: #dc2626; }
</style>