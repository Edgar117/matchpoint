export interface Rol {
    roleId: number;
    description: string;
    admin: boolean;
    screenIds: string;
}

export interface RoleRequestParams extends Rol {
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}

export interface Screens {
    screenId: number;
    name: string;
    parent: number;
}

export interface RolScreen {
    level: number;
    name: string;
    icon: string;
    component?: string;
    importPath?: string;
    path: string;
    hasChildren: boolean;
    children: Children[];
}

export interface Children {
    name: string;
    icon: string;
    component: string;
    importPath: string;
    path: string;
    tooltip: string;
    hasChildren: boolean;
}
export interface actions {
    name: string;
    component: string;
}
export interface Permitions {
    screens: RolScreen[];
    acciones: actions[];
}
