export interface Trust {
    totalcount: number;
    trustId: number;
    name: string;
    shortName: string;
    roleId: number | null;
    roleName: string;
    beneficiaryIds: string;
}

export interface TrustRequestParams extends Trust {
    sortColumn: string | null;
    sortDirection: "asc" | "desc";
    OFFSET: number;
    NEXT_ROWS: number;
}

export interface Beneficiary {
    beneficiaryId: number;
    name: string;
    alias: string;
}

export interface TrustReport {
    trustId: number;
    trust: string;
    shortName: string;
}

export interface TrustYearReport {
    year: number;
}

export interface TrustCurrencyReport {
    currencyId: number;
    currency: string;
}
