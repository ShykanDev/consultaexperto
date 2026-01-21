<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar mode="ios">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/expert-list-modern" text="Volver" :icon="chevronBack"></ion-back-button>
        </ion-buttons>
        <ion-title class="font-bold">Contratar experto</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <div class="mx-auto py-6">
        <!-- Header Section -->
        <div class="text-center mb-8 animate__animated animate__fadeIn">
          <div class="inline-block p-3 bg-blue-50 rounded-2xl mb-4">
            <v-icon name="bi-briefcase" scale="2.5" class="text-blue-600"/>
          </div>
          <h1 class="text-2xl font-bold font-manrope text-slate-900">Solicitud de Contratación</h1>
          <p class="text-slate-500 font-poppins mt-2 px-4 italic text-sm">
            Está a punto de iniciar un proceso de contratación profesional con un experto verificado, recibiremos su solicitud y le enviaremos un correo con la información sobre la contratación solicitada..
          </p>
        </div>

        <!-- Form Card -->
        <ion-card mode="ios" class="ion-no-margin shadow-sm border border-slate-100 rounded-3xl overflow-hidden ">
          <ion-card-content class="p-6">
            <div class="space-y-6">
              
              <!-- User Info (Disabled) -->
              <div class="space-y-2">
                <ion-label class="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Su nombre completo</ion-label>
                <div class="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 group transition-all">
                  <v-icon name="hi-user" scale="1.2" class="text-slate-400" />
                  <input 
                    type="text" 
                    :value="auth.getUserName" 
                    disabled 
                    class="bg-transparent border-none w-full text-slate-600 font-medium focus:outline-none opacity-80"
                  />
                </div>
              </div>

              <!-- Expert Name (Disabled) -->
              <div class="space-y-2">
                <ion-label class="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Experto seleccionado</ion-label>
                <div class="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <v-icon name="hi-identification" scale="1.2" class="text-blue-500" />
                  <input 
                    type="text" 
                    :value="hiringStore.expertName" 
                    disabled 
                    class="bg-transparent border-none w-full text-blue-700 font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <!-- Service (Disabled) -->
              <div class="space-y-2">
                <ion-label class="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Servicio / Especialidad</ion-label>
                <div class="flex items-center gap-3 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                  <v-icon name="hi-academic-cap" scale="1.2" class="text-blue-500" />
                  <input 
                    type="text" 
                    :value="hiringStore.expertSpecialty" 
                    disabled 
                    class="bg-transparent border-none w-full text-blue-700 font-semibold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <ion-checkbox :helper-text="'Marque si desea recibir mensajes por teléfono'" v-model="acceptPhone">Permitir mensajes por WhatsApp/SMS</ion-checkbox>

              </div>

              <!-- Comments (Editable) -->
              <div class="space-y-2">
                <ion-label class="text-xs font-bold uppercase tracking-wider text-slate-400 ml-1">Su mensaje o dudas</ion-label>
                <div class="relative bg-slate-50 rounded-2xl border border-slate-200 p-2 transition-all focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100">
                   <ion-textarea
                    mode="ios"
                    :rows="6"
                    v-model="comment"
                    :placeholder="placeholderText"
                    class="font-poppins text-slate-700 px-2"
                  ></ion-textarea>
                </div>
                
              </div>

            </div>

            <!-- Submit Button -->
            <div class="mt-10">
              <ion-button 
                @click="handleSendEmail" 
                expand="block" 
                mode="ios" 
                class="main-btn h-14 font-bold text-lg"
                :disabled="isSending"
              >
                <span v-if="!isSending" class="flex items-center gap-2">
                  Enviar Solicitud
                  <v-icon name="hi-paper-airplane" scale="1.1" />
                </span>
                <ion-spinner v-else name="crescent"></ion-spinner>
              </ion-button>
            </div>
          </ion-card-content>
        </ion-card>

        <!-- Footer Info -->
        <div class="mt-8 text-center space-y-4 px-6 animate__animated animate__fadeIn animate__delay-1s">
          <div class="flex items-center justify-center gap-2 text-slate-400">
            <v-icon name="ri-shield-check-fill" scale="1.2" class="text-slate-400" />
            <span class="text-xs font-medium">Contratación protegida y segura</span>
          </div>
          <p class="text-[11px] text-slate-400 leading-relaxed font-poppins">
            Al enviar esta solicitud, nuestro equipo revisará la viabilidad del servicio y se pondrá en contacto con usted por el o los medios que usted haya seleccionado, si desea ver nuestra política de privacidad, puede visitar nuestra página web.
          </p>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { 
  IonPage, IonHeader, IonToolbar, IonContent, IonTitle, 
  IonButtons, IonBackButton, IonCard, IonCardContent, 
  IonLabel, IonTextarea, IonButton, IonSpinner,
  toastController, IonCheckbox
} from '@ionic/vue';
import { chevronBack } from 'ionicons/icons';
import { ref, computed } from 'vue';
import { authStore } from '@/store/auth';
import { useHiringStore } from '@/store/hiring';
import emailjs from '@emailjs/browser';

