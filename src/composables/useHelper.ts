import { useTemplateUI } from "@/store/templateUI";
const { handleShowSnackbar } = useTemplateUI();

export const useHelper = () => {
    const copyText = (text: string | undefined) => {
        try {
            navigator.clipboard.writeText(text ?? "");
            handleShowSnackbar({
                text: `Texto copiado exitosamente`,
                type: "success",
                valueModel: true,
            });
        } catch (error) {
            handleShowSnackbar({
                text: `No se pudo copiar el texto 😓`,
                type: "warning",
                valueModel: true,
            });
        }
    };
    return {
        copyText,
    };
};
