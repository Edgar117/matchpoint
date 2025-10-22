export interface Request {
    requestId: number;
    amount: number;
    company: number;
    comment: string;
    process: number;
    regHostNameCrecion: string;
    regRevisadoPor: string;
    roleId: number;
    currencyId: number | null;
    trustId: number | null;
}

export interface RequestSelect {
    userId: number;
    statusId: number | null;
    dateRequest: string;
    processId: number | null;
    process: string | null;
    roleId: number;
    comment: string;
    status: string;
    amount: string;
    requestId: string;
    companyName: string;
    trustName: string;
    name: string;
}

export interface RequestSelectFilter {
    userId: number;
    statusId: number | null;
    dateRequest: string;
    process: string | null;
    roleId: number;
}

export interface RequestParams extends RequestSelect {
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}

export interface requestItemGet {
    requestId: number;
    requestDetailId: number;
    amount: number;
    comment: string;
    company: any;
    companyName: any;
    statusId: number;
    status: string;
    color: string;
    colorCard: string;
    processId: number;
    process: string;
    roleid: number;
    role: string;
    dateRequest: string;
    totalcount: number;
    lastStatus: boolean;
    processLevelId: number;
    acciones: Accione[];
    requestComments: RequestComment[];
    currencyName: string;
    currencyId: number;
    trustId: number;
    trustName: string;
    showcompany: boolean;
    nextRole: string;
    nextStatus: string;
    nextStatusColor: string;
    name: string;
    documentId: string;
    uid: string;
    isdoalingDocusing: boolean;
}

export interface Accione {
    processLevel: number;
    actionId: number;
    action: string;
    showTrust: boolean;
    showCompany: boolean;
}
export interface statusItems {
    statusId: number;
    status: string;
}

export interface PostDetail {
    requestDetailId: number;
    requestId: number;
    processId: number;
    status: number;
    comment: string;
    lastStatus: boolean;
    processLevelId: number;
    regHostNameCrecion: string;
    regRevisadoPor: string;
    actionId: number;
    amount: number;
    company: number;
    roleId: number;
    currencyId: number | null;
    trustId: number | null;
}

export interface RequestComment {
    requestDetailId: number;
    requestId: number;
    comment: string;
    statusId: number;
    status: string;
    lastStatus: boolean;
    roleId: number;
    role: string;
    date: string;
    amount: number;
    privateCompanyId: any;
    companyName: any;
    currencyName: string;
    trustId: number;
    trustName: string;
    color: string;
    userName: string;
}
