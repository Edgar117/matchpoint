import { configure, defineRule } from "vee-validate";
import { email, max, required } from "@vee-validate/rules";
import { localize } from "@vee-validate/i18n";

defineRule("required", required);
defineRule("max", max);
defineRule("email", email);

configure({
    generateMessage: localize({
        en: {
            messages: {
                required: "Este campo es requerido",
                max: "El texto debe tener {0} caracteres o menos",
            },
        },
        es: {
            messages: {
                required: "This field is required",
                max: "The text must be {0} characters or less",
            },
        },
    }),
});
