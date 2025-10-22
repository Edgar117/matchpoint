import { IdmResponse, User } from "../interfaces/ResponseLoginIdm";
import { TokenResponse } from "../interfaces/TokenResponse";
import { URL_SERVER_PROFILE } from "../../../helpers/constants";
import { UserDetail, UserResponse } from "@/interfaces/User";

export const transformUser = (userInfo: any, tokenInfo: any, roles: any) => {
    const userData: UserResponse = {
        userDetail: {
            empleadoId: 0,
            ficha: "",
            puesto: "",
            razonSocial: "",
            subdireccion: "",
        },
        user: {
            email: userInfo.email,
            firstName: "",
            lastName: "",
            lastNameSecond: "",
            fullName: "",
            userName: "",
            userId: tokenInfo.userId,
            img: userInfo.picture,
            roleId: roles[0].RolId,
        },
        roles: tokenInfo.Role,
        rolesUser: roles,
        token: {
            accessToken: "",
            expiresIn: 0,
            refreshToken: "",
        },
    };

    return userData;
};
