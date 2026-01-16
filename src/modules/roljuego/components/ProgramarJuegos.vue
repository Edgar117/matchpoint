<template>
    <v-card class="h-100 d-flex flex-column">
        <v-card-title class="d-flex justify-space-between align-center pa-4">
            <span class="text-h5">Programar Juegos</span>
            <v-btn icon variant="text" @click="closeModal">
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-card-title>
        <v-card-text class="flex-grow-1 pa-0 overflow-hidden">
            <div v-if="loading" class="d-flex align-center justify-center h-100">
                <div class="text-center">
                    <v-progress-circular
                        indeterminate
                        color="primary"
                        size="64"
                    ></v-progress-circular>
                    <p class="mt-4">Cargando información...</p>
                </div>
            </div>

            <div v-else class="d-flex h-100">
                <!-- Panel Izquierdo: Captura de Datos -->
                <div class="flex-grow-1 pa-4 overflow-y-auto" style="max-width: 60%; border-right: 1px solid #e0e0e0;">
                    <!-- Información del Rol de Juego -->
                    <v-alert type="info" class="mb-4">
                        <div><strong>Torneo:</strong> {{ rolJuego?.torneo }}</div>
                        <div><strong>Tipo Rol Juego:</strong> {{ rolJuego?.tipoRolJuego }}</div>
                        <div><strong>Rama:</strong> {{ rolJuego?.rama }}</div>
                        <div><strong>Categoría:</strong> {{ rolJuego?.categoria || 'N/A' }}</div>
                    </v-alert>

                    <!-- Verificar si es todos contra todos -->
                    <div v-if="!esTodosContraTodos" class="text-center py-8">
                        <v-alert type="warning">
                            El tipo de rol de juego seleccionado no es "Todos contra Todos".
                            Esta funcionalidad está disponible solo para torneos de tipo "Todos contra Todos" o "Liga".
                        </v-alert>
                    </div>

                    <!-- Verificar si hay equipos suficientes -->
                    <div v-else-if="equipos.length < 2" class="text-center py-8">
                        <v-alert type="warning">
                            Se requieren al menos 2 equipos para programar juegos.
                            Actualmente hay {{ equipos.length }} equipo(s) registrado(s).
                        </v-alert>
                    </div>

                    <div v-else-if="equipos.length >= 2">
                        <!-- Lista de equipos -->
                        <div class="mb-4">
                            <h3 class="mb-2">Equipos Registrados ({{ equipos.length }})</h3>
                            <v-chip-group>
                                <v-chip
                                    v-for="equipo in equipos"
                                    :key="equipo.equipoId"
                                    color="primary"
                                >
                                    {{ equipo.nombre }}
                                </v-chip>
                            </v-chip-group>
                            <p class="text-sm text-grey-darken-1 mt-2">
                                Cada equipo jugará {{ partidosPorEquipo }} partido(s)
                            </p>
                        </div>

                        <!-- Configuración de jornadas -->
                        <v-divider class="my-4"></v-divider>
                        <h3 class="mb-4">Configurar Jornadas</h3>

                        <div
                            v-for="(jornada, index) in jornadas"
                            :key="index"
                            class="mb-6"
                        >
                            <v-card variant="outlined" class="pa-4">
                                <div
                                    class="d-flex justify-space-between align-center mb-3"
                                >
                                    <h4>
                                        Jornada {{ index + 1 }} - Ronda
                                        {{ jornada.ronda }}
                                    </h4>
                                    <v-text-field
                                        v-model="jornada.fecha"
                                        type="date"
                                        label="Fecha"
                                        density="compact"
                                        variant="outlined"
                                        style="max-width: 200px"
                                        @update:model-value="actualizarHorariosOcupados(jornada.fecha)"
                                    ></v-text-field>
                                </div>

                                <v-table>
                                    <thead>
                                        <tr>
                                            <th>Hora</th>
                                            <th>Equipo 1</th>
                                            <th>Equipo 2</th>
                                            <th>Cancha</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr
                                            v-for="(
                                                partido, pIndex
                                            ) in jornada.partidos"
                                            :key="pIndex"
                                        >
                                            <td>
                                                <v-text-field
                                                    v-model="partido.hora"
                                                    type="time"
                                                    density="compact"
                                                    variant="outlined"
                                                    style="max-width: 150px"
                                                ></v-text-field>
                                            </td>
                                            <td>
                                                <v-select
                                                    v-model="partido.equipo1Id"
                                                    :items="
                                                        equipos.filter(
                                                            (e) =>
                                                                e.equipoId !==
                                                                partido.equipo2Id
                                                        )
                                                    "
                                                    item-value="equipoId"
                                                    item-title="nombre"
                                                    density="compact"
                                                    variant="outlined"
                                                    style="max-width: 200px"
                                                ></v-select>
                                            </td>
                                            <td>
                                                <v-select
                                                    v-model="partido.equipo2Id"
                                                    :items="
                                                        equipos.filter(
                                                            (e) =>
                                                                e.equipoId !==
                                                                partido.equipo1Id
                                                        )
                                                    "
                                                    item-value="equipoId"
                                                    item-title="nombre"
                                                    density="compact"
                                                    variant="outlined"
                                                    style="max-width: 200px"
                                                ></v-select>
                                            </td>
                                            <td>
                                                <v-select
                                                    v-model="partido.canchaId"
                                                    :items="canchas"
                                                    item-value="canchaId"
                                                    item-title="cancha"
                                                    density="compact"
                                                    variant="outlined"
                                                    style="max-width: 200px"
                                                ></v-select>
                                            </td>
                                            <td>
                                                <v-btn
                                                    icon
                                                    size="small"
                                                    color="error"
                                                    @click="
                                                        eliminarPartido(
                                                            jornada,
                                                            pIndex
                                                        )
                                                    "
                                                >
                                                    <v-icon>mdi-delete</v-icon>
                                                </v-btn>
                                            </td>
                                        </tr>
                                    <tr>
                                        <td colspan="5" class="text-center">
                                                <v-btn
                                                    color="primary"
                                                    variant="outlined"
                                                    size="small"
                                                    @click="agregarPartido(jornada)"
                                                >
                                                    <v-icon left>mdi-plus</v-icon>
                                                    Agregar Partido
                                                </v-btn>
                                            </td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-card>
                        </div>

                        <!-- Botones de acción -->
                        <div class="d-flex justify-end gap-2 mt-4">
                            <CButton color="cancel" @click="closeModal">
                                Cancelar
                            </CButton>
                            <CButton
                                color="confirm"
                                :disabled="!puedeGuardar"
                                @click="guardarJornadas"
                                :loading="guardando"
                            >
                                Guardar Jornadas
                            </CButton>
                        </div>
                    </div>
                </div>

                <!-- Panel Derecho: Horarios de Canchas y Categorías -->
                <div class="pa-4 overflow-y-auto" style="width: 40%; background-color: #f5f5f5;">
                    <h3 class="mb-4">Horarios Ocupados</h3>
                    
                    <v-alert v-if="horariosOcupados.length === 0" type="info" class="mb-4">
                        No hay horarios asignados para la fecha seleccionada.
                    </v-alert>

                    <div v-else>
                        <v-card
                            v-for="(grupo, key) in horariosAgrupados"
                            :key="key"
                            class="mb-4"
                            variant="outlined"
                        >
                            <v-card-title class="text-subtitle-1 pa-3">
                                {{ key }}
                            </v-card-title>
                            <v-card-text class="pa-2">
                                <v-list density="compact">
                                    <v-list-item
                                        v-for="partido in grupo"
                                        :key="partido.partidoId"
                                        class="pa-2"
                                    >
                                        <v-list-item-title class="text-body-2 d-flex align-center gap-2">
                                            <span>{{ formatearFechaCorta((partido as any).fecha || fechaSeleccionada) }} {{ partido.hora }} - {{ partido.equipo1 }} vs {{ partido.equipo2 }}</span>
                                            <v-spacer></v-spacer>
                                            <v-chip
                                                :color="
                                                    partido.estado === 'PROGRAMADO'
                                                        ? 'primary'
                                                        : partido.estado === 'FINALIZADO'
                                                        ? 'success'
                                                        : 'warning'
                                                "
                                                size="x-small"
                                            >
                                                {{ partido.estado }}
                                            </v-chip>
                                        </v-list-item-title>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </v-card>
                    </div>
                </div>
            </div>
        </v-card-text>
    </v-card>

