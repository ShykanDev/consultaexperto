<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, isPlatform, onIonViewDidEnter, useIonRouter } from '@ionic/vue';
import { onMounted, onBeforeMount, watch } from 'vue';
import { StatusBar, Style } from '@capacitor/status-bar';
import { authStore } from './store/auth';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import expertStore from './store/expert';

const router = useIonRouter();
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

onMounted(()=>{
  onAuthStateChanged(auth, (user)=> {
    if(user) {
      console.log('User is connected',user);
      authStore().setUserData('users',user.uid);
    }else {
      authStore().unsuscribeListener()
      console.log('There is not user connected');
    }
  })
})


const validateUserBanned = () => {
//If is user banned, redirect to account suspended
if(authStore().getIsClient){
  console.log('User is client');
  watch(()=>authStore().getIsUserBanned, ()=> {
    if(authStore().getIsUserBanned){
      authStore().setLogout();
      router.navigate('/account-suspended');
    }
  })
}
}

const validateExpertBanned = () => {
//If is user banned, redirect to account suspended
if(authStore().getIsExpert){
  console.log('User is expert');
  watch(()=>expertStore().getExpertData.isSuspended, ()=> {
    if(expertStore().getExpertData.isSuspended){
      authStore().setLogout();
      router.navigate('/account-suspended');
    }
  })
} 
}
onMounted(()=>{
  validateUserBanned();
  validateExpertBanned();
})
</script>
