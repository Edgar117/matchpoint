<template>
    <v-menu location="bottom center" offset="15">
        <template v-slot:activator="{ props }">
            <v-btn @click="newNotification = false" icon v-bind="props">
                <v-badge v-if="newNotification" color="error" dot>
                    <v-icon>mdi-bell-outline</v-icon>
                </v-badge>
                <v-icon v-else>mdi-bell-outline</v-icon>
            </v-btn>
        </template>

        <div
            class="bg-white p-6 rounded-lg border w-[500px] h-[500px] overflow-y-auto flex flex-col items-start justify-start">
            <div class="h-full w-full">
                <div class="mb-4">
                    <h2 class="font-semibold text-lg">Notificaciones</h2>
                </div>

                <div :class="[
                    {
                        'h-full w-full flex items-center justify-center':
                            isLoading,
                    },
                ]">
                    <!-- <v-progress-circular v-if="notifications.length > 0" :size="50" width="2" color="primary"
                        indeterminate></v-progress-circular> -->

                    <div v-if="notifications.length === 0" class="h-52 text-center flex items-center justify-center">
                        No hay notificaciones
                    </div>
                    <div v-else v-for="(item, n) in notifications" :key="n"
                        class="flex gap-2 hover:bg-slate-100 p-3 rounded-lg cursor-default hover:transition-all hover:duration-300 hover:ease-in-out">
                        <img class="rounded-full w-10 h-10 mx-auto object-cover cursor-pointer" :src="item.img" alt="" />

                        <div class="flex flex-col gap-1 w-full">
                            <p class="text-xs font-semibold">
                                Vue-Labs
                            </p>
                            <p class="text-xs">
                                {{ item.message }}
                            </p>
                            <div class="flex justify-end">
                                <p class="text-[10px] font-semibold">
                                    {{ moment.utc(item.date).fromNow() }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </v-menu>
</template>

<script setup lang="ts">
import { useTemplateUI } from "@/store/templateUI";
import { storeToRefs } from "pinia";
import moment from 'moment'
import { ref } from "vue";

const { notifications, newNotification } = storeToRefs(useTemplateUI())

const isLoading = ref(true);
setTimeout(() => {
    isLoading.value = false;
}, 5000);
</script>