</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { CButton } from "@core/index";
import { RolJuego } from "@/interfaces/RolJuego";
import { Equipo } from "@/interfaces/Equipo";
import { Cancha } from "@/interfaces/Cancha";
import { Partido } from "@/interfaces/Jornada";
import { useRolJuegoService } from "../composables/useRolJuegoService";
import { useTemplateUI } from "@/store/templateUI";

interface IProps {
    rolJuego: RolJuego | null;
    closeModal: () => void;
}

const props = defineProps<IProps>();

const { handleShowSnackbar } = useTemplateUI();
const {
    createJornada,
    createPartido,
    getEquiposByRolJuego,
    getCanchas,
    getPartidosByFecha,
} = useRolJuegoService();

const loading = ref(true);
const guardando = ref(false);
const equipos = ref<Equipo[]>([]);
const canchas = ref<Cancha[]>([]);
const jornadas = ref<any[]>([]);
const loadingHorarios = ref(false);
const horariosOcupados = ref<Partido[]>([]);
const fechaSeleccionada = ref<string>("");

// Horarios ficticios para maquetación - distribuidos en diferentes fechas
const horariosFicticios: Partido[] = [
    // Cancha 1: La cancha de la Ermita - Fecha 1 (15/01/2026)
    {
        partidoId: 1,
        jornadaId: 1,
        equipo1Id: 1,
        equipo1: "Sooners",
        equipo2Id: 2,
        equipo2: "Lakers",
        hora: "08:00",
        canchaId: 1,
        cancha: "La cancha de la Ermita",
        ubicacion: "Cordemex",
        estado: "PROGRAMADO",
        marcador1: 0,
        marcador2: 0,
        fecha: "2026-01-15",
    } as any,
    {
        partidoId: 2,
        jornadaId: 1,
        equipo1Id: 3,
        equipo1: "Veteranos",
        equipo2Id: 4,
        equipo2: "Maverics",
        hora: "10:00",
        canchaId: 1,
        cancha: "La cancha de la Ermita",
        ubicacion: "Cordemex",
        estado: "PROGRAMADO",
        marcador1: 0,
        marcador2: 0,
        fecha: "2026-01-15",
    } as any,
    // Cancha 1: La cancha de la Ermita - Fecha 2 (22/01/2026) - misma cancha, diferente fecha
    {
        partidoId: 3,
        jornadaId: 2,
        equipo1Id: 1,
        equipo1: "Sooners",
        equipo2Id: 3,
        equipo2: "Veteranos",
        hora: "12:00",
        canchaId: 1,
        cancha: "La cancha de la Ermita",
        ubicacion: "Cordemex",
        estado: "PROGRAMADO",
        marcador1: 0,
        marcador2: 0,
        fecha: "2026-01-22",
    } as any,
    {
        partidoId: 4,
        jornadaId: 2,
        equipo1Id: 2,
        equipo1: "Lakers",
        equipo2Id: 4,
        equipo2: "Maverics",
        hora: "14:00",
        canchaId: 1,
        cancha: "La cancha de la Ermita",
        ubicacion: "Cordemex",
        estado: "PROGRAMADO",
        marcador1: 0,
        marcador2: 0,
        fecha: "2026-01-22",
    } as any,
    // Cancha 2: La cancha de la mercedes barrera - Fecha 1
    {
        partidoId: 5,
        jornadaId: 1,
        equipo1Id: 1,
        equipo1: "Sooners",
        equipo2Id: 4,
        equipo2: "Maverics",
        hora: "09:00",
        canchaId: 2,
        cancha: "La cancha de la mercedes barrera",
        ubicacion: "Cordemex",
        estado: "PROGRAMADO",
        marcador1: 0,
        marcador2: 0,
        fecha: "2026-01-15",
    } as any,
    {
        partidoId: 6,
        jornadaId: 1,
        equipo1Id: 2,
        equipo1: "Lakers",
        equipo2Id: 3,
        equipo2: "Veteranos",
        hora: "11:00",
        canchaId: 2,
        cancha: "La cancha de la mercedes barrera",
        ubicacion: "Cordemex",
        estado: "PROGRAMADO",
        marcador1: 0,
        marcador2: 0,
        fecha: "2026-01-15",
    } as any,
    // Cancha 2: La cancha de la mercedes barrera - Fecha 2
    {
        partidoId: 7,
        jornadaId: 2,
        equipo1Id: 1,
        equipo1: "Sooners",
        equipo2Id: 2,
        equipo2: "Lakers",
        hora: "13:00",
        canchaId: 2,
        cancha: "La cancha de la mercedes barrera",
        ubicacion: "Cordemex",
        estado: "PROGRAMADO",
        marcador1: 0,
        marcador2: 0,
        fecha: "2026-01-22",
    } as any,
    {
        partidoId: 8,
        jornadaId: 2,
        equipo1Id: 3,
        equipo1: "Veteranos",
        equipo2Id: 4,
        equipo2: "Maverics",
        hora: "15:00",
        canchaId: 2,
        cancha: "La cancha de la mercedes barrera",
        ubicacion: "Cordemex",
        estado: "PROGRAMADO",
        marcador1: 0,
        marcador2: 0,
        fecha: "2026-01-22",
    } as any,
    // Cancha 3: Cancha Deportiva Central - Fecha 1
    {
        partidoId: 9,
        jornadaId: 1,
        equipo1Id: 2,
        equipo1: "Lakers",
        equipo2Id: 4,
        equipo2: "Maverics",
        hora: "08:30",
        canchaId: 3,
        cancha: "Cancha Deportiva Central",
        ubicacion: "Cordemex",
        estado: "PROGRAMADO",
        marcador1: 0,
        marcador2: 0,
        fecha: "2026-01-15",
    } as any,
    {
        partidoId: 10,
        jornadaId: 1,
        equipo1Id: 1,
        equipo1: "Sooners",
        equipo2Id: 3,
        equipo2: "Veteranos",
        hora: "10:30",
        canchaId: 3,
        cancha: "Cancha Deportiva Central",
        ubicacion: "Cordemex",
        estado: "PROGRAMADO",
        marcador1: 0,
        marcador2: 0,
        fecha: "2026-01-15",
    } as any,
    // Cancha 3: Cancha Deportiva Central - Fecha 2
    {
        partidoId: 11,
        jornadaId: 2,
        equipo1Id: 1,
        equipo1: "Sooners",
        equipo2Id: 4,
        equipo2: "Maverics",
        hora: "12:30",
        canchaId: 3,
        cancha: "Cancha Deportiva Central",
        ubicacion: "Cordemex",
        estado: "PROGRAMADO",
        marcador1: 0,
        marcador2: 0,
        fecha: "2026-01-22",
    } as any,
    {
        partidoId: 12,
        jornadaId: 2,
        equipo1Id: 2,
        equipo1: "Lakers",
        equipo2Id: 3,
        equipo2: "Veteranos",
        hora: "14:30",
        canchaId: 3,
        cancha: "Cancha Deportiva Central",
        ubicacion: "Cordemex",
        estado: "PROGRAMADO",
        marcador1: 0,
        marcador2: 0,
        fecha: "2026-01-22",
    } as any,
];

