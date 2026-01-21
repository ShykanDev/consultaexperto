<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 antialiased">
        <!-- Header moderno glass -->
        <header class="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-blue-100/30 shadow-sm">
            <nav class="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
                <h1
                    class="text-2xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent tracking-tight">
                    Expertos
                </h1>
                <div class="flex items-center gap-4">
                    <!-- Puedes agregar menú o login aquí si lo necesitas -->
                </div>
            </nav>
        </header>

        <main class="px-6 lg:px-8 py-10 space-y-16">
            <!-- Hero Section – más limpia y profesional -->
            <section class="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-100/20">
                <img class="absolute inset-0 w-full h-full object-cover" src="../assets/img/vectorExperts.jpeg"
                    alt="Background" />
                <div class="absolute inset-0 bg-gradient-to-t from-blue-950/70 via-blue-900/40 to-transparent"></div>

                <div class="relative z-10 px-8 py-16 md:py-24 flex flex-col gap-6 max-w-3xl">
                    <span
                        class="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/90 text-white text-sm font-semibold rounded-full backdrop-blur-sm w-fit">
                        #1 Plataforma de Expertos Verificados
                    </span>
                    <h1 class="text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight">
                        Conecta con expertos <br class="hidden sm:block" />de élite en minutos
                    </h1>
                    <p class="text-lg md:text-xl text-blue-100 max-w-2xl">
                        Asesoramiento profesional personalizado en negocios, salud, legal, arquitectura y más.
                    </p>
                    <button @click="toggleExpertPopup('open')"
                        class="w-fit mt-4 px-8 py-4 bg-white text-blue-900 font-bold rounded-xl shadow-lg hover:bg-blue-50 hover:shadow-xl transition-all text-lg">
                        Ver Expertos Disponibles
                    </button>
                </div>
            </section>

            <!-- Why Choose Us – bento grid style -->
            <section class="space-y-8">
                <h2 class="text-3xl md:text-4xl font-bold text-center text-gray-900">
                    ¿Por qué elegirnos?
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        class="bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group">
                        <div
                            class="w-14 h-14 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                            <v-icon name="md-checkcircle-outline" scale="2" />
                        </div>
                        <h3 class="text-xl font-bold mb-2">Profesionales Verificados</h3>
                        <p class="text-gray-600">Revisión manual y certificación para cada experto.</p>
                    </div>

                    <div
                        class="bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group">
                        <div
                            class="w-14 h-14 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                            <v-icon name="md-lockclosed-outline" scale="2" />
                        </div>
                        <h3 class="text-xl font-bold mb-2">Plataforma 100% Segura</h3>
                        <p class="text-gray-600">Encriptación avanzada y pagos protegidos.</p>
                    </div>

                    <div
                        class="bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group">
                        <div
                            class="w-14 h-14 rounded-xl bg-blue-100/50 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                            <v-icon name="hi-sparkles" scale="2" />
                        </div>
                        <h3 class="text-xl font-bold mb-2">Calidad Garantizada</h3>
                        <p class="text-gray-600">Asesorías de alto nivel con satisfacción asegurada.</p>
                    </div>
                </div>
            </section>

            <!-- Expertos en Acción – horizontal scroll moderno -->
            <section class="space-y-6">
                <div class="flex items-center justify-between">
                    <h2 class="text-3xl font-bold text-gray-900">Expertos en Acción</h2>
                </div>
                <div class="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide">
                    <div v-for="(item, i) in [
                        { img: '../assets/img/lawyer.webp', cat: 'Negocios', title: 'Estrategia Corporativa', desc: 'Planificación y crecimiento empresarial.' },
                        { img: '../assets/img/doctorTeal.webp', cat: 'Salud', title: 'Consulta Médica', desc: 'Asesoramiento confiable y especializado.' },
                        { img: '../assets/img/constructor.webp', cat: 'Arquitectura', title: 'Diseño & Construcción', desc: 'Proyectos innovadores y sostenibles.' }
                    ]" :key="i"
                        class="flex-none w-80 md:w-96 snap-center bg-white rounded-2xl overflow-hidden border border-blue-100 shadow-md hover:shadow-xl transition-all">
                        <img :src="item.img" class="w-full h-48 object-cover" />
                        <div class="p-6">
                            <div
                                class="flex items-center gap-2 text-blue-600 text-sm font-semibold uppercase tracking-wide mb-2">
                                <v-icon
                                    :name="i === 0 ? 'fa-briefcase' : i === 1 ? 'fa-user-md' : 'md-architecture-sharp'" />
                                {{ item.cat }}
                            </div>
                            <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
                            <p class="text-gray-600">{{ item.desc }}</p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Más Consultados – grid clean -->
            <section class="space-y-6">
                <h2 class="text-3xl font-bold text-gray-900">Más Consultados</h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div v-for="(item, i) in [
                        { title: 'Importación y Exportación', sub: 'Logística y Aduanas' },
                        { title: 'Asesoramiento Legal', sub: 'Derecho Civil & Corporativo' },
                        { title: 'Medicina', sub: 'Consulta Especializada' }
                    ]" :key="i"
                        class="bg-white border border-blue-100 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-lg transition-all">
                        <div class="flex items-center gap-4">
                            <!-- Puedes mantener o reemplazar las imágenes de background -->
                            <div
                                class="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                                {{ item.title.charAt(0) }}
                            </div>
                            <div>
                                <h3 class="font-bold text-lg">{{ item.title }}</h3>
                                <p class="text-sm text-gray-600">{{ item.sub }}</p>
                            </div>
                        </div>
                        <button @click="getExpertSelection(item.title)"
                            class="mt-auto w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors">
                            Consultar Ahora
                        </button>
                    </div>
                </div>
            </section>

            <!-- Áreas de Especialización – usando tu componente -->
            <section class="space-y-6">
                <h2 class="text-3xl font-bold text-gray-900">Áreas de Especialización</h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <SelectExpertCard v-for="expert in experts" :key="expert.name" :name="expert.name"
                        :icon="expert.icon" :summary="expert.summary" @select="getExpertSelection(expert.name)"
                        :data-cy="`expert-card-${expert.name}`" />
                </div>
            </section>

            <!-- Testimonials – scroll horizontal elegante -->
            <section class="space-y-6 bg-blue-50/50 -mx-6 px-6 py-12 rounded-3xl">
                <div class="text-center space-y-3">
                    <h2 class="text-3xl font-bold text-gray-900">Lo que dicen nuestros clientes</h2>
                    <p class="text-gray-600">Experiencias reales de quienes ya confiaron en nosotros.</p>
                </div>
                <div class="flex overflow-x-auto gap-6 pb-6 snap-x snap-mandatory scrollbar-hide">
                    <div v-for="(t, i) in testimonials" :key="i"
                        class="flex-none w-80 md:w-96 snap-center bg-white p-6 rounded-2xl border border-blue-100 shadow-md">
                        <div class="flex text-yellow-400 mb-4">
                            <v-icon name="io-star" v-for="n in 5" :key="n" scale="1.2" />
                        </div>
                        <p class="text-gray-700 italic mb-6">{{ t.text }}</p>
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 rounded-full bg-gray-200"
                                :style="{ backgroundImage: `url('${t.img}')`, backgroundSize: 'cover' }" />
                            <div>
                                <p class="font-bold">{{ t.name }}</p>
                                <p class="text-sm text-gray-500">{{ t.role }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Banners de anuncio – glass style -->
            <section class="grid md:grid-cols-2 gap-6">
                <div
                    class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-900 to-blue-900 text-white shadow-2xl">
                    <div class="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                    <div class="relative z-10 p-8 flex flex-col gap-4">
                        <span class="text-sm font-semibold text-indigo-200">Recomendado</span>
                        <h3 class="text-2xl font-bold">miexpareja.net</h3>
                        <p class="text-indigo-100">Asesoramiento en relaciones y bienestar emocional.</p>
                        <a href="https://miexpareja.net"
                            class="mt-4 w-fit px-6 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition">
                            Visitar Sitio
                        </a>
                    </div>
                </div>

                <div
                    class="relative rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-900 to-teal-900 text-white shadow-2xl">
                    <div class="absolute inset-0 bg-white/5 backdrop-blur-sm" />
                    <div class="relative z-10 p-8 flex flex-col gap-4">
                        <span class="text-sm font-semibold text-emerald-200">Recomendado</span>
                        <h3 class="text-2xl font-bold">miarrendatario.com</h3>
                        <p class="text-emerald-100">Soluciones para arrendadores y contratistas expertos.</p>
                        <a href="https://miarrendatario.com"
                            class="mt-4 w-fit px-6 py-3 bg-white text-emerald-900 font-bold rounded-xl hover:bg-emerald-50 transition">
                            Visitar Sitio
                        </a>
                    </div>
                </div>
            </section>

            <!-- Footer minimal -->
            <footer class="border-t border-gray-200 pt-12 pb-8 text-center md:text-left">
                <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    <div class="space-y-4">
                        <h4 class="font-bold text-lg">Legal</h4>
                        <div class="flex flex-col gap-2 text-gray-600">
                            <a href="#" class="hover:text-blue-600 transition">Política de privacidad</a>
                            <a href="#" class="hover:text-blue-600 transition">Términos y condiciones</a>
                        </div>
                    </div>
                    <div class="space-y-4">
                        <h4 class="font-bold text-lg">Contacto</h4>
                        <div class="flex flex-col gap-2 text-gray-600">
                            <router-link to="/login" class="hover:text-blue-600 transition">Soporte</router-link>
                            <router-link to="/register" class="hover:text-blue-600 transition">Únete como
                                experto</router-link>
                        </div>
                    </div>
                </div>
                <p class="mt-12 text-sm text-gray-500">
                    © 2026 Consulta Experto. Todos los derechos reservados.
                </p>
            </footer>

            <!-- Modal de expertos (glass overlay) -->
            <div v-if="expertPopup" class="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex flex-col">
                <div
                    class="flex-1 flex flex-col bg-white/95 backdrop-blur-xl max-w-5xl mx-auto w-full my-6 rounded-2xl overflow-hidden shadow-2xl">
                    <header class="h-16 flex items-center justify-between px-8 border-b border-gray-200">
                        <h2 class="text-xl font-bold text-gray-900">Expertos Disponibles</h2>
                        <button @click="toggleExpertPopup('close')"
                            class="text-blue-600 hover:text-blue-800 font-semibold transition">
                            Cerrar
                        </button>
                    </header>
                    <main class="flex-1 overflow-y-auto p-8">
                        <div v-if="loading" class="flex justify-center items-center h-40">
                            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
                        </div>
                        <div v-else-if="!mockExperts.length" class="text-center py-20 text-gray-500 text-lg">
                            No hay expertos disponibles en este momento.
                        </div>
                        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <PrevInfoComponent v-for="(expert, index) in mockExperts" :key="index" :expert-data="expert"
                                @closeCard="toggleExpertPopup('close')" />
                        </div>
                    </main>
                </div>
            </div>
        </main>
    </div>
</template>



<script lang="ts" setup>
import { collection, getDocs, getFirestore, query, where, QuerySnapshot } from 'firebase/firestore';
import 'animate.css';
import { ref, watch, onMounted } from 'vue';
import PrevInfoComponent from '@/components/Expert/PrevInfoComponent.vue';
import { IExpert } from '@/interfaces/IExpert';
import { authStore } from '@/store/auth';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

import {
    medicalOutline,
    calculatorOutline,
    constructOutline,
    globeOutline,
    desktopOutline,
    languageOutline,
    schoolOutline,
    terminalOutline,
    folderOpenOutline,
    hammerOutline,
    happyOutline,
    easelOutline,
    restaurantOutline,
    documentOutline
} from 'ionicons/icons';

import SelectExpertCard from './client/SelectExpertCard.vue';

// Remove explicit ionicons import for icons in template if using v-icon or oh-vue-icons
// But for the array 'experts', we use Ionic icons. SelectExpertCard handles them? 
// Assuming SelectExpertCard accepts ionicons object or we need to map them if SelectExpertCard expects something else.
// Based on previous code, it seems it expects ionicons.

const toast = useToast();

const db = getFirestore();
const expertsCollection = collection(db, 'experts');
const expertPopup = ref(false);
const mockExperts = ref<IExpert[]>([]);
const router = useRouter();
const authStorePinia = authStore();
const loading = ref(false);

const verifySuspended = () => {
    if (authStorePinia.getUserData?.isSuspended) {
        router.push('/account-suspended');
    }
}

onMounted(() => {
    verifySuspended();
});

watch(() => authStorePinia.getUserData, () => {
    verifySuspended();
}, { deep: true });

const experts = ref([
    { name: "Médico", icon: medicalOutline, summary: "Si tiene alguna consulta sobre su salud, contacte a uno de nuestros expertos." },
    { name: "Contador", icon: calculatorOutline, summary: "Si tiene alguna duda sobre sus finanzas o impuestos, contacte a uno de nuestros expertos." },
    { name: "Arquitecto", icon: constructOutline, summary: "Si necesita diseñar o remodelar un espacio, contacte a uno de nuestros expertos." },
    { name: "Servicios Web", icon: globeOutline, summary: "Si requiere desarrollo o soporte tecnológico, contacte a uno de nuestros expertos." },
    { name: "Publicidad", icon: desktopOutline, summary: "Si desea promocionar su negocio o producto, contacte a uno de nuestros expertos." },
    { name: "Traductor", icon: languageOutline, summary: "Si necesita traducir documentos o textos, contacte a uno de nuestros expertos." },
    { name: "Peritaje", icon: schoolOutline, summary: "Si requiere una evaluación o dictamen técnico, contacte a uno de nuestros expertos." },
    { name: "Ingeniería en Computación", icon: terminalOutline, summary: "Si necesita soluciones tecnológicas especializadas, contacte a uno de nuestros expertos." },
    { name: "Marketing", icon: folderOpenOutline, summary: "Si desea impulsar su estrategia comercial, contacte a uno de nuestros expertos." },
    { name: "Abogado", icon: hammerOutline, summary: "Si tiene alguna duda legal, contacte a uno de nuestros expertos." },
    { name: "Psicólogo/a", icon: happyOutline, summary: "Si necesita orientación psicológica profesional, contacte a uno de nuestros expertos." },
    { name: "Maestro", icon: easelOutline, summary: "Si requiere servicios educativos o tutoría, contacte a uno de nuestros expertos." },
    { name: "Chef", icon: restaurantOutline, summary: "Si necesita servicios de cocina profesional o consultoría gastronómica, contacte a uno de nuestros expertos." },
    { name: "Gestoría en Trámites", icon: documentOutline, summary: "Si necesita ayuda con gestiones administrativas, contacte a uno de nuestros expertos." }
]);

const toggleExpertPopup = (action: 'open' | 'close') => {
    expertPopup.value = action === 'open';
};

const gettingMockExperts = async (expert: string) => {
    mockExperts.value = [];
    loading.value = true;
    const q = query(expertsCollection, where('specialty', '==', expert));
    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            toast.error('No se encontraron expertos');
        } else {
            querySnapshot.forEach((doc) => {
                const data = doc.data() as IExpert;
                data.docId = doc.id;
                mockExperts.value.push(data);
            });
        }
    } catch (error) {
        toast.error(`Error al obtener los expertos ${error}`);
    } finally {
        loading.value = false;
    }
}

const getExpertSelection = (expert: string) => {
    toggleExpertPopup('open');
    gettingMockExperts(expert);
}
</script>