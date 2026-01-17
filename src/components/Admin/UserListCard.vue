<template>
  <ion-card class="ios-card group relative overflow-hidden transition-all duration-300">
    <div class="absolute top-0 right-0 p-2 z-10" v-if="!isEditing">
      <ion-button fill="clear" size="small" @click="startEdit" class="text-blue-500 hover:text-blue-600 transition-colors">
        <ion-icon :icon="createOutline" slot="icon-only"></ion-icon>
      </ion-button>
    </div>

    <!-- VIEW MODE -->
    <div v-if="!isEditing" class="card-content-view p-4">
      <ion-card-header class="pb-2 pl-0 pt-0">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-md bg-gradient-to-tr from-slate-100 to-slate-200 flex items-center justify-center text-white">
             <ion-icon :icon="personOutline" class="text-2xl text-blue-500"></ion-icon>
          </div>
          <div class="flex flex-col">
            <ion-card-title class="text-lg font-bold text-gray-900">{{ user.name || 'Usuario' }}</ion-card-title>
            <ion-card-subtitle class="text-xs text-gray-500 font-medium lowercase">{{ user.email }}</ion-card-subtitle>
          </div>
        </div>
      </ion-card-header>

      <ion-card-content class="p-0 mt-4 space-y-3">
        <!-- Phone -->
        <div class="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
          <div class="p-2 bg-white rounded-lg shadow-sm text-green-500">
            <ion-icon :icon="callOutline"></ion-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Teléfono</span>
            <span class="text-sm font-semibold text-gray-700">{{ userEdit.phone || 'Sin número' }}</span>
          </div>
        </div>

        <!-- Email-->
        <div class="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
          <div class="p-2 bg-white rounded-lg shadow-sm text-blue-500">
            <ion-icon :icon="mailOpenOutline"></ion-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Email</span>
            <span class="text-sm font-semibold text-gray-700">{{ userEdit.email || 'no definido' }}</span>
          </div>
        </div>

        <!-- Ban -->
        <div class="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
          <div class="p-2 bg-white rounded-lg shadow-sm text-blue-500">
            <ion-icon :icon="banOutline"></ion-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Suspendido</span>
            <span class="text-sm font-semibold text-gray-700">{{ userEdit.isBanned ? 'Sí' : 'No' }}</span>
          </div>
        </div>

        <!-- Ban Reason -->
        <div class="flex items-center gap-3 p-3 bg-gray-50/50 rounded-xl border border-gray-100">
          <div class="p-2 bg-white rounded-lg shadow-sm text-blue-500">
            <ion-icon :icon="banOutline"></ion-icon>
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Motivo de suspension</span>
            <span class="text-sm font-semibold text-gray-700">{{ userEdit.banReason || 'Sin motivo' }}</span>
          </div>
        </div>

        <!-- Status & Free Consultations -->
        <div class="grid grid-cols-2 gap-3">
          <div class="p-3 bg-gray-50/50 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center gap-1">
             <span class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Estado</span>
             <div 
               class="px-3 py-1 rounded-full text-xs font-bold shadow-sm"
               :class="userEdit.isBanned ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'"
             >
                {{ userEdit.isBanned ? 'Suspendido' : 'Habilitado' }}
             </div>
          </div>

          <div class="p-3 bg-gray-50/50 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center gap-1">
             <span class="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Categorías gratuitas del usuario que ha tomado:</span>
          <span v-if="user.categoryConsultations" @click="getCategoriesTaken" class="text-blue-500 cursor-pointer bg-slate-100 p-2 rounded-md">Ver categorías</span>
          <p v-for="category in categoriesTaken" :key="category">{{ category }}</p>
          </div>
        </div>
        
        <!-- Extra Info (Collapsible or just small) -->
         <div class="pt-2 border-t border-gray-100 flex justify-between items-center text-gray-400 text-xs">
            <span>ID: {{ user.userId }}</span>
            <span>{{ user.userAge ? `${getAge(user.userAge)} años` : '' }}</span>
         </div>

        <!-- Extra Info (Collapsible or just small) -->
         <div class="pt-2 border-t border-gray-100 flex justify-between items-center text-gray-400 text-xs">
            <span>ID: {{ user.userId }}</span>
            <span>{{ user.userAge ? `${getAge(user.userAge)} años` : '' }}</span>
         </div>

      </ion-card-content>
    </div>

    <!-- EDIT MODE -->
    <div v-else class="card-content-edit p-5 bg-slate-50 relative">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-base font-bold text-gray-800">Editar Usuario</h3>
        <ion-button size="small" fill="clear" color="medium" @click="cancelEdit">
          <ion-icon :icon="closeOutline" slot="icon-only"></ion-icon>
        </ion-button>
      </div>

      <div class="space-y-4">
        <!-- Edit Phone -->
        <div class="space-y-1">
          <label class="text-xs font-semibold text-gray-500 ml-1">Teléfono</label>
          <div class="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm focus-within:ring-2 ring-blue-100 ring-offset-1 transition-all">
            <ion-input
              v-model="editForm.phone"
              type="tel"
              placeholder="+52 ..."
              class="custom-input px-3"
            ></ion-input>
          </div>
        </div>

        <!-- Edit Status -->
        <div class="space-y-1">
           <label class="text-xs font-semibold text-gray-500 ml-1">Estado de la cuenta</label>
           <div class="p-1 bg-gray-200 rounded-lg flex relative flex-col">
              <button 
                @click="setBanned(false)"
                class="flex-1 py-2 text-xs font-bold rounded-md transition-all duration-200 z-10"
                :class="!editForm.isBanned ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
              >
                Habilitado
              </button>
              <button 
                @click="setBanned(true)"
                class="flex-1 py-1 text-xs font-bold rounded-md transition-all duration-200 z-10"
                :class="editForm.isBanned ? 'bg-white text-red-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'"
              >
                Suspendido
              </button>
              <div v-if="editForm.isBanned" class="flex items-center gap-2 bg-white ion-margin-vertical rounded-md p-2">
                <ion-icon :icon="banOutline"></ion-icon>
                <ion-input v-model="editForm.banReason" placeholder="Motivo de suspension"></ion-input>
              </div>
           </div>
           <p v-if="editForm.isBanned" class="text-[10px] text-red-500 pl-1 mt-1 flex items-center gap-1">
             <ion-icon :icon="alertCircleOutline"></ion-icon>
             El suspension desactivará las consultas y que el usuario pueda acceder a la app.
           </p>
        </div>

        <!-- Toggle Free Consultations (Disabled if Banned) -->
         <div class="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-200 shadow-sm" :class="{'opacity-50 pointer-events-none': editForm.isBanned}">
            <div class="flex flex-col">
              <span class="text-xs font-bold text-gray-700">Consultas Gratis</span>
              <span class="text-[10px] text-gray-400">Permitir preguntas sin costo</span>
            </div>
            <ion-toggle 
              v-model="editForm.freeConsultations" 
              :disabled="editForm.isBanned"
              mode="ios"
            ></ion-toggle>
         </div>
      </div>

      <div class="mt-6 flex gap-2">
        <button @click="saveEdit" class="flex-1 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold py-3 rounded-xl text-sm shadow-blue-200 shadow-lg transition-all">
          Guardar Cambios
        </button>
      </div>
    </div>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonInput,
  IonToggle
} from '@ionic/vue';
import { 
  personOutline, 
  createOutline, 
  callOutline, 
  checkmarkCircle, 
  closeCircle, 
  closeOutline,
  alertCircleOutline,
  mailOpenOutline,
  banOutline
} from 'ionicons/icons';
import { reactive, ref, watch } from 'vue';
import { IUser } from '@/interfaces/user/IUser';
import { doc, getFirestore, Timestamp,  updateDoc } from 'firebase/firestore';
import { OiBeaker } from 'oh-vue-icons/icons';

