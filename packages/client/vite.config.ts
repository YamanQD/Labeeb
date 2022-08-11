import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            src: path.resolve("src/"),
        },
    },
    // Important: https://vitejs.dev/guide/dep-pre-bundling.html#monorepos-and-linked-dependencies
    build: {
        commonjsOptions: {
            include: [/@labeeb\/core/],
        },
    },

    optimizeDeps: {
        include: ["@labeeb/core"],

        // Important: https://vitejs.dev/config/dep-optimization-options.html#optimizedeps-force
        // Without this, vite won't pick up updates to the linked packages above (commonjs)
        force: true,
    },

    server: {
        port: 3000,
    },
});
