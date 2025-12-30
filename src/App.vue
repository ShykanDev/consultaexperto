<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, isPlatform } from '@ionic/vue';
import { onMounted, onBeforeMount } from 'vue';
import { StatusBar, Style } from '@capacitor/status-bar';

console.log('App.vue script is executing...');

onBeforeMount(() => {
  console.log('App.vue: onBeforeMount hook called');
});

onMounted(async () => {
  console.log('App.vue: onMounted hook called - App is now mounted!');
  
  if (isPlatform('hybrid')) {
    try {
      // Force status bar text to be dark (black) because the app background is white
      await StatusBar.setStyle({ style: Style.Light });
      
      if (isPlatform('android')) {
        // Also ensure the background color of the status bar is white
        await StatusBar.setBackgroundColor({ color: '#FFFFFF' });
      }
    } catch (error) {
      console.warn('StatusBar configuration failed:', error);
    }
  }
});
</script>
