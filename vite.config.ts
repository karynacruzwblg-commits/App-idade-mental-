
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Define substituições de variáveis globais.
  // Isso permite que o código use `process.env.API_KEY` e o Vite o substitua pelo valor real.
  define: {
    // FIX: Replaced `API_KEY` with `VITE_GEMINI_API_KEY` to follow Vite's convention for client-side environment variables.
    'process.env.VITE_GEMINI_API_KEY': JSON.stringify(process.env.VITE_GEMINI_API_KEY)
  }
})
