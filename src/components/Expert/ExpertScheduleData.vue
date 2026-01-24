<template>
  <section class="admin-appointment-card py-1">
    <!-- Vista en tarjeta (resumen) -->
    <article class="admin-card" v-if="view === 'card'" @click="toggleView">
      <div class="admin-card-header admin-icon-container"
        :style="{ backgroundColor: getLightBackgroundColor(props.data.expertSpecialty) }">

        <v-icon :name="getIcon(props.data.expertSpecialty)" scale="1.4"
          :style="{ color: getStrongBackgroundColor(props.data.expertSpecialty) }" />
      </div>
      <h3 class="admin-card-info admin-title">{{ props.data.expertSpecialty }} · {{ props.data.userName }}</h3>
      <div class="admin-meta">
        <span class="admin-date">{{ formattedDate }}</span>
        <span class="admin-time">{{ formattedTime }} hrs</span>
      </div>

      <div class="admin-status"
        :class="{ finished: props.data.isFinished, cancel: props.data.isCanceled, pending: !props.data.isFinished && !props.data.isCanceled }">
        <p class="" v-if="!props.data.isFinished && !props.data.isCanceled">Agendada</p>
        <p class="finished" v-if="props.data.isFinished">Finalizada</p>
        <p class="cancel" v-if="props.data.isCanceled">Cancelada</p>
      </div>


    </article>

    <!-- Vista detallada (modal) -->
    <div class="admin-modal" v-if="view === 'modal'"><!-- Header con botón de regreso -->
      <div class="admin-modal-header"><button class="admin-back-button" @click="toggleView">
          <v-icon class="text-blue-600" name="fa-chevron-left" />
          <span>Cerrar</span>
        </button>
        <h2 class="admin-modal-title">Detalles de la Cita</h2>
      </div>

      <!-- Sección de información de la cita -->
      <h4 class="admin-section admin-section-title">Datos de la Cita</h4>
      <div class="admin-grid">
        <div class="admin-grid-item">

          <v-icon class="admin-grid-icon" name="fa-calendar-check" />
          <p class="admin-grid-label">Fecha:</p>
          <p class="admin-grid-value">{{ formattedDate }}</p>
        </div>
        <div class="admin-grid-item">
          <v-icon class="admin-grid-icon" name="fa-clock" />
          <p class="admin-grid-label">Hora:</p>
          <p class="admin-grid-value">{{ formattedTime }} hrs</p>
        </div>
        <div class="admin-grid-item">
          <v-icon class="admin-grid-icon" name="fa-user" />
          <p class="admin-grid-label">Agendado por:</p>
          <p class="admin-grid-value">{{ props.data.userName }}</p>
        </div>
        <div class="admin-grid-item">
          <v-icon class="admin-grid-icon" name="co-link" />
          <p class="admin-grid-label">Enlace:</p>
          <a class="admin-grid-link break-all" v-if="props.data.appointmentLink !== 'En proceso...'" target="_blank"
            :href="props.data.appointmentLink">{{ props.data.appointmentLink }}</a>
          <p class="admin-grid-value pending">En proceso...</p>
        </div>


      </div>


      <!-- Sección de información del experto -->
      <h4 class="admin-section admin-section-title">Datos del Experto</h4>
      <div class="admin-grid">
        <div class="admin-grid-item">

          <v-icon class="admin-grid-icon" name="fa-id-card" />
          <p class="admin-grid-label">Cédula:</p>
          <p class="admin-grid-value">{{ props.data.expertProfessionalId }}</p>
        </div>


      </div>

      <article class="flex items-center gap-2 border-b border-b-gray-100 pb-2 mb-2"> <!--Time-->

        <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3"
          :class="props.data.isFinished ? 'bg-green-50' : (props.data.isCanceled ? 'bg-red-50' : 'bg-yellow-50')">
          <v-icon class="text-2xl"
            :class="props.data.isFinished ? 'text-green-600' : (props.data.isCanceled ? 'text-red-600' : 'text-yellow-600')"
            name="hi-solid-information-circle" />
        </div>

        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-600">Status de la cita:</p>
          <p class="font-medium text-gray-600"
            :class="props.data.isFinished ? 'text-green-600' : (props.data.isCanceled ? 'text-red-600' : 'text-yellow-600')">
            {{ props.data.isFinished ? 'Finalizada' : props.data.isCanceled ? 'Cancelada' : 'Reservada' }}</p>
        </div>

        <!--If isCanceled show-->

      </article>




      <article class="flex items-center gap-2 border-b border-b-gray-100 pb-2 mb-2" v-if="props.data.isCanceled">
        <!--Time-->

        <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3"
          :class="props.data.isFinished ? 'bg-green-50' : (props.data.isCanceled ? 'bg-red-50' : 'bg-yellow-50')">
          <v-icon class="text-2xl"
            :class="props.data.isFinished ? 'text-green-600' : (props.data.isCanceled ? 'text-red-600' : 'text-yellow-600')"
            name="md-freecancellation-twotone" />
        </div>

        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-600">Motivo de cancelación:</p>
          <p class="font-medium text-gray-600" v-if="props.data.canceledAt">
            {{ props.data.cancelationReason }}
          </p>

        </div>

        <!--If isCanceled show-->

      </article>
      <article class="flex items-center gap-2 border-b border-b-gray-100 pb-2 mb-2" v-if="props.data.isCanceled">
        <!--Time-->

        <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3"
          :class="props.data.isFinished ? 'bg-green-50' : (props.data.isCanceled ? 'bg-red-50' : 'bg-yellow-50')">
          <v-icon class="text-2xl"
            :class="props.data.isFinished ? 'text-green-600' : (props.data.isCanceled ? 'text-red-600' : 'text-yellow-600')"
            name="fa-user" />
        </div>

        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-600">Cancelado por:</p>
          <p class="font-medium text-gray-600" v-if="props.data.canceledAt">
            {{ props.data.canceledByName }}
          </p>

        </div>

        <!--If isCanceled show-->

      </article>

      <article class="flex items-center gap-2 border-b border-b-gray-100 pb-2 mb-2" v-if="props.data.isCanceled">
        <!--Time-->

        <div class="w-14 h-14 flex items-center justify-center rounded-2xl mr-3"
          :class="props.data.isFinished ? 'bg-green-50' : (props.data.isCanceled ? 'bg-red-50' : 'bg-yellow-50')">
          <v-icon class="text-2xl"
            :class="props.data.isFinished ? 'text-green-600' : (props.data.isCanceled ? 'text-red-600' : 'text-yellow-600')"
            name="fa-calendar-check" />
        </div>

        <div class="flex justify-between items-center w-full">
          <p class="font-medium text-gray-600">Fecha de cancelación:</p>
          <p class="font-medium text-gray-600" v-if="props.data.canceledAt">
            {{ new Date(props.data.canceledAt!.toDate()).toLocaleString('es-MX', {
              day: '2-digit', month: 'long', year:
                'numeric', hour: '2-digit', minute: '2-digit'
            }) }}
          </p>
        </div>

        <!--If isCanceled show-->

      </article>

      <!-- Footer con fecha de creación -->
      <div class="admin-modal-footer">
        <p class="admin-created-at">Creada el {{ props.data.createdAt.toDate().toLocaleString('es-ES', {
          day: '2-digit',
          month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        }) }}</p>
      </div>

      <!-- Botones de acción (opcional) -->
      <div class="admin-actions">
        <button class="admin-action-button edit !text-xs" v-if="!props.data.isCanceled"
          @click="markFunction('notFinish')">No finalizada</button>
        <button class="admin-action-button cancel !text-xs" v-if="!props.data.isCanceled"
          @click="presentCancelAlert">Cancelar Cita</button>
        <button class="admin-action-button complete !text-xs" v-if="!props.data.isFinished"
          @click="markFunction('finish')">Finalizar Cita</button>

      </div>
    </div>

  </section>
