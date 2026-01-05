<template>
    <router-view />
</template>
<script setup lang="ts">
import { onMounted } from "vue";
onMounted(async () => {
    document.body.className = "";
    
});
</script>

<style>
/* papa */
.v-table__wrapper table thead tr th {
    background-color: #29317d !important;
    color: white;
}

/* hijo */
.v-table__wrapper table tbody tr table thead tr th {
    background-color: rgba(35, 62, 132, 0.9) !important;
    color: white;
}

.v-table__wrapper table tbody tr table thead tr th:hover {
    color: white;
}

.v-data-table
    .v-table__wrapper
    > table
    > thead
    > tr
    > th.v-data-table__th--sortable:hover,
.v-data-table
    .v-table__wrapper
    > table
    tbody
    > tr
    > th.v-data-table__th--sortable:hover {
    color: white !important;
}
</style>
