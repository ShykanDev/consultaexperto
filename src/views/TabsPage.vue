<template>
  <div class="web-page min-h-screen bg-gray-50 flex flex-col flex-1 overflow-y-auto pb-20">

    <router-view />

    <!-- Bottom Navigation -->
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 shadow-lg z-50">
      <div class="flex justify-around items-center max-w-lg mx-auto">

        <!-- Login / Registration -->
        <template v-if="!authStore().getIsAuth">
          <router-link
            class="flex flex-col items-center gap-1 group transition-colors text-gray-400 hover:text-blue-500"
            to="/login" active-class="text-blue-600">
            <v-icon name="md-login-round" scale="1.2" />
            <span class="text-[10px] font-medium">Entrar</span>
          </router-link>

          <router-link
            class="flex flex-col items-center gap-1 group transition-colors text-gray-400 hover:text-blue-500"
            to="/register" active-class="text-blue-600">
            <v-icon name="io-person-add-sharp" scale="1.2" />
            <span class="text-[10px] font-medium">Crear Cuenta</span>
          </router-link>
        </template>

        <!-- Experts List -->
        <router-link class="flex flex-col items-center gap-1 group transition-colors text-gray-400 hover:text-blue-500"
          v-if="authStore().getIsAuth" to="/home" active-class="text-blue-600">
          <v-icon name="md-listalt-round" scale="1.2" />
          <span class="text-[10px] font-medium">Inicio</span>
        </router-link>

        <router-link class="flex flex-col items-center gap-1 group transition-colors text-gray-400 hover:text-blue-500"
          v-if="authStore().getIsAuth" to="/experts" active-class="text-blue-600">
          <v-icon name="fa-search" scale="1.2" />
          <span class="text-[10px] font-medium">Buscar</span>
        </router-link>

        <!-- My Appointments -->
        <router-link class="flex flex-col items-center gap-1 group transition-colors text-gray-400 hover:text-blue-500"
          v-if="authStore().getIsAuth && authStore().getIsClient" to="/appointments" active-class="text-blue-600">
          <v-icon name="bi-calendar-check" scale="1.2" />
          <span class="text-[10px] font-medium">Mis Citas</span>
        </router-link>

        <!-- Expert Specific -->
        <router-link class="flex flex-col items-center gap-1 group transition-colors text-gray-400 hover:text-blue-500"
          v-if="authStore().getIsAuth && authStore().getIsExpert" to="/expert-appointments"
          active-class="text-blue-600">
          <v-icon name="md-calendarmonth" scale="1.2" />
          <span class="text-[10px] font-medium">Citas</span>
        </router-link>

        <!-- Config/Logout -->
        <router-link class="flex flex-col items-center gap-1 group transition-colors text-gray-400 hover:text-blue-500"
          v-if="authStore().getIsAuth" to="/logout" active-class="text-blue-600">
          <v-icon name="md-settings" scale="1.2" />
          <span class="text-[10px] font-medium">Perfil</span>
        </router-link>

      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { authStore } from '@/store/auth';
</script>

<style scoped>
.router-link-active {
  color: #2563eb !important;
}

.router-link-active svg {
  color: #2563eb !important;
}
</style>
