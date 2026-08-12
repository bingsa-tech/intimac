<script setup lang="ts">
import { ref } from 'vue';

const currentPlan = ref('PRO');

const selectPlan = (planName: string) => {
  alert(`Demande de passage au plan ${planName} enregistrée.`);
  currentPlan.value = planName;
};
</script>

<template>
  <div>
    <h1>💳 Mon Abonnement</h1>
    <p>Choisissez la formule adaptée à vos besoins d'accompagnement et d'admission.</p>

    <div class="pricing-grid">
      <!-- PLAN GRATUIT -->
      <div class="plan-card" :class="{ active: currentPlan === 'FREE' }">
        <h3>GRATUIT</h3>
        <p class="price">$0 <span>/ mois</span></p>
        <ul>
          <li>✅ Consultation des programmes</li>
          <li>✅ 1 test de matching par mois</li>
          <li>❌ Support prioritaire</li>
        </ul>
        <button @click="selectPlan('FREE')" class="btn-plan">
          {{ currentPlan === 'FREE' ? 'Plan Actuel' : 'Choisir' }}
        </button>
      </div>

      <!-- PLAN PRO -->
      <div class="plan-card featured" :class="{ active: currentPlan === 'PRO' }">
        <div class="badge">Populaire</div>
        <h3>PRO</h3>
        <p class="price">$15 <span>/ mois</span></p>
        <ul>
          <li>✅ Matchings illimités</li>
          <li>✅ Dépot jusqu'à 5 candidatures</li>
          <li>✅ Gestion des documents PDF</li>
        </ul>
        <button @click="selectPlan('PRO')" class="btn-plan btn-featured">
          {{ currentPlan === 'PRO' ? 'Plan Actuel' : 'Passer au PRO' }}
        </button>
      </div>

      <!-- PLAN PREMIUM -->
      <div class="plan-card" :class="{ active: currentPlan === 'PREMIUM' }">
        <h3>PREMIUM</h3>
        <p class="price">$50 <span>/ mois</span></p>
        <ul>
          <li>✅ Tout le plan PRO</li>
          <li>✅ Accompagnement Visa & Immigration</li>
          <li>✅ Rendez-vous avec un conseiller</li>
        </ul>
        <button @click="selectPlan('PREMIUM')" class="btn-plan">
          {{ currentPlan === 'PREMIUM' ? 'Plan Actuel' : 'Passer au PREMIUM' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.5rem; margin-top: 2rem; }
.plan-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; position: relative; display: flex; flex-direction: column; justify: space-between; }
.plan-card.active { border-color: #2563eb; ring: 2px solid #2563eb; }
.plan-card.featured { border: 2px solid #2563eb; }
.badge { position: absolute; top: -12px; right: 1rem; background: #2563eb; color: white; padding: 0.2rem 0.6rem; border-radius: 999px; font-size: 0.75rem; font-weight: bold; }
.price { font-size: 2rem; font-weight: bold; margin: 0.5rem 0 1rem; }
.price span { font-size: 0.9rem; font-weight: normal; color: #64748b; }
ul { list-style: none; padding: 0; margin-bottom: 1.5rem; }
li { margin-bottom: 0.5rem; font-size: 0.9rem; color: #334155; }
.btn-plan { padding: 0.6rem; border-radius: 4px; border: 1px solid #cbd5e1; background: #f8fafc; cursor: pointer; font-weight: bold; }
.btn-featured { background: #2563eb; color: white; border: none; }
</style>