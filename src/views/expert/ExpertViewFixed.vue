<template>
  <div class="min-h-screen bg-[#F8FAFC] pb-10 font-manrope">


    <main class=" px-4 sm:px-6 lg:px-8 pt-28 mt-5">
      <!-- Loading Skeleton -->
      <div v-if="!expertDataLoaded" class="animate-pulse space-y-8">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div class="lg:col-span-4 bg-white rounded-3xl p-8 shadow-sm h-96"></div>
          <div class="lg:col-span-8 space-y-6">
            <div class="bg-white rounded-3xl p-8 shadow-sm h-48"></div>
            <div class="bg-white rounded-3xl p-8 shadow-sm h-96"></div>
          </div>
        </div>
      </div>

      <div v-else class="space-y-2">
        <!-- Top Banner: Subscription/Free Consult Alert -->
        <transition enter-active-class="animate__animated animate__fadeInDown">
          <div v-if="!validateFreeConsults(expertData?.specialty!)"
            class="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-start gap-4">
              <div class="p-3 bg-blue-100 rounded-xl text-blue-600">
                <v-icon name="ri-error-warning-line" scale="1.5" animation="ring" />
              </div>
              <div>
                <h4 class="text-blue-900 font-bold text-lg">Citas gratuitas agotadas</h4>
                <p class="text-blue-700 text-sm mt-1">
                  Has completado tus citas gratuitas en la categoría <span class="font-bold underline">{{
                    expertData?.specialty }}</span>.
                  Contrata al experto para continuar con tu asesoría profesional.
                </p>
              </div>
            </div>
            <button @click="handleHiring"
              class="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group">
              <span>Contratar Ahora</span>
              <v-icon name="bi-person-badge" class="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </transition>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ">

          <!-- LEFT COLUMN: Profile info -->
          <aside class="lg:col-span-4 space-y-6">
            <!-- Profile Card -->
            <div class=" rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100 group">
              <div class="p-8 text-center">
                <div class="relative group inline-block mb-6">
                  <!--Chip -->
                  <div
                    class="absolute z-10 bottom-0 opacity-0 group-hover:animate-fade-up group-hover:opacity-100  min-w-40 left-36 bg-white ring-[1px] ring-blue-500 text-blue-600  flex items-center justify-center rounded-lg p-2 ">
                    <p class="text-xs font-quicksand">Este experto esta verificado por el equipo de
                      Consulta
                      Experto</p>
                  </div>
                  <div
                    class="w-32 h-32 rounded-[2rem] overflow-hidden ring-4 ring-offset-4 ring-blue-500 transition-all group-hover:scale-105">
                    <img class="w-full h-full object-cover"
                      :src="expertData?.imgUrl || 'https://ui-avatars.com/api/?name=' + expertData?.fullName + '&background=0D8ABC&color=fff'"
                      :alt="expertData?.fullName">
                  </div>
                  <v-icon
                    class="absolute -bottom-2 -right-2 bg-blue-500 text-white w-10 h-10 p-1 rounded-full border-4 border-white shadow-sm"
                    name="ri-shield-check-fill" scale="0.7" />
                </div>

                <h1 class="text-2xl font-extrabold text-slate-800 tracking-tight">{{ expertData?.fullName }}</h1>
                <p class="text-blue-600 font-semibold text-sm mt-1 uppercase tracking-wider">{{ expertData?.specialty }}
                </p>

                <div v-if="expertData?.isSuspended"
                  class="mt-2 inline-flex items-center px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                  <v-icon name="ri-error-warning-line" scale="0.8" class="mr-1" /> Suspendido
                </div>

                <!-- Rating -->
                <div class="mt-6 flex items-center justify-center gap-2 bg-slate-50 rounded-2xl py-3 px-4">
                  <div class="flex items-center gap-1">
                    <v-icon name="io-star" class="text-yellow-500" scale="1.1" />
                    <span class="text-xl font-bold text-slate-800">{{ calcStarsValue(expertData?.rating!).toFixed(1)
                      }}</span>
                  </div>
                  <div class="h-4 w-px bg-slate-200"></div>
                  <span class="text-xs text-slate-500 font-medium">{{ expertData?.rating?.count }} Calificaciones</span>
                </div>
              </div>

              <!-- Extra meta info -->
              <div class="border-t border-slate-100 bg-slate-50/50 p-6 space-y-4">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-400 uppercase">Cédula Profesional</span>
                  <span class="text-sm font-semibold text-slate-700">{{ expertData?.professionalId || 'No registrada'
                    }}</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-400 uppercase">Años de Exp.</span>
                  <span class="text-sm font-semibold text-slate-700">{{ expertData?.experienceYears || '10+' }}
                    años</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-slate-400 uppercase">Cédula Profesional</span>
                  <span class="text-sm font-semibold text-slate-700">{{ expertData?.professionalId || 'No registrada'
                    }}</span>
                </div>
                <div class="flex items-center justify-between flex-col">
                  <span class="text-xs font-bold text-slate-400 uppercase">Resúmen</span>
                  <span class="text-sm font-semibold text-slate-700">{{ expertData?.bio || 'No registrado'
                    }}</span>
                </div>
              </div>
            </div>

            <!-- Stats/Highlights Card -->
            <div class="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 grid grid-cols-2 gap-4">
              <div class="p-4 bg-blue-50 rounded-2xl text-center">
                <div class="text-2xl font-bold text-blue-700">{{ expertData?.rating?.count || 0 }}+</div>
                <div class="text-[10px] font-bold text-blue-600/70 uppercase">Consultas</div>
              </div>
              <div class="p-4 bg-blue-50 rounded-2xl text-center">
                <div class="text-2xl font-bold text-blue-700">{{ calcStarsValue(expertData?.rating!).toFixed(1)
                  }}</div>
                <div class="text-[10px] font-bold text-blue-600/70 uppercase">Extrellas ({{ expertData?.rating?.count
                  }} calificaciones)</div>
              </div>
            </div>
          </aside>

          <!-- RIGHT COLUMN: Bio & Agenda -->
          <section class="lg:col-span-8 space-y-8">
            <!-- Biography Card 
            <div class="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
              <div class="flex items-center gap-3 mb-6">
                <div class="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
                  <v-icon name="hi-solid-user-circle" />
                </div>
                <h2 class="text-xl font-bold text-slate-800">Sobre el Profesional</h2>
              </div>
              <p class="text-slate-600 leading-relaxed text-lg font-light italic">
                "{{ `${expertData?.bio}
                || 'Este experto aún no ha agregado una biografía detallada, pero cuenta con toda la experiencia
                necesaria para ayudarte en tu consulta.' ` }}"
              </p>
            </div>-->

            <!-- Booking Section -->
            <div
              class="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              <div class="p-8 pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div class="flex items-center gap-3">
                  <div class="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-200">
                    <v-icon name="bi-calendar-check" />
                  </div>
                  <div>
                    <h2 class="text-xl font-bold text-slate-800">Agenda de Citas</h2>
                    <p class="text-slate-400 text-sm font-medium">Selecciona un horario disponible</p>
                  </div>
                </div>

                <div v-if="userHasSlotsTaken"
                  class="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl border border-blue-100 ring-1 ring-blue-100">
                  <v-icon class="animate-bounce" name="bi-calendar" scale="1.4" />
                  <span class="text-xs font-bold">Tiene una cita agendada para el {{ userAppointmentString }}</span>
                  <RouterLink to="/client-appointments">
                    <button
                      class="ml-2 text-xs font-bold bg-blue-600 p-2 rounded-2xl text-white  transition-colors flex items-center gap-1">Ver
                      citas
                      <v-icon name="bi-arrow-right" scale="1" />
                    </button>
                  </RouterLink>
                </div>
              </div>

              <!-- Schedule Grid -->
              <div class="p-4">
                <div v-if="validateFreeConsults(expertData?.specialty!)"
                  class="flex overflow-x-auto gap-6 pb-2 scrollbar-hide">
                  <div v-for="(slots, dayName) in schedule" :key="dayName" class="flex-shrink-0 w-48 space-y-4">
                    <div
                      class="text-center py-2 bg-slate-50 rounded-xl border border-slate-100 text-blue-700 font-bold text-sm">
                      {{ dayName }}
                    </div>

                    <div class="space-y-3">
                      <button v-for="(slot, slotIndex) in slots" :key="slotIndex"
                        @click="getDateSelected(dayName, slot.time)"
                        :disabled="slot.isAvailable || (slot.takenBy != null && slot.takenBy !== authStore().getUserUid)"
                        :class="[
                          'w-full py-3 px-2 rounded-2xl text-sm font-bold transition-all duration-300 transform active:scale-95 flex flex-col items-center gap-1',
                          // Misma lógica de colores anterior pero refinada
                          slot.isAvailable ? 'bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed' : '',
                          !slot.isAvailable && slot.takenBy == null ? 'bg-white text-slate-700 border-2 border-slate-100 hover:border-blue-500 hover:text-blue-600' : '',
                          slot.takenBy === authStore().getUserUid && !slot.takenAt ? 'bg-blue-600 text-white border-blue-600 shadow-lg scale-[1.02]' : '',
                          slot.takenBy === authStore().getUserUid && slot.takenAt ? 'bg-green-500 text-white border-green-500 shadow-lg' : '',
                          slot.takenBy != null && slot.takenBy !== authStore().getUserUid ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed' : ''
                        ]">
                        {{ slot.time }}
                        <span class="text-[9px] uppercase tracking-widest opacity-80">
                          <template v-if="!slot.isAvailable && slot.takenBy == null">Disponible</template>
                          <template v-else-if="slot.takenBy === authStore().getUserUid">Seleccionado</template>
                          <template v-else-if="slot.takenBy != null">Ocupado</template>
                          <template v-else>Indisponible</template>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <!-- Not available state -->
                <div v-else
                  class="text-center py-12 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200">
                  <v-icon name="ri-user-smile-line" scale="3" class="text-slate-300 mb-4" />
                  <h3 class="text-lg font-bold text-slate-500">Ha agotado sus citas gratuitas para esta categoria </h3>
                  <p class="text-slate-400 max-w-xs mx-auto text-sm mt-2">Para poder continuar con una cita le
                    recomendamos contratar al
                    experto profesional.</p>
                  <button @click="handleHiring"
                    class="mt-4 px-6 py-2 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700">Contratar</button>
                </div>
              </div>

              <!-- Floating Confirm Bar (PC Style) -->
              <transition enter-active-class="animate__animated animate__fadeInUp"
                leave-active-class="animate__animated animate__fadeOutDown">
                <div v-if="calculatedAppointmentDate"
                  class="bg-gradient-to-r from-blue-700 to-blue-700 p-6 flex flex-col md:flex-row items-center justify-between gap-6">

                  <div class="flex flex-col gap-4 max-w-2xl">
                    <div class="flex items-center gap-4">
                      <div class="p-3 bg-white/20 rounded-2xl text-white backdrop-blur-md">
                        <v-icon name="bi-calendar-check" scale="1.2" />
                      </div>
                      <div>
                        <p class="text-white/60 text-xs font-bold uppercase tracking-widest">Cita Seleccionada</p>
                        <h4 class="text-white font-bold text-lg md:text-xl">{{ calculatedAppointmentDate }}</h4>
                      </div>
                    </div>

                    <p class="text-white/80 text-sm leading-tight mt-2">
                      Al confirmar la cita, usted está de acuerdo con nuestras
                      <router-link to="/privacy-policy" class="underline hover:text-white">Políticas de
                        Privacidad</router-link> y
                      <router-link to="/terms" class="underline hover:text-white">Términos y Condiciones</router-link>.
                      Queda <strong>estrictamente prohibido</strong> el intercambio de datos personales entre el usuario
                      y el experto
                      durante una cita gratuita; el incumplimiento podría resultar en la <strong>suspensión indefinida
                        de la
                        cuenta</strong>.
                    </p>
                  </div>

                  <button @click="updateSubcollectionSchedule" :disabled="savingChanges"
                    class="w-full md:w-auto px-10 py-4 bg-white text-blue-700 hover:bg-blue-50 font-extrabold rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50">
                    <span>{{ savingChanges ? 'Procesando...' : 'Confirmar Cita Ahora' }}</span>
                    <v-icon v-if="!savingChanges" name="hi-paper-airplane" />
                  </button>
                </div>
              </transition>
            </div>
          </section>

        </div>
      </div>
    </main>

    <!-- Overlay Loader -->
    <div v-if="loading"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-blue-900/40 backdrop-blur-sm transition-all">
      <div class="relative">
        <div class="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
        <div class="absolute inset-0 flex items-center justify-center">
          <v-icon name="hi-paper-airplane" class="text-white animate-pulse" scale="1.5" />
        </div>
      </div>
      <p class="mt-4 text-white font-bold text-lg tracking-wide">{{ loadingMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { collection, doc, getFirestore, onSnapshot, runTransaction, Timestamp } from 'firebase/firestore';
import { computed, ref, onMounted, onUnmounted } from 'vue';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';

import { useExpertUiStore } from '@/stores/expertUi';
import { IExpertSchedule, Slot } from '@/interfaces/Ischedule';
import { authStore } from '@/store/auth';
import emailjs from '@emailjs/browser';
import { IExpert } from '@/interfaces/IExpert';
import { useRating } from '@/composables/stars';
import { useHiringStore } from '@/store/hiring';

const { calcStarsValue } = useRating();
const loading = ref(false);
const loadingMessage = ref('');
const toast = useToast();
const savingChanges = ref(false);

const dayMap: { [key: string]: number } = {
  'Domingo': 0, 'Lunes': 1, 'Martes': 2, 'Miercoles': 3, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5, 'Sabado': 6, 'Sábado': 6
};

const schedule = computed(() => {
  const originalSchedule = expertData.value?.schedule;
  const orderedDays = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  const orderedSchedule: Record<string, Slot[]> = {};

  orderedDays.forEach(day => {
    if ((originalSchedule as any)?.[day]) {
      orderedSchedule[day] = (originalSchedule as any)[day];
    }
  });

  return orderedSchedule;
});

const router = useRouter()
const authStoreGlobal = authStore()

const isUserLoggedIn = () => {
  if (!authStoreGlobal.getIsAuth) {
    router.push('/login');
    return false;
  }
  return true;
};

const slotSelected = ref<Slot | null>(null);

const isAnSlotAlreadyTaken = () => Object.values(schedule.value).flat(1).find((s: any) => s.takenBy == authStore().getUserUid && !s.takenAt);

const calculateNextAppointmentDate = (dayName: string, timeStr: string): Date => {
  const targetDay = dayMap[dayName];
  if (targetDay === undefined) throw new Error("Día inválido");

  const [hours, minutes] = timeStr.trim().split(':').map(Number);
  const now = new Date();
  const currentDay = now.getDay();
  const diff = targetDay - currentDay;

  const appointmentDate = new Date(now);
  appointmentDate.setDate(now.getDate() + diff);
  appointmentDate.setHours(hours, minutes, 0, 0);

  if (appointmentDate <= now) {
    appointmentDate.setDate(appointmentDate.getDate() + 7);
  }
  return appointmentDate;
}

const isAtLeast24HoursAhead = (appointmentDate: Date): boolean => {
  const now = new Date();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const diffMs = appointmentDate.getTime() - now.getTime();
  return diffMs >= oneDayInMs;
}

const getDateSelected = (dayName: string, timeSelected: string) => {
  if (userHasSlotsTaken.value) {
    toast.warning('No puede agendar horarios si ya tiene citas agendadas');
    return;
  }
  if (!isUserLoggedIn()) return;

  const selectedDaySlots = schedule.value[dayName];
  if (!selectedDaySlots) return;

  const foundSlot = selectedDaySlots.find((s: Slot) => s.time === timeSelected);
  if (!foundSlot) return;

  if (foundSlot.isAvailable) {
    toast.warning(`El horario de las ${foundSlot.time} no está disponible`);
    return;
  }

  if (foundSlot.takenBy != null && foundSlot.takenBy != authStore().getUserUid) {
    toast.warning(`El horario de las ${foundSlot.time} ya está tomado por otro usuario`);
    return;
  }

  if (foundSlot.takenBy == authStore().getUserUid && foundSlot.takenAt != null) {
    toast.warning(`El horario de las ${foundSlot.time} ya está tomado por usted`);
    return;
  }

  let nextDate: Date;
  try {
    nextDate = calculateNextAppointmentDate(dayName, foundSlot.time);
    if (!isAtLeast24HoursAhead(nextDate)) {
      toast.warning('No es posible agendar con menos de 24 horas de anticipación.');
      return;
    }
  } catch (e) {
    toast.error('Error al calcular fecha de cita');
    return;
  }

  const previousTaken = isAnSlotAlreadyTaken();
  if (previousTaken && previousTaken !== foundSlot) {
    previousTaken.takenBy = null;
  }

  if (foundSlot.takenBy == authStore().getUserUid) {
    foundSlot.takenBy = null;
    slotSelected.value = null;
    calculatedAppointmentDate.value = null;
  } else {
    foundSlot.takenBy = authStore().getUserUid;
    slotSelected.value = foundSlot;
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    };
    const dateString = nextDate.toLocaleDateString('es-ES', options);
    calculatedAppointmentDate.value = dateString.charAt(0).toUpperCase() + dateString.slice(1);
  }
};

const db = getFirestore();

const updateSubcollectionSchedule = async () => {
  if (!slotSelected.value) {
    toast.warning('No se ha seleccionado ningún horario');
    return;
  }

  if (expertData.value?.isSuspended || expertData.value?.isBanned) {
    toast.error('No puede agendar horarios con este experto.');
    return;
  }

  if (userHasSlotsTaken.value) {
    toast.error('Ya tiene una cita agendada.');
    return;
  }

  const dayName = Object.keys(schedule.value).find(key =>
    schedule.value[key].includes(slotSelected.value as Slot)
  );

  if (!dayName) return;

  const appointmentDate = calculateNextAppointmentDate(dayName, slotSelected.value.time);

  if (!isAtLeast24HoursAhead(appointmentDate)) {
    toast.error('Mínimo 24 horas de anticipación requeridas.');
    return;
  }

  loading.value = true;
  loadingMessage.value = 'Asegurando tu cita...';
  savingChanges.value = true;

  const guardianId = `${expertData.value?.userUid}_${dayName}_${slotSelected.value.time}`;
  const guardianRef = doc(db, 'bookings', guardianId);
  const expertPath = doc(db, `experts/${expertData.value?.userUid}`);
  const newScheduleRef = doc(collection(db, 'schedules'));

  try {
    await runTransaction(db, async (transaction) => {
      const guardianDoc = await transaction.get(guardianRef);
      const expertDoc = await transaction.get(expertPath);

      if (guardianDoc.exists()) throw new Error("Este horario ya fue reservado.");
      if (!expertDoc.exists()) throw new Error("El experto no existe.");

      const currentSchedule = expertDoc.data()?.schedule || {};
      const daySlots = currentSchedule[dayName] || [];
      const slotToUpdate = daySlots.find((s: any) => s.time === slotSelected.value!.time);

      if (!slotToUpdate || (slotToUpdate.takenBy && slotToUpdate.takenBy !== authStore().getUserUid)) {
        throw new Error("El horario ya no está disponible.");
      }

      slotToUpdate.takenBy = authStore().getUserUid;
      slotToUpdate.takenAt = Timestamp.now();

      transaction.set(guardianRef, { reserverUid: authStore().getUserUid, createdAt: Timestamp.now() });
      transaction.update(expertPath, { schedule: currentSchedule });
      transaction.set(newScheduleRef, {
        userName: authStore().getUserName,
        userUid: authStore().getUserUid,
        expertUid: expertData.value?.userUid,
        expertName: expertData.value?.fullName,
        expertSchedule: slotSelected.value,
        expertSpecialty: expertData.value?.specialty,
        expertProfessionalId: expertData.value?.professionalId,
        appointmentLink: '',
        isFinished: false,
        dayName: dayName,
        appointmentDate: Timestamp.fromDate(appointmentDate),
        createdAt: Timestamp.now(),
        acceptedByExpert: false,
      });
    });

    toast.success(`¡Cita agendada con éxito!`);
    setTimeout(() => router.push('/appointments'), 1500);

  } catch (error: any) {
    toast.error(error.message || 'Error al agendar la cita.');
    savingChanges.value = false;
    loading.value = false;
    if (slotSelected.value) slotSelected.value.takenBy = null;
  }
};

const userHasSlotsTaken = ref(false);
const userAppointmentString = ref('');
const calculatedAppointmentDate = ref<string | null>(null);

const verifyUserHasSlotsTaken = () => {
  const currentSchedule = expertData.value?.schedule;
  userHasSlotsTaken.value = false;
  userAppointmentString.value = '';

  if (currentSchedule) {
    for (const [day, slots] of Object.entries(currentSchedule)) {
      const uSlot = (slots as any[]).find(s => s.takenBy == authStore().getUserUid && s.takenAt);
      if (uSlot) {
        userHasSlotsTaken.value = true;
        userAppointmentString.value = `${day} a las ${uSlot.time}`;
        break;
      }
    }
  }
}

const expertDataLoaded = ref(false);
const expertData = ref(null as IExpert | null);
let unsub: (() => void) | null;

const getExpertData = async () => {
  const expertUid = useExpertUiStore().getExpertUid;
  if (!expertUid) {
    expertDataLoaded.value = true;
    return false;
  }

  const expertDocRef = doc(db, `experts/${expertUid}`);
  unsub = onSnapshot(expertDocRef, (snapshot) => {
    if (!snapshot.exists()) {
      toast.error('No se encontró al experto');
      return;
    }
    expertData.value = snapshot.data() as IExpert;
    verifyUserHasSlotsTaken();
    expertDataLoaded.value = true;
  });
}

onMounted(async () => {
  await getExpertData();
  emailjs.init({ blockHeadless: true, publicKey: '8uRc3wp2ZXACkO_Eb' });
});

onUnmounted(() => {
  if (unsub) unsub();
});

const validateFreeConsults = (expertSpecialty: string): boolean | undefined => {
  if (!expertSpecialty) return false;
  const userData = authStore().getUserData;

  // If user doesn't have categoryConsultations field, they're a new user with free consultations available
  if (!userData?.categoryConsultations) return true;

  const category = userData.categoryConsultations[expertSpecialty];
  // If category doesn't exist, user hasn't used a free consultation in this category yet
  if (!category) return true;

  // Return the hasFreeConsult flag for this specific category
  return category.hasFreeConsult;
}

const hiringStore = useHiringStore();
const handleHiring = () => {
  if (!expertData.value) return;
  hiringStore.setExpertHiringData(expertData.value.fullName!, expertData.value.specialty!, expertData.value.userUid!);
  router.push('/hiring');
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Glassmorphism subtle effects */
.bg-white\/20 {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Custom rounded corners */
.rounded-3xl {
  border-radius: 1.5rem;
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>
