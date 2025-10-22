export const printWaterMark = () => {
    console.log(
        "%c¡STOP!",
        "font-weight: bold; font-size: 40px;color: red;"
    );
    console.log(
        "%c!This browser feature is intended for developers!",
        "font-weight: bold; font-size: 20px;color: black;"
    );

    console.log(
        "%cPowered by",
        "font-weight: bold; font-size: 10px;color: black;",
        "TIC"
    );
};
