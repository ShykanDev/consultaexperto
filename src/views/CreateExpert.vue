<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="font-nunito" color="primary">Crear Nuevo Experto</ion-title>
        <ion-buttons slot="start">
          <ion-back-button color="primary" :icon="chevronBack" default-href="/expert-list-admin" text="Cancelar"
            style="text-transform: none;"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <div class="space-y-8">
        <!-- Basic Information Section -->
        <ion-card>
          <ion-card-header class="expert-info">
            <ion-card-title class="font-poppins" color="primary">Información del nuevo experto</ion-card-title>
          </ion-card-header>
          <ion-card-content style="background-color: #F5F7F8;">
            <div class="flex flex-col py-3 space-y-4">
              <ion-input label="Nombre completo" label-placement="floating" placeholder="Ingrese nombre completo"
                v-model="form.fullName" fill="outline" class="font-poppins"></ion-input>

              <ion-input label="Correo electrónico" label-placement="floating" type="email"
                placeholder="ejemplo@dominio.com" v-model="form.email" fill="outline" class="font-poppins"></ion-input>
              <ion-input label="Especialidad" label-placement="floating"
                placeholder="Ingrese especialidad, Ej: Médico, Abogado, Ingeniero, Arquitecto etc"
                v-model="form.specialty" fill="outline" class="font-poppins"></ion-input>

              <ion-input label="URL de imagen" label-placement="floating" type="url"
                placeholder="https://ejemplo.com/imagen.png" v-model="form.imgUrl" fill="outline"
                class="font-poppins"></ion-input>

              <div class="grid grid-cols-2 gap-4">
                <ion-input label="Años de experiencia" label-placement="floating" type="number" placeholder="ej. 5"
                  v-model="form.experienceYears" fill="outline" min="0" class="font-poppins"></ion-input>

                <ion-input label="ID profesional (opcional)" label-placement="floating" placeholder="ID profesional"
                  v-model="form.professionalId" fill="outline" class="font-poppins"></ion-input>
              </div>

              <ion-textarea label="Biografía" label-placement="floating" placeholder="Breve descripción del experto..."
                v-model="form.bio" :rows="4" fill="outline" class="font-poppins"></ion-textarea>
            </div>
            <h2 class="p-1 w-full font-medium text-center text-blue-600 bg-white rounded-xl shadow-sm font-poppins">
              Horarios del experto</h2>
            <section class="grid grid-cols-2 gap-4 items-center p-1 font-poppins">
              <article v-for="(day, index) in schedule" :key="index"
                class="p-1 rounded-md ring-offset-1 transition-all duration-200 ease-in hover:ring-1 hover:ring-offset-slate-200 hover:scale-[101%] hover:ring-blue-500">
                <span class="text-center text-blue-500">
                  {{ day.day }}
                </span>
                <div v-for="(slot, slotIndex) in day.slots" :key="slotIndex"
                  class="mb-2 font-medium text-center text-white rounded-md ring-1 ring-gray-200 cursor-pointer font-poppins"
                  :class="{ 'bg-white text-slate-900': slot.isAvailable, 'bg-[#2C7CEE] rounded-md': !slot.isAvailable }"
                  @click="getDateSelected(day, slot.time)">
                  {{ slot.time }}
                </div>


              </article>
            </section>
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
          <ion-button expand="block" shape="round" :disabled="!isFormValid" @click="createExpert" class="custom-send">
            Crear Experto
          </ion-button>
          <ion-button expand="block" fill="outline" @click="resetForm">
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
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, updateProfile } from 'firebase/auth';
import { Ischedule } from '@/interfaces/Ischedule';
const presentToast = async (position: 'top' | 'middle' | 'bottom', message: string, color = 'light') => {
  const toast = await toastController.create({
    message: message,
    duration: 1500,
    position: position,
    color: color,
    swipeGesture: 'vertical',
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
const emailsExperts = collection(db, 'EmailsExperts');
const auth = getAuth();



const setSubcollectionSchedule = async (expertUid: string) => {
  const expertScheduleCollection = collection(db, `experts/${expertUid}/schedule`);
  try {
    // Convertir el arreglo de días a un objeto
    const scheduleAsObject = schedule.value.reduce((acc, day) => {
      acc[day.day] = day.slots;
      return acc;
    }, {} as Record<string, any>);

    // Agregar el horario como un solo documento
    await addDoc(expertScheduleCollection, {
      schedule: scheduleAsObject
    });
    console.log("Horario guardado en un solo documento con éxito");
  } catch (error) {
    console.error("Error al guardar el horario:", error);
  }
};



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
      sendEmailVerification(user).then(() => {
        console.log('Email verification sent successfully');
        presentToast('top', 'Verificación de correo electrónico enviada exitosamente', 'success');
      }).catch((error) => {
        console.error('Error sending email verification: ', error);
        presentToast('top', 'Error al enviar verificación de correo electrónico: ' + error.message, 'danger');
      });
      form.value.userUid = user.uid;
      // Now create the expert
      addDoc(expertsCollection, form.value).then((res) => {
        console.log('Expert created with ID:', res.id);
        presentToast('top', 'Experto creado exitosamente', 'success');
       
        setSubcollectionSchedule(res.id).then(ok => {
          console.log(`subcollection successfully created ${ok}`);
        }).catch(error => {
          console.log(error)
        })
        resetForm();
      })
        .catch((error) => {
          presentToast('top', 'Error al crear experto: ' + error.message, 'danger');
          console.error('Error creating expert: ', error);
        });
      addDoc(emailsExperts, { email: form.value.email })
        .catch((error) => {
          presentToast('top', 'Error al crear correo: ' + error.message, 'danger');
          console.error('Error creating email: ', error);
        });

    })
    .catch((error) => {
      presentToast('top', 'Error al crear usuario: ' + error.message, 'danger');
      console.error('Error creating user: ', error);
    });
};


