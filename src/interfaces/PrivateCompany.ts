export interface PrivateCompany {
    regHostNameCrecion: string;
    regRevisadoPor: string;

    empresaId: number;
    empresa: string;
    descripcion: string;
    rfc: string;
    razonSocial: string;
    direccion: string;
    telefono: string;
    email: string;
    cp: number;
    representante: string;
    pais: string;
    estado: string;
    poblacion: string;
    colonia: string;
    logo: string;
    extensionImg: string;
    esPublico: boolean;
}

export interface PrivateCompanynRequestParams extends PrivateCompany {
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}

export interface TypePaymentAccount {
    accountTypeId: number;
    label: string;
    desciption: string;
}

export interface RequestNewCompany extends PrivateCompany {
    processId: Number;
    roleId: Number;
}
