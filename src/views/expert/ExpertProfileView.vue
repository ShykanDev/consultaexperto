<template>
  <ion-page>
    <ion-header class="ion-no-border">
      <ion-toolbar>
        <ion-title class="text-blue-600 font-poppins">Mi Perfil</ion-title>
        <ion-buttons slot="end">
          <ion-button @click="loadExpertData">
            <ion-icon :icon="refresh" :class="{'animate-spin': isLoading}" color="primary"></ion-icon>
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="bg-slate-50">
      
      <div v-if="isLoading" class="flex flex-col items-center justify-center h-full gap-3">
        <ion-spinner color="primary"></ion-spinner>
        <p class="text-gray-500 font-quicksand text-sm">Cargando perfil...</p>
      </div>

      <div v-else-if="!expertData" class="flex flex-col items-center justify-center h-full gap-4 px-6">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
             <ion-icon :icon="alertCircle" class="text-2xl text-red-500"></ion-icon>
        </div>
        <p class="text-gray-600 font-poppins text-center">No se pudo cargar la información del perfil.</p>
        <ion-button mode="ios" @click="loadExpertData" class="mt-2 text-transform-none">Reintentar</ion-button>
      </div>

      <div v-else class="flex flex-col pb-10">
        
        <!-- Header Profile Card -->
        <article class="relative bg-white pt-8 pb-6 px-4 rounded-b-[2.5rem] shadow-sm mb-6 flex flex-col items-center border-b border-gray-100">
           
           <!-- Avatar -->
           <div class="relative mb-4">
              <div class="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-blue-400 to-blue-600 shadow-xl overflow-hidden">
                <img 
                  :src="expertData.profilePicture || expertData.imgUrl" 
                  class="w-full h-full object-cover rounded-full bg-white"
                  alt="Profile"
                />
              </div>
              <div class="absolute bottom-1 right-1 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>
           </div>

           <!-- Name & Role -->
           <h1 class="text-2xl font-bold text-gray-800 font-poppins text-center mb-1">
             {{ expertData.fullName }}
           </h1>
           <span class="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold font-quicksand">
             {{ expertData.specialty }}
           </span>

           <!-- Stats Row -->
           <div class="flex items-center justify-center gap-8 mt-6 w-full max-w-xs">
              <div class="flex flex-col items-center">
                 <span class="text-lg font-bold text-gray-800 font-poppins">{{ expertData.experienceYears || 0 }}</span>
                 <span class="text-xs text-gray-500 font-medium">Años Exp.</span>
              </div>
              <div class="w-[1px] h-8 bg-gray-200"></div>
              <div class="flex flex-col items-center">
                 <span class="text-lg font-bold text-gray-800 font-poppins">{{ expertData.completedSessions }}</span>
                 <span class="text-xs text-gray-500 font-medium">Sesiones</span>
              </div>
              <div class="w-[1px] h-8 bg-gray-200"></div>
              <div class="flex flex-col items-center">
                 <span class="text-lg font-bold text-gray-800 font-poppins flex items-center gap-1">
                 {{calcStarsValue(expertData.rating!).toFixed(1)}}   <ion-icon :icon="star" class="text-yellow-400 text-xs"></ion-icon>
                 </span>
                 <span class="text-xs text-gray-500 font-medium">Rating</span>
              </div>
           </div>
        </article>

        <!-- General Info Section -->
        <section class="px-5 space-y-4">
          <h3 class="text-lg font-bold text-gray-800 font-poppins px-1">Información General</h3>
          
          <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex flex-col gap-4">
             <!-- Email -->
             <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600">
                   <ion-icon :icon="mail" class="text-xl"></ion-icon>
                </div>
                <div class="flex flex-col">
                   <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Correo Electrónico</span>
                   <span class="text-sm font-medium text-gray-800 mt-0.5">{{ expertData.email }}</span>
                </div>
             </div>
             
             <div class="h-[1px] w-full bg-gray-50"></div>

             <!-- Professional ID -->
             <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-600">
                   <ion-icon :icon="card" class="text-xl"></ion-icon>
                </div>
                <div class="flex flex-col">
                   <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Cédula Profesional</span>
                   <span class="text-sm font-medium text-gray-800 mt-0.5">{{ expertData.professionalId || 'No registrada' }}</span>
                </div>
             </div>
          </div>
        </section>

        <!-- Bio Section -->
        <section class="px-5 mt-6 space-y-4">
           <h3 class="text-lg font-bold text-gray-800 font-poppins px-1">Biografía</h3>
           <div class="bg-white p-5 rounded-2xl shadow-sm border border-gray-50">
              <p class="text-sm text-gray-600 leading-relaxed font-quicksand" v-if="expertData.bio">
                {{ expertData.bio }}
              </p>
              <p class="text-sm text-gray-400 italic" v-else>
                Sin biografía disponible.
              </p>
           </div>
        </section>

         <!-- Account Status -->
         <section class="px-5 mt-6 space-y-4 mb-4">
           <h3 class="text-lg font-bold text-gray-800 font-poppins px-1">Estado de la cuenta</h3>
           <div class="bg-white p-4 rounded-2xl shadow-sm border border-gray-50 flex items-center gap-3">
              <div 
                class="w-3 h-3 rounded-full" 
                :class="{'bg-green-500': !expertData.isBanned && !expertData.isSuspended, 'bg-red-500': expertData.isBanned, 'bg-orange-500': expertData.isSuspended}"
              ></div>
              <span class="text-sm font-medium text-gray-700">
                {{ expertData.isBanned ? 'Baneada' : (expertData.isSuspended ? 'Suspendida' : 'Activa y Verificada') }}
              </span>
           </div>
        </section>
        
        <div class="px-5 mt-4">
            <ion-button expand="block" color="danger" mode="ios" fill="outline" class="h-12 font-medium" router-link="/expert/logout">
               Cerrar Sesión
            </ion-button>
        </div>

      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonSpinner, onIonViewDidEnter } from '@ionic/vue';
import { refresh, mail, card, star, alertCircle } from 'ionicons/icons';
import { ref } from 'vue';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { authStore as useAuthStore } from '@/store/auth';
import { IExpert } from '@/interfaces/IExpert';
import { useRating } from '@/composables/stars';

const authStore = useAuthStore();
const db = getFirestore();

const expertData = ref<IExpert | null>(null);
const isLoading = ref(true);

const loadExpertData = async () => {
  const uid = authStore.getUserUid;
  if(!uid) {
    isLoading.value = false;
    return;
  }
  
  isLoading.value = true;
  try {
    const docRef = doc(db, 'experts', uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      expertData.value = docSnap.data() as IExpert;
    } else {
      console.error("No expert document found!");
      expertData.value = null;
    }
  } catch (error) {
    console.error("Error loading expert data:", error);
    expertData.value = null;
  } finally {
    isLoading.value = false;
  }
};

onIonViewDidEnter(() => {
  loadExpertData();
});


//UI

const {calcStarsValue} = useRating();
</script>

<style scoped>
ion-content {
  --background: #f8fafc;
}

ion-button {
  --border-radius: 12px;
  text-transform: none;
  font-weight: 600;
}
</style>
