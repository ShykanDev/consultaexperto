<template>
    <div class="flex overflow-hidden relative flex-col my-3 rounded-xl shadow-md font-poppins" :class="{'bg-red-100 ring-2 ring-red-300': props.expertData.isSuspended, 'bg-white': !props.expertData.isSuspended}">

        <div class="flex relative gap-4 items-start p-4">
            <img class="object-cover w-14 h-14 rounded-full shrink-0" 
                :src="props.expertData.profilePicture || 'https://picsum.photos/200/300'" alt="Profile picture" />
            <div class="flex-grow">
                <div class="flex justify-between items-center">
                    <p class="text-lg font-bold leading-tight text-blue-600 font-poppins">{{ props.expertData.fullName || ' Nombre del experto'}}
                    </p>
                    <p v-if="props.expertData.isSuspended" class="text-sm font-medium leading-tight text-red-700 font-poppins">(Suspendido)</p>
                </div>
                <p class="text-sm text-neutral-600">{{ props.expertData.specialty ?? 'Especialidad' }}</p>
                <div class="flex gap-1 items-center mt-1">
                    <ion-icon :icon="starSharp" class="text-yellow-400" v-for="(_, index) in 5" :key="index"></ion-icon>
                    <p class="ml-1 text-xs text-neutral-500">{{ props.expertData.rating || 0 }}</p>
                </div>
                <p class="text-xs text-gray-500">{{ props.expertData.isBanned ? 'Bloqueado' : 'Activo' }}</p>
            </div>
        </div>

             <ion-alert
    trigger="unsuspend-alert"
    header="¿Está seguro de desbloquear a este experto?"
    message="Al desbloquear a este experto, podrá volver a atender nuevas solicitudes."
    :buttons="alertButtons"
   
  ></ion-alert>
        <div class="flex relative flex-col gap-3 px-4 pb-4">
            <p class="text-sm leading-relaxed text-neutral-600">{{ props.expertData.bio || 'Biografía del experto' }}</p>
            <div v-if="props.expertData.isSuspended" class="p-2 mt-1 bg-red-50 rounded-lg border border-red-200">
                <p class="text-xs font-bold text-red-800 !font-poppins">Motivo de la suspension:</p>
                <p class="text-sm text-red-800 !font-poppins">{{ props.expertData.suspensionReason || 'Este experto ha sido suspendido por violar las normas de la comunidad y no puede atender nuevas solicitudes.' }}</p>
            </div>
            <div class="grid grid-cols-3 gap-1 p-1 mt-2">
                <ion-button id="unsuspend-alert"  v-if="props.expertData.isSuspended" class="col-span-2 unblock-user" style="text-transform: none;">
                    <ion-icon slot="start" :icon="checkmarkCircleSharp"></ion-icon>
                    <span class="text-sm font-medium">Desbloquear</span>
                </ion-button>
            
                <ion-button v-else @click="toggleModal" class="col-span-2 block-user"  style="text-transform: none;">
                    <ion-icon slot="start" :icon="alertCircleSharp"></ion-icon>
                    <span class="text-sm font-medium">Suspender</span>
                </ion-button>
                <ion-button @click="goToProfile" class="profile bg-primary" style="text-transform: none;">
                    <ion-icon slot="start" :icon="eyeSharp"></ion-icon>
                    <span class="text-sm font-base">Ver 
                        perfil</span>
                </ion-button>
            </div>

        </div>
    </div>
</template>

<script lang="ts" setup>
import { IonButton, IonIcon, useIonRouter, IonAlert } from '@ionic/vue';
import { alertCircleSharp, checkmarkCircleSharp, eyeSharp, starSharp, toggle } from 'ionicons/icons';
import { IExpert } from '@/interfaces/IExpert';
import { useExpertAdminStore } from '@/stores/expertAdmin';
import { updateDoc } from 'firebase/firestore';
import { toastController } from '@ionic/vue';
import { onMounted } from 'vue';