// Equipos ficticios para pruebas
const equiposFicticios: Equipo[] = [
    {
        equipoId: 1,
        nombre: "Sooners",
        entrenador: "Coach 1",
        descripcion: "Equipo Sooners",
        pais: "México",
        estado: "Yucatán",
        poblacion: "Mérida",
        colonia: "Centro",
        logo: "",
        extensionImg: "",
        esRamaVaronil: true,
        esRamaFemenil: false,
        esRamaMixto: false,
        categorias: null,
        tipoDeporteId: null,
        tipoDeporte: null,
        empresaId: null,
        torneoId: null,
    },
    {
        equipoId: 2,
        nombre: "Lakers",
        entrenador: "Coach 2",
        descripcion: "Equipo Lakers",
        pais: "México",
        estado: "Yucatán",
        poblacion: "Mérida",
        colonia: "Centro",
        logo: "",
        extensionImg: "",
        esRamaVaronil: true,
        esRamaFemenil: false,
        esRamaMixto: false,
        categorias: null,
        tipoDeporteId: null,
        tipoDeporte: null,
        empresaId: null,
        torneoId: null,
    },
    {
        equipoId: 3,
        nombre: "Veteranos",
        entrenador: "Coach 3",
        descripcion: "Equipo Veteranos",
        pais: "México",
        estado: "Yucatán",
        poblacion: "Mérida",
        colonia: "Centro",
        logo: "",
        extensionImg: "",
        esRamaVaronil: true,
        esRamaFemenil: false,
        esRamaMixto: false,
        categorias: null,
        tipoDeporteId: null,
        tipoDeporte: null,
        empresaId: null,
        torneoId: null,
    },
    {
        equipoId: 4,
        nombre: "Maverics",
        entrenador: "Coach 4",
        descripcion: "Equipo Maverics",
        pais: "México",
        estado: "Yucatán",
        poblacion: "Mérida",
        colonia: "Centro",
        logo: "",
        extensionImg: "",
        esRamaVaronil: true,
        esRamaFemenil: false,
        esRamaMixto: false,
        categorias: null,
        tipoDeporteId: null,
        tipoDeporte: null,
        empresaId: null,
        torneoId: null,
    },
];

