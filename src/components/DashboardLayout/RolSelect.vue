<template>
    <div class="text-center pa-4">
        <v-btn
            :disabled="dialog"
            color="primary"
            text="Start loading"
            @click="dialog = true"
            size="large"
            icon="mdi-account-key-outline"
        >
            <v-icon size="x-large"> mdi-account-key-outline </v-icon>
            <v-tooltip activator="parent" location="bottom"
                >Change Role Asig</v-tooltip
            >
        </v-btn>
        <v-dialog v-model="dialog" width="350" persistent>
            <v-card
                max-width="4000"
                prepend-icon="mdi-account-key-outline"
                title="Choose a role to work"
            >
                <!-- {{ user?.rolesUser }} -->
                <v-autocomplete
                    hide-details
                    v-model="NewRoleId"
                    label="Role"
                    :items="user?.rolesUser"
                    item-title="rol"
                    item-value="roleId"
                    compact
                    class="mr-2 ml-2"
                ></v-autocomplete>
                <!-- </div> -->

                <v-card-actions class="my-2 gap-4 d-flex justify-end">
                    <div class="flex flex-row justify-end gap-4">
                        <v-btn
                            class="ms-auto"
                            text="Cancel"
                            @click="
                                dialog = false;
                                NewRoleId = roleSelectId;
                            "
                            color="red"
                        ></v-btn>
                        <v-btn
                            class="ms-auto"
                            text="Save"
                            color="primary"
                            variant="flat"
                            @click="
                                roleSelectId = NewRoleId;
                                dialog = false;
                            "
                        ></v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref, onMounted } from "vue";
import { useUserGlobal } from "../../store/userGlobal";
const { roleSelectId } = storeToRefs(useUserGlobal());

import { getCurrentUser } from "../../helpers/localstorageHandler";
import { useLoginStore } from "../../modules/login/store/state";
import vuetify from "@/plugins/vuetify";
const value = getCurrentUser();
const { user } = storeToRefs(useLoginStore());
if (value) {
    user.value = JSON.parse(value);
}

const NewRoleId = ref(0);
const dialog = ref(false);
interface IProps {
    show: boolean;
    title: string;
    closeModal: () => void;
    handleEvent: (text: any) => void;
}
const props = withDefaults(defineProps<IProps>(), {
    show: false,
    title: "",
    closeModal: () => {},
    handleEvent: () => {},
});
onMounted(() => {
    //Asignamos el rol actual al combo
    // console.log(user.value?.rolesUser[0].roleId )
    NewRoleId.value = user.value?.rolesUser[0].roleId ?? 0;
    roleSelectId.value = user.value?.rolesUser[0].roleId ?? 0;
});
</script>
