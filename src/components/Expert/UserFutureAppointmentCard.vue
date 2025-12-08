<template>
        <!-- List Item 1 -->
        <div
          class="flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-sm transition-shadow hover:shadow-md font-poppins">
          <div class="flex gap-4 items-start">
            <div class="flex justify-center items-center bg-blue-500 rounded-full size-12">
              <ion-icon :icon="personOutline" class="text-2xl text-white"></ion-icon>
            </div>
            <div class="flex flex-col flex-1 justify-center">
              <p class="text-base font-medium leading-normal text-gray-900">{{ userFutureAppointment.userName }} ?? 'Nombre del usuario'</p>
              <p class="text-sm font-normal leading-normal text-gray-500">{{ userFutureAppointment.proffession }} ?? 'Profesion del usuario'</p>
            </div>
            <div class="flex justify-center items-center size-7 shrink-0">
              <ion-icon :icon="ellipsisVerticalOutline"></ion-icon>
            </div>
          </div>
          <div class="flex justify-between items-center pt-3 border-t border-gray-100">
            <div class="flex gap-2 items-center">
              <ion-icon :icon="calendarSharp"></ion-icon>
              <p class="text-sm font-normal text-gray-600"> {{ userFutureAppointment.day }} {{ userFutureAppointment.month }} {{ userFutureAppointment.year }} at {{ userFutureAppointment.hour }}</p>
            </div>
            <div class="px-2 py-1 bg-green-100 rounded-full">
              <p class="text-xs font-medium text-green-700">{{ userFutureAppointment. status }}</p>
            </div>
          </div>
        </div>
</template>

<script lang="ts" setup>
import { IFutureAppointment } from '@/interfaces/IFutureAppointment';
import {
  IonIcon,

} from '@ionic/vue';
import { calendarSharp, checkmarkCircle, ellipsisVerticalOutline, personOutline } from 'ionicons/icons';



const props  = defineProps({
    userFutureAppointment: {
        type: Object as () => IFutureAppointment,
        required: true
    }
})
</script>

<style scoped>

</style>