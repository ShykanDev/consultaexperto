<template>
  <ion-page>
    <ion-header >
      <ion-toolbar >
          <ion-title slot="start" class="text-base font-bold text-orange-700 text-start sm:text-xl font-quicksand">Registrarse</ion-title>
          <div slot="end" class="flex">
            <span class="text-sm" v-html="currentName" :key="currentName"></span>
          </div>
      </ion-toolbar>
    </ion-header>


      <RegisterComponent></RegisterComponent>

  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
import ExploreContainer from '@/components/ExploreContainer.vue';
import RegisterComponent from '@/components/Login/RegisterComponent.vue';
import { ref } from 'vue';


  const names = [
  [
    '<span class="animate-fade-down animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-orange-700 animate-fade animate-duration-300 animate-delay-200">gratis</span>' +
    '<span class="animate-fade animate-duration-300 animate-delay-300">en</span>' +
    '<span class="animate-fade animate-duration-300 animate-delay-500">linea</span>' +
    '<span class="text-orange-500 animate-fade animate-duration-300 animate-delay-500">.com</span>'
  ],
  [
    '<span class="animate-fade animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-orange-700 animate-fade animate-duration-300 animate-delay-200">experto</span>' +
    '<span class="text-orange-500 animate-fade animate-duration-300 animate-delay-300">.com</span>'
  ],
  [
    '<span class="animate-fade-down animate-delay-100">consulta</span>' +
    '<span class="text-orange-700 animate-fade animate-delay-200">especializada</span>' +
    '<span class="text-orange-500 animate-fade animate-delay-300">.com</span>'
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

 onIonViewDidEnter(() => {
  animateNames();
})

onIonViewDidLeave(() => {
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

