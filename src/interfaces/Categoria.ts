export interface Categoria {
    categoriaId: number;
    categoria: string;
    descripcion: string;
}

export interface CategorianRequestParams extends Categoria {
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}
