<template>
  <div class="assessment-container">
    <h2>Test d'Éligibilité à l'Immigration Canadienne</h2>

    <!-- Indicateur d'étapes (Stepper) -->
    <div v-if="!result" class="stepper">
      <span :class="{ active: currentStep === 1 }">1. Profil</span>
      <span :class="{ active: currentStep === 2 }">2. Langues & Emploi</span>
      <span :class="{ active: currentStep === 3 }">3. Provinces</span>
    </div>

    <!-- Étape 1 : Informations Générales -->
    <div v-if="currentStep === 1 && !result" class="step-card">
      <h3>Profil de Base</h3>
      <div class="form-group">
        <label>Âge :</label>
        <input type="number" v-model.number="form.age" min="18" max="99" />
      </div>
      <div class="form-group">
        <label>Niveau d'études :</label>
        <select v-model="form.educationLevel">
          <option value="HIGH_SCHOOL">Secondaire</option>
          <option value="DIPLOMA">Diplôme / Certificat technique</option>
          <option value="BACHELOR">Baccalauréat / Licence</option>
          <option value="MASTER">Maîtrise / Master</option>
          <option value="PHD">Doctorat</option>
        </select>
      </div>
      <button @click="currentStep = 2" class="btn-next">Suivant</button>
    </div>

    <!-- Étape 2 : Langues & Emploi -->
    <div v-if="currentStep === 2 && !result" class="step-card">
      <h3>Compétences Linguistiques & Expérience</h3>
      <div class="form-group">
        <label>Niveau de Français (TCF/TEF) :</label>
        <select v-model.number="form.clbFrench">
          <option :value="4">A2 - Débutant (NCLC 4)</option>
          <option :value="5">B1 Bas (NCLC 5)</option>
          <option :value="6">B1 Intermédiaire (NCLC 6)</option>
          <option :value="7">B2 Intermédiaire avancé (NCLC 7)</option>
          <option :value="8">B2 Haut (NCLC 8)</option>
          <option :value="9">C1 Avancé (NCLC 9)</option>
          <option :value="10">C2 Expert / Bilingue (NCLC 10+)</option>
        </select>
      </div>
      <div class="form-group">
        <label>Niveau CLB/NCLC Anglais (0 - 12) :</label>
        <input type="number" v-model.number="form.clbEnglish" min="0" max="12" />
      </div>
      <div class="form-group">
        <label>Années d'expérience de travail :</label>
        <input type="number" v-model.number="form.workExperienceYrs" min="0" />
      </div>
      <div class="form-group">
        <label>Catégorie FEER (TEER) de l'emploi :</label>
        <select v-model.number="form.teerCategory">
          <option :value="0">FEER 0 (Gestion : Directeurs, cadres)</option>
          <option :value="1">FEER 1 (Professionnel : Ingénieurs, Développeurs, Professeurs)</option>
          <option :value="2">FEER 2 (Technique : Techniciens, Électriciens, BTS/Cégep)</option>
          <option :value="3">FEER 3 (Intermédiaire : Métiers spécialisés, Cuisiniers)</option>
          <option :value="4">FEER 4 & 5 (Manuel / Exécution : Serveurs, Nettoyeurs)</option>
        </select>
      </div>
      <div class="actions">
        <button @click="currentStep = 1">Retour</button>
        <button @click="currentStep = 3" class="btn-next">Suivant</button>
      </div>
    </div>

    <!-- Étape 3 : Spécificités Provinciales -->
    <div v-if="currentStep === 3 && !result" class="step-card">
      <h3>Offres d'Emploi & Préférences Provinciales</h3>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="form.hasValidatedOffer" /> Offre d'emploi validée au Canada
        </label>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="form.isOutsideGTA" /> Emploi situé hors du Grand Toronto (Ontario)
        </label>
      </div>
      <div class="form-group">
        <label>
          <input type="checkbox" v-model="form.hasBcDegree" /> Diplôme obtenu en C.-B.
        </label>
      </div>
      <div class="actions">
        <button @click="currentStep = 2">Retour</button>
        <button @click="submitAssessment" :disabled="loading" class="btn-submit">
          {{ loading ? 'Calcul en cours...' : 'Voir mes résultats' }}
        </button>
      </div>
    </div>

    <!-- Résultat final & Roadmap -->
    <div v-if="result" class="results-dashboard">
      <h3>🎯 Résultats de votre évaluation</h3>
      
      <div class="results-grid">
        <div class="result-card" :class="{ eligible: result.federalEligible }">
          <h4>Gouvernement Fédéral</h4>
          <p>Score CRS : <strong>{{ result.federalCrsScore }} pts</strong></p>
          <span class="badge">{{ result.federalEligible ? 'Éligible' : 'Non Éligible' }}</span>
        </div>

        <div class="result-card" :class="{ eligible: result.quebecEligible }">
          <h4>Québec (PSTQ)</h4>
          <p>Statut : <strong>{{ result.quebecEligible ? 'Profil Favorable' : 'Niveau de Français Insuffisant' }}</strong></p>
        </div>

        <div class="result-card">
          <h4>Ontario (OINP)</h4>
          <p>Score Estimé : <strong>{{ result.ontarioScore }} pts</strong></p>
        </div>

        <div class="result-card">
          <h4>Colombie-Britannique (BC PNP)</h4>
          <p>Score SIRS Estimé : <strong>{{ result.bcPnpScore }} pts</strong></p>
        </div>
      </div>

      <!-- SECTION ROADMAP / CHECKLIST DYNAMIQUE -->
      <div v-if="result.roadmap && result.roadmap.length" class="roadmap-section">
        <h3>📌 Votre Feuille de Route Personnalisée</h3>
        <p>Basée sur vos résultats, voici vos étapes et prérequis :</p>

        <div class="checklist">
          <div v-for="step in result.roadmap" :key="step.id" class="step-item">
            <div class="step-header">
              <span class="step-number">{{ step.order }}</span>
              <h4>{{ step.title }}</h4>
              <span class="badge-cost" v-if="step.estimatedCost">
                💰 Est. {{ step.estimatedCost }} $ CAD
              </span>
            </div>

            <p class="step-desc">{{ step.description }}</p>

            <div v-if="step.requiredDocs && step.requiredDocs.length" class="docs-list">
              <strong>🎯 Documents à préparer :</strong>
              <ul>
                <li v-for="(doc, idx) in step.requiredDocs" :key="idx">📄 {{ doc }}</li>
              </ul>
            </div>
          </div>
        </div>

        <button @click="$router.push('/dashboard/roadmap')" class="btn-primary">
          Accéder à mon espace Suivi de Roadmap
        </button>
      </div>

      <button @click="resetForm" class="btn-retry">Refaire une évaluation</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const currentStep = ref(1);
