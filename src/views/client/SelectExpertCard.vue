<!-- ExpertCard.vue -->
<template>
  <div @mouseover="hover = true" @mouseleave="hover = false"
    class="bg-white border border-slate-200 p-4  hover:ring-2 hover:ring-blue-100 flex flex-col gap-3 shadow-sm hover:-translate-y-2 transition-all cursor-pointer ease-out"
    @click="$emit('select', props.name)">
    <article class="flex justify-center items-center">
      <div
        class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center web-icon flex-shrink-0">
        <v-icon :name="props.icon" scale="1.5" />
      </div>

    </article>

    <h4 class="flex flex-col gap-2 font-bold text-base leading-tight text-slate-700">{{ props.name || 'Expert' }}</h4>
    <p class="text-slate-500 text-xs">
      {{ props.summary || 'Summary' }}
    </p>
    <button class="text-blue-600 text-xs font-bold text-left uppercase tracking-wide hover:underline">
      Consultar
    </button>
  </div>

</template>

<script setup>
import { ref } from 'vue';
import 'animate.css';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    default: 'hi-solid-translate'
  },
  summary: {
    type: String,
    required: true
  }
})

const hover = ref(false);

const emit = defineEmits(['select'])
</script>