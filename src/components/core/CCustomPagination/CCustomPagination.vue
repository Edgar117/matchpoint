<template>
    <v-card
        class="flex flex-col md:flex-row h-full justify-between items-center bg-white p-2 mb-4 overflow-x-auto"
    >
        <div class="flex w-full gap-1 items-center">
            <slot name="search" />
        </div>
        <div class="flex gap-1 items-center">
            <div
                :class="[
                    { invisible: hideCountAndPagination },
                    { visible: hideCountAndPagination },
                ]"
                class="flex items-center"
            >
                <div class="w-[350px] text-end text-sm text-gray-600">
                    {{ paginationDescription }}
                </div>

                <v-pagination
                    rounded="4"
                    density="compact"
                    v-model="pageValue"
                    :length="numberOfPage"
                    show-first-last-page
                    total-visible="1"
                >
                    <template v-slot:first="{ onClick, disabled }">
                        <button
                            type="button"
                            class="cursor-pointer v-btn v-btn--icon v-theme--light v-btn--density-compact rounded-4 v-btn--size-default v-btn--variant-text"
                            @click="onClick"
                            :class="{ 'v-btn--disabled': disabled }"
                        >
                            <v-icon class="v-btn__content">{{
                                "mdi-chevron-double-left"
                            }}</v-icon>
                            <v-tooltip
                                activator="parent"
                                location="top"
                                max-width="300px"
                                >{{
                                    $t("generales.paginacion.first")
                                }}</v-tooltip
                            >
                            <span class="v-btn__underlay"></span>
                            <span class="v-btn__overlay"></span>
                        </button>
                    </template>
                    <template v-slot:item="{ props }">
                        <v-autocomplete
                            variant="outlined"
                            class="w-20 custom-select"
                            hide-details
                            v-bind="props"
                            density="compact"
                            v-model="pageValue"
                            label="Página"
                            @input="handleInput"
                            auto-select-first
                            :items="
                                Array.from(
                                    { length: numberOfPage },
                                    (_, index) => index + 1
                                )
                            "
                        ></v-autocomplete>
                    </template>
                    <template v-slot:last="{ onClick, disabled }">
                        <button
                            type="button"
                            class="cursor-pointer v-btn v-btn--icon v-theme--light v-btn--density-compact rounded-4 v-btn--size-default v-btn--variant-text"
                            @click="onClick"
                            :class="{ 'v-btn--disabled': disabled }"
                        >
                            <span class="v-btn__underlay"></span>
                            <span class="v-btn__overlay"></span>
                            <span class="v-btn__content">
                                <v-icon>{{
                                    "mdi-chevron-double-right"
                                }}</v-icon>
                                <v-tooltip
                                    activator="parent"
                                    location="top"
                                    max-width="300px"
                                    >{{
                                        $t("generales.paginacion.last")
                                    }}</v-tooltip
                                >
                            </span>
                        </button>
                    </template>
                </v-pagination>
                <v-select
                    variant="outlined"
                    class="w-24"
                    hide-details
                    density="compact"
                    v-model="elementPerPage"
                    item-title="text"
                    item-value="value"
                    :items="
                        [
                            { text: '10', value: 10 },
                            { text: '25', value: 25 },
                            { text: '50', value: 50 },
                            { text: '100', value: 100 },
                            { text: '200', value: 200 },
                            addUseAll && { text: 'Todos', value: -1 },
                        ].filter((item) => item)
                    "
                ></v-select>
            </div>

            <v-divider inset vertical class="border-opacity-100"></v-divider>
            <slot name="actions" />
        </div>
    </v-card>
</template>

<script lang="ts" setup>
import { watch } from "vue";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

// const elementPerPage = ref(10);

export interface IProps {
    totalCount: number;
    page: number;
    hideCountAndPagination: boolean;
    addUseAll: boolean;
    elementPerPage: number;
}
const emit = defineEmits(["update:page", "update:elementPerPage"]);
const props = withDefaults(defineProps<IProps>(), {
    totalCount: 0,
    page: 1,
    hideCountAndPagination: false,
    addUseAll: false,
    elementPerPage: 10,
});

const elementPerPage = computed({
    get() {
        return props.elementPerPage;
    },
    set(value: number) {
        emit("update:elementPerPage", value);
    },
});

const paginationDescription = computed(() => {
    const start = (pageValue.value - 1) * elementPerPage.value + 1;
    const end = Math.min(start + elementPerPage.value - 1, props.totalCount);
    return t("generales.paginacion.paginacionDescripcion", [
        start,
        end,
        props.totalCount,
    ]);
});

const pageValue = computed({
    get() {
        return props.page;
    },
    set(value: number) {
        if (value > 0 && value <= numberOfPage.value) {
            emit("update:page", value);
        }
    },
});

watch(elementPerPage, () => {
    emit("update:page", 1);
    emit("update:elementPerPage", elementPerPage.value);
});

const numberOfPage = computed(() => {
    return Math.ceil(props.totalCount / elementPerPage.value);
});

const handleInput = () => {
    if (!pageValue.value) {
        pageValue.value = 1;
    }
};
</script>

<style scoped>
.custom-select {
    height: 20px;
    position: relative;
    bottom: 7px;
}
</style>
