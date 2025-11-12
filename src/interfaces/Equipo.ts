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
    extensionImg: string;
    esRamaVaronil: boolean;
    esRamaFemenil: boolean;
    esRamaMixto: boolean;
    categorias: number[] | null;
    tipoDeporteId: number | null;
    tipoDeporte: string | null;
}

export interface EquiponRequestParams extends Equipo {
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}

// export interface Categoria {
//     equipoCategoriaId: number;
//     torneoId: number;
//     equipoId: number;
//     categoriaId: number;
//     regBorrado: number;
// }
