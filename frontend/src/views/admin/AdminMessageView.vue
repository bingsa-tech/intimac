<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: 'PENDING' | 'READ' | 'REPLIED'
  createdAt: string
}

const messages = ref<ContactMessage[]>([])
const selectedMessage = ref<ContactMessage | null>(null)
const isLoading = ref(true)
const filterStatus = ref<string>('ALL')
const searchTerm = ref<string>('')

// Récupérer les messages depuis l'API Backend
const fetchMessages = async () => {
  isLoading.value = true
  try {
    const token = localStorage.getItem('token')
    const response = await fetch('http://localhost:3000/contact', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) throw new Error('Erreur lors du chargement des messages')
    messages.value = await response.json()
    
    // Sélectionner le premier message par défaut s'il existe
    if (messages.value.length > 0 && !selectedMessage.value) {
      selectedMessage.value = messages.value[0]
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

// Sélectionner un message et le marquer comme LU s'il est EN ATTENTE
const selectMessage = async (msg: ContactMessage) => {
  selectedMessage.value = msg
  if (msg.status === 'PENDING') {
    await updateStatus(msg.id, 'READ')
  }
}

// Mettre à jour le statut d'un message
const updateStatus = async (id: string, newStatus: 'PENDING' | 'READ' | 'REPLIED') => {
  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/contact/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: newStatus })
    })

    if (response.ok) {
      const updated = await response.json()
      const index = messages.value.findIndex(m => m.id === id)
      if (index !== -1) messages.value[index] = updated
      if (selectedMessage.value?.id === id) selectedMessage.value = updated
    }
  } catch (error) {
    console.error('Impossible de mettre à jour le statut', error)
  }
}

// Supprimer un message
const deleteMessage = async (id: string) => {
  if (!confirm('Voulez-vous vraiment supprimer ce message ?')) return

  try {
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:3000/contact/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })

    if (response.ok) {
      messages.value = messages.value.filter(m => m.id !== id)
      if (selectedMessage.value?.id === id) {
        selectedMessage.value = messages.value[0] || null
      }
    }
  } catch (error) {
    console.error('Erreur lors de la suppression', error)
  }
}

// Filtrage des messages
const filteredMessages = computed(() => {
  return messages.value.filter(msg => {
    const matchesStatus = filterStatus.value === 'ALL' || msg.status === filterStatus.value
    const matchesSearch = 
      msg.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      msg.email.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchTerm.value.toLowerCase())
    return matchesStatus && matchesSearch
  })
})

// Formatage de date
const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(fetchMessages)
</script>

