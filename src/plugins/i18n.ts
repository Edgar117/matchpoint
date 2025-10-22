import { message } from "../locales/translation";
import { createI18n } from "vue-i18n";

export const i18n = createI18n({
    locale: "es",
    allowComposition: true,
    messages: message,
});
