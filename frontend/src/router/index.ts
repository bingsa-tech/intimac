import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

// Layout & Vues du Dashboard Étudiant
import DashboardLayout from '../views/dashboard/DashboardLayout.vue';
import DashboardHome from '../views/dashboard/DashboardHome.vue';
import MatchingsView from '../views/dashboard/MatchingsView.vue';
import ApplicationsView from '../views/dashboard/ApplicationsView.vue';
import SubscriptionView from '../views/dashboard/SubscriptionView.vue';
import DocumentView from '../views/dashboard/DocumentsView.vue';
import RoadMapView from '../views/dashboard/RoadMapView.vue';
import AppointmentsView from '../views/dashboard/AppointmentsView.vue';
import AdminMessageView from '../views/admin/AdminMessageView.vue';
import AssessmentsView from '../views/dashboard/AssessmentView.vue';

const routes = [
  { 
    path: '/', 
    name: 'home',
    component: HomeView 
  },
  { 
    path: '/login', 
    name: 'login',
    component: LoginView 
  },
  { 
    path: '/register', 
    name: 'register',
    component: RegisterView 
  },

  // 🎓 ESPACE ÉTUDIANT
  { 
  path: '/dashboard', 
  component: DashboardLayout,
  meta: { requiresAuth: true, requiredRole: 'STUDENT' },
  children: [
    { path: '', name: 'student-dashboard', component: DashboardHome },
    { path: 'matching', name: 'student-matching', component: MatchingsView },
    { path: 'applications', name: 'student-applications', component: ApplicationsView },
    { path: 'subscription', name: 'student-subscription', component: SubscriptionView },
    { path: 'documents', name: 'student-documents', component: DocumentView },
    { path: 'appointments', name: 'student-appointments', component: AppointmentsView },
    {path: 'assessments', name: 'student-assessments', component: AssessmentsView },
    { path: 'roadmap', name: 'student-roadmap', component: RoadMapView },
    // ✅ Utilisation du Lazy-Loading avec l'alias '@' (ou '../views/dashboard/AssessmentView.vue')
   
  ]
},

  // 🛡️ ESPACE ADMINISTRATION
  {
    path: '/admin',
    component: () => import('../layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiredRole: 'ADMIN' },
    children: [
      {
        path: '',
        name: 'admin-dashboard',
        component: () => import('../views/admin/AdminDashboardView.vue'),
      },
      {
        path: 'create-advisor',
        name: 'admin-create-advisor',
        component: () => import('../views/admin/CreateAdvisorView.vue'),
      },
      {
        path: 'create-news',
        name: 'admin-create-news',
        component: () => import('../views/admin/CreateNewsView.vue'),
      },
      {
        path: '/admin/news',
        name: 'admin-news-list',
        component: () => import('../views/admin/AdminNewsListView.vue'),
      },  
      {
        path: '/admin/news/edit/:id',
        name: 'admin-news-edit',
      component: () => import('../views/admin/EditNewsView.vue'),
  },
      { 
        path: 'settings', 
        name: 'admin-settings',
        component: () => import('../views/admin/AdminSettingsView.vue') 
      },
      {
        path: 'messages',
        name: 'admin-messages',
        component: AdminMessageView 
      },
      {
      path: 'appointments',
      name: 'admin-appointments',
      component: () => import('../views/admin/AdminAppointmentsView.vue'),
    },
    {
      path: 'assessment-requests',
      name: 'admin-assessment-requests',
      component: () => import('../views/admin/AdminAssessmentRequestsView.vue'),
    }
    ],
  },
  
  // REDIRECTION DE SECOURS (404)
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      }
    }
    return { top: 0 }
  }
});

// 🔒 GUARD DE NAVIGATION
router.beforeEach((to) => {
  const token = localStorage.getItem('token');
  const userStr = localStorage.getItem('user');
  
  let user = null;
  if (userStr) {
    try {
      user = JSON.parse(userStr);
    } catch (e) {
      console.error('Erreur lors du parse de l user dans le guard', e);
    }
  }

  const userRole = user?.role?.toUpperCase();

  // 1. Si la route nécessite d'être connecté et qu'aucun token n'est présent
  if (to.meta.requiresAuth && !token) {
    return { path: '/login' };
  }

  // 2. Redirection des ADMINS hors du dashboard étudiant
  if (to.path.startsWith('/dashboard') && userRole === 'ADMIN') {
    return { path: '/admin' };
  }

  // 3. Vérification stricte des rôles requis
  if (to.meta.requiredRole) {
    const requiredRole = (to.meta.requiredRole as string).toUpperCase();

    if (userRole !== requiredRole) {
      console.warn(`[Guard] Accès refusé à ${to.path}. Rôle attendu: ${requiredRole}, Rôle actuel: ${userRole}`);
      
      if (userRole === 'ADMIN') {
        return { path: '/admin' };
      }
      if (userRole === 'ADVISOR') {
        return { path: '/advisor/dashboard' };
      }
      return { path: '/dashboard' };
    }
  }

  return true;
  });