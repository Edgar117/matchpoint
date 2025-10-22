import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
const messages = {
    es: {
        open: 'Mostrar opciones',
        noDataText: 'No data found',
        dataIterator: {
            loadingText: 'Cargando datos...'
        }
    },
    en: {
        open: 'Show options',
        noDataText: 'No records found',
        dataIterator: {
            loadingText: 'Loading data...'
        }
    },
};
// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
    theme: {
        themes: {
            light: {
                colors: {
                    primary: "#002b4d",
                    primaryBlue: "#2196F3",
                },
            },
        },
    },
    locale: {
        locale: 'es', // Cambia 'es' a tu idioma preferido si es diferente
        messages: messages,
    },
});