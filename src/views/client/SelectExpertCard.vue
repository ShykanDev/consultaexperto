<!-- ExpertCard.vue -->
<template>
  <div
    class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    @click="$emit('select', props.name)"
  >
  <article class="flex justify-center items-center">
      <div
      class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"
      >
      <ion-icon :icon="props.icon || languageOutline" size="large"></ion-icon>
    </div>
</article>
    
    <div class="flex flex-col gap-2">
      <h4 class="font-bold text-base leading-tight text-slate-700">
        {{ props.name || 'Expert' }} 
      </h4>
      <p class="text-slate-500 text-xs">
        {{ props.summary || 'Summary' }}
      </p>
      <button
        class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline"
      >
        Consultar
      </button>
    </div>
  </div>
</template>

<script setup>
import { IonIcon } from '@ionic/vue';
import { languageOutline } from 'ionicons/icons';


const props = defineProps({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String, // Ionicons component
    default: languageOutline
  },
  summary: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['select'])
</script>