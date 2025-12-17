<template>
  <ion-content>

    <div class="relative w-full bg-[#F6F8F7] ion-padding">

      <section v-if="loading"
        class="flex fixed top-0 right-0 bottom-0 left-0 z-50 justify-center items-center bg-white bg-opacity-90">
        <!--Loader dots spinner (when user is logging in)-->
        <LoaderMultipleDots />-
      </section>

      <div class="px-1 py-1 mx-auto max-w-8xl md:px-2">
        <div class="grid grid-cols-1 gap-8 items-center md:grid-cols-2">
          <div class="order-2 space-y-3 md:order-1">
            <h2
              class="p-0 m-0 text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-blue-500 to-blue-400 font-manrope">
              Su plataforma para consultar un experto:
            </h2>

            <aside class="grid grid-cols-3 p-2 text-blue-500 bg-white rounded-3xl shadow-sm ion-padding min-h-28">
              <div class="grid col-span-2 items-center p-2">
                <h4 class="text-base font-manrope">Inicie sesión para consultar un experto <span
                    class="font-bold text-blue-600">{{ experts[currentExpert].name
                    }}</span>
                </h4>
                <div
                  class="flex flex-col justify-around items-center p-1 text-sm font-medium text-center text-blue-700 bg-blue-100 rounded-2xl opacity-90 text-md font-poppins">
                  <p>¡Primera consulta gratis! </p>
                  <div class="flex gap-2">
                    <v-icon name="md-supportagent-outlined" scale="1" />
                    <v-icon name="bi-gift-fill" scale="1" />
                  </div>
                </div>
              </div>
              <div class="flex justify-center items-center min-h-28">
                <img :src="experts[currentExpert].img"
                  class="w-40 rounded-3xl ring-2 ring-blue-500 ring-offset-2 animate-fade"
                  :key="experts[currentExpert].name" :alt="experts[currentExpert].name">
              </div>
            </aside>


            <div class="flex justify-center mt-7 w-full shadow-sm transition-colors duration-300 ease-in-out"
              :class="{ 'bg-gradient-to-r from-blue-600 to-blue-600 shadow-sm rounded-2xl ring-1 ring-blue-200 animate-fade': isAccordionOpen, 'bg-white shadow-md rounded-full': !isAccordionOpen }">
              <div class="w-full">
                <div class="w-full">
                  <!-- Header del acordeón -->
                  <div class="flex justify-between items-center p-4 rounded-lg cursor-pointer" @click="toggleAccordion">
                    <span class="font-medium text-md font-poppins"
                      :class="{ 'text-white': isAccordionOpen, 'text-blue-600': !isAccordionOpen }">{{ isAccordionOpen ?
                        'Listado de expertos' : 'Ver todos los expertos' }}</span>
                    <v-icon name="hi-solid-chevron-down" scale="1.5"
                      class="transition-transform duration-300 ease-in-out"
                      :class="{ 'rotate-180 text-white ': isAccordionOpen }" />
                  </div>

                  <!-- Contenido del acordeón -->
                  <div v-show="isAccordionOpen"
                    class="p-4 bg-white rounded-b-2xl animate-fade-down animate-duration-300">
                    <ul>
                      <li v-for="(expert, index) in experts" :key="index" @click="setUserSelection(expert.name)"
                        class="p-1 mb-1 font-medium rounded-md transition-colors duration-200 cursor-pointer text-slate-700 font-inter hover:bg-blue-600 hover:text-white animate-fade-down ion-padding"
                        :class="{
                          'bg-blue-600 text-white': expert.name === experts[currentExpert].name,
                          'bg-blue-500/25': expert.name !== experts[currentExpert].name,
                          'bg-blue-800 text-white font-black italic': expert.name === userSelection,
                        }" :style="{
                          'animation-delay': `${index * 50}ms`
                        }">
                        {{ expert.name.includes('en') ? expert.name.replace(/en/, '') : expert.name }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>
      </div>







      <form @submit.prevent="login" class="mt-8 space-y-6">

        <div class="flex flex-col space-y-2 text-left">
          <h1 class="text-3xl font-bold text-slate-800 font-manrope">Bienvenido</h1>
          <p class="text-sm text-slate-500 font-medium">Ingresa tus credenciales para continuar</p>
        </div>

        <div class="space-y-5">
          <!-- Email Input -->
           <div class="relative group">
            <ion-item lines="none" class="rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 group-focus-within:border-blue-500 group-focus-within:ring-2 group-focus-within:ring-blue-100 bg-white">
              <ion-icon slot="start" :icon="mailOutline" class="text-gray-400 group-focus-within:text-blue-500 transition-colors ml-2"></ion-icon>
              <ion-input 
                v-model="email" 
                type="email" 
                placeholder="tu@correo.com"
                class="font-medium text-slate-700 h-14"
                --padding-start="10px"
              ></ion-input>
            </ion-item>
           </div>

          <!-- Password Input -->
          <div class="relative group">
            <ion-item lines="none" class="rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 group-focus-within:border-blue-500 group-focus-within:ring-2 group-focus-within:ring-blue-100 bg-white">
              <ion-icon slot="start" :icon="lockClosed" class="text-gray-400 group-focus-within:text-blue-500 transition-colors ml-2"></ion-icon>
              <ion-input 
                v-model="password" 
                type="password" 
                placeholder="************"
                class="font-medium text-slate-700 h-14"
                --padding-start="10px"
              ></ion-input>
              <ion-button 
                fill="clear" 
                slot="end" 
                @click="showPassword = !showPassword"
                class="text-gray-400 hover:text-gray-600"
              >
                <ion-icon slot="icon-only" :icon="showPassword ? eye : eyeOff"></ion-icon>
              </ion-button>
            </ion-item>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="space-y-4 pt-2">
          <ion-button 
            expand="block" 
            @click="login" 
            class="h-14 font-bold rounded-2xl shadow-lg shadow-blue-500/30 text-white"
            style="--background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); --border-radius: 16px; text-transform: none; letter-spacing: 0.5px;"
          >
            Iniciar Sesión
          </ion-button>

          <div class="flex justify-center">
            <button 
              type="button"
              id="present-alert" 
              class="text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              ¿Olvidó su contraseña?
            </button>
          </div>
          
            <ion-alert trigger="present-alert" header="Recuperar contraseña" sub-header="Ingresa tu correo para recibir instrucciones" :buttons="alertButtons"
            :inputs="alertInputs" class="custom-alert"></ion-alert>
        </div>

      </form>

    </div>


  </ion-content>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import Abogado from '@/assets/img/Abogado.jpeg';
import Arquitecto from '@/assets/img/arquitecto.jpeg';
import Chef from '@/assets/img/ChefFin.jpeg';
import Contador from '@/assets/img/Contador.jpeg';
import Gestor from '@/assets/img/Gestor.jpeg';
import Ingeniero from '@/assets/img/Ingeniero.jpeg';
import Maestro from '@/assets/img/Maestro.jpeg';
import Marketing from '@/assets/img/Marketing.jpeg';
import Medico from '@/assets/img/Medico.jpeg';
import Peritaje from '@/assets/img/Peritaje.jpeg';
import Psicologo from '@/assets/img/Psicologo.jpeg';
import Publicidad from '@/assets/img/Publicidad.jpeg';
import Traductor from '@/assets/img/Traductor.jpeg';
import WebDesigner from '@/assets/img/webDev.jpeg';











import {
  IonItem,
  IonInput,
  IonButton,
  IonIcon,
  IonAlert,
  IonContent
} from '@ionic/vue';
import {
  lockClosed,
  eye,
  eyeOff,
  mailOutline
} from 'ionicons/icons';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import { authStore } from '@/store/auth';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import LoaderMultipleDots from '@/animations/LoaderMultipleDots.vue';
import clientStore from '@/store/client';
import {
  onIonViewDidEnter,
  onIonViewWillLeave,
  onIonViewDidLeave
} from '@ionic/vue';
import { toastController } from '@ionic/vue';

const presentToast = async (position: 'top' | 'middle' | 'bottom', message: string, color = 'light') => {
  const toast = await toastController.create({
    message: message,
    duration: 1500,
    position: position,
    color: color,
    swipeGesture: 'vertical',
    translucent: true,
    buttons: [
      {
        text: 'cerrar',
        role: 'cancel',
      }
    ]
  });

  await toast.present();
};


const email = ref('');
const password = ref('');
const showPassword = ref(false);

//router for ionic to push views 
const router = useRouter();

const auth = getAuth();
const db = getFirestore();
const collectionEmailsExperts = collection(db, 'EmailsExperts');
const verifyIsExpert = async (email: string) => {
  const qGetExpertMatch = query(collectionEmailsExperts, where('email', '==', email));
  const docSnapshot = await getDocs(qGetExpertMatch);
  try {
    if (docSnapshot.empty) {
      console.log('No se encontro un experto con este correo, el usuario es cliente');
      return false;
    }
    docSnapshot.forEach((doc) => {
      console.log('Se encontro un experto con este correo, el usuario es experto');
      console.log(doc.id, ' => ', doc.data());
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}


const adminEmailsCollection = collection(db, 'AdminEmails');
const isAdminEmail = async (email: string) => {
  try {
    const qGetAdminMatch = query(adminEmailsCollection, where('email', '==', email));
    const snapshot = await getDocs(qGetAdminMatch);
    if (snapshot.empty) {
      console.log('There are not results for the current email');
      return false;
    }
    // Since we queried by email, existence implies it matches.
    // However, keeping the logging logic but simplifying the return.
    snapshot.docs.forEach(doc => {
      console.log(doc.data());
      if (doc.data().email === email) {
        console.log(`El correo ${email} es de un administrador`);
      }
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const handleAdminLogin = (uid: string, name: string, userEmail: string) => {
  authStore().setIsAuth(true);
  authStore().setUserUid(uid);
  authStore().setUserName(name);
  authStore().setUserEmail(userEmail);
  authStore().setIsAdmin(true);

  presentToast("top", `Bienvenido ${name}`, "success");
  router.push("/expert-list-admin"); // ruta especial
};

const handleExpertLogin = (uid: string, name: string, userEmail: string) => {
  authStore().setIsAuth(true);
  authStore().setUserUid(uid);
  authStore().setUserName(name);
  authStore().setUserEmail(userEmail);
  authStore().setIsExpert(true);

  presentToast("top", `Bienvenido ${name}`, "success");
  router.push("/expert");
};

const handleClientLogin = (uid: string, name: string, userEmail: string) => {
  authStore().setIsAuth(true);
  authStore().setUserUid(uid);
  clientStore().setClientUid(uid);
  authStore().setUserName(name);
  authStore().setUserEmail(userEmail);
  authStore().setIsClient(true);

  presentToast("top", `Bienvenido ${name}`, "success");
  router.push("/tabs/expert-list-modern");
};


const login = async () => {

  if (!email.value || !password.value) {
    presentToast("top", "Por favor, ingrese su correo y contraseña", "danger");
    return;
  }
  setLoading(true);
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);

    if (!userCredential || !userCredential.user || !userCredential.user.email || !userCredential.user.uid) {
      setLoading(false);
      return;
    }

    const { email: userEmail, uid, displayName } = userCredential.user;
    const name = displayName || "Usuario";

    // 1. Special roles
    if (await isAdminEmail(userEmail)) {
      handleAdminLogin(uid, name, userEmail);
      return;
    }

    // 2. Dynamic roles
    const isExpert = await verifyIsExpert(userEmail);

    if (isExpert) {
      handleExpertLogin(uid, name, userEmail);
    } else {
      handleClientLogin(uid, name, userEmail);
    }

  } catch (error) {
    console.error(error);
    presentToast("top", "Error al iniciar sesión, intente de nuevo", "danger");
  } finally {
    setLoading(false);
  }
};


const isAccordionOpen = ref(false);

const toggleAccordion = () => {
  isAccordionOpen.value = !isAccordionOpen.value;
};

const experts = ref([
  { name: "Abogado", icon: "fa-balance-scale", img: Abogado },
  { name: "Médico", icon: "fa-user-md", img: Medico },
  { name: "Contador", icon: "fa-calculator", img: Contador },
  { name: "Arquitecto", icon: "fa-building", img: Arquitecto },
  { name: "en Servicios Web", icon: "fa-laptop-code", img: WebDesigner },
  { name: "en Publicidad", icon: "fa-bullhorn", img: Publicidad },
  { name: "Traductor", icon: "fa-language", img: Traductor },
  { name: "en Peritaje", icon: "fa-search", img: Peritaje },
  { name: "en Ingeniería en Computación", icon: "fa-cog", img: Ingeniero },
  { name: "en Gestoría en Trámites", icon: "fa-file-alt", img: Gestor },
  { name: "en Marketing", icon: "fa-chart-line", img: Marketing },
  { name: "Psicólogo/a", icon: "fa-user-graduate", img: Psicologo },
  { name: "Maestro", icon: "fa-chalkboard-teacher", img: Maestro },
  { name: "Chef", icon: "fa-utensils", img: Chef }
]);


const currentExpert = ref(0);

onMounted(() => {
  if (!isSelecting.value) {
    setInterval(() => {
      currentExpert.value++;
      if (currentExpert.value >= experts.value.length) {
        currentExpert.value = 0;
      }

    }, 4000);
  }
});

//Is user selecting an expert (boolean)
const isSelecting = ref();

//User selection (expert user selected)
const userSelection = ref();

//Setting the user selection to store on the userSelection ref
const setUserSelection = (expert: string): void => {
  isSelecting.value = true;
  userSelection.value = expert;
}


const alertButtons = [
  {
    text: 'Cancelar',
    role: 'cancel',
    handler: () => {
      console.log('Cancelado')
    }
  },
  {
    text: 'Aceptar',
    handler: async (data: any) => {
      try {
        console.log(data[0]);

        await sendPasswordResetEmail(auth, data[0])
        presentToast('top', 'Correo de restablecimiento de contraseña enviado', 'success');
        console.log('Correo de restablecimiento de contraseña enviado');
      } catch (error) {
        console.log('Error al enviar correo de restablecimiento de contraseña', error);
        presentToast('top', 'Error al enviar correo de restablecimiento de contraseña', 'danger');
      }
    }
  }
]


const alertInputs = [
  {
    type: 'email',
    placeholder: 'correo@ejemplo.com',
    min: 1,
    max: 1000,
  },
];



const loading = ref(false);
const setLoading = (value: boolean) => loading.value = value;


//Animation for brand name

const names = [
  ['consulta', 'gratis', 'en', 'linea', '.com'],
  ['consulta', 'experto', '.com'],
  ['consulta', 'especializada', '.com']
];

const currentName = ref<string[]>(names[0]);
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const startAnimation = () => {
  const changeName = () => {
    timeoutId = setTimeout(() => {
      const currentIndex = names.findIndex(name =>
        JSON.stringify(name) === JSON.stringify(currentName.value)
      );
      const nextIndex = (currentIndex + 1) % names.length;
      currentName.value = names[nextIndex];
      changeName(); // Siguiente iteración
    }, 5000);
  };

  // Iniciar la animación
  changeName();
};

const stopAnimation = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
};

// Cuando la vista está a punto de entrar
onIonViewDidEnter(() => {
  startAnimation();


});

// Cuando la vista está a punto de salir
onIonViewWillLeave(() => {
  stopAnimation();
});

// Cuando la vista ya salió
onIonViewDidLeave(() => {
  stopAnimation();
});
</script>

<style scoped>
.container {
  padding: 2rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.header {
  text-align: center;
  margin-bottom: .5rem;
}

.header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--ion-color-dark);
  margin-bottom: 0.5rem;
}

.header p {
  color: var(--ion-color-medium);
}

.form-container {
  background: transparent;
  margin-bottom: 1.5rem;
}

.input-item {
  --background: var(--ion-color-light);
  --border-radius: 12px;
  --padding-start: 1rem;
  --padding-end: 1rem;
  margin-bottom: 1rem;
}

.input-icon {
  color: var(--ion-color-medium);
  margin-right: 1rem;
}

.custom-input {
  --padding-start: 0;
}

.password-toggle {
  --padding-end: 0;
  color: var(--ion-color-medium);
}

.login-button {
  --border-radius: 25px;
  --padding: 1;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  height: 60px;
  font-weight: 600;
  margin-bottom: 1rem;
}

.forgot-password {
  --color: var(--ion-color-medium);
  text-transform: none;
  font-size: 0.9rem;
}

.actions {
  text-align: center;
}

.welcome {
  color: aqua;
}

.expert-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
}

.expert-icon {
  font-size: 3.5rem;
  color: var(--ion-color-primary);
  margin-bottom: 1rem;
}

.expert-title {
  text-align: center;
  font-size: 1.5rem;
  color: var(--ion-color-dark);
  margin: 0;
}

.expert-variable {
  color: var(--ion-color-primary);
  font-weight: 600;
}

.expert-info {
  background: rgb(8, 164, 255);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 2rem 0;
  color: white;
}

.professional-text {
  text-align: center;
  color: var(--ion-color-dark);
  line-height: 1.4;
  margin: 0;
  font-size: 0.95rem;
}

/* Estilo más sutil para la consulta gratis */
.free-consultation.subtle {
  background: rgba(var(--ion-color-success-rgb), 0.1);
  border: 1px solid rgba(var(--ion-color-success-rgb), 0.2);
  border-radius: 12px;
  padding: 5px;
  text-align: center;
  margin-top: 1.5rem;
}

.free-consultation.subtle .consultation-icon {
  font-size: 1.5rem;
  color: var(--ion-color-success);
  margin-bottom: 0.5rem;
}

.free-consultation.subtle .consultation-text {
  color: var(--ion-color-medium);
  font-size: 0.85rem;
  line-height: 1.3;
  margin: 0;
}

.free-consultation.subtle strong {
  color: var(--ion-color-success);
  font-weight: 500;
}

ion-accordion {
  margin: 0 auto;
}

ion-accordion.accordion-expanding,
ion-accordion.accordion-expanded {
  width: calc(100% - 32px);

  margin: 16px auto;
}

ion-accordion.accordion-collapsing ion-item[slot='header'],
ion-accordion.accordion-collapsed ion-item[slot='header'] {
  --background: var(--ion-color-light);
  --color: var(--ion-color-light-contrast);
}

ion-accordion.accordion-expanding ion-item[slot='header'],
ion-accordion.accordion-expanded ion-item[slot='header'] {
  --background: var(--ion-color-primary);
  --color: var(--ion-color-primary-contrast);
}

ion-content {
  --background: #F6F8F7 !important;
}

ion-icon.custom {
  --background: var(--ion-color-primary);
  --color: red;
}

ion-button.login {
  --background: rgb(0, 75, 156);
  --color: white;
  --border-radius: 20px;
  --padding: 1;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 60px;
  font-weight: 600;
  margin-bottom: 1rem;
}

ion-input.input {
  --border-radius: 25px;
  --padding: 1;
  --box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 60px;
  font-weight: 600;
}
</style>