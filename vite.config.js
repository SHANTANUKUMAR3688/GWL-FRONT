// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// import { visualizer } from "rollup-plugin-visualizer";
// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react(), visualizer({ open: true })],
//     server: {
//     port: 3000,
//     host: true,
// },
//     build: {
//         minify: "terser",
//         terserOptions: {
//             compress: {
//                 drop_console: true, // remove console logs
//                 drop_debugger: true, // remove debugger statements
//             },
//             format: {
//                 comments: false, // remove comments
//             },
//         },
//     },
//     resolve: {
//         alias: {
//             "@": path.resolve(__dirname, "./src"),
//         },
//     },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";

export default defineConfig(({ mode }) => {
    // Toggle between 'esbuild' (default) and 'terser' by changing this value
    const useTerser = false;

    return {
        plugins: [
            react(),
            visualizer({
                open: true, // auto-open report after build
                filename: "dist/stats.html", // report file path
                gzipSize: true,
                brotliSize: true,
            }),
        ],
        server: {
            port: 3000,
            host: true,
        },
        build: {
            minify: useTerser ? "terser" : "esbuild",
            terserOptions: useTerser
                ? {
                      compress: {
                          drop_console: true, // remove console.log
                          drop_debugger: true, // remove debugger
                      },
                      format: {
                          comments: false, // remove comments
                      },
                  }
                : undefined,
            cssCodeSplit: true, // split CSS per page/component
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "./src"),
            },
        },
    };
});
