<template>
  <ion-page>
    <!-- Top App Bar -->
    <ion-header>
      <ion-toolbar>
        <ion-title color="primary">Proximas citas</ion-title>
      </ion-toolbar>
    </ion-header>
    <!-- List of Appointments -->
    <ion-content class="ion-padding">
      <ion-searchbar placeholder="Search by client or service" class="ion-margin"></ion-searchbar>
      <ion-list style="background: #F6F6F8;">

        <UserFutureAppointmentCard v-for="(userFutureAppointment, index) in userFutureAppointments" :key="index" :userFutureAppointment="userFutureAppointment" />

      </ion-list>

      <!-- Empty State -->
      <ion-card v-if="true" class="ion-text-center">
        <ion-card-content>
          <ion-icon :icon="checkmarkCircle" class="text-4xl text-primary"></ion-icon>
          <h2>Todo en orden</h2>
          <p>No tiene citas programadas.</p>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonIcon,
  IonSearchbar,
  IonCard,
  IonCardContent,

} from '@ionic/vue';
import { checkmarkCircle } from 'ionicons/icons';
import UserFutureAppointmentCard from '@/components/Expert/UserFutureAppointmentCard.vue';
import { ref } from 'vue';
    
const userFutureAppointments = ref([]);



</script>

<style scoped>
/* Custom styles if needed */

ion-content {
  --background: #F6F6F8 !important;
  /* Fondo blanco */
}

ion-searchbar {
  --color: #000000 !important;
  /* Texto negro */
  --border-radius: 10px !important;

}

</style>
