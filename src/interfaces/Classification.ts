export interface Classification {
    classificationId: number;
    classificationName: string;
    reportId: number | null;
    regHostNameCrecion: string;
    regCreadoPor: string;
}

export interface ClassificationRequestParams extends Classification {
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}

export interface ClassificationReport {
    reportId: number;
    report: string;
}
