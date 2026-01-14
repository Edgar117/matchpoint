import axios from "axios";
import { storeToRefs } from "pinia";
import { useEquipoStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import { Equipo, EquiponRequestParams } from "@/interfaces/Equipo";
import { Categoria } from "@/interfaces/Categoria";
import { CategoriaEquipo, RamaEquipo } from "@/interfaces/Jugador";
import { TipoTorneo } from "@/interfaces/Torneo";
import { Empresa } from "@/interfaces/Empresa";

/**
 * A composable function that provides equipo service methods.
 * @returns An object containing equipo service methods.
 */
export const useEquipoService = () => {
    const { handleShowSnackbar } = useTemplateUI();
    const { equipoList, loadingGrid } = storeToRefs(useEquipoStore());

    /**
     * Creates a new equipo.
     * @param equipoData - The equipo data to be created.
     */
    const createEquipo = async (equipoData: Equipo) => {
        try {
            // Transformar las categorías (array de IDs → array de objetos)
            const categoriasTransformadas = equipoData.categorias?.map(
                (id: number) => ({
                    equipoCategoriaId: 0,
                    torneoId: equipoData.torneoId || 0,
                    equipoId: equipoData.equipoId || 0,
                    categoriaId: id,
                    regBorrado: 0,
                })
            );

            const payload = {
                empresaId: equipoData.empresaId ?? 0,
                equipoId: equipoData.equipoId || 0,
                nombre: equipoData.nombre,
                descripcion: equipoData.descripcion,
                entrenador: equipoData.entrenador,
                pais: equipoData.pais,
                estado: equipoData.estado,
                poblacion: equipoData.poblacion,
                colonia: equipoData.colonia,
                logo: equipoData.logo || "",
                esRamaVaronil: equipoData.esRamaVaronil,
                esRamaFemenil: equipoData.esRamaFemenil,
                esRamaMixto: equipoData.esRamaMixto,
                extensionImg: equipoData.extensionImg, // si no tienes, lo puedes dejar vacío
                categorias: categoriasTransformadas,
                tipoDeporteId: equipoData.tipoDeporteId,
            };

            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Equipo`,
                payload
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
     * Updates an existing equipo.
     * @param equipoData - The equipo data to be updated.
     */
    const updateEquipo = async (equipoData: Equipo) => {
        try {
            // Transformar las categorías (array de IDs → array de objetos)
            const categoriasTransformadas = equipoData.categorias?.map(
                (id: number) => ({
                    equipoCategoriaId: 0,
                    torneoId: equipoData.torneoId || 0,
                    equipoId: equipoData.equipoId || 0,
                    categoriaId: id,
                    regBorrado: 0,
                })
            );

            const payload = {
                empresaId: equipoData.empresaId ?? 0,
                equipoId: equipoData.equipoId || 0,
                nombre: equipoData.nombre,
                descripcion: equipoData.descripcion,
                entrenador: equipoData.entrenador,
                pais: equipoData.pais,
                estado: equipoData.estado,
                poblacion: equipoData.poblacion,
                colonia: equipoData.colonia,
                logo: equipoData.logo || "",
                esRamaVaronil: equipoData.esRamaVaronil,
                esRamaFemenil: equipoData.esRamaFemenil,
                esRamaMixto: equipoData.esRamaMixto,
                extensionImg: equipoData.extensionImg, // si no tienes, lo puedes dejar vacío
                categorias: categoriasTransformadas,
            };

            const response = await axios.put(
                `${URLS.COTBUILDER}/api/Equipo/${equipoData.equipoId}`,
                payload
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
     * Deletes a equipo.
     * @param equipoId - The ID of the equipo to be deleted.
     */
    const deleteEquipo = async (equipoId: number) => {
        try {
            const response = await axios.delete(
                `${URLS.COTBUILDER}/api/Equipo/${equipoId}`
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
     * Retrieves a list of equipos based on the specified request parameters.
     * @param requestModel - The request parameters for filtering and pagination.
     * @returns The total count of equipos.
     */
    const selectEquipo = async (requestModel: EquiponRequestParams) => {
        try {
            loadingGrid.value = true;
            const parameters = buildParams({
                ...requestModel,
            });

            const { data } = await axios.get<{
                data: any[];
                totalCount: number;
            }>(`${URLS.COTBUILDER}/api/equipo`, {
                params: parameters,
            });
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
                    entrenador: item.entrenador,
                    nombre: item.nombre,
                    descripcion: item.descripcion,
                    pais: item.pais,
                    estado: item.estado,
                    poblacion: item.poblacion,
                    colonia: item.colonia,
                    logo: item.logo,
                    extensionImg: item.extensionImg ?? "",
                    esRamaVaronil: item.esRamaVaronil,
                    esRamaFemenil: item.esRamaFemenil,
                    esRamaMixto: item.esRamaMixto,
                    categorias,
                    tipoDeporteId: item.tipoDeporteId ?? null,
                    tipoDeporte: item.tipoDeporte ?? null,
                    empresaId: item.empresaId ?? null,
                };
            });

            equipoList.value = equipos;
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

    const selectCategoriasEquipos = async (tipoDeporteId: number | null) => {
        try {
            const { data } = await axios.get<{
                data: Categoria[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/Categoria?SortColumn=categoriaId&tipoDeporteId=${tipoDeporteId}&Offset=0&Next_Rows=100&SortDirection=ASC`
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

    const selectRamasPorEquipo = async (
        torneoId: number | null,
        equipoId: number,
        offset = 0,
        nextRows = 100
    ): Promise<RamaEquipo[]> => {
        try {
            const { data } = await axios.get(
                `${URLS.COTBUILDER}/api/Equipo/Ramas`,
                {
                    params: {
                        TorneoId: torneoId,
                        EquipoId: equipoId,
                        SortColumn: "categoriaId",
                        Offset: offset,
                        Next_Rows: nextRows,
                        SortDirection: "asc",
                    },
                }
            );

            const source: any = data;
            const collection = Array.isArray(source?.data)
                ? source.data
                : Array.isArray(source)
                ? source
                : [];

            return collection.map(
                (item: any): RamaEquipo => ({
                    ramaId:
                        item.ramaId ??
                        item.RamaId ??
                        item.equipoRamaId ??
                        item.EquipoRamaId ??
                        0,
                    nombre:
                        item.nombre ??
                        item.Nombre ??
                        item.rama ??
                        item.Rama ??
                        "",
                    descripcion: item.descripcion ?? item.Descripcion ?? "",
                    esRamaVaronil:
                        item.esRamaVaronil ?? item.EsRamaVaronil ?? false,
                    esRamaFemenil:
                        item.esRamaFemenil ?? item.EsRamaFemenil ?? false,
                    esRamaMixto: item.esRamaMixto ?? item.EsRamaMixto ?? false,
                })
            );
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return [];
        }
    };

    const selectCategoriasPorEquipo = async (
        torneoId: number | null,
        equipoId: number,
        offset = 0,
        nextRows = 100
    ): Promise<CategoriaEquipo[]> => {
        try {
            const { data } = await axios.get(
                `${URLS.COTBUILDER}/api/Equipo/Categorias`,
                {
                    params: {
                        TorneoId: torneoId,
                        EquipoId: equipoId,
                        SortColumn: "categoriaId",
                        Offset: offset,
                        Next_Rows: nextRows,
                        SortDirection: "asc",
                    },
                }
            );

            const source: any = data;
            const collection = Array.isArray(source?.data)
                ? source.data
                : Array.isArray(source)
                ? source
                : [];

            return collection.map(
                (item: any): CategoriaEquipo => ({
                    categoriaId:
                        item.categoriaId ??
                        item.CategoriaId ??
                        item.equipoCategoriaId ??
                        item.EquipoCategoriaId ??
                        0,
                    categoria:
                        item.categoria ??
                        item.Categoria ??
                        item.nombre ??
                        item.Nombre ??
                        "",
                    descripcion: item.descripcion ?? item.Descripcion ?? "",
                    ramaId: item.ramaId ?? item.RamaId ?? undefined,
                })
            );
        } catch (error) {
            handleShowSnackbar({
                text: `Something went wrong, contact the system administrator`,
                type: "error",
                valueModel: true,
            });
            return [];
        }
    };

    const selImagenEquipo = async (EmpresaId: number, Logo: string) => {
        try {
            const { data } = await axios.get(
                `${URLS.COTBUILDER}/api/Equipo/logo/${EmpresaId}/${Logo}`,
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
    const blobToBase64 = (blob: Blob): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
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

    const selectPosicionesTipoTorneo = async (
        tipoTorneoId: number | null,
        offset = 0,
        nextRows = 100
    ) => {
        try {
            if (!tipoTorneoId) {
                return [];
            }
            const { data } = await axios.get<{
                data: Array<{
                    posicionTipoTorneoId: number;
                    tipoTorneoId: number;
                    tipoTorneo: string;
                    posicion: string;
                    descripcion: string;
                }>;
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/PosicionTipoTorneo`,
                {
                    params: {
                        TipoTorneoId: tipoTorneoId,
                        SortColumn: "posicionTipoTorneoId",
                        Offset: offset,
                        Next_Rows: nextRows,
                        SortDirection: "ASC",
                    },
                }
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

    const obtenerTorneosPorEquipo = async (
        equipoId: number,
        torneoId?: number | null,
        jugadorId?: number | null,
        sortColumn: string = "torneoId",
        offset: number = 0,
        nextRows: number = 100,
        sortDirection: string = "ASC"
    ) => {
        try {
            const params: any = {
                EquipoId: equipoId,
                SortColumn: sortColumn,
                Offset: offset,
                Next_Rows: nextRows,
                SortDirection: sortDirection,
            };
            
            if (torneoId !== null && torneoId !== undefined) {
                params.TorneoId = torneoId;
            }
            
            if (jugadorId !== null && jugadorId !== undefined) {
                params.JugadorId = jugadorId;
            }

            const { data } = await axios.get(
                `${URLS.COTBUILDER}/api/Equipo/ObtenerTorneos`,
                { params }
            );

            const source: any = data;
            const collection = Array.isArray(source?.data)
                ? source.data
                : Array.isArray(source)
                ? source
                : [];

            return collection.map((item: any) => ({
                empresaId: item.empresaId ?? item.EmpresaId ?? 0,
                empresa: item.empresa ?? item.Empresa ?? "",
                equipoId: item.equipoId ?? item.EquipoId ?? 0,
                entrenador: item.entrenador ?? item.Entrenador ?? "",
                nombre: item.nombre ?? item.Nombre ?? "",
                descripcion: item.descripcion ?? item.Descripcion ?? "",
                pais: item.pais ?? item.Pais ?? "",
                estado: item.estado ?? item.Estado ?? "",
                poblacion: item.poblacion ?? item.Poblacion ?? "",
                colonia: item.colonia ?? item.Colonia ?? "",
                tipoDeporteId: item.tipoDeporteId ?? item.TipoDeporteId ?? 0,
                tipoDeporte: item.tipoDeporte ?? item.TipoDeporte ?? "",
                logo: item.logo ?? item.Logo ?? "",
                esRamaVaronil: item.esRamaVaronil ?? item.EsRamaVaronil ?? false,
                esRamaFemenil: item.esRamaFemenil ?? item.EsRamaFemenil ?? false,
                esRamaMixto: item.esRamaMixto ?? item.EsRamaMixto ?? false,
                categorias: item.categorias ?? item.Categorias ?? "",
                // Agregar torneoId si viene en la respuesta
                torneoId: item.torneoId ?? item.TorneoId ?? torneoId ?? 0,
            }));
        } catch (error) {
            handleShowSnackbar({
                text: `No fue posible obtener los torneos del equipo`,
                type: "error",
                valueModel: true,
            });
            return [];
        }
    };

    return {
        createEquipo,
        selectEquipo,
        updateEquipo,
        deleteEquipo,
        selectCategoriasEquipos,
        selImagenEquipo,
        selectRamasPorEquipo,
        selectCategoriasPorEquipo,
        selectTypeTorneo,
        selectPosicionesTipoTorneo,
        selectEmpresaTorneo,
        obtenerTorneosPorEquipo,
    };
};
