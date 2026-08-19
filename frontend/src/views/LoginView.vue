<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const email = ref('student@test.com');
const password = ref('StudentPass123!');
const showPassword = ref(false);
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
  <div class="page-wrapper">
    <div class="login-container">
      
      <!-- BLOC GAUCHE : SÉCURITÉ & VIE PRIVÉE -->
      <div class="ethics-card">
        <div>
          <span class="badge">Sécurité & Confidentialité</span>
          <h2>🛡️ Protections de vos données</h2>
          <p class="ethics-intro">
            La protection de vos données personnelles et le respect de votre vie privée sont au cœur de nos priorités.
          </p>

          <ul class="ethics-list">
            <li>
              <span class="icon">🔒</span>
              <div>
                <strong>Protection de vos Données</strong>
                <p>Vos informations personnelles et votre historique sont strictement confidentiels et chiffrés.</p>
              </div>
            </li>
            <li>
              <span class="icon">🤝</span>
              <div>
                <strong>Respect de la Vie Privée</strong>
                <p>Aucune donnée privée ne sera partagée à des tiers sans votre consentement explicite.</p>
              </div>
            </li>
            <li>
              <span class="icon">🔑</span>
              <div>
                <strong>Vigilance Identifiants</strong>
                <p>Ne partagez jamais votre mot de passe. L'administration ne vous le demandera jamais.</p>
              </div>
            </li>
            <li>
              <span class="icon">⚡</span>
              <div>
                <strong>Coparticipation à la Sécurité</strong>
                <p>Pensez à vous déconnecter sur un poste public et choisissez un mot de passe fort.</p>
              </div>
            </li>
          </ul>
        </div>

        <div class="security-note">
          <p>💡 <em>Ensemble, préservons un environnement d'échange sain et sécurisé pour toute la communauté.</em></p>
        </div>
      </div>

      <!-- BLOC DROITE : FORMULAIRE DE CONNEXION -->
      <div class="auth-card">
        <div class="step-wrapper">
          <span class="step-tag">Bon retour parmi nous</span>
          <h2>Connexion</h2>
          <p class="sub-title">Accédez à votre espace sécurisé en saisissant vos identifiants.</p>

          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label class="label-sm">Adresse Email</label>
              <input 
                v-model="email" 
                type="email" 
                placeholder="Ex: nom@exemple.com" 
                class="input" 
                required 
              />
            </div>

            <div class="form-group password-group">
              <label class="label-sm">Mot de passe</label>
              <div class="password-input-wrapper">
                <input 
                  v-model="password" 
                  :type="showPassword ? 'text' : 'password'" 
                  placeholder="••••••••" 
                  class="input" 
                  required 
                />
                <button 
                  type="button" 
                  class="toggle-password" 
                  @click="showPassword = !showPassword"
                >
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <button type="submit" :disabled="loading" class="btn-submit">
              {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
            </button>
          </form>

          <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

          <p class="footer-link">
            Pas encore inscrit ? <router-link to="/register">Créer un compte</router-link>
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

/* PAGE CONTAINER */
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

.login-container {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 2rem;
  width: 100%;
  max-width: 1050px;
}

@media (max-width: 900px) {
  .login-container {
    grid-template-columns: 1fr;
  }
}

/* BLOC GAUCHE - SÉCURITÉ */
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
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
  line-height: 1.4;
}

.security-note {
  background: rgba(99, 102, 241, 0.05);
  border: 1px dashed #a5b4fc;
  padding: 0.85rem 1rem;
  border-radius: 14px;
  font-size: 0.825rem;
  color: #4338ca;
}

/* BLOC DROITE - AUTHENTIFICATION */
.auth-card {
  position: relative;
  background: #ffffff;
  border: 1px solid rgba(226, 232, 240, 0.9);
  border-radius: 24px;
  padding: 2.25rem;
  box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.step-tag {
  font-size: 0.75rem;
  font-weight: 800;
  color: #6366f1;
  text-transform: uppercase;
}

.step-wrapper h2 {
  font-size: 1.6rem;
  font-weight: 800;
  margin: 0.3rem 0;
}

.sub-title {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.1rem;
}

.label-sm {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: #475569;
  margin-bottom: 0.35rem;
}

.input {
  width: 100%;
  padding: 0.85rem 1rem;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-radius: 12px;
  font-size: 0.9rem;
  box-sizing: border-box;
  transition: all 0.2s ease;
}

.input:focus {
  outline: none;
  background: #ffffff;
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.password-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.toggle-password {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.toggle-password:hover {
  opacity: 1;
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
  margin-top: 1rem;
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
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #64748b;
}

.footer-link a {
  color: #6366f1;
  font-weight: 700;
  text-decoration: none;
}

.footer-link a:hover {
  text-decoration: underline;
}
</style>