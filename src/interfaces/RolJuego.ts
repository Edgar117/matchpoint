export interface RolJuego {
    rolJuegoId: number;
    torneoId: number;
    claveTorneo?: string;
    torneo?: string;
    ramaId: number;
    rama?: string;
    categoriaId: number | null;
    categoria?: string;
    tipoDeporteId?: number;
    tipoDeporte?: string;
    tipoRolJuegoId: number | null;
    tipoRolJuego?: string;
    clave: string;
    descripcion: string;
    numRondas: number;
    fechaInicio?: Date | string | null;
    fechaFin?: Date | string | null;
}

export interface RolJuegonRequestParams {
    rolJuegoId?: number;
    torneoId?: number;
    ramaId?: number;
    categoriaId?: number;
    tipoRolJuegoId?: number;
    clave?: string;
    descripcion?: string;
    numRondas?: number;
    fechaInicio?: string;
    fechaFin?: string;
    tipoDeporteId?: number;
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}

export interface TipoRolJuego {
    tipoRolJuegoId: number;
    tipoRolJuego1: string;
    regBorrado?: number;
}