// Canchas ficticias para pruebas
const canchasFicticias: Cancha[] = [
    {
        canchaId: 1,
        cancha: "La cancha de la Ermita",
        descripcion: "Cancha principal",
        ubicacion: "Cordemex",
        direccion: "Cordemex, Mérida, Yucatán",
    },
    {
        canchaId: 2,
        cancha: "La cancha de la mercedes barrera",
        descripcion: "Cancha secundaria",
        ubicacion: "Cordemex",
        direccion: "Cordemex, Mérida, Yucatán",
    },
    {
        canchaId: 3,
        cancha: "Cancha Deportiva Central",
        descripcion: "Cancha central",
        ubicacion: "Cordemex",
        direccion: "Cordemex, Mérida, Yucatán",
    },
];

// Verificar si es todos contra todos
const esTodosContraTodos = computed(() => {
    if (!props.rolJuego?.tipoRolJuego) return false;
    const tipo = props.rolJuego.tipoRolJuego.toLowerCase();
    return (
        tipo.includes("todos contra todos") ||
        tipo.includes("round-robin") ||
        tipo.includes("round robin") ||
        tipo.includes("todos vs todos") ||
        tipo.includes("todos contra") ||
        tipo.includes("liga")
    );
});

const partidosPorEquipo = computed(() => {
    if (equipos.value.length < 2) return 0;
    return equipos.value.length - 1;
});

