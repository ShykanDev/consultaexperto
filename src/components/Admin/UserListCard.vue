<template>
  <div
    class="web-card bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden ios-card group relative transition-all duration-300">
    <!-- Edit Button -->
    <div class="absolute top-0 right-0 p-2 z-10" v-if="!isEditing">
      <button class="p-2 text-blue-500 hover:text-blue-600 transition-colors" @click="startEdit">
        <v-icon name="fa-user-edit" scale="1.2" />
      </button>
    </div>

    <!-- VIEW MODE -->
    <div class="p-4" v-if="!isEditing">
      <div class="flex items-center gap-3 border-b pb-4">
        <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
          <v-icon name="hi-user" scale="1.5" />
        </div>
        <div class="flex flex-col">
          <h2 class="text-lg font-bold text-gray-900">{{ user.name || 'Usuario' }}</h2>
          <span class="text-xs text-gray-500 lowercase">{{ user.email }}</span>
        </div>
      </div>

      <div class="mt-4 space-y-3">
        <!-- Phone -->
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <v-icon class="text-green-500" name="fa-phone" />
          <div class="flex flex-col text-sm">
            <span class="text-[10px] uppercase font-bold text-gray-400">Teléfono</span>
            <span class="font-semibold text-gray-700">{{ userEdit.phone || 'Sin número' }}</span>
          </div>
        </div>

        <!-- Status -->
        <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <v-icon name="ri-error-warning-line" :class="userEdit.isBanned ? 'text-red-500' : 'text-blue-500'" />
          <div class="flex flex-col text-sm">
            <span class="text-[10px] uppercase font-bold text-gray-400">Estado</span>
            <span class="font-bold" :class="userEdit.isBanned ? 'text-red-600' : 'text-green-600'">
              {{ userEdit.isBanned ? 'Suspendido' : 'Habilitado' }}
            </span>
          </div>
        </div>

        <!-- Free Consultations Details -->
        <div class="mt-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-gray-800">Consultas Gratuitas</span>
            <button class="text-[10px] font-bold text-blue-600" v-if="user.categoryConsultations"
              @click="getCategoriesTaken">Ver Detalles</button>
          </div>

          <div v-if="categoriesTaken.length > 0" class="space-y-2 mt-2">
            <div class="bg-white p-3 rounded-xl border border-blue-50" v-for="category in categoriesTaken"
              :key="category[0]">
              <div class="flex items-center justify-between">
                <span class="text-sm font-bold text-gray-700">{{ category[0] }}</span>
                <button class="text-[10px] bg-blue-600 text-white px-2 py-1 rounded"
                  @click="reactiveConsultation(category[0])">Reactivar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- EDIT MODE -->
    <div class="p-5 bg-slate-50">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-base font-bold text-gray-800">Editar Usuario</h3>
        <button class="text-gray-400 hover:text-gray-600" @click="cancelEdit">
          <v-icon name="io-close" />
        </button>
      </div>

      <div class="space-y-4">
        <div class="space-y-1">
          <label class="text-xs font-semibold text-gray-500 ml-1">Teléfono</label>
          <input class="w-full px-3 py-2 bg-white border rounded-xl" v-model="editForm.phone" type="tel" />
        </div>

        <div class="space-y-1">
          <label class="text-xs font-semibold text-gray-500 ml-1">Estado</label>
          <div class="flex gap-2">
            <button class="flex-1 py-2 text-xs font-bold rounded-lg border transition-all" @click="setBanned(false)"
              :class="!editForm.isBanned ? 'bg-white text-green-600 border-green-200' : 'bg-gray-100 text-gray-400'">Habilitado</button>
            <button class="flex-1 py-2 text-xs font-bold rounded-lg border transition-all" @click="setBanned(true)"
              :class="editForm.isBanned ? 'bg-white text-red-600 border-red-200' : 'bg-gray-100 text-gray-400'">Suspendido</button>
          </div>
          <div class="mt-2" v-if="editForm.isBanned">
            <input class="w-full px-3 py-2 border rounded-xl text-sm" v-model="editForm.banReason"
              placeholder="Motivo de suspensión" />
          </div>
        </div>

        <button
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl text-sm mt-4 shadow-lg shadow-blue-200"
          @click="saveEdit">
          Guardar Cambios
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { IUser } from '@/interfaces/user/IUser';
import { doc, getFirestore, updateDoc, Timestamp } from 'firebase/firestore';

const props = defineProps<{
  user: IUser
}>();

const emit = defineEmits(['userUpdated']);

const isEditing = ref(false);
const userEdit = reactive({ ...props.user });
const editForm = reactive({ ...props.user });
const categoriesTaken = ref<any[]>([]);

watch(() => props.user, (newVal) => {
  Object.assign(userEdit, newVal);
  if (!isEditing.value) Object.assign(editForm, newVal);
});

function startEdit() {
  Object.assign(editForm, userEdit);
  isEditing.value = true;
}

function cancelEdit() {
  isEditing.value = false;
}

function setBanned(status: boolean) {
  editForm.isBanned = status;
}

const db = getFirestore();

function saveEdit() {
  const userPath = doc(db, 'users', props.user.userId);
  updateDoc(userPath, editForm).then(() => {
    isEditing.value = false;
    emit('userUpdated');
  }).catch(error => {
    console.error('Error updating user:', error);
  });
}

function getCategoriesTaken() {
  if (props.user.categoryConsultations) {
    categoriesTaken.value = Object.entries(props.user.categoryConsultations);
  }
}

async function reactiveConsultation(category: string) {
  const userDocRef = doc(db, 'users', props.user.userId);
  await updateDoc(userDocRef, {
    [`categoryConsultations.${category}.hasFreeConsult`]: true,
    [`categoryConsultations.${category}.reactivatedAt`]: Timestamp.now()
  });
  emit('userUpdated');
}
</script>
