<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import api from '../../services/api';

// --- ONGLET ACTIF ---
const activeTab = ref<'countries' | 'provinces' | 'cities' | 'universities' | 'programs' | 'scholarships'>('countries');
const loading = ref(false);
const message = ref('');

// --- DONNÉES STOCKÉES ---
const countries = ref<any[]>([]);
const provinces = ref<any[]>([]);
const cities = ref<any[]>([]);
const universities = ref<any[]>([]);
const programs = ref<any[]>([]);

// --- FORMULAIRES ---
const countryForm = ref({ name: '', code: '' });
const provinceForm = ref({ name: '', countryId: '' });
const cityForm = ref({ name: '', provinceId: '' });

const universityForm = ref({
  name: '',
  countryId: '',
  provinceId: '',
  cityId: '',
  website: '',
  ranking: null as number | null,
  description: '',
  logo: '',
});

const programForm = ref({
  title: '',
  degree: 'BACHELOR',
  duration: 3,
  tuition: 0,
  minimumGpa: 3.0,
  description: '',
  universityId: '',
  languages: 'Français, Anglais',
});

const scholarshipForm = ref({
  title: '',
  description: '',
  amount: null as number | null,
  coverageType: 'FULL',
  deadline: '',
  countryId: '',
  universityId: '',
  link: '',
});

// --- LISTES FILTRÉES EN CASCADE ---
const filteredProvincesForUni = computed(() => {
  if (!universityForm.value.countryId) return [];
  return provinces.value.filter((p) => p.countryId === universityForm.value.countryId);
});

const filteredCitiesForUni = computed(() => {
  if (!universityForm.value.provinceId) return [];
  return cities.value.filter((c) => c.provinceId === universityForm.value.provinceId);
});

// --- CHARGEMENT UNIQUE DE TOUTES LES DONNÉES ---
const loadData = async () => {
  try {
    const [resCountries, resProvinces, resCities, resUnis, resPrograms] = await Promise.all([
      api.get('/countries').catch(() => ({ data: [] })),
      api.get('/provinces').catch(() => ({ data: [] })),
      api.get('/cities').catch(() => ({ data: [] })),
      api.get('/universities').catch(() => ({ data: [] })),
      api.get('/programs').catch(() => ({ data: [] })),
    ]);

    countries.value = resCountries.data;
    provinces.value = resProvinces.data;
    cities.value = resCities.data;
    universities.value = resUnis.data;
    programs.value = resPrograms.data;
  } catch (err) {
    console.error('Erreur chargement des données admin:', err);
  }
};

// --- SOUMISSIONS ---

// 1. Pays
const submitCountry = async () => {
  loading.value = true;
  message.value = '';
  try {
    const payload: any = { name: countryForm.value.name };
    if (countryForm.value.code?.trim()) payload.code = countryForm.value.code.trim();

    await api.post('/countries', payload);
    message.value = 'Pays ajouté avec succès !';
    countryForm.value = { name: '', code: '' };
    await loadData();
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Erreur lors de la création du pays.';
  } finally {
    loading.value = false;
  }
};

// 2. Province
const submitProvince = async () => {
  loading.value = true;
  message.value = '';
  try {
    await api.post('/provinces', provinceForm.value);
    message.value = 'Province ajoutée avec succès !';
    provinceForm.value = { name: '', countryId: '' };
    await loadData();
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Erreur lors de la création de la province.';
  } finally {
    loading.value = false;
  }
};

// 3. Ville
const submitCity = async () => {
  loading.value = true;
  message.value = '';
  try {
    await api.post('/cities', cityForm.value);
    message.value = 'Ville ajoutée avec succès !';
    cityForm.value = { name: '', provinceId: '' };
    await loadData();
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Erreur lors de la création de la ville.';
  } finally {
    loading.value = false;
  }
};

// 4. Université
const submitUniversity = async () => {
  loading.value = true;
  message.value = '';
  try {
    const payload: any = {
      name: universityForm.value.name,
      countryId: universityForm.value.countryId,
    };

    if (universityForm.value.provinceId) payload.provinceId = universityForm.value.provinceId;
    if (universityForm.value.cityId) payload.cityId = universityForm.value.cityId;
    if (universityForm.value.website?.trim()) payload.website = universityForm.value.website.trim();
    if (universityForm.value.ranking) payload.ranking = Number(universityForm.value.ranking);
    if (universityForm.value.description?.trim()) payload.description = universityForm.value.description.trim();
    if (universityForm.value.logo?.trim()) payload.logo = universityForm.value.logo.trim();

    await api.post('/universities', payload);
    message.value = 'Université ajoutée avec succès !';
    universityForm.value = {
      name: '',
      countryId: '',
      provinceId: '',
      cityId: '',
      website: '',
      ranking: null,
      description: '',
      logo: '',
    };
    await loadData();
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Erreur lors de la création de l\'université.';
  } finally {
    loading.value = false;
  }
};