const puedeGuardar = computed(() => {
    if (jornadas.value.length === 0) return false;

    // Verificar que todos los partidos tengan los datos requeridos
    const partidosValidos = jornadas.value.every((jornada) => {
        if (!jornada.fecha) return false;
        return jornada.partidos.every((partido: any) => {
            return (
                partido.hora &&
                partido.canchaId &&
                partido.equipo1Id &&
                partido.equipo2Id &&
                partido.equipo1Id !== partido.equipo2Id
            );
        });
    });

    if (!partidosValidos) return false;

    const partidosTotales = jornadas.value.flatMap((j) => j.partidos);
    const partidosUnicos = new Set<string>();
    for (const p of partidosTotales) {
        if (p.equipo1Id && p.equipo2Id) {
            const key1 = `${Math.min(p.equipo1Id, p.equipo2Id)}-${Math.max(
                p.equipo1Id,
                p.equipo2Id
            )}`;
            if (partidosUnicos.has(key1)) {
                return false; // Partido duplicado
            }
            partidosUnicos.add(key1);
        }
    }

    return true;
});

// Agrupar horarios por cancha
const horariosAgrupados = computed(() => {
    const grupos: Record<string, Partido[]> = {};
    
    horariosOcupados.value.forEach((partido) => {
        const key = partido.cancha || "Sin cancha";
        if (!grupos[key]) {
            grupos[key] = [];
        }
        grupos[key].push(partido);
    });

    return grupos;
});

