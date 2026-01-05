export interface Torneo {
    empresaId: number | null;
    empresa?: string;
    torneoId: number;
    clave: string;
    nombre: string;
    descripcion: string;
    fechaInicio: Date | string | null;
    fechaFin: Date | string | null;
    tipoTorneoId: number | null;
    tipoTorneo?: string;
    logo: string;
    extensionImg?: string;
    esPublico: boolean;
    estatus?: string;
}

export interface TorneoRequestParams extends Torneo {
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}

export interface TipoTorneo {
    tipoTorneoId: number;
    tipoTorneo: string;
}
