export interface Torneo {
    empresaId: number | null;
    torneoId: number;
    clave: string;
    nombre: string;
    descripcion: string;
    fechaInicio: Date | null;
    fechaFin: Date | null;
    tipoTorneoId: number | null;
    logo: string;
    extensionImg: string;
    esPublico: boolean;
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
