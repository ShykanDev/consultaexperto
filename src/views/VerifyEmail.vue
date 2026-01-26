<template>
    <HeaderComponent :pageTitle="pageTitle" />

    <h5 v-if="status === 'Loading'" class="text-center mt-32 text-xl text-gray-600">Cargando Información...</h5>

    <section class="mt-32">
        <article class="bg-background-light font-poppins min-h-screen flex flex-col font-display items-center">

            <!-- Success State (Generic for all action types) -->
            <section v-if="status === 'Success'"
                class="min-h-[80vh] items-center justify-center p-4 md:p-8 lg:p-12 bg-gray-50/50">
                <div
                    class="max-w-6xl w-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-blue-100/60 border border-gray-100">

                    <div
                        class="w-full md:w-[45%] bg-gradient-to-br from-[#F1F7FF] to-[#E2EFFF] flex flex-col items-center justify-center p-12 lg:p-20 relative overflow-hidden">

                        <div class="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/60 rounded-full blur-3xl"></div>
                        <div class="absolute bottom-[-5%] right-[-5%] w-48 h-48 bg-blue-200/40 rounded-full blur-xl">
                        </div>

                        <div class="relative z-10 w-full max-w-[400px] aspect-square flex items-center justify-center">
                            <div class="absolute inset-0 bg-blue-500/10 rounded-full"></div>

                            <div class="relative group">
                                <div
                                    class="w-56 h-56 lg:w-64 lg:h-64 bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] flex items-center justify-center border border-white transform transition-transform hover:scale-105 duration-500">
                                    <v-icon :name="successContent.icon" scale="6" class="text-blue-500" />

                                    <div
                                        class="absolute -top-6 -right-6 bg-blue-500 text-white rounded-2xl p-4 shadow-xl border-4 border-white transform rotate-12">
                                        <v-icon name="bi-patch-check-fill" scale="2" />
                                    </div>
                                </div>

                                <div
                                    class="absolute -bottom-8 -left-8 w-20 h-20 bg-blue-400/20 blur-md rounded-3xl -z-10 rotate-12">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-[55%] flex flex-col justify-center p-10 lg:p-24 bg-white">
                        <div class="max-w-lg mx-auto md:mx-0 space-y-8">

                            <div class="space-y-5">
                                <span
                                    class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 text-sm font-bold rounded-full tracking-wide">
                                    <v-icon name="bi-patch-check-fill" scale="2" />
                                    {{ successContent.badge }}
                                </span>

                                <h1
                                    class="text-[#111418] tracking-tight text-4xl lg:text-5xl font-extrabold leading-[1.15]">
                                    {{ successContent.title }} <br />
                                    <span class="text-blue-500 font-bold font-poppins">{{ successContent.subtitle
                                    }}</span>
                                </h1>

                                <p class="text-gray-500 text-xl font-normal leading-relaxed">
                                    {{ successContent.description }}
                                </p>
                            </div>

                            <div class="flex flex-col sm:flex-row gap-5 pt-4">
                                <RouterLink :to="successContent.primaryAction.route"
                                    class="flex-1 min-w-[200px] h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-blue-700/30 flex items-center justify-center gap-2">
                                    <span>{{ successContent.primaryAction.label }}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </RouterLink>
                            </div>

                            <div class="pt-10 border-t border-gray-100 flex items-center gap-4">
                                <div
                                    class="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <p class="text-base text-gray-500">
                                    ¿Tiene dudas? <RouterLink to="/help"
                                        class="text-blue-500 font-bold hover:underline">Contacte
                                        a soporte</RouterLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Password Reset Form -->
            <section v-if="status === 'ResetPassword'"
                class="min-h-[80vh] flex items-center justify-center p-4 md:p-8 lg:p-12 bg-gray-50/50">
                <div
                    class="max-w-6xl w-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-purple-100/60 border border-gray-100">

                    <div
                        class="w-full md:w-[45%] bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] flex flex-col items-center justify-center p-12 lg:p-20 relative overflow-hidden">

                        <div class="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/60 rounded-full blur-3xl"></div>
                        <div class="absolute bottom-[-5%] right-[-5%] w-48 h-48 bg-purple-200/40 rounded-full blur-xl">
                        </div>

                        <div class="relative z-10 w-full max-w-[400px] aspect-square flex items-center justify-center">
                            <div class="absolute inset-0 bg-purple-500/10 rounded-full"></div>

                            <div class="relative group">
                                <div
                                    class="w-56 h-56 lg:w-64 lg:h-64 bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] flex items-center justify-center border border-white transform transition-transform hover:scale-105 duration-500">
                                    <v-icon name="md-lockreset-round" scale="6" class="text-purple-500" />

                                    <div
                                        class="absolute -top-6 -right-6 bg-purple-500 text-white rounded-2xl p-4 shadow-xl border-4 border-white transform rotate-12">
                                        <v-icon name="md-vpnkey-round" scale="2" />
                                    </div>
                                </div>

                                <div
                                    class="absolute -bottom-8 -left-8 w-20 h-20 bg-purple-400/20 blur-md rounded-3xl -z-10 rotate-12">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-[55%] flex flex-col justify-center p-10 lg:p-24 bg-white">
                        <div class="max-w-lg mx-auto md:mx-0 space-y-8">

                            <div class="space-y-5">
                                <span
                                    class="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 text-sm font-bold rounded-full tracking-wide">
                                    <v-icon name="md-lockopen-round" scale="2" />
                                    RESTABLECER CONTRASEÑA
                                </span>

                                <h1
                                    class="text-[#111418] tracking-tight text-4xl lg:text-5xl font-extrabold leading-[1.15]">
                                    Nueva Contraseña <br />
                                    <span class="text-purple-500 font-bold font-poppins">Ingrese su nueva clave</span>
                                </h1>

                                <p class="text-gray-500 text-xl font-normal leading-relaxed">
                                    Elija una contraseña segura con al menos 6 caracteres. Asegúrese de recordarla para
                                    futuros accesos.
                                </p>
                            </div>

                            <form @submit.prevent="handlePasswordReset" class="space-y-6">
                                <div class="space-y-2">
                                    <label for="newPassword" class="block text-sm font-bold text-gray-700">
                                        Nueva Contraseña
                                    </label>
                                    <div class="relative">
                                        <input id="newPassword" v-model="newPassword"
                                            :type="showPassword ? 'text' : 'password'" required minlength="6"
                                            class="w-full h-14 px-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-lg"
                                            placeholder="Mínimo 6 caracteres" />
                                        <button type="button" @click="showPassword = !showPassword"
                                            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            <v-icon
                                                :name="showPassword ? 'md-visibilityoff-outlined' : 'md-visibility-outlined'"
                                                scale="1.5" />
                                        </button>
                                    </div>
                                </div>

                                <div class="space-y-2">
                                    <label for="confirmPassword" class="block text-sm font-bold text-gray-700">
                                        Confirmar Contraseña
                                    </label>
                                    <div class="relative">
                                        <input id="confirmPassword" v-model="confirmPassword"
                                            :type="showConfirmPassword ? 'text' : 'password'" required minlength="6"
                                            class="w-full h-14 px-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors text-lg"
                                            placeholder="Repita la contraseña" />
                                        <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                                            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                            <v-icon
                                                :name="showConfirmPassword ? 'md-visibilityoff-outlined' : 'md-visibility-outlined'"
                                                scale="1.5" />
                                        </button>
                                    </div>
                                </div>

                                <p v-if="passwordError" class="text-red-600 text-sm font-medium">
                                    {{ passwordError }}
                                </p>

                                <button type="submit" :disabled="isResettingPassword"
                                    class="w-full h-16 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-purple-500/30 flex items-center justify-center gap-2">
                                    <span v-if="!isResettingPassword">Restablecer Contraseña</span>
                                    <span v-else>Procesando...</span>
                                    <v-icon v-if="!isResettingPassword" name="md-lockopen-round" scale="1.5" />
                                </button>
                            </form>

                            <div class="pt-10 border-t border-gray-100 flex items-center gap-4">
                                <div
                                    class="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center border border-purple-100">
                                    <v-icon name="md-security-round" class="text-purple-400" scale="1.5" />
                                </div>
                                <p class="text-base text-gray-500">
                                    Su información está protegida y encriptada
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Error State (Generic for all action types) -->
            <section v-if="status === 'Error'"
                class="min-h-[80vh] flex items-center justify-center p-4 md:p-8 lg:p-12 bg-gray-50/50">
                <div
                    class="max-w-6xl w-full bg-white rounded-[2.5rem] overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-red-100/60 border border-gray-100">

                    <div
                        class="w-full md:w-[45%] bg-gradient-to-br from-[#FFF1F1] to-[#FFE2E2] flex flex-col items-center justify-center p-12 lg:p-20 relative overflow-hidden">

                        <div class="absolute top-[-10%] left-[-10%] w-64 h-64 bg-white/60 rounded-full blur-3xl"></div>
                        <div class="absolute bottom-[-5%] right-[-5%] w-48 h-48 bg-red-200/40 rounded-full blur-2xl">
                        </div>

                        <div class="relative z-10 w-full max-w-[400px] aspect-square flex items-center justify-center">
                            <div class="absolute inset-0 bg-red-500/10 rounded-full animate-pulse"></div>

                            <div class="relative group">
                                <div
                                    class="w-56 h-56 lg:w-64 lg:h-64 bg-white rounded-[2.5rem] shadow-[0_25px_50px_-12px_rgba(220,38,38,0.15)] flex items-center justify-center border border-white transform transition-transform hover:scale-105 duration-500">
                                    <v-icon :name="errorContent.icon" scale="6" class="text-red-600" />

                                    <div
                                        class="absolute animate-wiggle -top-6 -right-6 bg-red-600 text-white rounded-2xl p-4 shadow-xl border-4 border-white transform -rotate-12 animate-delay-150">
                                        <v-icon name="bi-exclamation-octagon-fill" scale="2" class="text-white" />
                                    </div>
                                </div>

                                <div
                                    class="absolute -bottom-8 -left-8 w-20 h-20 bg-red-400/20 backdrop-blur-md rounded-3xl -z-10 -rotate-6">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-[55%] flex flex-col justify-center p-10 lg:p-24 bg-white">
                        <div class="max-w-lg mx-auto md:mx-0 space-y-8">

                            <div class="space-y-5">
                                <span
                                    class="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 text-sm font-bold rounded-full tracking-wide">
                                    <v-icon name="bi-exclamation-octagon-fill" scale="2" class="text-red-600" />
                                    {{ errorContent.badge }}
                                </span>

                                <h1
                                    class="text-[#111418] tracking-tight text-4xl lg:text-5xl font-extrabold leading-[1.15]">
                                    {{ errorContent.title }} <br />
                                    <span class="text-red-600">{{ errorContent.subtitle }}</span>
                                </h1>

                                <p class="text-gray-500 text-xl font-normal leading-relaxed">
                                    {{ errorContent.description }}
                                </p>
                            </div>

                            <div class="flex flex-col sm:flex-row gap-5 pt-4">
                                <RouterLink to="/"
                                    class="flex-1 min-w-[200px] h-16 bg-white border-2 border-gray-200 text-gray-800 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                                    <span>Volver al Inicio</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </RouterLink>
                            </div>

                            <div class="pt-10 border-t border-gray-100 flex items-center gap-4">
                                <div
                                    class="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center border border-red-50">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <p class="text-base text-gray-500">
                                    ¿Problemas persistentes? <RouterLink to="/help"
                                        class="text-red-600 font-bold hover:underline">Contacta con soporte</RouterLink>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </article>
    </section>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import HeaderComponent from '@/components/Templates/HeaderComponent.vue';
