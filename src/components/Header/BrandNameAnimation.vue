<template>
    <div class="">
        <span class="animate-fade" v-for="(name, index) in currentName" :key="index">{{ name }}</span>
    </div>
</template>

<script lang="ts" setup>

import { ref, onMounted, onUnmounted } from 'vue';
const names = ref(
    [
        ['consulta', 'gratis', 'en', 'linea', '.com'],
        ['consulta', 'experto','.com'],
        ['consulta', 'especializada','.com']
    ]
)

const currentName = ref(names.value[0]);

let timeoutId: NodeJS.Timeout | null = null;
const changeName = () => {
    //validate if is there an active animation 
    if(timeoutId){
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * names.value.length);
        currentName.value = names.value[randomIndex];
    }, 2000);
}

onMounted(() => {
    changeName();
})

onUnmounted(() => {
    if(timeoutId){
        clearTimeout(timeoutId);
    }
})

</script>

<style scoped>

</style>