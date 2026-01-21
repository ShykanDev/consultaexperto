<template>
    <div class="web-page min-h-screen bg-gray-50">
        <header
            class="web-header sticky top-0 z-40 w-full bg-white/80 backdrop-blur border-b border-gray-100 shadow-sm border-none shadow-none">
            <nav class="web-toolbar h-16 flex items-center px-4">
                <h1
                    class="web-title text-lg font-bold text-gray-900 font-poppins text-center bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-200">
                    Lista de usuarios</h1>
                <div class="web-buttons flex items-center space-x-2 order-first"><button
                        class="web-back-btn p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        @click="$router.back()"><v-icon name="hi-solid-chevron-left" scale="1.5" /></button></div>
            </nav>
        </header>
        <main class="web-content overflow-y-auto font-poppins">
            <div class="web-list divide-y divide-gray-100">
                <UserListCard v-for="user in users" :key="user.userId" :user="user" @userUpdated="getUsers()" />
            </div>
        </main>
    </div>
</template>

<script lang="ts" setup>

import { ref, onMounted } from 'vue';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import { IUser } from '@/interfaces/user/IUser';
import UserListCard from '@/components/Admin/UserListCard.vue';

const users = ref<IUser[]>([]);
const db = getFirestore();
const usersCollection = collection(db, 'users');
const getUsers = () => {
    users.value = [];
    getDocs(usersCollection).then((snapshot) => {
        snapshot.forEach((doc) => {
            const user = doc.data() as IUser;
            user.docId = doc.id;
            user.docRef = doc.ref;
            users.value.push(user);
        });
    });
}

onMounted(() => {
    getUsers();
});
</script>

<style scoped>
.web-page {
    background-color: #f9fafb;
}
</style>