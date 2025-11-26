import axios from "axios";
import { storeToRefs } from "pinia";
import { useTorneoStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import { TipoTorneo, Torneo, TorneoRequestParams } from "@/interfaces/Torneo";
import { Empresa } from "@/interfaces/Empresa";
import { Equipo } from "@/interfaces/Equipo";

/**
 * A composable function that provides torneo service methods.
 * @returns An object containing torneo service methods.
 */
export const useTorneoService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const { torneoList, loadingGrid } = storeToRefs(useTorneoStore());

    /**
     * Creates a new torneo.
     * @param torneoData - The torneo data to be created.
     */
    const createTorneo = async (companyData: Torneo) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Torneo`,
                companyData
            );

            if (response.status === 200) {
                handleShowSnackbar({
                    text: `The record has been saved successfully`,
                    type: "success",
                    valueModel: true,
                });
            }
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
        }
    };

    /**
     * Updates an existing torneo.
     * @param torneoData - The torneo data to be updated.
     */
    const updateTorneo = async (torneoData: Torneo) => {
        try {
            const response = await axios.put(
                `${URLS.COTBUILDER}/api/Torneo/${torneoData.torneoId}`,
                torneoData
            );

            if (response.status === 200) {
                handleShowSnackbar({
                    text: `The registry has been successfully edited`,
                    type: "success",
                    valueModel: true,
                });
            }
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
        }
    };

    /**
     * Deletes a torneo.
     * @param torneoId - The ID of the torneo to be deleted.
     */
    const deleteTorneo = async (torneoId: number) => {
        try {
            const response = await axios.delete(
                `${URLS.COTBUILDER}/api/Torneo/${torneoId}`
            );

            if (response.status === 200) {
                handleShowSnackbar({
                    text: `Registration has been successfully deleted`,
                    type: "success",
                    valueModel: true,
                });
            }
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
        }
    };

    /**
     * Retrieves a list of torneos based on the specified request parameters.
     * @param requestModel - The request parameters for filtering and pagination.
     * @returns The total count of torneos.
     */
    const selectTorneo = async (requestModel: TorneoRequestParams) => {
        try {
            loadingGrid.value = true;
            const parameters = buildParams({
                ...requestModel,
            });

            const { data } = await axios.get<{
                data: Torneo[];
                totalCount: number;
            }>(`${URLS.COTBUILDER}/api/torneo`, {
                params: parameters,
            });

            torneoList.value = data.data;
            loadingGrid.value = false;
            return data.totalCount;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            loadingGrid.value = false;
            return 0;
        } finally {
            loadingGrid.value = false;
        }
    };

    const selectTypeTorneo = async () => {
        try {
            const { data } = await axios.get<{
                data: TipoTorneo[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/TipoTorneo?SortColumn=TipoTorneoId&Offset=0&Next_Rows=100&SortDirection=ASC`
            );
            return data.data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return [];
        }
    };

    const selectEmpresaTorneo = async () => {
        try {
            const { data } = await axios.get<{
                data: Empresa[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/Empresa?SortColumn=empresaId&Offset=0&Next_Rows=100&SortDirection=ASC`
            );
            return data.data;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return [];
        }
    };

    const selImagenTorneo = async (TorneoId: number, Logo: string) => {
        try {
            const { data } = await axios.get(
                `${URLS.COTBUILDER}/api/Torneo/logo/${TorneoId}/${Logo}`,
                { responseType: "blob" }
            );
            const base64 = await blobToBase64(data);
            // console.log(base64);
            return base64;
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return 0;
        }
    };

    // Función auxiliar para convertir Blob a Base64
    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    };

    /**
     * Retrieves teams not assigned to a tournament.
     * @param params - Query parameters for filtering and pagination.
     * @returns Array of unassigned teams.
     */
    const getEquiposNoAsignados = async (params: {
        TorneoId: number;
        EquipoId?: number;
        RamaId?: number;
        CategoriaId?: number;
        Nombre?: string;
        SortColumn?: string;
        Offset?: number;
        Next_Rows?: number;
        SortDirection?: "ASC" | "DESC";
    }): Promise<Equipo[]> => {
        try {
            const { data } = await axios.get<{
                data: any[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/Equipo/Torneo/EquiposNoAsignados`,
                { params }
            );

            const equipos: Equipo[] = data.data.map((item) => {
                let categorias: number[] | null = null;

                if (item.categorias) {
                    try {
                        const parsed = JSON.parse(item.categorias);
                        categorias = parsed.map((c: any) => c.CategoriaId);
                    } catch {
                        categorias = null; // si no se puede parsear
                    }
                }

                return {
                    torneoId: item.torneoId ?? null,
                    torneo: item.torneo ?? "",
                    equipoId: item.equipoId,
                    entrenador: item.entrenador ?? "",
                    nombre: item.nombre ?? "",
                    descripcion: item.descripcion ?? "",
                    pais: item.pais ?? "",
                    estado: item.estado ?? "",
                    poblacion: item.poblacion ?? "",
                    colonia: item.colonia ?? "",
                    logo: item.logo ?? "",
                    extensionImg: item.extensionImg ?? "",
                    esRamaVaronil: item.esRamaVaronil ?? false,
                    esRamaFemenil: item.esRamaFemenil ?? false,
                    esRamaMixto: item.esRamaMixto ?? false,
                    categorias,
                    tipoDeporteId: item.tipoDeporteId ?? null,
                    tipoDeporte: item.tipoDeporte ?? null,
                    empresaId: item.empresaId ?? null,
                };
            });

            return equipos;
        } catch (error) {
            handleShowSnackbar({
                text: `Error al obtener equipos no asignados`,
                type: "error",
                valueModel: true,
            });
            return [];
        }
    };

    /**
     * Retrieves teams assigned to a tournament.
     * @param params - Query parameters for filtering and pagination.
     * @returns Array of assigned teams.
     */
    const getEquiposAsignados = async (params: {
        TorneoId: number;
        EquipoId?: number;
        RamaId?: number;
        CategoriaId?: number;
        Nombre?: string;
        SortColumn?: string;
        Offset?: number;
        Next_Rows?: number;
        SortDirection?: "ASC" | "DESC";
    }): Promise<Equipo[]> => {
        try {
            const { data } = await axios.get<{
                data: any[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/Equipo/Torneo/EquiposAsignados`,
                { params }
            );

            const equipos: Equipo[] = data.data.map((item) => {
                let categorias: number[] | null = null;

                if (item.categorias) {
                    try {
                        const parsed = JSON.parse(item.categorias);
                        categorias = parsed.map((c: any) => c.CategoriaId);
                    } catch {
                        categorias = null; // si no se puede parsear
                    }
                }

                return {
                    torneoId: item.torneoId ?? null,
                    torneo: item.torneo ?? "",
                    equipoId: item.equipoId,
                    entrenador: item.entrenador ?? "",
                    nombre: item.nombre ?? "",
                    descripcion: item.descripcion ?? "",
                    pais: item.pais ?? "",
                    estado: item.estado ?? "",
                    poblacion: item.poblacion ?? "",
                    colonia: item.colonia ?? "",
                    logo: item.logo ?? "",
                    extensionImg: item.extensionImg ?? "",
                    esRamaVaronil: item.esRamaVaronil ?? false,
                    esRamaFemenil: item.esRamaFemenil ?? false,
                    esRamaMixto: item.esRamaMixto ?? false,
                    categorias,
                    tipoDeporteId: item.tipoDeporteId ?? null,
                    tipoDeporte: item.tipoDeporte ?? null,
                    empresaId: item.empresaId ?? null,
                };
            });

            return equipos;
        } catch (error) {
            handleShowSnackbar({
                text: `Error al obtener equipos asignados`,
                type: "error",
                valueModel: true,
            });
            return [];
        }
    };

    return {
        createTorneo,
        selectTorneo,
        updateTorneo,
        deleteTorneo,
        selImagenTorneo,
        selectTypeTorneo,
        selectEmpresaTorneo,
        getEquiposNoAsignados,
        getEquiposAsignados,
    };
};
