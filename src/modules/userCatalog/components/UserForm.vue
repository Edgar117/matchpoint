<template>
    <div class="py-4 h-full flex flex-col justify-between">
        <div>
            <!-- {{ fields }} -->
            <Field
                name="companyName"
                v-model="fields.username"
                rules="required|max:100"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.username"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="User Name"
                    counter="50"
                ></v-text-field>
            </Field>
            <div class="w-full grid grid-cols-8 gap-3 mb-4">
                <div class="col-span-4">
                    <Field
                        name="firstName"
                        v-model="fields.name"
                        rules="required|max:100"
                        v-slot="{ field, errorMessage, handleBlur }"
                    >
                        <v-text-field
                            v-model="fields.name"
                            v-bind="field"
                            :error-messages="errorMessage"
                            @blur="handleBlur"
                            density="compact"
                            label="First Name"
                            counter="100"
                        ></v-text-field>
                    </Field>
                </div>
                <div class="col-span-4">
                    <Field
                        name="lastName"
                        v-model="fields.lastName"
                        rules="required|max:100"
                        v-slot="{ field, errorMessage, handleBlur }"
                    >
                        <v-text-field
                            v-model="fields.lastName"
                            v-bind="field"
                            :error-messages="errorMessage"
                            @blur="handleBlur"
                            density="compact"
                            label="Last Name"
                            counter="100"
                        ></v-text-field>
                    </Field>
                </div>
            </div>
            <div class="w-full grid grid-cols-8 gap-3 mb-4">
                <div class="col-span-4">
                    <Field
                        name="socialNumber"
                        v-model="fields.socialNumber"
                        rules="required|max:50"
                        v-slot="{ field, errorMessage, handleBlur }"
                    >
                        <v-text-field
                            v-model="fields.socialNumber"
                            v-bind="field"
                            :error-messages="errorMessage"
                            @blur="handleBlur"
                            density="compact"
                            label="Social Securiry Number"
                            counter="50"
                        ></v-text-field>
                    </Field>
                </div>
                <div class="col-span-4">
                    <CDatePicker
                        locale="es"
                        placeholder="Date Of Birth"
                        v-model="fields.birthDay"
                        :enable-time-picker="false"
                    ></CDatePicker>
                </div>
            </div>
            <div class="w-full grid grid-cols-8 gap-3 mb-4">
                <div class="col-span-3">
                    <Field
                        name="telephoneNumber"
                        v-model="fields.telephoneNumber"
                        rules="required|max:12"
                        v-slot="{ field, errorMessage, handleBlur }"
                    >
                        <v-text-field
                            v-model="fields.telephoneNumber"
                            v-bind="field"
                            type="number"
                            :error-messages="errorMessage"
                            @blur="handleBlur"
                            density="compact"
                            label="Phone Number"
                            counter="12"
                        ></v-text-field>
                    </Field>
                </div>
                <div class="col-span-5">
                    <Field
                        name="email"
                        v-model="fields.email"
                        rules="required|max:50|email"
                        v-slot="{ field, errorMessage, handleBlur }"
                    >
                        <v-text-field
                            v-model="fields.email"
                            v-bind="field"
                            :error-messages="errorMessage"
                            @blur="handleBlur"
                            density="compact"
                            label="Email"
                            type="email"
                            counter="50"
                        ></v-text-field>
                    </Field>
                </div>
            </div>
            <Field
                name="mailingAddress"
                v-model="fields.mailingAddress"
                v-slot="{ field, errorMessage, handleBlur }"
            >
                <v-text-field
                    v-model="fields.mailingAddress"
                    v-bind="field"
                    :error-messages="errorMessage"
                    @blur="handleBlur"
                    density="compact"
                    label="Mailing Address"
                    type="email"
                    counter="50"
                ></v-text-field>
            </Field>

            <div class="w-full grid grid-cols-12 gap-2 mb-4">
                <div class="col-span-4">
                    <v-text-field
                        v-model="fields.country"
                        density="compact"
                        label="Country"
                        type="email"
                        counter="50"
                    ></v-text-field>
                    <!-- <v-autocomplete
                        hide-details
                        density="compact"
                        label="Country"
                        :items="countryList"
                        item-title="country_name"
                        item-value="country_name"
                        compact
                        v-model="fields.country"
                        @update:modelValue="() => handleSelectState()"
                    ></v-autocomplete> -->
                </div>
                <div class="col-span-4">
                    <!-- <v-autocomplete
                        hide-details
                        density="compact"
                        label="State"
                        :items="stateList"
                        item-title="state_name"
                        item-value="state_name"
                        compact
                        v-model="fields.state"
                        @update:modelValue="() => handleSelectCity()"
                        :loading="loadingState"
                    ></v-autocomplete> -->
                    <v-text-field
                        v-model="fields.state"
                        density="compact"
                        label="State"
                        type="email"
                        counter="50"
                    ></v-text-field>
                </div>
                <div class="col-span-4">
                    <!-- <v-autocomplete
                        hide-details
                        density="compact"
                        label="City"
                        :items="cityList"
                        item-title="city_name"
                        item-value="city_name"
                        compact
                        v-model="fields.city"
                        :loading="loadingCity"
                    ></v-autocomplete> -->
                    <v-text-field
                        v-model="fields.city"
                        density="compact"
                        label="City"
                        type="email"
                        counter="50"
                    ></v-text-field>
                </div>
            </div>
            <div class="w-full grid grid-cols-8 gap-3 mb-4">
                <div class="col-span-3">
                    <Field
                        name="zip"
                        v-model="fields.zip"
                        rules="required|max:50"
                        v-slot="{ field, errorMessage, handleBlur }"
                    >
                        <v-text-field
                            v-model="fields.zip"
                            v-bind="field"
                            :error-messages="errorMessage"
                            @blur="handleBlur"
                            density="compact"
                            label="ZIP"
                            counter="50"
                        ></v-text-field>
                    </Field>
                </div>
                <div class="col-span-5">
                    <v-autocomplete
                        hide-details
                        density="compact"
                        label="Role"
                        :items="userRoles"
                        item-title="description"
                        item-value="roleId"
                        compact
                        v-model="fields.rol"
                        multiple
                    ></v-autocomplete>
                </div>
            </div>
            <span>Bank Information</span>

            <div
                class="bg-green-300 rounded-lg"
                v-for="item in fields.banks"
                v-bind:key="item.bankUserId"
            >
                <div class="w-full grid grid-cols-12 gap-2 mb-4">
                    <div class="col-span-3 flex flex-col">
                        <span class="font-bold ml-2">Bank Name</span>
                        <span class="ml-2">{{ item.nameBank }}</span>
                    </div>
                    <div class="col-span-3 flex flex-col">
                        <span class="font-bold ml-2">Account Number</span>
                        <span class="ml-2">{{ item.accountNumber }}</span>
                    </div>
                    <div class="col-span-3 flex flex-col">
                        <span class="font-bold ml-2">Type</span>
                        <span class="ml-2">{{ item.typeDesc }}</span>
                    </div>
                    <div class="col-span-3 flex flex-col">
                        <div class="flex flex-row gap-2 mt-1">
                            <v-btn
                                variant="plain"
                                size="large"
                                density="compact"
                                icon="mdi-pencil-outline"
                                @click="editBank(item)"
                                color="black"
                            ></v-btn>
                            <v-btn
                                variant="plain"
                                size="large"
                                density="compact"
                                @click="deleteBank(item)"
                                color="black"
                                icon="mdi-trash-can-outline"
                            ></v-btn>
                        </div>
                    </div>
                </div>
            </div>

            <div class="w-full grid grid-cols-12 gap-3 mb-4">
                <div class="col-span-3">
                    <v-text-field
                        v-model="bankInformation.nameBank"
                        density="compact"
                        label="Bank Name"
                        counter="50"
                    ></v-text-field>
                </div>
                <div class="col-span-3">
                    <v-text-field
                        v-model="bankInformation.accountNumber"
                        density="compact"
                        label="Account Number"
                        counter="50"
                    ></v-text-field>
                </div>
                <div class="col-span-3">
                    <v-autocomplete
                        hide-details
                        density="compact"
                        label="Type"
                        :items="typePaymentAccountList"
                        item-title="label"
                        item-value="accountTypeId"
                        compact
                        v-model="bankInformation.type"
                    ></v-autocomplete>
                </div>
                <div class="col-span-2">
                    <div class="flex flex-row gap-2 items-center">
                        <v-btn
                            variant="plain"
                            size="large"
                            density="compact"
                            icon="mdi-check-outline"
                            color="green"
                            :disabled="
                                bankInformation.nameBank == '' ||
                                bankInformation.accountNumber == '' ||
                                bankInformation.type == 0
                            "
                            @click="addBank()"
                        ></v-btn>
                        <v-btn
                            variant="plain"
                            size="large"
                            density="compact"
                            color="blue"
                            icon="mdi-spray-bottle"
                            @click="resetBank()"
                        ></v-btn>
                    </div>
                </div>
            </div>
        </div>
        <!-- <template v-slot:actions> -->
        <div class="flex justify-end mr-1 py-2 gap-2">
            <CButton color="delete" @click="closeModal"> Cancel </CButton>
            <CButton
                color="confirm"
                :disabled="!meta.valid || fields.rol.length <= 0"
                @click="handleSave(fields)"
            >
                Save
            </CButton>
        </div>
        <!-- </template> -->
    </div>
