<template>
  <div class="web-page min-h-screen bg-gray-50">
    <header-component :pageTitle="'Perfil de ' + expertData?.fullName" />

    <main class="web-content overflow-y-auto p-4">
      <section class="p-4 space-y-6" v-if="!expertDataLoaded">
        <!-- Profile Skeleton -->
        <div class="bg-white rounded-2xl shadow-sm p-6 flex flex-col items-center">
          <div class="w-24 h-24 rounded-full bg-gray-100 animate-pulse flex items-center justify-center mb-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
          <div class="h-6 w-48 bg-gray-100 rounded animate-pulse mb-2"></div>
          <div class="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
        </div>

        <!-- Info Skeleton -->
        <div class="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div class="h-12 bg-gray-50 animate-pulse border-b border-gray-100"></div>
          <div class="p-6 space-y-4">
            <div class="h-4 w-full bg-gray-50 rounded animate-pulse"></div>
            <div class="h-4 w-full bg-gray-50 rounded animate-pulse"></div>
            <div class="h-4 w-2/3 bg-gray-50 rounded animate-pulse"></div>
          </div>
        </div>

        <!-- Schedule Skeleton -->
        <div class="space-y-4">
          <div class="h-6 w-48 bg-gray-100 rounded animate-pulse mx-auto"></div>
          <div class="flex gap-4 overflow-x-auto pb-4">
            <div class="min-w-[200px] h-48 bg-white rounded-2xl shadow-sm animate-pulse border border-gray-100"
              v-for="i in 3" :key="i"></div>
          </div>
          <div class="h-12 w-full bg-blue-100 rounded-xl animate-pulse"></div>
        </div>
      </section>

      <section v-else>

        <div
          class="web-card bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden w-full sticky z-40 animate__animated animate__slideInDown ring-1 ring-blue-500 top-0 mt-4 ion-no-margin ion-padding bg-blue-100 border-l-4 border-r-4 border-blue-500 text-blue-700 text-sm font-alexandria rounded-md flex-col items-center gap-2"
          v-if="!validateFreeConsults(expertData?.specialty!)">
          <v-icon class="text-blue-500" name="ri-error-warning-line" scale="1.5" animation="ring" />
          <p class="flex items-center gap-2 text-center">
            No tiene más citas gratuitas en la categoría
          </p>
          <span class="font-bold">
            {{ expertData?.specialty }}.

          </span>
          <p class="mt-2 text-center text-blue-700 font-bold font-montserrat italic">
            Para tener una consulta contrate al experto {{ expertData?.fullName }}
          </p>
          <button
            class="web-btn inline-flex items-center justify-center font-semibold transition-all active:scale-95 disabled:opacity-50 bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200 font-medium font-poppins ml-1 mt-2 gap-1 w-full"
            @click="handleHiring">
            <span>
              Contratar
            </span>
            <v-icon class="text-white" name="bi-person-badge" scale="1.1"></v-icon>
          </button>
        </div>

        <!-- Profile Header -->
        <div
          class="web-card bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden ion-no-margin flex flex-col items-center p-6 mt-24"
          style="background-color: #fff">


          <!-- Contenido existente -->
          <div class="web-avatar overflow-hidden rounded-full mb-4 w-24 h-24">
            <img class="w-24 h-24 ring ring-offset-2 ring-offset-white"
              :src="expertData?.profilePicture || 'https://picsum.photos/200/300'" alt="Profile picture"
              :class="{ 'ring-red-600': expertData?.isSuspended, 'ring-blue-500': !expertData?.isSuspended }">
          </div>
          <h1 class="web-text text-center text-2xl font-bold font-manrope">{{ expertData?.fullName || 'Juan Pérez' }}
          </h1>
          <h3 v-if="expertData?.isSuspended"
            :class="{ 'text-red-600 font-poppins font-bold': expertData?.isSuspended }">(Suspendido)</h3>
          <p class="mt-1 text-base text-blue-700 font-poppins">
            {{ expertData?.specialty || 'Specialty' }}
          </p>

          <!-- Rating Display -->
          <div class="mt-2" v-if="expertData?.rating">
            <article class="flex items-center justify-center gap-1">
              <div class="flex-col bg-blue-200">

              </div>
              <span class="text-slate-600 font-manrope font-semibold text-sm">
                {{ calcStarsValue(expertData.rating).toFixed(1) }}
              </span>
              <v-icon class="text-yellow-500" name="io-star" scale="1" />
              <p class="text-slate-500 text-sm font-poppins ml-1">
                ({{ expertData.rating.count }} {{ expertData.rating.count === 1 ? 'calificación' : 'calificaciones' }})
              </p>
            </article>
          </div>


        </div>



        <!-- Contact Information -->
        <div class="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden mt-6">
          <div class="bg-blue-600 p-4">
            <h2 class="text-lg font-bold text-white">Información del experto</h2>
          </div>
          <div class="divide-y divide-gray-100 px-4">
            <div class="py-4 flex justify-between items-center text-sm">
              <span class="text-blue-600 font-semibold uppercase text-xs">Nombre</span>
              <span class="text-gray-900 font-medium">{{ expertData?.fullName ?? 'Juan Perez' }}</span>
            </div>
            <div class="py-4 flex justify-between items-center text-sm">
              <span class="text-blue-600 font-semibold uppercase text-xs">Especialidad</span>
              <span class="text-gray-900 font-medium">{{ expertData?.specialty ?? 'Médico' }}</span>
            </div>
            <div class="py-4 flex justify-between items-center text-sm">
              <span class="text-blue-600 font-semibold uppercase text-xs">Cédula</span>
              <span class="text-gray-900 font-medium">{{ expertData?.professionalId ?? 'N/A' }}</span>
            </div>
          </div>
        </div>

        <!-- Professional Bio -->
        <div class="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden mt-6">
          <div class="bg-blue-600 p-4">
            <h2 class="text-lg font-bold text-white">Biografía</h2>
          </div>
          <div class="p-4">
            <p class="text-sm leading-relaxed text-gray-700">
              {{ expertData?.bio ?? 'Biografía de ejemplo' }}
            </p>
          </div>
        </div>

        <div class="p-1 w-full font-medium text-center text-blue-600 bg-white rounded-xl shadow-sm font-poppins mt-6"
          v-if="validateFreeConsults(expertData?.specialty!)">
          Horarios del experto
        </div>
        <div class="text-center text-gray-500 font-poppins text-sm mb-4"
          v-if="validateFreeConsults(expertData?.specialty!)">
          Estos son los horarios disponibles para citas
        </div>

        <div
          class="w-full max-w-md mx-auto p-4 mb-4 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2"
          v-if="userHasSlotsTaken">
          <div class="text-blue-500">
            <v-icon name="bi-calendar" />
          </div>
          <span class="text-xs font-medium text-slate-600">
            Tiene una cita programada el {{ userAppointmentString }}
          </span>
          <router-link
            class="ml-auto px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-blue-500 shadow-sm hover:bg-blue-50 transition-colors"
            to="/appointments">
            Ver más
          </router-link>
        </div>

        <div class="flex w-full overflow-x-auto gap-4 p-4 bg-white shadow-sm border border-gray-100 rounded-2xl"
          v-if="validateFreeConsults(expertData?.specialty!)">
          <article class="min-w-[180px] p-4 bg-gray-50 rounded-2xl border border-gray-100"
            v-for="(slots, dayName) in schedule" :key="dayName">
            <h4 class="text-center font-bold text-blue-600 mb-3 border-b border-blue-100 pb-2">
              {{ dayName }}
            </h4>

            <div
              class="mb-2 py-2 px-3 font-semibold text-center rounded-lg ring-1 ring-gray-200 cursor-pointer font-poppins text-sm transition-all"
              v-for="(slot, slotIndex) in slots as IExpertSchedule['schedule'][keyof IExpertSchedule['schedule']]"
              :key="slotIndex" @click="getDateSelected(dayName, slot.time)" :class="{
                'bg-green-100 text-green-700 ring-green-200': slot.takenBy != null && slot.takenBy === authStore().getUserUid,
                'bg-yellow-100 text-yellow-700 ring-yellow-200': slot.takenBy != null && slot.takenBy !== authStore().getUserUid,
                'bg-blue-600 text-white ring-blue-700 shadow-md': !slot.isAvailable && slot.takenBy == null,
                'bg-gray-200 text-gray-400 line-through ring-gray-300 pointer-events-none': slot.isAvailable
              }">
              {{ slot.time }}
              <div class='text-[9px] uppercase tracking-tighter mt-0.5'>
                <span v-if="!slot.isAvailable && slot.takenBy == null">Disponible</span>
                <span v-else-if="slot.takenBy != null && slot.takenBy !== authStore().getUserUid">Ocupado</span>
                <span v-else-if="slot.takenBy === authStore().getUserUid">Tomado por usted</span>
              </div>
            </div>
          </article>
        </div>

        <div class="mt-6 mb-4 text-center animate-fade-in" v-if="calculatedAppointmentDate">
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
            Fecha Seleccionada
          </p>
          <div
            class="inline-block px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-200 text-lg">
            📅 {{ calculatedAppointmentDate }}
          </div>

          <div class="mt-6">
            <button
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              v-if="!userHasSlotsTaken && !savingChanges && validateFreeConsults(expertData?.specialty!)"
              @click="updateSubcollectionSchedule()">
              <span>{{ !savingChanges ? 'Confirmar Cita' : 'Agendando...' }}</span>
              <v-icon name="bi-calendar-check" />
            </button>
          </div>
        </div>

      </section>

      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"
        v-if="loading">
      </div>

    </main>


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
import HeaderComponent from '@/components/Templates/HeaderComponent.vue';