// 5. Programme
const submitProgram = async () => {
  loading.value = true;
  message.value = '';
  try {
    const languagesArray = programForm.value.languages
      .split(',')
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const payload = {
      ...programForm.value,
      duration: Number(programForm.value.duration),
      tuition: Number(programForm.value.tuition),
      minimumGpa: programForm.value.minimumGpa ? Number(programForm.value.minimumGpa) : null,
      languages: languagesArray,
    };

    await api.post('/programs', payload);
    message.value = 'Programme d\'études ajouté avec succès !';
    programForm.value = {
      title: '',
      degree: 'BACHELOR',
      duration: 3,
      tuition: 0,
      minimumGpa: 3.0,
      description: '',
      universityId: '',
      languages: 'Français, Anglais',
    };
    await loadData();
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Erreur lors de la création du programme.';
  } finally {
    loading.value = false;
  }
};

// 6. Bourse
const submitScholarship = async () => {
  loading.value = true;
  message.value = '';
  try {
    const payload: any = {
      title: scholarshipForm.value.title,
      description: scholarshipForm.value.description,
      coverageType: scholarshipForm.value.coverageType,
      deadline: scholarshipForm.value.deadline,
      countryId: scholarshipForm.value.countryId,
    };

    if (scholarshipForm.value.amount) payload.amount = Number(scholarshipForm.value.amount);
    if (scholarshipForm.value.universityId) payload.universityId = scholarshipForm.value.universityId;
    if (scholarshipForm.value.link?.trim()) payload.link = scholarshipForm.value.link.trim();

    await api.post('/scholarships', payload);
    message.value = 'Bourse ajoutée avec succès !';
    
    scholarshipForm.value = {
      title: '',
      description: '',
      amount: null,
      coverageType: 'FULL',
      deadline: '',
      countryId: '',
      universityId: '',
      link: '',
    };
    await loadData();
  } catch (err: any) {
    message.value = err.response?.data?.message || 'Erreur lors de la création de la bourse.';
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  loadData();
});
</script>

