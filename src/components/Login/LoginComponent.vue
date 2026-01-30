<template>
  <div
    class="relative pt-32 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 flex items-center justify-center p-6">
    <!-- Loader -->
    <section v-if="loading" class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <LoaderMultipleDots />
    </section>

    <div class="w-full  space-y-10">
      <!-- Hero / Título principal con gradiente lindo -->
      <div class="text-center space-y-4">
        <h1
          class="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 bg-clip-text text-transparent tracking-tight font-manrope mx-2 p-2">
          Consulte a un experto de manera gratuita por 15 minutos
        </h1>
        <p class="text-xl text-gray-700 font-medium">
          Con un <span class="text-blue-600 font-semibold">experto verificado</span>
        </p>
      </div>

      <div
        class="bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl p-6 transition-all hover:shadow-2xl">
        <div class="flex flex-col md:flex-row items-center gap-6">

          <div class="relative flex-shrink-0">
            <img class="w-24 h-24 rounded-full object-cover ring-4 ring-blue-200/60 shadow-lg"
              :src="experts[currentExpert].img" :alt="experts[currentExpert].name" :key="experts[currentExpert].name" />
            <div class="absolute bottom-1 right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
          </div>

          <div class="flex flex-col items-center md:items-start text-center md:text-left min-w-fit">
            <p class="text-[10px] uppercase tracking-wider text-blue-600 mb-1 font-bold">Experto Destacado</p>
            <h3 class="text-xl font-bold text-gray-900 leading-tight">{{ experts[currentExpert].name }}</h3>

            <div
              class="mt-2 inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full shadow-md">
              <v-icon name="bi-gift-fill" scale="0.85" />
              <span>¡15 min gratis!*</span>
            </div>
            <small class="text-[10px] text-gray-400 mt-1 font-poppins">*Por categoría</small>
          </div>

          <div class="w-full md:w-auto flex flex-col items-center justify-center">
            <RouterLink to="/register">
              <button
                class="w-full md:w-40 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-blue-100 flex items-center justify-center gap-2 group">
                <span>Crear Cuenta</span>
                <v-icon name="bi-chat-fill" scale="0.9" class="group-hover:scale-110 transition-transform" />
              </button>
            </RouterLink>
          </div>

          <div class="flex-1 md:border-l md:border-gray-100 md:pl-6 text-center md:text-left">
            <span class="block md:hidden text-[10px] font-bold text-gray-400 uppercase mb-2">Sobre el experto:</span>

            <p class="text-gray-600 italic text-sm leading-relaxed" :key="'resumen-' + currentExpert">
              “{{ experts[currentExpert].summary }}”
            </p>

            <div class="mt-2 flex items-center justify-center md:justify-start gap-1">
              <v-icon name="bi-star-fill" class="text-yellow-400" scale="0.7" v-for="i in 5" :key="i" />
              <span class="text-[10px] text-green-600 font-bold ml-2">Disponible ahora</span>
            </div>
          </div>

        </div>
      </div>

      <!-- Acordeón de expertos – más elegante -->
      <div>
        <button @click="toggleAccordion"
          class="w-full flex items-center justify-between px-5 py-4 bg-white border border-blue-200 rounded-xl text-left shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
          :class="{ 'border-blue-500 bg-blue-50/60': isAccordionOpen }">
          <span class="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
            {{ isAccordionOpen ? 'Ocultar lista de expertos' : 'Ver todos los expertos disponibles' }}
          </span>
          <v-icon name="hi-solid-chevron-down"
            class="text-blue-500 text-xl transition-transform duration-300 group-hover:scale-110"
            :class="{ 'rotate-180': isAccordionOpen }" />
        </button>

        <div v-show="isAccordionOpen"
          class="mt-3 bg-white border border-blue-100 rounded-xl shadow-lg overflow-hidden divide-y divide-blue-50 animate-fade-in">
          <ul class="max-h-72 overflow-y-auto">
            <li v-for="(expert, index) in experts.sort((a, b) => a.name.localeCompare(b.name))" :key="index"
              @click="setUserSelection(expert.name)"
              class="px-5 py-4 cursor-pointer hover:bg-blue-50/70 transition-colors flex items-center gap-4" :class="{
                'bg-blue-100/60 font-semibold text-blue-800': expert.name === experts[currentExpert].name,
                'border-l-4 border-blue-500': expert.name === userSelection
              }">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-medium">
                <img class="w-full h-full object-cover rounded-2xl" :src="expert.img" alt="">
              </div>

              <span class="font-semibold text-blue-500 group-hover:text-blue-700 transition-colors">{{
                expert.name.replace('en ', '') }}</span>
              <span class="text-gray-500 italic ">{{ expert.summary }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Formulario de login – más lindo, con mejor espaciado y color -->
      <form @submit.prevent="login"
        class="bg-white border border-blue-100 rounded-2xl shadow-xl p-8 space-y-7 backdrop-blur-sm">

        <div :id="loginRoleStore.role" class="text-center space-y-2">
          <h2 class="text-3xl font-bold text-blue-500 font-manrope">Iniciar Sesión como {{ loginRoleStore.role ===
            'user' ? 'Usuario' : loginRoleStore.role === 'expert' ? 'Experto' : 'Administrador' }}</h2>
          <p class="text-gray-600">Inicie sesión para iniciar la gestión de sus consultas</p>
        </div>

        <div class="flex p-1 bg-blue-50/50 rounded-xl border border-blue-100">
          <button type="button" @click="loginRoleStore.setRole('user')"
            :class="loginRoleStore.role === 'user' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-blue-500'"
            class="flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200">
            Usuario
          </button>
          <button type="button" @click="loginRoleStore.setRole('expert')"
            :class="loginRoleStore.role === 'expert' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-blue-500'"
            class="flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200">
            Experto
          </button>
          <button type="button" @click="loginRoleStore.setRole('admin')"
            :class="loginRoleStore.role === 'admin' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500 hover:text-blue-500'"
            class="flex-1 py-2 text-sm font-semibold rounded-lg transition-all duration-200">
            Admin
          </button>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Correo electrónico</label>
          <div
            class="flex items-center px-5 py-4 bg-blue-50/40 border border-blue-200 rounded-xl focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-md focus-within:ring-2 focus-within:ring-blue-200 transition-all">
            <v-icon class="text-blue-500 mr-3 text-xl" name="md-email" />
            <input v-model="email" type="email"
              class="bg-transparent border-none outline-none flex-1 text-gray-800 placeholder-gray-500 font-medium"
              placeholder="su@correo.com" required />
          </div>
        </div>

        <div class="space-y-2">
          <label class="block text-sm font-medium text-gray-700">Contraseña</label>
          <div
            class="flex items-center px-5 py-4 bg-blue-50/40 border border-blue-200 rounded-xl focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-md focus-within:ring-2 focus-within:ring-blue-200 transition-all">
            <v-icon class="text-blue-500 mr-3 text-xl" name="md-password-round" />
            <input v-model="password" :type="showPassword ? 'text' : 'password'"
              class="bg-transparent border-none outline-none flex-1 text-gray-800 placeholder-gray-500 font-medium"
              placeholder="••••••••••" required />
            <button type="button" @click="showPassword = !showPassword"
              class="text-blue-500 hover:text-blue-700 transition-colors">
              <v-icon :name="showPassword ? 'hi-solid-eye' : 'hi-solid-eye-off'" />
            </button>
          </div>
        </div>

        <div class="pt-4 space-y-5">
          <button type="submit"
            class="w-full py-4 bg-gradient-to-r bg-white text-blue-600 font-bold text-lg rounded-xl shadow-lg  hover:to-indigo-700 hover:shadow-xl active:scale-[0.98] transition-all duration-200">
            Iniciar Sesión
          </button>
          <RouterLink to="/register"
            class="w-full block py-4 bg-gradient-to-r from-blue-500 to-blue-400 text-white font-bold text-center text-lg rounded-xl shadow-lg hover:from-blue-600 hover:to-blue-500 hover:shadow-xl active:scale-[0.98] transition-all duration-200">
            Registrarse
          </RouterLink>

          <div class="text-center">
            <button type="button" @click="showResetModal = true"
              class="text-blue-600 hover:text-blue-800 font-medium transition-colors">
              ¿Olvidó su contraseña?
            </button>
          </div>
        </div>
      </form>
    </div>


    <div @click="showVerifyEmail = false" v-show="showVerifyEmail"
      class="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <VerifyYourEmail :email="email" class="animate-fade-in" />
    </div>
    <!-- Modal de reset (con toques de color) -->
    <GenericModal v-model:show="showResetModal" title="Recupera tu acceso"
      message="Le enviaremos un enlace a su correo para restablecer la contraseña." confirmText="Enviar enlace"
      @confirm="handleResetPassword">
      <div class="mt-6">
        <div
          class="flex items-center px-5 py-4 bg-blue-50/40 border border-blue-200 rounded-xl focus-within:border-blue-500 focus-within:bg-white focus-within:shadow-md focus-within:ring-2 focus-within:ring-blue-200 transition-all">
          <v-icon class="text-blue-500 mr-3 text-xl" name="md-email" />
          <input v-model="resetEmail" type="email"
            class="bg-transparent border-none outline-none flex-1 text-gray-800 placeholder-gray-500"
            placeholder="tu@correo.com" />
        </div>
      </div>
    </GenericModal>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import GenericModal from '@/components/Common/GenericModal.vue';
import { RouterLink } from 'vue-router';

// Image imports
import Abogado from '@/assets/img/Abogado.jpeg';
import Arquitecto from '@/assets/img/arquitecto.jpeg';
import Chef from '@/assets/img/ChefFin.jpeg';
import Contador from '@/assets/img/Contador.jpeg';
import Gestor from '@/assets/img/Gestor.jpeg';
import Ingeniero from '@/assets/img/Ingeniero.jpeg';
import Maestro from '@/assets/img/Maestro.jpeg';
import Marketing from '@/assets/img/Marketingv2.jpg';
import Medico from '@/assets/img/Medico.jpeg';
import Peritaje from '@/assets/img/PeritajeV2.jpeg';
import Psicologo from '@/assets/img/Psicologo.jpeg';
import Publicidad from '@/assets/img/Publicidad.jpeg';
import Traductor from '@/assets/img/Traductor.jpeg';
import WebDesigner from '@/assets/img/webDev.jpeg';

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User
} from 'firebase/auth';
import { auth as authFirebase } from '@/firebase';
import { authStore } from '@/store/auth';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import LoaderMultipleDots from '@/animations/LoaderMultipleDots.vue';
import clientStore from '@/store/client';
import expertStore from '@/store/expert';
import { IExpert } from '@/interfaces/IExpert';
import VerifyYourEmail from './VerifyYourEmail.vue';
import { useLoginRoleStore } from '@/store/loginRole';

