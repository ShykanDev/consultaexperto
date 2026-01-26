<template>
    <div class="web-page min-h-screen bg-gray-50">

        <section class="web-content overflow-y-auto font-poppins mt-28">
            <div class="web-list divide-y divide-gray-100">
                <UserListCard v-for="user in users" :key="user.userId" :user="user" @userUpdated="getUsers()" />
            </div>
        </section>
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