// Formatear fecha corta para mostrar en los horarios
const formatearFechaCorta = (fecha: string) => {
    if (!fecha || fecha === "Sin fecha") return "";
    try {
        const date = new Date(fecha);
        return date.toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    } catch {
        return fecha;
    }
};

// Función para actualizar nombres de equipos basándose en los IDs
const actualizarNombresEquipos = () => {
    jornadas.value.forEach((jornada) => {
        jornada.partidos.forEach((partido: any) => {
            if (partido.equipo1Id) {
                const equipo1 = equipos.value.find(
                    (e) => e.equipoId === partido.equipo1Id
                );
                if (equipo1) {
                    partido.equipo1 = equipo1.nombre;
                }
            }
            if (partido.equipo2Id) {
                const equipo2 = equipos.value.find(
                    (e) => e.equipoId === partido.equipo2Id
                );
                if (equipo2) {
                    partido.equipo2 = equipo2.nombre;
                }
            }
        });
    });
};

// Agregar un nuevo partido a una jornada
const agregarPartido = (jornada: any) => {
    jornada.partidos.push({
        equipo1Id: null,
        equipo1: "",
        equipo2Id: null,
        equipo2: "",
        hora: "08:00",
        canchaId: null,
    });
    actualizarNombresEquipos();
};

// Eliminar un partido de una jornada
const eliminarPartido = (jornada: any, index: number) => {
    jornada.partidos.splice(index, 1);
};

// Generar jornadas vacías según el número de rondas
const generarJornadasVacias = (numRondas: number) => {
    const jornadasGeneradas: any[] = [];

    for (let ronda = 1; ronda <= numRondas; ronda++) {
        jornadasGeneradas.push({
            ronda,
            fecha: "",
            partidos: [],
        });
    }

    return jornadasGeneradas;
};

// Actualizar horarios ocupados cuando cambia la fecha
const actualizarHorariosOcupados = async (fecha: string) => {
    if (!fecha || !props.rolJuego) {
        // Para maquetación, mostrar todos los horarios ficticios
        horariosOcupados.value = horariosFicticios;
        return;
    }

    fechaSeleccionada.value = fecha;
    loadingHorarios.value = true;

    try {
        const partidos = await getPartidosByFecha(
            fecha,
            props.rolJuego.rolJuegoId
        );
        // Si no hay partidos reales, filtrar ficticios por fecha para maquetación
        if (partidos.length > 0) {
            horariosOcupados.value = partidos;
        } else {
            // Filtrar horarios ficticios por la fecha seleccionada
            horariosOcupados.value = horariosFicticios.filter(
                (p) => (p as any).fecha === fecha
            );
        }
    } catch (error) {
        console.warn("Error al cargar horarios, usando ficticios", error);
        // Filtrar horarios ficticios por la fecha seleccionada
        horariosOcupados.value = horariosFicticios.filter(
            (p) => (p as any).fecha === fecha
        );
    } finally {
        loadingHorarios.value = false;
    }
};


