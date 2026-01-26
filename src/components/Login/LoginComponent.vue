<template>
  <div
    class="relative pt-24 min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 flex items-center justify-center p-6">
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

      <!-- Tarjeta del experto destacado – más linda y moderna -->
      <div
        class="bg-white/80 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl p-6 transition-all hover:shadow-2xl">
        <div class="flex items-center gap-5">
          <div class="relative flex-shrink-0">
            <img class="w-20 h-20 rounded-full object-cover ring-4 ring-blue-200/60 shadow-lg"
              :src="experts[currentExpert].img" :alt="experts[currentExpert].name" :key="experts[currentExpert].name" />
            <div class="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-white">
            </div>
          </div>

          <div class="flex-1 flex-col flex items-start">
            <p class="text-sm text-gray-500 mb-1 font-medium">Hable ahora con</p>
            <h3 class="text-lg font-bold text-gray-900">{{ experts[currentExpert].name }}</h3>
            <div
              class="mt-2 inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-sm">
              <v-icon name="bi-gift-fill" scale="0.85" />
              <span>¡Primera consulta gratis!*</span>
            </div>
            <small class="text-xs text-gray-400 mt-2 font-poppins">*Las consultas gratuitas son de 15 minutos gratuitos
              por
              categoría</small>
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
            <li v-for="(expert, index) in experts" :key="index" @click="setUserSelection(expert.name)"
              class="px-5 py-4 cursor-pointer hover:bg-blue-50/70 transition-colors flex items-center gap-4" :class="{
                'bg-blue-100/60 font-semibold text-blue-800': expert.name === experts[currentExpert].name,
                'border-l-4 border-blue-500': expert.name === userSelection
              }">
              <div
                class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-medium">
                {{ expert.name.charAt(0) }}
              </div>
              <span>{{ expert.name.replace('en ', '') }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Formulario de login – más lindo, con mejor espaciado y color -->
      <form @submit.prevent="login"
        class="bg-white border border-blue-100 rounded-2xl shadow-xl p-8 space-y-7 backdrop-blur-sm">
        <div class="text-center space-y-2">
          <h2 class="text-3xl font-bold text-blue-500 font-manrope">Le damos la bienvenida</h2>
          <p class="text-gray-600">Ingresa para conectar con tu experto</p>
        </div>

        <!-- Email -->
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

        <!-- Password -->
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
import Marketing from '@/assets/img/Marketing.jpeg';
import Medico from '@/assets/img/Medico.jpeg';
import Peritaje from '@/assets/img/Peritaje.jpeg';
import Psicologo from '@/assets/img/Psicologo.jpeg';
import Publicidad from '@/assets/img/Publicidad.jpeg';
import Traductor from '@/assets/img/Traductor.jpeg';
import WebDesigner from '@/assets/img/webDev.jpeg';

import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth as authFirebase } from '@/firebase';
import { authStore } from '@/store/auth';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore';
import LoaderMultipleDots from '@/animations/LoaderMultipleDots.vue';
import clientStore from '@/store/client';
import expertStore from '@/store/expert';
import { IExpert } from '@/interfaces/IExpert';
import VerifyYourEmail from './VerifyYourEmail.vue';

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

const login = async () => {
  if (!email.value || !password.value) {
    toast.warning("Por favor, ingrese su correo y contraseña");
    return;
  }

  loading.value = true;
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
    const { email: userEmail, uid, displayName } = userCredential.user;
    const name = displayName || "Usuario";

    if (!userCredential.user.emailVerified) {
      toast.error("Por favor, verifique su correo electrónica");
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
  } catch (error) {
    toast.error("Error al iniciar sesión. Verifique sus credenciales.");
  } finally {
    loading.value = false;
  }
};

const handleAdminLogin = (uid: string, name: string, email: string) => {
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