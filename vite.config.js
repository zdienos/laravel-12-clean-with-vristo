import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [laravel(["resources/js/src/App.tsx"]), react()],
    resolve: {
        alias: {
            // "@": path.resolve(__dirname, "./src"),
            // ❌ Sebelumnya: '@': path.resolve(__dirname, './src'),
            // ✅ Perbaikan: Sesuaikan path ini agar sama dengan di tsconfig.json
            "@": path.resolve(__dirname, "resources/js/src"),
        },
    },
});

// import { defineConfig } from 'vite';
// import laravel from 'laravel-vite-plugin';
// import tailwindcss from '@tailwindcss/vite';

// export default defineConfig({
//     plugins: [
//         laravel({
//             input: ['resources/css/app.css', 'resources/js/app.js'],
//             refresh: true,
//         }),
//         tailwindcss(),
//     ],
// });
