<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const email = ref('student@test.com');
const password = ref('StudentPass123!');
const errorMessage = ref('');
const loading = ref(false);

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Veuillez remplir tous les champs.';
    return;
  }

  loading.value = true;
  errorMessage.value = '';

  try {
    const res = await api.post('/auth/login', { 
      email: email.value, 
      password: password.value 
    });

    const token = res.data.access_token || res.data.accessToken;
    const user = res.data.user;

    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    const userRole = user?.role?.toUpperCase();

    if (userRole === 'ADMIN') {
      router.push('/admin');
    } else if (userRole === 'ADVISOR') {
      router.push('/advisor/dashboard');
    } else {
      router.push('/dashboard');
    }
  } catch (err: any) {
    console.error('Erreur de connexion:', err);
    errorMessage.value = err.response?.data?.message || 'Identifiants invalides';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <!-- BLOC GAUCHE : SÉCURITÉ & VIE PRIVÉE -->
    <div class="security-box">
      <h2>🛡️ Confidentialité & Sécurité</h2>
      <p class="security-intro">
        La protection de vos données personnelles et le respect de votre vie privée sont au cœur de nos priorités.
      </p>

      <ul class="security-list">
        <li>
          <strong> Protection de vos Données :</strong>
          Vos informations personnelles et historiques de rendez-vous sont strictement confidentiels et chiffrés.
        </li>
        <li>
          <strong> Respect de la Vie Privée :</strong>
          Aucune de vos données privées ne sera vendue ou partagée à des tiers sans votre consentement explicite.
        </li>
        <li>
          <strong> Vigilance sur vos Identifiants :</strong>
          Ne partagez jamais votre mot de passe. L'administration ne vous demandera jamais votre code d'accès.
        </li>
        <li>
          <strong> Coparticipation à la Sécurité :</strong>
          Votre prudence (déconnexion sur poste public, choix d'un mot de passe fort) participe directement à la sécurisation globale de notre plateforme.
        </li>
      </ul>

      <div class="security-note">
        <p>💡 <em>Ensemble, préservons un environnement d'échange sain et sécurisé pour toute la communauté.</em></p>
      </div>
    </div>

    <!-- BLOC DROITE : FORMULAIRE DE CONNEXION -->
    <div class="auth-box">
      <h2>Espace Authentification</h2>
      
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input 
            v-model="email" 
            type="email" 
            placeholder="Adresse Email" 
            class="input" 
            required 
          />
        </div>

        <div class="form-group">
          <input 
            v-model="password" 
            type="password" 
            placeholder="Mot de passe" 
            class="input" 
            required 
          />
        </div>

        <button type="submit" :disabled="loading" class="btn-submit">
          {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>
      </form>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <p class="register-link">
        Pas encore inscrit ? <router-link to="/register">Créer un compte</router-link>
      </p>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 950px;
  margin: 3rem auto;
  padding: 1rem;
  font-family: system-ui, sans-serif;
}

@media (max-width: 768px) {
  .login-container {
    grid-template-columns: 1fr;
  }
}

/* --- LE BLOC SÉCURITÉ --- */
.security-box {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.security-box h2 {
  margin-top: 0;
  color: #0f172a;
  font-size: 1.25rem;
}

.security-intro {
  font-size: 0.9rem;
  color: #475569;
}

.security-list {
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
  font-size: 0.88rem;
  color: #334155;
}

.security-list li {
  margin-bottom: 0.8rem;
  line-height: 1.4;
}

.security-note {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  padding: 0.8rem;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #166534;
}

/* --- LE FORMULAIRE --- */
.auth-box { 
  background: white;
  border: 1px solid #e2e8f0; 
  border-radius: 8px; 
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.auth-box h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 1rem;
}

.input { 
  width: 100%; 
  padding: 0.75rem; 
  border: 1px solid #cbd5e1; 
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
  transition: background-color 0.2s ease;
}

.btn-submit:hover:not(:disabled) {
  background: #1d4ed8;
}

.btn-submit:disabled {
  background: #93c5fd;
  cursor: not-allowed;
}

.error { 
  color: #dc2626; 
  margin-top: 1rem; 
  font-weight: 500;
  text-align: center;
}

.register-link {
  margin-top: 1.5rem;
  text-align: center;
}
</style>