<template>
  <section class="">

    <article v-if="view === 'card'"
      class="w-full flex flex-col rounded-2xl shadow-sm bg-white p-4 ion-activatable ripple-parent rounded-rectangle"
      @click="toggleView" style="min-height: 120px;">
      <!-- Contenido del artículo -->
      <div class="flex flex-row items-center justify-between w-full">
        <!-- Contenedor del icono -->
        <div class="w-14 h-14 flex items-center justify-center rounded-full mr-3"
          :style="{ backgroundColor: getLightBackgroundColor(props.data.expertSpecialty) }">
          <v-icon :name="getIcon(props.data.expertSpecialty)" scale="1.4"
            :style="{ color: getStrongBackgroundColor(props.data.expertSpecialty) }" />
        </div>

        <!-- Contenedor del texto -->
        <div class="flex flex-col text-left flex-1 font-poppins">
          <span class="font-medium text-gray-950 text-base">
            {{ props.data.expertSpecialty }} {{ props.data.expertName }}
          </span>
          <span class="text-gray-600 font-quicksand text-sm font-medium">
            {{ formattedDate }}
          </span>
          <span class="text-gray-600 font-quicksand text-sm font-medium">
            {{ formattedTime }} hrs
          </span>

        </div>

        <!-- Botón "Ver cita" -->
        <div class="flex items-center ml-2">
          <v-icon name="fa-chevron-right" class="text-blue-600" scale="0.9" />
        </div>
      </div>

      <!-- Efecto de ripple -->
      <ion-ripple-effect type="unbounded" class="custom-ripple"></ion-ripple-effect>
    </article>



    <div v-else>
      <!-- Título de la cita -->
      <div class="p-6 w-full max-w-full mb-5 bg-white rounded-3xl border border-gray-200 shadow-sm">
        <span @click="toggleView" class="flex items-center gap-2 animate-fade-left">
          <v-icon name="fa-chevron-left" class="text-blue-600" />
          <button
            class="flex items-center gap-2 font-base text-blue-600 font-spline animate-fade-left animate-delay-75">Volver
          </button>
        </span>
        <div class="flex flex-col items-center gap-2">
          <div
            class="inline-flex mt-5 justify-center items-center mx-auto mb-3 w-16 h-16 bg-blue-100 rounded-full animate-fade">
            <v-icon name="fa-calendar-check" class="text-2xl text-blue-600" />
          </div>
          <h3 class="mb-1 text-lg font-semibold text-gray-800">{{ props.data.expertName }}</h3>
          <p class="font-medium text-gray-600">
            {{ props.data.expertSpecialty }}
          </p>
        </div>
      </div>

      <!-- Date info-->
      <span class="p-6 w-full max-w-full mb-5 text-lg font-semibold text-gray-600">Datos de la cita</span>
      <div
        class="p-6 w-full flex flex-col  space-y-5 mb-5 max-w-full bg-white rounded-3xl border border-gray-200 shadow-lg">

        <article class="flex items-center gap-2 pb-2 border-b border-b-gray-100"> <!--Icon-->

          <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3 bg-blue-100">
            <v-icon name="fa-calendar-check" class="text-2xl text-blue-600" />
          </div>

          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-600">Fecha:</p>
            <p class="font-medium text-center text-sm text-gray-600">{{ formattedDate }}</p>
          </div>


        </article>

        <article class="flex items-center gap-2 border-b border-b-gray-100 pb-2"> <!--Time-->

          <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3 bg-blue-100">
            <v-icon name="fa-clock" class="text-2xl text-blue-600" />
          </div>

          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-600">Hora</p>
            <p class="font-medium text-gray-600">{{ formattedTime }} hrs</p>
          </div>

        </article>

        <article class="flex items-center gap-2 border-b border-b-gray-100 pb-2"> <!--User who appointment-->

          <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3 bg-blue-100">
            <v-icon name="fa-user" class="text-2xl text-blue-600" />
          </div>

          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-600">Agendado por:</p>
            <p class="font-medium text-gray-600">{{ props.data.userName }}</p>
          </div>

        </article>


        <article class="flex items-center gap-2"> <!--Link-->

          <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3 bg-blue-100">
            <v-icon name="co-link" class="text-2xl text-blue-600" />
          </div>

          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-600">Enlace:</p>
            <p v-if="props.data.appointmentLink == 'En proceso...'" class="font-medium text-yellow-600">En proceso...
            </p>
            <a v-else :href="props.data.appointmentLink" class="font-medium text-gray-800">{{ props.data.appointmentLink
              }}</a>
          </div>

        </article>


      </div>


      <!-- Date metada-->
      <span class="p-6 w-full max-w-full mb-5 text-lg font-semibold text-gray-600">Datos del experto</span>
      <div class="p-6 w-full flex flex-col  space-y-5 max-w-full bg-white rounded-3xl border border-gray-200 shadow-lg">

        <article class="flex items-center gap-2 pb-2 border-b border-b-gray-100"> <!--Icon-->

          <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3 bg-blue-100">
            <v-icon name="fa-calendar-check" class="text-2xl text-blue-600" />
          </div>

          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-600">Cédula del experto:</p>
            <p class="font-medium text-center text-sm text-gray-600">{{ props.data.expertProfessionalId }}</p>
          </div>


        </article>

        <article class="flex items-center gap-2 border-b border-b-gray-100 pb-2"> <!--Time-->

          <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3"
            :class="props.data.isFinished ? 'bg-green-50' : props.data.isCanceled ? 'bg-red-50' : 'bg-yellow-50'">
            <v-icon name="hi-solid-information-circle" class="text-2xl"
              :class="props.data.isFinished ? 'text-green-600' : props.data.isCanceled ? 'text-red-600' : 'text-yellow-600'" />
          </div>

          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-600">Status de la cita:</p>
            <p class="font-medium text-gray-600" :class="props.data.isFinished ? 'text-green-600' : props.data.isCanceled ? 'text-red-600' : 'text-yellow-600'">
              {{ props.data.isFinished ? 'Finalizada' : props.data.isCanceled ? 'Cancelada' : 'Reservada' }}</p>
          </div>

          <!--If isCanceled show-->

        </article>




        <article v-if="props.data.isCanceled" class="flex items-center gap-2 border-b border-b-gray-100 pb-2"> <!--Time-->

          <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3"
            :class="props.data.isFinished ? 'bg-green-50' : props.data.isCanceled ? 'bg-red-50' : 'bg-yellow-50'">
            <v-icon name="md-freecancellation-twotone" class="text-2xl"
              :class="props.data.isFinished ? 'text-green-600' : props.data.isCanceled ? 'text-red-600' : 'text-yellow-600'" />
          </div>

          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-600">Motivo de cancelación:</p>
            <p v-if="props.data.canceledAt" class="font-medium text-gray-600">
              {{ props.data.cancelationReason }}
            </p>
            
          </div>

          <!--If isCanceled show-->

        </article>
        <article v-if="props.data.isCanceled " class="flex items-center gap-2 border-b border-b-gray-100 pb-2"> <!--Time-->

          <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3"
            :class="props.data.isFinished ? 'bg-green-50' : props.data.isCanceled ? 'bg-red-50' : 'bg-yellow-50'">
            <v-icon name="fa-user" class="text-2xl"
              :class="props.data.isFinished ? 'text-green-600' : props.data.isCanceled ? 'text-red-600' : 'text-yellow-600'" />
          </div>

          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-600">Cancelado por:</p>
            <p v-if="props.data.canceledAt" class="font-medium text-gray-600">
              {{ props.data.canceledByName}}
            </p>

          </div>

          <!--If isCanceled show-->

        </article>

        <article v-if="props.data.isCanceled" class="flex items-center gap-2 border-b border-b-gray-100 pb-2"> <!--Time-->

          <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3"
            :class="props.data.isFinished ? 'bg-green-50' : props.data.isCanceled ? 'bg-red-50' : 'bg-yellow-50'">
            <v-icon name="fa-calendar-check" class="text-2xl"
              :class="props.data.isFinished ? 'text-green-600' : props.data.isCanceled ? 'text-red-600' : 'text-yellow-600'" />
          </div>

          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-600">Fecha de cancelación:</p>
            <p v-if="props.data.canceledAt" class="font-medium text-gray-600">
              {{ new Date(props.data.canceledAt!.toDate()).toLocaleString('es-ES', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}
            </p>
          </div>

          <!--If isCanceled show-->

        </article>

      </div>

   

      <div v-if="!props.data.isFinished && !props.data.isCanceled" class="w-full flex justify-center mt-2 items-center">
        <ion-button mode="ios" color="danger" style="text-transform: none;" @click="presentAlert">Cancelar Cita</ion-button>


        <ion-button mode="ios" color="primary" style="text-transform: none;" @click="finaliceAppointment">Marcar como finalizada</ion-button>
      </div>
      <div class="w-full flex justify-center mt-2 items-center">
        <span class="text-center font-poppins text-sm  text-gray-500">Creada el {{
          props.data.createdAt.toDate().toLocaleString('es-ES', {
            day: '2-digit', month: 'long', year: 'numeric', hour:
              '2-digit', minute: '2-digit' }) }}</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { IExpert } from '@/interfaces/IExpert';
import { ISchedule } from '@/interfaces/user/ISchedule';
import { authStore } from '@/store/auth';
import { alertController, IonRippleEffect } from '@ionic/vue';
import { IonButton } from '@ionic/vue';
import { collection, doc, getDoc, getFirestore, Timestamp, updateDoc, writeBatch } from 'firebase/firestore';
import { computed, ref, Slot } from 'vue';
const experts = ref([
  {
    specialty: "Importación y Exportación",
    color: { light: "#E6F3FF", strong: "#0066CC" }, // Azul comercial
    icon: "fa-truck-moving",
    description: "Facilitamos el intercambio de bienes y servicios a nivel internacional con normativas seguras.",
  },
  {
    specialty: "Médico",
    color: { light: "#E6F7FF", strong: "#0099CC" }, // Azul médico
    icon: "gi-stethoscope",
    description: "Profesionales de la salud comprometidos en atender tus necesidades médicas de forma personalizada.",
  },
  {
    specialty: "Contador",
    color: { light: "#E6FFE6", strong: "#008000" }, // Verde financiero
    icon: "bi-calculator-fill",
    description: "Expertos en contabilidad para gestionar tus finanzas de forma precisa y confiable.",
  },
  {
    specialty: "Arquitecto",
    color: { light: "#F0E6FF", strong: "#6600CC" }, // Morado arquitectónico
    icon: "md-architecture-sharp",
    description: "Diseño y planificación de espacios con profesionalismo y creatividad.",
  },
  {
    specialty: "Servicios Web",
    color: { light: "#E6F9FF", strong: "#00BFFF" }, // Azul tecnológico
    icon: "md-web",
    description: "Desarrollo de soluciones digitales a medida para potenciar tu presencia online.",
  },
  {
    specialty: "Publicidad",
    color: { light: "#FFF0E6", strong: "#FF6600" }, // Naranja publicitario
    icon: "ri-newspaper-fill",
    description: "Estrategias creativas para difundir y potenciar la imagen de tu marca.",
  },
  {
    specialty: "Traductores",
    color: { light: "#FFF8E6", strong: "#FFD700" }, // Amarillo lingüístico
    icon: "hi-solid-translate",
    description: "Especialistas en comunicación multilingüe para romper barreras idiomáticas.",
  },
  {
    specialty: "Peritaje",
    color: { light: "#F0E6FF", strong: "#800080" }, // Morado técnico
    icon: "gi-sherlock-holmes",
    description: "Evaluaciones técnicas y profesionales con rigor y precisión.",
  },
  {
    specialty: "Ingeniería en Computación",
    color: { light: "#E6FFFA", strong: "#00CED1" }, // Turquesa tecnológico
    icon: "md-computer-twotone",
    description: "Innovación tecnológica y desarrollo de sistemas a la vanguardia.",
  },
  {
    specialty: "Gestoría en Trámites",
    color: { light: "#E6E6FF", strong: "#4B0082" }, // Índigo administrativo
    icon: "ri-newspaper-fill",
    description: "Optimiza tus gestiones administrativas con asesorías especializadas.",
  },
  {
    specialty: "Marketing",
    color: { light: "#FFE6F0", strong: "#FF1493" }, // Rosa marketing
    icon: "ri-marketing-strategy-fill",
    description: "Conecta con tu audiencia a través de estrategias innovadoras y efectivas.",
  },
  {
    specialty: "Abogado",
    color: { light: "#F5E6D3", strong: "#8B4513" }, // Café legal
    icon: "fa-balance-scale",
    description: "Conecta con un abogado especializado para recibir asesoría legal directa y resolver tus asuntos jurídicos.",
  },
  {
    specialty: "Psicólogo/a",
    color: { light: "#E6E6FF", strong: "#6A5ACD" }, // Lila psicológico
    icon: "ri-psychotherapy-fill",
    description: "Asesoría psicológica para resolver tus dudas y resolver tus problemas.",
  },
  {
    specialty: "Maestro",
    color: { light: "#F0FFF0", strong: "#2E8B57" }, // Verde educativo
    icon: "gi-teacher",
    description: "Asesoría educativa para resolver tus dudas y resolver tus problemas.",
  },
  {
    specialty: "Chef",
    color: { light: "#FFE6E6", strong: "#FF4500" }, // Rojo culinario
    icon: "gi-chef-toque",
  }
]);

const emit = defineEmits(['reload']);

const getLightBackgroundColor = (specialty: string): string => {
  const expert = experts.value.find((expert) => expert.specialty.toLowerCase().trim() === specialty.toLowerCase().trim());
  return expert ? expert.color.light : "#E6E6E6";
};

const getStrongBackgroundColor = (specialty: string): string => {
  const expert = experts.value.find((expert) => expert.specialty.toLowerCase().trim() === specialty.toLowerCase().trim());
  return expert ? expert.color.strong : "#E6E6E6";
};

const getIcon = (specialty: string): string => {
  const expert = experts.value.find((expert) => expert.specialty.toLowerCase().trim() === specialty.toLowerCase().trim());
  return expert ? expert.icon : "";
};

/**Vue Props */
const props = defineProps({
  data: {
    type: Object as () => ISchedule,
    required: true,
  }
})

const getDayIndex = (dayName: string): number => {
  const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const normalizedDay = dayName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return days.findIndex(d => normalizedDay.includes(d));
}

const calculatedAppointmentDate = computed(() => {
  if ((props.data as any).appointmentDate) {
    return new Date((props.data as any).appointmentDate.seconds * 1000);
  }

  if (!props.data?.createdAt) return null;

  const createdAtDate = new Date(props.data.createdAt.seconds * 1000);
  // Reset time to start of day for accurate day calculation
  const currentDayIndex = createdAtDate.getDay();

  // Handle DayName property (supporting both DayName and dayName just in case)
  const targetDayName = props.data.DayName || (props.data as any).dayName || '';
  const targetDayIndex = getDayIndex(targetDayName);

  if (targetDayIndex === -1) return createdAtDate;

  let daysUntil = targetDayIndex - currentDayIndex;

  // If the day is today or in the past, add 7 days to get the next occurrence
  // Unless it's today and the time hasn't passed? 
  // For simplicity and typical booking flows:
  // If I book for "Monday" on a "Tuesday", it's next Monday (daysUntil = 1 - 2 = -1 => +7 = 6 days)
  // If I book for "Monday" on a "Monday", usually it's next week unless specifically today.
  // Assuming strict forward booking:
  if (daysUntil < 0) {
    daysUntil += 7;
  }

  const futureDate = new Date(createdAtDate);
  futureDate.setDate(createdAtDate.getDate() + daysUntil);

  return futureDate;
});

const formattedDate = computed(() => {
  if (!calculatedAppointmentDate.value) return 'Fecha no disponible';
  return calculatedAppointmentDate.value.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const formattedTime = computed(() => {
  return props.data.expertSchedule.time;
})

const formattedDay = computed(() => {
  return calculatedAppointmentDate.value?.toLocaleDateString('es-MX', { weekday: 'long' }) || props.data.DayName;
})

const view = ref<'card' | 'modal'>('card');

const toggleView = () => {
  view.value = view.value === 'card' ? 'modal' : 'card';
}

/***Firebase Values****/ 

const db = getFirestore();
const userCollection = collection(db, `users/${props.data.userUid}/schedule`);
const expertCollection = collection(db, `experts/${props.data.expertUid}/schedule`);

/***Alert Values****/ 

interface ISlot {
  isAvailable:boolean;
  takenAt: null|Timestamp;
  takenBy:string|null;
  time:string;
}

interface IUserSchedule {
   Lunes?: ISlot[];
    Martes?: ISlot[];
    Miercoles?: ISlot[];
    Jueves?: ISlot[];
    Viernes?: ISlot[];
    Sabado?: ISlot[];
    Domingo?: ISlot[];
}

const normalizeText = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();


const cancelAppointment = async () => {

  try {

   //Step 1: Update the expert schedule and clear the user data

    //Expert Firebase Data
    const expertDocRef = doc(db, `experts/${props.data.expertUid}`);
    const snap = await getDoc(expertDocRef);

    //Return if slot doesnt exist
    if(!snap.exists()){
      console.log('Could not find the expert document');
      return false;
    }

    //Expert Schedule Slot Data
      const expertData = snap.data().schedule as IUserSchedule;      
      console.log(`Expert Data: ${JSON.stringify(expertData)}`);
    //Matching day from props and fetched data (E.g: Lunes)
      console.log(`Formatted Day: ${normalizeText(formattedDay.value)}`);
     
      const matchDay = Object.keys(expertData).find(d => normalizeText(d) == normalizeText(formattedDay.value));
      console.log(`Match Day: ${matchDay}`);
    //Matching expert slot finding it using maching Day 
      const expertScheduleSlot = expertData[matchDay as keyof IUserSchedule]
      console.log(`Expert Schedule Slot: ${expertScheduleSlot}`);
      const slotMatch = expertScheduleSlot?.find(e => e.takenBy == props.data.userUid); //returns the specifyc slot with matching data
      console.log(`Slot Match: ${slotMatch}`);

      //Return if slot can´t be found 
      if(!slotMatch){
        console.log(`Could not find the expert slot for this appointment`);
        return false;
      }

      //Updating the slot values to null (canceling the appointment)
      slotMatch.takenBy = null;
      slotMatch.takenAt = null
      //Ready to batch expert data firebase (BatchA1)

      //Step 2: Update the user historyAppointment to set the current appointment data as canceled

      //Return if document doesnt has a docRef
      if(!props.data.docRef){
        console.log(`Couldn't find docRef for this document `);
        return false;
      }

    //Ready to batch user data (BatchA2)

    //Batching userand expert data

    const batch = writeBatch(db);

    //Batch Update Expert Global Schedule 
    batch.update(expertDocRef, {
      schedule: expertData
    })
    
    console.log(`Document doc Ref: ${props.data.docRef}`);


    //Batching A2
    batch.update(doc(db, `schedules/${props.data.docId}`), {
      isCanceled: true,
      cancelationReason: cancelationReason.value,
      canceledAt: Timestamp.now(),
      canceledByUid: authStore().getUserUid || '',
      canceledByName: authStore().getUserName || ''
    })

    await batch.commit();

    console.log('Appointment canceled successfully');
    emit('reload');
    return true;


  } catch (error) {
    console.error('Error in batch function:', error);
    emit('reload');
    return false;
  }
};

const finaliceAppointment = async () => {


  try {
     const batch = writeBatch(db);
    //Step 1: Update the expert schedule and clear the user data

    //Expert Firebase Data
    const expertDocRef = doc(db, `experts/${props.data.expertUid}`);
    const snap = await getDoc(expertDocRef);

    //Return if slot doesnt exist
    if(!snap.exists()){
      console.log('Could not find the expert document');
      return false;
    }

    //Expert Schedule Slot Data
      const expertData = snap.data().schedule as IUserSchedule;      
      console.log(`Expert Data: ${JSON.stringify(expertData)}`);
    //Matching day from props and fetched data (E.g: Lunes)
      console.log(`Formatted Day: ${normalizeText(formattedDay.value)}`);
     
      const matchDay = Object.keys(expertData).find(d => normalizeText(d) == normalizeText(formattedDay.value));
      console.log(`Match Day: ${matchDay}`);
    //Matching expert slot finding it using maching Day 
      const expertScheduleSlot = expertData[matchDay as keyof IUserSchedule]
      console.log(`Expert Schedule Slot: ${expertScheduleSlot}`);
      const slotMatch = expertScheduleSlot?.find(e => e.takenBy == props.data.userUid); //returns the specifyc slot with matching data
      console.log(`Slot Match: ${slotMatch}`);

      //Return if slot can´t be found 
      if(!slotMatch){
        console.log(`Could not find the expert slot for this appointment`);
        return false;
      }

      //Updating the slot values to null (canceling the appointment)
      slotMatch.takenBy = null;
      slotMatch.takenAt = null
      //Ready to batch expert data firebase (BatchA1)

      batch.update(expertDocRef, { schedule: expertData });

      batch.update(doc(db, `schedules/${props.data.docId}`), {
      isFinished: true,
      finishedAt: Timestamp.now(),
      finishedByUid: authStore().getUserUid || '',
      finishedByName: authStore().getUserName || ''
    })
    
    await batch.commit();
    emit('reload');
  } catch (error) {
    console.error('Error finalizando la cita:', error);
    emit('reload');
  }
}

const cancelationReason = ref('');




const presentAlert = async () => {
  const alert = await alertController.create({
    header: 'Cancelar Cita',
    message: 'Escriba el motivo de la cancelación',
    inputs: [
      {
        name: 'reason',
        type: 'text',
        placeholder: 'Motivo',
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Ok',
        handler: async (data) => {
          if (!data.reason?.trim()) return false; // no cerrar
          cancelationReason.value = data.reason.trim();
          await cancelAppointment();
        },
      },
    ],
  });

  await alert.present();
};


</script>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;

  align-items: center;
  justify-content: space-between;
  text-align: center;

  height: 300px;
  width: 300px;

  margin: 0 auto;
}

b {
  width: 100%;
}

.ripple-parent {
  position: relative;
  overflow: hidden;


}

.rectangle {
  width: 300px;
  height: 150px;
}

.rounded-rectangle {
  width: full;
  height: auto;
  border-radius: 20px;
}

.circle {
  width: 90px;
  height: 90px;
  border-radius: 50%;
}

.custom-ripple {
  color: rgb(0, 124, 220);
}

</style>  