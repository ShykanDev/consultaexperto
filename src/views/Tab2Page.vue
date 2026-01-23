<template>
  <div class="web-page min-h-screen bg-gray-50">

    <HeaderComponent :page-title="'Registro de usuario'" />


    <RegisterComponent></RegisterComponent>

  </div>
</template>

<script setup lang="ts">

import ExploreContainer from '@/components/ExploreContainer.vue';
import RegisterComponent from '@/components/Login/RegisterComponent.vue';
import HeaderComponent from '@/components/Templates/HeaderComponent.vue';
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
  if (timeoutId) {
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
