<template>
    <div>
        <!-- {{ action }} -->
        <v-breadcrumbs
            class="!p-0 !py-2"
            :items="['Catalogos', 'Equipo']"
        ></v-breadcrumbs>
        <AsignacionEquipos
            v-model="showBottomAsignacionJugadores"
            :equipo-nombre="fields.nombre"
        ></AsignacionEquipos>
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
                :items="equipoList"
                :search="search"
                item-value="name"
                :loading="loadingGrid"
                v-model:sort-by="sortBy"
            >
                <template
                    v-for="(header, i) in headers.filter(
                        (item:any) =>
                            item.key !== 'action' &&
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
                                    handleAction: () =>
                                        handleShowAsignacionJugadores(item),
                                    icon: 'mdi-account-multiple-plus',
                                    label: 'Asignar Jugadores',
                                },
                                {
                                    color: 'primaryBlue',
                                    handleAction: () => handleShowEdit(item),
                                    icon: 'mdi-pencil-outline',
                                    label: 'Editar Equipo',
                                },
                                {
                                    color: 'red',
                                    handleAction: () =>
                                        handleShowDeleteDialog(item),
                                    icon: 'mdi-delete-outline',
                                    label: 'Eliminar Equipo',
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
                            :src="`${URLS.COTBUILDER}/api/Equipo/logo/${item.equipoId}/${item.logo}`"
                        />
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
            title="Equipo"
            textLoading="Loading...."
            v-model="showBottom"
            :persistent="true"
            :limit-size="true"
        >
            <EquipoForm :close-modal="closeModal"></EquipoForm>
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
import { useEquipo } from "../composables/useEquipo";
//Controles core
import {
    CCustomPagination,
    CGenerationAction,
    CCustomFilter,
} from "@core/index";

import { URLS } from "@/helpers/constants";

//Form
import EquipoForm from "../components/EquipoForm.vue";
//Formulario de asignacion
import AsignacionEquipos from "../components/PlayerManagement.vue";

const {
    search,
    totalCount,
    elementPerPage,
    page,
    showBottom,
    saving,
    closeModal,
    equipoList,
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
    fields,
    showBottomAsignacionJugadores,
    handleShowAsignacionJugadores,
    showFilterAction,
} = useEquipo();
</script>