const props = defineProps({
    user: {
        type: Object as () => IUser,
        required: true
    }
});

// State
const isEditing = ref(false);
const userEdit = reactive({...props.user}); // Displayed data (local mirror)
const editForm = reactive({...props.user}); // Form data

// Watch for prop changes to update local views
watch(() => props.user, (newVal) => {
  Object.assign(userEdit, newVal);
  if (!isEditing.value) Object.assign(editForm, newVal);
});

// Logic: If Banned -> Free Consultations = false
watch(() => editForm.isBanned, (isBanned) => {
  if (isBanned) {
    editForm.freeConsultations = false;
  }
});

const emit = defineEmits(['userUpdated']);

function startEdit() {
  Object.assign(editForm, userEdit); // Reset form to current View state
  isEditing.value = true;
}

function cancelEdit() {
  isEditing.value = false;
}

function setBanned(status: boolean) {
  editForm.isBanned = status;
  (status) ? editForm.banReason = '' : editForm.banReason = '';
}


const db = getFirestore();
const userPath = doc(db, 'users', props.user.userId);
const saveUser = () => {
  updateDoc(userPath, editForm).then(() => {
    console.log('Usuario actualizado correctamente');
    isEditing.value = false;
    emit('userUpdated');
  }).catch((error) => {
    emit('userUpdated');
    console.error('Error al actualizar usuario:', error);
  });
}

function saveEdit() {
  // Commit changes to local view (mock update)
  Object.assign(userEdit, editForm);
  
  console.log('--- ACTUALIZANDO USUARIO ---');
  console.log('ID:', userEdit.userId);
  console.log('Nuevo Teléfono:', userEdit.phone);
  console.log('Estado:', userEdit.isBanned ? 'Suspendido' : 'HABILITADO');
  console.log('Consultas Gratis:', userEdit.freeConsultations);
  console.log('----------------------------');
  saveUser();  
}


function getAge(dateString: Timestamp| undefined) {
  if (!dateString) return null;
  const today = new Date();
  const birthDate = new Date(dateString.toDate());
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

const categoriesTaken = ref<any>([]);

const getCategoriesTaken = () => {
  if (!props.user.categoryConsultations) {
    console.log('No hay categorías tomadas');
    return [];
  }
  categoriesTaken.value = [];
  
  categoriesTaken.value = Object.entries(props.user.categoryConsultations).map(e => e).flat();
  console.log(categoriesTaken.value);
}


</script>

<style scoped>
.ios-card {
  border-radius: 20px;
  background: white;
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08);
  margin-bottom: 20px;
  overflow: visible; /* Allows shadow to spread */
}

/* We ensure containment for proper shadowing but overflow visible on parent might be needed */
/* Resetting overflow for rounded corners inside */
.card-content-view, .card-content-edit {
  border-radius: 20px;
}

.custom-input {
  --background: transparent;
  --padding-start: 0;
  --padding-end: 0;
  --placeholder-opacity: 0.4;
  font-size: 14px;
}
</style>
