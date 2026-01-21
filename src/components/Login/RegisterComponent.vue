<template>
  <main class="web-content overflow-y-auto" color="light">
    <div class="flex flex-col justify-center min-h-full mx-auto pb-10 mb-8 text-center px-4">
      <h1 class="text-3xl font-bold text-gray-400 tracking-tight font-manrope">Crear Cuenta</h1>
      <p class="mt-2 text-gray-500">Registrese para poder crear una cita con un experto </p>
    </div>

    <form class="w-full max-w-md mx-auto space-y-4" @submit.prevent="register">

      <div class="space-y-4">
        <!-- Nombre Completo -->
        <div
          class="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all shadow-sm">
          <v-icon class="text-gray-400" name="hi-user" />
          <input class="bg-transparent border-none outline-none flex-1 text-gray-700 font-medium"
            v-model="formData.fullName" placeholder="Nombre completo" type="text" required>
        </div>

        <!-- Email -->
        <div
          class="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all shadow-sm">
          <v-icon class="text-gray-400" name="md-email" />
          <input class="bg-transparent border-none outline-none flex-1 text-gray-700 font-medium"
            v-model="formData.email" placeholder="correo@ejemplo.com" type="email" required>
        </div>

        <!-- Phone -->
        <div
          class="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all shadow-sm">
          <v-icon class="text-gray-400" name="fa-phone" />
          <input class="bg-transparent border-none outline-none flex-1 text-gray-700 font-medium"
            v-model="formData.phone" placeholder="+52 5512345678" type="tel" required>
        </div>

        <!-- Password -->
        <div
          class="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all shadow-sm">
          <v-icon class="text-gray-400" name="md-password-round" />
          <input class="bg-transparent border-none outline-none flex-1 text-gray-700 font-medium"
            v-model="formData.password" placeholder="Contraseña" :type="showPassword ? 'text' : 'password'" required>
          <button type="button" @click="showPassword = !showPassword" class="text-gray-400">
            <v-icon :name="showPassword ? 'hi-solid-eye' : 'hi-solid-eye-off'" />
          </button>
        </div>

        <!-- Confirm Password -->
        <div
          class="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-2xl focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all shadow-sm">
          <v-icon class="text-gray-400" name="md-password-round" />
          <input class="bg-transparent border-none outline-none flex-1 text-gray-700 font-medium"
            v-model="formData.confirmPassword" placeholder="Confirmar contraseña"
            :type="showConfirmPassword ? 'text' : 'password'" required>
          <button type="button" @click="showConfirmPassword = !showConfirmPassword" class="text-gray-400">
            <v-icon :name="showConfirmPassword ? 'hi-solid-eye' : 'hi-solid-eye-off'" />
          </button>
        </div>

        <!-- Birth Date -->
        <div class="space-y-1">
          <p class="text-xs text-gray-500 font-medium ml-1">Fecha de nacimiento</p>
          <VueDatePicker v-model="date" auto-apply :enable-time-picker="false" :flow="['year', 'month', 'calendar']" />
          <p v-if="isMinor" class="text-xs text-red-500 font-medium mt-1">Debe ser mayor de edad</p>
        </div>

        <!-- Terms -->
        <div class="flex items-start gap-2 p-2">
          <input class="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300" type="checkbox"
            v-model="formData.acceptedTerms" required>
          <span class="text-xs text-gray-600">
            Acepto los <router-link class="text-blue-600 font-semibold" to="/privacy-policy">términos de
              servicio</router-link>
            y la <router-link class="text-blue-600 font-semibold" to="/privacy-policy">política de
              privacidad</router-link>.
          </span>
        </div>

        <!-- Actions -->
        <div class="pt-4 space-y-3">
          <button
            class="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-200 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
            type="submit" :disabled="isMinor || !formData.acceptedTerms">
            Crear cuenta
          </button>

          <router-link class="block text-center text-sm font-semibold text-gray-400 hover:text-blue-600" to="/login">
            Ya tengo cuenta
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