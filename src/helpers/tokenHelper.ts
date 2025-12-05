import jwt_decode from "jwt-decode";
import { getToken } from "./localstorageHandler";
import { TokenResponse } from "@/modules/login/interfaces/TokenResponse";

/**
 * Gets the empresaId from the decoded token
 * @returns The empresaId from the token, or null if not available
 */
export const getEmpresaIdFromToken = (): number | null => {
    try {
        const token = getToken();
        if (!token) {
            return null;
        }
        const tokenData: TokenResponse = JSON.parse(token);
        const decoded: any = jwt_decode(tokenData.accessToken);
        const empresaId = decoded.empresaId;
        
        // Convertir a número si existe, o retornar null
        if (empresaId === null || empresaId === undefined) {
            return null;
        }
        
        // Convertir a número (maneja tanto string como número)
        const empresaIdNumber = Number(empresaId);
        
        // Si la conversión falla (NaN), retornar null
        return isNaN(empresaIdNumber) ? null : empresaIdNumber;
    } catch (error) {
        return null;
    }
};

