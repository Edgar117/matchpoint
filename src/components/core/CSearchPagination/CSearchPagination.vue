<template>
    <!-- <div class="flex h-full justify-between items-center bg-white p-2 rounded-lg mb-4 shadow">
        <div class="flex w-full gap-1 items-center">
            <input v-model="search" type="text" class="bg-white border w-1/2 h-10 px-2 py-2 rounded-md text-sm"
                placeholder="Buscar..." name="" id="">
            <CButton @click="handleGetBySearch" color="confirm"
                class="w-fit gap-1 px-2 pr-3 h-10 flex justify-center items-center">
                <v-icon>mdi-magnify</v-icon>
                <p>Buscar</p>
            </CButton>
        </div>
        <div class="flex gap-2 items-center">
            <CButton @click="openDetail = true; action = 'NEW'" color="confirm"
                class="w-fit gap-1 px-2 pr-3 h-8 flex justify-center items-center">
                <v-icon>mdi-plus</v-icon>
                <p>Nuevo</p>
            </CButton>
            <CButton color="confirm" class="w-28 gap-1 px-2 pr-3 h-8 flex justify-center items-center">
                <v-icon>mdi-card-outline</v-icon>
                <p>full screen</p>
            </CButton>
            <select class="border rounded-lg p-1" name="" id="" v-model="elementPerPage">
                <option v-for="(item, i)  in [10, 25, 50, 100]" :value="item" :key="i">{{ item }}</option>
            </select>
            <v-pagination density="compact" v-model="page" :length="numberOfPage" rounded="0"></v-pagination>
        </div>
    </div> -->
    <div></div>
</template>

<script setup lang="ts">
// import { CButton } from '../'

// interface IProps {
//     search: string,
//     handleGetBySearch: () => void,
//     showDetail: boolean,

// }

// const props = withDefaults(defineProps<IProps>(), {
//     search: '',
//     handleGetBySearch: () => { },

// })

</script>