<template>
  <div class="admin-messages-container">
    <header class="page-header">
      <div>
        <h2>Gestion des Messages</h2>
        <p>Consultez et répondez aux demandes reçues depuis le formulaire de contact.</p>
      </div>
    </header>

    <div v-if="isLoading" class="loading-state">
      <div class="spinner"></div>
      <p>Chargement des messages...</p>
    </div>

    <div v-else-if="messages.length === 0" class="empty-state">
      <p>Aucun message reçu pour le moment.</p>
    </div>

    <div v-else class="messages-layout">
      <!-- PANNEAU GAUCHE : LISTE DES MESSAGES -->
      <aside class="messages-list-panel">
        <div class="filter-bar">
          <input 
            v-model="searchTerm" 
            type="text" 
            placeholder="Rechercher nom, email..." 
            class="search-input"
          />
          <select v-model="filterStatus" class="status-select">
            <option value="ALL">Tous</option>
            <option value="PENDING">En attente</option>
            <option value="READ">Lus</option>
            <option value="REPLIED">Répondus</option>
          </select>
        </div>

        <ul class="messages-list">
          <li 
            v-for="msg in filteredMessages" 
            :key="msg.id"
            :class="['message-item', { active: selectedMessage?.id === msg.id, unread: msg.status === 'PENDING' }]"
            @click="selectMessage(msg)"
          >
            <div class="item-header">
              <span class="sender-name">{{ msg.name }}</span>
              <span class="item-date">{{ formatDate(msg.createdAt) }}</span>
            </div>
            <div class="item-subject">{{ msg.subject }}</div>
            <div class="item-badge" :class="msg.status.toLowerCase()">
              {{ msg.status === 'PENDING' ? 'Nouveau' : msg.status === 'READ' ? 'Lu' : 'Répondu' }}
            </div>
          </li>
        </ul>
      </aside>

      <!-- PANNEAU DROIT : DÉTAIL DU MESSAGE SÉLECTIONNÉ -->
      <main class="message-detail-panel" v-if="selectedMessage">
        <div class="detail-header">
          <div class="subject-title">
            <h3>{{ selectedMessage.subject }}</h3>
            <span class="badge" :class="selectedMessage.status.toLowerCase()">
              {{ selectedMessage.status }}
            </span>
          </div>

          <div class="actions-bar">
            <button 
              @click="updateStatus(selectedMessage.id, 'REPLIED')" 
              class="btn btn-success"
              :disabled="selectedMessage.status === 'REPLIED'"
            >
              Marquer comme Répondu
            </button>
            <button @click="deleteMessage(selectedMessage.id)" class="btn btn-danger">
              Supprimer
            </button>
          </div>
        </div>

        <div class="sender-info">
          <div><strong>De :</strong> {{ selectedMessage.name }} ({{ selectedMessage.email }})</div>
          <div><strong>Reçu le :</strong> {{ formatDate(selectedMessage.createdAt) }}</div>
        </div>

        <hr class="divider" />

        <div class="message-body">
          <p>{{ selectedMessage.message }}</p>
        </div>

        <div class="reply-action">
          <a :href="`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`" class="btn btn-primary">
            Répondre par Courriel
          </a>
        </div>
      </main>

      <div v-else class="no-selection">
        <p>Sélectionnez un message pour afficher les détails.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.admin-messages-container {
  padding: 1.5rem;
  max-width: 1300px;
  margin: 0 auto;
}

.page-header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
}

.page-header p {
  color: #64748b;
  font-size: 0.9rem;
}

.messages-layout {
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
  min-height: 600px;
}

/* Panneau de liste */
.messages-list-panel {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}

.filter-bar {
  padding: 1rem;
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.search-input, .status-select {
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.85rem;
}

.search-input { flex: 1; }

.messages-list {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: 520px;
}

.message-item {
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  cursor: pointer;
  transition: background 0.2s;
}

.message-item:hover { background: #f8fafc; }
.message-item.active { background: #eff6ff; border-left: 4px solid #2563eb; }
.message-item.unread { font-weight: bold; background: #faf5ff; }

.item-header {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.item-date { color: #94a3b8; font-size: 0.75rem; }
.item-subject { font-size: 0.9rem; color: #334155; margin: 0.3rem 0; }

.item-badge {
  display: inline-block;
  padding: 0.15rem 0.5rem;
  font-size: 0.7rem;
  border-radius: 4px;
}

/* Panneau de détail */
.message-detail-panel {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1.5rem;
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.subject-title h3 {
  font-size: 1.25rem;
  color: #0f172a;
}

.actions-bar { display: flex; gap: 0.5rem; }

.sender-info {
  background: #f8fafc;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  font-size: 0.875rem;
  color: #475569;
}

.divider { border: 0; border-top: 1px solid #e2e8f0; margin: 1.5rem 0; }

.message-body {
  font-size: 0.95rem;
  color: #1e293b;
  line-height: 1.6;
  white-space: pre-wrap;
  min-height: 200px;
}

.reply-action { margin-top: 2rem; }

/* Badges de Statut */
.pending { background: #fef3c7; color: #d97706; }
.read { background: #e0f2fe; color: #0369a1; }
.replied { background: #dcfce7; color: #15803d; }

/* Boutons */
.btn {
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.85rem;
  border: none;
  cursor: pointer;
  text-decoration: none;
}

.btn-primary { background: #2563eb; color: #fff; }
.btn-success { background: #16a34a; color: #fff; }
.btn-danger { background: #dc2626; color: #fff; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.loading-state, .empty-state, .no-selection {
  text-align: center;
  padding: 3rem;
  color: #64748b;
}
</style>