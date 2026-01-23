<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white flex flex-col">
    <main class="">
      <div class="grid grid-cols-1 lg:grid-cols-1 gap-12 items-start ">
        <!-- Form Section -->
        <div class=" rounded-3xl shadow-lg p-6 md:p-8 space-y-8 border border-blue-50  mt-28">
          <div class="text-center space-y-4">
            <div class="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto">
              <v-icon class="text-blue-600" name="bi-briefcase" scale="2" />
            </div>
            <h1 class="!mt-24 text-2xl md:text-3xl font-bold text-gray-900">Solicitud de Contratación</h1>
            <p class="text-gray-500 text-sm md:text-base italic leading-relaxed max-w-lg mx-auto">
              Está a punto de iniciar un proceso de contratación profesional con un experto verificado. Recibiremos su
              solicitud y le contactaremos pronto.
            </p>
          </div>

          <!-- User Info -->
          <div class="space-y-2">
            <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500">Su nombre completo</label>
            <div class="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <v-icon class="text-gray-500" name="hi-user" scale="1.2" />
              <input class="flex-1 bg-transparent border-none text-gray-700 font-medium focus:outline-none" type="text"
                :value="auth.getUserName" readonly />
            </div>
          </div>

          <!-- Expert Details -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500">Experto</label>
              <div class="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <v-icon class="text-blue-500" name="hi-identification" scale="1.2" />
                <span class="text-blue-700 font-medium truncate">{{ hiringStore.expertName }}</span>
              </div>
            </div>
            <div class="space-y-2">
              <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500">Especialidad</label>
              <div class="flex items-center gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <v-icon class="text-blue-500" name="hi-academic-cap" scale="1.2" />
                <span class="text-blue-700 font-medium truncate">{{ hiringStore.expertSpecialty }}</span>
              </div>
            </div>
          </div>



          <!-- Message Area -->
          <div class="space-y-2">
            <label class="block text-xs font-semibold uppercase tracking-wide text-gray-500">Su mensaje o dudas</label>
            <textarea
              class="w-full p-4 bg-white rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-gray-700 placeholder-gray-400 resize-none transition-all duration-200"
              rows="5" v-model="comment" :placeholder="placeholderText"></textarea>
          </div>

          <!-- Submit Button -->
          <button
            class="w-full py-4 bg-blue-600 text-white font-bold text-lg rounded-xl shadow-md hover:bg-blue-700 active:scale-95 disabled:opacity-50 transition-all duration-200 flex items-center justify-center gap-2"
            @click="handleSendEmail" :disabled="isSending">
            <template v-if="!isSending">
              Enviar Solicitud
              <v-icon name="hi-paper-airplane" scale="1.2" />
            </template>
            <template v-else>
              <div class="w-5 h-5 border-2 border-white/50 border-t-white rounded-full animate-spin"></div>
              Enviando...
            </template>
          </button>
        </div>

        <!-- Info Section (Visible on larger screens) -->
        <div
          class="hidden lg:block sticky top-20 space-y-6 p-6 bg-blue-50 rounded-3xl shadow-md border border-blue-100">
          <div class="text-center space-y-4">
            <div class="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mx-auto shadow-sm">
              <v-icon class="text-blue-600" name="ri-shield-check-fill" scale="1.5" />
            </div>
            <h2 class="text-xl font-semibold text-gray-900">Contratación Segura</h2>
            <p class="text-gray-500 text-sm leading-relaxed">
              Al enviar esta solicitud, nuestro equipo revisará la viabilidad del servicio y se pondrá en contacto con
              usted.
              Sus datos están protegidos por nuestra política de privacidad.
            </p>
          </div>
        </div>
      </div>

      <!-- Footer Info (Visible on smaller screens) -->
      <div class="lg:hidden mt-8 text-center space-y-4 p-6 bg-blue-50 rounded-3xl shadow-md border border-blue-100">
        <div class="inline-flex items-center justify-center w-10 h-10 bg-white rounded-full mx-auto shadow-sm">
          <v-icon class="text-blue-600" name="ri-shield-check-fill" scale="1.2" />
        </div>
        <h3 class="text-lg font-semibold text-gray-900">Contratación Segura</h3>
        <p class="text-gray-500 text-xs leading-relaxed">
          Al enviar esta solicitud, nuestro equipo revisará la viabilidad del servicio y se pondrá en contacto con
          usted. Sus
          datos están protegidos por nuestra política de privacidad.
        </p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { authStore } from '@/store/auth';
import { useHiringStore } from '@/store/hiring';
import emailjs from '@emailjs/browser';
import { useToast } from 'vue-toastification';

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