</template>
<script lang="ts" setup>
import { ISchedule } from '@/interfaces/user/ISchedule';

import { collection, doc, getDoc, getDocs, getFirestore, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import { computed, ref } from 'vue';
import { writeBatch } from 'firebase/firestore';
import { authStore } from '@/store/auth';

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

const db = getFirestore();
const emit = defineEmits(['reloadData']);


const markFunction = async (mode: 'finish' | 'cancel' | 'notFinish' | 'link', reason?: string) => {
  try {

    const docRef = doc(db, `schedules/${props.data.docId}`)
    const docSnapshot = await getDoc(docRef)

    if (!docSnapshot.exists()) {
      console.log('No se encontró el documento');
    }
    console.log(JSON.stringify(docSnapshot.data()));
    // Default state
    const updateData = {
      isFinished: false,
      isCanceled: false,
      finishedAt: null as Timestamp | null,
      canceledAt: null as Timestamp | null,
      cancelationReason: '' as string | null,
      canceledByName: '' as string | null,
      canceledByUid: '' as string | null,
      appointmentLink: '' as string,
    };

    if (mode === 'finish') {
      updateData.isFinished = true;
      updateData.finishedAt = Timestamp.now();
    }

    if (mode === 'cancel') {
      updateData.isCanceled = true;
      updateData.canceledAt = Timestamp.now();
      updateData.cancelationReason = reason || 'Cancelada por el administrador';
      updateData.canceledByName = authStore().getUserName;
      updateData.canceledByUid = authStore().getUserUid;
    }

    if (mode === 'link') {
      updateData.appointmentLink = reason!;
    }

    await updateDoc(docRef, updateData);

    emit('reloadData');
    console.log('Documentos actualizados correctamente');

  } catch (error) {
    console.error('Error al marcar la consulta:', error);
  }
};

const presentCancelAlert = async () => {
  const alert = await alertController.create({
    header: 'Cancelar Cita',
    message: 'Por favor, ingrese el motivo de la cancelación (obligatorio).',
    inputs: [
      {
        name: 'reason',
        type: 'textarea',
        placeholder: 'Escriba el motivo aquí...',
      },
    ],
    buttons: [
      {
        text: 'Volver',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Confirmar Cancelación',
        handler: (data) => {
          if (!data.reason || data.reason.trim() === '') {
            // Regresa false para mantener la alerta abierta si está vacío
            return false;
          }
          markFunction('cancel', data.reason);
          return true;
        },
      },
    ],
  });

  await alert.present();
};
const presentLinkAlert = async () => {
  const alert = await alertController.create({
    header: 'Agregar Link',
    message: 'Por favor, ingrese el link de la consulta (obligatorio).',
    inputs: [
      {
        name: 'link',
        type: 'textarea',
        placeholder: 'Escriba el link aquí...',
      },
    ],
    buttons: [
      {
        text: 'Volver',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Confirmar Link',
        handler: (data) => {
          if (!data.link || data.link.trim() === '') {
            // Regresa false para mantener la alerta abierta si está vacío
            return false;
          }
          markFunction('link', data.link);
          return true;
        },
      },
    ],
  });

  await alert.present();
};


</script>
<style scoped>
/* Estilos para la tarjeta de administrador */
.admin-appointment-card {
  font-family: 'Poppins', sans-serif;
  width: 100%;
}

.admin-card {
  background: white;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  border: 1px solid #e5e7eb;
}

.admin-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.admin-icon-container {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.admin-card-info {
  flex: 1;
  text-align: left;
}

.admin-title {
  font-weight: 600;
  font-size: 16px;
  color: #111827;
  margin-bottom: 4px;
}

.admin-meta {
  display: flex;
  gap: 8px;
}

.admin-date,
.admin-time {
  font-size: 14px;
  color: #6b7280;
}

.admin-status {
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.admin-status.finished {
  background: #d1fae5;
  color: #065f46;
}

.admin-status.pending {
  background: #fef3c7;
  color: #92400e;
}

.admin-status.cancel {
  background: #fec7c7;
  color: #920e0e;
}

/* Estilos para el modal */
.admin-modal {
  background: white;
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;

  margin: 0 auto;
}

.admin-modal-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.admin-back-button {
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #2563eb;
  cursor: pointer;
  font-weight: 500;
}

.admin-modal-title {
  flex: 1;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: #111827;
}

.admin-section {
  margin-bottom: 24px;
}

.admin-section-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 12px;
}

.admin-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.admin-grid-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #f9fafb;
  border-radius: 12px;
}

.admin-grid-icon {
  width: 20px;
  height: 20px;
  color: #2563eb;
}

.admin-grid-label {
  font-size: 14px;
  color: #6b7280;
  min-width: 120px;
}

.admin-grid-value {
  font-size: 14px;
  color: #111827;
  font-weight: 500;
}

.admin-grid-link {
  color: #2563eb;
  text-decoration: none;

}

.admin-grid-link:hover {
  text-decoration: underline;
}

.admin-modal-footer {
  margin-top: 20px;
  text-align: center;
}

.admin-created-at {
  font-size: 12px;
  color: #9ca3af;
}

.admin-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.admin-action-button {
  flex: 1;
  padding: 3px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-action-button.edit {
  background: #f4f9ff;
  color: #2563eb;
}

.admin-action-button.cancel {
  background: #fff1f1;
  color: #dc2626;
}

.admin-action-button.complete {
  background: #ebfff5;
  color: #065f46;
}

.admin-action-button.link {
  background: #c9ceff;
  color: #003045;
}

.admin-action-button:hover {
  opacity: 0.9;
}
</style>
