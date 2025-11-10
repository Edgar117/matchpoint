import axios from "axios";
import { storeToRefs } from "pinia";
import { useEquipoStore } from "../store/state";
import { URLS } from "@/helpers/constants";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { useTemplateUI } from "@/store/templateUI";
import { Equipo, EquiponRequestParams } from "@/interfaces/Equipo";
import { Categoria } from "@/interfaces/Categoria";
import { CategoriaEquipo, RamaEquipo } from "@/interfaces/Jugador";

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
                empresaId: 0,
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

            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Equipo`,
                payload
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
                empresaId: 0,
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

    const selectCategoriasEquipos = async () => {
        try {
            const { data } = await axios.get<{
                data: Categoria[];
                totalCount: number;
            }>(
                `${URLS.COTBUILDER}/api/Categoria?SortColumn=categoriaId&Offset=0&Next_Rows=100&SortDirection=ASC`
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
        if (!torneoId || !equipoId) return [];
        try {
            const { data } = await axios.get(`${URLS.COTBUILDER}/api/Equipo/Ramas`, {
                params: {
                    TorneoId: torneoId,
                    EquipoId: equipoId,
                    SortColumn: "TorneoId",
                    Offset: offset,
                    Next_Rows: nextRows,
                    SortDirection: "ASC",
                },
            });

            const source: any = data;
            const collection = Array.isArray(source?.data)
                ? source.data
                : Array.isArray(source)
                ? source
                : [];

            return collection.map((item: any): RamaEquipo => ({
                ramaId:
                    item.ramaId ??
                    item.RamaId ??
                    item.equipoRamaId ??
                    item.EquipoRamaId ??
                    0,
                nombre: item.nombre ?? item.Nombre ?? item.rama ?? item.Rama ?? "",
                descripcion: item.descripcion ?? item.Descripcion ?? "",
                esRamaVaronil: item.esRamaVaronil ?? item.EsRamaVaronil ?? false,
                esRamaFemenil: item.esRamaFemenil ?? item.EsRamaFemenil ?? false,
                esRamaMixto: item.esRamaMixto ?? item.EsRamaMixto ?? false,
            }));
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
        if (!torneoId || !equipoId) return [];
        try {
            const { data } = await axios.get(`${URLS.COTBUILDER}/api/Equipo/Categorias`, {
                params: {
                    TorneoId: torneoId,
                    EquipoId: equipoId,
                    SortColumn: "TorneoId",
                    Offset: offset,
                    Next_Rows: nextRows,
                    SortDirection: "ASC",
                },
            });

            const source: any = data;
            const collection = Array.isArray(source?.data)
                ? source.data
                : Array.isArray(source)
                ? source
                : [];

            return collection.map((item: any): CategoriaEquipo => ({
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
            }));
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

    return {
        createEquipo,
        selectEquipo,
        updateEquipo,
        deleteEquipo,
        selectCategoriasEquipos,
        selImagenEquipo,
        selectRamasPorEquipo,
        selectCategoriasPorEquipo
    };
};
