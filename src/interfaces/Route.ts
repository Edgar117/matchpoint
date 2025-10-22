export interface Route {
    name: string;
    icon: string;
    importPath?: string;
    path: string;
    hasChildren: boolean;
    meta: Meta;
    children?: Child[];
}

export interface Child {
    name: string;
    icon: string;
    importPath: string;
    path: string;
    tooltip: string;
}

export interface Meta {
    requireAuth: boolean;
}
