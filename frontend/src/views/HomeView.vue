<script setup lang="ts">
// IMPORTS OBLIGATOIRES DES SOUS-COMPOSANTS
import HeroSection from '../components/homepage/HeroSection.vue';
import ServiceSection from '../components/homepage/ServiceSection.vue';
import MethodServiceSection from '../components/homepage/MethodServiceSection.vue';
import BourseSection from '../components/homepage/BourseSection.vue';
import ActualitesSection from '../components/homepage/ActualitesSection.vue';
import ContactSection from '../components/homepage/ContactSection.vue';

</script>

<template>
  <main class="home-view">
    <HeroSection />
    <ServiceSection />
    <MethodServiceSection />
    <BourseSection />
    <ActualitesSection />
    <ContactSection />
  </main>
</template>

<style scoped>
/* Conteneur principal gérant  */
.home-view {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  background-color: #f8fafc;
  padding-bottom: 2rem;
}

</style>