import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Define substituições de variáveis globais.
  // Isso permite que o código use `process.env.API_KEY` e o Vite o substitua pelo valor real.
  define: {
    // FIX: Replaced `loadEnv` and `process.cwd()` with a direct read from `process.env`. This resolves the TypeScript error and simplifies the configuration.
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY)
  }
})
