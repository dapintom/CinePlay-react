import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

// Ahora es una SPA: un solo index.html (en /online) y React Router se encarga de las "páginas".
// Las imágenes viven en online/public/imagenes y se sirven desde /imagenes/...
export default defineConfig({
  root: resolve(__dirname, 'online'),
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
  },
})
