export const removeAccents = (str: string) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

type QueryParameters = {
    [key: string]: string | number;
};

export const buildUrlWithParameters = (
    parameters: QueryParameters,
    baseUrl: string
): string => {
    const stringParameters: Record<string, string> = {};

    // Convierte las propiedades a cadenas de texto
    for (const key in parameters) {
        if (parameters[key] !== null && parameters[key] !== undefined) {
            stringParameters[key] = String(parameters[key]);
        }
    }

    const queryParams = new URLSearchParams(stringParameters);

    return `${baseUrl}?${queryParams.toString()}`;
};
export const OnlyNumberKey = (evt: any, numberDecimal: number) => {
    evt = evt ? evt : window.event;
    const expect = evt.target.value.toString() + evt.key.toString();
    const expresionRegular = new RegExp(
        "^([0-9]+\\.?[0-9]{0," + numberDecimal + "})$"
    );
    if (!expresionRegular.test(expect)) {
        evt.preventDefault();
    } else {
        return true;
    }
};

export const getLocation = (): string => {
    let value = "";
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                value = `Latitud: ${position.coords.latitude}, Longitud: ${position.coords.longitude}`;
            },
            (error) => {
                value = "Not suported";
            }
        );
    }
    return value;
};
export const isNullOrEmpty = (input: string): boolean => {
    return input === null || input === undefined || input.trim() === "";
};

export const isAlphaNumericString = (input: string): boolean => {
    const ALPHA_NUMERIC_REGEX = /^[a-zA-Z0-9]+$/;
    return ALPHA_NUMERIC_REGEX.test(input);
};