// Destructure the calcStarsValue function from useRating composable
const { calcStarsValue } = useRating();




const loading = ref(false);
const loadingMessage = ref('');

/**
 * Presenta un mensaje tipo toast al usuario.
 * @param position Posición en la pantalla ('top', 'middle', 'bottom')
 * @param message Mensaje a mostrar
 * @param color Color del toast (ej. 'success', 'warning', 'danger')
 */
const toast = useToast();
// presentToast wrapper removed, use toast.info, toast.success, etc.

const savingChanges = ref(false);


/**
 * Mapeo de días a números para facilitar cálculos de fechas (0=Domingo, 1=Lunes, etc.)
 */
const dayMap: { [key: string]: number } = {
  'Domingo': 0, 'Lunes': 1, 'Martes': 2, 'Miercoles': 3, 'Miércoles': 3, 'Jueves': 4, 'Viernes': 5, 'Sabado': 6, 'Sábado': 6
};

/**
 * Computa el horario del experto ordenado correctamente.
 */
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

/**
 * Verifica si el usuario está logueado, sino redirige al login.
 */
const isUserLoggedIn = () => {
  if (!authStoreGlobal.getIsAuth) {
    router.push('/login');
    return false;
  }
  return true;
};

const slotSelected = ref<Slot | null>(null);

