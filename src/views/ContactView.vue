<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="font-bold text-blue-700">Contacto</ion-title>
                <div class="flex">
            <span v-html="currentName" :key="currentName" :class="{'pl-2': expertPopup}"></span>
          </div>
                <ion-buttons slot="end">
                    <ion-button @click="router.push('/tabs/experts-list')">
                        <v-icon name="md-arrowbackiosnew-round" color="blue"   class="animate-fade-left" /> 
                        <span class="text-base text-blue-700 animate-fade-left animate-delay-100">inicio</span>
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content class="flex flex-col gap-4 p-4 mx-auto w-full bg-gray-100 ion-padding">
  <div class="flex flex-col gap-4 p-4 mx-auto w-full">
    <!-- Direct Contact Section -->
    <section class="p-4 bg-blue-50 rounded-lg shadow-lg">
      <div class="flex items-center mb-2">
        <v-icon name="co-comments" scale="1.2" class="mr-2 text-blue-700" />
        <h3 class="text-xl font-bold text-blue-700">Contacto directo</h3>
      </div>
      <p class="mb-3 text-sm text-gray-600">
        <v-icon name="fa-question-circle" scale="1" class="mr-1 text-blue-700" />
        ¿Tiene preguntas? ¿Sugerencias? ¿Comentarios? Redacte su mensaje.
      </p>

      <div class="flex justify-center mb-4">
        <a href="https://api.whatsapp.com/send?phone=525562516687&text=Me%20interesa%20saber%20más%20acerca%20de%20Consulta%20Experto%"
        class="inline-flex justify-center items-center px-4 py-2 text-white bg-blue-600 rounded-lg transition duration-300 hover:bg-blue-700">
          <v-icon name="bi-whatsapp" scale="1.2" class="mr-2 text-white" />
          Escribir por WhatsApp
        </a>
      </div>

      <p class="mb-2 text-sm text-blue-700">
        <v-icon name="fa-info-circle" scale="1" class="mr-1 text-blue-700" />
        ¿Tiene dudas?
      </p>
      <p class="mb-3 text-sm text-gray-600">
        <v-icon name="fa-file-alt" scale="1" class="mr-1 text-blue-700" />
        Tenemos una sección con las preguntas más frecuentes.
      </p>
      <ion-button router-link="/help"
                 class="inline-flex justify-center items-center px-4 py-2 text-white rounded-lg transition duration-300 hover:bg-blue-800">
        <v-icon name="fa-life-ring" scale="1.2" class="mr-2 text-white" />
        Ir a la sección de Preguntas Frecuentes
      </ion-button>
    </section>

    <!-- Contact Form Section -->
    <section class="p-4 bg-blue-100 rounded-lg shadow-lg">
      <form class="space-y-4">
        <div>
          <label for="name" class="block mb-1 text-sm font-medium text-blue-700">
            <v-icon name="fa-user" scale="1" class="mr-1 text-blue-700" />
            Nombre:
          </label>
          <input type="text" name="name" id="name" placeholder="Su nombre"
                 class="p-2 w-full bg-white rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
        </div>

        <div class="flex flex-col gap-4">
          <div>
            <label for="email" class="block mb-1 text-sm font-medium text-blue-700">
              <v-icon name="fa-envelope" scale="1" class="mr-1 text-blue-700" />
              Correo electrónico:
            </label>
            <input type="email" name="email" id="email" placeholder="Correo Electrónico"
                   class="p-2 w-full bg-white rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
          <div>
            <label for="phone" class="block mb-1 text-sm font-medium text-blue-700">
              <v-icon name="fa-phone" scale="1" class="mr-1 text-blue-700" />
              Teléfono:
            </label>
            <input type="tel" name="phone" id="phone" placeholder="55-55-55-55-55"
                   class="p-2 w-full bg-white rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
          </div>
        </div>

        <div>
          <label for="motivo" class="block mb-1 text-sm font-medium text-blue-700">
            <v-icon name="fa-tag" scale="1" class="mr-1 text-blue-700" />
            Seleccione un motivo:
          </label>
          <select name="motivo" id="motivo"
                  class="p-2 w-full bg-white rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option selected disabled value="">Seleccione una opción</option>
            <option value="contact">Contacto</option>
            <option value="complaint">Reclamo</option>
          </select>
        </div>

        <div>
          <label for="contratar" class="block mb-1 text-sm font-medium text-blue-700">
            <v-icon name="fa-briefcase" scale="1" class="mr-1 text-blue-700" />
            Seleccione al experto:
          </label>
          <select name="contratar" id="contratar"
                  class="p-2 w-full bg-white rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option selected value="">Seleccione una opción</option>
            <option value="Abogado">Abogado</option>
            <option value="Arquitecto">Arquitecto</option>
            <option value="Comercio Exterior">Comercio Exterior</option>
            <option value="Contadores">Contadores</option>
            <option value="Gestorías">Gestorías</option>
            <option value="Ingeniería Computacional">Ingeniería Computacional</option>
            <option value="Marketing">Marketing</option>
            <option value="Peritaje">Peritaje</option>
            <option value="Publicidad">Publicidad</option>
            <option value="Servicio Web">Servicio Web</option>
            <option value="Traductor">Traductor</option>
          </select>
        </div>

        <div>
          <label for="message" class="block mb-1 text-sm font-medium text-blue-700">
            <v-icon name="fa-comment" scale="1" class="mr-1 text-blue-700" />
            Mensaje:
          </label>
          <textarea name="message" id="message" placeholder="Redacte su mensaje"
                    class="p-2 w-full bg-white rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>

        <div>
          <button type="button"
                  class="px-4 py-2 w-full text-white bg-blue-600 rounded-lg transition duration-300 hover:bg-blue-700">
            <v-icon name="fa-paper-plane" scale="1.2" class="mr-2 text-white" />
            Enviar mensaje
          </button>
        </div>
      </form>
    </section>
  </div>