const toast = useToast();
const router = useRouter();
const db = getFirestore();
const auth = authFirebase;

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);
const isAccordionOpen = ref(false);
const showResetModal = ref(false);
const showVerifyEmail = ref(false);
const resetEmail = ref('');

const experts = ref([
  {
    name: "Abogado",
    icon: "fa-balance-scale",
    img: Abogado,
    summary: "Si usted se encuentra enfrentando un proceso legal, requiere la redacción de contratos específicos o necesita asesoría jurídica preventiva para proteger sus intereses, agende una consulta con uno de nuestros expertos para obtener claridad legal."
  },
  {
    name: "Médico",
    icon: "fa-user-md",
    img: Medico,
    summary: "Si usted presenta síntomas que le preocupan, requiere una interpretación de estudios clínicos o simplemente desea mejorar su bienestar general con una guía profesional, agende a uno de nuestros expertos para recibir atención médica personalizada."
  },
  {
    name: "Contador",
    icon: "fa-calculator",
    img: Contador,
    summary: "Si usted necesita poner en orden sus finanzas, gestionar el cumplimiento de sus obligaciones fiscales o busca estrategias para optimizar el rendimiento de su patrimonio, agende a uno de nuestros expertos para asegurar su tranquilidad contable."
  },
  {
    name: "Arquitecto",
    icon: "fa-building",
    img: Arquitecto,
    summary: "Si usted tiene en mente un proyecto de construcción, desea renovar sus espacios actuales o necesita asesoría técnica sobre la viabilidad de una obra, agende a uno de nuestros expertos para transformar sus ideas en planos y realidades sólidas."
  },
  {
    name: "en Servicios Web",
    icon: "fa-laptop-code",
    img: WebDesigner,
    summary: "Si usted busca lanzar su primer sitio web, necesita solucionar fallos técnicos en su plataforma actual o desea implementar herramientas digitales avanzadas, agende a uno de nuestros expertos para llevar su infraestructura tecnológica al siguiente nivel."
  },
  {
    name: "en Publicidad",
    icon: "fa-bullhorn",
    img: Publicidad,
    summary: "Si usted necesita que su negocio destaque frente a la competencia, desea crear campañas de alto impacto o busca mejorar la comunicación visual de su marca, agende a uno de nuestros expertos para conectar de manera efectiva con su audiencia."
  },
  {
    name: "Traductor",
    icon: "fa-language",
    img: Traductor,
    summary: "Si usted requiere traducir documentos oficiales, necesita apoyo en la interpretación de conversaciones de negocios o busca adaptar sus contenidos a otros idiomas, agende a uno de nuestros expertos para eliminar cualquier barrera lingüística."
  },
  {
    name: "en Peritaje",
    icon: "fa-search",
    img: Peritaje,
    summary: "Si usted necesita un análisis técnico especializado, una valuación precisa de bienes o un dictamen profesional que sirva como evidencia técnica, agende a uno de nuestros expertos para obtener un informe detallado y con validez oficial."
  },
  {
    name: "en Ingeniería en Computación",
    icon: "fa-cog",
    img: Ingeniero,
    summary: "Si usted busca optimizar sus sistemas de red, requiere asesoría en seguridad informática o necesita resolver problemas complejos de hardware y software, agende a uno de nuestros expertos para garantizar la estabilidad de su entorno digital."
  },
  {
    name: "en Gestoría en Trámites",
    icon: "fa-file-alt",
    img: Gestor,
    summary: "Si usted se siente abrumado por la burocracia, necesita agilizar trámites ante instituciones públicas o requiere apoyo con licencias y permisos, agende a uno de nuestros expertos para ahorrar tiempo y evitar complicaciones administrativas."
  },
  {
    name: "en Marketing",
    icon: "fa-chart-line",
    img: Marketing,
    summary: "Si usted desea entender mejor el comportamiento de su mercado, busca definir su público objetivo o necesita un plan estratégico de ventas, agende a uno de nuestros expertos para hacer crecer su negocio de manera sostenible."
  },
  {
    name: "Psicólogo/a",
    icon: "fa-user-graduate",
    img: Psicologo,
    summary: "Si usted está atravesando un momento difícil, desea trabajar en su crecimiento personal o busca herramientas para gestionar el estrés y la ansiedad, agende a uno de nuestros expertos para iniciar un proceso de acompañamiento terapéutico."
  },
  {
    name: "Maestro",
    icon: "fa-chalkboard-teacher",
    img: Maestro,
    summary: "Si usted necesita regularización en alguna materia escolar, desea aprender una nueva habilidad académica o busca preparación para exámenes importantes, agende a uno de nuestros expertos para recibir tutoría personalizada."
  },
  {
    name: "Chef",
    icon: "fa-utensils",
    img: Chef,
    summary: "Si usted planea diseñar el menú de un restaurante, necesita asesoría técnica en procesos gastronómicos o busca consultoría para un evento exclusivo, agende a uno de nuestros expertos para elevar la calidad de su propuesta culinaria."
  }
]);
const currentExpert = ref(0);
let expertInterval: any = null;