/**
 * Verifica si el usuario actual ya tiene un slot tomado en el calendario local (sin confirmar en BD aún).
 */
const isAnSlotAlreadyTaken = () => Object.values(schedule.value).flat(1).find((s: any) => s.takenBy == authStore().getUserUid && !s.takenAt);

/**
 * Calcula la fecha y hora exacta de la próxima cita disponible dado un día y una hora.
 * Si el día/hora ya pasó esta semana, retorna la fecha de la próxima semana.
 * @param dayName Nombre del día (ej. "Lunes")
 * @param timeStr Hora en formato string (ej. "10:00")
 * @returns Objeto Date con la fecha y hora calculada.
 */

const calculateNextAppointmentDate = (dayName: string, timeStr: string): Date => {
  const targetDay = dayMap[dayName];
  if (targetDay === undefined) throw new Error("Día inválido");

  const [hours, minutes] = timeStr.trim().split(':').map(Number);

  const now = new Date();
  const currentDay = now.getDay();

  const diff = targetDay - currentDay;

  // Creamos la fecha tentativa base (hoy + diferencia de días)
  const appointmentDate = new Date(now);
  appointmentDate.setDate(now.getDate() + diff);
  appointmentDate.setHours(hours, minutes, 0, 0);

  // Si la fecha calculada es anterior al momento actual (ej. hoy más temprano, o un día pasado),
  // significa que la cita debe ser para la próxima semana.

  if (appointmentDate <= now) {
    appointmentDate.setDate(appointmentDate.getDate() + 7);
  }

  console.log(`Cálculo de fecha: Hoy es ${now.toLocaleString()}. Destino: ${dayName} ${timeStr}. Diff días: ${diff}. Resultado final: ${appointmentDate.toLocaleString()}`);

  return appointmentDate;
}


/**
 * Valida si faltan al menos 24 horas para la fecha de la cita.
 * @param appointmentDate Fecha de la cita
 * @returns true si es válido (>= 24h), false si no.
 */
