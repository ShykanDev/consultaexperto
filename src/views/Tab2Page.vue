<template>
  <div class="web-page min-h-screen bg-gray-50"><header class="web-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm border-none shadow-none">
      <nav class="web-toolbar h-16 flex items-center px-4">
          <h1 class="web-title text-lg font-bold text-gray-900 order-first text-base text-blue-500 text-start sm:text-xl font-quicksand">Registrarse</h1>
          <h1 class="order-last flex"><span class="text-sm" v-html="currentName" :key="currentName"></span></h1>
      </nav>
    </header>


      <RegisterComponent></RegisterComponent>

  </div>
</template>

<script setup lang="ts">

import ExploreContainer from '@/components/ExploreContainer.vue';
import RegisterComponent from '@/components/Login/RegisterComponent.vue';
import { ref, onMounted, onUnmounted } from 'vue';


  const names = [
  [
    '<span class="animate-fade-down animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-blue-700 animate-fade animate-duration-300 animate-delay-200">gratis</span>' +
    '<span class="animate-fade animate-duration-300 animate-delay-300">en</span>' +
    '<span class="animate-fade animate-duration-300 animate-delay-500">linea</span>' +
    '<span class="text-blue-500 animate-fade animate-duration-300 animate-delay-500">.com</span>'
  ],
  [
    '<span class="animate-fade animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-blue-700 animate-fade animate-duration-300 animate-delay-200">experto</span>' +
    '<span class="text-blue-500 animate-fade animate-duration-300 animate-delay-300">.com</span>'
  ],
  [
    '<span class="animate-fade-down animate-delay-100">consulta</span>' +
    '<span class="text-blue-700 animate-fade animate-delay-200">especializada</span>' +
    '<span class="text-blue-500 animate-fade animate-delay-300">.com</span>'
  ]
];

let timeoutId: NodeJS.Timeout | null = null;
const currentName = ref<string[]>(names[0]);
 const animateNames = () => {
  timeoutId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    currentName.value = names[randomIndex];
  }, 2000);
  
 }

 onMounted(() => {
  animateNames();
})

onUnmounted(() => {
  if(timeoutId){
    clearInterval(timeoutId);
    timeoutId = null;
  }
})
</script>

<style scoped>
:root {
  --ion-color-primary: ;
}
</style>

