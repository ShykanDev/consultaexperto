<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="font-nunito" color="primary">Crear Nuevo Experto</ion-title>
        <ion-buttons slot="start">
         <ion-back-button :icon="chevronBack" default-href="/expert-list-admin" text="Cancelar" style="text-transform: none;" ></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="space-y-8">
        <!-- Basic Information Section -->
        <ion-card>
          <ion-card-header>
            <ion-card-title class="font-poppins" color="primary">Información del nuevo experto</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="flex flex-col space-y-4">
              <ion-input
                label="Nombre completo"
                label-placement="floating"
                placeholder="Ingrese nombre completo"
                v-model="form.fullName"
                fill="outline"
                class="font-poppins"
              ></ion-input>

              <ion-input
                label="Correo electrónico"
                label-placement="floating"
                type="email"
                placeholder="ejemplo@dominio.com"
                v-model="form.email"
                fill="outline"
                class="font-poppins"
              ></ion-input>
              <ion-input
                label="Especialidad"
                label-placement="floating"
                placeholder="Ingrese especialidad, Ej: Médico, Abogado, Ingeniero, Arquitecto etc"
                v-model="form.specialty"
                fill="outline"
                class="font-poppins"
              ></ion-input>

              <ion-input
                label="URL de imagen"
                label-placement="floating"
                type="url"
                placeholder="https://ejemplo.com/imagen.png"
                v-model="form.imgUrl"
                fill="outline"
                class="font-poppins"
              ></ion-input>

              <div class="grid grid-cols-2 gap-4">
                <ion-input
                  label="Años de experiencia"
                  label-placement="floating"
                  type="number"
                  placeholder="ej. 5"
                  v-model="form.experienceYears"
                  fill="outline"
                  min="0"
                  class="font-poppins"
                ></ion-input>

                <ion-input
                  label="ID profesional (opcional)"
                  label-placement="floating"
                  placeholder="ID profesional"
                  v-model="form.professionalId"
                  fill="outline"
                  class="font-poppins"
                ></ion-input>
              </div>

              <ion-textarea
                label="Biografía"
                label-placement="floating"
                placeholder="Breve descripción del experto..."
                v-model="form.bio"
                :rows="4"
                fill="outline"
                class="font-poppins"
              ></ion-textarea>
            </div>
          </ion-card-content>
        </ion-card>


        <!-- Administrative Controls Section
        <ion-card>
          <ion-card-header>
            <ion-card-title>Controles Administrativos</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-list>
              <ion-item>
                <ion-label>Está Suspendido</ion-label>
                <ion-toggle v-model="form.isSuspended" slot="end"></ion-toggle>
              </ion-item>

              <ion-item>
                <ion-label>Está Bloqueado</ion-label>
                <ion-toggle v-model="form.isBanned" slot="end"></ion-toggle>
              </ion-item>

              <ion-input
                label="Razón de suspensión/bloqueo"
                label-placement="floating"
                placeholder="Razón requerida si está suspendido o bloqueado"
                :disabled="!form.isSuspended && !form.isBanned"
                v-model="form.suspensionReason"
                fill="outline"
                class="font-poppins"
              ></ion-input>
            </ion-list>
          </ion-card-content>
        </ion-card>
          -->

        <!-- Action Buttons -->
        <div class="pt-4 pb-8 space-y-3">
          <ion-button
            expand="block"
            shape="round"
            :disabled="!isFormValid"
            @click="createExpert"
            class="custom-send"
          >
            Crear Experto
          </ion-button>
          <ion-button
            expand="block"
            fill="outline"
            @click="resetForm"
          >
            Restablecer Formulario
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
  IonButton,
  IonButtons,
  IonToggle,
  IonNote,
  IonIcon,
} from '@ionic/vue';
import { addDoc, collection, getFirestore, updateDoc } from 'firebase/firestore';
import { chevronBack, helpOutline } from 'ionicons/icons';
import { ref, computed } from 'vue';

import { toastController } from '@ionic/vue';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
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


const form = ref({
  userUid: '',
  fullName: '',
  specialty: '',
  email: '',
  imgUrl: '',
  experienceYears: null,
  professionalId: '',
  bio: '',
  rating: 5,
  totalRatings: 0,
  completedSessions: 0,
  isSuspended: false,
  isBanned: false,
  suspensionReason: '',
});

const isFormValid = computed(() => {
  return (
    form.value.fullName.trim() !== '' &&
    form.value.email.trim() !== '' &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email) &&
    form.value.experienceYears !== null &&
    form.value.bio.trim() !== ''
  );
});

const cancelForm = () => {
  // Lógica para cancelar el formulario
  console.log('Formulario cancelado');
};

const resetForm = () => {
  form.value = {
    userUid: '',
    fullName: '',
    specialty: '',
    email: '',
    imgUrl: '',
    experienceYears: null,
    professionalId: '',
    bio: '',
    rating: 4.9,
    totalRatings: 120,
    completedSessions: 350,
    isSuspended: false,
    isBanned: false,
    suspensionReason: '',
  };
};


const db = getFirestore();
const expertsCollection = collection(db, 'experts');
const auth = getAuth();



const createExpert = () => {
  if (!form.value.fullName.trim()) {
    presentToast('top', 'El nombre completo es obligatorio', 'danger');
    return;
  }
  if (!form.value.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    presentToast('top', 'Ingrese un correo electrónico válido', 'danger');
    return;
  }
  if (form.value.experienceYears === null) {
    presentToast('top', 'Los años de experiencia son obligatorios', 'danger');
    return;
  }
  if (!form.value.bio.trim()) {
    presentToast('top', 'La biografía es obligatoria', 'danger');
    return;
  }
  
createUserWithEmailAndPassword(auth, form.value.email, '1234567890')
    .then((userCredential) => {
      // User created successfully
      const user = userCredential.user;
      updateProfile(user, { displayName: form.value.fullName }).then(() => {
        console.log('Profile updated successfully');
        presentToast('top', 'Perfil actualizado exitosamente', 'success');
      }).catch((error) => {
        console.error('Error updating profile: ', error);
        presentToast('top', 'Error al actualizar perfil: ' + error.message, 'danger');
      });
      form.value.userUid = user.uid;
      // Now create the expert
      addDoc(expertsCollection, form.value).then((res) =>{
        console.log('Expert created with ID:', res.id);
        presentToast('top', 'Experto creado exitosamente', 'success');
        resetForm();
      }).catch((error) => {
        presentToast('top', 'Error al crear experto: ' + error.message, 'danger');
        console.error('Error creating expert: ', error);
      });
    })
    .catch((error) => {
      presentToast('top', 'Error al crear usuario: ' + error.message, 'danger');
      console.error('Error creating user: ', error);
    });
};
</script>

<style scoped>
ion-content {
  --background: #f2f2f7;
}
/* Estilos personalizados para imitar el diseño iOS */
ion-input, ion-textarea {
  --background: #FFFFFF;
  --border-radius: 0.5rem;
  --border-color: #E5E5EA;
  --color: #1D1D1F;
  --placeholder-color: #494949;
}


ion-card {
  --background: #FFFFFF;
  --border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05);
}


.text-danger {
  color: #FF3B30;
}

.grid {
  display: grid;
}

.custom-send {
  --background: #3c69ff;
  --color: white;
  --border-radius: 0.75rem;
  font-weight: 600;
  text-transform: none;
  letter-spacing: normal;
}

</style>