import { onMounted, ref, computed } from 'vue';
import { applyActionCode, verifyPasswordResetCode, confirmPasswordReset } from 'firebase/auth';
import { auth as authFirebase } from '@/firebase';

// Types for different action modes
type ActionMode = 'verifyEmail' | 'resetPassword' | 'recoverEmail';
type Status = 'Success' | 'Error' | 'Loading' | 'ResetPassword';

// Reactive state
const status = ref<Status>('Loading');
const route = useRoute();

// Get action parameters from URL
const mode = route.query.mode as ActionMode;
const oobCode = route.query.oobCode as string;

// Password reset form state
const newPassword = ref('');
const confirmPassword = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const passwordError = ref('');
const isResettingPassword = ref(false);

// Firebase auth instance
const auth = authFirebase;

// Dynamic page title based on mode
const pageTitle = computed(() => {
    switch (mode) {
        case 'verifyEmail':
            return 'Verificar Correo';
        case 'resetPassword':
            return 'Restablecer Contraseña';
        case 'recoverEmail':
            return 'Recuperar Correo';
        default:
            return 'Verificación';
    }
});

// Dynamic success content based on action mode
const successContent = computed(() => {
    switch (mode) {
        case 'verifyEmail':
            return {
                icon: 'md-markemailread-twotone',
                badge: 'PROCESO COMPLETADO',
                title: '¡Todo listo!',
                subtitle: 'Su cuenta ha sido activada',
                description: 'Ya tiene acceso total a nuestra plataforma. Comience a explorar su panel o personalice su perfil para una mejor experiencia.',
                primaryAction: {
                    label: 'Ir al Inicio',
                    route: '/'
                }
            };
        case 'resetPassword':
            return {
                icon: 'md-lockopen-round',
                badge: 'CONTRASEÑA ACTUALIZADA',
                title: '¡Contraseña Cambiada!',
                subtitle: 'Su clave ha sido actualizada',
                description: 'Su contraseña se ha restablecido correctamente. Ya puede iniciar sesión con su nueva contraseña.',
                primaryAction: {
                    label: 'Iniciar Sesión',
                    route: '/login'
                }
            };
        case 'recoverEmail':
            return {
                icon: 'md-markunread-outlined',
                badge: 'CORREO RECUPERADO',
                title: '¡Correo Restaurado!',
                subtitle: 'Su email ha sido recuperado',
                description: 'Su dirección de correo electrónico ha sido restaurada exitosamente.',
                primaryAction: {
                    label: 'Ir al Inicio',
                    route: '/'
                }
            };
        default:
            return {
                icon: 'bi-check-circle-fill',
                badge: 'COMPLETADO',
                title: '¡Éxito!',
                subtitle: 'Operación completada',
                description: 'La operación se ha completado correctamente.',
                primaryAction: {
                    label: 'Continuar',
                    route: '/'
                }
            };
    }
});

