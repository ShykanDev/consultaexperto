<template>
    <ion-content class="w-full bg-gradient-to-br from-indigo-50 to-blue-50 ion-padding">
      <form @submit.prevent="register" class="mx-auto space-y-6 max-w-2xl">
        <!-- Título -->
        <div class="mb-8 text-center">
          <h1 class="mb-2 text-3xl font-bold text-orange-700">Unase a nosotros</h1>
          <p class="text-gray-500">Crea tu cuenta en segundos</p>
        </div>
        
        <!-- Nombre Completo -->
        <div class="form-group">
          <label class="form-label">Nombre completo</label>
          <ion-input
          v-model="formData.fullName"
          type="text"
            placeholder="Ej. María González"
            class="!pl-11 form-input"
          >
            <v-icon name="ri-user-2-fill" class="absolute left-3 top-1/2 text-xl text-gray-400 -translate-y-1/2" />
          </ion-input>
        </div>
        
        <!-- Email -->
        <div class="form-group">
          <label class="form-label">Correo electrónico</label>
          <ion-input
          v-model="formData.email"
          type="email"
            placeholder="tucorreo@example.com"
            class="!pl-11 form-input"
          >
          <v-icon name="md-email" class="absolute left-3 top-1/2 text-xl text-gray-400 -translate-y-1/2" />
          </ion-input>
          <div v-if="errors.email" class="form-error">
            <v-icon name="ri-alert-fill" class="mr-2 text-red-500" />
            {{ errors.email }}
          </div>
        </div>
        
        <!-- Contraseña -->
        <div class="form-group">
          <label class="form-label">Contraseña</label>
          <div class="flex justify-center items-center">
            <ion-input
            v-model="formData.password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="pr-11 form-input"
            >
            <v-icon name="md-password-round" class="text-xl text-gray-400" />
          </ion-input>
        </div>
      </div>
      
        <!-- Confirmar Contraseña -->
        <div class="form-group">
          <label class="form-label">Confirmar Contraseña</label>
          <ion-input
            v-model="formData.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="pr-11 form-input"
          >
            <button
              type="button"
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 text-gray-400 -translate-y-1/2 hover:text-indigo-600"
            >
              <v-icon name="md-password-round" class="text-xl" />
            </button>
          </ion-input>
          <div v-if="errors.password" class="form-error">
            <v-icon name="ri-alert-fill" class="mr-2 text-red-500" />
            {{ errors.password }}
          </div>
        </div>
  

        <VueDatePicker v-model="date" auto-apply partial-flow :enable-time-picker="false"
        :flow="['year', 'month', 'calendar']" />

        <p v-if="isMinor" class="mt-2 text-red-500">
          <v-icon name="ri-alert-fill" class="mr-2 text-red-500" />
          Debe ser mayor de edad para registrarse
        </p>

        <!-- Términos -->
        <div class="form-group">
          <label class="flex gap-3 items-start p-3 bg-indigo-50 rounded-lg">
            <ion-checkbox
             v-model="formData.acceptedTerms"
              class="mt-0.5 shrink-0 checkbox-custom"
            ></ion-checkbox>
            <span class="text-sm leading-tight text-gray-600">
              Acepto los 
              <a href="#" class="font-medium text-indigo-600 hover:underline">términos de servicio</a> 
              y la 
              <a href="#" class="font-medium text-indigo-600 hover:underline">política de privacidad</a>
            </span>
          </label>
        </div>
  
        <ion-button
          type="submit"
          expand="block"
          class="submit-button group"
          :disabled="isMinor"
        >
          <span class="flex gap-2 items-center">
            Crear cuenta
            <v-icon name="hi-user-add" class="transition-transform group-hover:translate-x-1" />
          </span>
        </ion-button>
  
      <!--
        Creating a button that links to the login page  without iontab-button  
      -->
      <ion-button
        expand="block"
        class="submit-button group"
        router-link="/tabs/tab1"
        color="secondary"
      >
      <span class="flex gap-2 items-center">
          <v-icon name="hi-login" class="transition-transform group-hover:translate-x-1" />
          Ir al inicio de sesión
        </span>
      </ion-button>
      </form>
    </ion-content>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, watch } from 'vue';
  import {
    IonContent,
    IonInput,
    IonCheckbox,
    IonButton,
    useIonRouter,
  } from '@ionic/vue';

  import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, UserCredential, updateCurrentUser, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, collection, addDoc, Timestamp } from 'firebase/firestore';
import { toastController } from '@ionic/vue';

const presentToast = async (position: 'top' | 'middle' | 'bottom', message: string, color = 'light') => {
    const toast = await toastController.create({
      message: message,
      duration: 5000,
      position: position,
      color: color,
      translucent: true,
      swipeGesture:'vertical',
      buttons: [
        {
          text: 'cerrar',
          role: 'cancel',
        }
      ]
    });

    await toast.present();
  };


  // Lógica del formulario
  const formData = reactive({
    fullName: '',
    email: '',
    age: null,
    password: '',
    confirmPassword: '',
    acceptedTerms: false,
  });
  
  const errors = reactive({
    email: '',
    password: '',
  });
  
  const showPassword = ref(false);
  const showConfirmPassword = ref(false);

  const date = ref(new Date());

  const isMinor = ref(false)
