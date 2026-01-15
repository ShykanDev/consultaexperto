<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar class="bg-white/80 backdrop-blur-md ">
        <ion-buttons slot="start">
          <ion-button @click="router.back()" class="group">
            <v-icon name="md-arrowbackiosnew-round" class="text-blue-600 transition-transform group-hover:-translate-x-1" />
            <span class="ml-1 text-lg font-semibold text-blue-600">Atrás</span>
          </ion-button>
        </ion-buttons>
        <ion-title class="font-bold text-gray-800 font-quicksand">
          Centro de Ayuda
        </ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="bg-gray-50 ">
      <div class="px-4 py-6 mx-auto  space-y-8">
        
        <!-- Section 1: Contact Form -->
        <section class="animate-fade-up">
          <div class="p-6 bg-white shadow-xl rounded-2xl ring-1 ring-gray-100">
            <h2 class="mb-2 text-2xl font-bold text-blue-600 text-center">Contacto</h2>
            <p class="mb-6 text-sm text-gray-500 text-center">
              ¿Tiene alguna duda o sugerencia? Envíenos un mensaje directo.
            </p>
            
            <form class="space-y-4" @submit.prevent="handleContactSubmit">
              <div class="space-y-1">
                <label class="text-xs font-semibold tracking-wide text-gray-500 uppercase">Asunto</label>
                <ion-input
                  v-model="contactForm.subject"
                  type="text" 
                  placeholder="Ej. Problema con mi cuenta"
                  class="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

             <!-- Checkbox to mark if the problem is related to a consultation (it will show a select to choose the consultation)-->
              <div>
               <ion-checkbox v-model="isConsultRelated"><span :class="{ 'text-blue-600': isConsultRelated, 'text-gray-600': !isConsultRelated }" class="px-1 font-poppins text-xs">
              <v-icon name="px-calendar-alert" class="text-blue-600" scale="1.1"/> 
                Mi problema es sobre una consulta</span></ion-checkbox>
              </div>

              <!-- Select to choose the consultation (if the checkbox  above is checked) -->
                <ion-select v-if="isConsultRelated" interface="action-sheet" v-model="contactForm.scheduleId" placeholder="Seleccione una consulta">
                  <ion-select-option v-for="appointment in finishedAppointments" class="text-gray-900  !border-black !border-b-2" :key="appointment.docId" :value="appointment.docId">
                    <div class="flex items-center gap-2 font-poppins">
                      <span> {{ appointment.expertName }} categoria '{{ appointment.expertSpecialty }}'</span>
                      <span> Finalizada el {{ appointment.finishedAt?.toDate().toLocaleString('es-ES', { day: '2-digit', month: 'long', year: 'numeric' }) || 'N/A' }} a las {{ appointment.finishedAt?.toDate().toLocaleString('es-ES', { hour: 'numeric', minute: 'numeric' }) || 'N/A' }}hrs </span>
                    </div>
                  </ion-select-option>
                </ion-select>
              
              <div class="space-y-1">
                <label class="text-xs font-semibold tracking-wide text-gray-500 uppercase">Mensaje</label>
                <ion-textarea 
                  v-model="contactForm.message"
                  :rows="4" 
                  placeholder="Describa su situación detalladamente..."
                  class="w-full px-4 py-3 text-gray-900 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                ></ion-textarea>
              </div>

              <button 
                type="submit"
                class="w-full py-4 text-white font-bold bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                <v-icon name="fa-paper-plane" scale="1" />
                <span>Enviar Mensaje</span>
              </button>
            </form>
          </div>
        </section>

        <!-- Section 2: Important Info Cards -->
        <section class="grid gap-4 md:grid-cols-2 animate-fade-up animate-delay-100">
          
          <!-- Free Trial -->
          <div class="p-5 bg-gradient-to-br from-blue-50 to-white border border-blue-100 shadow-sm rounded-2xl">
            <div class="flex items-center gap-3 mb-3">
              <div class="p-2 bg-blue-100 rounded-full">
                <v-icon name="fa-clock" class="text-blue-600" />
              </div>
              <h3 class="text-lg font-bold text-gray-900 ">15 Minutos Gratis</h3>
            </div>
            <p class="text-sm leading-relaxed text-gray-600 ">
              Su primera cita incluye <span class="font-bold text-blue-600 dark:text-blue-400">15 minutos sin costo</span>. No se requiere tarjeta de crédito para agendar esta consulta de prueba.
            </p>
          </div>

          <!-- Verified Experts -->
          <div class="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
             <div class="flex items-center gap-3 mb-3">
              <div class="p-2 bg-green-100 rounded-full">
                <v-icon name="fa-check-circle" class="text-green-600" />
              </div>
              <h3 class="text-lg font-bold text-gray-900">Expertos Verificados</h3>
            </div>
            <p class="text-sm leading-relaxed text-gray-600 ">
              Para su tranquilidad, todos nuestros expertos son sometidos a pruebas de veracidad y sus documentos son validados manualmente.
            </p>
          </div>

          <!-- Account Recovery -->
           <div class="p-5 bg-white border border-gray-100 shadow-sm rounded-2xl">
             <div class="flex items-center gap-3 mb-3">
              <div class="p-2 bg-purple-100 rounded-full">
                <v-icon name="md-password-round" class="text-purple-600" />
              </div>
              <h3 class="text-lg font-bold text-gray-900">Recuperar Cuenta</h3>
            </div>
            <p class="text-sm leading-relaxed text-gray-600 ">
              Si olvida su contraseña, puede recuperarla fácilmente ingresando su correo electrónico registrado. Se le enviará un enlace de restablecimiento.
            </p>
          </div>

          <!-- Account Deletion -->
           <div class="p-5 bg-white border border-red-100 shadow-sm rounded-2xl">
             <div class="flex items-center gap-3 mb-3">
              <div class="p-2 bg-red-100 rounded-full">
                <v-icon name="fa-user-times" class="text-red-600" />
              </div>
              <h3 class="text-lg font-bold text-gray-900">Eliminar Cuenta</h3>
            </div>
            <p class="text-sm leading-relaxed text-gray-600">
              Para eliminar permanentemente su cuenta, envíe un correo a <a href="mailto:informes@grupochimex.com" class="font-medium text-red-500 hover:underline">informes@grupochimex.com</a> indicando su nombre y el motivo.
            </p>
          </div>

        </section>

        <!-- Section 3: FAQ -->
        <section class="px-2 animate-fade-up animate-delay-200">
          <h2 class="mb-4 text-xl font-bold text-gray-900 flex items-center gap-2">
            <v-icon name="fa-question-circle" class="text-blue-500" />
            Preguntas Frecuentes
          </h2>
          
          <ion-accordion-group class="ios-accordion-group">
            <ion-accordion v-for="(faq, index) in faqs" :key="index" :value="`faq-${index}`" class="mb-3 bg-white shadow-sm rounded-2xl ring-1 ring-gray-100 overflow-hidden">
              <ion-item slot="header" color="light" lines="none" class="bg-transparent">
                <ion-label class="font-semibold !text-blue-600 py-2 whitespace-normal leading-snug">
                  {{ faq.question }}
                </ion-label>
              </ion-item>
              <div slot="content" class="px-5 py-4 text-sm text-gray-600  bg-gray-50  border-t border-gray-100 ">
                {{ faq.answer }}
              </div>
            </ion-accordion>
          </ion-accordion-group>
        </section>
        
        <!-- Footer Info -->
        <div class="pt-8 text-center pb-safe">
           <p class="text-xs text-gray-400">
             © 2026 ConsultaExperto. Todos los derechos reservados.
           </p>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts" setup>
