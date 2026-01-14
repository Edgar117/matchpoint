export interface Cancha {
    canchaId: number;
    cancha: string;
    descripcion: string;
    ubicacion: string;
    direccion: string;
}

export interface CanchanRequestParams extends Cancha {
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}