const isAtLeast24HoursAhead = (appointmentDate: Date): boolean => {
  const now = new Date();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  // validamos si la diferencia es mayor o igual a 24h
  const diffMs = appointmentDate.getTime() - now.getTime();
  const hoursAhead = diffMs / (1000 * 60 * 60);
  console.log(`Validación 24h: Diferencia es ${hoursAhead.toFixed(2)} horas.`);
  return diffMs >= oneDayInMs;
}


/**
 * Maneja la lógica al seleccionar un horario (slot) en la UI.
 * Realiza validaciones de disponibilidad, propiedad y regla de 24 horas.
 */
const getDateSelected = (dayName: string, timeSelected: string) => {
  console.log('Se ha seleccionado la fecha', dayName, timeSelected);

  if (userHasSlotsTaken.value) {
    toast.warning('No puede agendar horarios si ya tiene citas agendadas');
    return;
  }
  if (!isUserLoggedIn()) {
    return;
  }

  const selectedDaySlots = schedule.value[dayName];
  if (!selectedDaySlots) return;

  const foundSlot = selectedDaySlots.find((s: Slot) => s.time === timeSelected);

  if (!foundSlot) return;

  // IMPORTANTE: No asignamos slotSelected.value todavía hasta validar.

  // Lógica de deselección o selección
  if (foundSlot) {
    // 1. Validar disponibilidad básica
    if (foundSlot.isAvailable) {
      // Nota: según la logica del template, isAvailable parece significar "Deshabilitado por admin" (bg-slate-300).
      toast.warning(`El horario de las ${foundSlot.time} no está disponible`);
      return;
    }

    // 2. Validar si está tomado por otro
    if (foundSlot.takenBy != null && foundSlot.takenBy != authStore().getUserUid) {
      toast.warning(`El horario de las ${foundSlot.time} ya está tomado por otro usuario`);
      return;
    }

    // 3. Validar si ya está confirmado en BD por mí
    if (foundSlot.takenBy == authStore().getUserUid && foundSlot.takenAt != null) {
      toast.warning(`El horario de las ${foundSlot.time} ya está tomado por usted en la base de datos`);
      return;
    }

    // 4. Validar Regla de 24 Horas
    // Calculamos cuándo sería esta cita
    let nextDate: Date;
    try {
      nextDate = calculateNextAppointmentDate(dayName, foundSlot.time);
      if (!isAtLeast24HoursAhead(nextDate)) {
        toast.warning('No es posible agendar con menos de 24 horas de anticipación.');
        return; // Detenemos la selección
      }
    } catch (e) {
      console.error(e);
      toast.error('Error al calcular fecha de cita');
      return;
    }


    // Si todo ok, procedemos a marcar/desmarcar

    // Si ya había seleccionado otro slot temporalmente, lo desmarcamos
    const previousTaken = isAnSlotAlreadyTaken();
    if (previousTaken && previousTaken !== foundSlot) {
      previousTaken.takenBy = null;
    }

    // Toggle: si ya lo tengo yo (localmente), lo suelto. Si no, lo tomo.
    if (foundSlot.takenBy == authStore().getUserUid) {
      foundSlot.takenBy = null;
      slotSelected.value = null;
      calculatedAppointmentDate.value = null;
    } else {
      foundSlot.takenBy = authStore().getUserUid;
      slotSelected.value = foundSlot;

      // Formatear fecha para mostrar
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      try {
        const dateString = nextDate.toLocaleDateString('es-ES', options);
        calculatedAppointmentDate.value = dateString.charAt(0).toUpperCase() + dateString.slice(1);
      } catch (e) {
        console.error("Error formatting date", e);
        // Fallback if calculateNextAppointmentDate variable 'nextDate' is not in scope here (wait, it IS in scope of the try block, but I need to make sure I calculate it again or bring it out)
        // Ah, local variable nextDate is inside the try block above. I should recalculate or move the scope.
        const reCalcDate = calculateNextAppointmentDate(dayName, foundSlot.time);
        const dateString = reCalcDate.toLocaleDateString('es-ES', options);
        calculatedAppointmentDate.value = dateString.charAt(0).toUpperCase() + dateString.slice(1);
      }

      console.log('Slot seleccionado correctamente:', slotSelected.value);
    }

    // takenAt se mantiene como estaba (null para la selección local) o se asigna al guardar
  }
};

const db = getFirestore();
// const router = useRouter();
// const schedulesCollection = collection(db, 'schedules');


