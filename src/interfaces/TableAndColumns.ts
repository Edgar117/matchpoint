export type TableAndColumns = TableExpand;

export interface Table {
    tableId: number;
    tableName: string;
    schema: string;
    descriptionTable?: string;
    columns: Column[];
    isEdit: boolean;
    needIndex:string;
}
export interface TableExpand extends Table {
    showDetail: boolean;
}
export interface Column {
    column: string;
    type: string;
    length: number;
    pressure: number;
    scale: number;
    acceptnull: any;
    descriptioncol?: string;
    fieldCount: number;
}

export interface ForeignKeyInfo {
    referencedTableName: string;
    referenceSchemaName: string;
    referencedColumnName: string;
    columnName: string;
    columns: Column_FK[];
    typeJoin: string;
}

export interface Column_FK {
    referencedTableColumnName: string;
    includeInSelect: boolean;
    includeInPaginator: boolean;
}
