export type SortItem = {
    key: string;
    order: Order;
};

export type Order =  "asc" | "desc";

export type HeaderItem = {
    title: string;
    key: string;
    sortable: boolean;
    width?:string
}
