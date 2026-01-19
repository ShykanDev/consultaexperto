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


          <div class="col-span-2 p-4 bg-blue-50/30 rounded-2xl border border-blue-100/50 flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="p-2 bg-blue-500 rounded-lg shadow-sm text-white">
                  <ion-icon :icon="ribbonOutline"></ion-icon>
                </div>
                <span class="text-xs font-bold text-gray-800">Consultas Gratuitas Usadas</span>
              </div>
              <button 
                v-if="user.categoryConsultations" 
                @click="getCategoriesTaken" 
                class="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-3 py-1.5 rounded-full hover:bg-blue-200 transition-colors"
              >
                {{ categoriesTaken.length > 0 ? 'Actualizar' : 'Ver Detalles' }}
              </button>
            </div>

            <div v-if="categoriesTaken.length > 0" class="space-y-2">
              <div 
                v-for="category in categoriesTaken" 
                :key="category[0]" 
                class="bg-white p-3 rounded-xl border border-blue-50 shadow-sm flex flex-col gap-2"
              >
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <ion-icon :icon="medalOutline" class="text-blue-500"></ion-icon>
                    <span class="text-sm font-bold text-gray-700">{{ category[0] ?? 'Sin especialidad' }}</span>
                  </div>
                  <ion-button 
                    @click="reactiveConsultation(category[0])"
                    size="small"  
                    title="Reactivar consulta"
                    color="primary"
                    class="font-poppins font-base  "
                    mode="ios"
                    style="text-transform: none; padding-left: 2px; padding-right: 2px;"
                  >
                  Reactivar consulta gratuita 
                    <ion-icon slot="icon-only" :icon="refreshOutline" class="text-xs px-2" ></ion-icon>
                  </ion-button>
                </div>
                
                <div class="flex flex-col gap-1">
                  <!-- Taken At -->
                  <div class="flex items-center gap-1.5 text-gray-500">
                    <ion-icon :icon="calendarOutline" class="text-xs"></ion-icon>
                    <span class="text-[10px] font-bold uppercase opacity-60">Usada:</span>
                    <span v-if="category[1].takenAt" class="text-[11px] font-medium text-gray-700">
                      {{ new Date(category[1].takenAt.toDate()).toLocaleString('es-MX', {dateStyle: 'medium', timeStyle: 'short'}) }}
                    </span>
                    <span v-else class="text-[11px] font-medium text-gray-400">Sin fecha de uso</span>
                  </div>

                  <!-- Reactivated At -->
                  <div v-if="category[1].reactivatedAt" class="flex items-center gap-1.5 text-blue-500">
                    <ion-icon :icon="timeOutline" class="text-xs"></ion-icon>
                    <span class="text-[10px] font-bold uppercase opacity-60">Reactivada:</span>
                    <span class="text-[11px] font-medium">
                      {{ new Date(category[1].reactivatedAt.toDate()).toLocaleString('es-MX', {dateStyle: 'medium', timeStyle: 'short'}) }}
                    </span>
                  </div>
                </div>
                <span>Si desea bloquear a un experto para este usuario haga clic en el botón "Ver listado de expertos"</span>
                <ion-button 
                  size="small" 
                  :color="activeCategoryForExperts === category[0] ? 'medium' : 'primary'" 
                  mode="ios" 
                  @click="activeCategoryForExperts === category[0] ? (activeCategoryForExperts = null, expertList = []) : getExperts(category[0] ?? '')"
                  class="mt-2"
                >
                  {{ activeCategoryForExperts === category[0] ? 'Ocultar expertos' : 'Ver listado de expertos' }}
                </ion-button>

                <!-- Expert Selection UI -->
                <div 
                  v-if="activeCategoryForExperts === category[0] && expertList.length > 0" 
                  class="mt-4 p-4 bg-red-50/50 rounded-2xl border border-red-100 animate-in fade-in slide-in-from-top-2 duration-300"
                >
                  <div class="flex items-center gap-2 mb-3">
                    <div class="p-1.5 bg-red-500 rounded-lg text-white shadow-sm">
                      <ion-icon :icon="banOutline" class="text-xs"></ion-icon>
                    </div>
                    <span class="text-xs font-bold text-red-700">Bloquear Experto</span>
                  </div>
                  
                  <p class="text-[10px] text-red-600/70 mb-4 font-medium leading-relaxed">
                    Seleccione un experto para evitar que este usuario pueda volver a contactarlo en esta especialidad.
                  </p>

                  <ion-select 
                    v-model="expertSelected" 
                    interface="action-sheet"
                    class="premium-select"
                    placeholder="Seleccionar experto..."
                    mode="ios"
                  >
                    <ion-select-option v-for="expert in expertList" :key="expert.userUid" :value="expert">
                      {{ expert.fullName }}
                    </ion-select-option>
                  </ion-select>

                  <div v-if="expertSelected" class="mt-4 space-y-3 pt-3 border-t border-red-100/50">
                     <!-- Selected Expert Card -->
                     <div class="p-3 bg-white rounded-xl border border-red-100 shadow-sm flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-500 border border-red-100">
                           <ion-icon :icon="personOutline"></ion-icon>
                        </div>
                        <div class="flex flex-col">
                           <span class="text-xs font-bold text-gray-800">{{ expertSelected.fullName }}</span>
                           <span class="text-[10px] text-gray-500 lowercase">{{ expertSelected.specialty }}</span>
                        </div>
                     </div>

                     <!-- Reason Input -->
                     <div class="space-y-1">
                       <label class="text-[10px] font-bold text-red-700 uppercase ml-1">Motivo del bloqueo</label>
                       <div class="bg-white rounded-xl border border-red-100 overflow-hidden shadow-sm focus-within:ring-2 ring-red-100 transition-all">
                         <ion-input
                           v-model="blockReason"
                           placeholder="Explique por qué se bloquea..."
                           class="custom-input px-3"
                         ></ion-input>
                       </div>
                     </div>

                     <ion-button 
                       @click="blockExpert(expertSelected)" 
                       expand="block" 
                       color="danger" 
                       mode="ios" 
                       class="font-bold text-xs mt-2"
                       style="--border-radius: 12px; height: 44px; text-transform: none;"
                     >
                       Confirmar Bloqueo de {{ expertSelected.fullName }}
                       <ion-icon slot="end" :icon="closeCircle"></ion-icon>
                     </ion-button>
                  </div>
                </div>

                <div v-else-if="activeCategoryForExperts === category[0] && expertList.length === 0" class="mt-2 p-3 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
                  <span class="text-[10px] text-gray-400 font-medium">No hay otros expertos en esta categoría</span>
                </div>
              </div>

              
            
            </div>
            
            <div v-else-if="!user.categoryConsultations" class="flex flex-col items-center justify-center py-4 bg-gray-50/50 rounded-xl border border-dashed border-gray-200">
              <ion-icon :icon="checkmarkCircle" class="text-gray-300 text-xl mb-1"></ion-icon>
              <span class="text-[10px] text-gray-400 font-medium">Sin consultas registradas</span>
            </div>
          </div>
        </div>
        
        <!-- ID & Age Info -->
         <div class="pt-3 border-t border-gray-100 flex justify-between items-center text-gray-400">
            <div class="flex flex-col">
              <span class="text-[9px] uppercase tracking-tighter font-bold opacity-60">User ID</span>
              <span class="text-[10px] font-mono">{{ user.userId }}</span>
            </div>
            <div v-if="user.userAge" class="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md border border-gray-100">
              <ion-icon :icon="personOutline" class="text-[10px]"></ion-icon>
               <span class="text-[10px] font-bold text-gray-600">{{ getAge(user.userAge) }} años</span>
            </div>
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
  IonToggle,
  IonSelect,
  IonSelectOption
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
  banOutline,
  medalOutline,
  calendarOutline,
  refreshOutline,
  chevronForwardOutline,
  ribbonOutline,
  timeOutline
} from 'ionicons/icons';
import { reactive, ref, watch } from 'vue';
import { IUser } from '@/interfaces/user/IUser';
import { collection, doc, getDocs, getFirestore, query, Timestamp,  updateDoc, where } from 'firebase/firestore';

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
  if (!status) editForm.banReason = '';
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
  
  categoriesTaken.value = Object.entries(props.user.categoryConsultations).map(e => e);
  console.log(categoriesTaken.value);
}