onMounted(() => {
  expertInterval = setInterval(() => {
    if (!isSelecting.value) {
      currentExpert.value = (currentExpert.value + 1) % experts.value.length;
    }
  }, 4000);
});

onUnmounted(() => {
  if (expertInterval) clearInterval(expertInterval);
});

const isSelecting = ref(false);
const userSelection = ref('');

const setUserSelection = (expert: string) => {
  isSelecting.value = true;
  userSelection.value = expert;
};

const toggleAccordion = () => {
  isAccordionOpen.value = !isAccordionOpen.value;
};

const handleResetPassword = async () => {
  if (!resetEmail.value) {
    toast.error('Por favor, ingresa tu correo');
    return;
  }
  try {
    await sendPasswordResetEmail(auth, resetEmail.value);
    toast.success('Correo de restablecimiento enviado');
    showResetModal.value = false;
  } catch (error) {
    toast.error('Error al enviar el correo. Verifica tu dirección.');
  }
};

//A1Handler handle login based on userRole
const adminCollection = collection(db, 'AdminEmails');
const expertCollection = collection(db, 'EmailsExperts');
const userCollection = collection(db, 'users');

const verifyExistInDb = async (user: User, role: string) => {

  const collectionRole = role === 'admin' ? adminCollection : role === 'expert' ? expertCollection : userCollection;

  const queryRole = query(collectionRole, where('email', '==', user.email));

  const snap = await getDocs(queryRole);

  if (snap.empty) {
    return null;
  }

  return {
    role: role,
    data: snap.docs[0].data()
  };
};



