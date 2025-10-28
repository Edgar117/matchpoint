export interface Equipo {
    torneoId: number | null;
    torneo?: string;
    equipoId: number;
    entrenador: string;
    nombre: string;
    descripcion: string;
    pais: string;
    estado: string;
    poblacion: string;
    colonia: string;
    logo: string;
}

export interface EquiponRequestParams extends Equipo {
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}