</template>
<script lang="ts" setup>
import { useUser } from "../composables/useUser";
import { usePrivateCompany } from "../../empresa/composables/usePrivateCompany";
import { Field, useForm } from "vee-validate";
import { onMounted, ref } from "vue";
import { banksItem } from "@/interfaces/User";
import { CButton } from "@core/index";

const { meta } = useForm();

const bankInformation = ref<banksItem>({
    nameBank: "",
    accountNumber: "",
    bankUserId: 0,
    regHostNameCrecion: "",
    regRevisadoPor: "",
    type: null,
    userId: 0,
    typeDesc: "",
});

const actionBank = ref("EDIT");

const addBank = () => {
    const textDesc = typePaymentAccountList.value.filter(
        (x) => x.accountTypeId == bankInformation.value.type
    );
    if (actionBank.value === "EDIT") {
        const actual = fields.value.banks.filter(
            (x) => x.bankUserId == bankInformation.value.bankUserId
        );
        actual[0].typeDesc = textDesc != null ? textDesc[0].desciption : "";
        actual[0].type = bankInformation.value.type;
        actual[0].accountNumber = bankInformation.value.accountNumber;
        actual[0].nameBank = bankInformation.value.nameBank;
        resetBank();
        actionBank.value = "NEW";
    } else {
        //Push DIrectamente
        fields.value.banks.push({
            accountNumber: bankInformation.value.accountNumber,
            bankUserId: Math.floor(Math.random() * -10000),
            nameBank: bankInformation.value.nameBank,
            regHostNameCrecion: "",
            regRevisadoPor: "",
            type: bankInformation.value.type,
            typeDesc: textDesc != null ? textDesc[0].desciption : "",
            userId: fields.value.userId,
        });
        resetBank();
    }
};