//A1Handler handle login based on userRole
const handleRoleLogin = async (user: User) => {

  const userRole = await verifyExistInDb(user, loginRoleStore.getRole);

  if (!userRole) {
    toast.error(`${loginRoleStore.getRole == 'admin' ? 'Administrador' : loginRoleStore.getRole == 'expert' ? 'Experto' : 'Cliente'} no encontrado, por favor verifique su correo y contraseña y que pertenezca al rol seleccionado`);
    return;
  }

  //Verify what the client says in the selection
  if (userRole?.role === 'admin') {
    handleAdminLogin(user.uid, user.displayName || 'Admin', user.email || '');
  } else if (userRole?.role === 'expert') {
    handleExpertLogin(user.uid, user.displayName || 'Experto', user.email || '', userRole.data as IExpert);
  } else {
    handleClientLogin(user.uid, user.displayName || 'Cliente', user.email || '');
  }


}

const login = async () => {
  if (!email.value || !password.value) {
    toast.warning("Por favor, ingrese su correo y contraseña");
    return;
  }

  loading.value = true;


  try {

    /*
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const { email: userEmail, uid, displayName } = userCredential.user;
    const name = displayName || "Usuario";

    if (!userCredential.user.emailVerified) {
      toast.error("Por favor, verifique su correo electrónico");
      showVerifyEmail.value = true;
      return;
    }

    // Admin Check
    const adminQuery = query(collection(db, 'AdminEmails'), where('email', '==', userEmail));
    const adminSnap = await getDocs(adminQuery);
    if (!adminSnap.empty) {
      handleAdminLogin(uid, name, userEmail || '');
      return;
    }

    // Expert Check
    const expertQuery = query(collection(db, 'EmailsExperts'), where('email', '==', userEmail));
    const expertSnap = await getDocs(expertQuery);

    if (!expertSnap.empty) {
      const docRef = doc(db, `experts/${uid}`);
      const expertData = await getDoc(docRef);
      if (expertData.exists()) {
        handleExpertLogin(uid, name, userEmail || '', expertData.data() as IExpert);
      }
    } else {
      handleClientLogin(uid, name, userEmail || '');
    }
      */

    const user = await signInWithEmailAndPassword(auth, email.value, password.value);
    //A1Handler based on user role, redirect to the current expert to the view   


    //Verify email verified
    if (!user.user.emailVerified) {
      toast.error("Por favor, verifique su correo electrónico");
      showVerifyEmail.value = true;
      return;
    }

    handleRoleLogin(user.user);

  } catch (error) {
    toast.error("Error al iniciar sesión. Verifique sus credenciales.");
  } finally {
    loading.value = false;
  }
};