//Función para verificar si es menor de edad (18 años)
const checkIfMinor = () => {
  if (!date.value) {
    presentToast('top', 'Por favor, selecciona tu fecha de nacimiento');
    return;
  }

  const birthDate = new Date(date.value);
  const today = new Date();

  // Calculamos la edad restando los años
  let age = today.getFullYear() - birthDate.getFullYear();

  // Ajustamos si aún no ha pasado el cumpleaños este año
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  isMinor.value = age < 18;
  presentToast('top', `Edad calculada: ${age} años - ${isMinor.value ? "El usuario es menor de edad" : "El usuario es mayor de edad"}`);
  isMinor.value ? presentToast('top', 'Debe ser mayor de edad para poder registrarse, teniendo ' + age + ' años no es posible registrarse' ) : presentToast('top', 'Edad de ' + age + ' años válida');
  return isMinor.value;
};

watch(date, () => {
  checkIfMinor();
});

//Firebase stuff
const auth = getAuth()
const db = getFirestore();
const router = useIonRouter();

const createUserData = async (user: UserCredential) => {
  if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.acceptedTerms) {
    presentToast('top', 'Por favor, completa todos los campos', 'danger');
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    presentToast('top', 'Las contraseñas no coinciden', 'danger');
    return;
  }

  try {
    const docRef = doc(db, "users", user.user.uid);

    // 1. Crea el documento principal
    await setDoc(docRef, {
      name: formData.fullName,
      email: formData.email,
      isBanned: false,
      banReason: null,
      bannedAt: null,
      bannedBy: null,
      isSuspended: false,
      suspendedAt: null,
      suspendedBy: null,
      suspendedReason: null,
      terms: formData.acceptedTerms,
      createdAt: Timestamp.now(),
      userId: user.user.uid,
      freeConsultations: true,
    });


  /*  // 2. Añade subcolección de historial
    const historyRef = collection(docRef, "HistoryAppointments");
    await addDoc(historyRef, {
      createdAt: Timestamp.now(),
      userId: user.user.uid,
    });

    // 3. Añade subcolección de futuras citas
    const futureRef = collection(docRef, "FutureAppointments");
    await addDoc(futureRef, {
      createdAt: Timestamp.now(),
      userId: user.user.uid,
    });
    
    */
    presentToast('top', "Usuario creado exitosamente", 'success');

  } catch (error) {
    console.error("Error al crear usuario o subcolecciones:", error);
    presentToast('top', `Error al crear usuario, intente de nuevo: ${error}`, 'danger');
  }
}


//Register the user to firebase
const register = async () => {
  checkIfMinor()
  if (isMinor.value) return
  //change this to be more explicit and know what the error is
  if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.acceptedTerms) {
    presentToast('top', 'Por favor, completa todos los campos', 'danger');
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    presentToast('top', 'Las contraseñas no coinciden', 'danger');
    return;
  }
 // TODO ADD IT LATER: if (!validateForm()) return
  try {
    const user = await createUserWithEmailAndPassword(auth, formData.email, formData.password    )
    await updateProfile(user.user, {
      displayName: formData.fullName
    })
    sendEmailVerification(user.user)
    await createUserData(user)

    //Once user has created his account successfully, reset the register fields
    formData.fullName = ''
    formData.email = ''
    formData.age = null
    formData.password = ''
    formData.confirmPassword = ''
    formData.acceptedTerms = false
    showPassword.value = false
    showConfirmPassword.value = false
    presentToast('top', 'Usuario creado exitosamente, verifique su correo electrónico para activar su cuenta', 'success')

    router.navigate('/tabs/tab1', 'root', 'replace');

  } catch (error) {
    console.log(error);
    presentToast('top', `Error al crear usuario, intente de nuevo: ${error}`, 'danger');
  }
}

  </script>
  


  
  <style scoped>
  .form-group {
    @apply space-y-2;
  }
  
  .form-label {
    @apply block text-sm font-medium text-gray-700;
  }
  
  .form-input {
    --padding-start: 44px;
    --padding-end: 44px;
    --border-radius: 10px;
    --background: white;
    --border-color: #e2e8f0;
    --height: 52px;
    @apply shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 hover:border-indigo-300;
  }
  
  .form-error {
    @apply flex items-center text-sm text-red-600 mt-2 px-3 py-2 bg-red-50 rounded-lg;
  }
  
  .checkbox-custom {
    --size: 20px;
    --checkbox-background-checked: #4f46e5;
    --border-color-checked: #4f46e5;
    --border-radius: 6px;
  }
  
  .submit-button {
    --background: #b93700;
    --border-radius: 10px;
    --box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1);
    --padding-top: 16px;
    --padding-bottom: 16px;
    
  }
  </style>