/**
 * Función principal para guardar los cambios y agendar la cita.
 */


const updateSubcollectionSchedule = async () => {
  if (!slotSelected.value) {
    toast.warning('No se ha seleccionado ningún horario');
    return;
  }

  if (expertData.value?.isSuspended || expertData.value?.isBanned) {
    toast.error('No puede agendar horarios con este experto, contacte al administrador.');
    return;
  }

  if (userHasSlotsTaken.value) {
    toast.error('No puede agendar horarios si ya tiene citas agendadas.');
    return;
  }

  // Encontrar el día al que pertenece el slot seleccionado
  const dayName = Object.keys(schedule.value).find(key =>
    schedule.value[key].includes(slotSelected.value as Slot)
  );

  if (!dayName) {
    toast.error('Error al identificar el día de la cita');
    return;
  }

  const appointmentDate = calculateNextAppointmentDate(dayName, slotSelected.value.time);

  // Re-validación final de 24h por seguridad
  if (!isAtLeast24HoursAhead(appointmentDate)) {
    toast.error('No es posible agendar con menos de 24 horas de anticipación.');
    // Reseteamos la selección local por seguridad
    slotSelected.value.takenBy = null;
    slotSelected.value = null;
    calculatedAppointmentDate.value = null;
    return;
  }

  loading.value = true;
  loadingMessage.value = 'Agendando cita...';
  savingChanges.value = true;

  // // COMENTADO PARA USAR TRANSACTION EN SU LUGAR
  // // Use a Firestore Batch to ensure atomic operations (All or Nothing)
  // // "Guardian" Strategy: Create a unique ticket doc to prevent double booking
  // const batch = writeBatch(db);

  // // 1. Define the Guardian Ticket Reference
  // // Key Concept: The ID is composed of expertUID + Day + Time.
  // // Example: "chemex_Lunes_10:00" -> Unique ID guarantees only one person can create it.
  const guardianId = `${expertData.value?.userUid}_${dayName}_${slotSelected.value.time}`;
  const guardianRef = doc(db, 'bookings', guardianId);

  // // 2. Add the Guardian Write to the Batch
  // // We set dummy data purely to reserve the slot.
  // // Security Rule: allow create: if !exists(doc) -> This prevents race conditions.
  // batch.set(guardianRef, {
  //     reserverUid: authStore().getUserUid,
  //     createdAt: Timestamp.now()
  // });

  // // 3. Update the Local Schedule (Version A - Array)
  // // We still update the array for UI compatibility (so the calendar looks red).
  // console.log('Guardando schedule...', schedule.value);
  // slotSelected.value.takenAt = Timestamp.now();
  const expertPath = doc(db, `experts/${expertData.value?.userUid}`);

  // batch.update(expertPath, {
  //     schedule: schedule.value
  // });

  // // 4. Create the Actual Appointment Document
  // // Using set() on a new doc ref to include it in the batch
  const newScheduleRef = doc(collection(db, 'schedules'));
  // batch.set(newScheduleRef, {
  //     userName: authStore().getUserName,
  //     userUid: authStore().getUserUid,
  //     expertUid: expertData.value?.userUid,
  //     expertName: expertData.value?.fullName,
  //     expertSchedule: slotSelected.value,
  //     expertSpecialty: expertData.value?.specialty,
  //     expertProfessionalId: expertData.value?.professionalId,
  //     appointmentLink: '',
  //     isFinished: false,
  //     dayName: dayName,
  //     appointmentDate: Timestamp.fromDate(appointmentDate),
  //     createdAt: Timestamp.now(),
  //     acceptedByExpert: false,
  // });

  try {
    // // 5. Commit the Batch
    // // This executes all 3 operations atomically.
    // // If the "Guardian" doc already exists (someone else booked 1ms ago),
    // // the ENTIRE batch fails, and nothing is written. Safety guaranteed.
    // await batch.commit();

    // INICIAMOS LA TRANSACCIÓN PARA EVITAR CONDICIONES DE CARRERA (RACE CONDITIONS)
    // LAS TRANSACCIONES LEEN PRIMERO Y LUEGO ESCRIBEN. SI ALGO CAMBIA DURANTE EL PROCESO, SE REINTENTA.
    await runTransaction(db, async (transaction) => {

      // 1. LEEMOS EL GUARDIÁN Y EL EXPERTO PARA ASEGURARNOS DE QUE TODO SIGA DISPONIBLE
      const guardianDoc = await transaction.get(guardianRef);
      const expertDoc = await transaction.get(expertPath);

      if (guardianDoc.exists()) {
        // SI EL GUARDIÁN YA EXISTE, SIGNIFICA QUE ALGUIEN MÁS GANÓ EL SLOT
        throw new Error("Lamentablemente este horario ya fue reservado.");
      }

      if (!expertDoc.exists()) {
        throw new Error("El experto no existe.");
      }

      // 2. ACTUALIZAMOS LA DATA DEL CALENDARIO EN EL DOCUMENTO DEL EXPERTO
      // OBTENEMOS EL SCHEDULE ACTUALIZADO DESDE EL DOCUMENTO RECIÉN LEÍDO
      const currentDocData = expertDoc.data();
      const currentSchedule = currentDocData?.schedule || {};

      // BUSCAMOS EL SLOT DENTRO DEL ARRAY CORRESPONDIENTE AL DÍA (dayName)
      const daySlots = currentSchedule[dayName] || [];
      const slotToUpdate = daySlots.find((s: any) => s.time === slotSelected.value!.time);

      if (!slotToUpdate || (slotToUpdate.takenBy && slotToUpdate.takenBy !== authStore().getUserUid)) {
        throw new Error("El horario ya no está disponible.");
      }

      // MARCAMOS EL SLOT COMO TOMADO
      slotToUpdate.takenBy = authStore().getUserUid;
      slotToUpdate.takenAt = Timestamp.now();

      // 3. REGISTRAMOS TODOS LOS CAMBIOS DE FORMA ATÓMICA DENTRO DE LA TRANSACCIÓN

      // RESERVAMOS EL GUARDIAN TICKET
      transaction.set(guardianRef, {
        reserverUid: authStore().getUserUid,
        createdAt: Timestamp.now()
      });

      // ACTUALIZAMOS EL DOCUMENTO DEL EXPERTO CON EL NUEVO SCHEDULE
      transaction.update(expertPath, {
        schedule: currentSchedule
      });

      // CREAMOS EL DOCUMENTO DE LA CITA (APPOINTMENT)
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

    // await sendTestEmail(dayName, appointmentDate);

    toast.success(`Cita agendada con éxito para el ${appointmentDate.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}.`);

    setTimeout(() => {
      savingChanges.value = true;
      router.push('/appointments');
      savingChanges.value = false;
    }, 1500);

  } catch (error: any) {
    console.error('Error al agendar cita (Transaction):', error);

    // MANEJAMOS ERRORES ESPECÍFICOS DE LA TRANSACCIÓN O DEL PROCESO
    if (error.message === 'Lamentablemente este horario ya fue reservado.' || error.code === 'already-exists') {
      toast.error('¡Lo sentimos! Este horario acaba de ser reservado por otra persona.');
    } else {
      toast.error(error.message || 'Error al agendar la cita. Intente nuevamente.');
    }
    savingChanges.value = false;
    loading.value = false;
    // REVERTIMOS EL CAMBIO LOCAL EN LA UI
    if (slotSelected.value) {
      slotSelected.value.takenBy = null;
    }
    return;
  }

  savingChanges.value = false;
  loading.value = false;

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

onMounted(async () => {

  if (! await getExpertData()) return;
  verifyUserHasSlotsTaken();

  // Inicializar EmailJS
  emailjs.init({
    blockHeadless: true,
    publicKey: '8uRc3wp2ZXACkO_Eb',
  })
})

onUnmounted(() => {
  expertData.value = null;
  expertDataLoaded.value = false;

  if (unsub) {
    unsub();
    unsub = null
  }
})

/*
const sendTestEmail = async (dayName: string, appointmentDate: Date) => {
  if (!slotSelected.value) return;

  try {
    emailjs.send('service_q9e8lj2', 'template_lv5dfds', {
      // Header
      headerTitle: 'ConsultaExperto.com',
      greeting: 'Buen día',
      userName: authStore().getUserName ?? 'Usuario',
      headerDescription: 'Detalles de su cita profesional',

      // Section 1 – Información del usuario
      section1Icon: '👤',
      section1Title: 'Información del usuario',
      section1TitleColor: '#007aff',
      section1Item1Label: 'Nombre:',
      section1Item1Value: authStore().getUserName ?? 'Usuario',
      section1Item2Label: 'Servicio:',
      section1Item2Value: expertData.value?.specialty,

      // Section 2 – Detalles de la cita
      section2Icon: '📅',
      section2Title: 'Detalles de la cita',
      section2TitleColor: '#34c759',
      section2Subtitle1: 'Fecha y hora',
      section2Value1: `${dayName} • ${slotSelected.value.time}hrs`,
      section2Subtitle2: 'Agendado por',
      section2Value2: authStore().getUserName ?? 'Usuario',
      section2HighlightLabel: 'Enlace:',
      section2HighlightText: 'El acceso se habilitará minutos antes de la cita',

      // Fecha formateada
      appointmentDateFormatted: appointmentDate.toLocaleDateString() + ' ' + appointmentDate.toLocaleTimeString(),

      // Section 3 – Datos del experto
      section3Icon: '🩺',
      section3Title: 'Datos del experto',
      section3TitleColor: '#8e8e93',
      section3Item1Label: 'Cédula',
      section3Item1Value: expertData.value?.professionalId,
      section3Item2Label: 'Fecha de creación de la cita',
      section3Item2Value: new Date().toLocaleDateString(),

      // Footer
      footerYear: new Date().getFullYear(),
      footerLinkUrl: 'https://consultaexperto.com',
      footerLinkText: 'consultaexperto.com',
      footerRightsText: 'Todos los derechos reservados.',

      // Email destino
      email: authStore().getUserEmail,
    });

  } catch (error) {
    console.error('Error enviando email:', error);
    // No bloqueamos el flujo principal si falla el email, solo logueamos
  }
}
*/

const expertDataLoaded = ref(false);

const expertData = ref(null as IExpert | null);


let unsub: (() => void) | null;


//const expertDocSnap = await getDoc(expertDocRef);

const getExpertData = async () => {
  const expertDocRef = doc(db, `experts/${useExpertUiStore().getExpertUid}`);
  console.log('Intentando obtener datos del experto', expertDocRef);

  if (!useExpertUiStore().getExpertUid) {
    console.log('No se encontro el uid del usuario')
    expertDataLoaded.value = true;
    return false;
  }

  unsub = onSnapshot(expertDocRef, (snaphot) => {

    if (!snaphot.exists) {
      toast.error('No se encontó al experto, vuelva a intentarlo');
      return expertDataLoaded.value = false;
    }

    expertData.value = null;
    expertData.value = snaphot.data() as IExpert;
    verifyUserHasSlotsTaken();
    expertDataLoaded.value = true;

  })

}


const validateFreeConsults = (expertSpecialty: string): boolean | undefined => {
  if (!expertSpecialty) {
    console.log('Expert Specialty was not found, could not load function');
    return false;
  }
  //Validations 

  //If categoryConsultations not exists in field
  if (!authStore().getUserData?.categoryConsultations) {
    console.log('Category Consultations was not found');
    return false;
  }
  //If includes hasFreeConsult is true
  else if (authStore().getUserData?.categoryConsultations[expertSpecialty]?.hasFreeConsult) {
    console.log('Category Consultations was found and expert specialty was found', expertSpecialty);
    return true;
  }
  //If exists and document has the current specialty in it 
  else if (authStore().getUserData?.categoryConsultations[expertSpecialty]) {
    console.log('Category Consultations was found and expert specialty was found', expertSpecialty);
    return false;
  }
  //If exists and it does not has the current specialty inside categoryConsultations
  else if (authStore().getUserData?.categoryConsultations && !authStore().getUserData?.categoryConsultations[expertSpecialty]) {
    console.log('Category Consultations was found but expert specialty was not found', expertSpecialty);
    return true;
  }




}


const hiringStore = useHiringStore();

const handleHiring = () => {
  if (!expertData.value) {
    console.log('Expert data was not found');
    return;
  }
  hiringStore.setExpertHiringData(expertData.value.fullName!, expertData.value.specialty!, expertData.value.userUid!);
  router.push('/hiring');
}

</script>

<style scoped>
/* Custom styles to match your design */
ion-card {
  --background: var(--ion-color-content-light);
  --color: var(--ion-color-text-primary-light);
  border-radius: 1rem;
}



ion-chip {
  --background: rgba(var(--ion-color-primary-rgb), 0.1);
  --color: var(--ion-color-primary);
  border-radius: 9999px;
}




ion-content {
  --background: #eeeeee;
}
</style>