</ion-content>


    </ion-page>
</template>

<script lang="ts" setup>
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
import { reactive, ref } from 'vue';
import emailjs from '@emailjs/browser';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
import { useRouter } from 'vue-router';

const notyf = new Notyf({
  duration: 3000,
  dismissible: true,
  ripple: true,
  position: {
    x: 'center',
    y: 'top'
  }
});


const expertSelected = ref('');

const router = useRouter();

const formData = reactive({
  name: '',
  email: '',
  phone: '',
  queryType: '',
  message: '',
})
async function sendEmail() {

  // Verify essential fields
  if (!formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.message) {
    notyf.error('Por favor, complete todos los campos')
    return
  }

  // Initialize EmailJS with your public key
  emailjs.init('nGHuu3gZP4NJNyeim'); // Replace with your actual public key

  emailjs.send(
    'service_eacd7rg',
    'template_yqetxx4',
    {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      queryType: formData.queryType,
      message: formData.message,
    },
    'nGHuu3gZP4NJNyeim' // Add public key as the fourth parameter
  )
    .then((response) => {
      console.log('SUCCESS!', response.status, response.text);
      notyf.success('Su mensaje ha sido enviado correctamente!')
      formData.name = '';
      formData.email = '';
      formData.phone = '';
      formData.queryType = '';
      formData.message = '';
    }, (error) => {
      console.log('FAILED...', error);
      notyf.error('Hubo un error al enviar su mensaje. Por favor intente de nuevo.')
    });

}


const names = [
  [
    '<span class="animate-fade-down animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-blue-700 animate-fade animate-duration-300 animate-delay-200">gratis</span>' +
    '<span class="animate-fade animate-duration-300 animate-delay-300">en</span>' +
    '<span class="animate-fade animate-duration-300 animate-delay-500">linea</span>' +
    '<span class="text-blue-500 animate-fade animate-duration-300 animate-delay-500">.com</span>'
  ],
  [
    '<span class="animate-fade animate-duration-300 animate-delay-100">consulta</span>' +
    '<span class="text-blue-700 animate-fade animate-duration-300 animate-delay-200">experto</span>' +
    '<span class="text-blue-500 animate-fade animate-duration-300 animate-delay-300">.com</span>'
  ],
  [
    '<span class="animate-fade-down animate-delay-100">consulta</span>' +
    '<span class="text-blue-700 animate-fade animate-delay-200">especializada</span>' +
    '<span class="text-blue-500 animate-fade animate-delay-300">.com</span>'
  ]
];

let timeoutId: NodeJS.Timeout | null = null;
const currentName = ref<string[]>(names[0]);
 const animateNames = () => {
  timeoutId = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    currentName.value = names[randomIndex];
  }, 2000);
  
 }

 onIonViewDidEnter(() => {
  if(timeoutId){
    clearInterval(timeoutId);
    timeoutId = null;
  }
  animateNames();
})

onIonViewDidLeave(() => {
  if(timeoutId){
    clearInterval(timeoutId);
    timeoutId = null;
  }
  
})

</script>

<style scoped>
:root{
    ion-content {
  --padding-bottom: calc(80px + var(--ion-safe-area-bottom, 0px));
}
}
</style>    