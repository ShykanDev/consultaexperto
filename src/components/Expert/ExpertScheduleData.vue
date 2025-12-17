<template>
  <section class="admin-appointment-card">
    <!-- Vista en tarjeta (resumen) -->
    <article
      v-if="view === 'card'"
      class="admin-card"
      @click="toggleView"
    >
      <div class="admin-card-header">
        <div class="admin-icon-container" :style="{ backgroundColor: getLightBackgroundColor(props.data.expertSpecialty) }">
          <v-icon
            :name="getIcon(props.data.expertSpecialty)"
            scale="1.4"
            :style="{ color: getStrongBackgroundColor(props.data.expertSpecialty) }"
          />
        </div>
        <div class="admin-card-info">
          <h3 class="admin-title">{{ props.data.expertSpecialty }} · {{ props.data.expertName }}</h3>
          <div class="admin-meta">
            <span class="admin-date">{{ formattedDate }}</span>
            <span class="admin-time">{{ formattedTime }} hrs</span>
          </div>
        </div>
        <div class="admin-status" :class="props.data.isFinished ? 'finished' : 'pending'">
          <span>{{ props.data.isFinished ? 'Finalizada' : 'En curso' }}</span>
        </div>
      </div>
      <ion-ripple-effect type="unbounded" class="admin-ripple"></ion-ripple-effect>
    </article>

    <!-- Vista detallada (modal) -->
    <div v-else class="admin-modal">
      <!-- Header con botón de regreso -->
      <div class="admin-modal-header">
        <button @click="toggleView" class="admin-back-button">
          <v-icon name="fa-chevron-left" class="text-blue-600" />
          <span>Cerrar</span>
        </button>
        <h2 class="admin-modal-title">Detalles de la Cita</h2>
      </div>

      <!-- Sección de información de la cita -->
      <div class="admin-section">
        <h4 class="admin-section-title">Datos de la Cita</h4>
        <div class="admin-grid">
          <div class="admin-grid-item">
            <v-icon name="fa-calendar-check" class="admin-grid-icon" />
            <p class="admin-grid-label">Fecha:</p>
            <p class="admin-grid-value">{{ formattedDate }}</p>
          </div>
          <div class="admin-grid-item">
            <v-icon name="fa-clock" class="admin-grid-icon" />
            <p class="admin-grid-label">Hora:</p>
            <p class="admin-grid-value">{{ formattedTime }} hrs</p>
          </div>
          <div class="admin-grid-item">
            <v-icon name="fa-user" class="admin-grid-icon" />
            <p class="admin-grid-label">Agendado por:</p>
            <p class="admin-grid-value">{{ props.data.userName }}</p>
          </div>
          <div class="admin-grid-item">
            <v-icon name="co-link" class="admin-grid-icon" />
            <p class="admin-grid-label">Enlace:</p>
            <a v-if="props.data.appointmentLink !== 'En proceso...'" :href="props.data.appointmentLink" class="admin-grid-link">{{ props.data.appointmentLink }}</a>
            <p v-else class="admin-grid-value pending">En proceso...</p>
          </div>
        </div>
      </div>

      <!-- Sección de información del experto -->
      <div class="admin-section">
        <h4 class="admin-section-title">Datos del Experto</h4>
        <div class="admin-grid">
          <div class="admin-grid-item">
            <v-icon name="fa-id-card" class="admin-grid-icon" />
            <p class="admin-grid-label">Cédula:</p>
            <p class="admin-grid-value">{{ props.data.expertProfessionalId }}</p>
          </div>
          <div class="admin-grid-item">
            <v-icon name="fa-check-circle" class="admin-grid-icon" :class="props.data.isFinished ? 'text-green-600' : 'text-yellow-600'" />
            <p class="admin-grid-label">Status:</p>
            <p class="admin-grid-value" :class="props.data.isFinished ? 'text-green-600' : 'text-yellow-600'">{{ props.data.isFinished ? 'Finalizada' : 'En curso' }}</p>
          </div>
        </div>
      </div>

      <!-- Footer con fecha de creación -->
      <div class="admin-modal-footer">
        <p class="admin-created-at">Creada el {{ props.data.createdAt.toDate().toLocaleString('es-ES', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) }}</p>
      </div>

      <!-- Botones de acción (opcional) -->
      <div class="admin-actions">
        <button class="admin-action-button edit">Editar</button>
        <button class="admin-action-button cancel">Cancelar</button>
        <button class="admin-action-button complete" v-if="!props.data.isFinished">Marcar como completada</button>
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

.admin-date, .admin-time {
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
  padding: 10px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.admin-action-button.edit {
  background: #dbeafe;
  color: #2563eb;
}

.admin-action-button.cancel {
  background: #fee2e2;
  color: #dc2626;
}

.admin-action-button.complete {
  background: #d1fae5;
  color: #065f46;
}

.admin-action-button:hover {
  opacity: 0.9;
}
</style>
