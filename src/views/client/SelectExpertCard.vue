<!-- ExpertCard.vue -->
<template>
  <div
    class="bg-white border border-slate-200 p-4 rounded-xl flex flex-col gap-3 shadow-sm  hover:-translate-y-2 transition-all cursor-pointer"
    @click="$emit('select', props.name)">
    <article class="flex justify-center items-center">
      <div
        class="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center web-icon  flex-shrink-0">
        <v-icon :name="props.icon" size="large" />
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

const emit = defineEmits(['select'])
</script>