const presentToast = async (position: 'top' | 'middle' | 'bottom', message: string, color = 'light') => {
    const toast = await toastController.create({
      message: message,
      duration: 1500,
      position: position,
      color: color,
      swipeGesture:'vertical',
      translucent: true,
      buttons: [
        {
          text: 'cerrar',
          role: 'cancel',
        }
      ]
    });

    await toast.present();
  };
const expertAdminStore = useExpertAdminStore();

const alertButtons = [
  {
    text: 'Cancelar',
    role: 'cancel'
  },
  {
    text: 'Desbloquear',
    handler: () => {
      unsuspendUser();
    }
  }
];

const router = useIonRouter();
const goToProfile = () => {
    expertAdminStore.setExpertData(props.expertData)
    router.navigate(`/expert-preview`, 'forward', 'push');
};

const props = defineProps({
  expertData: {
    type: Object as () => IExpert,
    default: () => ({})
  }
});


const emit = defineEmits(['reload', 'callOpenModal']);

const toggleModal = () => {
    emit('callOpenModal', props.expertData)
}

const suspendUser = () => {

    if (!props.expertData.docRef) {
        presentToast('top', 'Error: No se encontró el experto', 'danger');
        console.log('ERROR: props.expertData.docRef is undefined');
        console.log('Current expert:', props.expertData);
        return;
    }
    
    updateDoc(props.expertData.docRef!, {
        isSuspended: true,
        suspensionReason: 'Suspendido por administrador'
    })
    .then(() => {
        emit('reload');
        presentToast('top', 'Experto suspendido exitosamente', 'success');
    })
    .catch((error) => {
        console.error('Error suspending expert:', error);
        presentToast('top', 'Error al suspender al experto', 'danger');
    });
}

const unsuspendUser = () => {
    if (!props.expertData.docRef) {
        presentToast('top', 'Error: No se encontró el experto', 'danger');
        console.log('ERROR: props.expertData.docRef is undefined');
        console.log('Current expert:', props.expertData);
        return;
    }
    
    updateDoc(props.expertData.docRef!, {
        isSuspended: false,
        suspensionReason: null
    })
    .then(() => {
        emit('reload');
        presentToast('top', 'Experto reactivado exitosamente', 'success');
    })
    .catch((error) => {
        console.error('Error reactivating expert:', error);
        presentToast('top', 'Error al reactivar al experto', 'danger');
    });
}

onMounted(() => {
    console.log('ExpertCard mounted with data:', props.expertData);
});
</script>

<style scoped>
/* Reactivate Button */
ion-button.reactivate {
    --background: #FFF4E5;
    --color: #FF9800;
    --border-radius: 10px;
    --background-activated: #FFE0B2; /* Lighter or darker shade of the original background */
    --color-activated: #E65100; /* Lighter or darker shade of the original text color */
}

/* Block User Button */
ion-button.block-user {
    --background: #fff2f1;
    --color: #D32F2F;
    --border-radius: 10px;
    --background-activated: #FFCDD2; /* Lighter or darker shade of the original background */
    --color-activated: #B71C1C; /* Lighter or darker shade of the original text color */
    --border-color: #D32F2F;
    --border-width: 1px;
    --border-style: solid;
}

/* Profile Button */
ion-button.profile {
    --background: #007AFF;
    --color: white;
    --border-radius: 10px;
    --background-activated: #0062CC; /* Lighter or darker shade of the original background */
    --color-activated: white; /* Keep the text color the same or change it */
}

/* Unblock User Button */
ion-button.unblock-user {
    --background: #f8fff9;
    --color: #2E7D32;
    --border-radius: 10px;
    --background-activated: #C8E6C9; /* Lighter or darker shade of the original background */
    --color-activated: #0f4513; /* Lighter or darker shade of the original text color */
    --border-color: #2E7D32;
    --border-width: 1px;
    --border-style: solid;
}

</style>