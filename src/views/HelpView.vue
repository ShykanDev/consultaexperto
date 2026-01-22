<template>
  <div class="web-page min-h-screen bg-gray-50">
    <header-component :pageTitle="'Ayuda'" />

    <section class="web-content overflow-y-auto p-4 space-y-8 mt-24">
      <!-- Section 1: Contact Form – Versión Desktop/Web más limpia -->
      <section class="animate-fade-up py-8">
        <div class=" bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <!-- Header -->
          <div class="px-8 pt-8 pb-4 border-b border-gray-100">
            <h2 class="text-2xl font-semibold text-gray-800 text-center">Contacto</h2>
            <p class="mt-2 text-sm text-gray-500 text-center">
              ¿Alguna duda, sugerencia o problema? Escríbenos directamente.
            </p>
          </div>

          <!-- Form -->
          <form class="px-8 py-6 space-y-6" @submit.prevent="handleContactSubmit">
            <!-- Asunto -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Asunto
              </label>
              <input class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 outline-none transition-all shadow-sm hover:border-gray-400" v-model="contactForm.subject" type="text"
                placeholder="Ejemplo: Problema con mi cuenta o consulta pendiente" />
            </div>

            <!-- Checkbox consulta -->
            <div class="flex items-start">
              <div class="flex items-center h-5">
                <input id="is-consult-related" type="checkbox"
                  class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  v-model="isConsultRelated" />
              </div>
              <label for="is-consult-related" class="ml-3 text-sm text-gray-700 flex items-center gap-2 cursor-pointer">
                <v-icon name="px-calendar-alert" scale="1.1" class="text-gray-500" />
                Mi mensaje está relacionado con una consulta anterior
              </label>
            </div>

            <!-- Selector de consulta (solo si aplica) -->
            <div v-if="isConsultRelated" class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Seleccionar consulta relacionada
              </label>
              <select class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 outline-none transition-all shadow-sm hover:border-gray-400" v-model="contactForm.scheduleId">
                <option value="" disabled>— Selecciona una consulta —</option>
                <option v-for="appointment in finishedAppointments" :key="appointment.docId" :value="appointment.docId">
                  {{ appointment.expertName }} • {{ appointment.expertSpecialty }}
                  <span class="text-gray-500 text-xs">
                    ({{ appointment.finishedAt?.toDate().toLocaleDateString('es-MX') }})
                  </span>
                </option>
              </select>
            </div>

            <!-- Mensaje -->
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">
                Mensaje
              </label>
              <textarea class="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-900 
                 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
                 outline-none transition-all shadow-sm hover:border-gray-400 resize-y min-h-[140px]"
                v-model="contactForm.message" placeholder="Describe con detalle tu situación, duda o sugerencia..."
                rows="5"></textarea>
            </div>

            <!-- Botón Enviar -->
            <div class="pt-4">
              <button type="submit" :disabled="isSending" class="w-full py-3.5 px-6 text-base font-medium text-white 
                 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 
                 focus:ring-2 focus:ring-blue-300 focus:outline-none 
                 rounded-lg shadow-md transition-all duration-200 
                 flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed">
                <v-icon v-if="!isSending" name="fa-paper-plane" scale="1" />
                <span>{{ isSending ? 'Enviando...' : 'Enviar mensaje' }}</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      <!-- Section 2: Important Info Cards -->
      <section class="grid gap-4 md:grid-cols-2 animate-fade-up animate-delay-100">
        <!-- Free Trial -->
        <div class="p-5 bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm rounded-2xl">
          <div class="flex items-center gap-3 mb-3">
            <div class="p-2 bg-blue-100 rounded-full">
              <v-icon class="text-blue-600" name="fa-clock" />
            </div>
            <h3 class="text-lg font-bold text-gray-900">15 Minutos Gratis</h3>
          </div>
          <p class="text-sm leading-relaxed text-gray-600">
            Su primera cita incluye <span class="font-bold text-blue-600">15 minutos sin costo</span>. No se requiere
            tarjeta de crédito para agendar esta consulta de prueba.
          </p>
        </div>

        <!-- Verified Experts -->
        <div class="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div class="flex items-center gap-3 mb-3">
            <div class="p-2 bg-green-100 rounded-full">
              <v-icon class="text-green-600" name="fa-check-circle" />
            </div>
            <h3 class="text-lg font-bold text-gray-900">Expertos Verificados</h3>
          </div>
          <p class="text-sm leading-relaxed text-gray-600">
            Para su tranquilidad, todos nuestros expertos son sometidos a pruebas de veracidad y sus documentos son
            validados manualmente.
          </p>
        </div>

        <!-- Account Recovery -->
        <div class="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
          <div class="flex items-center gap-3 mb-3">
            <div class="p-2 bg-purple-100 rounded-full">
              <v-icon class="text-purple-600" name="md-password-round" />
            </div>
            <h3 class="text-lg font-bold text-gray-900">Recuperar Cuenta</h3>
          </div>
          <p class="text-sm leading-relaxed text-gray-600">
            Si olvida su contraseña, puede recuperarla fácilmente ingresando su correo electrónico registrado. Se le
            enviará un enlace de restablecimiento.
          </p>
        </div>

        <!-- Account Deletion -->
        <div class="p-5 bg-white border border-red-100 shadow-sm rounded-2xl">
          <div class="flex items-center gap-3 mb-3">
            <div class="p-2 bg-red-100 rounded-full">
              <v-icon class="text-red-600" name="fa-user-times" />
            </div>
            <h3 class="text-lg font-bold text-gray-900">Eliminar Cuenta</h3>
          </div>
          <p class="text-sm leading-relaxed text-gray-600">
            Para eliminar permanentemente su cuenta, envíe un correo a <a
              class="font-medium text-red-500 hover:underline"
              href="mailto:informes@grupochimex.com">informes@grupochimex.com</a> indicando su nombre y el
            motivo.
          </p>
        </div>
      </section>

      <!-- Section 3: FAQ -->
      <section class="animate-fade-up animate-delay-200">
        <h2 class="mb-4 text-xl font-bold text-gray-900 flex items-center gap-2">
          <v-icon class="text-blue-500" name="fa-question-circle" />
          Preguntas Frecuentes
        </h2>

        <div class="space-y-3">
          <div class="bg-white shadow-sm rounded-2xl ring-1 ring-gray-100 overflow-hidden" v-for="(faq, index) in faqs"
            :key="index">
            <button class="w-full flex items-center p-4 text-left hover:bg-gray-50/50 transition-colors"
              @click="faq.isOpen = !faq.isOpen">
              <span class="flex-1 font-semibold text-blue-600 leading-snug">{{ faq.question }}</span>
              <v-icon class="ml-2 text-gray-400" :name="faq.isOpen ? 'hi-solid-chevron-up' : 'hi-solid-chevron-down'" />
            </button>
            <div class="px-5 py-4 text-sm text-gray-600 bg-gray-50 border-t border-gray-100" v-if="faq.isOpen">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </section>

      <footer class="pt-8 text-center pb-8">
        <p class="text-xs text-gray-400">
          © 2026 ConsultaExperto. Todos los derechos reservados.
        </p>
      </footer>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ISchedule } from '@/interfaces/user/ISchedule';
