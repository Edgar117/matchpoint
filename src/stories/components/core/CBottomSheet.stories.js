import "../../../styles/main.css";
import CBottomSheet from "../../../components/core/CBottomSheet/CBottomSheet.vue";
import { ref } from "vue";
// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta = {
    title: "components/BottomSheet",
    component: CBottomSheet,
    render: (args) => ({
        components: { CBottomSheet },
        setup() {
            const showSheet = ref(false);
            return { args, showSheet };
        },
        template: `
        <div style="position: relative">
            <button class="bg-blue-400 px-4 py-2 rounded-lg text-white" @click="showSheet = true">
                show
            </button>

            <CBottomSheet isLoading="true" v-model="showSheet" v-bind="args" >
                here content
            </CBottomSheet>
        </div>`,
    }),
    argTypes: {},
    args: {},
    tags: ["autodocs"],
};
export default meta;
export const BottomSheetDefault = {
    args: {
        title: "title example",
        isLoading: false,
    },
};
export const BottomSheetLoading = {
    args: {
        title: "title example",
        isLoading: true,
        textLoading: "obteniendo información...",
    },
    argTypes: {
        title: {
            description: `Esta prop nos ayuda a renderizar un titulo en la parte superior del bottomSheet`,
        },
        isLoading: {
            description: `Esta prop nos ayuda a mostrar un loader de carga en caso de ser necesario o necesitarlo`,
        },
        textLoading: {
            description: `Esta prop nos ayuda a cambiar el texto del loading de carga`,
        },
    },
};
export const BottomSheetPersistent = {
    args: {
        title: "title example",
        isLoading: false,
        persistent: true,
    },
};
//# sourceMappingURL=CBottomSheet.stories.js.map