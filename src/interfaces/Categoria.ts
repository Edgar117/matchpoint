export interface Categoria {
    categoriaId: number;
    categoria: string;
    descripcion: string;
    tipoDeporteId: number | null;
    tipoDeporte: string | null;
}

export interface CategorianRequestParams extends Categoria {
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}