const reactiveConsultation = async(category: string) => {

  if (!props.user.categoryConsultations) {
    console.log('No hay categorías tomadas');
    return;
  }

  try {
    const userDocRef = doc(db, 'users', props.user.userId);
    updateDoc(userDocRef, {
        [`categoryConsultations.${category}.hasFreeConsult`]: true,
        [`categoryConsultations.${category}.reactivatedAt`]: Timestamp.now()
    })
    emit('userUpdated');
  } catch (error) {
    console.error('Error al reactivar las consultas gratis:', error);
  }
}

const expertList = ref<any[]>([]);
const expertSelected = ref<any>(null);
const activeCategoryForExperts = ref<string | null>(null);
const blockReason = ref('Sin motivo proporcionado');
const getExperts = async(specialtyParam:string) => {
    try {
        activeCategoryForExperts.value = specialtyParam;
        expertSelected.value = null;
        
        const expertsRef = collection(db, 'experts');
        const qGetSpecialties = query(expertsRef, where('specialty', '==', specialtyParam));
        const expertsSnapshot = await getDocs(qGetSpecialties);
        expertList.value = expertsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                userUid: data.userUid || doc.id,
                expertId: data.expertId || doc.id
            };
        });
    } catch (error) {
      console.error('Error fetching experts:', error);
    }
}

const blockExpert = async(expert:any) => {
  if (!expert || !expert.userUid) {
    console.error('Datos del experto incompletos:', expert);
    return;
  }
    try {
        const userDocRef = doc(db, 'users', props.user.userId);
        await updateDoc(userDocRef, {
            [`expertsBlocked.${expert.userUid}`]: {
              expertName: expert.fullName || 'Desconocido',
              expertUid: expert.userUid,
              expertSpecialty: expert.specialty || 'Sin especialidad',
              blockedAt: Timestamp.now(),
              blockedBy: 'Admin',
              reason: blockReason.value
            }
        })

        // Clear state
        expertSelected.value = null;
        activeCategoryForExperts.value = null;
        expertList.value = [];
        
        emit('userUpdated');
    } catch (error) {
      console.error('Error al bloquear al experto:', error);
    }
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

.premium-select {
  --background: #ffffff;
  --placeholder-color: #94a3b8;
  --placeholder-opacity: 1;
  --padding-start: 16px;
  --padding-end: 16px;
  --padding-top: 12px;
  --padding-bottom: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
  width: 100%;
}

.animate-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
