<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();

// Gestion des étapes (1: Choix d'objectif, 2: Informations du compte)
const currentStep = ref(1);

// État des données
const targetProfile = ref('');
const role = ref('STUDENT');

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const firstName = ref('');
const lastName = ref('');
const birthDate = ref('2000-01-01');
const gender = ref('MALE');
const nationality = ref('');
const country = ref('');

// Champs spécifiques par profil
const studyLevel = ref('BAC');
const researchField = ref('');
const immigrationProgram = ref('EXPRESS');
const eventType = ref('COLLOQUE');

const acceptedEthics = ref(false);
const errorMessage = ref('');
const loading = ref(false);

// Options de sélection de profil
const profileOptions = [
  {
    key: 'STUDENT_ABROAD',
    role: 'STUDENT',
    icon: '🎓',
    title: "Études à l'étranger",
    description: 'Projets d\'études au Canada, en France et autres pays d\'Occident',
  },
  {
    key: 'RESEARCH_SCHOLARSHIP',
    role: 'STUDENT',
    icon: '💰',
    title: 'Recherche de Bourse',
    description: 'Postuler pour obtenir des bourses d\'études ou de recherche',
  },
  {
    key: 'PERMANENT_RESIDENT',
    role: 'STUDENT',
    icon: '🍁',
    title: 'Résidence Permanente',
    description: 'Immigration qualifiée (Entrée Express, Arrima, PCP)',
  },
  {
    key: 'PROFESSIONAL_EVENTS',
    role: 'PROFESSIONAL',
    icon: '💼',
    title: 'Événements & Colloques',
    description: 'Participation aux salons, forums et conférences professionnelles',
  },
  {
    key: 'PHD_LAB',
    role: 'PROFESSIONAL',
    icon: '🔬',
    title: 'Doctorat & Chercheurs',
    description: 'Trouver un laboratoire de recherche ou un encadrant de thèse',
  },
];

