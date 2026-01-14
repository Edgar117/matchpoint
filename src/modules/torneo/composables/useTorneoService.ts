import axios from "axios";
import { storeToRefs } from "pinia";
import { useTorneoStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import { TipoTorneo, Torneo, TorneoRequestParams } from "@/interfaces/Torneo";
import { Empresa } from "@/interfaces/Empresa";
import { Equipo } from "@/interfaces/Equipo";

// Extended interface to include category details
export interface EquipoConCategorias extends Equipo {
    categoriasDetalle?: Array<{
        categoriaId: number;
        categoria: string;
    }>;
}

// Interface for tournament players
export interface JugadorTorneo {
    jugadorId: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    logo?: string;
    fechaNacimiento: string | null;
    curp: string;
    equipoJugador?: string;
}

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
                    text: `El registro se ha creado correctamente`,
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
                    text: `El registro ha sido editado exitosamente`,
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
                    text: `El registro ha sido eliminado exitosamente`,
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
    }): Promise<EquipoConCategorias[]> => {
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
    }): Promise<EquipoConCategorias[]> => {
        try {
            const { data } = await axios.get<{
                data: any[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/Equipo/Torneo/EquiposAsignados`,
                { params }
            );

            const equipos: EquipoConCategorias[] = data.data.map((item) => {
                let categorias: number[] | null = null;
                let categoriasDetalle: Array<{ categoriaId: number; categoria: string }> | undefined = undefined;

                if (item.categorias) {
                    try {
                        const parsed = JSON.parse(item.categorias);
                        categorias = parsed.map((c: any) => c.CategoriaId);
                        categoriasDetalle = parsed.map((c: any) => ({
                            categoriaId: c.CategoriaId,
                            categoria: c.Categoria || c.categoria || "",
                        }));
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
                    categoriasDetalle,
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

    /**
     * Assigns a team to a tournament with selected branches and categories.
     * @param payload - The assignment data including torneoId, equipoId, ramas, and categorias.
     */
    const asignarEquipoTorneo = async (payload: {
        torneoId: number;
        equipoId: number;
        esRamaVaronil: boolean;
        esRamaFemenil: boolean;
        esRamaMixto: boolean;
        categorias: Array<{
            equipoCategoriaId: number;
            equipoId: number;
            categoriaId: number;
            regBorrado: number;
        }>;
    }) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Equipo/AsignarTorneo`,
                payload
            );

            if (response.status === 200 || response.status === 201) {
                handleShowSnackbar({
                    text: `Equipo asignado al torneo exitosamente`,
                    type: "success",
                    valueModel: true,
                });
                return true;
            }
            return false;
        } catch (error) {
            handleShowSnackbar({
                text: `Error al asignar el equipo al torneo`,
                type: "error",
                valueModel: true,
            });
            return false;
        }
    };

    /**
     * Retrieves players assigned to a team in a tournament.
     * @param params - Query parameters including TorneoId, EquipoId, and pagination options.
     * @returns Array of players.
     */
    const getJugadoresTorneo = async (params: {
        TorneoId: number;
        EquipoId: number;
        SortColumn?: string;
        Offset?: number;
        Next_Rows?: number;
        SortDirection?: "ASC" | "DESC";
    }): Promise<JugadorTorneo[]> => {
        try {
            const response = await axios.get<{
                data: JugadorTorneo[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/Equipo/ObtenerJugadoresTorneo`,
                { params }
            );
            
            const data = response.data;
            
            // Handle both response formats: { data: [], totalCount: n } or direct array
            if (data && typeof data === 'object' && 'data' in data) {
                const players = Array.isArray(data.data) ? data.data : [];
                return players;
            }
            
            // If response is directly an array
            if (Array.isArray(data)) {
                return data;
            }
            
            return [];
        } catch (error) {
            handleShowSnackbar({
                text: `Error al obtener jugadores del torneo`,
                type: "error",
                valueModel: true,
            });
            return [];
        }
    };

    /**
     * Removes a player from a tournament team.
     * @param jugadorId - The ID of the player to remove.
     * @param equipoId - The ID of the team.
     * @param torneoId - The ID of the tournament.
     * @returns True if successful, false otherwise.
     */
    const removerJugadorTorneo = async (
        jugadorId: number,
        equipoId: number,
        torneoId: number
    ): Promise<boolean> => {
        try {
            const response = await axios.put(
                `${URLS.COTBUILDER}/api/Equipo/RemoverJugadorTorneo/${jugadorId}/${equipoId}/${torneoId}`
            );

            if (response.status === 200 || response.status === 204) {
                handleShowSnackbar({
                    text: `Jugador removido del torneo exitosamente`,
                    type: "success",
                    valueModel: true,
                });
                return true;
            }
            return false;
        } catch (error) {
            handleShowSnackbar({
                text: `Error al remover el jugador del torneo`,
                type: "error",
                valueModel: true,
            });
            return false;
        }
    };

    /**
     * Unassigns a team from a tournament.
     * @param equipoId - The ID of the team.
     * @param torneoId - The ID of the tournament.
     * @returns True if successful, false otherwise.
     */
    const desasignarEquipoTorneo = async (
        equipoId: number,
        torneoId: number
    ): Promise<boolean> => {
        try {
            const response = await axios.put(
                `${URLS.COTBUILDER}/api/Equipo/DesasignarTorneo/${equipoId}/${torneoId}`
            );

            if (response.status === 200 || response.status === 204) {
                handleShowSnackbar({
                    text: `Equipo desasignado del torneo exitosamente`,
                    type: "success",
                    valueModel: true,
                });
                return true;
            }
            return false;
        } catch (error) {
            handleShowSnackbar({
                text: `Error al desasignar el equipo del torneo`,
                type: "error",
                valueModel: true,
            });
            return false;
        }
    };

    /**
     * Retrieves a list of public tournaments.
     * @param params - Query parameters for filtering and pagination.
     * @returns Object with tournaments data and total count.
     */
    const fetchTorneosPublicos = async (params: {
        EmpresaId?: number;
        SortColumn?: string;
        Offset?: number;
        Next_Rows?: number;
        SortDirection?: "ASC" | "DESC";
    } = {}) => {
        try {
            const queryParams = buildParams({
                EmpresaId: params.EmpresaId ?? 0,
                SortColumn: params.SortColumn ?? "fechaInicio",
                Offset: params.Offset ?? 0,
                Next_Rows: params.Next_Rows ?? 10,
                SortDirection: params.SortDirection ?? "ASC",
            });

            const { data } = await axios.get<{
                data: Torneo[];
                totalCount: number;
            }>(`${URLS.COTBUILDER}/api/TorneoPublico`, {
                params: queryParams,
            });

            return {
                tournaments: data.data || [],
                totalCount: data.totalCount || 0,
            };
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return {
                tournaments: [],
                totalCount: 0,
            };
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
        asignarEquipoTorneo,
        getJugadoresTorneo,
        removerJugadorTorneo,
        desasignarEquipoTorneo,
        fetchTorneosPublicos,
    };
};
