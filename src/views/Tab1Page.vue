<template>
  <div class="web-page min-h-screen bg-gray-50">
    <header class="fixed top-0 z-50 w-full pt-3 px-4 sm:px-6 lg:px-8">
      <div class="web-header mx-auto max-w-8xl">
        <nav
          class="h-14 md:h-16 bg-white/75  border border-blue-100/40 rounded-2xl shadow-lg shadow-blue-100/20 overflow-hidden">
          <div class="h-full flex items-center justify-between px-6">
            <!-- Título / Logo -->
            <h1
              class="text-xl md:text-2xl font-normal bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent tracking-tight">
              Inicio de sesión
            </h1>

            <!-- Usuario -->
            <div class="flex items-center gap-3">
              <span class="text-sm font-semibold text-gray-900 hidden sm:block truncate max-w-[180px] mr-5"
                v-html="currentName" :key="currentName">
              </span>
            </div>
            <RouterLink to="/register" class="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
              Registrarse
              <v-icon class="text-blue-600 rotate-180" name="md-arrowbackiosnew-round" />
            </RouterLink>
          </div>
        </nav>
      </div>
    </header>

    <main class="web-content overflow-y-auto login ">
      <LoginComponent />
    </main>
  </div>
</template>

<script setup lang="ts">
import LoginComponent from '@/components/Login/LoginComponent.vue';
import { ref, onMounted, onUnmounted } from 'vue';
import { auth as authFirebase } from '@/firebase';
import { authStore } from '@/store/auth';

console.log('Tab1Page.vue script is executing...');

const names = [
  '<span class="animate-fade-down animate-duration-300 animate-delay-100">consulta</span>' +
  '<span class="text-sky-700 animate-fade animate-duration-300 animate-delay-200">gratis</span>' +
  '<span class="animate-fade animate-duration-300 animate-delay-300">en</span>' +
  '<span class="animate-fade animate-duration-300 animate-delay-500">linea</span>' +
  '<span class="text-sky-500 animate-fade animate-duration-300 animate-delay-500">.com</span>',

  '<span class="animate-fade animate-duration-300 animate-delay-100">consulta</span>' +
  '<span class="text-sky-700 animate-fade animate-duration-300 animate-delay-200">experto</span>' +
  '<span class="text-sky-500 animate-fade animate-duration-300 animate-delay-300">.com</span>',

  '<span class="animate-fade-down animate-delay-100">consulta</span>' +
  '<span class="text-sky-700 animate-fade animate-delay-200">especializada</span>' +
  '<span class="text-sky-500 animate-fade animate-delay-300">.com</span>'
];

let timeoutId: any = null;
const currentName = ref<string>(names[0]);

const animateNames = () => {
  timeoutId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    currentName.value = names[randomIndex];
  }, 2000);
};

onMounted(() => {
  animateNames();
  const authStorePinia = authStore();
  logout();
  authStorePinia.resetAuth();
});

onUnmounted(() => {
  if (timeoutId) {
    clearInterval(timeoutId);
    timeoutId = null;
  }
});

const auth = authFirebase;
const logout = async () => {
  await auth.signOut();
};
</script>

<style scoped>
@keyframes fade {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.animate-fade {
  animation-name: fade;
}

.animate-fade-down {
  animation-name: fade;
  transform: translateY(-10px);
}

.login {
  background-color: #fafafa !important;
}
</style>