const auth = authStore();
const hiringStore = useHiringStore();

const comment = ref('');
const acceptPhone = ref(false);
const isSending = ref(false);

const placeholderText = computed(() => {
  return `Estoy interesado en contratar al experto ${hiringStore.expertName || '...'} para adquirir su servicio de ${hiringStore.expertSpecialty || '...'}. Me gustaría saber más detalles sobre...`;
});

const presentToast = async (message: string, color: string) => {
  const toast = await toastController.create({
    message,
    duration: 3000,
    color,
    position: 'top',
    mode: 'ios'
  });
  await toast.present();
};

const handleSendEmail = async () => {
  if (!comment.value.trim()) {
    presentToast('Por favor, escribe un breve mensaje sobre tu interés.', 'warning');
    return;
  }

  

  isSending.value = true;
  
  try {
    const templateParams = {
      // Dynamic Subject for Admin
      subject: `Nueva solicitud de contratación de un experto por parte de ${auth.getUserName || 'un usuario'}`,
      
      // Header One UI Style
      headerTitle: 'CONSULTAEXPERTO - SOLICITUD DE CONTRATACIÓN',
      greeting: 'SOLICITUD DE CONTRATACIÓN',
      userName: auth.getUserName?.toUpperCase() || 'USUARIO',
      headerDescription: 'Nueva orden de contratación generada desde ConsultaExperto.',

      // Sección CLIENTE (Fondo Azul Samsung)
      section1Icon: '👤',
      sectionTitle1: 'DATOS COMPLETOS DEL SOLICITANTE',
      section1TitleColor: '#034EA2', // Samsung Navy Blue
      section1Item1Label: 'Nombre Completo:',
      section1Item1Value: auth.getUserName || 'N/A',
      section1Item2Label: 'UID USUARIO (Identificador Único):',
      section1Item2Value: auth.getUserUid || 'N/A', // UID COMPLETO SIN RECORTAR

      // Sección EXPERTO (Fondo Gris One UI)
      section2Icon: '🏢',
      sectionTitle2: 'DATOS DEL EXPERTO',
      section2TitleColor: '#000000',
      section2Subtitle1: 'Nombre del Experto:',
      section2Value1: hiringStore.expertName || 'N/A',
      section2Subtitle2: 'UID DEL EXPERTO (DB Ref):',
      section2Value2: hiringStore.expertUid || 'N/A', // UID COMPLETO SIN RECORTAR
      section2HighlightLabel: 'MENSAJE / REQUERIMIENTOS:',
      section2HighlightText: comment.value,

      // Sección TÉCNICA (One UI Dark Mode accent)
      section3Icon: '🛠️',
      section3Title: 'METADATA DE LA OPERACIÓN',
      section3TitleColor: '#1428a0', // Samsung Accent
      section3Item1Label: 'Categoría Solicitada:',
      section3Item1Value: hiringStore.expertSpecialty || 'N/A',
      section3Item2Label: 'Estatus de Contacto por WhatsApp:',
      section3Item2Value: acceptPhone.value ? `Teléfono: ${authStore().getUserData?.phone}` : 'No autorizado, contactar por correo.',

      // Info adicional para el template Samsung
      emailUser: auth.getUserEmail || 'N/A',
      timestamp: new Date().toLocaleString('es-ES'),

      // Footer
      footerYear: new Date().getFullYear(),
      footerLinkUrl: '',
      footerLinkText: 'consultaexperto',
      footerRightsText: 'Sistema de administración Consulta Experto.',
      
      // Email para administración
      email: 'shykandev@gmail.com',
    };

    // Envío real a través de EmailJS
    await emailjs.send('service_q9e8lj2', 'template_v29drnw', templateParams);

    presentToast('Solicitud enviada. El administrador revisará los datos técnicos.', 'success');
    comment.value = '';
    acceptPhone.value = false;
  } catch (error) {
    console.error('Error al enviar solicitud de contratación (Admin View):', error);
    presentToast('Error en la comunicación con el servidor técnico.', 'danger');
  } finally {
    isSending.value = false;
  }
};
</script>

<style scoped>
ion-content {
  --background: #f8fafc; /* Slate 50 */
}

ion-toolbar {
  --background: #ffffff;
  --border-color: transparent;
}

.main-btn {
  --border-radius: 1.25rem;
  --box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.2);
  margin-top: 1rem;
}

input:disabled {
  cursor: not-allowed;
  opacity: 0.9;
}

ion-card {
  --background: #ffffff;
}

ion-textarea {
  --placeholder-color: #94a3b8;
  --placeholder-font-style: italic;
  font-size: 14px;
}

/* Animaciones suaves */
.animate__delay-1s {
  animation-delay: 0.5s;
}
</style>
