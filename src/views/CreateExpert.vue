<template>
  <div class="web-page min-h-screen bg-gray-50">
    <header class="web-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm">
      <nav class="web-toolbar h-16 flex items-center px-4">
        <div class="web-buttons flex items-center space-x-2 order-first">
          <button class="web-back-btn p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            @click="$router.back()">
            <v-icon name="hi-solid-chevron-left" scale="1.5" />
          </button>
        </div>
        <h1 class="web-title text-lg font-bold text-gray-900 font-nunito">Crear Nuevo Experto</h1>
      </nav>
    </header>

    <main class="web-content overflow-y-auto p-6 max-w-4xl mx-auto">
      <!-- Basic Information Section -->
      <div class="space-y-8">
        <div class="web-card bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
          <div class="web-card-header p-4 border-b bg-blue-600 text-white">
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
              <label class="text-sm font-semibold text-gray-700 ml-1">URL de imagen</label>
              <input
                class="w-full py-3 px-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-600 font-poppins transition-colors"
                type="url" placeholder="https://ejemplo.com/imagen.png" v-model="form.imgUrl">
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

const toast = useToast();
const db = getFirestore();
const auth = authFirebase;

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

  try {
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
  } catch (error: any) {
    console.error('Error creating expert:', error);
    toast.error('Error: ' + error.message);
  }
};
</script>
