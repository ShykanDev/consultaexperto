<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ user.name || 'Usuario Desconocido' }}</ion-card-title>
      <ion-card-subtitle>
        {{ user.email || 'correo@ejemplo.com' }}
      </ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      <ion-list lines="none">
        <ion-item>
          <ion-label>
            <h3>ID de Usuario</h3>
            <p>{{ user.userId || 'ID no disponible' }}</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>Teléfono</h3>
            <p>{{ user.phone || 'No especificado' }}</p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>Edad</h3>
            <p>
              {{
                user.userAge
                  ? new Date(user.userAge).toLocaleDateString()
                  : 'No especificada'
              }}
            </p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>Estado</h3>
            <p>
              <ion-badge
                :color="user.isBanned ? 'danger' : user.isSuspended ? 'warning' : 'success'"
              >
                {{
                  user.isBanned
                    ? 'Baneado'
                    : user.isSuspended
                    ? 'Suspendido'
                    : 'Activo'
                }}
              </ion-badge>
            </p>
          </ion-label>
        </ion-item>

        <ion-item v-if="user.isBanned || user.isSuspended">
          <ion-label>
            <h3>Razón</h3>
            <p>
              {{
                user.isBanned
                  ? user.banReason || 'Sin razón especificada'
                  : user.suspendedReason || 'Sin razón especificada'
              }}
            </p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>Consultas Gratis</h3>
            <p>
              <ion-icon
                :icon="user.freeConsultations ? checkmarkCircle : closeCircle"
                :color="user.freeConsultations ? 'success' : 'medium'"
              ></ion-icon>
            </p>
          </ion-label>
        </ion-item>

        <ion-item>
          <ion-label>
            <h3>Términos Aceptados</h3>
            <p>
              <ion-icon
                :icon="user.terms ? checkmarkCircle : closeCircle"
                :color="user.terms ? 'success' : 'medium'"
              ></ion-icon>
            </p>
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-card-content>

    <ion-footer>
      <ion-toolbar>
        <ion-title size="small">
          Creado el:
          {{
            user.createdAt
              ? user.createdAt.toDate().toLocaleString()
              : 'Fecha no disponible'
          }}
        </ion-title>
      </ion-toolbar>
    </ion-footer>
  </ion-card>
</template>

<script setup lang="ts">
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonBadge,
  IonIcon,
  IonFooter,
  IonToolbar,
  IonTitle,
} from '@ionic/vue';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import { reactive } from 'vue';
import { IUser } from '@/interfaces/user/IUser';


// Props con valores por defecto
const props = defineProps({
    user: {
        type: Object as () => IUser,
        required: true
    }
});

// User reactivo
const user = reactive<IUser>(props.user);
</script>

<style scoped>
ion-card {
  margin: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

ion-badge {
  font-size: 0.8em;
}

ion-icon {
  font-size: 1.2em;
}
</style>
