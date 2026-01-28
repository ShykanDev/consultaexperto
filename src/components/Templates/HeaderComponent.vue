<template>
    <section class="fixed top-6 z-50 flex justify-center transition-all duration-700 ease-in-out w-full left-2 right-2">
        <nav
            class="w-full  bg-white  backdrop-blur-2xl border border-slate-100/90 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-[2rem] px-6 md:px-10 h-20 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div
                    class="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                    <v-icon class="text-white" name="fa-users" scale="1.2" />
                </div>
                <p
                    class="text-md font-normal font-poppins bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                    {{ pageTitle }}
                </p>
            </div>


            <div class="flex items-center gap-3">
                <span class="text-xl font-semibold text-slate-600 hidden sm:block  max-w-[180px] mr-5"
                    v-html="currentName" :key="currentName">
                </span>
            </div>

            <div class="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                <RouterLink v-if="!isAuth" to="/login"
                    class="hover:text-blue-600 transition-colors active:text-blue-600"
                    active-class="text-blue-600 font-semibold">Iniciar sesión</RouterLink>
                <RouterLink v-if="!isAuth" to="/register"
                    class="hover:text-blue-600 transition-colors active:text-blue-600"
                    active-class="text-blue-600 font-semibold">Registrarse</RouterLink>
                <RouterLink v-if="isClient" to="/home#all-experts"
                    class="hover:text-blue-600 transition-colors active:text-blue-600"
                    active-class="text-blue-600 font-semibold">Especialidades</RouterLink>
                <RouterLink v-if="isClient" to="/home#how-it-works"
                    class="hover:text-blue-600 hidden transition-colors active:text-blue-600"
                    active-class="text-blue-600 font-semibold">Cómo funciona
                </RouterLink>
                <RouterLink v-if="!isAdmin" to="/help"
                    class="hover:text-blue-600 transition-colors active:text-blue-600"
                    active-class="text-blue-600 font-semibold">Ayuda
                </RouterLink>
                <RouterLink v-if="isClient" to="/client-appointments" class="hover:text-blue-600 transition-colors"
                    active-class="text-blue-600 font-semibold">Mis citas
                </RouterLink>



                <!--Admin Navs-->

                <!--Home-->
                <RouterLink v-if="isAdmin" to="/expert-list-admin"
                    class="hover:text-blue-600 transition-colors active:text-blue-600"
                    active-class="text-blue-600 font-semibold">Panel principal</RouterLink>

                <!-- Expert Preview-->
                <RouterLink v-if="isAdmin" to="/users-list-admin"
                    class="hover:text-blue-600 transition-colors active:text-blue-600"
                    active-class="text-blue-600 font-semibold">Lista de Usuarios</RouterLink>

                <!-- Create Expert -->
                <RouterLink v-if="isAdmin" to="/create-expert"
                    class="hover:text-blue-600 transition-colors active:text-blue-600"
                    active-class="text-blue-600 font-semibold">Crear experto</RouterLink>


                <!--Logout -->
                <RouterLink v-if="isAuth" to="/logout" class="hover:text-blue-600 transition-colors"
                    active-class="text-blue-600 font-semibold">Cerrar sesión
                </RouterLink>
            </div>
        </nav>
    </section>
</template>

<script lang="ts" setup>
import { authStore as authStorePinia } from '@/store/auth';
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

</script>

<style scoped></style>