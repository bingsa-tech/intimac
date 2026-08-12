<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const isMenuOpen = ref(false);
const router = useRouter();
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
const closeMenu = () => {
  isMenuOpen.value = false;
};
</script>

<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- BRAND LOGO -->
      <router-link to="/" class="brand-logo" @click="closeMenu">
        <span class="logo-icon">🎓</span>
        <span class="logo-text">Portail <span class="highlight">Études & Immigration</span></span>
      </router-link>
      <!-- NAVIGATION DESKTOP -->
      <nav class="nav-links" :class="{ 'is-active': isMenuOpen }">
        <router-link to="/" class="nav-item" @click="closeMenu">Accueil</router-link>
        <router-link to="/#services" class="nav-item" @click="closeMenu">Nos Services</router-link>
        <router-link to="/#scholarships" class="nav-item" @click="closeMenu">Bourses</router-link>
        <router-link to="/#news" class="nav-item" @click="closeMenu">Actualités</router-link>
        <router-link to="/#contact" class="nav-item" @click="closeMenu">Contact</router-link>
        <!-- BOUTONS MOBILE SEULEMENT -->
        <div class="mobile-actions">
          <router-link to="/login" class="btn btn-login" @click="closeMenu">Connexion</router-link>
          <router-link to="/register" class="btn btn-register" @click="closeMenu">S'inscrire</router-link>
        </div>
      </nav>
      <!-- BOUTONS ACTION DESKTOP -->
      <div class="navbar-actions">
        <router-link to="/login" class="btn btn-login">Connexion</router-link>
        <router-link to="/register" class="btn btn-register">
          <span>S'inscrire</span>
        </router-link>
      </div>
      <!-- BURGER MENU MOBILE -->
      <button class="burger-btn" @click="toggleMenu" aria-label="Menu mobile">
        <span class="burger-line" :class="{ 'open': isMenuOpen }"></span>
        <span class="burger-line" :class="{ 'open': isMenuOpen }"></span>
        <span class="burger-line" :class="{ 'open': isMenuOpen }"></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid #E2E8F0;
  transition: all 0.3s ease;
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.85rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* BRAND LOGO */
.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 1.35rem;
  font-weight: 800;
  color: #0F172A;
  letter-spacing: -0.02em;
}

.logo-icon {
  font-size: 1.5rem;
}

.brand-logo .highlight {
  color: #2563EB;
}

/* NAVIGATION LINKS */
.nav-links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.nav-item {
  text-decoration: none;
  color: #475569;
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: #2563EB;
}

.mobile-actions {
  display: none;
}

/* ACTION BUTTONS */
.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.25rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.2s ease;
}

.btn-login {
  color: #334155;
  background-color: transparent;
}

.btn-login:hover {
  color: #2563EB;
  background-color: #F1F5F9;
}

.btn-register {
  background-color: #2563EB;
  color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.btn-register:hover {
  background-color: #1D4ED8;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(37, 99, 235, 0.3);
}

/* BURGER BUTTON */
.burger-btn {
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 28px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
}

.burger-line {
  width: 100%;
  height: 3px;
  background-color: #0F172A;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* RESPONSIVE DESIGN */
@media (max-width: 768px) {
  .navbar-actions {
    display: none;
  }

  .burger-btn {
    display: flex;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #FFFFFF;
    border-bottom: 1px solid #E2E8F0;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1.25rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
    display: none;
  }

  .nav-links.is-active {
    display: flex;
  }

  .mobile-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    margin-top: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid #F1F5F9;
  }

  .mobile-actions .btn {
    width: 100%;
  }
}
</style>