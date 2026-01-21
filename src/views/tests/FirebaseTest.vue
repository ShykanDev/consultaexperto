<template>
  <div class="web-page min-h-screen bg-gray-50 p-4">
    <div class="flex p-1 bg-gray-100 rounded-xl mb-4">
      <button class="flex-1 py-2 text-sm font-bold rounded-lg transition-all" value="users">
        <div class="web-label flex-1">Users</div>
      </button>
      <button class="flex-1 py-2 text-sm font-bold rounded-lg transition-all" value="experts">
        <div class="web-label flex-1">Experts</div>
      </button>
    </div>

    <div id="users">
      <main class="web-content overflow-y-auto">
        <div class="font-bold text-lg mb-4">Testing Get Users (When user is auth)</div>
        <div class="flex gap-2 mb-4">
          <button class="web-btn bg-blue-600 text-white px-4 py-2 rounded-lg" @click="getUsers">Get Users</button>
          <button class="web-btn bg-blue-600 text-white px-4 py-2 rounded-lg" @click="getSelfUser">Get Self
            User</button>
        </div>

        <div class="space-y-4">
          <div>
            <p class="font-bold">Users Data</p>
            <p class="text-red-500 text-sm">If data is present here, then firebase is still allowing user to fetch info
              that is not allowed (error is expected)</p>
            <div v-if="usersData.length > 0" class="text-white bg-red-600 p-3 rounded-xl mt-2">
              Users found: You should not be able to see this, check firebase rules
              <ul class="mt-2 list-disc pl-5">
                <li v-for="user in usersData" :key="user.userId">
                  {{ user.name }} - {{ user.email }}
                </li>
              </ul>
            </div>
          </div>

          <div>
            <p class="font-bold">Self User Data</p>
            <p class="text-red-600 text-sm">If user can't fetch this data, then firebase is not allowing user to fetch
              info that is not allowed (info is expected)</p>
            <div class="text-white bg-red-600 p-3 rounded-xl mt-2" v-if="userSelfData">
              User Data: {{ userSelfData }}
            </div>
          </div>
        </div>
      </main>
    </div>

    <div class="mt-8" id="experts">
      <h2 class="font-bold">Experts</h2>
      <p>Experts testing section...</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { ref } from 'vue';
import { IUser } from '@/interfaces/user/IUser';
import { useToast } from 'vue-toastification';

const toast = useToast();
const usersData = ref<IUser[]>([]);
const userSelfData = ref<IUser | null>(null);

const db = getFirestore();
const usersCollection = collection(db, 'users');

const getUsers = () => {
  usersData.value = [];
  getDocs(usersCollection).then((snapshot) => {
    usersData.value = snapshot.docs.map((doc) => ({ ...doc.data() as IUser, userId: doc.id }));
    toast.success('Usuarios obtenidos correctamente');
  }).catch((error) => {
    console.error(`Error al obtener los usuarios: ${error}`);
    toast.error('Error al obtener los usuarios: ' + error.message);
  });
}

const getSelfUser = () => {
  // Logic for self user
  toast.info('Feature post-migration');
}
</script>
