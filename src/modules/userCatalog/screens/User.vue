<template>
    <div>
        <!-- {{ action }} -->
        <v-breadcrumbs
            class="!p-0 !py-2"
            :items="['Catalogs', 'Users']"
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
                        text="Add new"
                    />
                </v-btn>
            </template>
        </CCustomPagination>
        <div class="flex gap-2 shadow">
            <v-data-table
                :items-per-page="elementPerPage"
                :headers="headers"
                :items="userList"
                :search="search"
                item-value="name"
                :loading="loadingGrid"
                v-model:sort-by="sortBy"
            >
                <template
                    v-for="(header, i) in headers.filter(
                        (item) => item.key !== 'action' && showFilter
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

                <template v-slot:[`item.roleDescription`]="{ item }">
                    <div class="flex gap-1">
                        {{
                            item.roles.length <= 0
                                ? "No role"
                                : item.roles?.map((role) => role.rol).join(", ")
                        }}
                    </div>
                </template>

                <template v-slot:[`item.action`]="{ item }">
                    <div class="flex gap-1">
                        <CGenerationAction
                            :actions="[
                                {
                                    color: 'primaryBlue',
                                    handleAction: () => handleShowEdit(item),
                                    icon: 'mdi-pencil-outline',
                                    label: 'Edit User',
                                },
                                {
                                    color: 'red',
                                    handleAction: () =>
                                        handleShowDeleteDialog(item),
                                    icon: 'mdi-delete-outline',
                                    label: 'Delete User',
                                },
                            ]"
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
                                !showFilter ? 'Show filters' : 'Hide filters'
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
            :title="action === 'NEW' ? 'NEW USER' : 'EDIT USER'"
            textLoading="Loading...."
            v-model="showBottom"
            :persistent="true"
            :limit-size="false"
        >
            <PrivateCompanyForm :close-modal="closeModal"></PrivateCompanyForm>
        </CBottomSheet>
        <!-- END CUSTOM -->
        <CConfirmationDialog
            :title="dialogMessage.DELETE.title"
            :description="
                dialogMessage.DELETE.subtitle.replace(
                    '#username',
                    fields.username
                )
            "
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
import { useUser } from "../composables/useUser";
//Controles core
import {
    CCustomPagination,
    CGenerationAction,
    CCustomFilter,
} from "@core/index";

//Form
import PrivateCompanyForm from "../components/UserForm.vue";
import { onMounted, onUnmounted } from "vue";

const {
    search,
    totalCount,
    elementPerPage,
    page,
    showBottom,
    saving,
    userList,
    fields,
    showFilter,
    sortBy,
    headers,
    dialogMessage,
    action,
    showConfirmationDialog,
    fieldsFilter,
    loadingGrid,
    showFilterAction,
    closeModal,
    handleShowEdit,
    resetFields,
    handleShowDeleteDialog,
    FirstLoad,
} = useUser();

onMounted(async () => {
    await FirstLoad();
});
onUnmounted(() => {
    action.value = "INIT";
});
</script>
