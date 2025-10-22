import { fileURLToPath, URL } from "url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default ({ mode }) => {
    process.env = Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
    return defineConfig({
        plugins: [
            vue({
                template: { transformAssetUrls },
            }),
            vuetify({
                autoImport: true,
            }),
        ],
        root: "./",
        base: "/",
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: fileURLToPath(
                        new URL("./src", import.meta.url)
                    ),
                },
                {
                    find: "@core",
                    replacement: fileURLToPath(
                        new URL("./src/components/core", import.meta.url)
                    ),
                },
                {
                    find: "@components",
                    replacement: fileURLToPath(
                        new URL("./src/components", import.meta.url)
                    ),
                },
            ],
        },
    });
};
