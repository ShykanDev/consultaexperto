<template>
  <div class="web-page min-h-screen bg-gray-50 flex flex-col">
    <header class="web-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
      <nav class="web-toolbar h-16 flex items-center px-4">
        <div class="web-buttons">
          <button class="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors" @click="$router.back()">
            <v-icon name="hi-solid-chevron-left" scale="1.5" />
          </button>
        </div>
        <h1 class="web-title text-lg font-bold text-gray-900 ml-2">Contratar experto </h1>
      </nav>
    </header>

    <main class="web-content flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
      <div class="py-6">
        <!-- Header Section -->
        <div class="text-center mb-8 inline-block p-4 bg-blue-50 rounded-3xl mb-4 shadow-sm border border-blue-100">

          <v-icon class="text-blue-600" name="bi-briefcase" scale="2.5" />
          <v-icon class="text-blue-600" name="bi-briefcase" scale="2.5" />
          <h1 class="text-3xl font-extrabold font-manrope text-slate-900">Solicitud de Contratación</h1>
          <p class="text-slate-500 font-poppins mt-3 px-4 italic text-sm leading-relaxed">
            Está a punto de iniciar un proceso de contratación profesional con un experto verificado. Recibiremos su
            solicitud y le contactaremos pronto.
          </p>
        </div>

        <!-- Form Card -->
        <div class="web-card bg-white shadow-xl border border-gray-100 rounded-[2rem] overflow-hidden p-8 space-y-8">


          <!-- User Info (Disabled) -->
          <div class="space-y-3">
            <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Su nombre
              completo</label>
            <div class="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100">
              <v-icon class="text-slate-400" name="hi-user" scale="1.2" />
              <input class="bg-transparent border-none w-full text-slate-600 font-bold focus:outline-none opacity-80"
                type="text" :value="auth.getUserName" />
            </div>
          </div>


          <!-- Expert Selection Details -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Experto</label>
              <div class="flex items-center gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <v-icon class="text-blue-500" name="hi-identification" scale="1.2" />
                <span class="text-blue-700 font-bold truncate">{{ hiringStore.expertName }}</span>
              </div>
            </div>

            <div class="space-y-3">
              <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Especialidad</label>
              <div class="flex items-center gap-4 p-5 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                <v-icon class="text-blue-500" name="hi-academic-cap" scale="1.2" />
                <span class="text-blue-700 font-bold truncate">{{ hiringStore.expertSpecialty }}</span>
              </div>
            </div>
          </div>

          <!-- WhatsApp Toggle -->
          <div class="space-y-3">
            <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Contacto</label>
            <div class="flex items-center gap-4 p-5 bg-emerald-50/30 border border-emerald-100 rounded-2xl">
              <input class="w-6 h-6 rounded-lg text-emerald-500 border-emerald-200 focus:ring-emerald-500"
                type="checkbox" v-model="acceptPhone">
              <div class="flex-1">
                <h4 class="text-emerald-900 font-bold text-sm">Permitir contacto por WhatsApp</h4>
                <p class="text-emerald-700/70 text-xs">Marque si desea recibir mensajes por teléfono</p>
              </div>
            </div>
          </div>

          <!-- Message Area -->
          <div class="space-y-3">
            <label class="block text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">Su mensaje o
              dudas</label>
            <div
              class="relative bg-white rounded-2xl border border-slate-200 p-4 shadow-inner focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all">
              <textarea
                class="w-full bg-transparent border-none outline-none text-slate-700 font-poppins placeholder-slate-300 resize-none"
                rows="6" v-model="comment" :placeholder="placeholderText"></textarea>
            </div>
          </div>


          <!-- Submit Button -->
          <div class="pt-4">
            <button
              class="w-full h-16 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-extrabold text-lg rounded-2xl shadow-xl shadow-blue-200 hover:scale-[1.01] active:scale-95 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
              @click="handleSendEmail" :disabled="isSending">
              <template v-if="!isSending">
                Enviar Solicitud
                <v-icon name="hi-paper-airplane" scale="1.2" />
              </template>
              <template v-else>
                <div class="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Enviando...
              </template>
            </button>
          </div>

        </div>

        <!-- Footer Info -->
        <div class="mt-8 text-center space-y-4 px-6 opacity-60">
          <div class="flex items-center justify-center gap-2 text-slate-500">
            <v-icon name="ri-shield-check-fill" scale="1.2" />
            <span class="text-xs font-bold uppercase tracking-wide">Contratación Segura</span>
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed font-poppins">
            Al enviar esta solicitud, nuestro equipo revisará la viabilidad del servicio y se pondrá en contacto con
            usted. Sus
            datos están protegidos por nuestra política de privacidad.
          </p>
        </div>
      </div>

    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { authStore } from '@/store/auth';
