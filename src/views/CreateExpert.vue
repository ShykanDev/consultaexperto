<template>
  <div class="web-page min-h-screen bg-gray-50 mt-28">

    <!--Loader-->
    <div v-if="loading" class="fixed inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center z-50">
      <div
        class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white flex items-center justify-center relative">
        <v-icon name="fa-user" class="text-white absolute animate-spin animate-reverse " scale="3" />
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
                placeholder="Breve descripción del experto..." v-model="form.bio" rows="4"></textarea>
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
import { ref, computed } from 'vue';
import { addDoc, collection, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth as authFirebase } from '@/firebase';
import { useToast } from 'vue-toastification';
import imageCompression from 'browser-image-compression';

const toast = useToast();
const db = getFirestore();
const auth = authFirebase;

const loading = ref(false);

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

    const userCredential = await createUserWithEmailAndPassword(auth, form.value.email, '1234567890');
    const user = userCredential.user;

    await updateProfile(user, { displayName: form.value.fullName });
    await sendEmailVerification(user);

    form.value.userUid = user.uid;
    const docRef = doc(db, `experts/${user.uid}`);
    await setDoc(docRef, form.value);

    // Save schedule
    await updateDoc(docRef, { schedule: schedule.value });

    // Add to EmailsExperts collection
    await addDoc(collection(db, 'EmailsExperts'), { email: form.value.email });

    toast.success('Experto creado exitosamente. Se ha enviado verificación por email.');
    resetForm();
    imageFile.value = null;
    compressedImageFile.value = null;
    previewImage.value = null;

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

const base64Image = ref<string | null>(null);



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

</script>
