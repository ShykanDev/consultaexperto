<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Expert View Fixed </ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <span>{{ scheduleSorted }}</span>
        </ion-content>
    </ion-page>
</template>

<script lang="ts" setup>
import systemStore from '@/store/system';
import { onIonViewDidEnter } from '@ionic/vue';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import {IonPage, IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/vue';
import {computed, ref} from 'vue'

const sysStore = systemStore();
const db = getFirestore()

const scheduleRaw = ref<any[]>([])

const sortedDays = ['monday','tuesday','wednesday','thursday','friday']

const scheduleSorted = computed(() => {
  return sortedDays
    .map(day => scheduleRaw.value.find(item => item.day === day))
    .filter(Boolean)
})

onIonViewDidEnter(async () => {
  const expertsCollection = collection(db, `experts/${sysStore.getSelectedExpertUid}/schedule`)
  const querySnapshot = await getDocs(expertsCollection)

  scheduleRaw.value = querySnapshot.docs.map(doc => ({
    day: doc.id,
    ...doc.data()
  }))
})

</script>


<style scoped></style>