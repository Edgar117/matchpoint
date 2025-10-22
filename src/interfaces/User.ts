import { TokenInformation } from "./AuthenticateToken";

export interface UserCredentials {
    username: string;
    password: string;
    rememberMe: boolean;
    activeDirectory: boolean;
    typeCredential: number;
    email?: string;
    token?: string;
}

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    lastNameSecond: string;
    fullName: string;
    userName: string;
    userId: string;
    img: string;
    roleId: string;
}

export interface UserDetail {
    empleadoId?: number;
    ficha?: string;
    puesto?: string;
    razonSocial?: string;
    subdireccion?: string;
}

export interface Role {
    userId: number;
    roleId: number;
    rol: string;
    admin: boolean;
}

export interface UserResponse {
    userDetail: UserDetail;
    user: User;
    roles: string;
    rolesUser: Role[];
    token: TokenInformation;
}

export interface GoogleResponse {
    clientId: string;
    client_id: string;
    credential: string;
    select_by: string;
}

export interface RolUsers {
    roleId: number;
    description: string;
}

export interface selUsers {
    userId: number;
    username: string;
    email: string;
    password: string;
    name: string;
    lastName: string;
    rol: number[];
    roleDescription: string;
    totalcount: number;
    regHostNameCrecion: string;
    regRevisadoPor: string;
    birthDay: Date | null;
    telephoneNumber: number;
    mailingAddress: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    socialNumber: string;
    banks: banksItem[];
    roles: Role[];
}

export interface Role {
    userId: number;
    roleId: number;
    rol: string;
}

export interface banksItem {
    bankUserId: number;
    nameBank: string;
    accountNumber: string;
    type: number | null;
    typeDesc: string;
    userId: number;
    regHostNameCrecion: string;
    regRevisadoPor: string;
}

export interface UserRequestParams extends selUsers {
    sortColumn: string | null;
    SortDir: "asc" | "desc";
    Offset: number;
    Limit: number;
}

export interface dashData {
    userProcessAction: UserProcessAction[];
    dashNumber: DashNumber[];
}

export interface UserProcessAction {
    processId: number;
    process: string;
    roleId: number;
    role: string;
    action: Action[];
    showCompany: boolean;
    showCompanyForm: boolean;
}

export interface Action {
    action: string;
}

export interface UserTrust {
    name: string;
    shortName: string;
    trustId: number;
}

export interface DashNumber {
    count: number;
    statusId: number;
    status: string;
    roleid: number;
    role: string;
}