const loading = ref(false);
const result = ref(null);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const form = reactive({
  age: 28,
  educationLevel: 'BACHELOR',
  workExperienceYrs: 3,
  clbFrench: 7,
  clbEnglish: 6,
  teerCategory: 1,
  hasValidatedOffer: false,
  isOutsideGTA: false,
  hasBcDegree: false,
});

const submitAssessment = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      alert("Vous devez être connecté pour effectuer ce test.");
      return;
    }

    const res = await fetch(`${API_URL}/assessments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const errorResponse = await res.json();
      console.error('Erreur retournée par NestJS:', errorResponse);
      alert(`Erreur : ${errorResponse.message || 'Échec du traitement'}`);
      return;
    }

    const data = await res.json();
    result.value = data;
  } catch (err) {
    console.error("Erreur lors de la requête d'évaluation :", err);
    alert("Erreur de connexion avec le serveur.");
  } finally {
    loading.value = false;
  }
};

const resetForm = () => {
  result.value = null;
  currentStep.value = 1;
};
</script>

<style scoped>
.assessment-container { max-width: 750px; margin: 0 auto; padding: 20px; font-family: sans-serif; }
.stepper { display: flex; justify-content: space-between; margin-bottom: 20px; }
.stepper span { font-weight: bold; opacity: 0.5; }
.stepper span.active { opacity: 1; color: #42b983; border-bottom: 2px solid #42b983; }
.step-card { background: #f9f9f9; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
.form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
.form-group label { margin-bottom: 5px; font-weight: 600; }
.form-group input, .form-group select { padding: 8px; border-radius: 4px; border: 1px solid #ccc; }
.actions { display: flex; justify-content: space-between; margin-top: 15px; }

.results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0; }
.result-card { padding: 15px; border-radius: 8px; background: #eee; border-left: 5px solid #ccc; }
.result-card.eligible { border-left-color: #42b983; background: #eef9f3; }

.roadmap-section { margin-top: 30px; background: #ffffff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; }
.step-item { background: #f4f6f8; border-radius: 6px; padding: 15px; margin-bottom: 15px; }
.step-header { display: flex; align-items: center; gap: 10px; }
.step-number { background: #42b983; color: white; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 12px; }
.badge-cost { margin-left: auto; background: #fff3cd; color: #856404; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
.docs-list { margin-top: 10px; font-size: 14px; background: #fff; padding: 10px; border-radius: 4px; }
.docs-list ul { margin: 5px 0 0 0; padding-left: 20px; }

.btn-next, .btn-submit, .btn-primary { background: #42b983; color: white; border: none; padding: 10px 15px; border-radius: 4px; cursor: pointer; }
.btn-primary { width: 100%; margin-top: 10px; font-weight: bold; }
.btn-retry { margin-top: 20px; background: #666; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer; }
</style>