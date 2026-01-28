<template>
    <footer class="bg-white border-t border-slate-100 pt-24 pb-12">
        <div class="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div class="space-y-6">
                <div class="flex items-center gap-3 justify-center md:justify-start">
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <v-icon name="hi-sparkles" fill="white" scale="0.8" />
                    </div>
                    <span class="text-xl font-black text-slate-900">Consulta Experto</span>
                </div>
                <p class="text-slate-500 font-medium">Asesoría profesional al alcance de un clic. Conectamos
                    expertos con soluciones reales.</p>
            </div>

            <div v-for="group in footerGroups" :key="group.title" class="space-y-6">
                <h4 class="font-bold text-slate-900 uppercase tracking-widest text-xs">{{ group.title }}</h4>
                <ul class="space-y-4">
                    <li v-for="link in group.links" :key="link.label">
                        <router-link :to="link.route"
                            class="text-slate-500 hover:text-blue-600 font-medium transition-colors">
                            {{ link.label }}
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>

        <div
            class="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-slate-50 flex flex-col md:row items-center justify-between gap-6">
            <p class="text-sm font-bold text-slate-400">© 2026 Consulta Experto. Todos los derechos reservados.</p>
            <div class="flex gap-6">
                <v-icon v-for="social in socialIcons" :key="social" :name="social"
                    class="text-slate-400 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const footerGroups = ref([
    {
        title: 'Empresa',
        links: [
            { label: 'Inicio', route: '/home' },
            { label: 'Especialidades', route: '/home#all-experts' }, // Anchor handled by router usually needs care, but standard string works
        ]
    },
    {
        title: 'Servicios',
        links: [
            { label: 'Mis Citas', route: '/client-appointments' },
            { label: 'Cuenta', route: '/account' },
        ]
    },
    {
        title: 'Soporte',
        links: [
            { label: 'Centro de ayuda', route: '/help' },
            { label: 'Contacto', route: '/help' },
            { label: 'FAQ', route: '/help' }
        ]
    }
]);

const socialIcons = ['fa-facebook', 'fa-twitter', 'fa-instagram', 'fa-linkedin'];
</script>
