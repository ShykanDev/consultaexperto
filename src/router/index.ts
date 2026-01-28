import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import { RouteRecordRaw } from "vue-router";
import { authStore } from "@/store/auth";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
  },
  // Auth Routes
  {
    path: "/login",
    component: () => import("@/views/Tab1Page.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    component: () => import("@/views/Tab2Page.vue"),
    meta: { requiresAuth: false },
  },
  // client Routes
  {
    path: "/home",
    component: () => import("@/views/ExpertListModern.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/experts",
    component: () => import("@/views/ExpertsListView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/appointments",
    component: () => import("@/views/client/ClientAppointmentsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/account",
    component: () => import("@/views/client/UserAccount.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/account/:id",
    component: () => import("@/views/client/UserAccount.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/expert-info-fixed",
    component: () => import("@/views/expert/ExpertViewFixed.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/client-appointments",
    component: () => import("@/views/client/ClientAppointmentsView.vue"),
    meta: { requiresAuth: true },
  },
  // Expert Routes
  {
    path: "/expert-appointments",
    component: () => import("@/views/expert/ExpertView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/expert-profile",
    component: () => import("@/views/expert/ExpertProfileView.vue"),
    meta: { requiresAuth: true },
  },
  // Admin & Other
  {
    path: "/expert-list-admin",
    component: () => import("@/views/ExpertListAdmin.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/users-list-admin",
    component: () => import("@/views/admin/UsersList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/expert-preview",
    component: () => import("@/views/ExpertPreview.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/help",
    component: () => import("@/views/HelpView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/privacy-policy",
    component: () => import("@/views/PrivacyPolicy.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/account-suspended",
    component: () => import("@/views/AccountSuspendedView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/logout",
    component: () => import("@/views/LogoutView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/hiring",
    component: () => import("@/views/HiringView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/create-expert",
    component: () => import("@/views/CreateExpert.vue"),
    meta: { requiresAuth: true },
  },
  // Legacy/Test
  {
    path: "/terms",
    component: () => import("@/views/TermsView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/verify",
    component: () => import("@/views/VerifyEmail.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/expert",
    redirect: "/expert-appointments",
  },
  {
    path: "/firebase",
    component: () => import("@/views/tests/FirebaseTest.vue"),
    meta: { requiresAuth: false },
  },
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: "smooth",
      };
    }
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  const authStorePinia = authStore();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuth = authStorePinia.getIsAuth;
  const isBannedOrSuspended =
    (authStorePinia.getUserData?.isBanned ||
      authStorePinia.getUserData?.isSuspended) ??
    false;

  console.log("[Router Guard]", {
    to: to.path,
    from: from.path,
    isAuth,
    isBanned: authStorePinia.getUserData?.isBanned,
    isSuspended: authStorePinia.getUserData?.isSuspended,
    isBannedOrSuspended,
    isClient: authStorePinia.getIsClient,
    isExpert: authStorePinia.getIsExpert,
  });

  if (to.path === "/account-suspended") {
    return next();
  }

  if (isAuth && isBannedOrSuspended && requiresAuth) {
    console.log("[Router Guard] ⚠️ Redirecting to account-suspended");
    return next({ path: "/account-suspended" });
  }

  if (requiresAuth && !isAuth) {
    next({ path: "/login" });
  } else {
    next();
  }
});

export default router;