import { ISchedule } from '@/interfaces/user/ISchedule';
import { authStore } from '@/store/auth';
import { 
  IonPage, 
  IonHeader, 
  IonToolbar, 
  IonButtons, 
  IonButton, 
  IonTitle, 
  IonContent,
  IonAccordionGroup,
  IonAccordion,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  toastController,
  IonInput,
  IonTextarea,
  IonCheckbox,
  onIonViewDidEnter,
} from '@ionic/vue';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Contact Form State
const contactForm = ref({
  subject: '',
  message: '',
  scheduleId: ''
});
const isConsultRelated = ref(false); //Checkbox state to show 

const handleContactSubmit = async () => {
  if (!contactForm.value.subject || !contactForm.value.message) {
    const toast = await toastController.create({
      message: 'Por favor complete todos los campos.',
      duration: 2000,
      color: 'warning',
      position: 'top'
    });
    await toast.present();
    return;
  }

  // Simulate sending
  const toast = await toastController.create({
    message: 'Su mensaje ha sido enviado correctamente. Responderemos pronto.',
    duration: 3000,
    color: 'success',
    position: 'top'
  });
  await toast.present();
  
  // Reset form
  contactForm.value.subject = '';
  contactForm.value.message = '';
};

// FAQs Data
const faqs = [
  {
    question: "¿Los primeros 15 minutos son realmente gratuitos?",
    answer: "Sí. La primera cita con cualquier experto incluye 15 minutos completamente gratuitos, para que usted pueda evaluar el servicio sin ningún compromiso."
  },
  {
    question: "¿Es necesario agregar una tarjeta para acceder a la prueba gratuita?",
    answer: "No. No solicitamos información bancaria ni tarjetas de crédito para agendar su consulta gratuita de 15 minutos."
  },
  {
    question: "¿Cómo garantizan que los expertos son profesionales reales?",
    answer: "Todos nuestros expertos pasan por un riguroso proceso de verificación manual, en el cual validamos su identidad, credenciales académicas y experiencia profesional."
  },
  {
    question: "¿Qué debo hacer si olvidé mi contraseña?",
    answer: "Puede recuperarla fácilmente desde la pantalla de inicio de sesión seleccionando la opción 'Olvidé mi contraseña'. Le enviaremos un enlace a su correo electrónico registrado."
  },
  {
    question: "¿Cómo puedo eliminar mi cuenta?",
    answer: "Para solicitar la baja de su cuenta, envíe un correo electrónico a informes@grupochimex.com indicando su nombre completo y el motivo de la solicitud. El proceso se iniciará de inmediato."
  },
  {
    question: "¿Mis datos personales están protegidos?",
    answer: "Sí. La seguridad de su información es una prioridad para nosotros. Sus datos se encuentran encriptados y solo se comparten, cuando es necesario, con el experto que usted seleccione."
  },
  {
    question: "¿Puedo cambiar de experto si no quedo conforme con la asesoría?",
    answer: "Sí. Si la asesoría no cumple con sus expectativas, usted puede seleccionar otro experto disponible en la plataforma. Tenga en cuenta que la prueba gratuita es única por cuenta."
  },
  {
    question: "¿Puedo contactar a soporte si presento un problema técnico?",
    answer: "Sí. Puede utilizar el formulario ubicado al inicio de esta página para reportar cualquier inconveniente técnico o realizar consultas sobre el funcionamiento de la aplicación."
  },
  {
    question: "¿Qué sucede si tengo un problema con una consulta?",
    answer: "Usted puede reportar la situación de inmediato mediante el formulario de contacto. Evaluaremos el caso y tomaremos las medidas correspondientes para reprogramar su cita en caso de ser necesario; si es durante la prueba gratuita, se le reagendará la cita gratuita. Tenga en cuenta que si reporta un problema con un experto, a fin de darle un mejor servicio, el experto con el que tuvo la cita no podrá ser seleccionado de nuevo."
  }
];

