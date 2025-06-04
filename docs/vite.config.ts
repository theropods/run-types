import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite';


export default defineConfig({
    base: '/run-types/',
    plugins: [
        tailwindcss(),
      ],
})