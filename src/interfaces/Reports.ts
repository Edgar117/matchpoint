export interface ReportRequest {
    trustId: number[];
    year: number;
    currencyId: number | null;
}

export interface LegacyTrustsDistributions {
    head: Head;
    executiveSumary: ExecutiveSumary[];
    detailsCashDistributions: DetailsCashDistribution[];
    isPdf: boolean;
}

export interface DetailsCashDistribution {
    dateRequest: Date;
    comment: string;
    amount: Amount[];
}

export interface Amount {
    amount: number;
}

export interface ExecutiveSumary {
    month: string;
    amount: Amount[];
}

export interface Head {
    headname: string;
    shortnamehead: string;
    beneficiary: string;
    year: number;
    currency: string;
    trust: Trust[];
}

export interface Trust {
    trustname: string;
    shortname: string;
}
