<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="text-base font-bold text-blue-500 sm:text-xl font-quicksand">Ayuda</ion-title>
                <div slot="end" class="flex">
            <span v-html="currentName" :key="currentName" class="text-xs"></span>
          </div>
                <ion-buttons slot="start">
                    <ion-button @click="router.back()">
                        <v-icon name="md-arrowbackiosnew-round" color="blue"   class="animate-fade-left" /> 
                        <span class="text-base text-blue-700 animate-fade-left animate-delay-100">atras</span>
                    </ion-button>
                
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <section>
  <section class="animate-fade-up">
    <div class="block my-4 h-2 bg-gray-200 md:hidden separador"></div>

    <section class="py-12 bg-gray-100 site-header-ayuda">
      <div class="px-4 mx-auto max-w-6xl contenedor">
        <div class="text-center texto-site-ayuda">
          <h2 class="mb-4 text-3xl font-bold text-gray-800">
            <v-icon name="fa-question-circle" scale="1.2" class="mr-2 text-blue-700" />
            Sección de Ayuda
          </h2>
          <p class="text-gray-600">Si no encuentras la solución a tu duda puede ponerse en contacto con nosotros
            <RouterLink to="/contact" class="text-blue-600 underline enlace hover:text-blue-800">aquí</RouterLink>
          </p>
        </div>
      </div>
    </section>

    <section class="flex flex-wrap justify-center px-4">
      <div class="p-4 w-full md:w-1/3">
        <div class="text-center contenedor">
          <p class="mb-4 text-lg text-gray-700">Tiene un contacto directo con nosotros para cualquier duda, consejo o reclamo</p>
          <div class="my-2">
            <RouterLink to="/contact" class="inline-block px-6 py-3 text-white bg-blue-600 rounded transition btn-general hover:bg-blue-700">
              <v-icon name="fa-paper-plane" scale="1" class="mr-2" />
              Contactar
            </RouterLink>
          </div>
        </div>
      </div>

      <div class="p-6 w-full bg-gray-200 rounded-lg border border-blue-400 md:w-2/3 fondo-gris-ayuda">
        <h2 class="mb-4 text-2xl font-bold text-gray-800">
          <v-icon name="fa-question" scale="1.2" class="mr-2 text-blue-700" />
          Preguntas Frecuentes
        </h2>

        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div class="cincuenta">
            <input type="checkbox" id="spoiler1" class="hidden">
            <label for="spoiler1" class="block my-2 font-semibold text-blue-600 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-user-graduate" scale="1" class="mr-2" />
              ¿Por qué se les llama expertos/profesionistas?
            </label>
            <div class="pl-4 mb-4 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">Las personas a quienes pedirás apoyo, son expertos en el área que ejercen por sus estudios y experiencias laborales.</p>
            </div>

            <input type="checkbox" id="spoiler2" class="hidden">
            <label for="spoiler2" class="block my-2 font-semibold text-blue-600 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-dollar-sign" scale="1" class="mr-2" />
              ¿Qué costo tiene?
            </label>
            <div class="pl-4 mb-4 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">El registro no tiene costo, tendrás 15 minutos de asesoría gratuita para poner a prueba o realizar una consulta a nuestros expertos.</p>
            </div>

            <input type="checkbox" id="spoiler3" class="hidden">
            <label for="spoiler3" class="block my-2 font-semibold text-blue-600 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-id-card" scale="1" class="mr-2" />
              ¿Por qué piden mi identificación?
            </label>
            <div class="pl-4 mb-4 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">Para evitar que se abuse del sistema de prueba pedimos como requerimiento una identificación para verificar que el usuario es verídico.</p>
            </div>
          </div>

          <div class="cincuenta">
            <input type="checkbox" id="spoiler4" class="hidden">
            <label for="spoiler4" class="block my-2 font-semibold text-blue-600 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-shield-alt" scale="1" class="mr-2" />
              ¿Mis datos son seguros?
            </label>
            <div class="pl-4 mb-4 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">Los datos que ingrese y envié son totalmente confidenciales, el experto firmará un contrato de privacidad.</p>
            </div>

            <input type="checkbox" id="spoiler5" class="hidden">
            <label for="spoiler5" class="block my-2 font-semibold text-blue-600 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-user-plus" scale="1" class="mr-2" />
              ¿Cómo contratar a un experto?
            </label>
            <div class="pl-4 mb-4 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">Si usted es nuevo usuario, aproveche los 15 minutos de prueba para realizar sus consultas.</p>
            </div>

            <input type="checkbox" id="spoiler6" class="hidden">
            <label for="spoiler6" class="block my-2 font-semibold text-blue-600 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-credit-card" scale="1" class="mr-2" />
              ¿Cuáles son las formas de pago?
            </label>
            <div class="pl-4 mb-4 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">Los medios de pago podrán ser por transferencias al número de cuenta que proporcione el experto.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="my-8 h-2 bg-gray-200 separador"></div>

    <section class="px-4 py-10 mx-auto max-w-6xl contenedor">
      <h2 class="mb-6 text-2xl font-bold text-gray-800">
        <v-icon name="fa-comments" scale="1.2" class="mr-2 text-blue-700" />
        Preguntas Recientes
      </h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div class="space-y-6">
          <div>
            <input type="checkbox" id="spoiler7" class="hidden">
            <label for="spoiler7" class="block font-semibold text-gray-700 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-user-tie" scale="1" class="mr-2" />
              Necesito al profesional de forma presencial ¿Se puede?
            </label>
            <div class="pl-4 mt-2 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">El profesional será quien determine la posibilidad de acudir a una reunión presencial.</p>
            </div>
          </div>

          <div>
            <input type="checkbox" id="spoiler8" class="hidden">
            <label for="spoiler8" class="block font-semibold text-gray-700 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-question-circle" scale="1" class="mr-2" />
              Necesito realizar consultas de otros temas
            </label>
            <div class="pl-4 mt-2 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">Al momento tenemos 12 categorías de profesionales que estarán dispuestos a ayudarle.</p>
            </div>
          </div>

          <div>
            <input type="checkbox" id="spoiler9" class="hidden">
            <label for="spoiler9" class="block font-semibold text-gray-700 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-clock" scale="1" class="mr-2" />
              El horario del experto no coincide con mis horarios
            </label>
            <div class="pl-4 mt-2 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">El experto tiene un horario específico, en caso de querer realizar una contratación podrá enviarnos los datos.</p>
            </div>
          </div>

          <div>
            <input type="checkbox" id="spoiler10" class="hidden">
            <label for="spoiler10" class="block font-semibold text-gray-700 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-image" scale="1" class="mr-2" />
              ¿Puedo enviar imágenes y evidencia al experto?
            </label>
            <div class="pl-4 mt-2 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">Podrá enviar diferentes archivos al experto desde su correo una vez que se haya realizado el contacto.</p>
            </div>
          </div>
        </div>

        <div class="space-y-6">
          <div>
            <input type="checkbox" id="spoiler11" class="hidden">
            <label for="spoiler11" class="block font-semibold text-gray-700 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-exclamation-triangle" scale="1" class="mr-2" />
              ¿Cómo puedo reclamar de un experto?
            </label>
            <div class="pl-4 mt-2 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">Para reclamar o realizar quejas, sugerencias o comentarios hacia cualquiera de nuestros expertos podrá realizarlos desde nuestro formulario.</p>
            </div>
          </div>

          <div>
            <input type="checkbox" id="spoiler12" class="hidden">
            <label for="spoiler12" class="block font-semibold text-gray-700 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-check-circle" scale="1" class="mr-2" />
              ¿Cómo sé que estoy contratando un experto?
            </label>
            <div class="pl-4 mt-2 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">Al realizar el contacto con el profesionista, él le enviará un mensaje de bienvenida en el cual se presentará indicando sus aptitudes en el área.</p>
            </div>
          </div>

          <div>
            <input type="checkbox" id="spoiler13" class="hidden">
            <label for="spoiler13" class="block font-semibold text-gray-700 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-clock" scale="1" class="mr-2" />
              ¿Cómo pido otros 15 minutos?
            </label>
            <div class="pl-4 mt-2 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">No podrá obtener otros 15 minutos si ya ha ocupado los de prueba.</p>
            </div>
          </div>

          <div>
            <input type="checkbox" id="spoiler14" class="hidden">
            <label for="spoiler14" class="block font-semibold text-gray-700 cursor-pointer hover:text-blue-800">
              <v-icon name="fa-file-contract" scale="1" class="mr-2" />
              ¿Tendría un contrato?
            </label>
            <div class="pl-4 mt-2 border-l-4 border-blue-300 spoiler">
              <p class="text-gray-600">Al contratar un experto, se otorgaría un contrato el cual describiría el trabajo a realizar, los precios y tiempos de ser necesario.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="my-8 h-2 bg-gray-200 separador"></div>
  </section>
</section>

        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, onIonViewDidEnter, onIonViewDidLeave } from '@ionic/vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();


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

</style>