export interface Flow {
    processId: number;
    name: string;
    company: boolean;
    showCompanyForm: boolean;
    color: string;
    typeRequest: number;
    totalcount: number;
    regHostNameCreacion: string;
    regRevisadoPor: string;
    classification: string;
    classificationId: number | null;
}

export interface ProcessRequestParams extends Flow {
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}

export interface flowActions {
    actionId: number;
    name: string;
    color: string;
}

export interface flowProcess {
    nodes: Node[];
    edges: Edge[];
}

export interface Node {
    processLevelId: number;
    name: string;
    data: Data;
    color: string;
    x: string;
    y: string;
}

export interface Data {
    processId: number;
    roleId: number;
    notification: boolean;
    docusign: boolean;
    process: string;
    action: string;
    rol: string;
    regHostNameCreacion?: string;
    regRevisadoPor?: string;
}

export interface DataEge {
    actionId: number;
    action: string;
    color: string;
}

export interface Edge {
    edgeId: string;
    actual: number;
    hijo: number;
    data: DataEge;
    actionId: number;
    includeTrust: boolean;
    includeCompany: boolean;
}
