<template>
  <ion-content color="light">
    <div class="flex flex-col justify-center min-h-full  mx-auto pb-10">
      
      <div class="mb-8 text-center px-4">
        <h1 class="text-3xl font-bold text-gray-500 tracking-tight font-quicksand">Crear Cuenta</h1>
        <p class="mt-2 text-gray-500 font-quicksand">Registrese para poder crear una cita con un experto </p>
      </div>

      <form @submit.prevent="register" class="w-full">
        
        <ion-list :inset="true" mode="ios" class="mb-6">
          
          <!-- Nombre Completo -->
          <ion-item>
            <ion-icon slot="start" :icon="personOutline" class="text-blue-400"></ion-icon>
            <ion-input
              v-model="formData.fullName"
              label="Nombre completo"
              label-placement="stacked"
              placeholder="Ej. María González"
              type="text"
            ></ion-input>
          </ion-item>

          <!-- Email -->
          <ion-item>
            <ion-icon slot="start" :icon="mailOutline" class="text-blue-400"></ion-icon>
            <ion-input
              v-model="formData.email"
              label="Correo electrónico"
              label-placement="stacked"
              placeholder="nombre@ejemplo.com"
              type="email"
            ></ion-input>
          </ion-item>
          
          <!-- Phone -->
          <ion-item>
            <ion-icon slot="start" :icon="phonePortraitOutline" class="text-blue-400"></ion-icon>
            <ion-input
              v-model="formData.phone"
              label="Teléfono"
              label-placement="stacked"
              placeholder="+52 5512345678"
              type="number"
              helper-text="Recuerde introducir el código de país, ejemplo: +52 para México"
              min="0"
            ></ion-input>
          </ion-item>
          
          <div v-if="errors.email" class="bg-red-50 px-4 py-2 text-xs text-red-500 border-t border-red-100">
             <ion-icon :icon="alertCircle" class="align-middle mr-1 text-base"></ion-icon> {{ errors.email }}
          </div>

          <!-- Contraseña -->
          <ion-item>
            <ion-icon slot="start" :icon="lockClosedOutline" class="text-blue-400"></ion-icon>
            <ion-input
              v-model="formData.password"
              label="Contraseña"
              label-placement="stacked"
              placeholder="••••••••"
              :type="showPassword ? 'text' : 'password'"
            ></ion-input>
            <ion-button slot="end" fill="clear" @click="showPassword = !showPassword" class="m-0">
               <ion-icon slot="icon-only" :icon="showPassword ? eyeOutline : eyeOffOutline" class="text-blue-400"></ion-icon>
            </ion-button>
          </ion-item>

          <!-- Confirmar Contraseña -->
          <ion-item lines="none">
            <ion-icon slot="start" :icon="lockClosedOutline" class="text-blue-400"></ion-icon>
            <ion-input
              v-model="formData.confirmPassword"
              label="Confirmar contraseña"
              label-placement="stacked"
              placeholder="••••••••"
              :type="showConfirmPassword ? 'text' : 'password'"
            ></ion-input>
             <ion-button slot="end" fill="clear" @click="showConfirmPassword = !showConfirmPassword" class="m-0">
               <ion-icon slot="icon-only" :icon="showConfirmPassword ? eyeOutline : eyeOffOutline" class="text-blue-400"></ion-icon>
            </ion-button>
          </ion-item>
           <div v-if="errors.password" class="bg-red-50 px-4 py-2 text-xs text-red-500 border-t border-red-100">
               <ion-icon :icon="alertCircle" class="align-middle mr-1 text-base"></ion-icon> {{ errors.password }}
             </div>

        </ion-list>

        <!-- Date Picker Group -->
        <ion-list :inset="true" mode="ios" class="mb-6">
           <ion-item lines="none" class="py-1"> 
             <div class="w-full">
                 <p class="text-xs text-gray-500 mb-2 font-medium ml-1">Fecha de nacimiento</p>
                <VueDatePicker v-model="date" auto-apply :enable-time-picker="false" :flow="['year', 'month', 'calendar']" teleport="body"></VueDatePicker>
             </div>
          </ion-item>
           <div v-if="isMinor" class="bg-red-50 px-4 py-2 text-xs text-red-500 border-t border-red-100">
            <ion-icon :icon="alertCircle" class="align-middle mr-1 text-base"></ion-icon> Debe ser mayor de edad
          </div>
        </ion-list>

        <!-- Terms Group -->
        <ion-list :inset="true" mode="ios" class="mb-8">
          <ion-item lines="none">
            <ion-checkbox v-model="formData.acceptedTerms" slot="start" justify="start" class="my-auto"></ion-checkbox>
            <ion-label class="text-sm text-gray-600 ion-text-wrap py-3" style="font-size: 0.9rem;">
              Acepto los 
              <router-link to="/privacy-policy" class="text-indigo-600 font-medium no-underline">
                términos de servicio
              </router-link>
              y la 
              <router-link to="/privacy-policy" class="text-indigo-600 font-medium no-underline">
                política de privacidad
              </router-link>.
            </ion-label>
          </ion-item>
        </ion-list>

        <div class="px-6 space-y-4">
          <ion-button type="submit" expand="block" mode="ios" color="primary" class="h-12 text-base font-semibold shadow-sm" :disabled="isMinor || !formData.acceptedTerms">
            Crear cuenta
            <ion-icon slot="end" :icon="personAdd"></ion-icon>
          </ion-button>

           <ion-button router-link="/tabs/tab1" expand="block" fill="clear" color="medium" class="text-sm font-medium">
            Ya tengo cuenta <ion-icon slot="end" :icon="logIn"></ion-icon>
          </ion-button>
        </div>

      </form>
    </div>
  </ion-content>
