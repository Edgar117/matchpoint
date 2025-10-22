import { computed, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useGraphService } from "./useGraphService";
import { useGraphStore } from "../store/state";
import { SortItem } from "@/interfaces/DataTables";
const { selGraph } = useGraphService();

export const useGraph = () => {
    //Importacion de state
    const { graphInfo } = storeToRefs(useGraphStore());
    //Variables con referncia
    const page = ref(1);
    const elementPerPage = ref(10);
    const search = ref("");
    const saving = ref(false);
    const showFilter = ref(false);
    const sortBy = ref<SortItem[]>([]);
    const showPassword = ref(false);
    const location = ref("");
    const loadingFlow = ref(false);
    //Funciones

    //Onmounted
    onMounted(async () => {});

    //Computed

    // Watchers

    // Watchers

    return {
        graphInfo,
        selGraph,
    };
};
