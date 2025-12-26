<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        
        <ion-tab-button tab="appointments" href="/expert/appointments">
          <ion-icon :icon="calendarOutline" />
          <ion-label>Citas</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/expert/profile">
          <ion-icon :icon="personCircleOutline" />
          <ion-label>Perfil</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="logout" href="/expert/logout">
          <ion-icon :icon="logOutOutline" />
          <ion-label>Salir</ion-label>
        </ion-tab-button>

      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonPage, IonRouterOutlet, IonIcon } from '@ionic/vue';
import { calendarOutline, personCircleOutline, logOutOutline } from 'ionicons/icons';
</script>
