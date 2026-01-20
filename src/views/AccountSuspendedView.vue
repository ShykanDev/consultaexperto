<template>
  <ion-page>
    <ion-content class="ion-padding" color="light">
      <div class="flex flex-col items-center justify-center min-h-screen p-6 animate-fade-in">
        
        <!-- Icon Container -->
        <div class="mb-8 relative">
          <div class="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center shadow-inner ring-4 ring-blue-100 animate__animated animate__pulse animate__infinite">
            <ion-icon :icon="shieldOutline" class="text-6xl text-blue-600"></ion-icon>
          </div>
          <div class="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
            <ion-icon :icon="alertCircle" class="text-2xl text-red-500"></ion-icon>
          </div>
        </div>

        <!-- Text Content -->
        <div class="space-y-4 max-w-sm">
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight font-manrope">
            Cuenta Suspendida
          </h1>
          
          <div class="h-1 w-20 bg-blue-600 mx-auto rounded-full"></div>

          <p class="text-lg text-gray-600 font-medium leading-relaxed font-poppins">
            Se ha detectado un incumplimiento de nuestras 
            <span class="text-blue-600 font-bold">Políticas de Privacidad</span> 
            y términos de servicio.
          </p>

          <p class="text-sm text-gray-400 font-manrope">
            Como medida de seguridad, el acceso a tu cuenta ha sido restringido indefinidamente.
          </p>
        </div>

        <!-- Action Buttons -->
        <div class="mt-12 w-full max-w-xs space-y-4">
          <ion-button 
            expand="block" 
            mode="ios" 
            class="ios-blue-button h-14 font-bold text-lg shadow-lg"
            router-link="/help"
          >
            Contactar Soporte
            <ion-icon slot="end" :icon="mailOutline"></ion-icon>
          </ion-button>

          <ion-button 
            expand="block" 
            fill="clear" 
            mode="ios" 
            class="font-semibold text-gray-500"
            @click="handleReturn"
          >
            Volver al inicio
          </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { auth } from '@/firebase';
import { 
  IonPage, 
  IonContent, 
  IonIcon, 
  IonButton, 
  useIonRouter
} from '@ionic/vue';
import { 
  shieldOutline, 
  alertCircle, 
  mailOutline,
  chevronBackOutline
} from 'ionicons/icons';

const router = useIonRouter();



const authFirebase = auth;
const handleReturn = () => {
  authFirebase.signOut();
  router.navigate('/', 'root', 'replace');
};
</script>

<style scoped>
.font-manrope {
  font-family: 'Manrope', sans-serif;
}

.font-poppins {
  font-family: 'Poppins', sans-serif;
}

.ios-blue-button {
  --background: #007AFF;
  --background-activated: #0062cc;
  --border-radius: 14px;
  --box-shadow: 0 4px 12px rgba(0, 122, 255, 0.3);
  text-transform: none;
  letter-spacing: -0.5px;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Base styles for premium feel */
ion-content {
  --background: #fbfbfd; /* Apple's off-white */
}

h1 {
  color: #1d1d1f; /* Apple's dark text */
}

p {
  color: #86868b; /* Apple's secondary text */
}
</style>
