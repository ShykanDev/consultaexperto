<template>
    <footer class="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
        <div class="max-w-7xl mx-auto px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <!-- Brand Column -->
                <div class="space-y-6">
                    <div class="flex items-center gap-3">
                        <div
                            class="w-10 h-10 bg-blue-600 rounded-xl shadow-lg shadow-blue-600/20 flex items-center justify-center">
                            <v-icon name="hi-sparkles" fill="white" scale="1.0" />
                        </div>
                        <span class="text-xl font-black text-slate-900 tracking-tight">Consulta Experto</span>
                    </div>
                    <p class="text-slate-500 text-sm leading-relaxed max-w-sm">
                        Conectamos a personas con expertos verificados para resolver dudas en tiempo real.
                        Profesionalismo y confianza en cada consulta.
                    </p>
                </div>

                <!-- Navigation Groups -->
                <div v-for="group in footerGroups" :key="group.title" class="space-y-6">
                    <h4 class="font-bold text-slate-900 text-sm uppercase tracking-wider">{{ group.title }}</h4>
                    <ul class="space-y-3">
                        <li v-for="link in group.links" :key="link.label">
                            <router-link :to="link.route"
                                class="text-slate-500 hover:text-blue-600 text-sm font-medium transition-colors duration-200 flex items-center gap-2 group">
                                <span
                                    class="w-1.5 h-1.5 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                {{ link.label }}
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Bottom Section -->
            <div class="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
                <p class="text-sm font-medium text-slate-400">
                    &copy; 2026 Consulta Experto. Todos los derechos reservados.
                </p>

                <div class="flex gap-4">
                    <a v-for="social in socialIcons" :key="social.name" href="#"
                        class="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-600 hover:shadow-md transition-all duration-300">
                        <v-icon :name="social.icon" scale="1.0" />
                    </a>
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const footerGroups = ref([
    {
        title: 'Plataforma',
        links: [
            { label: 'Inicio', route: '/home' },
            { label: 'Expertos', route: '/experts' },
            { label: 'Mi Cuenta', route: '/account' },
        ]
    },
    {
        title: 'Legal',
        links: [
            { label: 'Términos y Condiciones', route: '/terms' },
            { label: 'Política de Privacidad', route: '/privacy-policy' },
            { label: 'Trabaja con nosotros', route: '/hiring' },
        ]
    },
    {
        title: 'Soporte',
        links: [
            { label: 'Centro de Ayuda', route: '/help' },
            { label: 'Preguntas Frecuentes', route: '/help' },
            { label: 'Contacto', route: '/help' }
        ]
    }
]);

const socialIcons = [
    { name: 'facebook', icon: 'fa-facebook-f' },
    { name: 'twitter', icon: 'fa-twitter' },
    { name: 'instagram', icon: 'fa-instagram' },
    { name: 'linkedin', icon: 'fa-linkedin-in' }
];
</script>
