<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../../services/api';

const appointments = ref<any[]>([]);
const loading = ref(true);

const loadAppointments = async () => {
  try {
    const res = await api.get('/appointments/admin/all');
    appointments.value = res.data;
  } catch (err) {
    console.error('Erreur chargement RDV admin:', err);
  } finally {
    loading.value = false;
  }

};

const changeStatus = async (id: string, newStatus: string) => {
  try {
    await api.patch(`/appointments/${id}/status`, { status: newStatus });
    await loadAppointments();
  } catch (err) {
    console.error('Erreur mise à jour statut:', err);
  }
};

onMounted(() => {
  loadAppointments();
});
</script>

<template>
  <div class="admin-appointments">
    <h1>📋 Gestion de tous les Rendez-vous</h1>

    <div v-if="loading">Chargement des rendez-vous...</div>

    <table v-else class="appointments-table">
      <thead>
        <tr>
          <th>Étudiant</th>
          <th>Conseiller</th>
          <th>Date & Heure</th>
          <th>Sujet / Notes</th>
          <th>Statut</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="apt in appointments" :key="apt.id">
          <td>{{ apt.student?.firstName }} {{ apt.student?.lastName }} 
             <span v-if="apt.student?.email">({{ apt.student.email }})</span>
          </td>
          <td>{{ apt.advisor?.firstName }} {{ apt.advisor?.lastName }}</td>
          <td>{{ new Date(apt.date).toLocaleString('fr-FR') }}</td>
          <td>{{ apt.notes || 'Aucune note' }}</td>
          <td>
            <span :class="['status-badge', apt.status]">{{ apt.status }}</span>
          </td>
          <td class="actions">
            <button 
              v-if="apt.status !== 'CONFIRMED'" 
              @click="changeStatus(apt.id, 'CONFIRMED')" 
              class="btn-confirm"
            >
              Confirmer
            </button>
            <button 
              v-if="apt.status !== 'CANCELLED'" 
              @click="changeStatus(apt.id, 'CANCELLED')" 
              class="btn-cancel"
            >
              Annuler
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.admin-appointments { padding: 1rem; }
.appointments-table { width: 100%; border-collapse: collapse; background: white; margin-top: 1rem; }
.appointments-table th, .appointments-table td { border: 1px solid #e2e8f0; padding: 0.75rem; text-align: left; }
.appointments-table th { background: #f8fafc; font-weight: bold; }

.status-badge { padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem; font-weight: bold; }
.PENDING { background: #fef3c7; color: #b45309; }
.CONFIRMED { background: #dcfce7; color: #15803d; }
.CANCELLED { background: #fee2e2; color: #dc2626; }

.actions { display: flex; gap: 0.5rem; }
.btn-confirm { background: #16a34a; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
.btn-cancel { background: #dc2626; color: white; border: none; padding: 0.4rem 0.8rem; border-radius: 4px; cursor: pointer; }
</style>