<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// Import des composants réutilisables
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const route = useRoute();

// On masque Header et Footer uniquement si on est dans le Dashboard
const isDashboard = computed(() => route.path.startsWith('/dashboard'));
</script>

<template>
  <div id="app-container">
    <Header v-if="!isDashboard" />

    <main class="main-content">
      <router-view />
    </main>

    <Footer v-if="!isDashboard" />
  </div>
</template>

<style>
/* Style global pour garder le Footer collé en bas de page */
#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: system-ui, sans-serif;
  margin: 0;
}

body {
  margin: 0;
  background-color: #f8fafc;
}

.main-content {
  flex: 1; /* Pousse le footer tout en bas */
}
</style>