// Dynamic error content based on action mode
const errorContent = computed(() => {
    switch (mode) {
        case 'verifyEmail':
            return {
                icon: 'bi-envelope-x-fill',
                badge: 'ALGO SALIÓ MAL',
                title: '¡Lo sentimos!',
                subtitle: 'No pudimos verificar su cuenta',
                description: 'El enlace de verificación ha expirado o no es válido. Esto puede pasar si ya usó el enlace anteriormente o si ha pasado demasiado tiempo.'
            };
        case 'resetPassword':
            return {
                icon: 'md-lockperson-round',
                badge: 'ERROR DE VERIFICACIÓN',
                title: '¡Enlace Inválido!',
                subtitle: 'No se pudo verificar el enlace',
                description: 'El enlace para restablecer la contraseña ha expirado o no es válido. Por favor, solicite un nuevo enlace de restablecimiento.'
            };
        case 'recoverEmail':
            return {
                icon: 'bi-envelope-slash-fill',
                badge: 'ERROR DE RECUPERACIÓN',
                title: '¡Error!',
                subtitle: 'No se pudo recuperar el correo',
                description: 'El enlace de recuperación ha expirado o no es válido. Por favor, intente nuevamente.'
            };
        default:
            return {
                icon: 'bi-x-circle-fill',
                badge: 'ERROR',
                title: '¡Error!',
                subtitle: 'Algo salió mal',
                description: 'Ha ocurrido un error. Por favor, intente nuevamente más tarde.'
            };
    }
});

