import { APPLICATION_NAME } from "./constants";
import { ref } from "vue";
import { encrypt, decrypt, encryptedText } from "@/helpers/cryptoJS";
export const saveRoutes = (routes: any) => {
    localStorage.setItem(
        encryptedText(`routes-${APPLICATION_NAME.APP_NAME_SECURITY}`),
        encrypt(routes)
    );
};

export const deleteRoute = () => {
    localStorage.removeItem(
        encryptedText(`routes-${APPLICATION_NAME.APP_NAME_SECURITY}`)
    );
};

export const getRoutes = () => {
    const routes =
        localStorage.getItem(
            encryptedText(`routes-${APPLICATION_NAME.APP_NAME_SECURITY}`)
        ) != null
            ? decrypt(
                  localStorage.getItem(
                      encryptedText(
                          `routes-${APPLICATION_NAME.APP_NAME_SECURITY}`
                      )
                  )
              )
            : null;

    if (routes) {
        const result = JSON.parse(routes);
        return result;
    }

    return [];
};

export const saveToken = (value: any) => {
    localStorage.setItem(
        encryptedText(
            `${APPLICATION_NAME.APP_NAME_SECURITY}-token-information`
        ),
        encrypt(value)
    );
};

export const deleteToken = () => {
    localStorage.removeItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-token-information`)
    );
};

export const getToken = () => {
    return localStorage.getItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-token-information`)
    ) != null
        ? decrypt(
              localStorage.getItem(
                  encryptedText(
                      `${APPLICATION_NAME.APP_NAME_SECURITY}-token-information`
                  )
              )
          )
        : null;
};

export const getTokenInformation = () => {
    const info = ref<any>("");
    info.value =
        localStorage.getItem(
            encryptedText(
                `${APPLICATION_NAME.APP_NAME_SECURITY}-token-information`
            )
        ) != null
            ? decrypt(
                  localStorage.getItem(
                      encryptedText(
                          `${APPLICATION_NAME.APP_NAME_SECURITY}-token-information`
                      )
                  )
              )
            : null;
    return JSON.parse(info.value);
};

export const saveCurrentUser = (value: any) => {
    localStorage.setItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-user-information`),
        encrypt(value)
    );
};

export const getCurrentUser = () => {
    return localStorage.getItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-user-information`)
    ) != null
        ? decrypt(
              localStorage.getItem(
                  encryptedText(
                      `${APPLICATION_NAME.APP_NAME_SECURITY}-user-information`
                  )
              )
          )
        : null;
};

export const deleteCurrentUser = () => {
    localStorage.removeItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-user-information`)
    );
};

export const saveRememberMe = (value: any) => {
    localStorage.setItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-remember-me`),
        encrypt(value)
    );
};

export const deleteRememberMe = () => {
    localStorage.removeItem(
        `${APPLICATION_NAME.APP_NAME_SECURITY}-remember-me`
    );
};

export const getRememberMe = () => {
    return localStorage.getItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-remember-me`)
    ) != null
        ? decrypt(
              localStorage.getItem(
                  encryptedText(
                      `${APPLICATION_NAME.APP_NAME_SECURITY}-remember-me`
                  )
              )
          )
        : null;
};

// AMBIENTE

export const saveAmbiente = (value: any) => {
    localStorage.setItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-ambiente`),
        encrypt(value)
    );
};

export const deleteAmbiente = () => {
    localStorage.removeItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-ambiente`)
    );
};

export const getAmbiente = () => {
    return localStorage.getItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-ambiente`)
    ) != null
        ? decrypt(
              localStorage.getItem(
                  encryptedText(
                      `${APPLICATION_NAME.APP_NAME_SECURITY}-ambiente`
                  )
              )
          )
        : null;
};

// TABLA DE CATALOGO
export const saveTableConfig = (table: string, value: any) => {
    localStorage.setItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-${table}`),
        encrypt(value)
    );
};

export const deleteTableConfig = (table: string) => {
    localStorage.removeItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-${table}`)
    );
};

export const getTableConfig = (table: string) => {
    return localStorage.getItem(
        encryptedText(`${APPLICATION_NAME.APP_NAME_SECURITY}-${table}`)
    ) != null
        ? decrypt(
              localStorage.getItem(
                  encryptedText(
                      `${APPLICATION_NAME.APP_NAME_SECURITY}-${table}`
                  )
              )
          )
        : null;
};
export const clearLocalStorage = () => {
    deleteToken();
    deleteRoute();
    deleteCurrentUser();
};
