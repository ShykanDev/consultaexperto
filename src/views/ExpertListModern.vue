<template>
    <div class="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-blue-100 antialiased font-sans">
        <!-- Main Background Decoration -->
        <div class="fixed inset-0 overflow-hidden pointer-events-none">
            <div class="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[120px]"></div>
            <div class="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-50/50 rounded-full blur-[100px]"></div>
        </div>

        <!-- Floating Premium Header -->


        <main class="relative z-10 pt-32 pb-20 px-4 md:px-8">
            <div class="mx-auto space-y-24">
                <!-- Modern Integrated Hero -->
                <section class="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div class="flex-1 space-y-8 text-center lg:text-left">
                        <div
                            class="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-100">
                            <span class="relative flex h-2 w-2">
                                <span
                                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            Plataforma Líder de Consultoría
                        </div>

                        <h1 class="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
                            Encuentre al <span class="text-blue-600">experto</span> que necesita.
                        </h1>

                        <p class="text-lg md:text-xl text-slate-500 max-w-2xl leading-relaxed">
                            Conecte en vivo con profesionales certificados. Desde medicina hasta estrategia legal, la
                            respuesta que busca está a un clic.
                            Inicialmente tiene 15 minutos gratuitos por categoría.
                        </p>
                        <p>No se requiere tarjeta de crédito</p>

                        <div class="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <RouterLink to="/home#all-experts"
                                class="hover:text-blue-600  active:text-blue-600 px-8 py-5 bg-slate-900 text-white font-bold rounded-2xl flex items-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                                active-class="text-blue-600 font-semibold">Especialidades</RouterLink>
                            <div class="flex items-center -space-x-3 px-4">
                                <div v-for="i in 4" :key="i"
                                    class="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                                    <img :src="`https://i.pravatar.cc/150?u=${i}`" class="rounded-full" />
                                </div>
                                <div class="pl-6 text-sm font-bold text-slate-600">+10k usuarios confían</div>
                            </div>
                        </div>
                    </div>


                </section>

                <!-- Premium Service Grid -->
                <section id="how-it-works" class="space-y-12 scroll-mt-32">
                    <div class="text-center space-y-4">
                        <h2 class="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Especialidades
                            Destacadas</h2>
                        <p class="text-slate-500 max-w-xl mx-auto">Selecciona una categoría para ver los expertos
                            disponibles en tiempo real.</p>
                    </div>

                    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        <div v-for="(item, i) in [
                            { title: 'Médico', icon: 'md-medicalinformation-outlined', bg: 'bg-emerald-50 text-emerald-600', sub: 'Salud y bienestar' },
                            { title: 'Abogado', icon: 'fa-gavel', bg: 'bg-blue-50 text-blue-600', sub: 'Leyes y trámites' },
                            { title: 'Servicios Web', icon: 'bi-briefcase', bg: 'bg-indigo-50 text-indigo-600', sub: 'Estrategia y ventas' },
                            { title: 'Contador', icon: 'md-computer-twotone', bg: 'bg-purple-50 text-purple-600', sub: 'Soporte y dev' }
                        ]" :key="i" @click="getExpertSelection(item.title)"
                            class="group p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:-translate-y-2 transition-all cursor-pointer">
                            <div
                                :class="['w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform font-bold', item.bg]">
                                <v-icon :name="item.icon" scale="2" />
                            </div>
                            <h3 class="text-xl font-black text-slate-900 mb-1">{{ item.title }}</h3>
                            <p class="text-sm font-medium text-slate-400">{{ item.sub }}</p>
                        </div>
                    </div>
                </section>

                <!-- Bento Style Quality Section -->
                <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div
                        class="md:col-span-2 bg-gradient-to-br from-blue-700 to-indigo-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
                        <div class="relative z-10 space-y-6 max-w-md">
                            <h2 class="text-4xl font-black leading-tight">Garantía de Calidad Certificada</h2>
                            <p class="text-blue-100/80 text-lg">Cada experto pasa por una validación exhaustiva de
                                identidad y credenciales profesionales antes de unirse.</p>
                            <ul class="space-y-4">
                                <li v-for="text in ['Verificación de títulos', 'Pruebas de conocimiento', 'Entrevista técnica']"
                                    :key="text" class="flex items-center gap-3 font-semibold">
                                    <div class="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                        <v-icon name="md-check" scale="0.8" />
                                    </div>
                                    {{ text }}
                                </li>
                            </ul>
                        </div>
                        <v-icon name="hi-shield-check" scale="15"
                            class="absolute -right-10 -bottom-10 text-white/5 rotate-12" />
                    </div>

                    <div
                        class="bg-white border border-slate-100 rounded-[3rem] p-10 flex flex-col justify-between shadow-sm">
                        <div class="space-y-4">
                            <div
                                class="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600">
                                <v-icon name="hi-star" scale="1.5" />
                            </div>
                            <h3 class="text-2xl font-extrabold text-slate-900">Confianza en cada experto</h3>
                            <p class="text-slate-500 font-medium leading-relaxed">Cada experto pasa por una validación
                                exhaustiva de identidad y credenciales profesionales antes de unirse.</p>
                        </div>
                        <router-link to="/home#all-experts"
                            class="w-full py-4 bg-slate-50 p-2 text-slate-900 font-bold rounded-2xl hover:bg-slate-100 transition-colors">
                            Ver Expertos
                        </router-link>
                    </div>
                </section>

                <!-- All Specialized Areas -->
                <section id="all-experts" class="space-y-12 scroll-mt-32">
                    <div class="flex items-end justify-between px-4">
                        <div>
                            <h2 class="text-3xl font-black text-slate-900 tracking-tight">Todas las áreas</h2>
                            <p class="text-slate-500 font-medium">Contamos con una red global de expertos listos para
                                ayudarte.</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        <SelectExpertCard v-for="expert in experts" :key="expert.name" :name="expert.name"
                            :icon="expert.icon" :summary="expert.summary" @select="getExpertSelection(expert.name)"
                            class="!rounded-[2.5rem] !border-slate-100 hover:!shadow-xl transition-all" />
                    </div>
                </section>

                <!-- Premium Banner Recommendations -->
                <section class="grid md:grid-cols-2 gap-8">
                    <div
                        class="group relative rounded-[3rem] overflow-hidden bg-slate-900 p-12 text-white h-[400px] flex flex-col justify-between">
                        <div
                            class="absolute inset-0 opacity-20 group-hover:scale-105 transition-transform duration-[2s]">
                            <img src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
                                class="w-full h-full object-cover" />
                        </div>
                        <div class="relative z-10 space-y-4">
                            <span
                                class="px-4 py-1.5 bg-white/10  rounded-full text-xs font-black uppercase tracking-widest border border-white/20">Wellness</span>
                            <h3 class="text-4xl font-black leading-tight">miexpareja.net</h3>
                            <p class="text-slate-300 font-medium max-w-xs">Especialistas en relaciones y bienestar
                                emocional disponibles 24/7.</p>
                        </div>
                        <a href="https://miexpareja.net" target="_blank"
                            class="relative z-10 w-fit px-8 py-4 bg-white text-slate-900 font-bold rounded-2xl hover:bg-blue-50 transition-colors">
                            Ir al Sitio
                        </a>
                    </div>

                    <div
                        class="group relative rounded-[3rem] overflow-hidden bg-blue-600 p-12 text-white h-[400px] flex flex-col justify-between">
                        <div
                            class="absolute inset-0 opacity-20 group-hover:scale-105 transition-transform duration-[2s]">
                            <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80"
                                class="w-full h-full object-cover" />
                        </div>
                        <div class="relative z-10 space-y-4">
                            <span
                                class="px-4 py-1.5 bg-white/10 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">Propiedades</span>
                            <h3 class="text-4xl font-black leading-tight">miarrendatario.com</h3>
                            <p class="text-blue-100 font-medium max-w-xs">Todo lo que necesitas para gestionar tus
                                rentas y arrendatarios.</p>
                        </div>
                        <a href="https://miarrendatario.com" target="_blank"
                            class="relative z-10 w-fit px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-white/90 transition-colors">
                            Ir al Sitio
                        </a>
                    </div>
                </section>
            </div>
        </main>



        <!-- Premium Glass Modal -->
        <Transition enter-active-class="" leave-active-class="">
            <div v-if="expertPopup" @click="toggleExpertPopup('close')"
                class="fixed inset-0 z-[100] bg-blue-950/50   flex items-center justify-center p-4">
                <div
                    class="bg-white/70 w-full max-w-6xl h-[90vh] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden border border-white/50 animate-fade-up animate-duration-75">
                    <section class="px-10 h-24 flex items-center justify-between border-b border-slate-100 bg-white/85">
                        <div class="space-y-1">
                            <h2 class="text-2xl font-black text-slate-900">Expertos Disponibles</h2>
                            <p class="text-sm font-bold text-slate-400 uppercase tracking-widest">Encuentre a su
                                especialista ideal</p>
                        </div>
                        <button @click="toggleExpertPopup('close')"
                            class="min-w-32 h-12 bg-blue-600 hover:bg-blue-700 rounded-xl flex items-center justify-center transition-all">
                            <v-icon class="text-white" name="md-close" scale="1.2" />
                        </button>
                    </section>

                    <main class="flex-1 overflow-y-auto p-10 custom-scrollbar bg-white/80">
                        <div v-if="loading" class="flex flex-col justify-center items-center h-full gap-4">
                            <div
                                class="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin">
                            </div>
                            <p class="font-black text-slate-400 uppercase tracking-tighter">Buscando especialistas...
                            </p>
                        </div>
                        <div v-else-if="!mockExperts.length"
                            class="flex flex-col items-center justify-center h-full text-center space-y-6">
                            <div
                                class="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-slate-200">
                                <v-icon name="hi-search" scale="4" />
                            </div>
                            <div class="space-y-2">
                                <h3 class="text-3xl font-black text-slate-900">No encontramos resultados</h3>
                                <p class="text-slate-500 font-medium">Intente seleccionando otra categoría de
                                    especialidad.</p>
                            </div>
                        </div>
                        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
                            <PrevInfoComponent v-for="(expert, index) in mockExperts" :key="index" :expert-data="expert"
                                @closeCard="toggleExpertPopup('close')"
                                class="!rounded-[2.5rem] !shadow-none hover:!shadow-2xl transition-all border border-slate-50" />
                        </div>
                    </main>
                </div>
            </div>
        </Transition>
    </div>
