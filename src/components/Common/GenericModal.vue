<template>
    <Transition name="fade">
        <div class="fixed  inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            v-if="show" @click.self="close">
            <Transition name="scale">
                <div class="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in"
                    v-if="show">
                    <!-- Header -->
                    <div
                        class="px-6 py-5 border-b border-gray-100 flex items-center justify-between text-xl font-bold font-manrope text-gray-900">
                        {{ title }}
                        <button class="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                            @click="close">
                            <v-icon name="io-close" scale="1.2" />
                        </button>
                    </div>

                    <!-- Body -->
                    <div class="px-6 py-6 overflow-y-auto max-h-[70vh]">
                        <p class="text-gray-600 font-poppins leading-relaxed mb-4" v-if="message">{{ message }}</p>
                        <slot></slot>
                    </div>

                    <!-- Footer -->
                    <div class="px-6 py-4 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row gap-3"
                        v-if="showFooter">
                        <button
                            class="flex-1 px-6 py-3 rounded-2xl font-semibold text-gray-500 hover:bg-gray-200 transition-all active:scale-95"
                            @click="close">
                            {{ cancelText }}
                        </button>
                        <button
                            class="flex-1 px-6 py-3 rounded-2xl font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95"
                            @click="confirm">
                            {{ confirmText }}
                        </button>
                    </div>
                </div>
            </Transition>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';

const props = defineProps({
    show: Boolean,
    title: { type: String, default: 'Alerta' },
    message: String,
    confirmText: { type: String, default: 'Aceptar' },
    cancelText: { type: String, default: 'Cancelar' },
    showFooter: { type: Boolean, default: true }
});

const emit = defineEmits(['update:show', 'confirm', 'cancel']);

const close = () => {
    emit('update:show', false);
    emit('cancel');
};

const confirm = () => {
    emit('confirm');
};

// Handle Escape key
const handleEsc = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && props.show) close();
};

onMounted(() => window.addEventListener('keydown', handleEsc));
onUnmounted(() => window.removeEventListener('keydown', handleEsc));
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-enter-from,
.scale-leave-to {
    transform: scale(0.9);
}

.animate-fade-in {
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