const editBank = (item: banksItem) => {
    bankInformation.value.accountNumber = item.accountNumber;
    bankInformation.value.type = item.type;
    bankInformation.value.nameBank = item.nameBank;
    bankInformation.value.bankUserId = item.bankUserId;
    actionBank.value = "EDIT";
};

const deleteBank = (item: banksItem) => {
    const index = fields.value.banks.findIndex(
        (bank) => bank.bankUserId === item.bankUserId
    );
    if (index !== -1) {
        fields.value.banks.splice(index, 1); // Elimina 1 elemento en la posición del índice encontrado
    }
};
const resetBank = () => {
    bankInformation.value.accountNumber = "";
    bankInformation.value.nameBank = "";
    bankInformation.value.type = null;
    bankInformation.value.bankUserId = 0;
};

const handleSelectState = async () => {
    await selectState(fields.value.country);
};

const handleSelectCity = async () => {
    await selectCity(fields.value.state);
};

//Props
interface IProps {
    closeModal: () => void;
}

const props = withDefaults(defineProps<IProps>(), {
    closeModal: () => {},
});

const {
    fields,
    userRoles,
    countryList,
    stateList,
    cityList,
    loadingState,
    loadingCity,
    handleSave,
    selectRols,
    selectCountry,
    selectState,
    selectCity,
} = useUser();
const { selectTypePrivateCompany, typePaymentAccountList } =
    usePrivateCompany();

onMounted(async () => {
    actionBank.value = "NEW";
    await selectRols();
    await selectTypePrivateCompany();
    // await selectCountry();
});
</script>
