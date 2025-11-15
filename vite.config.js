import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/site.css', 'resources/js/site.js'],
            refresh: true,
        }),
        viteStaticCopy({
            targets: [
              {
                src: 'public/profession',   // folder to copy
                dest: ''                 // copies into build output root
              }
            ],
        }),
        tailwindcss(),
    ],
});
