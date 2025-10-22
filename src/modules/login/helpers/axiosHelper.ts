export const buildParams = (params: any) => {
    const parameters: any = {};
    const arrParameters = Object.keys(params);

    if (arrParameters.length === 0) return;

    arrParameters?.forEach((key) => {
        if (
            params[key] !== "" &&
            params[key] !== null &&
            params[key] !== undefined
        ) {
            parameters[key] = params[key];
        }
    });

    return parameters;
};