import { useHiringStore } from '@/store/hiring';
import emailjs from '@emailjs/browser';
import { useToast, TYPE } from 'vue-toastification';

const auth = authStore();
const hiringStore = useHiringStore();
const toast = useToast();

const comment = ref('');
const acceptPhone = ref(false);
const isSending = ref(false);

const placeholderText = computed(() => {
  return `Estoy interesado en contratar al experto ${hiringStore.expertName || '...'} para adquirir su servicio de ${hiringStore.expertSpecialty || '...'}. Me gustaría saber más detalles sobre...`;
});

const handleSendEmail = async () => {
  if (!comment.value.trim()) {
    toast.warning('Por favor, escribe un breve mensaje sobre tu interés.');
    return;
  }

  isSending.value = true;

  try {
    const templateParams = {
      subject: `Nueva solicitud de contratación de un experto por parte de ${auth.getUserName || 'un usuario'}`,
      headerTitle: 'CONSULTAEXPERTO - SOLICITUD DE CONTRATACIÓN',
      greeting: 'SOLICITUD DE CONTRATACIÓN',
      userName: auth.getUserName?.toUpperCase() || 'USUARIO',
      headerDescription: 'Nueva orden de contratación generada desde ConsultaExperto.',
      section1Icon: '👤',
      sectionTitle1: 'DATOS COMPLETOS DEL SOLICITANTE',
      section1TitleColor: '#034EA2',
      section1Item1Label: 'Nombre Completo:',
      section1Item1Value: auth.getUserName || 'N/A',
      section1Item2Label: 'UID USUARIO:',
      section1Item2Value: auth.getUserUid || 'N/A',
      section2Icon: '🏢',
      sectionTitle2: 'DATOS DEL EXPERTO',
      section2TitleColor: '#000000',
      section2Subtitle1: 'Nombre del Experto:',
      section2Value1: hiringStore.expertName || 'N/A',
      section2Subtitle2: 'UID DEL EXPERTO:',
      section2Value2: hiringStore.expertUid || 'N/A',
      section2HighlightLabel: 'MENSAJE / REQUERIMIENTOS:',
      section2HighlightText: comment.value,
      section3Icon: '🛠️',
      section3Title: 'METADATA DE LA OPERACIÓN',
      section3TitleColor: '#1428a0',
      section3Item1Label: 'Categoría Solicitada:',
      section3Item1Value: hiringStore.expertSpecialty || 'N/A',
      section3Item2Label: 'WhatsApp Status:',
      section3Item2Value: acceptPhone.value ? `Autorizado: ${auth.getUserData?.phone}` : 'No autorizado.',
      emailUser: auth.getUserEmail || 'N/A',
      timestamp: new Date().toLocaleString('es-ES'),
      footerYear: new Date().getFullYear(),
      footerLinkUrl: '',
      footerLinkText: 'consultaexperto',
      footerRightsText: 'Sistema de administración Consulta Experto.',
      email: 'shykandev@gmail.com',
    };

    await emailjs.send('service_q9e8lj2', 'template_v29drnw', templateParams);

    toast.success('Solicitud enviada. El administrador revisará los datos técnicos.');
    comment.value = '';
    acceptPhone.value = false;
  } catch (error) {
    console.error('Error al enviar solicitud:', error);
    toast.error('Error en la comunicación con el servidor.');
  } finally {
    isSending.value = false;
  }
};
</script>

<style scoped>
.web-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.web-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
}
</style>
