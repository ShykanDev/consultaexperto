<template>
  <div
    class="flex flex-col gap-4 p-4 bg-white rounded-2xl shadow-sm transition-shadow hover:shadow-md font-poppins items-start">
    <div
      class="flex justify-center items-center bg-blue-500 rounded-full size-12 web-icon w-6 h-6 flex-shrink-0 text-2xl text-white">
      <v-icon name="hi-user" />
    </div>
    <div class="flex flex-col flex-1 justify-center">
      <p class="text-base font-medium leading-normal text-gray-900">
        {{ props.userFutureAppointment.takenBy || 'Usuario no asignado' }}
      </p>
      <p class="text-sm font-normal leading-normal text-gray-500">
        {{ props.userFutureAppointment.time || 'Horario no definido' }}
      </p>
    </div>
    <div class="flex justify-between items-center pt-3 border-t border-gray-100 gap-2 w-full">
      <p class="text-xs text-gray-400">Estado: {{ props.userFutureAppointment.isAvailable ? 'Disponible' : 'Ocupado' }}
      </p>
      <div v-if="!props.userFutureAppointment.isAvailable" class="px-2 py-1 bg-blue-100 rounded-full">
        <p class="text-[10px] font-bold text-blue-700 uppercase tracking-tighter">Reservado</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Slot } from '@/interfaces/Ischedule';

const props = defineProps({
  userFutureAppointment: {
    type: Object as () => Slot,
    required: true
  }
})
</script>