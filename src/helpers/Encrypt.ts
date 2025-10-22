import CryptoJS from "crypto-js";
import { APPLICATION_NAME } from "./applicationName";

export const encrypt = async (object: any) => {
    const encrypted = await CryptoJS.AES.encrypt(
        JSON.stringify(object),
        APPLICATION_NAME.KEY_IDM
    );
    return encrypted.toString();
};

export const decrypt = async (encrypted: any) => {
    const decrypted = CryptoJS.AES.decrypt(
        encrypted,
        APPLICATION_NAME.KEY_IDM
    ).toString(CryptoJS.enc.Utf8);
    return decrypted;
};

