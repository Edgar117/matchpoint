import { decrypt, encrypt } from "@/helpers/cryptoJS";
import { getRememberMe, saveRememberMe } from "@/helpers/localstorageHandler";

export const rememberMeSave = (
    user: string,
    password: string,
    typeCredential: number
) => {
    const userAndPassword = {
        cus: user,
        cup: password,
        ctc: typeCredential,
    };

    saveRememberMe(encrypt(JSON.stringify(userAndPassword)));
};

export const rememberMeGet = () => {
    const data = getRememberMe();
    if (data) {
        const result = decrypt(JSON.parse(data));
        return JSON.parse(JSON.parse(result));
    }

    return false;
};
