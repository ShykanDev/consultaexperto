<template>
    <section class="fixed top-6 inset-x-4 md:inset-x-8 z-50 flex justify-center">
        <nav
            class="w-full max-w-7xl bg-white  backdrop-blur-2xl border border-slate-100/90 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-[2rem] px-6 md:px-10 h-20 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div
                    class="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <v-icon name="hi-sparkles" scale="1.2" />
                </div>
                <p
                    class="text-md font-normal font-poppins bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                    {{ pageTitle }}
                </p>
            </div>

            <div class="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                <RouterLink to="/home#all-experts" class="hover:text-blue-600 transition-colors active:text-blue-600"
                    active-class="text-blue-600 font-semibold">Especialidades</RouterLink>
                <RouterLink to="/home#how-it-works" class="hover:text-blue-600 transition-colors active:text-blue-600"
                    active-class="text-blue-600 font-semibold">Cómo funciona
                </RouterLink>
                <RouterLink to="/help" class="hover:text-blue-600 transition-colors active:text-blue-600"
                    active-class="text-blue-600 font-semibold">Ayuda
                </RouterLink>
                <RouterLink to="/client-appointments" class="hover:text-blue-600 transition-colors"
                    active-class="text-blue-600 font-semibold">Mis citas
                </RouterLink>
            </div>
        </nav>
    </section>
</template>

<script lang="ts" setup>

const props = defineProps({
    pageTitle: {
        type: String,
        required: true
    }
})
</script>

<style scoped></style>