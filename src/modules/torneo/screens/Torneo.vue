<template>
    <div>
        <!-- {{ action }} -->
        <v-breadcrumbs
            class="!p-0 !py-2"
            :items="['Catalogos', 'Torneo']"
        ></v-breadcrumbs>
        <CCustomPagination
            v-model:page="page"
            v-model:elementPerPage="elementPerPage"
            :total-count="totalCount"
        >
            <template v-slot:search>
                <input
                    v-model="search"
                    type="text"
                    class="bg-white border w-full md:w-1/2 h-10 px-2 py-2 rounded-md text-sm"
                    placeholder="Search..."
                    name=""
                    id=""
                />
            </template>
            <template v-slot:actions>
                <v-btn
                    icon
                    elevation="0"
                    @click="
                        resetFields();
                        action = 'NEW';
                        showBottom = true;
                    "
                >
                    <v-icon color="primaryBlue"
                        >mdi-text-box-plus-outline</v-icon
                    >
                    <v-tooltip
                        activator="parent"
                        location="bottom"
                        text="Agregar Nuevo"
                    />
                </v-btn>
            </template>
        </CCustomPagination>
        <div class="flex gap-2 shadow">
            <v-data-table
                :items-per-page="elementPerPage"
                :headers="headers"
                :items="torneoList"
                :search="search"
                item-value="name"
                :loading="loadingGrid"
                v-model:sort-by="sortBy"
            >
                <template
                    v-for="(header, i) in headers.filter(
                        (item) =>
                            item.key !== 'action' &&
                            item.key !== 'logo' &&
                            showFilter
                    )"
                    v-slot:[`header.${header.key}`]
                    :key="i"
                >
                    <CCustomFilter
                        v-model="(fieldsFilter as any)[header.key]"
                        :show-filter="showFilter"
                        :header="header"
                        :sortBy="sortBy"
                    />
                </template>
                <template v-slot:[`item.action`]="{ item }">
                    <div class="flex gap-1">
                        <CGenerationAction
                            :actions="[
                                {
                                    color: 'primaryBlue',
                                    handleAction: () => handleShowEdit(item),
                                    icon: 'mdi-pencil-outline',
                                    label: 'Editar Torneo',
                                },
                                {
                                    color: 'red',
                                    handleAction: () =>
                                        handleShowDeleteDialog(item),
                                    icon: 'mdi-delete-outline',
                                    label: 'Eliminar Torneo',
                                },
                            ]"
                        />
                    </div>
                </template>

                <template v-slot:[`item.logo`]="{ item }">
                    <div class="flex gap-1">
                        <img
                            width="50"
                            height="50"
                            :src="`${URLS.COTBUILDER}/api/Torneo/logo/${item.torneoId}/${item.logo}`"
                        />
                    </div>
                </template>

                <template v-slot:[`item.esPublico`]="{ item }">
                    <div class="flex gap-1">
                        <v-icon
                            :icon="item.esPublico ? 'mdi-earth' : 'mdi-lock'"
                        />
                    </div>
                </template>

                <template v-slot:[`item.fechaInicio`]="{ item }">
                    <div class="flex gap-1">
                      {{ item.fechaInicio ? new Date(item.fechaInicio).toISOString().split("T")[0] : 'Sin fecha Inicio' }}
                    </div>
                </template>

                <template v-slot:[`item.fechaFin`]="{ item }">
                    <div class="flex gap-1">
                        {{ item.fechaFin ? new Date(item.fechaFin).toISOString().split("T")[0] : 'Sin fecha Fin' }}
                    </div>
                </template>

                <template v-slot:[`header.action`]>
                    <v-btn @click="showFilterAction" icon>
                        <v-icon color="white">{{
                            showFilter
                                ? "mdi-filter-remove-outline"
                                : "mdi-filter-plus-outline"
                        }}</v-icon>
                        <v-tooltip
                            activator="parent"
                            location="bottom"
                            :text="
                                !showFilter
                                    ? 'Mostrar Filtros'
                                    : 'Ocultar Filtros'
                            "
                        />
                    </v-btn>
                </template>
                <!-- Footer invisible -->
                <template #bottom></template>

                <template v-slot:loading>
                    <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                </template>
            </v-data-table>
        </div>

        <!-- bottomsheet -->
        <CBottomSheet
            :isLoading="saving"
            title="Torneo"
            textLoading="Loading...."
            v-model="showBottom"
            :persistent="true"
            :limit-size="true"
        >
            <TorneoForm :close-modal="closeModal"></TorneoForm>
        </CBottomSheet>
        <!-- END CUSTOM -->
        <CConfirmationDialog
            :title="dialogMessage.DELETE.title"
            :description="dialogMessage.DELETE.subtitle"
            v-model="showConfirmationDialog"
            size="lg"
        >
            <template #action>
                <CButton
                    @click="
                        () => {
                            showConfirmationDialog = false;
                        }
                    "
                    color="cancel"
                    variant="text"
                    >Cancel</CButton
                >
                <CButton
                    @click="dialogMessage.DELETE.onClick"
                    :color="action === 'DELETE' ? 'confirm' : 'confirm'"
                    >{{ dialogMessage.DELETE.textButton }}
                </CButton>
            </template>
        </CConfirmationDialog>
    </div>
</template>
<script setup lang="ts">
//COT-UI-LIB
import { CBottomSheet, CButton, CConfirmationDialog } from "@core/index";
import { useTorneo } from "../composables/useTorneo";
//Controles core
import {
    CCustomPagination,
    CGenerationAction,
    CCustomFilter,
} from "@core/index";

import { URLS } from "@/helpers/constants";

//Form
import TorneoForm from "../components/TorneoForm.vue";

const {
    search,
    totalCount,
    elementPerPage,
    page,
    showBottom,
    saving,
    closeModal,
    torneoList,
    showFilter,
    sortBy,
    headers,
    handleShowEdit,
    resetFields,
    handleShowDeleteDialog,
    dialogMessage,
    action,
    showConfirmationDialog,
    fieldsFilter,
    loadingGrid,
    showFilterAction,
    showBottomAsignacion,
} = useTorneo();
</script>
