import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
import tailwindcss from "tailwindcss";

export default defineConfig({
    plugins: [viteCommonjs(), react()],
    css: {
        postcss: {
            plugins: [tailwindcss]
        }
    }
});