<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();

// Champs Utilisateur
const role = ref('STUDENT');
const email = ref('');
const password = ref('');

// Champs Profil
const firstName = ref('');
const lastName = ref('');
const birthDate = ref('2000-01-01');
const gender = ref('MALE');
const nationality = ref('');
const country = ref('');

// Validation de la Charte Éthique
const acceptedEthics = ref(false);

const errorMessage = ref('');
const loading = ref(false);

const register = async () => {
  // Sécurité supplémentaire si l'utilisateur essaie de soumettre sans cocher
  if (!acceptedEthics.value) {
    errorMessage.value = "Vous devez lire et accepter la charte d'éthique pour vous inscrire.";
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    const payload = {
      role: role.value,
      email: email.value,
      password: password.value,
      firstName: firstName.value,
      lastName: lastName.value,
      birthDate: birthDate.value,
      gender: gender.value,
      nationality: nationality.value,
      country: country.value,
    };

    await api.post('/auth/register', payload);
    alert('✅ Compte créé avec succès ! Veuillez vous connecter.');
    router.push('/login');
  } catch (err: any) {
    console.error('Erreur inscription :', err.response?.data);
    const msg = err.response?.data?.message;
    errorMessage.value = Array.isArray(msg) ? msg.join(', ') : msg || 'Erreur lors de l’inscription';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="register-container">
    <!-- BLOC GAUCHE : CHARTE ÉTHIQUE & RÈGLES -->
    <div class="ethics-box">
      <h2>     📜       Code d'Éthique & Engagements</h2>
      <p class="ethics-intro">
        En rejoignant la plateforme, vous vous engagez à respecter les règles fondamentales de notre communauté :
      </p>

      <ul class="ethics-list">
        <li>
          <strong>1. Respect & Courtoisie :</strong>
          Faire preuve de bienveillance lors des échanges avec les conseillers et les intervenants.
        </li>
        <li>
          <strong>2. Exactitude des Informations :</strong>
          Fournir des renseignements véridiques concernant votre identité, votre parcours académique et votre statut.
        </li>
        <li>
          <strong>3. Ponctualité aux RDV :</strong>
          Honorer les rendez-vous réservés ou les annuler au moins 24h à l'avance pour ne pas bloquer les créneaux.
        </li>
        <li>
          <strong>4. Confidentialité :</strong>
          Respecter la confidentialité des documents et informations partagés sur la plateforme.
        </li>
        <li>
          <strong>5. Usage Approprié :</strong>
          Ne pas utiliser la plateforme à des fins de prospection non sollicitée ou de diffusion de contenus inappropriés.
        </li>
        <li>
          <strong>6. Visiteur permanent :</strong>
          Vous pouvez continuer à explorer notre plateforme en tout temps pour vous informer, découvrir de nouvelles opportunités et rester à jour grâce à nos mises à jour en temps réel.
        </li>
      </ul>

      <div class="ethics-checkbox">
        <label>
          <input type="checkbox" v-model="acceptedEthics" />
          <span>J'ai lu et j'accepte de respecter la charte d'éthique du service.</span>
        </label>
      </div>
    </div>

    <!-- BLOC DROITE : FORMULAIRE D'INSCRIPTION -->
    <div class="auth-box">
      <h2>Créer un compte</h2>

      <!-- RÔLE -->
      <div class="role-selector">
        <label>
          <input type="radio" value="STUDENT" v-model="role" /> Étudiant
        </label>
        <label>
          <input type="radio" value="PROFESSIONAL" v-model="role" /> Professionnel
        </label>
      </div>

      <!-- INFORMATIONS DE CONNEXION -->
      <h3>Identifiants</h3>
      <input v-model="email" type="email" placeholder="Adresse Email" class="input" required />
      <input v-model="password" type="password" placeholder="Mot de passe" class="input" required />

      <!-- INFORMATIONS DU PROFIL -->
      <h3>Profil Personnel</h3>
      <div class="grid-2">
        <input v-model="firstName" placeholder="Prénom" class="input" required />
        <input v-model="lastName" placeholder="Nom" class="input" required />
      </div>

      <div class="grid-2">
        <div>
          <label style="font-size: 0.8rem; font-weight: bold;">Date de naissance :</label>
          <input v-model="birthDate" type="date" class="input" required />
        </div>
        <div>
          <label style="font-size: 0.8rem; font-weight: bold;">Genre :</label>
          <select v-model="gender" class="input">
            <option value="MALE">Homme</option>
            <option value="FEMALE">Femme</option>
            <option value="OTHER">Autre</option>
          </select>
        </div>
      </div>

      <div class="grid-2">
        <input v-model="nationality" placeholder="Nationalité (ex: Canadienne)" class="input" required />
        <input v-model="country" placeholder="Pays de résidence (ex: Canada)" class="input" required />
      </div>

      <button 
        @click="register" 
        :disabled="loading || !acceptedEthics" 
        class="btn-submit"
      >
        {{ loading ? 'Inscription en cours...' : 'S\'inscrire' }}
      </button>

      <p v-if="!acceptedEthics" class="warn-ethics">
        ⚠️ Cochez la charte d'éthique à gauche pour débloquer le bouton.
      </p>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <p style="margin-top: 1rem; text-align: center;">
        Déjà un compte ? <router-link to="/login">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>

.register-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1100px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}

@media (max-width: 768px) {
  .register-container {
    grid-template-columns: 1fr;
  }
}

.ethics-box {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ethics-box h2 {
  margin-top: 0;
  color: #1e293b;
  font-size: 1.25rem;
}

.ethics-intro {
  font-size: 0.9rem;
  color: #475569;
}

.ethics-list {
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
  font-size: 0.88rem;
  color: #334155;
}

.ethics-list li {
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.ethics-checkbox {
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 0.8rem;
  border-radius: 6px;
  margin-top: 1rem;
}

.ethics-checkbox label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-weight: 600;
  font-size: 0.85rem;
  color: #1e40af;
  cursor: pointer;
}

/* --- LE FORMULAIRE --- */
.auth-box {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1.5rem;
}

.auth-box h2 {
  margin-top: 0;
}

.role-selector {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.input {
  width: 100%;
  padding: 0.6rem;
  margin-bottom: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-submit {
  width: 100%;
  padding: 0.75rem;
  background: #2563eb;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 1rem;
}

.btn-submit:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.warn-ethics {
  font-size: 0.8rem;
  color: #d97706;
  margin-top: 0.4rem;
  text-align: center;
}

.error {
  color: #dc2626;
  margin-top: 1rem;
  background: #fee2e2;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}
</style>