<script setup>
import { ref, onMounted } from 'vue'
import api from '../../services/api'

const requests = ref([])
const loading = ref(false)

const fetchRequests = async () => {
  loading.value = true
  try {
    const res = await api.get('/assessments/requests?status=PENDING')
    const data = res.data?.data || res.data
    requests.value = Array.isArray(data) ? data : []
  } catch (err) {
    console.error("Erreur lors du chargement des demandes :", err)
    if (err.response?.status === 401) {
      alert("Votre session a expiré. Veuillez vous reconnecter.")
    }
  } finally {
    loading.value = false
  }
}

const approveRequest = async (id) => {
  try {
    await api.patch(`/assessments/requests/${id}/approve`)
    alert("Demande approuvée ! Un e-mail d'accès a été envoyé au candidat.")
    fetchRequests()
  } catch (err) {
    console.error("Erreur lors de l'approbation :", err)
    alert("Erreur lors de l'approbation.")
  }
}

const rejectRequest = async (id) => {
  if (!confirm('Rejeter cette demande ?')) return
  try {
    await api.patch(`/assessments/requests/${id}/reject`)
    fetchRequests()
  } catch (err) {
    console.error("Erreur lors du rejet :", err)
    alert('Erreur lors du rejet.')
  }
}

function formatDate(dateString) {
  if (!dateString) return '-'
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return '-'
  return new Intl.DateTimeFormat('fr-FR').format(date)
}

onMounted(fetchRequests)
</script>

<template>
  <div class="admin-requests">
    <div class="header-container">
      <h2>Demandes d'évaluation Invités en attente</h2>
      <span class="badge" v-if="requests.length > 0">{{ requests.length }} en attente</span>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Chargement des demandes...</p>
    </div>

    <div v-else-if="requests.length > 0" class="table-card">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Nom complet</th>
            <th>E-mail</th>
            <th>Pays de résidence</th>
            <th>Téléphone</th>
            <th class="text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="req in requests" :key="req.id">
            <td class="date-cell">{{ formatDate(req.createdAt || req.created_at) }}</td>
            <td class="font-medium">{{ req.fullName || req.full_name || req.name || '-' }}</td>
            <td>{{ req.email || '-' }}</td>
            <td>{{ req.country || '-' }}</td>
            <td>{{ req.phone || '-' }}</td>
            <td class="actions-cell">
              <button class="btn btn-success" @click="approveRequest(req.id)">
                <i class="fas fa-check"></i> Approuver
              </button>
              <button class="btn btn-danger" @click="rejectRequest(req.id)">
                <i class="fas fa-times"></i> Refuser
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="empty-state">
      <i class="fas fa-inbox empty-icon"></i>
      <p>Aucune demande d'évaluation en attente pour le moment.</p>
    </div>
  </div>
</template>

<style scoped>
.admin-requests {
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
  color: #1e293b;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.header-container h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
}

.badge {
  background-color: #fef3c7;
  color: #d97706;
  padding: 0.35rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.85rem;
  font-weight: 600;
}

.table-card {
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
  font-size: 0.925rem;
}

thead {
  background-color: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

th {
  padding: 1rem 1.25rem;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

td {
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  vertical-align: middle;
}

tr:last-child td {
  border-bottom: none;
}

tr:hover {
  background-color: #f8fafc;
  transition: background-color 0.15s ease;
}

.font-medium {
  font-weight: 600;
  color: #0f172a;
}

.date-cell {
  color: #64748b;
  font-size: 0.85rem;
}

.text-right {
  text-align: right;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
}

/* Boutons */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.85rem;
  border-radius: 6px;
  font-size: 0.825rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
}

.btn-success {
  background-color: #10b981;
  color: #ffffff;
}

.btn-success:hover {
  background-color: #059669;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
}

.btn-danger {
  background-color: #ef4444;
  color: #ffffff;
}

.btn-danger:hover {
  background-color: #dc2626;
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
}

/* Éats chargement & vide */
.loading-state,
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  color: #64748b;
}

.empty-icon {
  font-size: 2.5rem;
  color: #cbd5e1;
  margin-bottom: 0.75rem;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem auto;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>