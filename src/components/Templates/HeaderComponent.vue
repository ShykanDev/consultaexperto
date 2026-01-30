<template>
    <section
        class="fixed top-6 z-50 flex justify-center transition-all duration-700 ease-in-out w-full left-2 right-2 px-4">
        <nav
            class="w-full max-w-7xl bg-white/90 backdrop-blur-2xl border border-slate-100/90 shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-[2.5rem] px-6 md:px-10 h-20 flex items-center justify-between">

            <div class="flex items-center gap-3">
                <div
                    class="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200/50 hover:rotate-3 transition-transform">
                    <v-icon class="text-white" name="fa-users" scale="1.2" />
                </div>
                <p
                    class="text-md font-bold font-manrope bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                    {{ pageTitle }}
                </p>
            </div>

            <div class="flex items-center gap-3 bg-white rounded-full px-2  border border-blue-200">
                <span
                    class="text-sm md:text-lg font-semibold text-slate-500 bg-slate-50  py-2 rounded-full border border-slate-100 hidden sm:block  mr-5"
                    v-html="currentName" :key="currentName">
                </span>
            </div>

            <div class="hidden md:flex items-center gap-6 text-[15px] font-semibold text-slate-600">

                <div v-if="!isAuth" class="relative group">
                    <button
                        class="px-4 py-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
                        Iniciar sesión
                    </button>

                    <div
                        class="absolute hidden group-hover:flex flex-col space-y-2  left-1/2 -translate-x-1/2 bg-white border border-slate-100 shadow-2xl rounded-2xl p-2 min-w-[160px] z-[60] animate-in fade-in slide-in-from-top-2 duration-200">
                        <RouterLink @click="loginRoleStore.setRole('user')"
                            class="px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-center"
                            active-class="text-blue-600 bg-blue-50" to="/login#user">Usuario</RouterLink>
                        <RouterLink @click="loginRoleStore.setRole('expert')"
                            class="px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-center"
                            active-class="text-blue-600 bg-blue-50" to="/login#expert">Experto</RouterLink>
                        <RouterLink @click="loginRoleStore.setRole('admin')"
                            class="px-4 py-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors text-center"
                            active-class="text-blue-600 bg-blue-50" to="/login#admin">Admin</RouterLink>
                    </div>
                </div>

                <RouterLink v-if="!isAuth" to="/register"
                    class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all"
                    active-class="text-blue-600 font-bold bg-blue-50">Registrarse</RouterLink>

                <RouterLink v-if="isClient" to="/home#all-experts"
                    class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all"
                    active-class="text-blue-600 font-bold bg-blue-50">Expertos</RouterLink>

                <RouterLink v-if="isClient" to="/client-appointments"
                    class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all"
                    active-class="text-blue-600 font-bold bg-blue-50">Mis citas</RouterLink>

                <RouterLink v-if="!isAdmin" to="/help"
                    class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all"
                    active-class="text-blue-600 font-bold bg-blue-50">Ayuda</RouterLink>

                <RouterLink v-if="isAdmin" to="/expert-list-admin"
                    class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all"
                    active-class="text-blue-600 font-bold bg-blue-50">Panel principal</RouterLink>

                <RouterLink v-if="isAdmin" to="/users-list-admin"
                    class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all"
                    active-class="text-blue-600 font-bold bg-blue-50">Lista de Usuarios</RouterLink>

                <RouterLink v-if="isAdmin" to="/create-expert"
                    class="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-blue-50 transition-all"
                    active-class="text-blue-600 font-bold bg-blue-50">Crear experto</RouterLink>

                <RouterLink v-if="isAuth" to="/logout"
                    class="px-3 py-2 rounded-xl hover:text-red-600 hover:bg-red-50 transition-all"
                    active-class="text-red-600 font-bold bg-red-50">Ajustes</RouterLink>
            </div>
        </nav>
    </section>
</template>

<script lang="ts" setup>
import { authStore as authStorePinia } from '@/store/auth';
import { useLoginRoleStore } from '@/store/loginRole';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const authStore = authStorePinia();
const isAuth = authStore.getIsAuth;
const isAdmin = authStore.getIsAdmin && authStore.isAuth;
const isClient = authStore.getIsClient && authStore.isAuth;

const props = defineProps({
    pageTitle: {
        type: String,
        required: true
    }
})

const currentRoute = useRoute();


const iconList = {
    '/home': 'fa-users',
    '/client-appointments': 'fa-calendar',
    '/appointments': 'fa-calendar',
    '/help': 'fa-question-circle',
    '/expert-info-fixed': 'fa-user',
    '/account': 'fa-user',
    '/expert-appointments': 'fa-calendar',
    '/expert-profile': 'fa-user'
};



const names = [
    '<span class="animate-fade-down animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-sky-700 animate-fade animate-duration-300 animate-delay-200">gratis</span>' +
    '<span class="animate-fade animate-duration-300 animate-delay-300">en</span>' +
    '<span class="animate-fade animate-duration-300 animate-delay-500">linea</span>' +
    '<span class="text-sky-500 animate-fade animate-duration-300 animate-delay-500">.com</span>',

    '<span class="animate-fade animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-sky-700 animate-fade animate-duration-300 animate-delay-200">experto</span>' +
    '<span class="text-sky-500 animate-fade animate-duration-300 animate-delay-300">.com</span>',

    '<span class="animate-fade-down animate-delay-100">consulta</span>' +
    '<span class="text-sky-700 animate-fade animate-delay-200">especializada</span>' +
    '<span class="text-sky-500 animate-fade animate-delay-300">.com</span>'
];

let timeoutId: any = null;
const currentName = ref<string>(names[0]);

const animateNames = () => {
    timeoutId = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * names.length);
        currentName.value = names[randomIndex];
    }, 2000);
};

onMounted(() => {
    animateNames();
});

onUnmounted(() => {
    clearInterval(timeoutId);
});

//A1 Handler
const loginRoleStore = useLoginRoleStore();

</script>

<style scoped></style>