//Firebase Data

const db = getFirestore();
const docRef = collection(db, `schedules`);
const qGetUserSchedules = query(docRef, where('userUid', '==', authStore().getUserUid))

//User Appointments Values
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

//Methods
const getUserAppointments = async () => {
  try {
    userAppointments.value = []; // Clear existing appointments
    const docSnapshot = await getDocs(qGetUserSchedules);
    if (docSnapshot.empty) {
      console.log('No se encontró ningún documento');
      return;
    }
    
    docSnapshot.forEach(doc => {
      const data = doc.data();
      const appointment: ISchedule = {
        ...data as ISchedule,
        docId: doc.id,
        docRef: doc.ref,
        docRefPath: doc.ref.path
      };
      userAppointments.value.push(appointment);
    });
  } catch (error) {
    console.log(`Error while fetching user finished appointments: ${error}`);
  }
}
onIonViewDidEnter(() => {
  getUserAppointments();
})

watch(isConsultRelated, () => {
  if(isConsultRelated.value){
    getUserAppointments();
  }
})


</script>

<style scoped>
/* Custom Scrollbar for hidden scroll feel */
ion-content {
  --background: transparent;
}

.pb-safe {
  padding-bottom: env(safe-area-inset-bottom);
}

/* Accordion Custom Styling */
ion-accordion-group.ios-accordion-group ion-accordion {
  border-radius: 16px;
}

ion-accordion.accordion-expanding,
ion-accordion.accordion-expanded {
  background-color: white;
}

@media (prefers-color-scheme: dark) {
  ion-accordion.accordion-expanding,
  ion-accordion.accordion-expanded {
    background-color: rgba(39, 39, 42, 1); /* zinc-800 */
  }
}
</style>