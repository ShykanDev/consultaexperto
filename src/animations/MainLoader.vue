<template>
    <div class="">
        <div v-if="loading"
            class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-blue-900/40 backdrop-blur-sm transition-all">
            <div class="relative">
                <div class="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                <div class="absolute inset-0 flex items-center justify-center">
                    <v-icon name="hi-paper-airplane" class="text-white animate-pulse" scale="1.5" />
                </div>
            </div>
            <p class="mt-4 text-white font-bold text-lg tracking-wide">{{ loadingMessage }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    loading: {
        type: Boolean,
        default: false
    },
    loadingMessage: {
        type: String,
        default: 'Cargando...'
    }
})

</script>

<style scoped></style>