<template>
  <div class="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-blue-600 transition-all">
    <div class="flex gap-2 items-center text-xl font-bold text-slate-700 mb-2">
      <v-icon class="text-blue-600" name="bi-calendar2-minus" />
      {{ dayInfo.day }}
    </div>

    <p class="inline-block px-2 py-1 text-sm font-semibold text-white bg-blue-600 rounded-full mb-4">
      {{ getFormattedDate() ? (index == 0 ? 'Hoy' : getFormattedDate()) : 'Hoy' }}
    </p>

    <div class="grid grid-cols-2 gap-2">
      <button class="w-full py-2 px-4 rounded-xl text-sm font-medium transition-all duration-200" v-for="slot in dayInfo.slots" :key="slot.hour" @click="selectHour(slot.hour)" :class="[
          isHourSelected(slot.hour)
            ? 'bg-blue-600 text-white shadow-md scale-[0.98]'
            : isSlotAvailable(slot)
              ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
              : 'bg-gray-100 text-gray-400 italic line-through cursor-not-allowed'
        ]">
        {{ slot.hour }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { useAppointmentStore } from '@/store/appointment';

const props = defineProps({
  dayInfo: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
});

const appointmentStore = useAppointmentStore();

const isSlotAvailable = (slot) => {
  return slot.takenBy === null;
};

const isHourSelected = (hour) => {
  return appointmentStore.selectedHour === hour &&
    appointmentStore.dayName === props.dayInfo.day;
};

function selectHour(hour) {
  const slot = props.dayInfo.slots.find(s => s.hour === hour);
  if (slot && isSlotAvailable(slot)) {
    const formattedDate = getFormattedDate();
    appointmentStore.setAppointment(
      props.dayInfo.day,
      hour,
      formattedDate
    );
  }
}

function getFormattedDate() {
  const today = new Date();
  const targetDate = new Date(today);
  const currentDay = today.getDay();
  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const targetDay = days.indexOf(props.dayInfo.day);

  let diff = targetDay - currentDay;
  if (diff < 0) diff += 7;

  targetDate.setDate(today.getDate() + diff);

  return targetDate.toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long'
  });
}
</script>