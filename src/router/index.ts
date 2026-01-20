import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'
import { authStore } from '@/store/auth';
import expertStore from '@/store/expert';
// const authStorePinia = authStore(); // Removed to avoid getActivePinia() error at initialization

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1',
        meta:{
          requiresAuth: false
        }
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1Page.vue'),
        meta:{
          requiresAuth: false
        }
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2Page.vue'),
        meta:{
          requiresAuth: false
        }
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3Page.vue'),
        meta:{  
          requiresAuth: true,
        }
      },
      {
        path: 'user-account',
        component: () => import('@/views/client/UserAccount.vue'),
        meta:{
          requiresAuth: true,
        }
      },
      {
        path: 'user-account/:id',
        component: () => import('@/views/client/UserAccount.vue'),
        meta:{
          requiresAuth: true,
        }
      },
      {
        path: 'experts-list',
        component: () => import('@/views/ExpertsListView.vue'),
        meta:{
          requiresAuth: true,
        }
      },
      {
        path: 'client-appointments',
        component: () => import('@/views/client/ClientAppointmentsView.vue'),
        meta:{
          requiresAuth: true,
        }
      },  
      {
        path: 'expert-list-modern',
        component: () => import('@/views/ExpertListModern.vue'),
        meta:{
          requiresAuth: true,
        }
      },
    ],
    
  },
  {
    path: '/add-experts',
    component: () => import('@/views/mock/AddExpertsView.vue'),
    meta:{
      requiresAuth: true,
    }
  
  },
  {
    path: '/expert-info',
    component: () => import('@/views/ExpertInfoView.vue'),
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/expert-info-fixed',
  component: () => import('@/views/expert/ExpertViewFixed.vue'),  
  meta:{
    requiresAuth: true,
  }
},
  {
    path: '/expert',
    component: () => import('@/views/expert/ExpertTabs.vue'),
    children: [
      {
        path: '',
        redirect: '/expert/appointments',
      },
      {
        path: 'appointments',
        component: () => import('@/views/expert/ExpertView.vue'),
        meta:{
          requiresAuth: true,
        }
      },
      {
        path: 'profile',
        component: () => import('@/views/expert/ExpertProfileView.vue'),
        meta:{
          requiresAuth: true,
        }
      },
      {
        path: 'logout',
        component: () => import('@/views/LogoutView.vue'),
        meta:{
          requiresAuth: true,
        }
      }
    ],
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/logout',
    component: () => import('@/views/LogoutView.vue'),
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/contact',
    component: () => import('@/views/ContactView.vue'),
    meta:{
      requiresAuth: false
    }
  },
  {
    path: '/help',
    component: () => import('@/views/HelpView.vue'),
    meta:{
      requiresAuth: false
    }
  },
  {
    path: '/hiring',
    component: () => import('@/views/HiringView.vue'),
    meta:{
      requiresAuth: true,
    }
  },

  {
    path: '/create-expert',
    component: () => import('@/views/CreateExpert.vue'),
    meta:{
      requiresAuth: true,
    }
  },

  {
    path: '/expert-preview',
    component: () => import('@/views/ExpertPreview.vue'),
    meta:{
      requiresAuth: true,
    }
  },

  {
    path: '/expert-list-admin',
    component: () => import('@/views/ExpertListAdmin.vue'),
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/privacy-policy',
    component: () => import('@/views/PrivacyPolicy.vue'),
    meta:{
      requiresAuth: false
    }
  },
  {
    path: '/users-list-admin',
    component: () => import('@/views/admin/UsersList.vue'),
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/firebase',
    component: () => import('@/views/tests/FirebaseTest.vue'),
    meta:{
      requiresAuth: false
    }
  },
  {
    path: '/account-suspended',
    component: () => import('@/views/AccountSuspendedView.vue'),
    meta:{
      requiresAuth: false
    }
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authStorePinia = authStore(); // Access store inside the guard
  const expertStorePinia = expertStore(); // Access store inside the guard

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuth = authStorePinia.getIsAuth;
  const isBannedUser = authStorePinia.getUserData?.isBanned ?? false;
  const isBannedExpert = expertStorePinia.getExpertData?.isSuspended ?? false;

  // 1. Always allow access to the account-suspended view to avoid infinite loops
  if (to.path === '/account-suspended') {
    return next();
  }

  // 2. If user is banned and tries to access a protected route
  if (isAuth && (isBannedUser || isBannedExpert) && requiresAuth) {
    return next({ path: '/account-suspended' });
  }

  // 3. Handle protected routes
  if (requiresAuth) {
    if (!isAuth) {
      next({ path: '/tabs/tab1' });
    } else {
      next();
    }
  } else {
    next();
  }
})
export default router