import { authStore } from '@/store/auth';
import { collection, getDocs, getFirestore, query, Timestamp, where } from 'firebase/firestore';
import { computed, ref, onMounted, watch, reactive } from 'vue';
import { useRouter } from 'vue-router';
import emailjs from '@emailjs/browser';
import { useToast } from 'vue-toastification';
import HeaderComponent from '@/components/Templates/HeaderComponent.vue';

const router = useRouter();
const toast = useToast();
const isSending = ref(false);

// Contact Form State
const contactForm = ref({
  subject: '',
  message: '',
  scheduleId: ''
});
const isConsultRelated = ref(false);

const handleContactSubmit = async () => {
  if (!contactForm.value.subject || !contactForm.value.message) {
    toast.warning('Por favor complete todos los campos.');
    return;
  }

  isSending.value = true;
  try {
    await sendHelpEmail();
    toast.success('Su mensaje ha sido enviado correctamente.');
    // Reset form
    contactForm.value.subject = '';
    contactForm.value.message = '';
    contactForm.value.scheduleId = '';
    isConsultRelated.value = false;
  } catch (error) {
    toast.error('Error al enviar el mensaje. Intente de nuevo.');
  } finally {
    isSending.value = false;
  }
};

// FAQs Data with reactive state
const faqs = ref([
  {
    question: "¿Los primeros 15 minutos son realmente gratuitos?",
    answer: "Sí. La primera cita con cualquier experto incluye 15 minutos completamente gratuitos, para que usted pueda evaluar el servicio sin ningún compromiso.",
    isOpen: false
  },
  {
    question: "¿Es necesario agregar una tarjeta para acceder a la prueba gratuita?",
    answer: "No. No solicitamos información bancaria ni tarjetas de crédito para agendar su consulta gratuita de 15 minutos.",
    isOpen: false
  },
  {
    question: "¿Cómo garantizan que los expertos son profesionales reales?",
    answer: "Todos nuestros expertos pasan por un riguroso proceso de verificación manual, en el cual validamos su identidad, credenciales académicas y experiencia profesional.",
    isOpen: false
  },
  {
    question: "¿Qué debo hacer si olvidé mi contraseña?",
    answer: "Puede recuperarla fácilmente desde la pantalla de inicio de sesión seleccionando la opción 'Olvidé mi contraseña'. Le enviaremos un enlace a su correo electrónico registrado.",
    isOpen: false
  },
  {
    question: "¿Cómo puedo eliminar mi cuenta?",
    answer: "Para solicitar la baja de su cuenta, envíe un correo electrónico a informes@grupochimex.com indicando su nombre completo y el motivo de la solicitud. El proceso se iniciará de inmediato.",
    isOpen: false
  },
  {
    question: "¿Mis datos personales están protegidos?",
    answer: "Sí. La seguridad de su información es una prioridad para nosotros. Sus datos se encuentran encriptados y solo se comparten, cuando es necesario, con el experto que usted seleccione.",
    isOpen: false
  },
  {
    question: "¿Puedo cambiar de experto si no quedo conforme con la asesoría?",
    answer: "Sí. Si la asesoría no cumple con sus expectativas, usted puede seleccionar otro experto disponible en la plataforma. Tenga en cuenta que la prueba gratuita es única por cuenta.",
    isOpen: false
  },
  {
    question: "¿Puedo contactar a soporte si presento un problema técnico?",
    answer: "Sí. Puede utilizar el formulario ubicado al inicio de esta página para reportar cualquier inconveniente técnico o realizar consultas sobre el funcionamiento de la aplicación.",
    isOpen: false
  },
  {
    question: "¿Qué sucede si tengo un problema con una consulta?",
    answer: "Usted puede reportar la situación de inmediato mediante el formulario de contacto. Evaluaremos el caso y tomaremos las medidas correspondientes para reprogramar su cita en caso de ser necesario.",
    isOpen: false
  }
]);