</template>



<script lang="ts" setup>
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import 'animate.css';
import { ref, onMounted } from 'vue';
import PrevInfoComponent from '@/components/Expert/PrevInfoComponent.vue';
import { IExpert } from '@/interfaces/IExpert';
import { useToast } from "vue-toastification";

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
const loading = ref(false);

onMounted(() => {
    // Other onMounted logic if any
});

const experts = ref([
    {
        name: "Médico",
        icon: 'md-medicalinformation-outlined',
        summary: "Atención médica especializada para el diagnóstico, tratamiento y seguimiento integral de tu salud y bienestar."
    },
    {
        name: "Contador",
        icon: 'bi-calculator-fill',
        summary: "Optimización de recursos, gestión de impuestos y asesoría financiera estratégica para mantener tus cuentas claras."
    },
    {
        name: "Arquitecto",
        icon: 'md-architecture-sharp',
        summary: "Diseño creativo y planificación técnica para transformar espacios, desde remodelaciones hasta proyectos de gran escala."
    },
    {
        name: "Servicios Web",
        icon: 'md-web',
        summary: "Desarrollo de plataformas digitales modernas, mantenimiento de sitios y soluciones de software escalables para tu negocio."
    },
    {
        name: "Publicidad",
        icon: 'fa-newspaper',
        summary: "Estrategias de comunicación y campañas creativas diseñadas para maximizar la visibilidad y el impacto de tu marca."
    },
    {
        name: "Traductor",
        icon: 'hi-solid-translate',
        summary: "Traducción profesional de documentos y textos con precisión lingüística y adaptación cultural garantizada."
    },
    {
        name: "Peritaje",
        icon: 'hi-academic-cap',
        summary: "Evaluaciones técnicas especializadas y dictámenes periciales con validez oficial para procesos legales o técnicos."
    },
    {
        name: "Ingeniería en Computación",
        icon: 'md-computer-twotone',
        summary: "Arquitectura de sistemas, seguridad informática y consultoría técnica avanzada para resolver problemas complejos."
    },
    {
        name: "Marketing",
        icon: 'fa-bullhorn',
        summary: "Análisis de mercado y estrategias de crecimiento enfocadas en aumentar tus ventas y fidelizar a tu audiencia."
    },
    {
        name: "Abogado",
        icon: 'fa-gavel',
        summary: "Representación legal y consultoría jurídica para proteger tus intereses en asuntos civiles, laborales o penales."
    },
    {
        name: "Psicólogo/a",
        icon: 'ri-psychotherapy-fill',
        summary: "Acompañamiento profesional y terapia enfocada en el bienestar emocional, la salud mental y el crecimiento personal."
    },
    {
        name: "Maestro",
        icon: 'gi-teacher',
        summary: "Servicios educativos personalizados, regularización académica y tutorías diseñadas para potenciar el aprendizaje."
    },
    {
        name: "Chef",
        icon: 'gi-chef-toque',
        summary: "Asesoría gastronómica, diseño de menús y servicios de cocina profesional para eventos o emprendimientos culinarios."
    },
    {
        name: "Gestoría en Trámites",
        icon: 'oi-tasklist',
        summary: "Gestión eficiente de procesos administrativos y burocráticos para ahorrarte tiempo y asegurar resultados."
    }
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