export interface IdmResponse {
    IsAuthenticated: boolean;
    UserMessage:     null;
    ResultMessage:   string;
    ApplicationId:   number;
    UserId:          number;
    Roles:           string;
    UserName:        null;
    User:            User;
    SiteId:          null;
}

export interface User {
    Permissions:           Permission[];
    Roles:                 Role[];
    UserId:                number;
    SiteId:                string;
    IdCompany:             null;
    UserName:              string;
    FirstName:             string;
    LastName:              string;
    LastNameSecond:        string;
    UserActiveDirectory:   string;
    Password:              null;
    Email:                 string;
    ExpirationDate:        Date;
    CreateBy:              string;
    ServiceDeskId:         number;
    ModifiedBy:            null;
    IdUserOriginal:        null;
    ChangePassword:        boolean;
    LastDatePassword:      Date;
    IdPersona:             null;
    ImageUserByte:         null;
    ImageUserMinByte:      null;
    ImageUserOrgByte:      null;
    LaborSeniority:        null;
    SupplierId:            number;
    Position:              null;
    Company:               null;
    CompanyCode:           null;
    OwnEmail:              null;
    HireDate:              null;
    Password64Base:        string;
    NewPassword64Base:     null;
    DiasRestantesPassword: number;
    FullName:              null;
    TelephoneContact:      null;
    RegBorrado:            null;
    RegCreadoPor:          null;
    RegSiteCreacion:       null;
    RegModificadoPor:      null;
    RegSiteModificacion:   null;
    ApplicationUser:       null;
    ConfiguracionUser:     null;
    PhoneContact:          null;
    SupplierName:          null;
    Id:                    null;
    LstApplicationUser:    null;
    ConfirmPassword:       null;
}

export interface Permission {
    PermissionId:   number;
    NameController: null | string;
    ResourceId:     number;
    ApplicationId:  number;
    NameResource:   string;
    Description:    string;
    Type:           string;
    ActionButton:   null;
    Action:         Action;
}

export interface Action {
    ActionId:   number;
    NameAction: string;
    SiteId:     string;
}

export interface Role {
    RoleId:        number;
    ApplicationId: number;
    SiteId:        string;
    NameRole:      string;
    Description:   string;
    IsAdmin:       boolean;
    Base:          boolean;
    PriorityLevel: number;
    CreatedBy:     null;
    ModifiedBy:    null;
}