const cargarDatos = async () => {
    if (!props.rolJuego) return;

    loading.value = true;
    try {
        // Cargar equipos
        let equiposData: Equipo[] = [];
        try {
            equiposData = await getEquiposByRolJuego({
                TorneoId: props.rolJuego.torneoId,
                RamaId: props.rolJuego.ramaId,
                CategoriaId: props.rolJuego.categoriaId ?? undefined,
            });
        } catch (error) {
            console.warn(
                "Error al cargar equipos, usando equipos ficticios",
                error
            );
        }

        if (equiposData.length === 0) {
            equipos.value = equiposFicticios;
        } else {
            equipos.value = equiposData;
        }

        // Cargar canchas
        let canchasData: Cancha[] = [];
        try {
            canchasData = await getCanchas();
        } catch (error) {
            console.warn(
                "Error al cargar canchas, usando canchas ficticias",
                error
            );
        }

        if (canchasData.length === 0) {
            canchas.value = canchasFicticias;
        } else {
            canchas.value = canchasData;
        }

        // Generar jornadas vacías según el número de rondas
        if (esTodosContraTodos.value && equipos.value.length >= 2) {
            jornadas.value = generarJornadasVacias(
                props.rolJuego.numRondas || 1
            );
            // Cargar horarios ficticios para maquetación
            horariosOcupados.value = horariosFicticios;
        }
    } catch (error) {
        console.warn("Error general, usando datos ficticios", error);
        equipos.value = equiposFicticios;
        canchas.value = canchasFicticias;

        if (esTodosContraTodos.value && equipos.value.length >= 2) {
            jornadas.value = generarJornadasVacias(
                props.rolJuego?.numRondas || 1
            );
            // Cargar horarios ficticios para maquetación
            horariosOcupados.value = horariosFicticios;
        }
    } finally {
        loading.value = false;
    }
};

const guardarJornadas = async () => {
    if (!props.rolJuego || !puedeGuardar.value) return;

    guardando.value = true;
    try {
        let partidosCreados = 0;
        let jornadasCreadas = 0;

        for (const jornada of jornadas.value) {
            const jornadaData = {
                rolJuegoId: props.rolJuego.rolJuegoId,
                ronda: jornada.ronda,
                fecha: jornada.fecha,
                estado: "PROGRAMADO",
            };

            const jornadaCreada = await createJornada(jornadaData);

            if (jornadaCreada) {
                jornadasCreadas++;

                for (const partido of jornada.partidos) {
                    const partidoData = {
                        jornadaId: jornadaCreada.jornadaId,
                        equipo1Id: partido.equipo1Id,
                        equipo2Id: partido.equipo2Id,
                        hora: partido.hora,
                        canchaId: partido.canchaId,
                        ubicacion: "",
                        estado: "PROGRAMADO",
                        marcador1: 0,
                        marcador2: 0,
                        equipoGanadorId: null,
                    };

                    const partidoCreado = await createPartido(partidoData);
                    if (partidoCreado) {
                        partidosCreados++;
                    }
                }
            }
        }

        handleShowSnackbar({
            text: `Se crearon ${jornadasCreadas} jornada(s) y ${partidosCreados} partido(s) exitosamente`,
            type: "success",
            valueModel: true,
        });

        props.closeModal();
    } catch (error) {
        handleShowSnackbar({
            text: "Error al guardar jornadas",
            type: "error",
            valueModel: true,
        });
    } finally {
        guardando.value = false;
    }
};

onMounted(() => {
    cargarDatos();
});
</script>

<style scoped>
.h-100 {
    height: 100%;
}
</style>
