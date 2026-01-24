<template>
  <main class="web-content overflow-y-auto mt-20" color="light">
    <div class="w-full max-w-6xl mx-auto pt-16 pb-12 px-6">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-8 border-b border-slate-100 pb-10">

        <div class="flex-1">
          <div
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
            <span class="relative flex h-2 w-2 text-xl">
              <span
                class="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75 text-xl"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Registro de usuario
          </div>

          <h1 class="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-none font-manrope">
            Crear <span class="text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-blue-500">Cuenta</span>
          </h1>
        </div>

        <div class="flex-1 md:border-l md:border-slate-200 md:pl-10">
          <p class="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-md">
            Únase a la comunidad de usuarios y agenda una
            <span class="text-blue-600 font-semibold border-b-2 border-blue-600/30">sesión gratuita por 15
              minutos*</span>
            con nuestros expertos.
          </p>
        </div>

      </div>
    </div>

    <form class="w-full px-6 space-y-4" @submit.prevent="register">

      <div class="w-full mx-auto space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div class="md:col-span-2 group">
            <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Nombre completo</label>
            <div
              class="flex items-center bg-white gap-3 px-4 py-3.5  border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-300">
              <v-icon class="text-slate-400 group-focus-within:text-blue-500" name="hi-user" />
              <input
                class="bg-transparent border-none outline-none flex-1 text-slate-700 placeholder:text-slate-400 font-medium"
                v-model="formData.fullName" placeholder="Ej. Juan Pérez" type="text" required>
            </div>
          </div>

          <div class="group">
            <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Correo electrónico</label>
            <div
              class="flex items-center bg-white gap-3 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-300">
              <v-icon class="text-slate-400 group-focus-within:text-blue-500" name="md-email" />
              <input
                class="bg-transparent border-none outline-none flex-1 text-slate-700 placeholder:text-slate-400 font-medium"
                v-model="formData.email" placeholder="correo@ejemplo.com" type="email" required>
            </div>
          </div>

          <div class="group">
            <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Teléfono</label>
            <div
              class="flex items-center gap-3 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-300">
              <v-icon class="text-slate-400 group-focus-within:text-blue-500" name="fa-phone" />
              <input
                class="bg-transparent border-none outline-none flex-1 text-slate-700 placeholder:text-slate-400 font-medium"
                v-model="formData.phone" placeholder="+52 551 234 5678" type="tel" required>
            </div>
          </div>

          <div class="group">
            <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Contraseña</label>
            <div
              class="flex items-center gap-3 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-300">
              <v-icon class="text-slate-400 group-focus-within:text-blue-500" name="md-password-round" />
              <input
                class="bg-transparent border-none outline-none flex-1 text-slate-700 placeholder:text-slate-400 font-medium"
                v-model="formData.password" placeholder="••••••••" :type="showPassword ? 'text' : 'password'" required>
              <button type="button" @click="showPassword = !showPassword" class="hover:text-blue-600 transition-colors">
                <v-icon class="text-slate-400" :name="showPassword ? 'hi-solid-eye' : 'hi-solid-eye-off'" />
              </button>
            </div>
          </div>

          <div class="group">
            <label class="block text-sm font-semibold text-slate-700 mb-1.5 ml-1">Confirmar contraseña</label>
            <div
              class="flex items-center gap-3 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-300">
              <v-icon class="text-slate-400 group-focus-within:text-blue-500" name="md-password-round" />
              <input
                class="bg-transparent border-none outline-none flex-1 text-slate-700 placeholder:text-slate-400 font-medium"
                v-model="formData.confirmPassword" placeholder="••••••••"
                :type="showConfirmPassword ? 'text' : 'password'" required>
              <button type="button" @click="showConfirmPassword = !showConfirmPassword"
                class="hover:text-blue-600 transition-colors">
                <v-icon class="text-slate-400" :name="showConfirmPassword ? 'hi-solid-eye' : 'hi-solid-eye-off'" />
              </button>
            </div>
          </div>
        </div>

        <div class="bg-blue-50/50 p-5 rounded-2xl border border-blue-100/50">
          <label class="block text-sm font-bold text-blue-900 mb-2 uppercase tracking-wider">Fecha de
            nacimiento</label>
          <VueDatePicker v-model="date" auto-apply :enable-time-picker="false" :flow="['year', 'month', 'calendar']"
            class="custom-datepicker" />
          <p v-if="isMinor" class="flex items-center bg-white gap-1 text-xs text-red-600 font-bold mt-2">
            <v-icon name="hi-solid-exclamation-circle" scale="0.8" /> Debe ser mayor de edad
          </p>
        </div>

        <label
          class="flex items-center bg-white gap-3 p-3 cursor-pointer group hover:bg-slate-50 rounded-xl transition-colors">
          <div class="relative flex items-center bg-white">
            <input
              class="peer h-5 w-5 appearance-none rounded border-2 border-slate-300 checked:bg-blue-600 checked:border-blue-600 transition-all cursor-pointer"
              type="checkbox" v-model="formData.acceptedTerms" required>
            <v-icon name="hi-check"
              class="absolute text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none w-5 h-5 p-0.5" />
          </div>
          <span class="text-sm text-slate-600 leading-tight">
            Acepto los <router-link class="text-blue-600 font-bold hover:underline" to="/privacy-policy">términos de
              servicio</router-link>
            y la <router-link class="text-blue-600 font-bold hover:underline" to="/privacy-policy">política de
              privacidad</router-link>.
          </span>
        </label>

        <div class="pt-6 space-y-4">
          <button
            class="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200/50 hover:shadow-blue-300/50 transform hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:hover:bg-slate-900 disabled:transform-none"
            type="submit" :disabled="isMinor || !formData.acceptedTerms">
            Crear mi cuenta
          </button>

          <router-link
            class="block text-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors uppercase tracking-widest"
            to="/login">
            ¿Ya tienes cuenta? Inicia sesión
          </router-link>
        </div>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';
import { auth as authFirebase } from '@/firebase';

const router = useRouter();
const toast = useToast();
const auth = authFirebase;
const db = getFirestore();

const formData = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  phone: '',
  acceptedTerms: false,
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const date = ref(new Date());
const isMinor = ref(false)

const checkIfMinor = () => {
  if (!date.value) return;
  const birthDate = new Date(date.value);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  isMinor.value = age < 18;
  return isMinor.value;
};

watch(date, () => {
  checkIfMinor();
});

const register = async () => {
  if (checkIfMinor()) {
    toast.error('Debes ser mayor de edad para registrarte');
    return;
  }

  if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.acceptedTerms) {
    toast.warning('Por favor, completa todos los campos');
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    toast.error('Las contraseñas no coinciden');
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: formData.fullName
    });

    await sendEmailVerification(user);

    // Create user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      birthDate: date.value,
      isBanned: false,
      terms: formData.acceptedTerms,
      createdAt: Timestamp.now(),
      userId: user.uid,
      freeConsultations: true,
    });

    toast.success('¡Cuenta creada! Verifica tu correo electrónico');
    router.replace('/login');
  } catch (error: any) {
    console.error(error);
    toast.error('Error al crear usuario: ' + (error.message || 'Intente de nuevo'));
  }
};
</script>