<template>
  <div class="admin-management">
    <h1>⚙️ Administration des Entités Académiques</h1>

    <!-- BARRE D'ONGLETS -->
    <div class="tabs">
      <button :class="{ active: activeTab === 'countries' }" @click="activeTab = 'countries'">🌍 Pays</button>
      <button :class="{ active: activeTab === 'provinces' }" @click="activeTab = 'provinces'">📍 Provinces</button>
      <button :class="{ active: activeTab === 'cities' }" @click="activeTab = 'cities'">🏙️ Villes</button>
      <button :class="{ active: activeTab === 'universities' }" @click="activeTab = 'universities'">🏛️ Universités</button>
      <button :class="{ active: activeTab === 'programs' }" @click="activeTab = 'programs'">🎓 Programmes</button>
      <button :class="{ active: activeTab === 'scholarships' }" @click="activeTab = 'scholarships'">💰 Bourses</button>
    </div>

    <p v-if="message" class="alert">{{ message }}</p>

    <!-- 1. PAYS -->
    <div v-if="activeTab === 'countries'" class="card">
      <h2>Créer un Pays</h2>
      <form @submit.prevent="submitCountry">
        <div class="form-group">
          <label>Nom du Pays :</label>
          <input v-model="countryForm.name" type="text" placeholder="Ex: Canada" class="input" required />
        </div>
        <div class="form-group">
          <label>Code ISO (Optionnel) :</label>
          <input v-model="countryForm.code" type="text" placeholder="Ex: CA" class="input" />
        </div>
        <button type="submit" :disabled="loading" class="btn-primary">
          {{ loading ? 'Enregistrement...' : 'Ajouter le Pays' }}
        </button>
      </form>
    </div>

    <!-- 2. PROVINCE -->
    <div v-if="activeTab === 'provinces'" class="card">
      <h2>Créer une Province / Région</h2>
      <form @submit.prevent="submitProvince">
        <div class="form-group">
          <label>Pays rattaché :</label>
          <select v-model="provinceForm.countryId" class="input" required>
            <option value="" disabled>Sélectionner un pays</option>
            <option v-for="c in countries" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Nom de la Province / État :</label>
          <input v-model="provinceForm.name" type="text" placeholder="Ex: Québec" class="input" required />
        </div>
        <button type="submit" :disabled="loading || !provinceForm.countryId" class="btn-primary">
          {{ loading ? 'Enregistrement...' : 'Ajouter la Province' }}
        </button>
      </form>
    </div>

    <!-- 3. VILLE -->
    <div v-if="activeTab === 'cities'" class="card">
      <h2>Créer une Ville</h2>
      <form @submit.prevent="submitCity">
        <div class="form-group">
          <label>Province rattachée :</label>
          <select v-model="cityForm.provinceId" class="input" required>
            <option value="" disabled>Sélectionner une province</option>
            <option v-for="p in provinces" :key="p.id" :value="p.id">
              {{ p.name }} ({{ p.country?.name || 'Pays' }})
            </option>
          </select>
        </div>
        <div class="form-group">
          <label>Nom de la Ville :</label>
          <input v-model="cityForm.name" type="text" placeholder="Ex: Montréal" class="input" required />
        </div>
        <button type="submit" :disabled="loading || !cityForm.provinceId" class="btn-primary">
          {{ loading ? 'Enregistrement...' : 'Ajouter la Ville' }}
        </button>
      </form>
    </div>

    <!-- 4. UNIVERSITÉ -->
    <div v-if="activeTab === 'universities'" class="card">
      <h2>Créer une Université</h2>
      <form @submit.prevent="submitUniversity">
        <div class="form-group">
          <label>Nom de l'Université :</label>
          <input v-model="universityForm.name" type="text" placeholder="Ex: Université de Montréal" class="input" required />
        </div>

        <div class="grid-3">
          <div class="form-group">
            <label>Pays :</label>
            <select v-model="universityForm.countryId" class="input" required @change="universityForm.provinceId = ''; universityForm.cityId = '';">
              <option value="" disabled>Sélectionner un pays</option>
              <option v-for="c in countries" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Province (Optionnel) :</label>
            <select v-model="universityForm.provinceId" class="input" :disabled="!universityForm.countryId" @change="universityForm.cityId = '';">
              <option value="">Aucune / Non spécifiée</option>
              <option v-for="p in filteredProvincesForUni" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Ville (Optionnel) :</label>
            <select v-model="universityForm.cityId" class="input" :disabled="!universityForm.provinceId">
              <option value="">Aucune / Non spécifiée</option>
              <option v-for="c in filteredCitiesForUni" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Site Web (Optionnel) :</label>
            <input v-model="universityForm.website" type="url" placeholder="https://www.umontreal.ca" class="input" />
          </div>

          <div class="form-group">
            <label>Classement / Ranking (Optionnel) :</label>
            <input v-model.number="universityForm.ranking" type="number" min="1" placeholder="Ex: 116" class="input" />
          </div>
        </div>

        <div class="form-group">
          <label>URL du Logo (Optionnel) :</label>
          <input v-model="universityForm.logo" type="text" placeholder="https://exemple.com/logo.png" class="input" />
        </div>

        <div class="form-group">
          <label>Description :</label>
          <textarea v-model="universityForm.description" class="input" rows="3" placeholder="Présentation de l'établissement..."></textarea>
        </div>

        <button type="submit" :disabled="loading || !universityForm.countryId" class="btn-primary">
          {{ loading ? 'Enregistrement...' : 'Créer l\'Université' }}
        </button>
      </form>
    </div>

    <!-- 5. PROGRAMME -->
    <div v-if="activeTab === 'programs'" class="card">
      <h2>Créer un Programme d'Études</h2>
      <form @submit.prevent="submitProgram">
        <div class="form-group">
          <label>Université d'accueil :</label>
          <select v-model="programForm.universityId" class="input" required>
            <option value="" disabled>Sélectionner une université</option>
            <option v-for="u in universities" :key="u.id" :value="u.id">{{ u.name }}</option>
          </select>
        </div>

        <div class="form-group">
          <label>Titre du Programme :</label>
          <input v-model="programForm.title" type="text" placeholder="Ex: Baccalauréat en Informatique" class="input" required />
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Niveau de diplôme :</label>
            <select v-model="programForm.degree" class="input" required>
              <option value="BACHELOR">Baccalauréat / Licence</option>
              <option value="MASTER">Maîtrise / Master</option>
              <option value="DOCTORATE">Doctorat / PhD</option>
              <option value="DIPLOMA">DEC / Certificat</option>
            </select>
          </div>

          <div class="form-group">
            <label>Durée (années) :</label>
            <input v-model.number="programForm.duration" type="number" min="1" class="input" required />
          </div>
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Frais de scolarité ($/an) :</label>
            <input v-model.number="programForm.tuition" type="number" step="0.01" class="input" required />
          </div>

          <div class="form-group">
            <label>GPA Minimum requis (sur 4.0) :</label>
            <input v-model.number="programForm.minimumGpa" type="number" step="0.1" min="0" max="4.33" class="input" />
          </div>
        </div>

        <div class="form-group">
          <label>Langues d'enseignement (séparées par une virgule) :</label>
          <input v-model="programForm.languages" type="text" placeholder="Ex: Français, Anglais" class="input" required />
        </div>

        <div class="form-group">
          <label>Description :</label>
          <textarea v-model="programForm.description" class="input" rows="3" placeholder="Détails du programme..."></textarea>
        </div>

        <button type="submit" :disabled="loading || !programForm.universityId" class="btn-primary">
          {{ loading ? 'Enregistrement...' : 'Créer le Programme' }}
        </button>
      </form>
    </div>

    <!-- 6. BOURSE -->
    <div v-if="activeTab === 'scholarships'" class="card">
      <h2>Créer une Bourse d'Études</h2>
      <form @submit.prevent="submitScholarship">
        <div class="form-group">
          <label>Titre de la bourse :</label>
          <input v-model="scholarshipForm.title" type="text" placeholder="Ex: Bourse d'excellence Eiffel" class="input" required />
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Pays ciblé :</label>
            <select v-model="scholarshipForm.countryId" class="input" required>
              <option value="" disabled>Sélectionner un pays</option>
              <option v-for="c in countries" :key="c.id" :value="c.id">{{ c.name }}</option>
            </select>
          </div>

          <div class="form-group">
            <label>Université (Optionnel) :</label>
            <select v-model="scholarshipForm.universityId" class="input">
              <option value="">Toutes les universités du pays</option>
              <option v-for="u in universities" :key="u.id" :value="u.id">{{ u.name }}</option>
            </select>
          </div>
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Type de couverture :</label>
            <select v-model="scholarshipForm.coverageType" class="input" required>
              <option value="FULL">Totale (Full Scholarship)</option>
              <option value="PARTIAL">Partielle</option>
              <option value="TUITION_ONLY">Frais de scolarité uniquement</option>
            </select>
          </div>

          <div class="form-group">
            <label>Montant indicatif ($/an - Optionnel) :</label>
            <input v-model.number="scholarshipForm.amount" type="number" placeholder="Ex: 10000" class="input" />
          </div>
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label>Date limite de candidature :</label>
            <input v-model="scholarshipForm.deadline" type="date" class="input" required />
          </div>

          <div class="form-group">
            <label>Lien officiel de candidature :</label>
            <input v-model="scholarshipForm.link" type="url" placeholder="https://..." class="input" />
          </div>
        </div>

        <div class="form-group">
          <label>Description & Critères d'éligibilité :</label>
          <textarea v-model="scholarshipForm.description" class="input" rows="3" required></textarea>
        </div>

        <button type="submit" :disabled="loading || !scholarshipForm.countryId" class="btn-primary">
          {{ loading ? 'Enregistrement...' : 'Publier la Bourse' }}
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.admin-management { max-width: 850px; margin: 0 auto; font-family: system-ui, sans-serif; }
.tabs { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap; }
.tabs button {
  padding: 0.75rem 1rem;
  border: 1px solid #cbd5e1;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}
.tabs button.active { background: #2563eb; color: white; border-color: #2563eb; }
.card { background: white; padding: 1.5rem; border-radius: 8px; border: 1px solid #e2e8f0; }
.form-group { margin-bottom: 1rem; }
.form-group label { display: block; font-weight: bold; margin-bottom: 0.4rem; font-size: 0.9rem; }
.input { width: 100%; padding: 0.65rem; border: 1px solid #cbd5e1; border-radius: 6px; box-sizing: border-box; }
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
.btn-primary { background: #16a34a; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 6px; font-weight: bold; cursor: pointer; width: 100%; margin-top: 0.5rem; }
.btn-primary:disabled { background: #86efac; cursor: not-allowed; }
.alert { background: #eff6ff; color: #1d4ed8; padding: 0.75rem; border-radius: 6px; margin-bottom: 1rem; font-weight: bold; text-align: center; }
</style>