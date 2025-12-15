<template>
    <div class="p-6 w-full max-w-full bg-white rounded-3xl border border-gray-200 shadow-lg">
      <article class="w-full bg-red-700">
        <div class="w-full bg-blue-700">
          <span>icon</span>
        </div>
        <div class="w-full bg-green-700">
          <span>data</span>
          <span>data</span>
          <span>data</span>
        </div>
        <div class="w-full bg-yellow-700">
          <span>icon</span>
        </div>
      </article>
      <!-- Título de la cita -->
      <div class="mb-6 text-center">
        <div class="inline-flex justify-center items-center mx-auto mb-3 w-16 h-16 bg-blue-100 rounded-full">
          <v-icon name="fa-calendar-check" class="text-2xl text-blue-600" />
        </div>
        <h3 class="mb-1 text-lg font-semibold text-gray-800">Cita agendada</h3>
        <p class="font-medium text-gray-600">
          Para el <span class="text-blue-600">{{ formattedDay }}</span>
        </p>
        <p class="font-medium text-gray-600">
          A las <span class="text-blue-600">{{ formattedTime }}</span>
        </p>
      </div>
      
      <div class="pt-4 space-y-4 border-t border-gray-100">
        <div class="flex items-center p-3 bg-blue-50 rounded-xl">
          <v-icon name="bi-calendar2-minus" class="mr-2 text-blue-600" />
          <span class="font-medium text-gray-700">Día:</span>
          <span class="ml-1 font-bold text-blue-600">{{ formattedDate }}</span>
        </div>
        <div class="flex items-center p-3 bg-blue-50 rounded-xl">
          <v-icon name="bi-alarm" class="mr-2 text-blue-600" />
          <span class="font-medium text-gray-700">Hora:</span>
          <span class="ml-1 font-bold text-blue-600">{{ formattedTime }}</span>
        </div>
        <div class="flex items-center p-3 bg-blue-50 rounded-xl">
          <v-icon name="fa-user-md" class="mr-2 text-blue-600" />
          <span class="font-medium text-gray-700">Nombre:</span>
          <span class="ml-1 font-bold text-blue-600">{{ props.data.expertName }}</span>
        </div>
        <div class="flex items-center p-3 bg-blue-50 rounded-xl">
          <v-icon name="fa-briefcase-medical" class="mr-2 text-blue-600" />
          <span class="font-medium text-gray-700">Especialidad:</span>
          <span class="ml-1 font-bold text-blue-600">{{ props.data.expertSpecialty }}</span>
        </div>
        <div class="flex items-center p-3 bg-blue-50 rounded-xl">
          <v-icon name="fa-id-card" class="mr-2 text-blue-600" />
          <span class="font-medium text-gray-700">Cédula profesional:</span>
          <span class="ml-1 font-bold text-blue-600">{{ props.data.expertProfessionalId }}</span>
        </div>
        <div class="flex items-center p-3 bg-blue-50 rounded-xl">
          <v-icon name="fa-link" class="mr-2 text-blue-600" />
          <span class="font-medium text-gray-700">Enlace de la cita:</span>
          <span class="ml-1 italic font-mediums text-slate-500">{{ (props.data.appointmentLink !== '') ? props.data.appointmentLink : 'El enlace de la cita estará generado una vez el administrador lo asigne' }}</span>
        </div>
      </div>

      <div class="p-3 mt-4 bg-yellow-50 rounded-lg border border-gray-200">
        <div class="flex items-start">
          <div class="w-full">
            <p class="text-sm text-gray-600">
              <span class="font-medium">Registrado el:</span>
              <span class="ml-1 font-semibold text-blue-600">
                {{ new Date(props.data.createdAt.seconds * 1000).toLocaleDateString('es-MX', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) }}
              </span>
            </p>
            <p class="flex gap-2 items-center mt-1 text-xs text-yellow-600">
              <v-icon name="bi-info-circle" class="text-yellow-600" />
              Esta es la fecha en que se registró su cita, no la fecha de su consulta.
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
import { ISchedule } from '@/interfaces/user/ISchedule';
import { computed } from 'vue';

const props = defineProps({
  data:{
    type:Object as () => ISchedule,
    required:true,
  } 
})

const getDayIndex = (dayName: string): number => {
  const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const normalizedDay = dayName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return days.findIndex(d => normalizedDay.includes(d));
}

const calculatedAppointmentDate = computed(() => {
  if (!props.data?.createdAt) return null;

  const createdAtDate = new Date(props.data.createdAt.seconds * 1000);
  // Reset time to start of day for accurate day calculation
  const currentDayIndex = createdAtDate.getDay();
  
  // Handle DayName property (supporting both DayName and dayName just in case)
  const targetDayName = props.data.DayName || (props.data as any).dayName || '';
  const targetDayIndex = getDayIndex(targetDayName);

  if (targetDayIndex === -1) return createdAtDate;

  let daysUntil = targetDayIndex - currentDayIndex;
  
  // If the day is today or in the past, add 7 days to get the next occurrence
  // Unless it's today and the time hasn't passed? 
  // For simplicity and typical booking flows:
  // If I book for "Monday" on a "Tuesday", it's next Monday (daysUntil = 1 - 2 = -1 => +7 = 6 days)
  // If I book for "Monday" on a "Monday", usually it's next week unless specifically today.
  // Assuming strict forward booking:
  if (daysUntil <= 0) {
    daysUntil += 7;
  }

  const futureDate = new Date(createdAtDate);
  futureDate.setDate(createdAtDate.getDate() + daysUntil);
  
  return futureDate;
});

const formattedDate = computed(() => {
  if (!calculatedAppointmentDate.value) return 'Fecha no disponible';
  return calculatedAppointmentDate.value.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const formattedTime = computed(() => {
    return props.data.expertSchedule.time;
})

const formattedDay = computed(() => {
    return calculatedAppointmentDate.value?.toLocaleDateString('es-MX', { weekday: 'long' }) || props.data.DayName;
})
</script>