</template>
  
  <script setup lang="ts">
  import { ref, reactive, watch } from 'vue';
  import {
    IonContent,
    IonInput,
    IonCheckbox,
    IonButton,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    useIonRouter,
  } from '@ionic/vue';
  import { 
    personOutline, 
    mailOutline, 
    lockClosedOutline, 
    alertCircle, 
    personAdd, 
    logIn,
    eyeOutline,
    eyeOffOutline,
    phonePortraitOutline
  } from 'ionicons/icons';

  import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { createUserWithEmailAndPassword, sendEmailVerification, UserCredential, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc, Timestamp } from 'firebase/firestore';
import { toastController } from '@ionic/vue';
import { auth as authFirebase } from '@/firebase';

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
    phone: '',
    acceptedTerms: false,
    userAge:''
  });
  
  const errors = reactive({
    email: '',
    password: '',
    phone: '',
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
  isMinor.value ? presentToast('top', 'Debe ser mayor de edad para poder registrarse, teniendo ' + age + ' años no es posible registrarse' ) : presentToast('top', 'Edad de ' + age + ' años válida');
  return isMinor.value;
};

watch(date, () => {
  checkIfMinor();
});

//Firebase stuff
const auth = authFirebase;
const db = getFirestore();
const router = useIonRouter();

const createUserData = async (user: UserCredential) => {
  if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.acceptedTerms || !formData.phone) {
    
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
      phone: formData.phone,
      userAge:date.value,
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


    presentToast('top', "Usuario creado exitosamente", 'success');

  } catch (error) {
    console.error("Error al crear usuario o subcolecciones:", error);
    presentToast('top', `Error al crear usuario, intente de nuevo: ${error}`, 'danger');
  }
}


//Register the user to firebase
const register = async () => {
  checkIfMinor()

  //change this to be more explicit and know what the error is
  if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.acceptedTerms) {
    presentToast('top', 'Por favor, completa todos los campos', 'danger');
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    presentToast('top', 'Las contraseñas no coinciden', 'danger');
    return;
  }

    if (isMinor.value) return
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
  /* Removed old custom styles in favor of Ionic utilities and Tailwind */
  </style>