export interface Jornada {
    jornadaId: number;
    rolJuegoId: number;
    ronda: number;
    fecha: Date | string;
    estado?: string;
}

export interface Partido {
    partidoId: number;
    jornadaId: number;
    equipo1Id: number;
    equipo1?: string;
    equipo2Id: number;
    equipo2?: string;
    hora: string;
    canchaId: number;
    cancha?: string;
    ubicacion?: string;
    estado: string;
    marcador1: number;
    marcador2: number;
    equipoGanadorId?: number | null;
}

export interface JornadaRequest {
    rolJuegoId: number;
    ronda: number;
    fecha: Date | string;
    estado?: string;
}

export interface PartidoRequest {
    jornadaId: number;
    equipo1Id: number;
    equipo2Id: number;
    hora: string;
    canchaId: number;
    ubicacion?: string;
    estado: string;
    marcador1?: number;
    marcador2?: number;
    equipoGanadorId?: number | null;
}