const selectProfile = (profileKey: string, baseRole: string) => {
  targetProfile.value = profileKey;
  role.value = baseRole;
  currentStep.value = 2;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const isFormValid = computed(() => {
  return (
    email.value &&
    password.value &&
    firstName.value &&
    lastName.value &&
    nationality.value &&
    country.value &&
    acceptedEthics.value
  );
});

const register = async () => {
  if (!acceptedEthics.value) {
    errorMessage.value = "Vous devez accepter la charte d'éthique pour continuer.";
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    const payload: Record<string, any> = {
      role: role.value,
      targetProfile: targetProfile.value,
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      birthDate: birthDate.value,
      gender: gender.value,
      nationality: nationality.value,
      country: country.value,
    };

    if (targetProfile.value === 'STUDENT_ABROAD') payload.studyLevel = studyLevel.value;
    if (['RESEARCH_SCHOLARSHIP', 'PHD_LAB'].includes(targetProfile.value)) payload.researchField = researchField.value;
    if (targetProfile.value === 'PERMANENT_RESIDENT') payload.immigrationProgram = immigrationProgram.value;
    if (targetProfile.value === 'PROFESSIONAL_EVENTS') payload.eventType = eventType.value;

    await api.post('/auth/register', payload);
    router.push('/login');
  } catch (err: any) {
    const msg = err.response?.data?.message;
    errorMessage.value = Array.isArray(msg) ? msg.join(', ') : msg || "Erreur lors de l'inscription";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="page-wrapper">
    <div class="register-container">
      
      <!-- BLOC GAUCHE : CHARTE ÉTHIQUE -->
      <aside class="ethics-card">
        <div>
          <div class="badge">Engagement</div>
          <h2>📜 Code d'Éthique & Engagements</h2>
          <p class="ethics-intro">
            Pour maintenir un environnement de confiance, chaque membre s'engage à respecter ces principes :
          </p>

          <ul class="ethics-list">
            <li>
              <span class="icon">🤝</span>
              <div>
                <strong>1. Respect & Bienveillance</strong>
                <p>Échanges courtois avec les conseillers et la communauté.</p>
              </div>
            </li>
            <li>
              <span class="icon">🎯</span>
              <div>
                <strong>2. Authenticité</strong>
                <p>Informations exactes et véridiques sur votre profil.</p>
              </div>
            </li>
            <li>
              <span class="icon">⏰</span>
              <div>
                <strong>3. Assiduité aux RDV</strong>
                <p>Respecter l'horaire des rendez-vous ou annuler 24h à l'avance.</p>
              </div>
            </li>
            <li>
              <span class="icon">🔒</span>
              <div>
                <strong>4. Confidentialité</strong>
                <p>Protection stricte des documents et données partagés.</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="ethics-checkbox" :class="{ 'active': acceptedEthics }">
          <label>
            <input type="checkbox" v-model="acceptedEthics" />
            <span>J'accepte de respecter la charte d'éthique.</span>
          </label>
        </div>
      </aside>

      <!-- BLOC DROITE : MULTI-ÉTAPES -->
      <main class="auth-card">
        <!-- BARRE DE PROGRESSION -->
        <div class="progress-bar-container">
          <div class="progress-bar" :style="{ width: currentStep === 1 ? '50%' : '100%' }"></div>
        </div>

        <!-- ÉTAPE 1 : CHOIX DU PROFIL -->
        <section v-if="currentStep === 1" class="step-wrapper">
          <div class="step-header">
            <span class="step-tag">Étape 1 sur 2</span>
            <h2>Quel est votre objectif principal ?</h2>
            <p class="sub-title">Sélectionnez la catégorie qui correspond à votre projet :</p>
          </div>

          <div class="profile-cards">
            <div 
              v-for="opt in profileOptions" 
              :key="opt.key" 
              @click="selectProfile(opt.key, opt.role)" 
              class="card-option"
            >
              <div class="option-icon">{{ opt.icon }}</div>
              <div class="option-text">
                <strong>{{ opt.title }}</strong>
                <span>{{ opt.description }}</span>
              </div>
            </div>
          </div>
        </section>

        <!-- ÉTAPE 2 : FORMULAIRE -->
        <section v-else class="step-wrapper">
          <div class="header-step">
            <button @click="currentStep = 1" class="btn-back">← Changer d'objectif</button>
            <span class="step-tag">Étape 2 sur 2</span>
          </div>

          <h2>Créer votre compte</h2>
          <p class="sub-title">Complétez le formulaire ci-dessous :</p>

          <form @submit.prevent="register" class="form-body">
            
            <!-- IDENTIFIANTS -->
            <div class="section-title">🔐 Identifiants de connexion</div>
            <div class="form-group">
              <input v-model="email" type="email" placeholder="Adresse Email *" class="input" required />
            </div>
            <div class="form-group password-group">
              <input 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                placeholder="Mot de passe *" 
                class="input" 
                required 
              />
              <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>

            <!-- PROFIL -->
            <div class="section-title">👤 Informatique Personnelle</div>
            <div class="grid-2">
              <div class="form-group">
                <input v-model="firstName" placeholder="Prénom *" class="input" required />
              </div>
              <div class="form-group">
                <input v-model="lastName" placeholder="Nom *" class="input" required />
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <label class="label-sm">Date de naissance</label>
                <input v-model="birthDate" type="date" class="input" required />
              </div>
              <div class="form-group">
                <label class="label-sm">Genre</label>
                <select v-model="gender" class="input">
                  <option value="MALE">Homme</option>
                  <option value="FEMALE">Femme</option>
                  <option value="OTHER">Autre</option>
                </select>
              </div>
            </div>

            <div class="grid-2">
              <div class="form-group">
                <input v-model="nationality" placeholder="Nationalité *" class="input" required />
              </div>
              <div class="form-group">
                <input v-model="country" placeholder="Pays de résidence *" class="input" required />
              </div>
            </div>

            <!-- CHAMPS DYNAMIQUES SELON L'OBJECTIF -->
            <div class="section-title highlight">🎯 Spécificités de votre Projet</div>

            <div v-if="targetProfile === 'STUDENT_ABROAD'" class="form-group">
              <label class="label-sm">Niveau d'études visé :</label>
              <select v-model="studyLevel" class="input">
                <option value="BAC">Baccalauréat / Licence</option>
                <option value="MASTER">Maîtrise / Master</option>
                <option value="DIPLOMA">Formation Professionnelle / Technique</option>
              </select>
            </div>

            <div v-if="['RESEARCH_SCHOLARSHIP', 'PHD_LAB'].includes(targetProfile)" class="form-group">
              <input v-model="researchField" placeholder="Domaine de recherche *" class="input" required />
            </div>

            <div v-if="targetProfile === 'PERMANENT_RESIDENT'" class="form-group">
              <label class="label-sm">Programme d'intérêt :</label>
              <select v-model="immigrationProgram" class="input">
                <option value="EXPRESS">Entrée Express (Fédéral)</option>
                <option value="ARRIMA">Arrima (Québec)</option>
                <option value="OTHER">Programme Provincial (PCP)</option>
              </select>
            </div>

            <div v-if="targetProfile === 'PROFESSIONAL_EVENTS'" class="form-group">
              <label class="label-sm">Type d'événements recherchés :</label>
              <select v-model="eventType" class="input">
                <option value="COLLOQUE">Colloques & Conférences</option>
                <option value="FORUM">Forums & Salons Emploi</option>
                <option value="FORMATION">Formations Certifiantes</option>
              </select>
            </div>

            <!-- BOUTON VALIDER -->
            <button 
              type="submit" 
              :disabled="loading || !isFormValid" 
              class="btn-submit"
            >
              <span v-if="loading">Inscription en cours...</span>
              <span v-else>Finaliser l'inscription</span>
            </button>

            <p v-if="!acceptedEthics" class="warn-ethics">
              ⚠️ N'oubliez pas d'accepter la charte d'éthique à gauche.
            </p>

            <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

            <p class="footer-link">
              Déjà un compte ? <router-link to="/login">Se connecter</router-link>
            </p>
          </form>
        </section>

      </main>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.page-wrapper {
  min-height: 100vh;
  background: radial-gradient(circle at 10% 10%, rgba(99, 102, 241, 0.12) 0%, transparent 40%),
              radial-gradient(circle at 90% 90%, rgba(236, 72, 153, 0.10) 0%, transparent 40%),
              #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5rem 1rem;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: #0f172a;
}

.register-container {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 2rem;
  width: 100%;
  max-width: 1120px;
}

@media (max-width: 900px) {
  .register-container {
    grid-template-columns: 1fr;
  }
}

/* BLOC GAUCHE */
.ethics-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 24px;
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.badge {
  display: inline-block;
  background: #e0e7ff;
  color: #4f46e5;
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.ethics-card h2 {
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.ethics-intro {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.5;
}

.ethics-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.ethics-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
}

.ethics-list .icon {
  font-size: 1.2rem;
  background: #f1f5f9;
  padding: 0.5rem;
  border-radius: 10px;
}

.ethics-list strong {
  display: block;
  font-size: 0.9rem;
  color: #1e293b;
}

.ethics-list p {
  font-size: 0.825rem;
  color: #64748b;
  margin-top: 0.2rem;
}

.ethics-checkbox {
  background: #ffffff;
  border: 2px solid #e2e8f0;
  padding: 1rem;
  border-radius: 16px;
  transition: all 0.2s ease;
}

.ethics-checkbox.active {
  border-color: #6366f1;
  background: rgba(99, 102, 241, 0.05);
}

.ethics-checkbox label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 700;
}

.ethics-checkbox input {
  width: 18px;
  height: 18px;
  accent-color: #6366f1;
}

/* BLOC DROITE */
.auth-card {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 24px;
  padding: 2.25rem;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.progress-bar-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: #e2e8f0;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #6366f1, #d946ef);
  transition: width 0.3s ease;
}

.step-tag {
  font-size: 0.75rem;
  font-weight: 800;
  color: #6366f1;
  text-transform: uppercase;
}

.step-wrapper h2 {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 0.3rem 0;
}

.sub-title {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.profile-cards {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.card-option {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #ffffff;
  border: 2px solid #f1f5f9;
  border-radius: 16px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.card-option:hover {
  border-color: #818cf8;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.15);
}

.option-icon {
  font-size: 1.4rem;
  background: #e0e7ff;
  width: 46px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-shrink: 0;
}

.option-text strong {
  display: block;
  font-size: 0.95rem;
  color: #0f172a;
}

.option-text span {
  font-size: 0.825rem;
  color: #64748b;
}

.header-step {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.btn-back {
  background: #f1f5f9;
  border: none;
  color: #4f46e5;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
}

.section-title {
  font-size: 0.8rem;
  font-weight: 800;
  color: #64748b;
  text-transform: uppercase;
  margin: 1.25rem 0 0.75rem 0;
}

.section-title.highlight {
  color: #4f46e5;
  border-top: 2px dashed #e2e8f0;
  padding-top: 1rem;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.85rem;
}

@media (max-width: 500px) {
  .grid-2 { grid-template-columns: 1fr; }
}

.form-group {
  margin-bottom: 0.85rem;
}

.password-group {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.label-sm {
  display: block;
  font-size: 0.775rem;
  font-weight: 700;
  color: #475569;
  margin-bottom: 0.3rem;
}

.input {
  width: 100%;
  padding: 0.8rem 1rem;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.input:focus {
  outline: none;
  background: #ffffff;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.btn-submit {
  width: 100%;
  padding: 0.95rem;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1.25rem;
  transition: all 0.2s ease;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.4);
}

.btn-submit:disabled {
  background: #cbd5e1;
  cursor: not-allowed;
}

.warn-ethics {
  font-size: 0.825rem;
  color: #d97706;
  font-weight: 600;
  margin-top: 0.5rem;
  text-align: center;
}

.error-msg {
  color: #dc2626;
  background: #fef2f2;
  border: 1px solid #fecaca;
  padding: 0.75rem;
  border-radius: 10px;
  font-size: 0.85rem;
  margin-top: 1rem;
  text-align: center;
}

.footer-link {
  margin-top: 1.25rem;
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;
}

.footer-link a {
  color: #6366f1;
  font-weight: 700;
  text-decoration: none;
}
</style>