const sendHelpEmail = async () => {
  const selectedAppointment = finishedAppointments.value.find(a => a.docId === contactForm.value.scheduleId);
  const user = authStore();

  return emailjs.send('service_q9e8lj2', 'template_v29drnw', {
    headerTitle: 'ADMINISTRACIÓN - CONTROL DE INCIDENCIAS',
    userName: `${user.getUserUid?.substring(0, 6)}${Timestamp.now().seconds} `,
    headerDescription: isConsultRelated.value
      ? `⚠️ RECLAMO SOBRE CITA: ${selectedAppointment?.expertName || 'N/A'}`
      : 'Consulta General enviada desde la App',

    section1Icon: '👥',
    section1Title: 'Identificación del Usuario',
    section1TitleColor: '#007aff',
    section1Item1Label: 'Nombre / UID:',
    section1Item1Value: `${user.getUserName || 'Usuario'} (${user.getUserUid})`,
    section1Item2Label: 'Correo:',
    section1Item2Value: user.getUserEmail || 'N/A',

    section2Icon: '🚨',
    section2Title: 'Detalle Crítico del Reporte',
    section2TitleColor: '#ff3b30',
    section2Subtitle1: 'ASUNTO DEL REPORTE:',
    section2Value1: contactForm.value.subject || 'Sin Asunto',
    section2Subtitle2: 'MENSAJE DEL USUARIO:',
    section2Value2: contactForm.value.message || 'Sin Mensaje',
    section2HighlightLabel: 'PRIORIDAD:',
    section2HighlightText: isConsultRelated.value ? 'ALTA' : 'INFORMATIVA',

    section3Icon: '🩺',
    section3Title: isConsultRelated.value ? 'Información Técnica de la Cita' : 'Contexto Adicional',
    section3TitleColor: '#5856d6',

    section3Item1Label: isConsultRelated.value ? 'Experto / Especialidad:' : 'Fecha Reporte:',
    section3Item1Value: isConsultRelated.value
      ? `${selectedAppointment?.expertName} (${selectedAppointment?.expertSpecialty})`
      : new Date().toLocaleDateString('es-ES'),

    section3Item2Label: isConsultRelated.value ? 'Finalizada el / DocID:' : 'Plataforma:',
    section3Item2Value: isConsultRelated.value
      ? `${selectedAppointment?.finishedAt?.toDate().toLocaleString('es-ES')} [${contactForm.value.scheduleId}]`
      : 'Centro de Ayuda (Web)',

    footerYear: new Date().getFullYear(),
    footerRightsText: 'Este ticket requiere seguimiento en el panel de administrador.',
    email: 'shykandev@gmail.com',
  });
}

//Firebase Data
const db = getFirestore();
const userAppointments = ref<ISchedule[]>([]);

const finishedAppointments = computed<ISchedule[]>(() => {
  return [...userAppointments.value]
    .filter(a => a.isFinished)
    .sort((a, b) => {
      const timeA = a.finishedAt?.toDate().getTime() || 0;
      const timeB = b.finishedAt?.toDate().getTime() || 0;
      return timeB - timeA;
    });
});

const getUserAppointments = async () => {
  try {
    const uid = authStore().getUserUid;
    if (!uid) return;

    const docRef = collection(db, 'schedules');
    const qGetUserSchedules = query(docRef, where('userUid', '==', uid));
    const docSnapshot = await getDocs(qGetUserSchedules);

    userAppointments.value = docSnapshot.docs.map(doc => ({
      ...doc.data() as ISchedule,
      docId: doc.id,
      docRef: doc.ref,
      docRefPath: doc.ref.path
    }));
  } catch (error) {
    console.error(`Error while fetching appointments: ${error}`);
  }
}

onMounted(() => {
  getUserAppointments();
})

watch(isConsultRelated, (newVal) => {
  if (newVal && userAppointments.value.length === 0) {
    getUserAppointments();
  }
})
</script>

<style scoped>
.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>