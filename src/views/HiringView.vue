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
    // Configura aquí tus IDs de EmailJS
    const templateParams = {
      to_email: 'informes@consultaexperto.com',
      user_name: auth.getUserName,
      user_email: auth.getUserEmail,
      expert_name: hiringStore.expertName,
      expert_specialty: hiringStore.expertSpecialty,
      message: comment.value
    };

    // NOTA: Se asume que emailjs ya está inicializado en main.ts o ExpertViewFixed
    // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
    
    // Simulamos el envío ya que el usuario dijo que él se encarga del resto
    await new Promise(resolve => setTimeout(resolve, 2000));

    presentToast('Solicitud enviada correctamente. Revisaremos tu caso pronto.', 'success');
    comment.value = '';
  } catch (error) {
    console.error('Error al enviar solicitud:', error);
    presentToast('Hubo un error al enviar la solicitud. Intenta más tarde.', 'danger');
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
