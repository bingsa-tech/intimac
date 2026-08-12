<script setup lang="ts">
import { ref, onMounted } from 'vue';
import api from '../../services/api';

const documents = ref<any[]>([]);
const selectedType = ref('PASSPORT');
const selectedFile = ref<File | null>(null);
const loading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');

// Récupérer la liste des documents envoyés
const loadDocuments = async () => {
  try {
    const res = await api.get('/documents/my-documents');
    documents.value = res.data;
  } catch (err) {
    console.error('Erreur chargement documents:', err);
  }
};

// Capturer le fichier sélectionné
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];
  }
};

// Envoyer le fichier au backend
const uploadDocument = async () => {
  if (!selectedFile.value) {
    errorMessage.value = 'Veuillez sélectionner un fichier sur votre ordinateur.';
    return;
  }

  loading.value = true;
  errorMessage.value = '';
  successMessage.value = '';

  // Utilisation obligatoire de FormData pour l'envoi de fichiers (multipart/form-data)
  const formData = new FormData();
  formData.append('file', selectedFile.value);
  formData.append('type', selectedType.value);

  try {
    await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    successMessage.value = 'Document téléversé avec succès !';
    selectedFile.value = null; // Réinitialiser le fichier choisi
    
    // Réinitialiser le champ input
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) fileInput.value = '';

    await loadDocuments(); // Rafraîchir la liste
  } catch (err: any) {
    errorMessage.value = err.response?.data?.message || 'Erreur lors du téléversement du fichier.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadDocuments();
});
</script>

<template>
  <div class="documents-container">
    <h1>📄 Coffre-Fort Documentaire</h1>
    <p>Téléversez vos pièces justificatives pour le CAQ, le Permis d'études et vos candidatures.</p>

    <!-- FORMULAIRE DE TÉLÉVERSEMENT -->
    <div class="card">
      <h2>Ajouter un document</h2>
      
      <div class="form-group">
        <label>Type de document :</label>
        <select v-model="selectedType" class="input">
          <option value="PASSPORT">Passeport / Pièce d'identité</option>
          <option value="CAQ">Demande / Certificat de CAQ</option>
          <option value="TRANSCRIPT">Relevé de notes académique</option>
          <option value="DIPLOMA">Diplôme / Attestation</option>
          <option value="FINANCIAL_PROOF">Preuve financière (Garants, Relevé bancaire)</option>
          <option value="OTHER">Autre document</option>
        </select>
      </div>

      <div class="form-group">
        <label>Sélectionnez le fichier (PDF, PNG, JPG - Max 5Mo) :</label>
        <input id="file-input" type="file" @change="handleFileChange" accept=".pdf,.png,.jpg,.jpeg" class="input" />
      </div>

      <button @click="uploadDocument" :disabled="loading" class="btn-primary">
        {{ loading ? 'Envoi du fichier en cours...' : 'Téléverser le document' }}
      </button>

      <p v-if="errorMessage" class="msg error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="msg success">{{ successMessage }}</p>
    </div>

    <!-- LISTE DES DOCUMENTS TÉLÉVERSÉS -->
    <div class="card">
      <h2>Documents Soumis ({{ documents.length }})</h2>
      <div v-if="documents.length === 0" class="empty">
        Aucun document dans votre dossier pour l'instant.
      </div>

      <div v-for="doc in documents" :key="doc.id" class="doc-row">
        <div class="doc-info">
          <strong>{{ doc.originalName }}</strong>
          <span class="type-tag">{{ doc.type }}</span>
        </div>
        <div class="doc-status">
          <span :class="['status-badge', doc.isVerified ? 'verified' : 'pending']">
            {{ doc.isVerified ? 'Vérifié par l\'agent 🟢' : 'En attente de révision ⏳' }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.documents-container { max-width: 800px; font-family: system-ui, sans-serif; }
.card { background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; margin-bottom: 2rem; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-weight: bold; margin-bottom: 0.4rem; font-size: 0.9rem; }
.input { width: 100%; padding: 0.6rem; border: 1px solid #cbd5e1; border-radius: 4px; box-sizing: border-box; }
.btn-primary { background: #2563eb; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; font-weight: bold; cursor: pointer; }
.btn-primary:disabled { background: #93c5fd; }
.msg { margin-top: 1rem; padding: 0.5rem; border-radius: 4px; font-size: 0.9rem; }
.error { background: #fee2e2; color: #dc2626; }
.success { background: #dcfce7; color: #15803d; }
.empty { color: #94a3b8; font-style: italic; }
.doc-row { display: flex; justify-content: space-between; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid #f1f5f9; }
.type-tag { background: #f1f5f9; color: #475569; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem; margin-left: 0.5rem; }
.status-badge { font-size: 0.85rem; font-weight: bold; padding: 0.25rem 0.5rem; border-radius: 999px; }
.status-badge.verified { background: #dcfce7; color: #15803d; }
.status-badge.pending { background: #fef3c7; color: #b45309; }
</style>