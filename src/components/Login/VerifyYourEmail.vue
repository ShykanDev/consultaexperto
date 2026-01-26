<template>
    <section class="flex flex-1 items-center justify-center p-6 min-h-[80vh] font-poppins">
        <div
            class="max-w-[500px] w-full bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100">

            <div class="flex w-full justify-center mb-8">
                <div class="relative w-32 h-32 flex items-center justify-center bg-blue-50 rounded-full">
                    <div class="absolute inset-0 bg-blue-100/40 rounded-full animate-ping opacity-75"></div>

                    <v-icon name="hi-mail-open" class="relative w-16 h-16 text-primary text-blue-500" scale="4" />

                    <div
                        class="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-2 shadow-lg border-4 border-white">
                        <v-icon name="hi-check" scale="1.2" />
                    </div>
                </div>
            </div>

            <div class="text-center mb-8">
                <h1 class="text-blue-900 text-3xl font-semibold tracking-tight mb-3">
                    Verifique su correo
                </h1>
                <p class="text-slate-500 text-base leading-relaxed px-2">
                    Hemos enviado un enlace seguro a su correo, por favor verifique su correo, si no lo encuentra en su
                    bandeja de entrada, verifique su carpeta de spam.
                </p>
            </div>

            <div class="flex flex-col gap-4 items-center w-full">
                <button
                    class="group flex w-full items-center bg-blue-500 justify-center gap-2 rounded-2xl h-14 bg-primary text-white text-base font-bold shadow-lg shadow-primary/25 hover:bg-primary-hover active:scale-[0.97] transition-all cursor-pointer">
                    Ya lo verifiqué
                    <v-icon name="hi-check" class="group-hover:rotate-180 transition-transform duration-500" />
                </button>

                <RouterLink to="/login">
                    <button
                        class="text-slate-500 hover:text-primary text-sm font-semibold transition-colors flex items-center gap-2 group">
                        <v-icon name="hi-arrow-left" scale="0.9" />
                        Volver

                    </button>
                </RouterLink>

                <button @click="resendVerificationEmail"
                    class="text-slate-500 hover:text-primary text-sm font-semibold transition-colors flex items-center gap-2 group">
                    <v-icon name="md-refresh" scale="0.9" />
                    Reenviar correo

                </button>
            </div>

            <div class="mt-10 pt-8 border-t border-slate-100 text-center">
                <p class="text-slate-400 text-sm font-medium">
                    ¿No encuentra el correo? Revise su carpeta de spam o
                    <RouterLink to="/help"
                        class="text-primary font-bold hover:text-primary-hover transition-colors inline-flex items-center gap-1">
                        contacte a soporte
                        <v-icon name="hi-external-link" scale="0.8" />
                    </RouterLink>
                </p>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { auth as authFirebase } from '@/firebase'
import { sendEmailVerification } from 'firebase/auth';

const props = defineProps({
    email: {
        type: String,
        required: true
    }
})

const auth = authFirebase;

const resendVerificationEmail = async () => {
    try {
        await sendEmailVerification(auth.currentUser!);
    } catch (error) {
        console.error(error);
    }
}

</script>

<style scoped></style>