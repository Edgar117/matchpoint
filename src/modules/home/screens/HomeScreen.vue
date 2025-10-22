<template>
    <div>Segunda screen</div>
    <p> Bienvenido : {{ user?.user.fullName }}</p>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useLoginStore } from '../../login/store/state'
const { user } = storeToRefs(useLoginStore());
</script>
