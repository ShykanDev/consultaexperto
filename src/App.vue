<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet, onIonViewDidEnter } from '@ionic/vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authStore } from '@/store/auth';
import {Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { StatusBar, Style } from '@capacitor/status-bar';
const notyf = new Notyf({
  position:{
    x:'center',
    y:'top'
  },
  duration: 3000,
  dismissible: true,
  ripple: true,
});
onIonViewDidEnter(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User is signed in:', user.uid);
      authStore().setIsAuth(true);
      authStore().setUserUid(user.uid);
    } else {
      console.log('User is signed out');
      authStore().setIsAuth(false);
      authStore().setUserUid('');
      notyf.error('Por favor vuelva a iniciar sesión, su sesión ha expirado');
    }
  });
});
onIonViewDidEnter(()=>{
  const statusBar = StatusBar;
  statusBar.setStyle({style: Style.Light})
})
</script>
