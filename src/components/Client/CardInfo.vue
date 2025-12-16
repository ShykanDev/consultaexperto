<template>
  <section class="">

<article
  v-if="view === 'card'"
  class="w-full flex flex-col rounded-2xl shadow-sm bg-white p-4 ion-activatable ripple-parent rounded-rectangle"
  @click="toggleView" 
  style="min-height: 120px;"
>
  <!-- Contenido del artículo -->
  <div class="flex flex-row items-center justify-between w-full">
    <!-- Contenedor del icono -->
    <div
      class="w-14 h-14 flex items-center justify-center rounded-full mr-3"
      :style="{ backgroundColor: getLightBackgroundColor(props.data.expertSpecialty) }"
    >
      <v-icon
        :name="getIcon(props.data.expertSpecialty)"
        scale="1.4"
        :style="{ color: getStrongBackgroundColor(props.data.expertSpecialty) }"
      />
    </div>

    <!-- Contenedor del texto -->
    <div class="flex flex-col text-left flex-1 font-poppins">
      <span class="font-medium text-gray-950 text-base">
        {{ props.data.expertSpecialty }}  {{ props.data.expertName }}
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



    <div v-else >
      <!-- Título de la cita -->
      <div class="p-6 w-full max-w-full mb-5 bg-white rounded-3xl border border-gray-200 shadow-sm">
        <span @click="toggleView" class="flex items-center gap-2 animate-fade-left">
          <v-icon name="fa-chevron-left" class="text-blue-600" />
          <button  class="flex items-center gap-2 font-base text-blue-600 font-spline animate-fade-left animate-delay-75">Volver
          </button>
        </span>
        <div class="flex flex-col items-center gap-2">
          <div class="inline-flex mt-5 justify-center items-center mx-auto mb-3 w-16 h-16 bg-blue-100 rounded-full animate-fade">
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
      <div class="p-6 w-full flex flex-col  space-y-5 mb-5 max-w-full bg-white rounded-3xl border border-gray-200 shadow-lg">

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
        

        <article class="flex items-center gap-2"> <!--Link-->

          <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3 bg-blue-100">
            <v-icon name="co-link" class="text-2xl text-blue-600" />
          </div>

          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-600">Enlace:</p>
            <p v-if="props.data.appointmentLink == 'En proceso...'" class="font-medium text-yellow-600">En proceso...</p>
            <a v-else :href="props.data.appointmentLink" class="font-medium text-gray-800">{{ props.data.appointmentLink }}</a>
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

          <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3" :class="props.data.isFinished ? 'bg-green-50' : 'bg-yellow-50'">
            <v-icon name="fa-clock" class="text-2xl" :class="props.data.isFinished ? 'text-green-600' : 'text-yellow-600'" />
          </div>

          <div class="flex justify-between items-center w-full">
            <p class="font-medium text-gray-600">Status de la cita:</p>
            <p class="font-medium text-gray-600" :class="props.data.isFinished ? 'text-green-600' : 'text-yellow-600'">{{ props.data.isFinished ? 'Finalizada' : 'En curso' }}</p>
          </div>

        </article>
      


      </div>
      <div class="w-full flex justify-center mt-2 items-center">
        <span class="text-center font-poppins text-sm  text-gray-500">Creada el {{ props.data.createdAt.toDate().toLocaleString('es-ES', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</span>
      </div>
    </div>
  </section>
  </template>
  
  <script lang="ts" setup>
import { ISchedule } from '@/interfaces/user/ISchedule';
import { IonRippleEffect } from '@ionic/vue';
import { computed, ref } from 'vue';
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

const props = defineProps({
  data:{
    type:Object as () => ISchedule,
    required:true,
  } 
})

const getDayIndex = (dayName: string): number => {
  const days = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
  const normalizedDay = dayName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return days.findIndex(d => normalizedDay.includes(d));
}

const calculatedAppointmentDate = computed(() => {
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
  if (daysUntil <= 0) {
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