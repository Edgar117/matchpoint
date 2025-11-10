export interface EquipoJugadorAsignacion {
    equipoJugadorId: number;
    ramaId: number;
    categoriaId: number;
    posicionTipoTorneoId: number;
    num: number;
    jugador: string;
    ramaNombre?: string;
    categoriaNombre?: string;
}

export interface Jugador {
    equipoId: number;
    jugadorId: number;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    logo?: string;
    fechaNacimiento: string | null;
    curp: string;
    extensionImg?: string;
    equipoJugador: EquipoJugadorAsignacion[];
}

export interface JugadorRequest extends Jugador {}

export interface JugadorListParams {
    equipoId: number;
    torneoId?: number | null;
    offset?: number;
    nextRows?: number;
    sortColumn?: string;
    sortDirection?: "ASC" | "DESC";
}

export interface RamaEquipo {
    ramaId: number;
    nombre: string;
    descripcion?: string;
    esRamaVaronil?: boolean;
    esRamaFemenil?: boolean;
    esRamaMixto?: boolean;
}

export interface CategoriaEquipo {
    categoriaId: number;
    categoria: string;
    descripcion?: string;
    ramaId?: number;
}