/**
 * Verify email address using Firebase action code
 */
const verifyEmail = async () => {
    if (!oobCode) {
        status.value = 'Error';
        return;
    }

    try {
        await applyActionCode(auth, oobCode);
        console.log('Email verified successfully');
        status.value = 'Success';
    } catch (error) {
        console.error('Email verification error:', error);
        status.value = 'Error';
    }
};

/**
 * Verify password reset code and show reset form
 */
const verifyPasswordResetLink = async () => {
    if (!oobCode) {
        status.value = 'Error';
        return;
    }

    try {
        // Verify the password reset code is valid
        await verifyPasswordResetCode(auth, oobCode);
        console.log('Password reset code verified');
        status.value = 'ResetPassword';
    } catch (error) {
        console.error('Password reset verification error:', error);
        status.value = 'Error';
    }
};

/**
 * Handle password reset form submission
 */
const handlePasswordReset = async () => {
    // Reset error
    passwordError.value = '';

    // Validate passwords match
    if (newPassword.value !== confirmPassword.value) {
        passwordError.value = 'Las contraseñas no coinciden';
        return;
    }

    // Validate password length
    if (newPassword.value.length < 6) {
        passwordError.value = 'La contraseña debe tener al menos 6 caracteres';
        return;
    }

    isResettingPassword.value = true;

    try {
        // Confirm the password reset
        await confirmPasswordReset(auth, oobCode, newPassword.value);
        console.log('Password reset successfully');
        status.value = 'Success';

        // Clear form
        newPassword.value = '';
        confirmPassword.value = '';
    } catch (error: any) {
        console.error('Password reset error:', error);

        // Handle specific error cases
        if (error.code === 'auth/weak-password') {
            passwordError.value = 'La contraseña es muy débil. Use una contraseña más segura.';
        } else if (error.code === 'auth/expired-action-code') {
            passwordError.value = 'El enlace ha expirado. Solicite un nuevo enlace.';
            setTimeout(() => {
                status.value = 'Error';
            }, 3000);
        } else {
            passwordError.value = 'Error al restablecer la contraseña. Intente nuevamente.';
        }
    } finally {
        isResettingPassword.value = false;
    }
};