const handleAdminLogin = (uid: string, name: string, email: string) => {
  console.log(`Login as admin: ${name}`);
  const store = authStore();
  store.setIsAuth(true);
  store.setUserUid(uid);
  store.setUserName(name);
  store.setUserEmail(email);
  store.setIsAdmin(true);
  toast.success(`Bienvenido Admin ${name}`);
  router.push("/expert-list-admin");
};

const handleExpertLogin = (uid: string, name: string, email: string, data: IExpert) => {
  console.log(`Login as expert: ${data}`);
  const store = authStore();
  store.setIsAuth(true);
  store.setUserUid(uid);
  store.setUserName(name);
  store.setUserEmail(email);
  store.setIsExpert(true);
  store.setUserData('experts', uid);
  expertStore().setExpertData(data);
  toast.success(`Bienvenido Experto ${name}`);
  router.push("/expert");
};

const handleClientLogin = (uid: string, name: string, email: string) => {
  console.log(`Login as client: ${name}`);
  const store = authStore();
  store.setIsAuth(true);
  store.setUserUid(uid);
  clientStore().setClientUid(uid);
  store.setUserName(name);
  store.setUserEmail(email);
  store.setIsClient(true);
  store.setUserData('users', uid);
  toast.success(`Bienvenido ${name}`);
  router.push("/home");
};


//A1Handler
const loginRoleStore = useLoginRoleStore();


</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>