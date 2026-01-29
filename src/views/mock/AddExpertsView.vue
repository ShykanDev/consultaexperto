<template>
    <div class="p-8 min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 mx-auto max-w-4xl">
        <div class="bg-white p-8 rounded-xl shadow-md">
            <h1 class="mb-6 text-3xl font-bold text-gray-800">Mock Add Experts View</h1>
            <button
                class="px-4 py-2 font-bold text-white bg-blue-500 rounded transition duration-150 ease-in-out hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                @click="addUserToFirebase">
                Agregar
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { addDoc, Timestamp, getFirestore, collection, getDocs } from 'firebase/firestore';
import { onMounted } from 'vue';

const db = getFirestore();
const usersCollection = collection(db, 'MockExperts');

const addUserToFirebase = async () => {
    try {
        const userDocData = await addDoc(usersCollection, {
            userUid: 'unique_id_carlos_beltran',
            name: 'Carlos Ignacio Beltrán',
            email: 'carlos.beltran.web@example.com',
            bio: 'Desarrollador web con más de 8 años de experiencia...',
            isSuspended: false,
            isBanned: false,
            suspensionReason: '',
            specialty: 'Servicios Web',
            profesionalId: '87654321',
            experienceYears: 8,
            createdAt: new Date(),
            rating: 4.7,
            totalRatings: 19,
            completedSessions: 143,
        });
        // subcollections logic omitted for brevity in mock
        console.log('Experto agregado exitosamente');
    } catch (error) {
        console.error(`Error al agregar experto a Firebase: ${error}`);
    }
}

const getMockExperts = async () => {
    const querySnapshot = await getDocs(usersCollection);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, ' => ', doc.data().specialty, doc.data().name);
    });
}

onMounted(() => {
    getMockExperts();
})
</script>