const schedule = ref<Ischedule[]>([
  {
    day: "Lunes",
    slots: [
      { isAvailable: true, takenAt: null, takenBy: null, time: "9:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "10:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "11:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "12:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "13:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "14:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "15:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "16:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "17:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "18:00" },
    ]
  },
  {
    day: "Martes",
    slots: [

      { isAvailable: true, takenAt: null, takenBy: null, time: "9:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "10:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "11:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "12:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "13:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "14:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "15:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "16:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "17:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "18:00" }

    ]
  },
  {
    day: "Miercoles",
    slots: [
      { isAvailable: true, takenAt: null, takenBy: null, time: "9:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "10:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "11:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "12:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "13:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "14:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "15:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "16:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "17:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "18:00" }

    ]
  },
  {
    day: "Jueves",
    slots: [
      { isAvailable: true, takenAt: null, takenBy: null, time: "9:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "10:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "11:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "12:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "13:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "14:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "15:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "16:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "17:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "18:00" },
    ]
  },
  {
    day: "Viernes",
    slots: [
      { isAvailable: true, takenAt: null, takenBy: null, time: "9:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "10:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "11:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "12:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "13:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "14:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "15:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "16:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "17:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "18:00" },
    ]
  },
  {
    day: "Sábado",
    slots: [
      { isAvailable: true, takenAt: null, takenBy: null, time: "9:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "10:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "11:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "12:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "13:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "14:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "15:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "16:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "17:00" },
      { isAvailable: true, takenAt: null, takenBy: null, time: "18:00" }
    ]
  }
]);
//9 => 6 L=>S

const getDateSelected = (dayInfo: Ischedule, timeSelected: string) => {
  const slot = dayInfo.slots.find(slot => slot.time === timeSelected);
  if (slot) {
    slot.isAvailable = !slot.isAvailable; // Alterna el estado
  }
};




</script>

<style scoped>
ion-content {
  --background: #dadada;
}

/* Estilos personalizados para imitar el diseño iOS */
ion-input,
ion-textarea {
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

ion-card-header.expert-info {
  --background: #ffffff !important;
}
</style>
