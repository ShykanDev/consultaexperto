<template>
  <div class="web-page min-h-screen bg-gray-50 mt-28">

    <!--Loader-->
    <div v-if="loading" class="fixed inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center z-50">
      <div
        class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white flex items-center justify-center relative">
        <v-icon name="fa-user" class="text-white absolute animate-spin animate-reverse " scale="3" />
      </div>
    </div>

    <!-- Success Modal -->
    <div v-if="!!showSuccessModal" class="fixed inset-0 bg-slate-900/70 flex items-center justify-center z-50 p-4">
      <div
        class="bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.2)] max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <!-- Header -->
        <div class="bg-slate-100 p-6 rounded-t-3xl">
          <div class="flex justify-center mb-3">
            <div class="bg-blue-600/10 text-blue-500 rounded-full p-4">
              <v-icon name="fa-check-circle" class="text-blue-600" scale="2" />
            </div>
          </div>
          <h2 class="text-2xl font-bold text-blue-600 text-center">
            Experto creado exitosamente
          </h2>
        </div>

        <!-- Content -->
        <div class="p-8 space-y-6">
          <!-- Success Message -->
          <div class="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div class="flex gap-3">
              <v-icon name="fa-info-circle" class="text-blue-500 mt-1" scale="1" />
              <div class="text-sm text-slate-700">
                <p class="font-semibold mb-2">
                  El sistema ha completado las siguientes acciones:
                </p>
                <ul class="list-disc list-inside space-y-1 ml-1">
                  <li>Experto registrado en la base de datos</li>
                  <li>Cuenta de usuario creada y activada</li>
                  <li>
                    Correo de verificación enviado a
                    <span class="font-mono font-semibold">
                      {{ form.email }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Temporary Password -->
          <div class="border border-blue-200 rounded-2xl p-6 bg-blue-50/40">
            <div class="flex items-center gap-2 mb-4">
              <v-icon name="fa-key" class="text-blue-600" scale="1" />
              <h3 class="text-lg font-bold text-blue-600">
                Contraseña temporal generada
              </h3>
            </div>

            <div class="bg-white rounded-xl p-5 border border-slate-200 space-y-3">
              <p class="text-sm text-slate-600">
                El sistema generó automáticamente la siguiente contraseña temporal:
              </p>

              <div
                class="flex items-center justify-between gap-3 bg-slate-50 border border-dashed border-blue-300 rounded-lg p-4">
                <div>
                  <span class="block text-xs uppercase tracking-wide text-slate-500 mb-1">Contraseña temporal</span>
                  <span class="font-mono text-xl font-bold text-blue-600 break-all">
                    {{ createdExpertPassword }}
                  </span>
                </div>


              </div>
            </div>
          </div>

          <!-- Security Notices -->
          <div class="space-y-3">
            <!-- Warning -->
            <div class="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3">
              <v-icon name="bi-exclamation-octagon-fill" class="text-amber-600 mt-1" scale="1" />
              <div class="text-sm text-amber-800">
                <p class="font-semibold mb-1">
                  Importante — Seguridad de la cuenta
                </p>
                <p>
                  El experto debe
                  <span class="font-bold">actualizar esta contraseña inmediatamente</span>
                  tras el primer inicio de sesión.
                </p>
              </div>
            </div>

            <!-- No storage -->
            <div class="bg-slate-100 border border-slate-300 rounded-xl p-4 flex gap-3">
              <v-icon name="fa-lock" class="text-slate-600 mt-1" scale=".8" />
              <div class="text-sm text-slate-700">
                <p class="font-semibold mb-1">
                  Esta contraseña no se almacena en el servidor
                </p>
                <p>
                  Si se pierde, deberá usar la opción
                  <span class="font-semibold">“Olvidé mi contraseña”</span>.
                </p>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex gap-3 pt-4">
            <button @click="copyCredentialsToClipboard"
              class="flex-1 flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 rounded-xl transition active:scale-95">
              <v-icon name="md-filecopy-outlined" class="text-white" scale="1" />
              Copiar credenciales
            </button>

            <button @click="closeSuccessModal"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition active:scale-95">
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>


    <main class="web-content overflow-y-auto p-6 ">
      <!-- Basic Information Section -->
      <div class="space-y-8">
        <div class="web-card bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
          <div class="web-card-header p-4 border-b bg-slate-200 text-slate-700">
            <h2 class="text-lg font-bold font-nunito text-center">Información del nuevo experto</h2>
          </div>

          <div class="web-card-content p-6 space-y-4 bg-[#F5F7F8] flex flex-col">

            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700 ml-1">Nombre completo</label>
              <input
                class="w-full py-3 px-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 font-poppins transition-colors"
                type="text" placeholder="Ingrese nombre completo" v-model="form.fullName">
            </div>
            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700 ml-1">Número de teléfono</label>
              <input
                class="w-full py-3 px-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 font-poppins transition-colors"
                type="tel" placeholder="Ingrese el número de teléfono" v-model="form.phone">
            </div>

            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700 ml-1">Correo electrónico</label>
              <input
                class="w-full py-3 px-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 font-poppins transition-colors"
                type="email" placeholder="ejemplo@dominio.com" v-model="form.email">
            </div>

            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700 ml-1">Especialidad del experto</label>
              <select
                class="w-full p-3 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 font-poppins transition-colors"
                v-model="form.specialty">
                <option value="" disabled>Seleccione una especialidad</option>
                <option v-for="(e, index) in experts" :key="index" :value="e.name">
                  {{ e.name }}
                </option>
              </select>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700 ml-1">Imagen del experto</label>
              <input
                class="w-full py-2 px-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 font-poppins transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                @change="handleImageChange($event)" type="file" accept="image/*">
              <img v-if="previewImage" :src="previewImage!" alt=""
                class="w-40 h-40 rounded-xl ring-2 ring-blue-600 !mt-2">
              <button v-if="previewImage" @click="removeImage"
                class="hover:bg-red-600 hover:text-white cursor-pointer transition-colors bg-white text-red-600 border border-red-600 rounded-xl px-2 py-1 font-poppins !mt-3">Eliminar
                imagen</button>
            </div>





            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-sm font-semibold text-gray-700 ml-1">Años de experiencia</label>
                <input
                  class="w-full py-3 px-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 font-poppins transition-colors"
                  type="number" placeholder="ej. 5" v-model="form.experienceYears" min="0">
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700 ml-1">ID profesional (opcional)</label>
              <input
                class="w-full py-3 px-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 font-poppins transition-colors"
                type="text" placeholder="ID profesional" v-model="form.professionalId">
            </div>


            <div class="space-y-1">
              <label class="text-sm font-semibold text-gray-700 ml-1">Biografía</label>
              <textarea
                class="w-full py-3 px-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 font-poppins transition-colors"
                placeholder="Breve descripción del experto..." v-model="form.bio" rows="4">
              </textarea>
            </div>

            <div class="max-w-md hidden bg-white border border-gray-100 rounded-2xl shadow-sm p-6 space-y-5">
              <div class="space-y-1">
                <h3 class="text-sm font-bold text-gray-900 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Información de cuenta
                </h3>
                <p class="text-sm text-gray-500 leading-relaxed">
                  Se enviará un correo a <span class="font-medium text-gray-700 italic">{{ form.email }}</span>.
                  Es fundamental que el experto configure su propia contraseña por seguridad.
                </p>
              </div>

              <div class="bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-3">
                <div class="flex flex-col gap-1">
                  <span class="text-[10px] uppercase tracking-wider font-bold text-gray-400">Credenciales
                    temporales</span>
                  <div class="grid grid-cols-1 gap-2 text-sm">
                    <div class="flex justify-between items-center">
                      <span class="text-gray-500">Correo:</span>
                      <span class="font-mono font-medium text-gray-800">{{ form.email }}</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-gray-500">Contraseña:</span>
                      <span class="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{{ tempPassword
                        }}</span>
                    </div>
                  </div>
                </div>

                <button @click="copyCredentialsToClipboard"
                  class="w-full flex items-center justify-center gap-2 bg-gray-900  text-white text-sm font-medium py-2.5 rounded-lg transition-all active:scale-[0.98] hover:bg-white hover:text-gray-900 hover:border-gray-200 hover:border">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copiar credenciales
                </button>
              </div>

              <div class="flex gap-2 px-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-amber-500 shrink-0" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p class="text-[11px] text-gray-400 leading-tight">
                  Importante actualizar la contraseña tras el primer inicio de sesion por seguridad
                </p>
              </div>
            </div>


            <h3 class="mt-8 text-center font-bold text-blue-600 mb-4 font-poppins">Horarios del experto</h3>
            <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div v-for="(slots, dayName) in schedule" :key="dayName" class="space-y-2">
                <div class="text-center text-blue-600 font-bold text-xs uppercase tracking-wider">
                  {{ dayName }}
                </div>
                <div class="space-y-1">
                  <button
                    class="w-full py-2 text-xs font-semibold text-center rounded-lg border transition-all duration-200"
                    v-for="(slot, slotIndex) in slots" :key="slotIndex" @click="getDateSelected(dayName, slot.time)"
                    :class="slot.isAvailable ? 'bg-white text-slate-700 border-slate-200 hover:border-blue-400' : 'bg-blue-600 text-white border-blue-600'">
                    {{ slot.time }}
                  </button>
                </div>
              </div>
            </div>

          </div>


          <!-- Action Buttons -->
          <div class="pt-4 pb-8 space-y-3">
            <button
              class="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-50 transition-all font-manrope"
              :disabled="!isFormValid" @click="createExpert">
              Crear Experto
            </button>
            <button
              class="w-full py-4 bg-white text-blue-600 font-bold rounded-2xl border-2 border-blue-600 hover:bg-blue-50 active:scale-[0.98] transition-all font-manrope"
              @click="resetForm">
              Restablecer Formulario
            </button>
          </div>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { addDoc, collection, doc, getFirestore, setDoc, Timestamp, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth as authFirebase } from '@/firebase';
import { useToast } from 'vue-toastification';
import imageCompression from 'browser-image-compression';
import { createUserData } from '@/composables/createUserData';

const toast = useToast();
const db = getFirestore();
const auth = authFirebase;

const loading = ref(false);
const showSuccessModal = ref(false);
const createdExpertPassword = ref('');

const experts = ref([
  { name: "Abogado", icon: "fa-balance-scale" },
  { name: "Médico", icon: "fa-user-md" },
  { name: "Contador", icon: "fa-calculator" },
  { name: "Arquitecto", icon: "fa-building" },
  { name: "Servicios Web", icon: "fa-laptop-code" },
  { name: "Publicidad", icon: "fa-bullhorn" },
  { name: "Traductor", icon: "fa-language" },
  { name: "Peritaje", icon: "fa-search" },
  { name: "Ingeniería en Computación", icon: "fa-cog" },
  { name: "Gestoría en Trámites", icon: "fa-file-alt" },
  { name: "Marketing", icon: "fa-chart-line" },
  { name: "Psicólogo/a", icon: "fa-user-graduate" },
  { name: "Maestro", icon: "fa-chalkboard-teacher" },
  { name: "Chef", icon: "fa-utensils" }
]);

const form = ref({
  userUid: '',
  fullName: '',
  specialty: '',
  email: '',
  phone: '',
  imgUrl: '',
  experienceYears: null as number | null,
  professionalId: '',
  bio: '',
  rating: 5,
  totalRatings: 0,
  completedSessions: 0,
  isSuspended: false,
  isBanned: false,
  suspensionReason: '',
});

const schedule = ref({
  Lunes: generateSlots(),
  Martes: generateSlots(),
  Miercoles: generateSlots(),
  Jueves: generateSlots(),
  Viernes: generateSlots(),
  Sábado: generateSlots(),
});

function generateSlots() {
  const times = ["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];
  return times.map(time => ({ isAvailable: true, takenAt: null, takenBy: null, time }));
}

const isFormValid = computed(() => {
  return (
    form.value.fullName.trim() !== '' &&
    form.value.email.trim() !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) &&
    form.value.experienceYears !== null &&
    form.value.bio.trim() !== '' &&
    form.value.specialty !== ''
  );
});

const resetForm = () => {
  form.value = {
    userUid: '',
    fullName: '',
    phone: '',
    specialty: '',
    email: '',
    imgUrl: '',
    experienceYears: null,
    professionalId: '',
    bio: '',
    rating: 5,
    totalRatings: 0,
    completedSessions: 0,
    isSuspended: false,
    isBanned: false,
    suspensionReason: '',
  };
};

const getDateSelected = (dayName: string, timeSelected: string) => {
  const daySlots = (schedule.value as any)[dayName];
  if (daySlots) {
    const slot = daySlots.find((s: any) => s.time === timeSelected);
    if (slot) slot.isAvailable = !slot.isAvailable;
  }
};

//A1Handler composable for create (user/client data to be able to log in both as expert and client/user)
const { setUserData } = createUserData();

const createExpert = async () => {
  if (!isFormValid.value) return;
  loading.value = true;
  try {
    if (!imageFile.value) {
      toast.error('Por favor, seleccione una imagen para el experto');
      return;
    }

    await handleImageCompression();
    if (compressedImageFile.value) {
      const base64 = await imgToBase64(compressedImageFile.value);
      form.value.imgUrl = base64;
      console.log(`Formulario completo:`, form.value);
    }

    const userCredential = await createUserWithEmailAndPassword(auth, form.value.email, tempPassword.value);
    const user = userCredential.user;

    await updateProfile(user, { displayName: form.value.fullName });
    await sendEmailVerification(user);

    form.value.userUid = user.uid;
    const docRef = doc(db, `experts/${user.uid}`);
    await setDoc(docRef, { ...form.value, createdAt: Timestamp.now() });

    // Save schedule
    await updateDoc(docRef, { schedule: schedule.value });

    // Add to EmailsExperts collection
    await addDoc(collection(db, 'EmailsExperts'), { email: form.value.email });

    await setDoc(doc(db, "users", user.uid), {
      name: form.value.fullName,
      email: form.value.email,
      phone: form.value.phone,
      birthDate: '01/01/2000',
      isBanned: false,
      terms: true,
      createdAt: Timestamp.now(),
      userId: user.uid,
      freeConsultations: true,
      categoryConsultations: {}, // Initialize empty object for tracking free consultations per category
    });

    toast.success('Experto creado exitosamente.');

    // Store credentials for the modal
    createdExpertPassword.value = tempPassword.value;
    showSuccessModal.value = true;

    //resetForm();
    imageFile.value = null;
    compressedImageFile.value = null;
    previewImage.value = null;
    generateTempPassword(); // Generate new password for next user

    loading.value = false;
  } catch (error: any) {
    loading.value = false;
    console.error('Error creating expert:', error);
    toast.error('Error: ' + error.message);
  } finally {
    loading.value = false;
  }
};

const handleImageChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    imageFile.value = file;
    previewImage.value = URL.createObjectURL(file);
  }
};

const imageFile = ref<File | null>(null);
const compressedImageFile = ref<File | null>(null);
const previewImage = ref<string | null>(null);



async function handleImageCompression() {

  if (!imageFile.value) {
    toast.error('Por favor, seleccione una imagen para el experto');
    console.log('No image file selected');
    return;
  }

  console.log('originalFile instanceof Blob', imageFile.value instanceof Blob); // true
  console.log(`originalFile size ${imageFile.value.size / 1024 / 1024} MB`);

  const options = {
    maxSizeMB: 0.1,
    maxWidthOrHeight: 720,
    useWebWorker: true,
  }

  try {
    const compressedFile = await imageCompression(imageFile.value, options);
    console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
    console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
    compressedImageFile.value = compressedFile;
  } catch (error) {
    console.log(error);
  }

}

const removeImage = () => {
  imageFile.value = null;
  previewImage.value = null;
  compressedImageFile.value = null;
  form.value.imgUrl = '';
}

const imgToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

const tempPassword = ref<string>('');

const generateTempPassword = () => {
  const characters =
    'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789!@#';
  const length = 12;
  let password = '';

  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  for (let i = 0; i < length; i++) {
    password += characters[randomValues[i] % characters.length];
  }

  tempPassword.value = password;
};

const copyCredentialsToClipboard = () => {
  const text = `Credenciales temporales
Correo:
${form.value.email}
Contraseña:
${tempPassword.value}

Importante actualizar la contraseña tras el primer inicio de sesion por seguridad`;

  navigator.clipboard.writeText(text).then(() => {
    toast.success('Credenciales copiadas al portapapeles');
  }).catch(() => {
    toast.error('Error al copiar credenciales');
  });
}

const closeSuccessModal = () => {
  showSuccessModal.value = false;
  createdExpertPassword.value = '';
  resetForm();
}

onMounted(() => {
  generateTempPassword();
})
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}
</style>
