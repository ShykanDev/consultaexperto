<!-- ExpertCard.vue -->
<template>
  <div @mouseover="hover = true" @mouseleave="hover = false"
    class="group relative bg-white border border-slate-100 p-6 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-blue-900/5 hover:-translate-y-2 transition-all duration-100 cursor-pointer ease-out overflow-hidden active:bg-blue-50"
    @click="$emit('select', props.name)">
    <div
      class="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
    </div>

    <article class="relative z-10 flex flex-col h-full gap-4">
      <div
        class="w-14 h-14 rounded-2xl bg-slate-50 text-blue-600 flex items-center justify-center transition-colors duration-300 group-hover:bg-blue-600 group-hover:text-white shadow-inner">
        <v-icon :name="props.icon" scale="1.8" />
      </div>

      <div class="space-y-2">
        <h4 class="font-extrabold text-lg tracking-tight text-slate-800 group-hover:text-blue-700 transition-colors">
          {{ props.name || 'Expert' }}
        </h4>
        <p class="text-slate-500 text-sm leading-relaxed line-clamp-3">
          {{ props.summary || 'Summary' }}
        </p>
      </div>

      <div class="mt-auto pt-2 flex items-center justify-between">
        <span
          class="text-blue-600 text-xs font-bold uppercase tracking-widest group-hover:translate-x-1 transition-transform duration-300 flex items-center gap-1">
          Consultar
          <v-icon name="hi-arrow-narrow-right" scale="1" />
        </span>

        <div class="w-8 h-1 bg-slate-100 rounded-full group-hover:bg-blue-200 transition-colors"></div>
      </div>
    </article>
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