import axios from "axios";
import { buildParams } from "@/modules/login/helpers/axiosHelper";
import { URLS } from "@/helpers/constants";
import { useTemplateUI } from "@/store/templateUI";
import {
    Jugador,
    JugadorListParams,
    JugadorRequest,
} from "@/interfaces/Jugador";

export const useJugadorService = () => {
    const { handleShowSnackbar } = useTemplateUI();

    const fetchJugadores = async (
        params: JugadorListParams
    ): Promise<Jugador[]> => {
        try {
            const query = buildParams({
                SortColumn: params.sortColumn ?? "jugadorId",
                SortDirection: params.sortDirection ?? "ASC",
                Offset: params.offset ?? 0,
                Next_Rows: params.nextRows ?? 100,
                EquipoId: params.equipoId,
                TorneoId: params.torneoId ?? undefined,
            });

            const { data } = await axios.get(`${URLS.COTBUILDER}/api/Jugador`, {
                params: query,
            });

            const source: any = data;
            const collection = Array.isArray(source?.data)
                ? source.data
                : Array.isArray(source)
                ? source
                : [];

            return collection.map((item: any): Jugador => {
                // Parsear equipoJugador si viene como string JSON
                let equipoJugadorArray: any[] = [];
                
                if (item.equipoJugador || item.EquipoJugador) {
                    const equipoJugadorRaw = item.equipoJugador ?? item.EquipoJugador;
                    
                    if (typeof equipoJugadorRaw === 'string') {
                        try {
                            equipoJugadorArray = JSON.parse(equipoJugadorRaw);
                        } catch (e) {
                            console.error('Error parsing equipoJugador:', e);
                            equipoJugadorArray = [];
                        }
                    } else if (Array.isArray(equipoJugadorRaw)) {
                        equipoJugadorArray = equipoJugadorRaw;
                    }
                }

                return {
                    equipoId: item.equipoId ?? params.equipoId,
                    jugadorId: item.jugadorId ?? item.JugadorId ?? 0,
                    nombre: item.nombre ?? item.Nombre ?? "",
                    apellidoPaterno: item.apellidoPaterno ?? item.ApellidoPaterno ?? "",
                    apellidoMaterno: item.apellidoMaterno ?? item.ApellidoMaterno ?? "",
                    logo: item.logo ?? item.Logo ?? "",
                    fechaNacimiento:
                        item.fechaNacimiento ?? item.FechaNacimiento ?? null,
                    curp: item.curp ?? item.Curp ?? "",
                    extensionImg: item.extensionImg ?? item.ExtensionImg ?? "",
                    equipoJugador: equipoJugadorArray.map(
                        (asignacion: any) => ({
                            equipoJugadorId:
                                asignacion.equipoJugadorId ??
                                asignacion.EquipoJugadorId ??
                                0,
                            ramaId: asignacion.ramaId ?? asignacion.RamaId ?? 0,
                            categoriaId:
                                asignacion.categoriaId ?? asignacion.CategoriaId ?? 0,
                            posicionTipoTorneoId:
                                asignacion.posicionTipoTorneoId ??
                                asignacion.PosicionTipoTorneoId ??
                                0,
                            num: asignacion.num ?? asignacion.Num ?? 0,
                            jugador:
                                asignacion.jugador ?? asignacion.Jugador ?? "",
                            ramaNombre:
                                asignacion.ramaNombre ?? asignacion.RamaNombre ?? "",
                            categoriaNombre:
                                asignacion.categoriaNombre ??
                                asignacion.CategoriaNombre ??
                                "",
                        })
                    ),
                };
            });
        } catch (error) {
            handleShowSnackbar({
                text: `No fue posible obtener los jugadores, intente nuevamente`,
                type: "error",
                valueModel: true,
            });
            return [];
        }
    };

    const createJugador = async (payload: JugadorRequest) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Jugador`,
                payload
            );
            if (response.status === 200 || response.status === 201) {
                handleShowSnackbar({
                    text: `El jugador se guardó correctamente`,
                    type: "success",
                    valueModel: true,
                });
            }
        } catch (error) {
            handleShowSnackbar({
                text: `No fue posible guardar el jugador, verifique la información`,
                type: "error",
                valueModel: true,
            });
            throw error;
        }
    };

    const updateJugador = async (jugadorId: number, payload: JugadorRequest) => {
        try {
            const response = await axios.put(
                `${URLS.COTBUILDER}/api/Jugador/${jugadorId}`,
                payload
            );
            if (response.status === 200) {
                handleShowSnackbar({
                    text: `El jugador se actualizó correctamente`,
                    type: "success",
                    valueModel: true,
                });
            }
        } catch (error) {
            handleShowSnackbar({
                text: `No fue posible actualizar el jugador`,
                type: "error",
                valueModel: true,
            });
            throw error;
        }
    };

    const deleteJugador = async (jugadorId: number) => {
        try {
            const response = await axios.delete(
                `${URLS.COTBUILDER}/api/Jugador/${jugadorId}`
            );
            if (response.status === 200) {
                handleShowSnackbar({
                    text: `El jugador se eliminó correctamente`,
                    type: "success",
                    valueModel: true,
                });
            }
        } catch (error) {
            handleShowSnackbar({
                text: `No fue posible eliminar el jugador`,
                type: "error",
                valueModel: true,
            });
            throw error;
        }
    };

    const asignarJugadorATorneos = async (payload: {
        equipoId: number;
        jugadorId: number;
        jugadorTorneo: Array<{
            torneoId: number;
            jug: Array<{
                ramaId: string | number;
                categoriaId: string | number;
                posicionTipoDeporteId: string | number;
                num: string | number;
                jugador: string;
            }>;
        }>;
    }) => {
        try {
            const response = await axios.post(
                `${URLS.COTBUILDER}/api/Jugador/AsignarTorneo`,
                payload
            );
            if (response.status === 200 || response.status === 201) {
                handleShowSnackbar({
                    text: `El jugador se asignó correctamente a los torneos`,
                    type: "success",
                    valueModel: true,
                });
            }
        } catch (error) {
            handleShowSnackbar({
                text: `No fue posible asignar el jugador a los torneos`,
                type: "error",
                valueModel: true,
            });
            throw error;
        }
    };

    return {
        fetchJugadores,
        createJugador,
        updateJugador,
        deleteJugador,
        asignarJugadorATorneos,
    };
};