/**
 * Recover email address
 */
const recoverEmail = async () => {
    if (!oobCode) {
        status.value = 'Error';
        return;
    }

    try {
        await applyActionCode(auth, oobCode);
        console.log('Email recovered successfully');
        status.value = 'Success';
    } catch (error) {
        console.error('Email recovery error:', error);
        status.value = 'Error';
    }
};

/**
 * Handle different action modes
 */
const handleAction = async () => {
    if (!oobCode) {
        console.error('No action code provided');
        status.value = 'Error';
        return;
    }

    switch (mode) {
        case 'verifyEmail':
            await verifyEmail();
            break;
        case 'resetPassword':
            await verifyPasswordResetLink();
            break;
        case 'recoverEmail':
            await recoverEmail();
            break;
        default:
            console.error('Unknown action mode:', mode);
            status.value = 'Error';
    }
};

// Execute action on component mount
onMounted(() => {
    handleAction();
});

</script>

<style scoped>
/* Add smooth transitions for form inputs */
input {
    transition: all 0.3s ease;
}

input:focus {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Wiggle animation for error icon */
@keyframes wiggle {

    0%,
    100% {
        transform: rotate(-12deg);
    }

    25% {
        transform: rotate(-15deg);
    }

    75% {
        transform: rotate(-9deg);
    }
}

.animate-wiggle {
    animation: wiggle 1s ease-in-out infinite;
}

.animate-delay-150 {
    animation-delay: 150ms;
}
</style>